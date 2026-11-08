import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { dbClient } from "@/db/client";
import { checkEmailDomain } from "@/modules/auth/disposable-domains";

const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, "Email address is required")
    .max(255, "Email address cannot exceed 255 characters")
    .email("Please provide a valid email address"),
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

    const parseResult = subscribeSchema.safeParse(body);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0]?.message || "Invalid email address";
      return NextResponse.json(
        { success: false, error: firstIssue, code: "VALIDATION_FAILED" },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check for disposable / temporary email domains
    const domainCheck = await checkEmailDomain(normalizedEmail);
    if (domainCheck.isDisposable) {
      return NextResponse.json(
        {
          success: false,
          error: "Disposable and temporary email addresses are not accepted for developer security releases.",
          code: "DISPOSABLE_EMAIL_REJECTED",
        },
        { status: 400 }
      );
    }

    // Generate single-use confirmation token (32 bytes hex) with 24h expiration
    const confirmationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Extract client IP address
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const { subscription, isNew } = await dbClient.subscribeNewsletter({
      email: normalizedEmail,
      confirmationToken,
      tokenExpiresAt,
      ipAddress,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          email: subscription.email,
          status: subscription.status,
          isNew,
          message: isNew
            ? "Thank you for subscribing to DevSparks DeployCheck developer updates."
            : "You are already subscribed to DevSparks DeployCheck developer updates.",
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

