import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";
import { resolveClientIp } from "@/lib/ip-resolver";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, acceptTerms, company_hp } = body;

    const clientIp = resolveClientIp(req);

    // Honeypot trap check
    if (company_hp && typeof company_hp === "string" && company_hp.trim().length > 0) {
      return NextResponse.json(
        { success: false, code: "BOT_DETECTED", error: "Automated submission rejected." },
        { status: 400 }
      );
    }

    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          code: "MISSING_REQUIRED_FIELDS",
          error: "Full Name, email address, and password are required.",
        },
        { status: 400 }
      );
    }

    if (!acceptTerms) {
      return NextResponse.json(
        {
          success: false,
          code: "TERMS_NOT_ACCEPTED",
          error: "You must accept the Terms of Service and Privacy Policy to register.",
        },
        { status: 400 }
      );
    }

    const result = await authService.register(email, password, name, {
      honeypot: company_hp,
      clientIp,
    });

    if (!result.success || !result.data) {
      return NextResponse.json(
        {
          success: false,
          code: result.code || "REGISTRATION_FAILED",
          error: result.error || "Registration failed.",
        },
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
      { success: false, code: "INTERNAL_ERROR", error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}


