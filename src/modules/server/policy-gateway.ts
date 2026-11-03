/**
 * DevSparks DeployCheck — SSH Policy Gateway & Command Evaluator
 * Enforces ARD Section 10.3 operational boundaries and approval gates.
 */

import {
  CommandPolicyEvaluation,
  ServerCommandCategory,
  ServerCommandRequest,
} from "./types";
import { redactSecrets } from "@/core/logger";

const PROHIBITED_PATTERNS: RegExp[] = [
  /\brm\s+(-[rfRF]+\s+)?(\/|\/\*|~\/|\*)(\s|$)/,
  /\bmkfs\b/,
  /\bdd\s+if=/,
  /:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, // Fork bomb
  /\bchmod\s+(-[rR]+\s+)?777\s+\//,
  /\biptables\s+-F\b/,
  /\bufw\s+disable\b/,
  /\b(sh|bash|zsh)\s+-i(\s|$)/, // Interactive raw shell
  />\s*\/dev\/sd[a-z]/, // Raw disk overwrite
];

const DIAGNOSTIC_PATTERNS: RegExp[] = [
  /^df\s+-[hHkKmMTt]+/,
  /^free\s+-[bkmgoh]+/,
  /^uptime\b/,
  /^uname\s+-[arnsvmpio]+/,
  /^top\s+-b\s+-n\s+\d+/,
  /^cat\s+\/etc\/os-release/,
  /^docker\s+ps(\s+-[a-zA-Z]+)*$/,
  /^docker\s+stats\s+--no-stream/,
  /^docker\s+logs\s+--tail\s+\d+\s+[\w.-]+$/,
  /^systemctl\s+(is-active|is-failed|status)\s+[\w.-]+$/,
  /^(netstat|ss)\s+-[tulnp]+/,
];

export class ServerPolicyGateway {
  public static readonly MAX_TIMEOUT_MS = 30000;
  public static readonly MAX_OUTPUT_BYTES = 65536; // 64 KB

  /**
   * Evaluates whether a proposed command is permitted, requires approval, or is prohibited.
   */
  public static evaluateCommand(request: ServerCommandRequest): CommandPolicyEvaluation {
    const rawCmd = request.command.trim();

    // 1. Prohibited command check
    for (const pattern of PROHIBITED_PATTERNS) {
      if (pattern.test(rawCmd)) {
        return {
          allowed: false,
          category: "HIGH_RISK",
          requiresExplicitApproval: true,
          isProhibited: true,
          rejectionReason: `Command matches prohibited security signature: '${pattern.source}'. Destructive or unconstrained shell actions are forbidden.`,
        };
      }
    }

    // 2. Diagnostic command match (Read-only status & metrics)
    const isDiagnostic = DIAGNOSTIC_PATTERNS.some((p) => p.test(rawCmd));
    if (isDiagnostic) {
      return {
        allowed: true,
        category: "DIAGNOSTIC",
        requiresExplicitApproval: false,
        isProhibited: false,
      };
    }

    // 3. Operational Mutation (service restart, build, container lifecycle)
    const hasValidApproval = Boolean(request.approvedByUserId && request.approvalToken);

    return {
      allowed: hasValidApproval,
      category: "MUTATION",
      requiresExplicitApproval: true,
      isProhibited: false,
      rejectionReason: hasValidApproval
        ? undefined
        : "Operational mutations (service restarts, deployment actions) require explicit human approval token before execution.",
    };
  }

  /**
   * Sanitizes command string and outputs to prevent credential leaks in logs.
   */
  public static sanitizeOutput(output: string): string {
    if (!output) return "";
    let sanitized = redactSecrets(output);
    if (sanitized.length > this.MAX_OUTPUT_BYTES) {
      sanitized = sanitized.slice(0, this.MAX_OUTPUT_BYTES) + "\n... [TRUNCATED DUE TO SIZE LIMIT]";
    }
    return sanitized;
  }
}
