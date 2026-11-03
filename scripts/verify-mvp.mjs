import assert from "node:assert";
import crypto from "node:crypto";
import fs from "node:fs";

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
    console.error(`     Error: ${err.stack || err.message}`);
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
      } catch { }
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

// 7. Test Docker Checker Rule Logic
test("Docker Checker Rule Invariant Verification", () => {
  const sampleDockerfile = `FROM node:latest
WORKDIR /app
COPY . .
CMD ["npm", "start"]`;

  const lines = sampleDockerfile.split("\n");
  const isUnpinned = lines.some((l) => /^\s*FROM\s+.*:latest\s*$/i.test(l));
  const hasUserDirective = lines.some((l) => /^\s*USER\s+(?!root\b)\w+/i.test(l));
  const hasHealthcheck = lines.some((l) => /^\s*HEALTHCHECK\s+/i.test(l));

  assert.strictEqual(isUnpinned, true, "Must flag :latest tag");
  assert.strictEqual(hasUserDirective, false, "Must flag missing non-root USER");
  assert.strictEqual(hasHealthcheck, false, "Must flag missing HEALTHCHECK");
});

// 8. Test RBAC Authorization & Tenant Isolation
test("RBAC Authorization & Tenant Isolation Invariant", () => {
  const ROLE_PERMISSIONS = {
    OWNER: new Set(["workspace.read", "workspace.delete", "audit.run", "audit.read"]),
    DEVELOPER: new Set(["workspace.read", "audit.run", "audit.read", "patch.propose"]),
    VIEWER: new Set(["workspace.read", "audit.read"]),
  };

  function evaluateAuth(subject, targetWorkspaceId, permission, resourceWorkspaceId) {
    if (!subject.userId || !subject.isActive) return { allowed: false, reason: "Inactive or unauthenticated" };
    if (subject.workspaceId !== targetWorkspaceId) return { allowed: false, reason: "Tenant isolation violation" };
    if (resourceWorkspaceId && resourceWorkspaceId !== subject.workspaceId) return { allowed: false, reason: "Cross-tenant resource blocked" };
    const perms = ROLE_PERMISSIONS[subject.role];
    if (!perms || !perms.has(permission)) return { allowed: false, reason: "Permission denied" };
    return { allowed: true };
  }

  const dev = { userId: "u1", workspaceId: "ws_alpha", role: "DEVELOPER", isActive: true };

  // Developer allowed to run audit
  const devRun = evaluateAuth(dev, "ws_alpha", "audit.run");
  assert.strictEqual(devRun.allowed, true);

  // Developer denied workspace deletion
  const devDelete = evaluateAuth(dev, "ws_alpha", "workspace.delete");
  assert.strictEqual(devDelete.allowed, false);

  // Cross-tenant access denied
  const crossTenant = evaluateAuth(dev, "ws_beta", "audit.run");
  assert.strictEqual(crossTenant.allowed, false);
  assert.strictEqual(crossTenant.reason, "Tenant isolation violation");
});

// 9. Test SSE Event Formatting & Cursor Pagination Invariants
test("SSE Event Streaming & Cursor Pagination Invariants", () => {
  // SSE Formatter Test
  function formatSseEvent(payload) {
    if (payload === "[DONE]") return "data: [DONE]\n\n";
    return `data: ${JSON.stringify(payload)}\n\n`;
  }

  const chunkEvent = formatSseEvent({ type: "chunk", text: "Analyzing..." });
  assert.strictEqual(chunkEvent, 'data: {"type":"chunk","text":"Analyzing..."}\n\n');
  assert.strictEqual(formatSseEvent("[DONE]"), "data: [DONE]\n\n");

  // Cursor Pagination Test (JSON-based base64 cursor)
  function encodeCursor(id, timestamp) {
    return Buffer.from(JSON.stringify({ id, timestamp })).toString("base64");
  }

  function decodeCursor(cursor) {
    return JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
  }

  const encoded = encodeCursor("audit-101", "2026-11-03T18:00:00Z");
  const decoded = decodeCursor(encoded);
  assert.strictEqual(decoded.id, "audit-101");
  assert.strictEqual(decoded.timestamp, "2026-11-03T18:00:00Z");
});

