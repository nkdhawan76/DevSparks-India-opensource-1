import { NextRequest, NextResponse } from "next/server";
import { dbClient } from "@/db/client";
import { DbProject } from "@/db/schema";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId") || undefined;

    const rawProjects = await dbClient.getAllProjects(workspaceId);
    const allAudits = await dbClient.getAllAudits(workspaceId);

    // Compute live status and latest scores for each project
    const projects = rawProjects.map((p) => {
      const projectAudits = allAudits.filter((a) => a.projectId === p.id);
      const latestAudit = projectAudits[0] || null;
      const score = (latestAudit?.summary as any)?.score ?? 100;
      const status =
        latestAudit?.status === "SUCCESS"
          ? "Healthy"
          : latestAudit?.status === "WARNING"
          ? "Attention"
          : latestAudit?.status === "FAILED"
          ? "Attention"
          : "Healthy";

      const framework =
        typeof p.detectedStack?.framework === "string"
          ? p.detectedStack.framework
          : "Next.js 14";

      const domain = `${p.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;

      return {
        id: p.id,
        name: p.name,
        domain: p.id === "proj-thefein" ? "thefein.in" : p.id === "proj-kreeda" ? "kreedaportal.com" : p.id === "proj-silverera" ? "silvereraheritage.com" : p.id === "proj-compikart" ? "compikart.opm" : p.id === "proj-devsparks" ? "devsparksindia.com" : domain,
        framework,
        repo: p.repositoryUrl ? p.repositoryUrl.replace("https://github.com/", "") : "nkdhawan76/workspace-app",
        branch: p.defaultBranch || "main",
        score,
        status,
        lastAudit: latestAudit ? new Date(latestAudit.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recently",
      };
    });

    return NextResponse.json({
      success: true,
      data: projects,
      totalCount: projects.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error fetching projects", details: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, repositoryUrl, defaultBranch = "main", framework = "Next.js 14" } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const newProject: DbProject = {
      id: `proj-${Date.now()}`,
      workspaceId: "ws_alpha",
      name: name.trim(),
      sourceType: "GIT",
      repositoryUrl: repositoryUrl || `https://github.com/nkdhawan76/${name.toLowerCase().replace(/\s+/g, "-")}`,
      defaultBranch: defaultBranch || "main",
      detectedStack: { runtime: "Node.js", framework, language: "TypeScript" },
      createdBy: "usr-current",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await dbClient.createProject(newProject);

    return NextResponse.json({
      success: true,
      data: newProject,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error creating project", details: String(err) },
      { status: 500 }
    );
  }
}

