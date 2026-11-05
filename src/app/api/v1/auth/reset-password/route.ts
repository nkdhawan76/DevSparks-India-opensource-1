import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ error: "Reset token and new password are required." }, { status: 400 });
    }

    const result = await authService.resetPassword(token, password);
    if (!result.success) {
      return NextResponse.json({ error: result.error || "Password reset failed." }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Password has been successfully updated. Please sign in." });
  } catch (_err) {
    return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
  }
}

