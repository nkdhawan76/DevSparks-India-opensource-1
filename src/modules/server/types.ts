/**
 * DevSparks DeployCheck — VPS & Server Gateway Types
 * Adheres strictly to ARD Section 10.2 (SSH & Server Security) and 10.3 (Approval Gates).
 */

export type ServerEnvironment = "production" | "staging" | "development";

export type ServerCommandCategory = "DIAGNOSTIC" | "MUTATION" | "HIGH_RISK";

export interface ServerConnectionConfig {
  id: string;
  workspaceId: string;
  name: string;
  host: string;
  port: number;
  username: string;
  environment: ServerEnvironment;
  hostKeyFingerprint: string;
  keyFingerprint: string;
  status: "CONNECTED" | "UNREACHABLE" | "DEGRADED" | "REQUIRES_AUTH";
  lastCheckedAt?: string;
}

export interface DiagnosticMetrics {
  cpuUsagePercent: number;
  memoryUsedMb: number;
  memoryTotalMb: number;
  memoryUsagePercent: number;
  diskUsedGb: number;
  diskTotalGb: number;
  diskUsagePercent: number;
  uptimeSeconds: number;
  dockerRunning: boolean;
  activeContainersCount: number;
}

export interface ServerCommandRequest {
  serverId: string;
  workspaceId: string;
  requestedByUserId: string;
  command: string;
  category: ServerCommandCategory;
  rationale?: string;
  approvedByUserId?: string;
  approvalToken?: string;
}

export interface CommandPolicyEvaluation {
  allowed: boolean;
  category: ServerCommandCategory;
  requiresExplicitApproval: boolean;
  isProhibited: boolean;
  rejectionReason?: string;
}

export interface CommandExecutionResult {
  executionId: string;
  serverId: string;
  command: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
  executedAt: string;
  sanitized: boolean;
}
