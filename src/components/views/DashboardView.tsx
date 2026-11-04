"use client";

import React from "react";
import { KpiCard } from "../common/KpiCard";
import { StatusBadge } from "../common/StatusBadge";

interface AuditItem {
  id: string;
  project: string;
  framework: string;
  status: "Passed" | "Warnings" | "Critical";
  issues: number;
  runAt: string;
}

interface DeploymentItem {
  id: string;
  project: string;
  server: string;
  status: "Success" | "Failed";
  deployedAt: string;
}

interface DashboardViewProps {
  onRunAudit: () => void;
  onNavigate: (view: string) => void;
  recentAudits: AuditItem[];
  recentDeployments: DeploymentItem[];
  systemHealth: string;
}

export function DashboardView({
  onRunAudit,
  onNavigate,
  recentAudits,
  recentDeployments,
  systemHealth,
}: DashboardViewProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
              DevSparks India
            </span>
            <span className="text-xs font-medium text-[#667085]">Production Control Plane</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Super Admin Operations Dashboard
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Pre-deployment verification, BYOK AI patch assistance, VPS server management, and synthetic uptime monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate("projects")}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] text-[#17172A] text-xs font-bold rounded-xl transition-all"
          >
            📁 View All Projects
          </button>
          <button
            onClick={onRunAudit}
            className="px-4 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>🛡️</span>
            <span>Run Pre-Deployment Audit</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Audit Readiness Score"
          value="100%"
          subtitle="93 files scanned locally"
          trend={{ value: "+4.2%", isPositive: true }}
          icon="🛡️"
          badge="Ready"
        />
        <KpiCard
          title="Active Projects"
          value="5"
          subtitle="All projects passing baseline"
          icon="📁"
          badge="Live"
        />
        <KpiCard
          title="Production Deployments"
          value="14"
          subtitle="12 Success, 2 Rollbacks"
          trend={{ value: "98.2%", isPositive: true }}
          icon="🚀"
        />
        <KpiCard
          title="Synthetic Uptime"
          value="99.98%"
          subtitle="Avg Latency: 124ms"
          trend={{ value: "+0.02%", isPositive: true }}
          icon="📡"
          badge="Monitored"
        />
      </div>

      {/* Main Grid: Health Doughnut & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Health Overview */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F9]">
            <h3 className="text-sm font-bold text-[#17172A]">Project Health Breakdown</h3>
            <StatusBadge label="5 Projects" variant="neutral" />
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            {/* Visual Doughnut Representation */}
            <div className="w-36 h-36 rounded-full border-8 border-[#16A34A] border-t-[#F59E0B] flex items-center justify-center bg-slate-50/50 relative">
              <div className="text-center">
                <div className="text-2xl font-black text-[#17172A]">80%</div>
                <div className="text-[10px] text-[#667085] font-semibold uppercase">Passing</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-6 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="font-extrabold text-[#16A34A] text-base">4</div>
                <div className="text-[10px] text-[#667085]">Passed</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                <div className="font-extrabold text-[#D97706] text-base">1</div>
                <div className="text-[10px] text-[#667085]">Warnings</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
                <div className="font-extrabold text-[#DC2626] text-base">0</div>
                <div className="text-[10px] text-[#667085]">Critical</div>
              </div>
            </div>
          </div>
        </div>

        {/* Server & Deployment Quick Gauges */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F9] mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#17172A]">Infrastructure Nodes (VPS Servers)</h3>
                <p className="text-xs text-[#667085]">Host verification and restricted command policy status</p>
              </div>
              <button
                onClick={() => onNavigate("servers")}
                className="text-xs font-bold text-[#5938F5] hover:underline"
              >
                Manage Servers →
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🖥️</span>
                  <div>
                    <div className="text-xs font-bold text-[#17172A]">VPS-01 (Production Mumbai)</div>
                    <div className="text-[11px] text-[#667085] font-mono">194.195.112.44 • Ubuntu 22.04 LTS</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-[11px]">
                    <div className="font-semibold text-[#17172A]">CPU: 18% | RAM: 2.1 GB</div>
                    <div className="text-[#667085]">Policy: Restrictive Allowlist</div>
                  </div>
                  <StatusBadge label="Online" variant="success" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🖥️</span>
                  <div>
                    <div className="text-xs font-bold text-[#17172A]">VPS-02 (Production Bangalore)</div>
                    <div className="text-[11px] text-[#667085] font-mono">139.59.88.19 • Ubuntu 24.04 LTS</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-[11px]">
                    <div className="font-semibold text-[#17172A]">CPU: 24% | RAM: 3.4 GB</div>
                    <div className="text-[#667085]">Policy: Restrictive Allowlist</div>
                  </div>
                  <StatusBadge label="Online" variant="success" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>System status: <strong className="text-[#17172A]">{systemHealth.toUpperCase()}</strong></span>
            <span>Policy Gateway: <strong className="text-[#16A34A]">ENFORCED (No direct shell)</strong></span>
          </div>
        </div>
      </div>

      {/* Tables: Recent Audits & Recent Deployments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Audits Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F9] mb-4">
            <h3 className="text-sm font-bold text-[#17172A]">Recent Pre-Deployment Audits</h3>
            <button
              onClick={() => onNavigate("audits")}
              className="text-xs font-bold text-[#5938F5] hover:underline"
            >
              All Audits →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F1F4F9] text-slate-400 text-[10px] uppercase">
                  <th className="pb-2 font-bold">Project</th>
                  <th className="pb-2 font-bold">Framework</th>
                  <th className="pb-2 font-bold">Status</th>
                  <th className="pb-2 font-bold">Issues</th>
                  <th className="pb-2 font-bold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8FAFC]">
                {recentAudits.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-bold text-[#17172A]">{a.project}</td>
                    <td className="py-2.5 text-[#667085]">{a.framework}</td>
                    <td className="py-2.5">
                      <StatusBadge
                        label={a.status}
                        variant={a.status === "Passed" ? "success" : a.status === "Warnings" ? "warning" : "critical"}
                      />
                    </td>
                    <td className="py-2.5 font-semibold text-[#17172A]">{a.issues}</td>
                    <td className="py-2.5 text-[#667085]">{a.runAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Deployments Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F9] mb-4">
            <h3 className="text-sm font-bold text-[#17172A]">Recent VPS Deployments</h3>
            <button
              onClick={() => onNavigate("deployments")}
              className="text-xs font-bold text-[#5938F5] hover:underline"
            >
              All Releases →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F1F4F9] text-slate-400 text-[10px] uppercase">
                  <th className="pb-2 font-bold">Project</th>
                  <th className="pb-2 font-bold">Server</th>
                  <th className="pb-2 font-bold">Result</th>
                  <th className="pb-2 font-bold">Deployed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8FAFC]">
                {recentDeployments.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-bold text-[#17172A]">{d.project}</td>
                    <td className="py-2.5 font-mono text-[11px] text-[#667085]">{d.server}</td>
                    <td className="py-2.5">
                      <StatusBadge
                        label={d.status}
                        variant={d.status === "Success" ? "success" : "danger"}
                      />
                    </td>
                    <td className="py-2.5 text-[#667085]">{d.deployedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
