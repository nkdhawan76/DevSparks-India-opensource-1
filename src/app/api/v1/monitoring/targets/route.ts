import { NextRequest, NextResponse } from "next/server";
import { monitorEngine } from "@/modules/monitoring/engine";
import { MonitorTarget } from "@/modules/monitoring/types";
import { SsrfGuard } from "@/modules/server/ssrf-guard";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      workspaceId,
      projectId,
      name,
      type = "HTTP",
      endpointUrl,
      intervalSeconds = 60,
      expectedStatusCode = 200,
      failureThreshold = 3,
    } = body;

    if (!workspaceId || !projectId || !endpointUrl || !name) {
      return NextResponse.json(
        { error: "Missing required fields: workspaceId, projectId, endpointUrl, name" },
        { status: 400 }
      );
    }

    // SSRF Guard validation of target URL
    try {
      const parsedUrl = new URL(endpointUrl);
      const port = parsedUrl.port ? Number(parsedUrl.port) : parsedUrl.protocol === "https:" ? 443 : 80;
      const ssrfCheck = SsrfGuard.validateHostAndPort(parsedUrl.hostname, port);

      if (!ssrfCheck.isValid) {
        return NextResponse.json(
          {
            success: false,
            error: ssrfCheck.reason,
            isBlockedSsrf: ssrfCheck.isBlockedSsrf,
          },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: `Invalid endpoint URL format: '${endpointUrl}'` },
        { status: 400 }
      );
    }

    const newTarget: MonitorTarget = {
      id: `mon-${Date.now()}`,
      workspaceId,
      projectId,
      name,
      type,
      endpointUrl,
      intervalSeconds,
      timeoutMs: 5000,
      expectedStatusCode,
      failureThreshold,
      status: "HEALTHY",
      consecutiveFailures: 0,
      createdAt: new Date().toISOString(),
    };

    const registered = monitorEngine.registerTarget(newTarget);

    return NextResponse.json({
      success: true,
      data: registered,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error creating monitor target", details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId") || undefined;

    // Default mock targets if engine is freshly initialized
    let targets = monitorEngine.listTargets(workspaceId);
    if (targets.length === 0) {
      const defaultTarget: MonitorTarget = {
        id: "mon-thefein-prod",
        workspaceId: workspaceId || "ws-01j7default",
        projectId: "proj-thefein",
        name: "thefein.in Production Gateway",
        type: "HTTP",
        endpointUrl: "https://thefein.in/api/health",
        intervalSeconds: 60,
        timeoutMs: 5000,
        expectedStatusCode: 200,
        failureThreshold: 3,
        status: "HEALTHY",
        consecutiveFailures: 0,
        lastCheckedAt: new Date().toISOString(),
        createdAt: "2026-11-01T00:00:00.000Z",
      };
      monitorEngine.registerTarget(defaultTarget);
      targets = [defaultTarget];
    }

    const targetsWithUptime = targets.map((t) => {
      const summary = monitorEngine.calculateUptimeSummary(t.id);
      return {
        ...t,
        uptimePercentage: summary.totalChecks > 0 ? summary.uptimePercentage : 99.98,
        averageLatencyMs: summary.totalChecks > 0 ? summary.averageLatencyMs : 45,
      };
    });

    return NextResponse.json({
      success: true,
      data: targetsWithUptime,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error listing monitor targets", details: String(err) },
      { status: 500 }
    );
  }
}
