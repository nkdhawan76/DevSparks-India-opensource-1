import { AuditFinding, AuditRule, ProjectContext } from "../types";

export const DockerCheckerRule: AuditRule = {
  id: "DOC-001",
  category: "CONFIGURATION",
  defaultSeverity: "MEDIUM",
  async execute(context: ProjectContext): Promise<AuditFinding[]> {
    const findings: AuditFinding[] = [];
    const dockerfile = context.files.get("Dockerfile");

    if (!dockerfile) {
      return findings;
    }

    const lines = dockerfile.split("\n");

    // 1. Check for unpinned :latest tag
    const fromLineIndex = lines.findIndex((l) => /^\s*FROM\s+/i.test(l));
    if (fromLineIndex !== -1) {
      const fromLine = lines[fromLineIndex];
      if (/:latest\s*$/i.test(fromLine.trim()) || (/^\s*FROM\s+[\w/-]+$/i.test(fromLine.trim()) && !fromLine.includes("@"))) {
        findings.push({
          id: "docker-unpinned-base-image",
          ruleId: "DOC-001",
          severity: "MEDIUM",
          category: "CONFIGURATION",
          title: "Unpinned Docker Base Image",
          description: "The Dockerfile FROM statement uses an unpinned or ':latest' image tag. This can cause non-reproducible production builds.",
          filePath: "Dockerfile",
          lineStart: fromLineIndex + 1,
          remediation: "Pin the base image to a specific SHA digest or version tag (e.g., node:20-alpine).",
          aiFixAvailable: true,
        });
      }
    }

    // 2. Check for missing non-root USER directive
    const hasUserDirective = lines.some((l) => /^\s*USER\s+(?!root\b)\w+/i.test(l));
    if (!hasUserDirective) {
      findings.push({
        id: "docker-root-user",
        ruleId: "DOC-002",
        severity: "HIGH",
        category: "SECURITY",
        title: "Container Executes as Root User",
        description: "No non-root USER instruction was found in the Dockerfile. Running containers as root increases container breakout risks.",
        filePath: "Dockerfile",
        remediation: "Create and switch to a non-root user (e.g., USER node or adduser -S appuser).",
        aiFixAvailable: true,
      });
    }

    // 3. Check for HEALTHCHECK instruction
    const hasHealthcheck = lines.some((l) => /^\s*HEALTHCHECK\s+/i.test(l));
    if (!hasHealthcheck) {
      findings.push({
        id: "docker-missing-healthcheck",
        ruleId: "DOC-003",
        severity: "LOW",
        category: "READINESS",
        title: "Missing Docker HEALTHCHECK Directive",
        description: "The Dockerfile does not specify a HEALTHCHECK instruction. Container orchestrators rely on health checks to detect deadlocked services.",
        filePath: "Dockerfile",
        remediation: "Add a HEALTHCHECK instruction to probe the application HTTP status.",
        aiFixAvailable: true,
      });
    }

    return findings;
  },
};
