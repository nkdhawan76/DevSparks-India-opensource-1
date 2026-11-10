import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";
import { resolveClientIp } from "@/lib/ip-resolver.js";

export async function POST(req: NextRequest) {
  try {
    const ip = resolveClientIp(req);
    const body: unknown = await req.json();
    const result = await authService.authenticateLogin(body, ip);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error || "Authentication failed." },
        { status: result.status }
      );
    }

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
      maxAge: result.data.maxAgeSeconds,
    });

    return response;
  } catch (_err) {
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
