import { NextRequest, NextResponse } from "next/server";
import { DiagnosticMetrics } from "@/modules/server/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId") || "vps-01";

    const metrics: DiagnosticMetrics = {
      cpuUsagePercent: 28.4,
      memoryUsedMb: 3240,
      memoryTotalMb: 8192,
      memoryUsagePercent: 39.5,
      diskUsedGb: 44.2,
      diskTotalGb: 160.0,
      diskUsagePercent: 27.6,
      uptimeSeconds: 1248900, // ~14.4 days
      dockerRunning: true,
      activeContainersCount: 6,
    };

    return NextResponse.json({
      success: true,
      serverId,
      metrics,
      timestamp: new Date().toISOString(),
      scannerStatus: "HEALTHY",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error retrieving server diagnostics", details: String(err) },
      { status: 500 }
    );
  }
}

