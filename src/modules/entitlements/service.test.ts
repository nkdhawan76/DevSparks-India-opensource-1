import { describe, it } from "node:test";
import assert from "node:assert";
import { EntitlementService } from "./service";

describe("EntitlementService", () => {
  it("should permit core audit and AI features in self-hosted mode", async () => {
    const service = new EntitlementService();

    const auditDecision = await service.check({
      workspaceId: "ws-1",
      feature: "audit.basic",
      usage: 10,
    });

    assert.strictEqual(auditDecision.allowed, true);
    assert.strictEqual(auditDecision.remaining, 990);

    const aiDecision = await service.check({
      workspaceId: "ws-1",
      feature: "ai.assistance",
    });

    assert.strictEqual(aiDecision.allowed, true);
  });

  it("should deny future modules (vps, monitoring) before release gates", async () => {
    const service = new EntitlementService();

    const vpsDecision = await service.check({
      workspaceId: "ws-1",
      feature: "deployment.vps",
    });

    assert.strictEqual(vpsDecision.allowed, false);
    assert(vpsDecision.reason?.includes("not enabled"));
  });

  it("should enforce audit quotas atomically", async () => {
    const service = new EntitlementService();

    const overQuotaDecision = await service.check({
      workspaceId: "ws-1",
      feature: "audit.basic",
      usage: 1000,
    });

    assert.strictEqual(overQuotaDecision.allowed, false);
    assert.strictEqual(overQuotaDecision.remaining, 0);
  });
});

