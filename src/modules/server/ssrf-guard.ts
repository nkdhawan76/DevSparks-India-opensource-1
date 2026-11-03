/**
 * DevSparks DeployCheck — SSRF & Connection Guard
 * Enforces ARD Section 10.2: Blocks cloud metadata endpoints and sensitive internal addresses.
 */

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "metadata.google.internal",
  "metadata",
  "instance-data",
  "169.254.169.254",
]);

export interface HostValidationResult {
  isValid: boolean;
  isBlockedSsrf: boolean;
  normalizedHost?: string;
  reason?: string;
}

export class SsrfGuard {
  /**
   * Validates target host and port before any socket connection attempt.
   */
  public static validateHostAndPort(host: string, port: number = 22): HostValidationResult {
    if (!host || typeof host !== "string") {
      return { isValid: false, isBlockedSsrf: false, reason: "Host is empty or invalid" };
    }

    const trimmed = host.trim().toLowerCase();

    // Port range check
    if (isNaN(port) || port < 1 || port > 65535) {
      return { isValid: false, isBlockedSsrf: false, reason: `Port ${port} is outside valid TCP range (1-65535)` };
    }

    // Explicit blocked hostnames
    if (BLOCKED_HOSTNAMES.has(trimmed)) {
      return {
        isValid: false,
        isBlockedSsrf: true,
        reason: `Connection blocked: Host '${host}' is a protected loopback or cloud metadata endpoint.`,
      };
    }

    // IPv4 Address parsing
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = trimmed.match(ipv4Regex);

    if (match) {
      const [_, o1, o2, o3, o4] = match.map(Number);

      if (o1 > 255 || o2 > 255 || o3 > 255 || o4 > 255) {
        return { isValid: false, isBlockedSsrf: false, reason: "Invalid IPv4 address format" };
      }

      // Loopback (127.0.0.0/8)
      if (o1 === 127) {
        return {
          isValid: false,
          isBlockedSsrf: true,
          reason: "Connection blocked: Loopback address 127.0.0.0/8 is prohibited.",
        };
      }

      // Cloud Metadata / Link-local (169.254.0.0/16)
      if (o1 === 169 && o2 === 254) {
        return {
          isValid: false,
          isBlockedSsrf: true,
          reason: "Connection blocked: Cloud instance metadata link-local address (169.254.0.0/16) is prohibited.",
        };
      }

      // Current network broadcast / zero address (0.0.0.0/8)
      if (o1 === 0) {
        return {
          isValid: false,
          isBlockedSsrf: true,
          reason: "Connection blocked: Zero address 0.0.0.0/8 is prohibited.",
        };
      }
    }

    // IPv6 Loopback checks
    if (trimmed === "::1" || trimmed === "0:0:0:0:0:0:0:1" || trimmed.startsWith("fe80:")) {
      return {
        isValid: false,
        isBlockedSsrf: true,
        reason: "Connection blocked: IPv6 loopback or link-local address is prohibited.",
      };
    }

    return {
      isValid: true,
      isBlockedSsrf: false,
      normalizedHost: trimmed,
    };
  }
}
