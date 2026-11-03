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

export interface WorkspacePlan {
  planKey: "free" | "pro" | "self_hosted_standard";
  displayName: string;
  features: Record<FeatureKey, boolean>;
  monthlyAuditLimit: number;
}

