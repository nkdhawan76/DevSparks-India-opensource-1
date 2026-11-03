import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const monitorId = searchParams.get("monitorId") || "mon-thefein-prod";

    const checks = [
      { id: "chk-01", monitorId, timestamp: "2026-11-03T16:20:00Z", isUp: true, statusCode: 200, latencyMs: 38 },
      { id: "chk-02", monitorId, timestamp: "2026-11-03T16:21:00Z", isUp: true, statusCode: 200, latencyMs: 42 },
      { id: "chk-03", monitorId, timestamp: "2026-11-03T16:22:00Z", isUp: true, statusCode: 200, latencyMs: 39 },
      { id: "chk-04", monitorId, timestamp: "2026-11-03T16:23:00Z", isUp: true, statusCode: 200, latencyMs: 45 },
      { id: "chk-05", monitorId, timestamp: "2026-11-03T16:24:00Z", isUp: true, statusCode: 200, latencyMs: 41 },
    ];

    return NextResponse.json({
      success: true,
      monitorId,
      data: checks,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error retrieving monitor check history", details: String(err) },
      { status: 500 }
    );
  }
}

