import { NextRequest, NextResponse } from "next/server";
import { deploymentPipeline } from "@/modules/deployment/pipeline";
import { DeploymentRequest } from "@/modules/deployment/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      workspaceId,
      projectId,
      serverId,
      commitHash,
      branch = "main",
      triggeredByUserId,
      approvedByUserId,
      approvalToken,
      environment = "production",
      autoRollbackOnHealthFailure = true,
    } = body;

    if (!workspaceId || !projectId || !serverId || !commitHash) {
      return NextResponse.json(
        { error: "Missing required fields: workspaceId, projectId, serverId, commitHash" },
        { status: 400 }
      );
    }

    const request: DeploymentRequest = {
      id: `dep-${Date.now()}`,
      workspaceId,
      projectId,
      serverId,
      commitHash,
      branch,
      triggeredByUserId: triggeredByUserId || "usr-anonymous",
      approvedByUserId,
      approvalToken,
      environment,
      autoRollbackOnHealthFailure,
    };

    const result = await deploymentPipeline.execute(request);

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

    const deploymentsCollection = [
      {
        id: "dep-01j7xyz101",
        project: "kreedaportal.com",
        server: "VPS-01 (prod)",
        branch: "main",
        status: "SUCCESS",
        deployedAt: "2026-11-03T09:35:00.000Z",
      },
      {
        id: "dep-01j7xyz102",
        project: "thefein.in",
        server: "VPS-02 (prod)",
        branch: "main",
        status: "SUCCESS",
        deployedAt: "2026-11-02T23:10:00.000Z",
      },
      {
        id: "dep-01j7xyz103",
        project: "acs-solar.com",
        server: "VPS-01 (staging)",
        branch: "feat/solar-calc",
        status: "FAILED",
        deployedAt: "2026-11-02T18:27:00.000Z",
      },
    ];

    return NextResponse.json({
      data: deploymentsCollection.slice(0, limit),
      meta: {
        limit,
        hasMore: false,
        nextCursor: null,
        totalCount: deploymentsCollection.length,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error retrieving deployments", details: String(err) },
      { status: 500 }
    );
  }
}

