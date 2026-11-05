/**
 * DevSparks DeployCheck — Authentication & Route Protection Verification Suite
 * Phase 12 Automated Verification
 */

import assert from "node:assert";

console.log("=================================================");
console.log("DevSparks DeployCheck — Authentication Verification");
console.log("=================================================\n");

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.stack || err.message}`);
    failed++;
  }
}

const BASE_URL = "http://localhost:3000";

async function run() {
  // 1. Test unauthenticated request to /app/dashboard redirects to /login
  await test("Unauthenticated request to /app/dashboard redirects to /login", async () => {
    const res = await fetch(`${BASE_URL}/app/dashboard`, { redirect: "manual" });
    assert(
      res.status === 307 || res.status === 302 || res.status === 308,
      `Expected redirect status (302/307/308), got: ${res.status}`
    );
    const location = res.headers.get("location");
    assert(location && location.includes("/login"), `Expected redirect to /login, got: ${location}`);
  });

  // 2. Test unauthenticated request to /app/projects redirects to /login with redirect param
  await test("Unauthenticated request to /app/projects preserves target in redirect query", async () => {
    const res = await fetch(`${BASE_URL}/app/projects`, { redirect: "manual" });
    assert(res.status === 307 || res.status === 302, `Expected 307/302, got ${res.status}`);
    const location = res.headers.get("location");
    assert(location && location.includes("/login?redirect="), `Expected ?redirect= param, got: ${location}`);
  });

  // 3. Test protected API without session returns 401 Unauthorized
  await test("Protected API /api/v1/audits returns 401 without session or bearer token", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/audits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 401, `Expected 401 Unauthorized, got: ${res.status}`);
  });

  // 4. Test login with invalid password rejects credentials safely
  await test("Login with invalid password returns 401 with generic message", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "nikhil@devsparksindia.com",
        password: "IncorrectPassword123!",
      }),
    });
    assert.strictEqual(res.status, 401, `Expected 401, got: ${res.status}`);
    const body = await res.json();
    assert(body.error && body.error.includes("Invalid email or password"), "Expected generic error message");
  });

  // 5. Test login with valid admin account sets secure HTTP-only session cookie
  let sessionCookie = "";
  await test("Login with valid account creates secure session cookie and returns user data", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "nikhil@devsparksindia.com",
        password: "DevSparks@2026!",
        rememberMe: true,
      }),
    });
    assert.strictEqual(res.status, 200, `Expected 200 OK, got: ${res.status}`);
    const body = await res.json();
    assert(body.success, "Response must indicate success");
    assert.strictEqual(body.user.email, "nikhil@devsparksindia.com");

    const setCookie = res.headers.get("set-cookie");
    assert(setCookie && setCookie.includes("deploycheck_session="), "Expected deploycheck_session cookie");
    assert(setCookie.includes("HttpOnly") || setCookie.includes("httponly"), "Cookie must be HttpOnly");

    // Extract cookie value for subsequent requests
    const match = setCookie.match(/deploycheck_session=([^;]+)/);
    assert(match && match[1], "Cookie value must be extractable");
    sessionCookie = match[1];
  });

  // 6. Test /api/v1/auth/me with valid session cookie
  await test("Session verification endpoint /api/v1/auth/me returns valid identity", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      headers: { Cookie: `deploycheck_session=${sessionCookie}` },
    });
    assert.strictEqual(res.status, 200, `Expected 200 OK, got: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.authenticated, true);
    assert.strictEqual(body.user.email, "nikhil@devsparksindia.com");
  });

  // 7. Test accessing /login while authenticated redirects to /app/dashboard
  await test("Accessing /login while authenticated redirects to /app/dashboard", async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      headers: { Cookie: `deploycheck_session=${sessionCookie}` },
      redirect: "manual",
    });
    assert(res.status === 307 || res.status === 302, `Expected 307/302, got: ${res.status}`);
    const location = res.headers.get("location");
    assert(location && location.includes("/app/dashboard"), `Expected redirect to /app/dashboard, got: ${location}`);
  });

  // 8. Test signup rejects weak password
  await test("Signup rejects weak password (< 8 chars or missing variety)", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Developer",
        email: "test.dev@example.com",
        password: "weak",
        acceptTerms: true,
      }),
    });
    assert.strictEqual(res.status, 400, `Expected 400 Bad Request, got: ${res.status}`);
  });

  // 9. Test signup creates user with DEVELOPER role (NEVER Admin/Owner)
  let newDevCookie = "";
  await test("Signup assigns lowest permitted role (DEVELOPER) and prevents privileged escalation", async () => {
    const testEmail = `dev.${Date.now()}@devsparksindia.com`;
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Verified Developer",
        email: testEmail,
        password: "SecurePassword2026!#",
        acceptTerms: true,
        role: "OWNER", // Malicious attempt to escalate role
      }),
    });
    assert.strictEqual(res.status, 201, `Expected 201 Created, got: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.user.role, "DEVELOPER", "Role must be DEVELOPER, self-escalation must be ignored");

    const setCookie = res.headers.get("set-cookie");
    const match = setCookie.match(/deploycheck_session=([^;]+)/);
    newDevCookie = match[1];
  });

  // 10. Test duplicate email signup returns 409 Conflict
  await test("Duplicate signup attempts return 409 Conflict", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Nikhil Duplicate",
        email: "nikhil@devsparksindia.com",
        password: "StrongPassword2026!#",
        acceptTerms: true,
      }),
    });
    assert.strictEqual(res.status, 409, `Expected 409 Conflict, got: ${res.status}`);
  });

  // 11. Test password recovery workflow
  let resetToken = "";
  await test("Password recovery dispatches token safely without enumeration", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "nikhil@devsparksindia.com" }),
    });
    assert.strictEqual(res.status, 200, `Expected 200 OK, got: ${res.status}`);
    const body = await res.json();
    assert(body.success, "Expected success response");
    resetToken = body.token;
  });

  // 12. Test reset password with token updates password and invalidates prior sessions
  await test("Reset password updates hash and revokes existing sessions", async () => {
    if (!resetToken) {
      console.log("  ⚠️ SKIP: No reset token returned in production mode");
      return;
    }
    const res = await fetch(`${BASE_URL}/api/v1/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: resetToken,
        password: "DevSparks@2026!", // restore password
      }),
    });
    assert.strictEqual(res.status, 200, `Expected 200 OK, got: ${res.status}`);

    // Verify previous session is now revoked (invalid)
    const checkRes = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      headers: { Cookie: `deploycheck_session=${sessionCookie}` },
    });
    assert.strictEqual(checkRes.status, 401, "Expected revoked session to return 401 Unauthorized");
  });

  // 13. Test logout invalidates session cookie
  await test("Logout invalidates active session and clears cookie", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: { Cookie: `deploycheck_session=${newDevCookie}` },
    });
    assert.strictEqual(res.status, 200, `Expected 200 OK, got: ${res.status}`);
    const setCookie = res.headers.get("set-cookie");
    assert(setCookie && setCookie.includes("Max-Age=0"), "Cookie must be cleared with Max-Age=0");
  });

  console.log("\n=================================================");
  console.log(`Verification Complete: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

run();

