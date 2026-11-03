import {
  AuditFinding,
  AuditRule,
  AuditRunResult,
  AuditSummary,
  ProjectContext,
} from "./types";
import { detectProjectStack } from "./rules/stack-detector";
import { SecretScannerRule } from "./rules/secret-scanner";
import { DependencyCheckerRule } from "./rules/dependency-checker";
import { EnvCheckerRule } from "./rules/env-checker";

export class AuditEngine {
  private rules: AuditRule[] = [
    SecretScannerRule,
    DependencyCheckerRule,
    EnvCheckerRule,
  ];

  public registerRule(rule: AuditRule) {
    this.rules.push(rule);
  }

  public async run(context: ProjectContext): Promise<AuditRunResult> {
    const startedAt = new Date().toISOString();
    const detectedStack = detectProjectStack(context);

    const allFindings: AuditFinding[] = [];

    for (const rule of this.rules) {
      try {
        const findings = await rule.execute(context);
        allFindings.push(...findings);
      } catch (err) {
        allFindings.push({
          id: `rule-error-${rule.id}`,
          ruleId: rule.id,
          severity: "MEDIUM",
          category: "BUILD",
          title: `Rule Execution Failure: ${rule.id}`,
          description: `Internal error while running audit rule ${rule.id}: ${String(err)}`,
          remediation: "Inspect scanner configuration and logs.",
          aiFixAvailable: false,
        });
      }
    }

    const summary: AuditSummary = {
      totalFindings: allFindings.length,
      criticalCount: allFindings.filter((f) => f.severity === "CRITICAL").length,
      highCount: allFindings.filter((f) => f.severity === "HIGH").length,
      mediumCount: allFindings.filter((f) => f.severity === "MEDIUM").length,
      lowCount: allFindings.filter((f) => f.severity === "LOW").length,
      infoCount: allFindings.filter((f) => f.severity === "INFORMATIONAL").length,
      isDeployReady:
        allFindings.filter((f) => f.severity === "CRITICAL" || f.severity === "HIGH")
          .length === 0,
    };

    const status =
      summary.criticalCount > 0
        ? "FAILED"
        : summary.highCount > 0
        ? "WARNING"
        : "SUCCESS";

    return {
      id: `audit-${Date.now()}`,
      projectId: context.projectId,
      workspaceId: context.workspaceId,
      status,
      startedAt,
      completedAt: new Date().toISOString(),
      scannerVersion: "1.3.0",
      detectedStack,
      findings: allFindings,
      summary,
    };
  }
}

export const auditEngine = new AuditEngine();

