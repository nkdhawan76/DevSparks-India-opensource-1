import { NextRequest, NextResponse } from "next/server";
import {
  SUPPORTED_MARKET_SLUGS,
  DEFAULT_MARKET_SLUG,
  detectMarketFromCountryCode,
  extractMarketFromPath,
} from "@/lib/markets";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("deploycheck_session")?.value;
  const hasSession = Boolean(sessionToken && sessionToken.length >= 32);

  // 1. Static asset exclusions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/v1/health") ||
    pathname.includes(".") // static files like .ico, .png, .svg
  ) {
    return NextResponse.next();
  }

  // 2. Check for regional market prefix in URL (/in, /uk, /us, /in/*, /uk/*, /us/*)
  const { marketSlug, pathnameWithoutMarket } = extractMarketFromPath(pathname);

  // If request has a regional market prefix:
  if (marketSlug) {
    const targetPath = pathnameWithoutMarket === "" ? "/" : pathnameWithoutMarket;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-deploycheck-market", marketSlug);

    const rewriteUrl = new URL(targetPath, request.url);
    rewriteUrl.search = request.nextUrl.search;

    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    // Persist market cookie preference (365 days)
    response.cookies.set("deploycheck_market", marketSlug, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  }

  // 3. Fallback: Edge Geolocation detection via CF-IPCountry / X-Vercel-IP-Country
  const countryHeader =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country");
  const cookieMarket = request.cookies.get("deploycheck_market")?.value;
  const detectedMarket =
    cookieMarket && SUPPORTED_MARKET_SLUGS.includes(cookieMarket)
      ? cookieMarket
      : detectMarketFromCountryCode(countryHeader) || DEFAULT_MARKET_SLUG;

  // 4. Public Marketing Website root /
  if (pathname === "/") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-deploycheck-market", detectedMarket);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 5. Protected Application Shell: /app/*
  if (pathname.startsWith("/app")) {
    if (!hasSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 6. Auth Screens: /login, /signup
  if (pathname === "/login" || pathname === "/signup") {
    if (hasSession) {
      return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 7. Protected API Routes
  if (pathname.startsWith("/api/v1")) {
    // Whitelist public API endpoints
    const isPublicApi =
      pathname.startsWith("/api/v1/health") ||
      pathname.startsWith("/api/v1/auth") ||
      pathname.startsWith("/api/v1/newsletter") ||
      pathname.startsWith("/api/v1/markets");

    if (!isPublicApi) {
      const authHeader = request.headers.get("authorization");
      const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;

      if (!hasSession && !bearerToken) {
        return NextResponse.json(
          { error: "Unauthorized. Valid session or API token required." },
          { status: 401 }
        );
      }
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-deploycheck-market", detectedMarket);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
