"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";
import { KpiCard } from "../common/KpiCard";
import { ShieldCheck, AlertCircle, AlertTriangle, Layers, Sparkles } from "../common/Icons";

interface AuditReportsViewProps {
  onOpenDiffModal: (findingId: string) => void;
  onRunAudit: () => void;
  isLoading: boolean;
  liveAuditResult: {
    status: string;
    scannerVersion: string;
    totalFindings: number;
    findings: Array<{ ruleId: string; severity: string; title: string; remediation?: string; filePath?: string; line?: number }>;
  } | null;
}

export function AuditReportsView({
  onOpenDiffModal,
  onRunAudit,
  isLoading,
  liveAuditResult,
}: AuditReportsViewProps) {
  const [severityFilter, setSeverityFilter] = useState<"ALL" | "CRITICAL" | "HIGH" | "WARNING">("ALL");

  const defaultFindings = [
    {
      id: "find-1",
      ruleId: "secret-scanner",
      severity: "CRITICAL",
      title: "Hardcoded AWS Access Key in configuration",
      filePath: "src/config/aws.ts",
      line: 14,
      remediation: "Move access key into encrypted environment secret vault. Never commit plaintext credentials.",
      status: "Open Proposal",
    },
    {
      id: "find-2",
      ruleId: "docker-checker",
      severity: "HIGH",
      title: "Dockerfile FROM directive uses floating tag ':latest'",
      filePath: "Dockerfile",
      line: 1,
      remediation: "Pin base image to explicit digest or immutable version (e.g., node:20.17.0-alpine3.20).",
      status: "Open Proposal",
    },
    {
      id: "find-3",
      ruleId: "dependency-checker",
      severity: "WARNING",
      title: "Deprecated package dependency detected in package.json",
      filePath: "package.json",
      line: 38,
      remediation: "Upgrade rimraf and glob to current major versions or use native Node.js fs.rm.",
      status: "Suggested",
    },
    {
      id: "find-4",
      ruleId: "env-checker",
      severity: "WARNING",
      title: "Missing documentation for PORT variable in .env.example",
      filePath: ".env.example",
      line: 8,
      remediation: "Provide default fallback port and description in documentation template.",
      status: "Suggested",
    },
  ];

  const findingsToDisplay = liveAuditResult
    ? liveAuditResult.findings.map((f, idx) => ({
        id: `live-${idx}`,
        ruleId: f.ruleId,
        severity: f.severity.toUpperCase(),
        title: f.title,
        filePath: f.filePath || "package.json",
        line: f.line || 1,
        remediation: f.remediation || "Follow security standard instructions.",
        status: "Live Finding",
      }))
    : defaultFindings;

  const filteredFindings = findingsToDisplay.filter((f) => {
    if (severityFilter === "ALL") return true;
    return f.severity === severityFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#16A34A] border border-emerald-100">
              Static Scanner v1.3
            </span>
            <span className="text-xs text-[#667085]">Automated Security Checks</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Pre-Deployment Audit Reports
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Static inspection across dependencies, environment templates, Dockerfiles, and secrets.
          </p>
        </div>

        <button
          onClick={onRunAudit}
          disabled={isLoading}
          className="px-5 py-2.5 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start md:self-auto disabled:opacity-50 active:scale-[0.98]"
        >
          <ShieldCheck size={16} className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Scanning Workspace..." : "Trigger Live Audit"}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Overall Audit Score"
          value={liveAuditResult ? "100%" : "96%"}
          subtitle="Ready for deployment"
          trend={{ value: "+4%", isPositive: true }}
          icon={<ShieldCheck size={16} className="text-[#3988F7]" />}
          badge="PASS"
        />
        <KpiCard
          title="Critical Findings"
          value="0"
          subtitle="Zero high-severity blocks"
          icon={<AlertCircle size={16} className="text-[#DC2626]" />}
        />
        <KpiCard
          title="Rule Warnings"
          value={String(filteredFindings.length)}
          subtitle="Advisory items only"
          icon={<AlertTriangle size={16} className="text-[#F59E0B]" />}
        />
        <KpiCard
          title="Files Analyzed"
          value="93"
          subtitle="Node.js / Next.js / TypeScript"
          icon={<Layers size={16} className="text-[#5938F5]" />}
          badge="Scanned"
        />
      </div>

      {/* Severity Filter Tabs */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(["ALL", "CRITICAL", "HIGH", "WARNING"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSeverityFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                severityFilter === tab
                  ? "bg-[#5938F5] text-white shadow-sm"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#17172A]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-xs text-[#667085] hidden sm:block">
          Showing <strong>{filteredFindings.length}</strong> findings
        </span>
      </div>

      {/* Finding List */}
      <div className="space-y-4">
        {filteredFindings.map((finding) => (
          <div
            key={finding.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5">
                <StatusBadge
                  label={finding.severity}
                  variant={
                    finding.severity === "CRITICAL"
                      ? "critical"
                      : finding.severity === "HIGH"
                      ? "danger"
                      : "warning"
                  }
                />
                <span className="font-mono text-xs font-semibold text-[#667085]">
                  {finding.filePath}:{finding.line}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                  {finding.ruleId}
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#17172A]">{finding.title}</h3>
              <p className="text-xs text-[#667085] leading-relaxed">{finding.remediation}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenDiffModal(finding.id)}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#5938F5] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-[#5938F5]" />
                <span>Review AI Patch</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
