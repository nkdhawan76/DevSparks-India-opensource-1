"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardView } from "@/components/views/DashboardView";

export default function DashboardPage() {
  const router = useRouter();

  const recentAudits = [
    { id: "aud-1", project: "thefein.in", framework: "Next.js 14", status: "Passed" as const, issues: 0, runAt: "Today, 11:42 AM" },
    { id: "aud-2", project: "kreedaportal.com", framework: "Laravel 11", status: "Warnings" as const, issues: 5, runAt: "Today, 10:18 AM" },
    { id: "aud-3", project: "silvereraheritage.com", framework: "Next.js 14", status: "Critical" as const, issues: 8, runAt: "Yesterday, 08:47 PM" },
    { id: "aud-4", project: "compikart.opm", framework: "Node.js", status: "Passed" as const, issues: 0, runAt: "Yesterday, 05:22 PM" },
    { id: "aud-5", project: "devsparksindia.com", framework: "Next.js 14", status: "Warnings" as const, issues: 3, runAt: "Yesterday, 02:11 PM" },
  ];

  const recentDeployments = [
    { id: "dep-1", project: "kreedaportal.com", server: "VPS-01 (Mumbai)", status: "Success" as const, deployedAt: "Today, 09:35 AM" },
    { id: "dep-2", project: "thefein.in", server: "VPS-02 (Bangalore)", status: "Success" as const, deployedAt: "Yesterday, 11:10 PM" },
    { id: "dep-3", project: "silvereraheritage.com", server: "VPS-01 (Mumbai)", status: "Failed" as const, deployedAt: "Yesterday, 06:27 PM" },
    { id: "dep-4", project: "compikart.opm", server: "VPS-03 (Mumbai)", status: "Success" as const, deployedAt: "Yesterday, 09:14 PM" },
  ];

  return (
    <DashboardView
      onRunAudit={() => router.push("/app/audits")}
      onNavigate={(view) => router.push(`/app/${view}`)}
      recentAudits={recentAudits}
      recentDeployments={recentDeployments}
      systemHealth="healthy"
    />
  );
}

