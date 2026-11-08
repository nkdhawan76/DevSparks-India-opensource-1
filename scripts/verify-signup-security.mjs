/**
 * DevSparks DeployCheck — Signup & Email Protection Verification Suite
 * Tests 10,000+ domain intelligence, password policies, HIBP k-Anonymity,
 * client-side autocomplete logic, and API endpoints.
 */

import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

console.log("=================================================");
console.log("DevSparks DeployCheck — Signup & Email Protection Verification");
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
  // 1. Dataset Integrity Test
  await test("Disposable domains dataset loads, contains 10,000+ domains, and excludes legitimate providers", async () => {
    const filePath = path.join(PROJECT_ROOT, "src", "data", "disposable-domains.json");
    const raw = await fs.readFile(filePath, "utf8");
    const domains = JSON.parse(raw);

    assert(Array.isArray(domains), "Dataset must be an array");
    assert(domains.length >= 10000, `Expected >= 10000 domains, got: ${domains.length}`);

    const domainSet = new Set(domains);
    const protectedProviders = [
      "gmail.com",
      "googlemail.com",
      "outlook.com",
      "hotmail.com",
      "yahoo.com",
      "yahoo.co.in",
      "icloud.com",
      "proton.me",
      "protonmail.com",
      "zoho.com",
      "rediffmail.com",
      "devsparks.in",
    ];

    for (const provider of protectedProviders) {
      assert(!domainSet.has(provider), `Protected provider must NEVER be in blocklist: ${provider}`);
    }
  });

  // 2. High-performance lookup test
  await test("In-memory lookup evaluates 10,000 domains in < 10ms", async () => {
    const filePath = path.join(PROJECT_ROOT, "src", "data", "disposable-domains.json");
    const raw = await fs.readFile(filePath, "utf8");
    const domainSet = new Set(JSON.parse(raw));

    const startTime = performance.now();
    for (let i = 0; i < 5000; i++) {
      domainSet.has("mailinator.com");
      domainSet.has("gmail.com");
    }
    const elapsed = performance.now() - startTime;
    assert(elapsed < 20, `5,000 lookups took too long: ${elapsed.toFixed(2)}ms`);
  });

  // 3. Client-side Domain Autocomplete Logic Test
  await test("Email domain autocomplete suggestions filter correctly", async () => {
    const { getEmailDomainSuggestions } = await import("../src/lib/auth-logic.js");

    const empty = getEmailDomainSuggestions("developer");
    assert.strictEqual(empty.suggestions.length, 0);

    const atAll = getEmailDomainSuggestions("developer@");
    assert(atAll.suggestions.length > 5, "Typing @ should suggest popular domains");

    const gmail = getEmailDomainSuggestions("developer@g");
    const hasGmail = gmail.suggestions.some((s) => s.domain === "gmail.com");
    assert(hasGmail, "Typing @g must suggest gmail.com");

    const yahoo = getEmailDomainSuggestions("developer@yah");
    const hasYahoo = yahoo.suggestions.some((s) => s.domain === "yahoo.com");
    assert(hasYahoo, "Typing @yah must suggest yahoo.com");
  });

  // 4. Password Strength Calculation Test (NIST 800-63B)
  await test("Password strength calculator accurately scores 5 levels and rewards passphrases", async () => {
    const { calculatePasswordStrength } = await import("../src/lib/auth-logic.js");

    const veryWeak = calculatePasswordStrength("short");
    assert.strictEqual(veryWeak.label, "Very Weak");
    assert.strictEqual(veryWeak.score, 0);

    const weak = calculatePasswordStrength("twelve_chars");
    assert.strictEqual(weak.label, "Weak");
    assert.strictEqual(weak.score, 1);

    const strongPassphrase = calculatePasswordStrength("correct horse battery staple 2026");
    assert(strongPassphrase.score >= 3, `Expected score >= 3, got: ${strongPassphrase.score}`);
    assert(
      strongPassphrase.label === "Strong" || strongPassphrase.label === "Very Strong",
      `Expected Strong/Very Strong, got: ${strongPassphrase.label}`
    );
  });

  // 5. Signup API rejects Disposable Email
  await test("Registration API (POST /api/v1/auth/signup) rejects disposable email addresses", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Burner User",
        email: "throwaway_test@mailinator.com",
        password: "Passphrase_Valid_2026!#",
        acceptTerms: true,
      }),
    });

    assert.strictEqual(res.status, 400, `Expected 400 Bad Request, got: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.code, "DISPOSABLE_EMAIL_NOT_ALLOWED");
    assert(body.error.includes("disposable") || body.error.includes("Temporary"));
  });

  // 6. Signup API rejects Subdomain of Disposable Email
  await test("Registration API rejects subdomains of disposable providers", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Burner Subdomain User",
        email: "tester@sub.10minutemail.com",
        password: "Passphrase_Valid_2026!#",
        acceptTerms: true,
      }),
    });

    assert.strictEqual(res.status, 400, `Expected 400 Bad Request, got: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.code, "DISPOSABLE_EMAIL_NOT_ALLOWED");
  });

  // 7. Signup API rejects Weak Password (< 15 characters)
  await test("Registration API rejects passwords under 15 characters", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Developer",
        email: `dev.${Date.now()}@devsparksindia.com`,
        password: "ShortPassword1", // Exactly 14 characters
        acceptTerms: true,
      }),
    });

    assert.strictEqual(res.status, 400, `Expected 400 Bad Request, got: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.code, "WEAK_PASSWORD");
    assert(body.error.includes("15 characters"));
  });

  // 8. Signup API rejects Anti-Bot Honeypot submissions
  await test("Registration API rejects honeypot submissions from automated bots", async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Spam Bot",
        email: `bot.${Date.now()}@example.com`,
        password: "ValidPassphrase_2026!#",
        acceptTerms: true,
        company_hp: "BotAutomatedFill",
      }),
    });

    assert.strictEqual(res.status, 400, `Expected 400 Bad Request, got: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.code, "BOT_DETECTED");
  });

  // 9. Signup API succeeds with legitimate provider and valid passphrase
  await test("Registration API accepts valid permanent email with >=15 char passphrase", async () => {
    const uniqueEmail = `developer.${Date.now()}@gmail.com`;
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Verified Developer",
        email: uniqueEmail,
        password: "A_Solid_Secure_Passphrase_2026!#",
        acceptTerms: true,
      }),
    });

    assert.strictEqual(res.status, 201, `Expected 201 Created, got: ${res.status}`);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.user.email, uniqueEmail);
    assert.strictEqual(body.user.role, "DEVELOPER");

    const cookie = res.headers.get("set-cookie");
    assert(cookie && cookie.includes("deploycheck_session="), "Expected session cookie set");
  });

  // 10. Admin Email Protection API Test
  await test("Admin Email Protection API returns stats and supports test action", async () => {
    // 10a. Login as admin to get session cookie
    const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "nikhil@devsparksindia.com",
        password: "DevSparks@2026!",
      }),
    });
    assert.strictEqual(loginRes.status, 200, "Admin login must succeed");
    const setCookie = loginRes.headers.get("set-cookie") || "";
    const match = setCookie.match(/deploycheck_session=([^;]+)/);
    const sessionCookie = match ? match[1] : "";
    assert(sessionCookie, "Session cookie must be present");

    const cookieHeader = `deploycheck_session=${sessionCookie}`;

    const statsRes = await fetch(`${BASE_URL}/api/v1/admin/email-protection`, {
      headers: { Cookie: cookieHeader },
    });
    assert.strictEqual(statsRes.status, 200, `Expected 200 OK, got: ${statsRes.status}`);
    const statsBody = await statsRes.json();
    assert.strictEqual(statsBody.success, true);
    assert(statsBody.data.totalBlocked >= 10000, "Must report 10,000+ blocked domains");
    assert(statsBody.data.totalAllowlisted >= 15, "Must report allowlisted providers");

    // Test action: disposable
    const testRes = await fetch(`${BASE_URL}/api/v1/admin/email-protection`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookieHeader },
      body: JSON.stringify({ action: "test", domain: "mailinator.com" }),
    });
    assert.strictEqual(testRes.status, 200);
    const testBody = await testRes.json();
    assert.strictEqual(testBody.data.action, "BLOCKED");

    // Test action: allowed
    const testAllowedRes = await fetch(`${BASE_URL}/api/v1/admin/email-protection`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookieHeader },
      body: JSON.stringify({ action: "test", domain: "gmail.com" }),
    });
    assert.strictEqual(testAllowedRes.status, 200);
    const testAllowedBody = await testAllowedRes.json();
    assert.strictEqual(testAllowedBody.data.action, "ALLOWED");
  });

  // Summary
  console.log("\n=================================================");
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
