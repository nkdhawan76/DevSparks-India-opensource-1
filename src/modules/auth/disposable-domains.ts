/**
 * DevSparks DeployCheck — Disposable Email Domain Intelligence Engine
 * Protects registration against temporary, burner, and throwaway email providers.
 * Maintains verified coverage of 10,000+ domains with zero third-party API latency.
 */

import disposableDomainsList from "@/data/disposable-domains.json";
import { dbClient } from "@/db/client";

/**
 * Curated list of legitimate consumer and business email providers
 * that must NEVER be flagged or blocked as disposable.
 */
export const ALLOWED_LEGITIMATE_DOMAINS = new Set([
  // Google
  "gmail.com",
  "googlemail.com",
  // Microsoft
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "passport.com",
  // Yahoo
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "yahoo.com.br",
  "ymail.com",
  "rocketmail.com",
  // Apple
  "icloud.com",
  "me.com",
  "mac.com",
  // Privacy-focused legitimate providers (Must NOT be blocked)
  "proton.me",
  "protonmail.com",
  "pm.me",
  "tuta.com",
  "tutanota.com",
  "tuta.io",
  "fastmail.com",
  "fastmail.fm",
  // Business / regional providers
  "zoho.com",
  "zohomail.com",
  "rediffmail.com",
  "rediff.com",
  "aol.com",
  "aim.com",
  "mail.com",
  "gmx.com",
  "gmx.net",
  "yandex.com",
  "yandex.ru",
  // DevSparks Official
  "devsparks.in",
  "devsparksindia.com",
]);

// High-performance in-memory Set initialized from bundled dataset
const BUNDLED_DISPOSABLE_SET = new Set<string>(disposableDomainsList as string[]);

export interface EmailDomainCheckResult {
  isDisposable: boolean;
  domain: string;
  reason?: string;
  source?: string;
}

/**
 * Extracts and normalizes the domain from an email address.
 * Converts to lowercase and validates syntax.
 */
export function extractDomainFromEmail(email: string): string | null {
  if (!email || typeof email !== "string") return null;
  const atIndex = email.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === email.length - 1) return null;
  const domainPart = email.slice(atIndex + 1).trim().toLowerCase();

  // Basic domain format validation (RFC 1035 / RFC 1123)
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domainPart)) {
    return null;
  }
  return domainPart;
}

/**
 * Checks whether an email address uses a known temporary, disposable or burner domain.
 * Supports exact domain matching, subdomain matching, and dynamic allowlist overrides.
 *
 * @param email - The email address to inspect
 * @returns Promise<EmailDomainCheckResult>
 */
export async function checkEmailDomain(email: string): Promise<EmailDomainCheckResult> {
  const domain = extractDomainFromEmail(email);

  if (!domain) {
    return {
      isDisposable: true,
      domain: "",
      reason: "Invalid email domain structure.",
      source: "syntax-guard",
    };
  }

  // 1. Explicit Curated Allowlist (Highest Precedence)
  if (ALLOWED_LEGITIMATE_DOMAINS.has(domain)) {
    return {
      isDisposable: false,
      domain,
      source: "curated-allowlist",
    };
  }

  // 2. Database Allowlist & Overrides Lookup
  try {
    const isDbAllowlisted = await dbClient.isDomainAllowlisted(domain);
    if (isDbAllowlisted) {
      return {
        isDisposable: false,
        domain,
        source: "db-allowlist",
      };
    }

    const override = await dbClient.getDomainOverride(domain);
    if (override) {
      if (override.status === "ALLOW") {
        return {
          isDisposable: false,
          domain,
          reason: override.reason,
          source: "admin-override",
        };
      }
      if (override.status === "BLOCK") {
        return {
          isDisposable: true,
          domain,
          reason: override.reason || "Domain blocked by administrator override.",
          source: "admin-override",
        };
      }
    }
  } catch (_err) {
    // Graceful fallback to bundled set if DB unavailable
  }

  // 3. Exact Domain Match in Bundled 10,000+ Blocklist Set
  if (BUNDLED_DISPOSABLE_SET.has(domain)) {
    return {
      isDisposable: true,
      domain,
      reason: "Domain is identified as a known temporary or disposable email provider.",
      source: "disposable-blocklist",
    };
  }

  // 4. Subdomain & Parent Domain Traversal (e.g. temp.mailinator.com -> mailinator.com)
  const parts = domain.split(".");
  for (let i = 1; i < parts.length - 1; i++) {
    const parentDomain = parts.slice(i).join(".");
    if (ALLOWED_LEGITIMATE_DOMAINS.has(parentDomain)) {
      break;
    }
    if (BUNDLED_DISPOSABLE_SET.has(parentDomain)) {
      return {
        isDisposable: true,
        domain,
        reason: `Subdomain of identified disposable provider '${parentDomain}'.`,
        source: "disposable-blocklist-parent",
      };
    }
  }

  // Domain passed all disposable checks
  return {
    isDisposable: false,
    domain,
    source: "verified-legitimate",
  };
}

/**
 * Returns current dataset statistics.
 */
export function getDisposableDomainsStats(): { totalCount: number; version: string } {
  return {
    totalCount: BUNDLED_DISPOSABLE_SET.size,
    version: "2026.11-disposable-email-domains",
  };
}
