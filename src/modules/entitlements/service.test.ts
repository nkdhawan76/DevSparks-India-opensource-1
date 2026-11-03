import { describe, it, expect } from "vitest";
import { EntitlementService } from "./service";

describe("EntitlementService", () => {
  it("should permit core audit and AI features in self-hosted mode", async () => {
    const service = new EntitlementService();

    const auditDecision = await service.check({
      workspaceId: "ws-1",
      feature: "audit.basic",
      usage: 10,
    });

    expect(auditDecision.allowed).toBe(true);
    expect(auditDecision.remaining).toBe(990);

    const aiDecision = await service.check({
      workspaceId: "ws-1",
      feature: "ai.assistance",
    });

    expect(aiDecision.allowed).toBe(true);
  });

  it("should deny future modules (vps, monitoring) before release gates", async () => {
    const service = new EntitlementService();

    const vpsDecision = await service.check({
      workspaceId: "ws-1",
      feature: "deployment.vps",
    });

    expect(vpsDecision.allowed).toBe(false);
    expect(vpsDecision.reason).toContain("not enabled");
  });

  it("should enforce audit quotas atomically", async () => {
    const service = new EntitlementService();

    const overQuotaDecision = await service.check({
      workspaceId: "ws-1",
      feature: "audit.basic",
      usage: 1000,
    });

    expect(overQuotaDecision.allowed).toBe(false);
    expect(overQuotaDecision.remaining).toBe(0);
  });
});
