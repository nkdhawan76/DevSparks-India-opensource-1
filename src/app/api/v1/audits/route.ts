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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const cursor = searchParams.get("cursor");
    const projectId = searchParams.get("projectId");

    const limit = Math.min(Math.max(Number(limitParam) || 20, 1), 100);

    // Standard mock audit collection for local/MVP environment
    const auditsCollection = [
      {
        id: "audit-01j7abc101",
        projectId: projectId || "proj-thefein",
        status: "SUCCESS",
        scannerVersion: "1.3.0",
        totalFindings: 0,
        criticalCount: 0,
        highCount: 0,
        createdAt: "2026-11-03T11:42:00.000Z",
      },
      {
        id: "audit-01j7abc102",
        projectId: projectId || "proj-kreeda",
        status: "WARNING",
        scannerVersion: "1.3.0",
        totalFindings: 5,
        criticalCount: 0,
        highCount: 2,
        createdAt: "2026-11-03T10:18:00.000Z",
      },
      {
        id: "audit-01j7abc103",
        projectId: projectId || "proj-silverera",
        status: "FAILED",
        scannerVersion: "1.3.0",
        totalFindings: 8,
        criticalCount: 2,
        highCount: 4,
        createdAt: "2026-11-02T20:47:00.000Z",
      },
    ];

    const data = auditsCollection.slice(0, limit);

    return NextResponse.json({
      data,
      meta: {
        limit,
        hasMore: false,
        nextCursor: null,
        totalCount: auditsCollection.length,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error during audits retrieval", details: String(err) },
      { status: 500 }
    );
  }
}

