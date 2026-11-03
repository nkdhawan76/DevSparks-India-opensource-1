import { EntitlementDecision, FeatureKey, WorkspacePlan } from "./types";

const STANDARD_SELF_HOSTED_PLAN: WorkspacePlan = {
  planKey: "self_hosted_standard",
  displayName: "Self-Hosted Standard Core",
  features: {
    "audit.basic": true,
    "audit.advanced": true,
    "ai.assistance": true,
    "ai.patch_suggestions": true,
    "reports.export": true,
    // Future / planned modules disabled in MVP 0
    "deployment.vps": false,
    "monitoring.basic": false,
    "monitoring.advanced": false,
    "team.collaboration": false,
  },
  monthlyAuditLimit: 1000,
};

export class EntitlementService {
  constructor(private plan: WorkspacePlan = STANDARD_SELF_HOSTED_PLAN) {}

  public async check(input: {
    workspaceId: string;
    feature: FeatureKey;
    usage?: number;
  }): Promise<EntitlementDecision> {
    const isFeatureEnabled = this.plan.features[input.feature];

    if (!isFeatureEnabled) {
      return {
        allowed: false,
        reason: `Feature '${input.feature}' is not enabled in the current ${this.plan.displayName} profile.`,
      };
    }

    if (input.feature === "audit.basic" && input.usage !== undefined) {
      if (input.usage >= this.plan.monthlyAuditLimit) {
        return {
          allowed: false,
          reason: `Monthly audit quota (${this.plan.monthlyAuditLimit}) reached for workspace.`,
          limit: this.plan.monthlyAuditLimit,
          remaining: 0,
        };
      }

      return {
        allowed: true,
        limit: this.plan.monthlyAuditLimit,
        remaining: this.plan.monthlyAuditLimit - input.usage,
      };
    }

    return { allowed: true };
  }
}

export const entitlementService = new EntitlementService();
