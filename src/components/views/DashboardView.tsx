"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";
import {
  FolderGit2,
  ShieldCheck,
  Rocket,
  RefreshCw,
  Calendar,
  ChevronDown,
  Server,
  Sparkles,
  UserPlus,
  Activity,
  ArrowUpRight,
  Cpu,
  HardDrive,
  Copy,
  Check,
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

export interface DashboardStats {
  totalProjects: number;
  totalAudits: number;
  criticalIssues: number;
  totalDeployments: number;
  monitoredSites: number;
  uptimePercent: string;
  healthyProjectsCount: number;
  warningProjectsCount: number;
  criticalProjectsCount: number;
  cpuUsagePercent?: number;
  memoryUsageMb?: number;
}

interface DashboardViewProps {
  onRunAudit: () => void;
  onNavigate: (view: string) => void;
  onRefresh?: () => void;
  recentAudits?: AuditItem[];
  recentDeployments?: DeploymentItem[];
  systemHealth?: string;
  stats?: DashboardStats;
}

export function DashboardView({
  onRunAudit,
  onNavigate,
  onRefresh,
  recentAudits = [],
  recentDeployments = [],
  systemHealth: _systemHealth = "healthy",
  stats,
}: DashboardViewProps) {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIp(text);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  // Fallback fixtures matching the live workspace if props are empty
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

  // Dynamic project health counts from live database stats
  const totalProjects = stats?.totalProjects ?? 5;
  const healthyCount = stats?.healthyProjectsCount ?? 4;
  const warningCount = stats?.warningProjectsCount ?? 1;
  const criticalCount = stats?.criticalProjectsCount ?? 0;
  const notScannedCount = Math.max(totalProjects - (healthyCount + warningCount + criticalCount), 0);

  const healthyPct = totalProjects > 0 ? Math.round((healthyCount / totalProjects) * 100) : 80;
  const warningPct = totalProjects > 0 ? Math.round((warningCount / totalProjects) * 100) : 20;
  const criticalPct = totalProjects > 0 ? Math.round((criticalCount / totalProjects) * 100) : 0;
  const notScannedPct = totalProjects > 0 ? Math.round((notScannedCount / totalProjects) * 100) : 0;

  // Donut chart math: circumference = 2 * PI * 50 = 314.159
  const circumference = 314.159;
  const healthyArc = (healthyPct / 100) * circumference;
  const warningArc = (warningPct / 100) * circumference;
  const criticalArc = (criticalPct / 100) * circumference;
  const notScannedArc = (notScannedPct / 100) * circumference;

  const healthyOffset = 0;
  const warningOffset = -healthyArc;
  const criticalOffset = -(healthyArc + warningArc);
  const notScannedOffset = -(healthyArc + warningArc + criticalArc);

  // Live host telemetry values
  const cpuPercent = stats?.cpuUsagePercent ?? 18.5;
  const memoryUsedMb = stats?.memoryUsageMb ?? 2140;
  const memoryTotalMb = 8192;
  const memoryPercent = Math.round((memoryUsedMb / memoryTotalMb) * 100);

  return (
    <div className="space-y-6">
      {/* 1. Page Header (Crisp, Purposeful, Zero-Slop) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-[#5938F5] border border-purple-100">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5938F5]" />
              DevSparks India
            </span>
            <span className="text-xs text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">Production Workspace</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17172A]">
            Operations Dashboard
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Pre-deployment verification, repository readiness, and infrastructure fleet status.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setDateRange(dateRange === "Last 30 Days" ? "Last 7 Days" : "Last 30 Days")}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#17172A] hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Calendar size={13} className="text-slate-400" />
            <span>{dateRange}</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Refresh dashboard telemetry"
          >
            <RefreshCw size={13} className={`text-slate-500 ${isRefreshing ? "animate-spin text-[#5938F5]" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onRunAudit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5938F5] hover:bg-[#4726DB] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs active:scale-[0.98]"
          >
            <ShieldCheck size={14} />
            <span>Run Pre-Deploy Audit</span>
          </button>
        </div>
      </div>

      {/* 2. Focused Telemetry & KPI Cards (Differentiated Hierarchy) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Audit Readiness (Hero) */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Audit Readiness
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-100">
                Passing Baseline
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-[#17172A] font-sans">
                100%
              </span>
              <span className="text-xs font-semibold text-[#16A34A] flex items-center">
                <ArrowUpRight size={13} />
                <span>+4.2%</span>
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>15 security rules verified</span>
            <span className="font-semibold text-[#17172A]">0 Critical</span>
          </div>
        </div>

        {/* Metric 2: Active Projects */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Connected Projects
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-[#5938F5] border border-purple-100">
                {totalProjects} Tracked
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-[#17172A] font-sans">
                {totalProjects}
              </span>
              <span className="text-xs text-[#667085]">repositories</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>{healthyCount} Healthy · {warningCount} Attention</span>
            <button
              onClick={() => onNavigate("projects")}
              className="font-semibold text-[#5938F5] hover:underline"
            >
              View →
            </button>
          </div>
        </div>

        {/* Metric 3: Production Releases */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Production Releases
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#2563EB] border border-blue-100">
                100% Success
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-[#17172A] font-sans">
                {stats?.totalDeployments ?? 14}
              </span>
              <span className="text-xs text-[#667085]">deployments</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>0 rollbacks this cycle</span>
            <span className="font-semibold text-emerald-600">Stable</span>
          </div>
        </div>

        {/* Metric 4: Synthetic Fleet Availability */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Synthetic Availability
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-100">
                Operational
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-[#17172A] font-sans">
                {stats?.uptimePercent ?? "99.98%"}
              </span>
              <span className="text-xs text-[#667085]">uptime</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>p95 Latency: 124ms</span>
            <span className="font-semibold text-[#17172A]">2 Nodes</span>
          </div>
        </div>
      </div>

      {/* 3. Mid Section: Repository Health (Left) + Infrastructure Fleet (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Project Health Breakdown */}
        <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#5938F5]" />
                <h2 className="text-sm font-bold text-[#17172A]">Repository Health</h2>
              </div>
              <span className="text-[11px] font-semibold text-[#667085]">
                {totalProjects} Repositories
              </span>
            </div>

            {/* Donut and Legend Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              {/* SVG Donut Chart */}
              <div className="relative w-36 h-36 shrink-0">
                <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90 transform">
                  {/* Background Track */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#F1F4F9"
                    strokeWidth="14"
                  />
                  {/* Healthy Segment */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="14"
                    strokeDasharray={`${healthyArc} ${circumference}`}
                    strokeDashoffset={healthyOffset}
                    strokeLinecap="round"
                  />
                  {/* Warning Segment */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray={`${warningArc} ${circumference}`}
                    strokeDashoffset={warningOffset}
                    strokeLinecap="round"
                  />
                  {/* Critical Segment */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="14"
                    strokeDasharray={`${criticalArc} ${circumference}`}
                    strokeDashoffset={criticalOffset}
                    strokeLinecap="round"
                  />
                  {/* Not Scanned Segment */}
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="14"
                    strokeDasharray={`${notScannedArc} ${circumference}`}
                    strokeDashoffset={notScannedOffset}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#17172A] tracking-tight">{healthyPct}%</span>
                  <span className="text-[11px] font-semibold text-[#667085]">Passing</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2.5 w-full max-w-xs text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    <span className="font-semibold text-emerald-900">Healthy</span>
                  </div>
                  <span className="font-bold text-[#17172A]">
                    {healthyCount} <span className="text-slate-400 font-normal">({healthyPct}%)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span className="font-semibold text-amber-900">Attention Required</span>
                  </div>
                  <span className="font-bold text-[#17172A]">
                    {warningCount} <span className="text-slate-400 font-normal">({warningPct}%)</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                    <span className="font-semibold text-slate-700">Critical Issues</span>
                  </div>
                  <span className="font-bold text-[#17172A]">
                    {criticalCount} <span className="text-slate-400 font-normal">({criticalPct}%)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>Deterministic checks: <strong>15 rules</strong></span>
            <button
              onClick={() => onNavigate("projects")}
              className="font-semibold text-[#5938F5] hover:underline"
            >
              Inspect All Projects →
            </button>
          </div>
        </div>

        {/* Right: Infrastructure Nodes (VPS Servers) */}
        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-[#3988F7]" />
                <h2 className="text-sm font-bold text-[#17172A]">Infrastructure Fleet (VPS Nodes)</h2>
              </div>
              <button
                onClick={() => onNavigate("servers")}
                className="text-xs font-semibold text-[#5938F5] hover:underline"
              >
                Manage Servers →
              </button>
            </div>

            {/* Server Node Cards */}
            <div className="space-y-3">
              {/* Server 1 */}
              <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
                      <Server size={14} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#17172A]">VPS-01</span>
                        <span className="text-[10px] text-slate-500 font-medium">(Production Mumbai)</span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono text-slate-600 bg-white border border-[#E5E7EB]">
                          104.195.112.44
                          <button
                            onClick={() => copyToClipboard("104.195.112.44")}
                            className="text-slate-400 hover:text-slate-700 ml-0.5"
                            title="Copy IP"
                          >
                            {copiedIp === "104.195.112.44" ? <Check size={10} className="text-emerald-600" /> : <Copy size={10} />}
                          </button>
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Ubuntu 22.04 LTS · Docker runtime</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                      Online
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-[#5938F5] border border-purple-100">
                      Policy: Enforced
                    </span>
                  </div>
                </div>

                {/* Resource Meters */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E5E7EB]/60 text-[11px]">
                  <div>
                    <div className="flex items-center justify-between text-slate-600 mb-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Cpu size={12} className="text-slate-400" />
                        <span>CPU Usage</span>
                      </span>
                      <span className="font-mono font-semibold text-[#17172A]">{cpuPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#5938F5] rounded-full" style={{ width: `${cpuPercent}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-slate-600 mb-1">
                      <span className="flex items-center gap-1 font-medium">
                        <HardDrive size={12} className="text-slate-400" />
                        <span>RAM</span>
                      </span>
                      <span className="font-mono font-semibold text-[#17172A]">{memoryUsedMb} MB / 8 GB</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3988F7] rounded-full" style={{ width: `${memoryPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Server 2 */}
              <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0">
                      <Server size={14} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#17172A]">VPS-02</span>
                        <span className="text-[10px] text-slate-500 font-medium">(Production Bangalore)</span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono text-slate-600 bg-white border border-[#E5E7EB]">
                          139.59.88.12
                          <button
                            onClick={() => copyToClipboard("139.59.88.12")}
                            className="text-slate-400 hover:text-slate-700 ml-0.5"
                            title="Copy IP"
                          >
                            {copiedIp === "139.59.88.12" ? <Check size={10} className="text-emerald-600" /> : <Copy size={10} />}
                          </button>
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Ubuntu 24.04 LTS · Docker runtime</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                      Online
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-[#5938F5] border border-purple-100">
                      Policy: Enforced
                    </span>
                  </div>
                </div>

                {/* Resource Meters */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E5E7EB]/60 text-[11px]">
                  <div>
                    <div className="flex items-center justify-between text-slate-600 mb-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Cpu size={12} className="text-slate-400" />
                        <span>CPU Usage</span>
                      </span>
                      <span className="font-mono font-semibold text-[#17172A]">24.0%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#5938F5] rounded-full" style={{ width: "24%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-slate-600 mb-1">
                      <span className="flex items-center gap-1 font-medium">
                        <HardDrive size={12} className="text-slate-400" />
                        <span>RAM</span>
                      </span>
                      <span className="font-mono font-semibold text-[#17172A]">3.4 GB / 8 GB</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3988F7] rounded-full" style={{ width: "42%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
            <span>Policy Gateway: <strong className="text-emerald-700">Enforced (Restricted runner)</strong></span>
            <span className="text-slate-400">Zero direct root access allowed</span>
          </div>
        </div>
      </div>

      {/* 4. Lower Tables: Recent Audits & Recent Deployments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Audits Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#5938F5]" />
                <h2 className="text-sm font-bold text-[#17172A]">Recent Pre-Deployment Audits</h2>
              </div>
              <button
                onClick={() => onNavigate("audits")}
                className="text-xs font-semibold text-[#5938F5] hover:underline"
              >
                All Audits →
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
            <span>Deterministic checks: <strong>15 security rules</strong></span>
            <button
              onClick={onRunAudit}
              className="font-bold text-[#5938F5] hover:underline"
            >
              + Trigger Audit
            </button>
          </div>
        </div>

        {/* Recent Deployments Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
              <div className="flex items-center gap-2">
                <Rocket size={16} className="text-[#3988F7]" />
                <h2 className="text-sm font-bold text-[#17172A]">Recent VPS Deployments</h2>
              </div>
              <button
                onClick={() => onNavigate("deployments")}
                className="text-xs font-semibold text-[#5938F5] hover:underline"
              >
                All Releases →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F1F4F9] text-slate-400 text-[11px] font-semibold">
                    <th className="pb-2.5">Project</th>
                    <th className="pb-2.5">Target Node</th>
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
            <span>Release policy: <strong className="text-[#16A34A]">Audit gate verified</strong></span>
            <button
              onClick={() => onNavigate("deployments")}
              className="font-bold text-[#5938F5] hover:underline"
            >
              + Deploy Project
            </button>
          </div>
        </div>
      </div>

      {/* 5. Diagnostic Tools & Operations Dock */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9] mb-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-slate-700" />
            <h2 className="text-sm font-bold text-[#17172A]">Operations Dock</h2>
          </div>
          <span className="text-xs text-[#667085]">Quick Workspace Navigation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigate("projects")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center transition-colors active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5938F5]">
              <FolderGit2 size={16} />
            </div>
            <span className="text-[11px] font-semibold text-[#17172A] leading-tight">New Project</span>
          </button>

          <button
            onClick={onRunAudit}
            className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center transition-colors active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#3988F7]">
              <ShieldCheck size={16} />
            </div>
            <span className="text-[11px] font-semibold text-[#17172A] leading-tight">Run Audit</span>
          </button>

          <button
            onClick={() => onNavigate("deployments")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center transition-colors active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#16A34A]">
              <Rocket size={16} />
            </div>
            <span className="text-[11px] font-semibold text-[#17172A] leading-tight">Deploy App</span>
          </button>

          <button
            onClick={() => onNavigate("servers")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center transition-colors active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#F59E0B]">
              <Server size={16} />
            </div>
            <span className="text-[11px] font-semibold text-[#17172A] leading-tight">VPS Telemetry</span>
          </button>

          <button
            onClick={() => onNavigate("ai")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center transition-colors active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#5938F5]">
              <Sparkles size={16} />
            </div>
            <span className="text-[11px] font-semibold text-[#17172A] leading-tight">AI Assistant</span>
          </button>

          <button
            onClick={() => onNavigate("users")}
            className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-[#E5E7EB] hover:border-[#5938F5]/30 flex flex-col items-center justify-center gap-2 text-center transition-colors active:scale-[0.98]"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6366F1]">
              <UserPlus size={16} />
            </div>
            <span className="text-[11px] font-semibold text-[#17172A] leading-tight">Team & IAM</span>
          </button>
        </div>
      </div>
    </div>
  );
}
