import { NextRequest, NextResponse } from "next/server";
import { auditEngine } from "@/modules/audit/engine";
import { entitlementService } from "@/modules/entitlements/service";
import { ProjectContext } from "@/modules/audit/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workspaceId, projectId, files } = body;

    if (!workspaceId || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields: workspaceId, projectId" },
        { status: 400 }
      );
    }

    // Server-side entitlement check before execution
    const decision = await entitlementService.check({
      workspaceId,
      feature: "audit.basic",
    });

    if (!decision.allowed) {
      return NextResponse.json(
        { error: decision.reason || "Entitlement denied" },
        { status: 403 }
      );
    }

    // Convert file dictionary to Map for AuditEngine runner
    const filesMap = new Map<string, string>();
    if (files && typeof files === "object") {
      for (const [key, val] of Object.entries(files)) {
        filesMap.set(key, String(val));
      }
    }

    const context: ProjectContext = {
      workspaceId,
      projectId,
      files: filesMap,
    };

    const auditResult = await auditEngine.run(context);

    return NextResponse.json({
      success: true,
      data: auditResult,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error during audit run", details: String(err) },
      { status: 500 }
    );
  }
}

