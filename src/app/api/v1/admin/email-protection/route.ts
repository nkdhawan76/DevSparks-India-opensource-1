import { NextRequest, NextResponse } from "next/server";
import { dbClient } from "@/db/client";
import { checkEmailDomain, getDisposableDomainsStats } from "@/modules/auth/disposable-domains";

export async function GET() {
  try {
    const stats = await dbClient.getEmailProtectionStats();
    const engineStats = getDisposableDomainsStats();
    const overrides = await dbClient.listDomainOverrides();

    return NextResponse.json({
      success: true,
      data: {
        totalBlocked: stats.totalBlocked,
        totalAllowlisted: stats.totalAllowlisted,
        totalOverrides: stats.totalOverrides,
        lastSyncAt: stats.lastSyncAt || "2026-11-08T12:00:00.000Z",
        engineStats,
        overrides,
      },
    });
  } catch (_err) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch email protection data." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, domain, email, status, reason } = body;

    // 1. Test Domain / Email Tool
    if (action === "test") {
      const candidate = email || domain;
      if (!candidate || typeof candidate !== "string") {
        return NextResponse.json(
          { success: false, error: "Candidate domain or email is required." },
          { status: 400 }
        );
      }

      // If just a domain was provided without @, prepend dummy user
      const fullEmail = candidate.includes("@") ? candidate : `test@${candidate}`;
      const result = await checkEmailDomain(fullEmail);

      return NextResponse.json({
        success: true,
        data: {
          input: candidate,
          extractedDomain: result.domain,
          isDisposable: result.isDisposable,
          action: result.isDisposable ? "BLOCKED" : "ALLOWED",
          reason: result.reason || (result.isDisposable ? "Known temporary email provider." : "Legitimate email provider."),
          source: result.source,
        },
      });
    }

    // 2. Add / Update Override
    if (action === "override") {
      if (!domain || typeof domain !== "string") {
        return NextResponse.json(
          { success: false, error: "Domain is required for override." },
          { status: 400 }
        );
      }
      if (status !== "ALLOW" && status !== "BLOCK") {
        return NextResponse.json(
          { success: false, error: "Override status must be either ALLOW or BLOCK." },
          { status: 400 }
        );
      }

      const cleanDomain = domain.toLowerCase().trim().replace(/^@/, "");
      const record = await dbClient.addDomainOverride({
        domain: cleanDomain,
        status,
        reason: reason?.trim() || "Manual administrator override",
        createdBy: "admin",
      });

      return NextResponse.json({ success: true, data: record });
    }

    // 3. Remove Override
    if (action === "remove") {
      if (!domain || typeof domain !== "string") {
        return NextResponse.json(
          { success: false, error: "Domain is required to remove override." },
          { status: 400 }
        );
      }

      const cleanDomain = domain.toLowerCase().trim().replace(/^@/, "");
      const removed = await dbClient.removeDomainOverride(cleanDomain);
      return NextResponse.json({ success: true, removed });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported action: ${action}` },
      { status: 400 }
    );
  } catch (_err) {
    return NextResponse.json(
      { success: false, error: "Failed to process email protection operation." },
      { status: 500 }
    );
  }
}

