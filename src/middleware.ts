import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("deploycheck_session")?.value;
  const hasSession = Boolean(sessionToken && sessionToken.length >= 32);

  // 1. Public Marketing Website at root / is directly accessible
  if (pathname === "/") {
    return NextResponse.next();
  }

  // 2. Protected Application Shell: /app/*
  if (pathname.startsWith("/app")) {
    if (!hasSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Auth Screens: /login, /signup
  if (pathname === "/login" || pathname === "/signup") {
    if (hasSession) {
      return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 4. Protected API Routes
  if (pathname.startsWith("/api/v1")) {
    // Whitelist public API endpoints
    const isPublicApi =
      pathname.startsWith("/api/v1/health") ||
      pathname.startsWith("/api/v1/auth");

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/app/:path*",
    "/api/v1/:path*",
  ],
};

