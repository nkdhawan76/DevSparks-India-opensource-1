import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    version: "0.1.0-dev",
    timestamp: new Date().toISOString(),
    service: "DevSparks DeployCheck Control Plane",
    invariants: {
      theme: "light-only",
      aiPolicyControlled: true,
      entitlementsEnforced: true,
    },
  });
}
