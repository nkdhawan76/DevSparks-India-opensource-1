/**
 * Centralized International Market Registry & Geo Pricing Engine
 * DevSparks DeployCheck
 */

export interface Market {
  slug: string; // "in" | "uk" | "us"
  name: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  flag: string;
  taxNote: string;
  isDefault?: boolean;
}

export interface PlanPricing {
  free: {
    monthlyMinor: number;
    annualMinor: number;
    formattedMonthly: string;
    formattedAnnual: string;
  };
  pro: {
    monthlyMinor: number;
    annualMinor: number;
    formattedMonthly: string;
    formattedAnnual: string;
  };
  enterprise: {
    monthlyMinor: number;
    annualMinor: number;
    formattedMonthly: string;
    formattedAnnual: string;
  };
}

export const MARKETS: Record<string, Market> = {
  in: {
    slug: "in",
    name: "India",
    countryCode: "IN",
    currency: "INR",
    currencySymbol: "₹",
    locale: "en-IN",
    flag: "🇮🇳",
    taxNote: "+18% GST (input tax credit eligible)",
  },
  uk: {
    slug: "uk",
    name: "United Kingdom",
    countryCode: "GB",
    currency: "GBP",
    currencySymbol: "£",
    locale: "en-GB",
    flag: "🇬🇧",
    taxNote: "VAT included where applicable",
  },
  us: {
    slug: "us",
    name: "United States",
    countryCode: "US",
    currency: "USD",
    currencySymbol: "$",
    locale: "en-US",
    flag: "🇺🇸",
    taxNote: "Excl. state sales tax where applicable",
    isDefault: true,
  },
};

export const DEFAULT_MARKET_SLUG = "us";

export const REGIONAL_PRICING: Record<string, PlanPricing> = {
  in: {
    free: {
      monthlyMinor: 0,
      annualMinor: 0,
      formattedMonthly: "₹0",
      formattedAnnual: "₹0",
    },
    pro: {
      monthlyMinor: 99900, // ₹999.00
      annualMinor: 999000, // ₹9,990.00 (2 months free)
      formattedMonthly: "₹999",
      formattedAnnual: "₹9,990",
    },
    enterprise: {
      monthlyMinor: 499900, // ₹4,999.00
      annualMinor: 4999000, // ₹49,990.00
      formattedMonthly: "₹4,999",
      formattedAnnual: "₹49,990",
    },
  },
  uk: {
    free: {
      monthlyMinor: 0,
      annualMinor: 0,
      formattedMonthly: "£0",
      formattedAnnual: "£0",
    },
    pro: {
      monthlyMinor: 999, // £9.99
      annualMinor: 9990, // £99.90
      formattedMonthly: "£9.99",
      formattedAnnual: "£99.90",
    },
    enterprise: {
      monthlyMinor: 4999, // £49.99
      annualMinor: 49990, // £499.90
      formattedMonthly: "£49.99",
      formattedAnnual: "£499.90",
    },
  },
  us: {
    free: {
      monthlyMinor: 0,
      annualMinor: 0,
      formattedMonthly: "$0",
      formattedAnnual: "$0",
    },
    pro: {
      monthlyMinor: 1299, // $12.99
      annualMinor: 12990, // $129.90
      formattedMonthly: "$12.99",
      formattedAnnual: "$129.90",
    },
    enterprise: {
      monthlyMinor: 6999, // $69.99
      annualMinor: 69990, // $699.90
      formattedMonthly: "$69.99",
      formattedAnnual: "$699.90",
    },
  },
};

export const SUPPORTED_MARKET_SLUGS = Object.keys(MARKETS);

export function getMarket(slug?: string | null): Market {
  if (!slug) return MARKETS[DEFAULT_MARKET_SLUG];
  const normalized = slug.toLowerCase().trim();
  return MARKETS[normalized] || MARKETS[DEFAULT_MARKET_SLUG];
}

export function getAllMarkets(): Market[] {
  return Object.values(MARKETS);
}

export function getRegionalPricing(marketSlug?: string | null): PlanPricing {
  const market = getMarket(marketSlug);
  return REGIONAL_PRICING[market.slug] || REGIONAL_PRICING[DEFAULT_MARKET_SLUG];
}

export function formatPrice(amountMinor: number, currency: string, locale: string): string {
  if (amountMinor === 0) {
    const symbol = currency === "INR" ? "₹" : currency === "GBP" ? "£" : "$";
    return `${symbol}0`;
  }
  const divisor = currency === "INR" ? 100 : 100;
  const major = amountMinor / divisor;

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: major % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(major);
  } catch {
    const symbol = currency === "INR" ? "₹" : currency === "GBP" ? "£" : "$";
    return `${symbol}${major}`;
  }
}

/**
 * Maps country codes (from CF-IPCountry / X-Vercel-IP-Country) to market slugs
 */
export function detectMarketFromCountryCode(countryCode?: string | null): string {
  if (!countryCode) return DEFAULT_MARKET_SLUG;
  const upper = countryCode.toUpperCase().trim();
  if (upper === "IN") return "in";
  if (upper === "GB" || upper === "UK") return "uk";
  return "us";
}

/**
 * Extracts a market slug prefix from a path, if present.
 * e.g. "/in/pricing" -> { marketSlug: "in", pathnameWithoutMarket: "/pricing" }
 *      "/pricing" -> { marketSlug: null, pathnameWithoutMarket: "/pricing" }
 */
export function extractMarketFromPath(pathname: string): {
  marketSlug: string | null;
  pathnameWithoutMarket: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && SUPPORTED_MARKET_SLUGS.includes(segments[0].toLowerCase())) {
    const marketSlug = segments[0].toLowerCase();
    const rest = "/" + segments.slice(1).join("/");
    return {
      marketSlug,
      pathnameWithoutMarket: rest === "/" ? "/" : rest.replace(/\/$/, ""),
    };
  }
  return {
    marketSlug: null,
    pathnameWithoutMarket: pathname || "/",
  };
}

/**
 * Builds a regional URL preserving query strings or trailing paths.
 * e.g. buildRegionalUrl("/pricing", "in") -> "/in/pricing"
 *      buildRegionalUrl("/uk/pricing", "in") -> "/in/pricing"
 */
export function buildRegionalUrl(currentPath: string, targetMarketSlug: string): string {
  const { pathnameWithoutMarket } = extractMarketFromPath(currentPath);
  const cleanPath = pathnameWithoutMarket === "/" ? "" : pathnameWithoutMarket;
  return `/${targetMarketSlug}${cleanPath}`;
}

