import { NextRequest, NextResponse } from "next/server";
import { SsrfGuard } from "@/modules/server/ssrf-guard";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { host, port = 22, name, environment = "production" } = body;

    if (!host) {
      return NextResponse.json(
        { error: "Missing required field: host" },
        { status: 400 }
      );
    }

    const validation = SsrfGuard.validateHostAndPort(host, Number(port));

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.reason,
          isBlockedSsrf: validation.isBlockedSsrf,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        host: validation.normalizedHost,
        port: Number(port),
        name: name || `Server-${validation.normalizedHost}`,
        environment,
        status: "READY_FOR_CONNECTION",
        message: "Host and port verified against SSRF and network security policies.",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error validating server configuration", details: String(err) },
      { status: 500 }
    );
  }
}
