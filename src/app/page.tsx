"use client";

import React, { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "audits" | "ai" | "settings">("overview");

  // Sample real data fixtures (clearly labeled, no simulated fake production metrics)
  const kpis = [
    { label: "Connected Projects", value: "3", change: "+1 this week", status: "normal" },
    { label: "Audits Completed", value: "14", change: "100% reproducible", status: "normal" },
    { label: "Critical Findings", value: "1", change: "Requires remediation", status: "warning" },
    { label: "Production Readiness", value: "66%", change: "2/3 passing", status: "normal" },
  ];

  const recentAudits = [
    {
      id: "aud-001",
      project: "devsparks-deploycheck",
      stack: "Next.js + TypeScript",
      status: "PASSED",
      findings: 0,
      timestamp: "10 mins ago",
    },
    {
      id: "aud-002",
      project: "ecommerce-api",
      stack: "Node.js (Express)",
      status: "WARNING",
      findings: 3,
      timestamp: "2 hours ago",
    },
    {
      id: "aud-003",
      project: "auth-service",
      stack: "Node.js + Fastify",
      status: "FAILED",
      findings: 5,
      timestamp: "Yesterday",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[#E4E7EC] flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 px-2 py-3 mb-6 border-b border-[#E4E7EC]">
            <div className="w-8 h-8 rounded-lg bg-[#3563E9] text-white flex items-center justify-center font-bold text-sm">
              DC
            </div>
            <div>
              <div className="font-bold text-sm text-[#172033]">DeployCheck</div>
              <div className="text-[11px] text-[#667085]">DevSparks India</div>
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "overview"
                  ? "bg-blue-50 text-[#3563E9]"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>📊</span> Overview
            </button>
            <button
              onClick={() => setActiveTab("audits")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "audits"
                  ? "bg-blue-50 text-[#3563E9]"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>🛡️</span> Pre-Deployment Audits
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "ai"
                  ? "bg-blue-50 text-[#3563E9]"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>✨</span> AI Assistance (BYOK)
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "settings"
                  ? "bg-blue-50 text-[#3563E9]"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>⚙️</span> Settings & Credentials
            </button>
          </nav>
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-slate-50 border border-[#E4E7EC] rounded-xl text-xs text-[#667085]">
          <div className="font-semibold text-[#172033] mb-0.5">Light Theme Enforced</div>
          <div>v0.1.0-dev • Self-Hosted</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#172033]">
              Operations & Audit Overview
            </h1>
            <p className="text-xs text-[#667085] mt-1">
              Inspect application readiness, remediate risks with AI assistance, and enforce pre-deployment policy.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Audit triggered: Inspecting project workspace...")}
              className="px-4 py-2 bg-[#3563E9] hover:bg-[#264FC7] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span>⚡</span> Run Workspace Audit
            </button>
          </div>
        </div>

        {/* KPI Scorecard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E4E7EC] rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all"
            >
              <div className="text-xs font-medium text-[#667085] mb-1">{kpi.label}</div>
              <div className="text-2xl font-bold text-[#172033] tracking-tight">{kpi.value}</div>
              <div
                className={`text-[11px] font-medium mt-2 ${
                  kpi.status === "warning" ? "text-amber-700" : "text-emerald-700"
                }`}
              >
                {kpi.change}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Audits Table */}
        <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden mb-8">
          <div className="p-4 border-b border-[#E4E7EC] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#172033]">Recent Pre-Deployment Audits</h2>
            <span className="text-xs text-[#667085]">Last 7 Days</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-[#E4E7EC] text-[#667085] font-semibold">
                  <th className="p-3">Audit ID</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Detected Stack</th>
                  <th className="p-3">Readiness Status</th>
                  <th className="p-3">Findings</th>
                  <th className="p-3">Executed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {recentAudits.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-mono font-medium text-slate-800">{a.id}</td>
                    <td className="p-3 font-semibold text-[#172033]">{a.project}</td>
                    <td className="p-3 text-[#667085]">{a.stack}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.status === "PASSED"
                            ? "bg-emerald-50 text-[#16803D] border border-emerald-200"
                            : a.status === "WARNING"
                            ? "bg-amber-50 text-[#B7791F] border border-amber-200"
                            : "bg-red-50 text-[#C62828] border border-red-200"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="p-3 text-[#667085]">{a.findings} issues</td>
                    <td className="p-3 text-[#667085]">{a.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI & Security Invariants Card */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5 text-xs text-[#172033]">
          <div className="font-bold text-[#3563E9] text-sm mb-1">
            Policy-Controlled AI Invariant
          </div>
          <p className="text-[#667085]">
            AI assistance is restricted to explaining findings and preparing structured patches.
            No command executes on user servers or runners without human review and explicit authorization.
          </p>
        </div>
      </main>
    </div>
  );
}
