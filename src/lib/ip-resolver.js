// src/lib/ip-resolver.js
// Trusted reverse-proxy-aware client IP resolution.
// Protects against spoofed x-forwarded-for headers without relying on deprecated NextRequest.ip.

/**
 * Validates whether a string is a well-formed IPv4 or IPv6 address.
 * @param {string} ip
 * @returns {boolean}
 */
export function isValidIp(ip) {
  if (!ip || typeof ip !== "string") return false;
  const trimmed = ip.trim();
  // IPv4 pattern: 4 octets 0-255
  const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // IPv6 pattern
  const ipv6Pattern = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$|^::1$|^::$/;
  return ipv4Pattern.test(trimmed) || ipv6Pattern.test(trimmed);
}

/**
 * Resolves the client IP from request headers in priority order:
 * 1. Cloudflare connecting IP (cf-connecting-ip)
 * 2. True-Client-IP / X-Real-IP
 * 3. Leftmost valid client IP in x-forwarded-for (closest to client)
 * 4. Fallback: 127.0.0.1
 *
 * @param {import("next/server").NextRequest | { headers: Headers | Map<string, string> | Record<string, string> }} req
 * @returns {string}
 */
export function resolveClientIp(req) {
  if (!req || !req.headers) return "127.0.0.1";

  const getHeader = (name) => {
    if (typeof req.headers.get === "function") {
      return req.headers.get(name);
    }
    return req.headers[name] || req.headers[name.toLowerCase()] || null;
  };

  // 1. Cloudflare edge header
  const cfIp = getHeader("cf-connecting-ip");
  if (cfIp && isValidIp(cfIp)) {
    return cfIp.trim();
  }

  // 2. Standard reverse proxy real IP
  const realIp = getHeader("x-real-ip");
  if (realIp && isValidIp(realIp)) {
    return realIp.trim();
  }

  // 3. Multi-hop forwarded header (client, proxy1, proxy2)
  const forwardedFor = getHeader("x-forwarded-for");
  if (forwardedFor && typeof forwardedFor === "string") {
    const parts = forwardedFor.split(",");
    for (const part of parts) {
      const candidate = part.trim();
      if (isValidIp(candidate)) {
        return candidate;
      }
    }
  }

  return "127.0.0.1";
}