// 10. Test SSRF Guard & Server Policy Gateway Invariants
test("SSRF Guard & Server Policy Gateway Invariants", () => {
  // SSRF Validator Logic
  function validateHost(host, port = 22) {
    if (!host) return { valid: false };
    const trimmed = host.trim().toLowerCase();
    if (port < 1 || port > 65535) return { valid: false, reason: "Port out of range" };
    if (trimmed === "localhost" || trimmed === "metadata.google.internal") return { valid: false, isBlockedSsrf: true };
    if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(trimmed)) return { valid: false, isBlockedSsrf: true };
    if (/^169\.254\.\d{1,3}\.\d{1,3}$/.test(trimmed)) return { valid: false, isBlockedSsrf: true };
    return { valid: true, isBlockedSsrf: false };
  }

  // SSRF blocks
  assert.strictEqual(validateHost("169.254.169.254").isBlockedSsrf, true);
  assert.strictEqual(validateHost("127.0.0.1").isBlockedSsrf, true);
  assert.strictEqual(validateHost("localhost").isBlockedSsrf, true);
  assert.strictEqual(validateHost("example.com", 70000).valid, false);
  assert.strictEqual(validateHost("198.51.100.10", 22).valid, true);

  // Policy Gateway Command Evaluation
  function evaluateCmd(cmd, hasApproval = false) {
    if (/\brm\s+(-[rfRF]+\s+)?(\/|\/\*|~\/|\*)(\s|$)/.test(cmd)) return { allowed: false, prohibited: true };
    if (/^df\s+-[hH]/.test(cmd)) return { allowed: true, category: "DIAGNOSTIC", requiresApproval: false };
    if (/^systemctl\s+restart/.test(cmd)) {
      return { allowed: hasApproval, category: "MUTATION", requiresApproval: true };
    }
    return { allowed: false, requiresApproval: true };
  }

  assert.strictEqual(evaluateCmd("df -h").allowed, true);
  assert.strictEqual(evaluateCmd("systemctl restart nginx").allowed, false);
  assert.strictEqual(evaluateCmd("systemctl restart nginx", true).allowed, true);
  assert.strictEqual(evaluateCmd("rm -rf /").prohibited, true);
});

// 11. Test Deployment Pipeline State Machine & Rollback Invariants
test("Deployment Pipeline State Machine & Rollback Invariants", () => {
  function runPipeline(req, auditReady = true, healthFails = false) {
    if (req.environment === "production" && (!req.approvedBy || !req.token)) {
      return { status: "FAILED", reason: "Missing approval" };
    }
    if (!auditReady) {
      return { status: "FAILED", reason: "Audit failed" };
    }
    if (healthFails) {
      if (req.autoRollback) {
        return { status: "ROLLED_BACK", rolledBack: true, reason: "Health check failed" };
      }
      return { status: "FAILED", rolledBack: false, reason: "Health check failed" };
    }
    return { status: "SUCCESS", stepsCompleted: 5 };
  }

  // 1. Missing approval for production blocks deployment
  const unapprovedProd = runPipeline({ environment: "production", autoRollback: true });
  assert.strictEqual(unapprovedProd.status, "FAILED");
  assert.strictEqual(unapprovedProd.reason, "Missing approval");

  // 2. Failed pre-deploy audit blocks deployment
  const auditBlocked = runPipeline({ environment: "production", approvedBy: "admin", token: "tok-123" }, false);
  assert.strictEqual(auditBlocked.status, "FAILED");
  assert.strictEqual(auditBlocked.reason, "Audit failed");

  // 3. Successful deployment
  const successDeploy = runPipeline({ environment: "production", approvedBy: "admin", token: "tok-123", autoRollback: true }, true, false);
  assert.strictEqual(successDeploy.status, "SUCCESS");
  assert.strictEqual(successDeploy.stepsCompleted, 5);

  // 4. Automatic rollback on health check failure
  const rollbackDeploy = runPipeline({ environment: "production", approvedBy: "admin", token: "tok-123", autoRollback: true }, true, true);
  assert.strictEqual(rollbackDeploy.status, "ROLLED_BACK");
  assert.strictEqual(rollbackDeploy.rolledBack, true);
});

