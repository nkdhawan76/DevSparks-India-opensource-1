import { AuditFinding, AuditRule, ProjectContext } from "../types";

export const EnvCheckerRule: AuditRule = {
  id: "CFG-001",
  category: "CONFIGURATION",
  defaultSeverity: "HIGH",
  async execute(context: ProjectContext): Promise<AuditFinding[]> {
    const findings: AuditFinding[] = [];

    // Check if raw .env files are accidentally tracked
    const committedEnvFiles = Array.from(context.files.keys()).filter((f) =>
      /^\.env(?:\.local|\.production|\.development)?$/.test(f)
    );

    for (const envFile of committedEnvFiles) {
      findings.push({
        id: `committed-env-${envFile}`,
        ruleId: "CFG-001",
        severity: "CRITICAL",
        category: "SECURITY",
        title: `Committed Environment File: ${envFile}`,
        description: `Found active environment file '${envFile}' committed to the repository. Live environment files often contain API keys, database credentials, or secret tokens.`,
        filePath: envFile,
        remediation:
          `Remove '${envFile}' from git tracking (e.g., git rm --cached ${envFile}), add it to .gitignore, and provide an empty template in .env.example instead.`,
        aiFixAvailable: true,
      });
    }

    // Check if .env.example exists to document required runtime config
    const hasExampleEnv =
      context.files.has(".env.example") || context.files.has(".env.template");

    if (!hasExampleEnv) {
      findings.push({
        id: "missing-env-example",
        ruleId: "CFG-002",
        severity: "LOW",
        category: "CONFIGURATION",
        title: "Missing .env.example Documentation",
        description: "No .env.example or .env.template file was found. Documenting required environment variables enables safe, reproducible server configuration.",
        filePath: ".env.example",
        remediation: "Create a .env.example file containing placeholders for all required environment keys.",
        aiFixAvailable: true,
      });
    }

    return findings;
  },
};
