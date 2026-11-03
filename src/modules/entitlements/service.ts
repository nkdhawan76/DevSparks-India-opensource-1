import { EntitlementDecision, FeatureKey, WorkspacePlan } from "./types";

import {
  EntitlementDecision,
  FeatureKey,
  PlanTierKey,
  WorkspacePlan,
  WorkspaceUsageMetrics,
} from "./types";

export const PLANS: Record<PlanTierKey, WorkspacePlan> = {
  free: {
    planKey: "free",
    displayName: "Community Edition (Self-Hosted Free)",
    features: {
      "audit.basic": true,
      "audit.advanced": false,
      "ai.assistance": true,
      "ai.patch_suggestions": true,
      "deployment.vps": true,
      "monitoring.basic": true,
      "monitoring.advanced": false,
      "team.collaboration": false,
      "reports.export": false,
    },
    monthlyAuditLimit: 50,
    maxServers: 1,
    maxMonitors: 2,
    retentionDays: 7,
  },

  pro: {
    planKey: "pro",
    displayName: "Pro Developer Tier",
    features: {
      "audit.basic": true,
      "audit.advanced": true,
      "ai.assistance": true,
      "ai.patch_suggestions": true,
      "deployment.vps": true,
      "monitoring.basic": true,
      "monitoring.advanced": true,
      "team.collaboration": true,
      "reports.export": true,
    },
    monthlyAuditLimit: 500,
    maxServers: 5,
    maxMonitors: 10,
    retentionDays: 30,
  },

  enterprise: {
    planKey: "enterprise",
    displayName: "Team & Enterprise Cloud",
    features: {
      "audit.basic": true,
      "audit.advanced": true,
      "ai.assistance": true,
      "ai.patch_suggestions": true,
      "deployment.vps": true,
      "monitoring.basic": true,
      "monitoring.advanced": true,
      "team.collaboration": true,
      "reports.export": true,
    },
    monthlyAuditLimit: 10000,
    maxServers: 100,
    maxMonitors: 200,
    retentionDays: 365,
  },

  self_hosted_standard: {
    planKey: "self_hosted_standard",
    displayName: "Self-Hosted Standard Core",
    features: {
      "audit.basic": true,
      "audit.advanced": true,
      "ai.assistance": true,
      "ai.patch_suggestions": true,
      "deployment.vps": true,
      "monitoring.basic": true,
      "monitoring.advanced": true,
      "team.collaboration": false,
      "reports.export": true,
    },
    monthlyAuditLimit: 1000,
    maxServers: 10,
    maxMonitors: 25,
    retentionDays: 90,
  },
};

export class EntitlementService {
  constructor(private plan: WorkspacePlan = PLANS.self_hosted_standard) {}

  public getPlan(planKey: PlanTierKey = "self_hosted_standard"): WorkspacePlan {
    return PLANS[planKey] || this.plan;
  }

  public async check(input: {
    workspaceId: string;
    feature: FeatureKey;
    usage?: number;
    resourceCount?: number;
    planTier?: PlanTierKey;
  }): Promise<EntitlementDecision> {
    const activePlan = input.planTier ? PLANS[input.planTier] : this.plan;
    const isFeatureEnabled = activePlan.features[input.feature];

    if (!isFeatureEnabled) {
      return {
        allowed: false,
        reason: `Feature '${input.feature}' is not enabled in the ${activePlan.displayName} profile.`,
      };
    }

    // Monthly Audit Quota
    if (input.feature === "audit.basic" && input.usage !== undefined) {
      if (input.usage >= activePlan.monthlyAuditLimit) {
        return {
          allowed: false,
          reason: `Monthly audit quota (${activePlan.monthlyAuditLimit}) reached for workspace.`,
          limit: activePlan.monthlyAuditLimit,
          remaining: 0,
        };
      }

      return {
        allowed: true,
        limit: activePlan.monthlyAuditLimit,
        remaining: activePlan.monthlyAuditLimit - input.usage,
      };
    }

    // Server Quota Check
    if (input.feature === "deployment.vps" && input.resourceCount !== undefined) {
      if (input.resourceCount >= activePlan.maxServers) {
        return {
          allowed: false,
          reason: `Server limit (${activePlan.maxServers}) reached for ${activePlan.displayName}. Upgrade plan to add more servers.`,
          limit: activePlan.maxServers,
          remaining: 0,
        };
      }
      return {
        allowed: true,
        limit: activePlan.maxServers,
        remaining: activePlan.maxServers - input.resourceCount,
      };
    }

    // Monitor Targets Quota Check
    if (input.feature === "monitoring.basic" && input.resourceCount !== undefined) {
      if (input.resourceCount >= activePlan.maxMonitors) {
        return {
          allowed: false,
          reason: `Monitoring target limit (${activePlan.maxMonitors}) reached for ${activePlan.displayName}.`,
          limit: activePlan.maxMonitors,
          remaining: 0,
        };
      }
      return {
        allowed: true,
        limit: activePlan.maxMonitors,
        remaining: activePlan.maxMonitors - input.resourceCount,
      };
    }

    return { allowed: true };
  }

  public getWorkspaceUsage(workspaceId: string): WorkspaceUsageMetrics {
    return {
      workspaceId,
      auditsThisMonth: 12,
      activeServersCount: 2,
      activeMonitorsCount: 1,
    };
  }
}

export const entitlementService = new EntitlementService();