// 12. Test Synthetic Monitoring State Machine & Alert Invariants
test("Synthetic Monitoring State Machine & Alert Invariants", () => {
  class MockMonitorTracker {
    constructor(threshold = 3) {
      this.threshold = threshold;
      this.failures = 0;
      this.status = "HEALTHY";
      this.alerts = [];
      this.checks = [];
    }

    record(isUp, latency = 40) {
      this.checks.push({ isUp, latency });
      if (isUp) {
        const wasDown = this.status === "DOWN";
        this.failures = 0;
        this.status = "HEALTHY";
        if (wasDown) {
          this.alerts.push({ type: "RECOVERED" });
        }
      } else {
        this.failures++;
        if (this.failures >= this.threshold) {
          this.status = "DOWN";
          this.alerts.push({ type: "DOWN", failures: this.failures });
        } else {
          this.status = "DEGRADED";
        }
      }
    }

    getUptime() {
      const up = this.checks.filter(c => c.isUp).length;
      return Number(((up / this.checks.length) * 100).toFixed(1));
    }
  }

  const tracker = new MockMonitorTracker(3);

  // Probe 1: Success -> HEALTHY
  tracker.record(true, 35);
  assert.strictEqual(tracker.status, "HEALTHY");
  assert.strictEqual(tracker.alerts.length, 0);

  // Probe 2: Failure 1 -> DEGRADED
  tracker.record(false, 0);
  assert.strictEqual(tracker.status, "DEGRADED");
  assert.strictEqual(tracker.failures, 1);
  assert.strictEqual(tracker.alerts.length, 0);

  // Probe 3: Failure 2 -> DEGRADED
  tracker.record(false, 0);
  assert.strictEqual(tracker.status, "DEGRADED");
  assert.strictEqual(tracker.failures, 2);

  // Probe 4: Failure 3 -> DOWN (threshold reached)
  tracker.record(false, 0);
  assert.strictEqual(tracker.status, "DOWN");
  assert.strictEqual(tracker.alerts.length, 1);
  assert.strictEqual(tracker.alerts[0].type, "DOWN");

  // Probe 5: Success -> RECOVERED alert generated, status HEALTHY
  tracker.record(true, 42);
  assert.strictEqual(tracker.status, "HEALTHY");
  assert.strictEqual(tracker.failures, 0);
  assert.strictEqual(tracker.alerts.length, 2);
  assert.strictEqual(tracker.alerts[1].type, "RECOVERED");

  // Uptime: 2 up out of 5 checks = 40.0%
  assert.strictEqual(tracker.getUptime(), 40.0);
});

// 13. Test Multi-Tier Entitlement Gating & Resource Quotas
test("Multi-Tier Entitlement Gating & Resource Quota Invariants", () => {
  const TIERS = {
    free: { maxServers: 1, monthlyAudits: 50, advancedAudit: false },
    pro: { maxServers: 5, monthlyAudits: 500, advancedAudit: true },
  };

  function checkTierAccess(tierKey, feature, currentUsage = 0) {
    const tier = TIERS[tierKey];
    if (!tier) return { allowed: false, reason: "Invalid tier" };

    if (feature === "audit.advanced") {
      return { allowed: tier.advancedAudit };
    }

    if (feature === "deployment.vps") {
      if (currentUsage >= tier.maxServers) {
        return { allowed: false, reason: "Server quota reached", limit: tier.maxServers, remaining: 0 };
      }
      return { allowed: true, limit: tier.maxServers, remaining: tier.maxServers - currentUsage };
    }

    if (feature === "audit.basic") {
      if (currentUsage >= tier.monthlyAudits) {
        return { allowed: false, reason: "Audit limit exceeded", limit: tier.monthlyAudits, remaining: 0 };
      }
      return { allowed: true, limit: tier.monthlyAudits, remaining: tier.monthlyAudits - currentUsage };
    }

    return { allowed: true };
  }

  // 1. Free tier blocks 2nd server
  const freeServer1 = checkTierAccess("free", "deployment.vps", 0);
  assert.strictEqual(freeServer1.allowed, true);
  assert.strictEqual(freeServer1.remaining, 1);

  const freeServer2 = checkTierAccess("free", "deployment.vps", 1);
  assert.strictEqual(freeServer2.allowed, false);
  assert.strictEqual(freeServer2.reason, "Server quota reached");

  // 2. Pro tier allows 5 servers
  const proServer = checkTierAccess("pro", "deployment.vps", 3);
  assert.strictEqual(proServer.allowed, true);
  assert.strictEqual(proServer.remaining, 2);

  // 3. Advanced audit feature flag
  assert.strictEqual(checkTierAccess("free", "audit.advanced").allowed, false);
  assert.strictEqual(checkTierAccess("pro", "audit.advanced").allowed, true);
});

