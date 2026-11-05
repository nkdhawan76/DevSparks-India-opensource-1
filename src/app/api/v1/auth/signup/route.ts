import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, acceptTerms } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Full Name, email address, and password are required." },
        { status: 400 }
      );
    }

    if (!acceptTerms) {
      return NextResponse.json(
        { error: "You must accept the Terms of Service and Privacy Policy to register." },
        { status: 400 }
      );
    }

    const result = await authService.register(email, password, name);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error || "Registration failed." },
        { status: result.status }
      );
    }

    const maxAgeSeconds = 7 * 24 * 60 * 60;
    const response = NextResponse.json(
      { success: true, user: result.data.user },
      { status: 201 }
    );

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
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}

