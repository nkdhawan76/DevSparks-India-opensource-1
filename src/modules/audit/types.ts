/**
 * DevSparks DeployCheck — Audit Engine Domain Types
 */

export type FindingSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFORMATIONAL";

export type FindingCategory =
  | "SECURITY"
  | "CONFIGURATION"
  | "DEPENDENCY"
  | "BUILD"
  | "READINESS";

export interface AuditFinding {
  id: string;
  ruleId: string;
  severity: FindingSeverity;
  category: FindingCategory;
  title: string;
  description: string;
  filePath?: string;
  lineStart?: number;
  lineEnd?: number;
  evidenceRedacted?: string;
  remediation: string;
  aiFixAvailable: boolean;
}

export interface DetectedStack {
  runtime: string;
  framework?: string;
  language: string;
  packageManager: "npm" | "pnpm" | "yarn" | "unknown";
  hasTypeScript: boolean;
  hasDockerfile: boolean;
}

export interface AuditSummary {
  totalFindings: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  infoCount: number;
  isDeployReady: boolean;
}

export interface AuditRunResult {
  id: string;
  projectId: string;
  workspaceId: string;
  status: "SUCCESS" | "WARNING" | "FAILED";
  startedAt: string;
  completedAt: string;
  scannerVersion: string;
  detectedStack: DetectedStack;
  findings: AuditFinding[];
  summary: AuditSummary;
}

export interface AuditRule {
  id: string;
  category: FindingCategory;
  defaultSeverity: FindingSeverity;
  execute(context: ProjectContext): Promise<AuditFinding[]>;
}

export interface ProjectContext {
  workspaceId: string;
  projectId: string;
  files: Map<string, string>; // In-memory map of file paths to content (virtual runner)
}
