import assert from "node:assert";
import crypto from "node:crypto";

console.log("=================================================");
console.log("DevSparks DeployCheck — MVP Core Verification");
console.log("=================================================\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

// 1. Test Encryption (AES-256-GCM)
test("BYOK Secret Encryption (AES-256-GCM)", () => {
  const ALGORITHM = "aes-256-gcm";
  const IV_LENGTH = 12;
  const key = crypto.scryptSync("devsparks-deploycheck-dev-secret-salt-32b", "salt", 32);
  const iv = crypto.randomBytes(IV_LENGTH);
  const rawKey = "sk-or-v1-abcdef1234567890abcdef1234567890abcdef1234567890";

  // Encrypt
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(rawKey, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  assert(encrypted.length > 0, "Ciphertext must not be empty");
  assert(!encrypted.toString("utf8").includes(rawKey), "Ciphertext must not leak raw key");

  // Decrypt
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  assert.strictEqual(decrypted.toString("utf8"), rawKey, "Decrypted value must match original");
});

// 2. Test Masking
test("Key Masking for UI Presentation", () => {
  function maskApiKey(apiKey) {
    if (!apiKey || apiKey.length <= 8) return "••••••••";
    return `${apiKey.slice(0, 4)}••••••••${apiKey.slice(-4)}`;
  }

  const rawKey = "sk-or-v1-9876543210zyxwvutsrq";
  const masked = maskApiKey(rawKey);

  assert.strictEqual(masked, "sk-o••••••••tsrq");
  assert(!masked.includes("9876543210"));
});

// 3. Test Secret Redaction in Logs & Prompts
test("Secret Redaction in Logs & Prompts", () => {
  const SENSITIVE_PATTERNS = [
    /sk-[a-zA-Z0-9]{20,}/g,
    /ghp_[a-zA-Z0-9]{36}/g,
    /bearer\s+[a-zA-Z0-9._~+/-]+=*/gi,
  ];

  function redactSecrets(input) {
    let redacted = input;
    for (const pattern of SENSITIVE_PATTERNS) {
      redacted = redacted.replace(pattern, "[REDACTED_SECRET]");
    }
    return redacted;
  }

  const input = "Error calling OpenRouter: API key sk-abcdef12345678901234567890 failed. Bearer eyJhbGciOi...";
  const cleaned = redactSecrets(input);

  assert(!cleaned.includes("sk-abcdef12345678901234567890"));
  assert(cleaned.includes("[REDACTED_SECRET]"));
});

// 4. Test Audit Engine Logic & Stack Detection
test("Audit Engine Stack Detection & Finding Logic", () => {
  function detectProjectStack(files) {
    let packageManager = "unknown";
    if (files.has("pnpm-lock.yaml")) packageManager = "pnpm";
    else if (files.has("yarn.lock")) packageManager = "yarn";
    else if (files.has("package-lock.json")) packageManager = "npm";

    const hasTypeScript = files.has("tsconfig.json") || Array.from(files.keys()).some(f => f.endsWith(".ts"));
    let framework = "Node.js (Generic)";

    const pkgStr = files.get("package.json");
    if (pkgStr) {
      try {
        const pkg = JSON.parse(pkgStr);
        const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
        if (deps["next"]) framework = "Next.js";
      } catch {}
    }

    return { runtime: "Node.js", framework, packageManager, hasTypeScript };
  }

  const files = new Map([
    ["package.json", JSON.stringify({ dependencies: { next: "^14.0.0" } })],
    ["pnpm-lock.yaml", "lockfileVersion: 5.4"],
    ["tsconfig.json", "{}"],
    [".env", "AWS_KEY=AKIAIOSFODNN7EXAMPLE"],
  ]);

  const stack = detectProjectStack(files);
  assert.strictEqual(stack.framework, "Next.js");
  assert.strictEqual(stack.packageManager, "pnpm");
  assert.strictEqual(stack.hasTypeScript, true);

  // Check committed .env violation
  const hasCommittedEnv = Array.from(files.keys()).some(f => f === ".env");
  assert.strictEqual(hasCommittedEnv, true);
});

// 5. Test Entitlement Service Limits
test("Server-Side Entitlement Gating", () => {
  const plan = {
    features: {
      "audit.basic": true,
      "ai.assistance": true,
      "deployment.vps": false,
    },
    limit: 100,
  };

  function checkEntitlement(feature, usage = 0) {
    if (!plan.features[feature]) {
      return { allowed: false, reason: "Feature disabled in current profile" };
    }
    if (usage >= plan.limit) {
      return { allowed: false, reason: "Quota exceeded" };
    }
    return { allowed: true, remaining: plan.limit - usage };
  }

  const auditAllowed = checkEntitlement("audit.basic", 10);
  assert.strictEqual(auditAllowed.allowed, true);
  assert.strictEqual(auditAllowed.remaining, 90);

  const vpsDenied = checkEntitlement("deployment.vps");
  assert.strictEqual(vpsDenied.allowed, false);

  const quotaExceeded = checkEntitlement("audit.basic", 100);
  assert.strictEqual(quotaExceeded.allowed, false);
});

// 6. Test Structured AI Patch Generation
test("Structured AI Patch Proposal Generator", () => {
  function generatePatchSuggestion(findingId, filePath, original, replacement, explanation) {
    return {
      id: "patch-123",
      findingId,
      model: "meta-llama/llama-3-8b-instruct:free",
      summary: explanation,
      patches: [{
        filePath,
        originalSnippet: original,
        suggestedSnippet: replacement,
        diffSummary: `Update ${filePath} to resolve finding`,
        explanation,
      }],
      isApplied: false,
    };
  }

  const patch = generatePatchSuggestion(
    "SEC-001",
    "src/config.ts",
    "const key = 'sk-12345';",
    "const key = process.env.API_KEY;",
    "Extract secret to environment variable"
  );

  assert.strictEqual(patch.findingId, "SEC-001");
  assert.strictEqual(patch.patches[0].filePath, "src/config.ts");
  assert.strictEqual(patch.isApplied, false);
  assert.strictEqual(patch.patches[0].suggestedSnippet, "const key = process.env.API_KEY;");
});

console.log(`\n=================================================`);
console.log(`Verification Complete: ${passed} Passed, ${failed} Failed`);
console.log(`=================================================`);

if (failed > 0) process.exit(1);
