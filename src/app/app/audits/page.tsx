"use client";

import React, { useState } from "react";
import { AuditReportsView } from "@/components/views/AuditReportsView";
import { DiffReviewModal } from "@/components/common/DiffReviewModal";

export default function AuditsPage() {
  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    status: string;
    scannerVersion: string;
    totalFindings: number;
    findings: Array<{ ruleId: string; severity: string; title: string; remediation?: string }>;
  } | null>(null);

  const handleRunAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: "ws_alpha",
          projectId: "proj_thefein",
          files: {
            "package.json": JSON.stringify({ name: "thefein-prod", dependencies: { next: "^14.2.35" } }),
            ".env.example": "PORT=3000\nDATABASE_URL=postgres://user:pass@localhost:5432/db",
          },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setAuditResult(data.data);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuditReportsView
        onOpenDiffModal={() => setDiffModalOpen(true)}
        onRunAudit={handleRunAudit}
        isLoading={loading}
        liveAuditResult={auditResult}
      />
      <DiffReviewModal
        isOpen={diffModalOpen}
        onClose={() => setDiffModalOpen(false)}
        onApprove={() => setApprovalStatus("approved")}
        onReject={() => setApprovalStatus("rejected")}
        approvalStatus={approvalStatus}
      />
    </>
  );
}

