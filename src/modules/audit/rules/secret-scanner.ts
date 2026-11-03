import { AuditFinding, AuditRule, ProjectContext } from "../types";

const SECRET_PATTERNS = [
  {
    name: "AWS Access Key",
    regex: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/g,
    severity: "CRITICAL" as const,
  },
  {
    name: "Generic Private Key",
    regex: /-----BEGIN (?:RSA|OPENSSH|DSA|EC)? PRIVATE KEY-----/g,
    severity: "CRITICAL" as const,
  },
  {
    name: "GitHub Personal Access Token",
    regex: /ghp_[a-zA-Z0-9]{36}/g,
    severity: "CRITICAL" as const,
  },
  {
    name: "OpenAI / AI Provider API Key",
    regex: /sk-[a-zA-Z0-9]{20,48}/g,
    severity: "CRITICAL" as const,
  },
  {
    name: "Slack Webhook URL",
    regex: /https:\/\/hooks\.slack\.com\/services\/T[a-zA-Z0-9_]+\/B[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/g,
    severity: "HIGH" as const,
  },
];

export const SecretScannerRule: AuditRule = {
  id: "SEC-001",
  category: "SECURITY",
  defaultSeverity: "CRITICAL",
  async execute(context: ProjectContext): Promise<AuditFinding[]> {
    const findings: AuditFinding[] = [];

    for (const [filePath, content] of context.files.entries()) {
      // Skip test mocks or documentation files
      if (
        filePath.includes(".test.") ||
        filePath.includes("__mocks__") ||
        filePath.endsWith(".md")
      ) {
        continue;
      }

      const lines = content.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        for (const pattern of SECRET_PATTERNS) {
          pattern.regex.lastIndex = 0;
          if (pattern.regex.test(line)) {
            findings.push({
              id: `${filePath}-line-${i + 1}-${pattern.name.replace(/\s+/g, "_")}`,
              ruleId: "SEC-001",
              severity: pattern.severity,
              category: "SECURITY",
              title: `Exposed Credential Detected: ${pattern.name}`,
              description: `A potential hardcoded secret (${pattern.name}) was discovered. Committing secrets to version control risks credential theft.`,
              filePath,
              lineStart: i + 1,
              lineEnd: i + 1,
              evidenceRedacted: `Line ${i + 1}: [REDACTED_SECRET_MATCH]`,
              remediation:
                "Immediately rotate the exposed credential, remove it from the repository, and supply it through environment variables or a secrets manager.",
              aiFixAvailable: true,
            });
          }
        }
      }
    }

    return findings;
  },
};

