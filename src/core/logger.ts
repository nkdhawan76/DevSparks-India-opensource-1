/**
 * DevSparks DeployCheck — Structured Logger with Secret Redaction
 * Invariant: Never write unredacted secrets, API keys, or private SSH keys to logs.
 */

const SENSITIVE_PATTERNS = [
  /sk-[a-zA-Z0-9]{20,}/g, // Generic API key pattern
  /ghp_[a-zA-Z0-9]{36}/g, // GitHub personal access token
  /bearer\s+[a-zA-Z0-9._~+/-]+=*/gi, // Bearer tokens
  /-----BEGIN [A-Z ]+ PRIVATE KEY-----[\s\S]*?-----END [A-Z ]+ PRIVATE KEY-----/g, // Private keys
  /password=["'][^"']+["']/gi,
  /api[_-]?key=["'][^"']+["']/gi,
];

export function redactSecrets(input: string): string {
  let redacted = input;
  for (const pattern of SENSITIVE_PATTERNS) {
    redacted = redacted.replace(pattern, "[REDACTED_SECRET]");
  }
  return redacted;
}

export type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
  constructor(private context: string) {}

  private log(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
    const sanitizedMsg = redactSecrets(message);
    const sanitizedMeta = metadata
      ? JSON.parse(redactSecrets(JSON.stringify(metadata)))
      : undefined;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message: sanitizedMsg,
      ...(sanitizedMeta && { metadata: sanitizedMeta }),
    };

    const out = JSON.stringify(logEntry);
    if (level === "error") {
      console.error(out);
    } else if (level === "warn") {
      console.warn(out);
    } else {
      console.log(out);
    }
  }

  debug(msg: string, meta?: Record<string, unknown>) {
    this.log("debug", msg, meta);
  }

  info(msg: string, meta?: Record<string, unknown>) {
    this.log("info", msg, meta);
  }

  warn(msg: string, meta?: Record<string, unknown>) {
    this.log("warn", msg, meta);
  }

  error(msg: string, meta?: Record<string, unknown>) {
    this.log("error", msg, meta);
  }
}

export const logger = new Logger("App");
export const secureLogger = logger;

