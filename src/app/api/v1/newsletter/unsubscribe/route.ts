import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbClient } from "@/db/client";

const unsubscribeSchema = z.object({
  email: z.string().trim().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body", code: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    const parseResult = unsubscribeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Valid email is required", code: "VALIDATION_FAILED" },
        { status: 400 }
      );
    }

    const success = await dbClient.unsubscribeNewsletter(parseResult.data.email);
    return NextResponse.json(
      {
        success: true,
        data: {
          unsubscribed: success,
          message: success
            ? "You have been successfully unsubscribed."
            : "Email was not found in subscription registry.",
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
