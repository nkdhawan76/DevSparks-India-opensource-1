/**
 * DevSparks DeployCheck — Compromised Password Detector (HIBP k-Anonymity)
 * Adheres to NIST 800-63B Digital Identity Guidelines.
 *
 * Checks if a candidate password has appeared in previous data breaches.
 * Uses the Have I Been Pwned (HIBP) Range API via k-Anonymity:
 * Only the first 5 characters of the SHA-1 hash are transmitted;
 * the remaining 35 characters are evaluated in memory locally.
 *
 * Fallback: If offline or API fails, an embedded set of top known breached passwords is used.
 */

import crypto from "crypto";

// Common breached passwords used as offline fallback
const LOCAL_COMMON_PASSWORDS = new Set([
  "password",
  "password123",
  "password1234",
  "password12345",
  "password123456",
  "123456",
  "12345678",
  "123456789",
  "1234567890",
  "qwerty123456",
  "admin123456",
  "welcome123456",
  "deploycheck2026",
  "iloveyou123456",
  "monkey123456",
  "dragon123456",
  "master123456",
  "sunshine12345",
  "princess12345",
  "football12345",
]);

export interface PwnedPasswordCheckResult {
  isPwned: boolean;
  breachCount: number;
  source: "hibp-k-anonymity" | "local-breach-cache" | "fallback-safe";
  warning?: string;
}

/**
 * Computes uppercase SHA-1 hash of a UTF-8 string.
 */
function sha1(str: string): string {
  return crypto.createHash("sha1").update(str, "utf8").digest("hex").toUpperCase();
}

/**
 * Checks whether a candidate password has been leaked in known data breaches.
 *
 * @param password The plaintext password to inspect
 * @param options.timeoutMs Maximum duration to wait for remote HIBP response (default 1500ms)
 */
export async function checkPwnedPassword(
  password: string,
  options?: { timeoutMs?: number }
): Promise<PwnedPasswordCheckResult> {
  if (!password || typeof password !== "string") {
    return { isPwned: false, breachCount: 0, source: "fallback-safe" };
  }

  // 1. Check local top common breached passwords first (instant)
  if (LOCAL_COMMON_PASSWORDS.has(password.toLowerCase().trim())) {
    return {
      isPwned: true,
      breachCount: 999999,
      source: "local-breach-cache",
      warning: "This password is known to have appeared in public data breaches. Please choose a different passphrase.",
    };
  }

  const hash = sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const timeoutMs = options?.timeoutMs ?? 1500;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: "GET",
      headers: {
        "User-Agent": "DevSparks-DeployCheck-Security/1.0",
        "Add-Padding": "true", // Mitigate response size analysis
      },
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      // Remote API non-200 -> graceful fallback
      return { isPwned: false, breachCount: 0, source: "fallback-safe" };
    }

    const text = await res.text();
    const lines = text.split(/\r?\n/);

    for (const line of lines) {
      const [returnedSuffix, countStr] = line.split(":");
      if (returnedSuffix && returnedSuffix.trim().toUpperCase() === suffix) {
        const count = parseInt(countStr?.trim() || "1", 10);
        return {
          isPwned: true,
          breachCount: count,
          source: "hibp-k-anonymity",
          warning: `This password has appeared in ${count.toLocaleString()} known data breaches. Please choose a unique passphrase.`,
        };
      }
    }

    return {
      isPwned: false,
      breachCount: 0,
      source: "hibp-k-anonymity",
    };
  } catch (_err) {
    clearTimeout(timer);
    // Timeout or network offline -> fail-open safely (do not block user if external service unreachable)
    return {
      isPwned: false,
      breachCount: 0,
      source: "fallback-safe",
    };
  }
}
