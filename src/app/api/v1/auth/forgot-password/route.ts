import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const result = await authService.requestPasswordReset(email);
    // Invariant: Always return generic success to avoid account enumeration
    return NextResponse.json({
      success: true,
      message: "If an account with this email exists, a password reset link has been dispatched.",
      // For local development and automated testing convenience, return token if in development
      token: process.env.NODE_ENV !== "production" ? result.token : undefined,
    });
  } catch (_err) {
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}

