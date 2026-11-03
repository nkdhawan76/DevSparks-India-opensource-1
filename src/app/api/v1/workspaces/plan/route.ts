import { NextRequest, NextResponse } from "next/server";
import { entitlementService, PLANS } from "@/modules/entitlements/service";
import { PlanTierKey } from "@/modules/entitlements/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId") || "ws-01j7default";
    const tier = (searchParams.get("tier") as PlanTierKey) || "self_hosted_standard";

    const plan = PLANS[tier] || entitlementService.getPlan("self_hosted_standard");
    const usage = entitlementService.getWorkspaceUsage(workspaceId);

    return NextResponse.json({
      success: true,
      workspaceId,
      plan: {
        key: plan.planKey,
        displayName: plan.displayName,
        features: plan.features,
        quotas: {
          monthlyAuditLimit: plan.monthlyAuditLimit,
          maxServers: plan.maxServers,
          maxMonitors: plan.maxMonitors,
          retentionDays: plan.retentionDays,
        },
      },
      usage: {
        auditsThisMonth: usage.auditsThisMonth,
        auditsRemaining: Math.max(plan.monthlyAuditLimit - usage.auditsThisMonth, 0),
        activeServersCount: usage.activeServersCount,
        serversRemaining: Math.max(plan.maxServers - usage.activeServersCount, 0),
        activeMonitorsCount: usage.activeMonitorsCount,
        monitorsRemaining: Math.max(plan.maxMonitors - usage.activeMonitorsCount, 0),
      },
      allAvailableTiers: Object.keys(PLANS),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error retrieving workspace plan", details: String(err) },
      { status: 500 }
    );
  }
}
