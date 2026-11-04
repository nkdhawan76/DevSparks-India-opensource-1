import { NextRequest, NextResponse } from "next/server";
import { encryptSecret, maskApiKey } from "@/modules/ai/encryption";
import { entitlementService } from "@/modules/entitlements/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workspaceId, providerKey, apiKey, displayName } = body;

    if (!workspaceId || !apiKey || !providerKey) {
      return NextResponse.json(
        { error: "Missing required fields: workspaceId, providerKey, apiKey" },
        { status: 400 }
      );
    }

    // Verify workspace entitlements
    const decision = await entitlementService.check({
      workspaceId,
      feature: "ai.assistance",
    });

    if (!decision.allowed) {
      return NextResponse.json(
        { error: decision.reason || "AI assistance is not entitled for this workspace." },
        { status: 403 }
      );
    }

    // Encrypt the key at rest using AES-256-GCM
    const _encrypted = encryptSecret(apiKey);

    // Prepare response DTO — NEVER return raw or decrypted key
    const responseDto = {
      id: `ai-conn-${Date.now()}`,
      workspaceId,
      providerKey,
      displayName: displayName || "Default OpenRouter Connection",
      maskedKey: maskApiKey(apiKey),
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: responseDto,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to configure AI provider connection", details: String(err) },
      { status: 500 }
    );
  }
}

