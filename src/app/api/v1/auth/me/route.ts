import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/modules/auth/service";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("deploycheck_session")?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized. No active session." }, { status: 401 });
    }

    const sessionData = await authService.validateSession(sessionToken);
    if (!sessionData || !sessionData.user) {
      return NextResponse.json({ error: "Session expired or invalid." }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        role: sessionData.role,
        workspaceId: sessionData.workspaceId,
      },
    });
  } catch (_err) {
    return NextResponse.json({ error: "Failed to verify session." }, { status: 500 });
  }
}

