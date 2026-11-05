import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { auditEngine } from "@/modules/audit/engine";
import { entitlementService } from "@/modules/entitlements/service";
import { ProjectContext } from "@/modules/audit/types";
import { dbClient } from "@/db/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { workspaceId = "ws_alpha", projectId = "proj-devsparks", files } = body;

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

    // Convert file dictionary or file list to Map for AuditEngine runner
    const filesMap = new Map<string, string>();
    if (files && typeof files === "object" && Object.keys(files).length > 0) {
      if (Array.isArray(files)) {
        for (const f of files) {
          if (f && typeof f === "object" && f.path && f.content !== undefined) {
            filesMap.set(String(f.path), String(f.content));
          }
        }
      } else {
        for (const [key, val] of Object.entries(files)) {
          filesMap.set(key, String(val));
        }
      }
    } else {
      // Ingest real local repository files for genuine deterministic scan
      const targetDir = process.cwd();
      const filesToInspect = [
        "package.json",
        "tsconfig.json",
        "README.md",
        ".env.example",
        "Dockerfile",
        "src/app/layout.tsx",
        "src/app/page.tsx",
      ];

      for (const rel of filesToInspect) {
        const full = path.join(targetDir, rel);
        if (fs.existsSync(full)) {
          try {
            const content = fs.readFileSync(full, "utf-8");
            filesMap.set(rel, content);
          } catch {
            // Ignore unreadable
          }
        }
      }
    }

    const context: ProjectContext = {
      workspaceId,
      projectId,
      files: filesMap,
    };

    const auditResult = await auditEngine.run(context);

    // Save actual audit run to database
    await dbClient.recordAuditRun({
      id: auditResult.id,
      workspaceId,
      projectId,
      status: auditResult.status,
      scannerVersion: auditResult.scannerVersion,
      triggeredBy: "usr-admin-1",
      createdAt: new Date(),
      startedAt: new Date(auditResult.startedAt),
      completedAt: new Date(auditResult.completedAt),
      summary: {
        totalFindings: auditResult.summary.totalFindings,
        criticalCount: auditResult.summary.criticalCount,
        highCount: auditResult.summary.highCount,
        mediumCount: auditResult.summary.mediumCount,
        lowCount: auditResult.summary.lowCount,
        score: auditResult.summary.criticalCount > 0 ? 60 : auditResult.summary.highCount > 0 ? 88 : 100,
      },
    });

    for (const f of auditResult.findings) {
      await dbClient.recordFinding({
        id: f.id,
        workspaceId,
        auditRunId: auditResult.id,
        ruleId: f.ruleId,
        severity: f.severity,
        title: f.title,
        description: f.description,
        remediation: f.remediation,
        filePath: f.filePath,
        lineStart: f.lineStart,
        createdAt: new Date(),
      });
    }

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
    const projectId = searchParams.get("projectId") || undefined;
    const workspaceId = searchParams.get("workspaceId") || undefined;

    const limit = Math.min(Math.max(Number(limitParam) || 20, 1), 100);

    const rawAudits = await dbClient.getAllAudits(workspaceId, projectId);
    const projects = await dbClient.getAllProjects(workspaceId);
    const projectMap = new Map(projects.map((p) => [p.id, p]));

    const formattedAudits = rawAudits.map((a) => {
      const proj = projectMap.get(a.projectId);
      const summary = (a.summary as any) || {};
      const totalFindings = summary.totalFindings ?? 0;
      const statusLabel =
        a.status === "SUCCESS"
          ? "Passed"
          : a.status === "WARNING"
          ? "Warnings"
          : "Critical";

      const framework =
        typeof proj?.detectedStack?.framework === "string"
          ? proj.detectedStack.framework
          : "Next.js 14";

      const domain =
        proj?.id === "proj-thefein"
          ? "thefein.in"
          : proj?.id === "proj-kreeda"
          ? "kreedaportal.com"
          : proj?.id === "proj-silverera"
          ? "silvereraheritage.com"
          : proj?.id === "proj-compikart"
          ? "compikart.opm"
          : proj?.id === "proj-devsparks"
          ? "devsparksindia.com"
          : proj?.name || "devsparksindia.com";

      return {
        id: a.id,
        project: domain,
        projectName: proj?.name || a.projectId,
        projectId: a.projectId,
        framework,
        status: statusLabel,
        rawStatus: a.status,
        issues: totalFindings,
        criticalCount: summary.criticalCount ?? 0,
        highCount: summary.highCount ?? 0,
        score: summary.score ?? (statusLabel === "Passed" ? 100 : statusLabel === "Warnings" ? 92 : 75),
        runAt: new Date(a.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedAudits.slice(0, limit),
      meta: {
        limit,
        hasMore: formattedAudits.length > limit,
        nextCursor: null,
        totalCount: formattedAudits.length,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error during audits retrieval", details: String(err) },
      { status: 500 }
    );
  }
}

