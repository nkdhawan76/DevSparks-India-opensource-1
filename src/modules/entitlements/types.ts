/**
 * DevSparks DeployCheck — Feature Entitlements Design Contract
 * (Matches ARD Section 12)
 */

export type FeatureKey =
  | "audit.basic"
  | "audit.advanced"
  | "ai.assistance"
  | "ai.patch_suggestions"
  | "deployment.vps"
  | "monitoring.basic"
  | "monitoring.advanced"
  | "team.collaboration"
  | "reports.export";

export interface EntitlementDecision {
  allowed: boolean;
  reason?: string;
  limit?: number;
  remaining?: number;
}

export type PlanTierKey = "free" | "pro" | "enterprise" | "self_hosted_standard";

export interface WorkspacePlan {
  planKey: PlanTierKey;
  displayName: string;
  features: Record<FeatureKey, boolean>;
  monthlyAuditLimit: number;
  maxServers: number;
  maxMonitors: number;
  retentionDays: number;
}

export interface WorkspaceUsageMetrics {
  workspaceId: string;
  auditsThisMonth: number;
  activeServersCount: number;
  activeMonitorsCount: number;
}

