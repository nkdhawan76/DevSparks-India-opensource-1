import { describe, it, expect } from "vitest";
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

    expect(result.status).toBe("SUCCESS");
    expect(result.detectedStack.framework).toBe("Next.js");
    expect(result.detectedStack.packageManager).toBe("pnpm");
    expect(result.detectedStack.hasTypeScript).toBe(true);
    expect(result.summary.criticalCount).toBe(0);
    expect(result.summary.highCount).toBe(0);
    expect(result.summary.isDeployReady).toBe(true);
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

    expect(result.status).toBe("FAILED");
    expect(result.summary.isDeployReady).toBe(false);
    expect(result.summary.criticalCount).toBeGreaterThanOrEqual(2);

    const ruleIds = result.findings.map((f) => f.ruleId);
    expect(ruleIds).toContain("SEC-001"); // Secret scanner
    expect(ruleIds).toContain("CFG-001"); // Committed .env
    expect(ruleIds).toContain("DEP-002"); // Missing lockfile
  });
});

