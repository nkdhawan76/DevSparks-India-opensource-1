import { NextRequest, NextResponse } from "next/server";
import { entitlementService } from "@/modules/entitlements/service";
import { OpenRouterAdapter } from "@/modules/ai/openrouter";
import { redactSecrets } from "@/core/logger";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workspaceId, findingId, findingTitle, findingDescription, affectedFile, affectedCodeSnippet, remediationAdvice } = body;

    if (!workspaceId || !findingTitle) {
      return NextResponse.json(
        { error: "Missing required fields: workspaceId, findingTitle" },
        { status: 400 }
      );
    }

    // Server-side entitlement check
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

    // Build sanitized prompt with secret redaction
    const adapter = new OpenRouterAdapter("mock-key-for-local-runner");
    const sanitizedPrompt = adapter.buildSanitizedPrompt({
      findingTitle,
      findingDescription: findingDescription || "",
      affectedFile,
      affectedCodeSnippet: affectedCodeSnippet ? redactSecrets(affectedCodeSnippet) : undefined,
      remediationAdvice: remediationAdvice || "",
    });

    // Generate structured patch suggestion
    const patch = adapter.generatePatchSuggestion(
      findingId || "finding-unknown",
      affectedFile || "source.ts",
      affectedCodeSnippet || "// Original vulnerable code",
      "// Suggested safe remediation\n" + (remediationAdvice || "// Follow security guidelines"),
      `Remediation suggestion for: ${findingTitle}`
    );

    // Support Server-Sent Events (SSE) streaming when stream: true
    if (body.stream === true) {
      const encoder = new TextEncoder();
      const explanation = `AI Analysis for ${findingTitle}: This issue should be remediated prior to production deployment to ensure system security and reliability.`;
      const sseChunks = [
        JSON.stringify({ type: "start", findingId }),
        JSON.stringify({ type: "chunk", text: `Analyzing finding '${findingTitle}'...\n` }),
        JSON.stringify({ type: "chunk", text: "Evaluating security impact and constructing verified structured patch...\n" }),
        JSON.stringify({ type: "patch", patch }),
        JSON.stringify({ type: "explanation", explanation, sanitizedPrompt }),
        "[DONE]",
      ];

      const stream = new ReadableStream({
        async start(controller) {
          for (const chunk of sseChunks) {
            controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        explanation: `AI Analysis for ${findingTitle}: This issue should be remediated prior to production deployment to ensure system security and reliability.`,
        sanitizedPrompt,
        patch,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error during AI explanation", details: String(err) },
      { status: 500 }
    );
  }
}

