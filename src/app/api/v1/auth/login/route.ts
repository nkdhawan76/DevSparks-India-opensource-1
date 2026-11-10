import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";
import { resolveClientIp } from "@/lib/ip-resolver.js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const rememberMe = Boolean(body.rememberMe);

    if (email.length === 0 || password.length === 0) {
      return NextResponse.json(
        { error: "Email address and password are required." },
        { status: 400 }
      );
    }

    if (email.length > 255 || password.length > 1024) {
      return NextResponse.json(
        { error: "Payload exceeds permissible field length boundaries." },
        { status: 400 }
      );
    }

    const ip = resolveClientIp(req);
    const result = await authService.login(email, password, rememberMe, ip);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error || "Authentication failed." },
        { status: result.status }
      );
    }

    const maxAgeSeconds = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;
    const response = NextResponse.json({
      success: true,
      user: result.data.user,
    });

    response.cookies.set({
      name: "deploycheck_session",
      value: result.data.rawToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds,
    });

    return response;
  } catch (_err) {
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}

