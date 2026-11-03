/**
 * DevSparks DeployCheck — Guided Deployment Types
 * Adheres to ARD Section 8 & Section 10.3 (Policy-Controlled Deployments).
 */

export type DeploymentStepType =
  | "PRE_DEPLOY_AUDIT"
  | "PULL_SOURCE"
  | "INSTALL_DEPENDENCIES"
  | "RUN_MIGRATIONS"
  | "BUILD_APPLICATION"
  | "HEALTH_CHECK"
  | "ROLLBACK";

export type DeploymentStepStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "SKIPPED";

export type DeploymentOverallStatus =
  | "QUEUED"
  | "RUNNING"
  | "SUCCESS"
  | "FAILED"
  | "ROLLED_BACK";

export interface DeploymentStepExecution {
  step: DeploymentStepType;
  status: DeploymentStepStatus;
  startedAt?: string;
  completedAt?: string;
  outputSummary?: string;
  errorMessage?: string;
}

export interface DeploymentRequest {
  id: string;
  workspaceId: string;
  projectId: string;
  serverId: string;
  commitHash: string;
  branch: string;
  triggeredByUserId: string;
  approvedByUserId?: string;
  approvalToken?: string;
  environment: "production" | "staging" | "development";
  autoRollbackOnHealthFailure: boolean;
}

export interface DeploymentExecutionResult {
  id: string;
  workspaceId: string;
  projectId: string;
  serverId: string;
  status: DeploymentOverallStatus;
  startedAt: string;
  completedAt?: string;
  steps: DeploymentStepExecution[];
  auditPassed: boolean;
  rollbackTriggered: boolean;
  failureReason?: string;
}

