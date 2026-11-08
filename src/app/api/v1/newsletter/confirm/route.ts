import { NextRequest, NextResponse } from "next/server";
import { dbClient } from "@/db/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Confirmation token is required", code: "MISSING_TOKEN" },
        { status: 400 }
      );
    }

    const success = await dbClient.confirmNewsletterSubscription(token);
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Confirmation link is invalid or has expired.",
          code: "INVALID_OR_EXPIRED_TOKEN",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "Your subscription to DevSparks DeployCheck security releases is confirmed.",
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: message, code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

