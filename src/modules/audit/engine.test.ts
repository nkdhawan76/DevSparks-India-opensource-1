import { describe, it } from "node:test";
import assert from "node:assert";
import { AuditEngine } from "./engine";
import { ProjectContext } from "./types";

describe("AuditEngine", () => {
  it("should successfully audit a clean Next.js + TypeScript project", async () => {
    const engine = new AuditEngine();

    const cleanFiles = new Map<string, string>([
      [
        "package.json",
        JSON.stringify({
          name: "clean-app",
          scripts: { build: "next build" },
          dependencies: { next: "14.2.0", react: "18.3.0" },
        }),
      ],
      ["pnpm-lock.yaml", "lockfileVersion: 5.4"],
      ["tsconfig.json", "{}"],
      [".env.example", "DATABASE_URL=postgres://localhost:5432/db"],
      ["src/index.ts", "console.log('Production ready!');"],
    ]);

    const context: ProjectContext = {
      workspaceId: "ws-123",
      projectId: "proj-456",
      files: cleanFiles,
    };

    const result = await engine.run(context);

    assert.strictEqual(result.status, "SUCCESS");
    assert.strictEqual(result.detectedStack.framework, "Next.js");
    assert.strictEqual(result.detectedStack.packageManager, "pnpm");
    assert.strictEqual(result.detectedStack.hasTypeScript, true);
    assert.strictEqual(result.summary.criticalCount, 0);
    assert.strictEqual(result.summary.highCount, 0);
    assert.strictEqual(result.summary.isDeployReady, true);
  });

  it("should flag critical findings when secrets and committed .env exist", async () => {
    const engine = new AuditEngine();

    const dirtyFiles = new Map<string, string>([
      [
        "package.json",
        JSON.stringify({
          name: "vulnerable-app",
          scripts: { build: "next build" },
        }),
      ],
      [".env", "SECRET_KEY=supersecret123\nAWS_KEY=AKIAIOSFODNN7EXAMPLE"],
      ["src/config.ts", "const apiKey = 'sk-abcdef12345678901234567890';"],
    ]);

    const context: ProjectContext = {
      workspaceId: "ws-123",
      projectId: "proj-789",
      files: dirtyFiles,
    };

    const result = await engine.run(context);

    assert.strictEqual(result.status, "FAILED");
    assert.strictEqual(result.summary.isDeployReady, false);
    assert(result.summary.criticalCount >= 2);

    const ruleIds = result.findings.map((f) => f.ruleId);
    assert(ruleIds.includes("SEC-001")); // Secret scanner
    assert(ruleIds.includes("CFG-001")); // Committed .env
    assert(ruleIds.includes("DEP-002")); // Missing lockfile
  });
});

