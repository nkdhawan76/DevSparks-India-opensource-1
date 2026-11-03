/**
 * DevSparks DeployCheck — Structured Logger with Secret Redaction
 * Invariant: Never write unredacted secrets, API keys, or private SSH keys to logs.
 */

const SENSITIVE_PATTERNS = [
  /sk-[a-zA-Z0-9]{20,}/g, // Generic API key pattern
  /ghp_[a-zA-Z0-9]{36}/g, // GitHub personal access token
  /bearer\s+[a-zA-Z0-9._~+/-]+={0,2}/gi, // Bearer tokens
  /password=["'][^"'\r\n]{1,256}["']/gi, // Passwords in config/json
  /api[_-]?key=["'][^"'\r\n]{1,256}["']/gi, // API keys in config/json
];

/**
 * Deterministically redacts multi-line PEM private keys without regular expressions
 * to guarantee O(n) linear execution and complete immunity to ReDoS.
 */
function redactPemKeys(input: string): string {
  const beginMarker = "-----BEGIN ";
  const endMarker = "-----END ";
  let result = input;
  let searchPos = 0;

  while (searchPos < result.length) {
    const startIndex = result.indexOf(beginMarker, searchPos);
    if (startIndex === -1) break;

    const endIndex = result.indexOf(endMarker, startIndex);
    if (endIndex === -1) break;

    const trailingDashes = result.indexOf("-----", endIndex + endMarker.length);
    if (trailingDashes === -1) break;

    const blockEnd = trailingDashes + 5;
    const pemBlock = result.substring(startIndex, blockEnd);

    // Only redact if this block is a private key
    if (pemBlock.includes("PRIVATE KEY")) {
      result = result.substring(0, startIndex) + "[REDACTED_SECRET]" + result.substring(blockEnd);
      searchPos = startIndex + "[REDACTED_SECRET]".length;
    } else {
      searchPos = blockEnd;
    }
  }

  return result;
}

export function redactSecrets(input: string): string {
  let redacted = redactPemKeys(input);
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

