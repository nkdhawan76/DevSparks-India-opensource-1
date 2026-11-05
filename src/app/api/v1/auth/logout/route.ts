import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("deploycheck_session")?.value;
    if (sessionToken) {
      await authService.logout(sessionToken);
    }

    const response = NextResponse.json({ success: true, message: "Logged out successfully." });
    response.cookies.set({
      name: "deploycheck_session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (_err) {
    return NextResponse.json({ error: "Logout failed." }, { status: 500 });
  }
}

