"use client";

import React, { useState } from "react";
import { KpiCard } from "../common/KpiCard";
import { StatusBadge } from "../common/StatusBadge";
import {
  FolderGit2,
  ShieldCheck,
  AlertTriangle,
  Rocket,
  Globe,
  RefreshCw,
  Calendar,
  ChevronDown,
  Server,
  Sparkles,
  UserPlus,
  Activity,
  Bot,
} from "../common/Icons";

export interface AuditItem {
  id: string;
  project: string;
  framework: string;
  status: "Passed" | "Warnings" | "Critical";
  issues: number;
  runAt: string;
}

export interface DeploymentItem {
  id: string;
  project: string;
  server: string;
  status: "Success" | "Failed";
  deployedAt: string;
}

interface DashboardViewProps {
  onRunAudit: () => void;
  onNavigate: (view: string) => void;
  recentAudits?: AuditItem[];
  recentDeployments?: DeploymentItem[];
  systemHealth?: string;
}

export function DashboardView({
  onRunAudit,
  onNavigate,
  recentAudits = [],
  recentDeployments = [],
  systemHealth = "healthy",
}: DashboardViewProps) {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Fallback fixtures matching the design mockup if props are empty
  const auditsList: AuditItem[] = recentAudits.length > 0 ? recentAudits : [
    { id: "aud-1", project: "thefein.in", framework: "Next.js", status: "Passed", issues: 0, runAt: "31 Oct, 11:42 AM" },
    { id: "aud-2", project: "kreedaportal.com", framework: "Laravel", status: "Warnings", issues: 5, runAt: "31 Oct, 10:18 AM" },
    { id: "aud-3", project: "silvereraheritage.com", framework: "Next.js", status: "Critical", issues: 8, runAt: "30 Oct, 08:47 PM" },
    { id: "aud-4", project: "compikart.opm", framework: "Node.js", status: "Passed", issues: 0, runAt: "30 Oct, 05:22 PM" },
    { id: "aud-5", project: "devsparksindia.com", framework: "Next.js", status: "Warnings", issues: 3, runAt: "30 Oct, 02:11 PM" },
  ];

  const deploymentsList: DeploymentItem[] = recentDeployments.length > 0 ? recentDeployments : [
    { id: "dep-1", project: "kreedaportal.com", server: "VPS-01 (prod)", status: "Success", deployedAt: "31 Oct, 09:35 AM" },
    { id: "dep-2", project: "thefein.in", server: "VPS-02 (prod)", status: "Success", deployedAt: "30 Oct, 11:10 PM" },
    { id: "dep-3", project: "acs-solar.com", server: "VPS-01 (staging)", status: "Failed", deployedAt: "30 Oct, 06:27 PM" },
    { id: "dep-4", project: "dailymoney.app", server: "VPS-03 (prod)", status: "Success", deployedAt: "29 Oct, 09:14 PM" },
    { id: "dep-5", project: "kclindia.com", server: "VPS-02 (prod)", status: "Success", deployedAt: "29 Oct, 04:03 PM" },
  ];

  // Donut chart math: circumference = 2 * PI * 50 = 314.159
  const circumference = 314.159;
  const healthyArc = (62 / 100) * circumference;
  const warningArc = (21 / 100) * circumference;
  const criticalArc = (12 / 100) * circumference;
  const notScannedArc = (5 / 100) * circumference;

  const healthyOffset = 0;
  const warningOffset = -healthyArc;
  const criticalOffset = -(healthyArc + warningArc);
  const notScannedOffset = -(healthyArc + warningArc + criticalArc);

  return (
    <div className="space-y-6">
      {/* 1. Header / Welcome Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17172A] flex items-center gap-2">
            <span>Welcome back, Nikhil Dhawan</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Super Admin Dashboard • DevSparks DeployCheck
          </p>
        </div>

        {/* Action Controls: Date Range & Refresh */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative">
            <button
              onClick={() => setDateRange(dateRange === "Last 30 Days" ? "Last 7 Days" : "Last 30 Days")}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#17172A] hover:bg-slate-50 transition-all shadow-2xs"
            >
              <Calendar size={14} className="text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E7EB] hover:border-[#5938F5]/30 rounded-xl text-xs font-semibold text-[#5938F5] hover:bg-purple-50/50 transition-all shadow-2xs"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards (5 Grid Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Projects"
          value="148"
          trend={{ value: "+12.7%", isPositive: true }}
          icon={<FolderGit2 size={16} className="text-[#5938F5]" />}
          sparklineColor="purple"
        />
        <KpiCard
          title="Audits Run"
          value="342"
          trend={{ value: "+28.4%", isPositive: true }}
          icon={<ShieldCheck size={16} className="text-[#3988F7]" />}
          sparklineColor="blue"
        />
        <KpiCard
          title="Critical Issues"
          value="18"
          trend={{ value: "-40.0%", isPositive: true }}
          icon={<AlertTriangle size={16} className="text-[#DC2626]" />}
          sparklineColor="rose"
        />
        <KpiCard
          title="Deployments"
          value="96"
          trend={{ value: "+21.5%", isPositive: true }}
          icon={<Rocket size={16} className="text-[#16A34A]" />}
          sparklineColor="emerald"
        />
        <KpiCard
          title="Monitored Sites"
          value="64"
          trend={{ value: "+18.5%", isPositive: true }}
          icon={<Globe size={16} className="text-[#6366F1]" />}
          sparklineColor="purple"
        />
      </div>

      {/* 3. Mid Section: Project Health Overview (Donut) & Audit / Deployment Trend (Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Project Health Overview */}
        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <h2 className="text-sm font-bold text-[#17172A]">Project Health Overview</h2>
              <span className="text-xs text-[#667085] font-medium">Production Scope</span>
            </div>

            {/* Donut and Legend Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              {/* SVG Donut Chart */}
              <div className="relative w-40 h-40 shrink-0">
                <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90 transform">
                  {/* Background Track */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#F1F4F9"
                    strokeWidth="16"
                  />
                  {/* Healthy Segment (62%) */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="16"
                    strokeDasharray={`${healthyArc} ${circumference}`}
                    strokeDashoffset={healthyOffset}
                    strokeLinecap="round"
                  />
                  {/* Warning Segment (21%) */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="16"
                    strokeDasharray={`${warningArc} ${circumference}`}
                    strokeDashoffset={warningOffset}
                    strokeLinecap="round"
                  />
                  {/* Critical Segment (12%) */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="16"
                    strokeDasharray={`${criticalArc} ${circumference}`}
                    strokeDashoffset={criticalOffset}
                    strokeLinecap="round"
                  />
                  {/* Not Scanned Segment (5%) */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="16"
                    strokeDasharray={`${notScannedArc} ${circumference}`}
                    strokeDashoffset={notScannedOffset}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#17172A] tracking-tight">148</span>
                  <span className="text-xs font-semibold text-[#667085]">Projects</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2.5 w-full max-w-xs text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                    <span className="font-medium text-[#17172A]">Healthy</span>
                  </div>
                  <span className="font-semibold text-[#17172A]">62% <span className="text-slate-400 font-normal">(92)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="font-medium text-[#17172A]">Warning</span>
                  </div>
                  <span className="font-semibold text-[#17172A]">21% <span className="text-slate-400 font-normal">(31)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                    <span className="font-medium text-[#17172A]">Critical</span>
                  </div>
                  <span className="font-semibold text-[#17172A]">12% <span className="text-slate-400 font-normal">(18)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
                    <span className="font-medium text-[#17172A]">Not Scanned</span>
                  </div>
                  <span className="font-semibold text-[#17172A]">5% <span className="text-slate-400 font-normal">(7)</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>Audit engine version: <strong className="text-[#17172A]">v0.1.0</strong></span>
            <button
              onClick={() => onNavigate("projects")}
              className="font-semibold text-[#5938F5] hover:underline"
            >
              Inspect All Projects →
            </button>
          </div>
        </div>

        {/* Right: Audit & Deployment Trend Chart */}
        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <h2 className="text-sm font-bold text-[#17172A]">Audit & Deployment Trend</h2>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#17172A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5938F5]" />
                  <span>Audits</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-[#17172A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3988F7]" />
                  <span>Deployments</span>
                </div>
              </div>
            </div>

            {/* Interactive SVG Area Chart */}
            <div className="w-full h-56 pt-2">
              <svg viewBox="0 0 560 180" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="trend-audits-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5938F5" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#5938F5" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="trend-deploy-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3988F7" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#3988F7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Grid Lines & Labels */}
                {[
                  { y: 15, label: "100" },
                  { y: 45, label: "80" },
                  { y: 75, label: "60" },
                  { y: 105, label: "40" },
                  { y: 135, label: "20" },
                  { y: 165, label: "0" },
                ].map((grid) => (
                  <g key={grid.label}>
                    <line
                      x1="30"
                      y1={grid.y}
                      x2="550"
                      y2={grid.y}
                      stroke="#F1F4F9"
                      strokeWidth="1"
                    />
                    <text
                      x="22"
                      y={grid.y + 3}
                      textAnchor="end"
                      className="text-[10px] fill-slate-400 font-mono"
                    >
                      {grid.label}
                    </text>
                  </g>
                ))}

                {/* Area Gradient Fills */}
                <path
                  d="M 40,150 Q 85,138 135,120 T 235,100 T 335,80 T 435,55 T 535,28 L 535,165 L 40,165 Z"
                  fill="url(#trend-audits-grad)"
                />
                <path
                  d="M 40,158 Q 85,152 135,142 T 235,125 T 335,115 T 435,92 T 535,85 L 535,165 L 40,165 Z"
                  fill="url(#trend-deploy-grad)"
                />

                {/* Audits Line Path */}
                <path
                  d="M 40,150 Q 85,138 135,120 T 235,100 T 335,80 T 435,55 T 535,28"
                  fill="none"
                  stroke="#5938F5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Deployments Line Path */}
                <path
                  d="M 40,158 Q 85,152 135,142 T 235,125 T 335,115 T 435,92 T 535,85"
                  fill="none"
                  stroke="#3988F7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data Points on Audits */}
                {[
                  { cx: 40, cy: 150 },
                  { cx: 135, cy: 120 },
                  { cx: 235, cy: 100 },
                  { cx: 335, cy: 80 },
                  { cx: 435, cy: 55 },
                  { cx: 535, cy: 28 },
                ].map((pt, i) => (
                  <circle
                    key={`aud-${i}`}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="3.5"
                    fill="#FFFFFF"
                    stroke="#5938F5"
                    strokeWidth="2"
                  />
                ))}

                {/* Data Points on Deployments */}
                {[
                  { cx: 40, cy: 158 },
                  { cx: 135, cy: 142 },
                  { cx: 235, cy: 125 },
                  { cx: 335, cy: 115 },
                  { cx: 435, cy: 92 },
                  { cx: 535, cy: 85 },
                ].map((pt, i) => (
                  <circle
                    key={`dep-${i}`}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="3.5"
                    fill="#FFFFFF"
                    stroke="#3988F7"
                    strokeWidth="2"
                  />
                ))}

                {/* X-Axis Date Labels */}
                {[
                  { x: 40, label: "Oct 1" },
                  { x: 90, label: "Oct 4" },
                  { x: 140, label: "Oct 7" },
                  { x: 190, label: "Oct 10" },
                  { x: 240, label: "Oct 13" },
                  { x: 290, label: "Oct 16" },
                  { x: 340, label: "Oct 19" },
                  { x: 390, label: "Oct 22" },
                  { x: 440, label: "Oct 25" },
                  { x: 490, label: "Oct 28" },
                  { x: 535, label: "Oct 31" },
                ].map((d) => (
                  <text
                    key={d.label}
                    x={d.x}
                    y="180"
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-mono"
                  >
                    {d.label}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>Peak velocity: <strong className="text-[#17172A]">34 audits / week</strong></span>
            <button
              onClick={() => onNavigate("audits")}
              className="font-semibold text-[#5938F5] hover:underline"
            >
              View Detailed Metrics →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Lower Tables: Recent Audits & Recent Deployments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Audits Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <h2 className="text-sm font-bold text-[#17172A]">Recent Audits</h2>
              <button
                onClick={() => onNavigate("audits")}
                className="text-xs font-bold text-[#5938F5] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F1F4F9] text-slate-400 text-[11px] font-semibold">
                    <th className="pb-2.5">Project</th>
                    <th className="pb-2.5">Framework</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5">Issues</th>
                    <th className="pb-2.5">Run At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFC]">
                  {auditsList.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 font-bold text-[#17172A]">
                        <div className="flex items-center gap-2">
                          <FolderGit2 size={15} className="text-[#5938F5] shrink-0" />
                          <span className="truncate max-w-[140px]">{a.project}</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-50 border border-[#E5E7EB] font-medium text-[10px] text-[#17172A]">
                          {a.framework}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <StatusBadge
                          label={a.status}
                          variant={a.status === "Passed" ? "success" : a.status === "Warnings" ? "warning" : "critical"}
                        />
                      </td>
                      <td className="py-2.5 font-semibold text-[#17172A]">{a.issues}</td>
                      <td className="py-2.5 text-[#667085] text-[11px] font-mono">{a.runAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>Deterministic checks: <strong>15 security & config rules</strong></span>
            <button
              onClick={onRunAudit}
              className="font-bold text-[#5938F5] hover:underline"
            >
              + Trigger Audit
            </button>
          </div>
        </div>

        {/* Recent Deployments Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <h2 className="text-sm font-bold text-[#17172A]">Recent Deployments</h2>
              <button
                onClick={() => onNavigate("deployments")}
                className="text-xs font-bold text-[#5938F5] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F1F4F9] text-slate-400 text-[11px] font-semibold">
                    <th className="pb-2.5">Project</th>
                    <th className="pb-2.5">Server</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5">Deployed At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFC]">
                  {deploymentsList.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 font-bold text-[#17172A]">
                        <div className="flex items-center gap-2">
                          <FolderGit2 size={15} className="text-[#3988F7] shrink-0" />
                          <span className="truncate max-w-[140px]">{d.project}</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50/60 border border-blue-100 text-[10px] font-mono text-[#2563EB]">
                          <Server size={11} />
                          <span>{d.server}</span>
                        </span>
                      </td>
                      <td className="py-2.5">
                        <StatusBadge
                          label={d.status}
                          variant={d.status === "Success" ? "success" : "danger"}
                        />
                      </td>
                      <td className="py-2.5 text-[#667085] text-[11px] font-mono">{d.deployedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>Release policy: <strong className="text-[#16A34A]">Pre-deploy check enforced</strong></span>
            <button
              onClick={() => onNavigate("deployments")}
              className="font-bold text-[#5938F5] hover:underline"
            >
              + Deploy Project
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom Row: System Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* System Status (4 Columns) */}
        <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
            <h2 className="text-sm font-bold text-[#17172A]">System Status</h2>
            <StatusBadge
              label={systemHealth === "healthy" ? "All Systems Operational" : "System Degraded"}
              variant={systemHealth === "healthy" ? "success" : "warning"}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-1.5">
                <Bot size={16} className="text-[#5938F5]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </div>
              <div className="font-bold text-xs text-[#17172A]">AI Providers</div>
              <div className="text-[11px] text-[#667085] font-medium">2 Connected</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-1.5">
                <Server size={16} className="text-[#3988F7]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </div>
              <div className="font-bold text-xs text-[#17172A]">VPS Manager</div>
              <div className="text-[11px] text-[#667085] font-medium">3 Servers</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-1.5">
                <Activity size={16} className="text-[#16A34A]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </div>
              <div className="font-bold text-xs text-[#17172A]">Monitoring</div>
              <div className="text-[11px] text-[#667085] font-medium">64 Websites</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar size={16} className="text-[#F59E0B]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              </div>
              <div className="font-bold text-xs text-[#17172A]">Scheduler</div>
              <div className="text-[11px] text-[#667085] font-medium">Active</div>
            </div>
          </div>
        </div>

        {/* Quick Actions (6 Tiles) */}
        <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
            <h2 className="text-sm font-bold text-[#17172A]">Quick Actions</h2>
            <span className="text-xs text-[#667085] font-medium">Operations Shortcuts</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            <button
              onClick={() => onNavigate("projects")}
              className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center group transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5938F5] group-hover:scale-105 transition-transform">
                <FolderGit2 size={16} />
              </div>
              <span className="text-[11px] font-semibold text-[#17172A] leading-tight">New Project</span>
            </button>

            <button
              onClick={onRunAudit}
              className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center group transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#3988F7] group-hover:scale-105 transition-transform">
                <ShieldCheck size={16} />
              </div>
              <span className="text-[11px] font-semibold text-[#17172A] leading-tight">Run Audit</span>
            </button>

            <button
              onClick={() => onNavigate("deployments")}
              className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center group transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#16A34A] group-hover:scale-105 transition-transform">
                <Rocket size={16} />
              </div>
              <span className="text-[11px] font-semibold text-[#17172A] leading-tight">Deploy App</span>
            </button>

            <button
              onClick={() => onNavigate("servers")}
              className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center group transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#F59E0B] group-hover:scale-105 transition-transform">
                <Server size={16} />
              </div>
              <span className="text-[11px] font-semibold text-[#17172A] leading-tight">Add Server</span>
            </button>

            <button
              onClick={() => onNavigate("ai")}
              className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center group transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5938F5] group-hover:scale-105 transition-transform">
                <Sparkles size={16} />
              </div>
              <span className="text-[11px] font-semibold text-[#17172A] leading-tight">AI Assistant</span>
            </button>

            <button
              onClick={() => onNavigate("users")}
              className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center group transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6366F1] group-hover:scale-105 transition-transform">
                <UserPlus size={16} />
              </div>
              <span className="text-[11px] font-semibold text-[#17172A] leading-tight">Add User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
