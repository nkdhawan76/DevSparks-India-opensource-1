import { NextRequest, NextResponse } from "next/server";
import { deploymentPipeline } from "@/modules/deployment/pipeline";
import { DeploymentRequest } from "@/modules/deployment/types";
import { dbClient } from "@/db/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      workspaceId = "ws_alpha",
      projectId = "proj-devsparks",
      serverId = "vps-01",
      commitHash = "b05d0b6",
      branch = "main",
      triggeredByUserId,
      approvedByUserId,
      approvalToken,
      environment = "production",
      autoRollbackOnHealthFailure = true,
    } = body;

    const request: DeploymentRequest = {
      id: `dep-${Date.now()}`,
      workspaceId,
      projectId,
      serverId,
      commitHash,
      branch,
      triggeredByUserId: triggeredByUserId || "usr-admin-1",
      approvedByUserId,
      approvalToken,
      environment,
      autoRollbackOnHealthFailure,
    };

    const result = await deploymentPipeline.execute(request);

    // Save actual deployment run to database
    await dbClient.recordDeployment({
      id: request.id,
      projectId,
      project: projectId === "proj-thefein" ? "thefein.in" : projectId === "proj-kreeda" ? "kreedaportal.com" : projectId === "proj-silverera" ? "silvereraheritage.com" : projectId === "proj-compikart" ? "compikart.opm" : "DevSparks DeployCheck",
      server: serverId === "vps-02" ? "VPS-02 (Production Bangalore)" : "VPS-01 (Production Mumbai)",
      branch,
      status: result.status,
      commitSha: commitHash.slice(0, 7),
      deployedAt: new Date().toISOString(),
    });

    const httpStatus = result.status === "SUCCESS" ? 200 : 422;

    return NextResponse.json(
      {
        success: result.status === "SUCCESS",
        data: result,
      },
      { status: httpStatus }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error during deployment execution", details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);

    const deploymentsCollection = await dbClient.getAllDeployments();

    const formattedDeployments = deploymentsCollection.map((d) => ({
      id: d.id,
      project: d.project,
      projectId: d.projectId,
      server: d.server,
      branch: d.branch || "main",
      status: d.status === "SUCCESS" ? "Success" : "Failed",
      deployedAt: new Date(d.deployedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    return NextResponse.json({
      success: true,
      data: formattedDeployments.slice(0, limit),
      meta: {
        limit,
        hasMore: formattedDeployments.length > limit,
        nextCursor: null,
        totalCount: formattedDeployments.length,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error retrieving deployments", details: String(err) },
      { status: 500 }
    );
  }
}

