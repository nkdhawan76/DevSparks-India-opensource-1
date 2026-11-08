import { NextRequest, NextResponse } from "next/server";
import { dbClient } from "@/db/client";

export async function GET() {
  try {
    const servers = await dbClient.getAllServers();
    return NextResponse.json({
      success: true,
      data: servers,
      totalCount: servers.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error fetching servers", details: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, host, os = "Ubuntu 22.04 LTS" } = body;

    if (!name || !host) {
      return NextResponse.json(
        { error: "Server name and host/IP address are required" },
        { status: 400 }
      );
    }

    const newServer = {
      id: `vps-${Date.now()}`,
      name,
      host,
      os,
      status: "ONLINE",
      policy: "STRICT_RESTRICTED",
      cpuUsagePercent: 12,
      memoryUsedGb: 1.8,
      memoryTotalGb: 8,
    };

    await dbClient.recordServer(newServer);

    return NextResponse.json({
      success: true,
      data: newServer,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error creating server", details: String(err) },
      { status: 500 }
    );
  }
}