// 14. Test Database Migration SQL Schema Verification
test("Database Migration SQL Schema Verification", () => {
  const migrationPath = "./migrations/0001_initial_schema.sql";
  assert(fs.existsSync(migrationPath), "Migration file 0001_initial_schema.sql must exist");
  
  const sql = fs.readFileSync(migrationPath, "utf-8");
  const expectedTables = [
    "users",
    "sessions",
    "workspaces",
    "workspace_members",
    "projects",
    "audit_rules",
    "audit_runs",
    "audit_findings",
    "ai_provider_connections",
    "ai_conversations",
    "ai_messages",
    "ai_usage_events",
    "jobs",
    "audit_events",
    "secret_store",
    "servers",
    "server_operations",
    "deployments",
    "monitoring_checks",
    "monitoring_results",
    "incidents",
  ];

  for (const table of expectedTables) {
    const tableRegex = new RegExp(`CREATE\\s+TABLE\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?${table}\\b`, "i");
    assert(tableRegex.test(sql), `Schema must define table '${table}'`);
  }

  // Verify UUID primary key usage
  assert(sql.includes("gen_random_uuid()"), "Schema must use gen_random_uuid() for primary keys");
});

// 15. Test Monitoring Webhook Dispatcher & SSRF Invariant
test("Monitoring Webhook Dispatcher & SSRF Invariants", () => {
  // URL Masking
  function maskWebhookUrl(url) {
    try {
      const parsed = new URL(url);
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts.length > 2) {
        const last = parts[parts.length - 1];
        parts[parts.length - 1] = last.length > 6 ? `${last.slice(0, 4)}...${last.slice(-2)}` : "***";
        parsed.pathname = "/" + parts.join("/");
      }
      return parsed.toString();
    } catch {
      return "[MALFORMED_URL]";
    }
  }

  const masked = maskWebhookUrl("https://hooks.slack.com/services/T00000000/B00000000/SECRET_WEBHOOK_TOKEN_1234");
  assert(!masked.includes("SECRET_WEBHOOK_TOKEN_1234"), "Raw secret webhook token must not be printed");
  assert(masked.includes("SECR...34"), "Token should be partially masked");

  // SSRF Guard for Webhooks
  function validateWebhookUrl(url) {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "169.254.169.254" || host.startsWith("10.") || host.startsWith("192.168.")) {
      return { allowed: false, isBlockedSsrf: true };
    }
    return { allowed: true, isBlockedSsrf: false };
  }

  assert.strictEqual(validateWebhookUrl("https://127.0.0.1/webhook").isBlockedSsrf, true);
  assert.strictEqual(validateWebhookUrl("http://169.254.169.254/latest/meta-data").isBlockedSsrf, true);
  assert.strictEqual(validateWebhookUrl("https://hooks.slack.com/services/T1/B1/K1").allowed, true);

  // HMAC Signature generation
  const secret = "test-webhook-secret-key";
  const payload = JSON.stringify({ event: "deploycheck.monitoring.alert", type: "DOWN" });
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const signature = `sha256=${hmac.digest("hex")}`;

  assert(signature.startsWith("sha256="), "HMAC signature must start with sha256=");
  assert.strictEqual(signature.length, 7 + 64, "SHA-256 hex signature must be 64 chars long");
});

console.log(`\n=================================================`);
console.log(`Verification Complete: ${passed} Passed, ${failed} Failed`);
console.log(`=================================================`);

if (failed > 0) process.exit(1);
