"use client";

import React, { useState } from "react";

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

export default function DeployCheckDashboard() {
  const [activeNav, setActiveNav] = useState<string>("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "audits" | "ai" | "settings" | "auth">("overview");

  // State for AI Diff Review Modal
  const [activeDiffModal, setActiveDiffModal] = useState<boolean>(false);
  const [diffApprovalState, setDiffApprovalState] = useState<"pending" | "approved" | "rejected">("pending");

  // State for Settings Form (matching Profile Settings Mockup)
  const [fullName, setFullName] = useState("Nikhil Dhawan");
  const [email, setEmail] = useState("nikhil@devsparksindia.com");
  const [aboutMe, setAboutMe] = useState("Founder, DevSparks India. Building open-source tools for developers.");

  // Real Mockup Data Fixtures (matches Super Admin Dashboard mockup)
  const recentAudits: AuditItem[] = [
    { id: "aud-1", project: "thefein.in", framework: "Next.js", status: "Passed", issues: 0, runAt: "31 Oct, 11:42 AM" },
    { id: "aud-2", project: "kreedaportal.com", framework: "Laravel", status: "Warnings", issues: 5, runAt: "31 Oct, 10:18 AM" },
    { id: "aud-3", project: "silvereraheritage.com", framework: "Next.js", status: "Critical", issues: 8, runAt: "30 Oct, 08:47 PM" },
    { id: "aud-4", project: "compikart.opm", framework: "Node.js", status: "Passed", issues: 0, runAt: "30 Oct, 05:22 PM" },
    { id: "aud-5", project: "devsparksindia.com", framework: "Next.js", status: "Warnings", issues: 3, runAt: "30 Oct, 02:11 PM" },
  ];

  const recentDeployments: DeploymentItem[] = [
    { id: "dep-1", project: "kreedaportal.com", server: "VPS-01 (prod)", status: "Success", deployedAt: "31 Oct, 09:35 AM" },
    { id: "dep-2", project: "thefein.in", server: "VPS-02 (prod)", status: "Success", deployedAt: "30 Oct, 11:10 PM" },
    { id: "dep-3", project: "acs-solar.com", server: "VPS-01 (staging)", status: "Failed", deployedAt: "30 Oct, 06:27 PM" },
    { id: "dep-4", project: "dailymoney.app", server: "VPS-03 (prod)", status: "Success", deployedAt: "29 Oct, 09:14 PM" },
    { id: "dep-5", project: "kclindia.com", server: "VPS-02 (prod)", status: "Success", deployedAt: "29 Oct, 04:03 PM" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] text-[#172033]">
      {/* SIDEBAR NAVIGATION (Matching Mockup) */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-[#E4E7EC] flex flex-col justify-between transition-all duration-200 shrink-0 z-20`}
      >
        <div className="p-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 px-2 py-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3563E9] to-[#6D5EF7] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
              ⚡
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="font-extrabold text-sm tracking-tight text-[#172033]">
                  DevSparks<br />DeployCheck
                </div>
                <div className="text-[10px] text-[#667085] font-medium">By DevSparks India</div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="space-y-6 text-xs">
            {/* Main */}
            <div>
              <button
                onClick={() => {
                  setActiveNav("Dashboard");
                  setActiveTab("overview");
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all ${
                  activeNav === "Dashboard"
                    ? "bg-[#3563E9] text-white shadow-sm"
                    : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
                }`}
              >
                <span className="text-sm">🗂️</span>
                {!sidebarCollapsed && <span>Dashboard</span>}
              </button>
            </div>

            {/* Projects Section */}
            <div>
              {!sidebarCollapsed && (
                <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                  <span>Projects</span>
                  <span>⌃</span>
                </div>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveNav("All Projects");
                    setActiveTab("audits");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeNav === "All Projects" ? "text-[#3563E9] bg-blue-50/60" : "text-[#667085] hover:text-[#172033]"
                  }`}
                >
                  <span>📁</span>
                  {!sidebarCollapsed && <span>All Projects</span>}
                </button>
                <button
                  onClick={() => {
                    setActiveNav("Audit Reports");
                    setActiveTab("audits");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeNav === "Audit Reports" ? "text-[#3563E9] bg-blue-50/60" : "text-[#667085] hover:text-[#172033]"
                  }`}
                >
                  <span>📋</span>
                  {!sidebarCollapsed && <span>Audit Reports</span>}
                </button>
                <button
                  onClick={() => {
                    setActiveNav("AI Assistant");
                    setActiveTab("ai");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeNav === "AI Assistant" ? "text-[#3563E9] bg-blue-50/60" : "text-[#667085] hover:text-[#172033]"
                  }`}
                >
                  <span>✨</span>
                  {!sidebarCollapsed && <span>AI Assistant</span>}
                </button>
              </div>
            </div>

            {/* Deploy Section */}
            <div>
              {!sidebarCollapsed && (
                <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                  <span>Deploy</span>
                  <span>⌃</span>
                </div>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => alert("VPS Servers module is planned for Release 1.")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-[#667085] hover:text-[#172033]"
                >
                  <span>🖥️</span>
                  {!sidebarCollapsed && <span>VPS Servers</span>}
                </button>
                <button
                  onClick={() => alert("Deployments module is planned for Release 1.")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-[#667085] hover:text-[#172033]"
                >
                  <span>🚀</span>
                  {!sidebarCollapsed && <span>Deployments</span>}
                </button>
                <button
                  onClick={() => alert("SSH Console is planned for Release 1.")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-[#667085] hover:text-[#172033]"
                >
                  <span>⌨️</span>
                  {!sidebarCollapsed && <span>SSH Console</span>}
                </button>
              </div>
            </div>

            {/* Monitor Section */}
            <div>
              {!sidebarCollapsed && (
                <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                  <span>Monitor</span>
                  <span>⌃</span>
                </div>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => alert("Website monitoring is planned for Release 2.")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-[#667085] hover:text-[#172033]"
                >
                  <span>🌐</span>
                  {!sidebarCollapsed && <span>Websites & Apps</span>}
                </button>
                <button
                  onClick={() => alert("Uptime checks are planned for Release 2.")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-[#667085] hover:text-[#172033]"
                >
                  <span>📈</span>
                  {!sidebarCollapsed && <span>Uptime & Status</span>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Settings Button */}
        <div className="p-4 border-t border-[#E4E7EC]">
          <button
            onClick={() => {
              setActiveNav("Settings");
              setActiveTab("settings");
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all ${
              activeNav === "Settings"
                ? "bg-[#3563E9] text-white shadow-sm"
                : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
            }`}
          >
            <span>⚙️</span>
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR (Matches Mockup) */}
        <header className="h-16 bg-white border-b border-[#E4E7EC] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            {/* Sidebar toggle button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg border border-[#E4E7EC] hover:bg-slate-50 text-slate-600 transition-colors"
            >
              ☰
            </button>

            {/* Global Search */}
            <div className="relative w-full">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Search projects, servers, audits..."
                className="w-full pl-9 pr-14 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#172033] focus:outline-none focus:border-blue-500 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                Ctrl + K
              </span>
            </div>
          </div>

          {/* Action Tools & User Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("audits")}
              className="px-3.5 py-2 bg-[#3563E9] hover:bg-[#264FC7] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>+</span> New Project <span className="text-[10px]">⌄</span>
            </button>

            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50 relative">
              <span>🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            <button
              onClick={() => setActiveTab("auth")}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50"
              title="Auth Modal"
            >
              <span>❓</span>
            </button>

            {/* User Avatar */}
            <div
              onClick={() => {
                setActiveNav("Settings");
                setActiveTab("settings");
              }}
              className="flex items-center gap-2.5 pl-2 cursor-pointer border-l border-[#E4E7EC]"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 overflow-hidden flex items-center justify-center font-bold text-xs text-[#3563E9]">
                ND
              </div>
              <div className="hidden sm:block text-left">
                <div className="font-bold text-xs text-[#172033] leading-tight">Nikhil Dhawan</div>
                <div className="text-[10px] text-[#3563E9] font-medium">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: SUPER ADMIN DASHBOARD (Matches Exact Mockup) */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#172033]">
                    Welcome back, Nikhil Dhawan 👋
                  </h1>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Super Admin Dashboard • DevSparks DeployCheck
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E4E7EC] rounded-xl text-xs font-medium text-slate-700 shadow-xs">
                    <span>📅</span> Last 30 Days <span>⌄</span>
                  </div>
                  <button
                    onClick={() => alert("Dashboard metrics refreshed.")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3563E9] text-white rounded-xl text-xs font-semibold shadow-xs hover:bg-[#264FC7] transition-colors"
                  >
                    <span>↻</span> Refresh
                  </button>
                </div>
              </div>

              {/* 5 KPI Stat Cards (Matching Mockup) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {/* 1. Total Projects */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1">
                    <span className="p-1.5 bg-blue-50 text-[#3563E9] rounded-lg">📦</span> Total Projects
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black tracking-tight text-[#172033]">148</span>
                    <span className="text-[11px] font-bold text-emerald-700">↑ +12.7%</span>
                  </div>
                </div>

                {/* 2. Audits Run */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1">
                    <span className="p-1.5 bg-blue-50 text-[#3563E9] rounded-lg">🛡️</span> Audits Run
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black tracking-tight text-[#172033]">342</span>
                    <span className="text-[11px] font-bold text-emerald-700">↑ +28.4%</span>
                  </div>
                </div>

                {/* 3. Critical Issues */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1">
                    <span className="p-1.5 bg-red-50 text-[#C62828] rounded-lg">⚠️</span> Critical Issues
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black tracking-tight text-[#172033]">18</span>
                    <span className="text-[11px] font-bold text-emerald-700">↓ -40.0%</span>
                  </div>
                </div>

                {/* 4. Deployments */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1">
                    <span className="p-1.5 bg-emerald-50 text-[#16803D] rounded-lg">🚀</span> Deployments
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black tracking-tight text-[#172033]">96</span>
                    <span className="text-[11px] font-bold text-emerald-700">↑ +21.5%</span>
                  </div>
                </div>

                {/* 5. Monitored Sites */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-xs relative overflow-hidden col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1">
                    <span className="p-1.5 bg-purple-50 text-[#6D5EF7] rounded-lg">🖥️</span> Monitored Sites
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black tracking-tight text-[#172033]">64</span>
                    <span className="text-[11px] font-bold text-emerald-700">↑ +18.5%</span>
                  </div>
                </div>
              </div>

              {/* Middle Charts Row (Project Health + Trend) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Project Health Overview Doughnut */}
                <div className="lg:col-span-5 bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <h2 className="font-bold text-sm text-[#172033] mb-4">Project Health Overview</h2>
                  <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
                    {/* SVG Doughnut */}
                    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E4E7EC" strokeWidth="4" strokeDasharray="5 95" strokeDashoffset="0"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#C62828" strokeWidth="4" strokeDasharray="12 88" strokeDashoffset="-5"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#B7791F" strokeWidth="4" strokeDasharray="21 79" strokeDashoffset="-17"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#16803D" strokeWidth="4" strokeDasharray="62 38" strokeDashoffset="-38"></circle>
                      </svg>
                      <div className="absolute text-center">
                        <div className="text-xl font-black text-[#172033]">148</div>
                        <div className="text-[10px] text-[#667085] font-medium">Projects</div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-6">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#16803D]"></span> Healthy</span>
                        <span className="font-bold text-slate-800">62% (92)</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#B7791F]"></span> Warning</span>
                        <span className="font-bold text-slate-800">21% (31)</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#C62828]"></span> Critical</span>
                        <span className="font-bold text-slate-800">12% (18)</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Not Scanned</span>
                        <span className="font-bold text-slate-800">5% (7)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit & Deployment Trend Chart */}
                <div className="lg:col-span-7 bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-sm text-[#172033]">Audit & Deployment Trend</h2>
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#6D5EF7]"></span> Audits</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3563E9]"></span> Deployments</span>
                    </div>
                  </div>

                  {/* SVG Trend Line */}
                  <div className="w-full h-36 pt-2">
                    <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="500" y2="20" stroke="#EAECF0" strokeWidth="1"></line>
                      <line x1="0" y1="60" x2="500" y2="60" stroke="#EAECF0" strokeWidth="1"></line>
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#EAECF0" strokeWidth="1"></line>

                      {/* Audits Line (Violet) */}
                      <path
                        d="M 0,100 Q 80,80 150,60 T 300,50 T 400,30 T 500,15"
                        fill="none"
                        stroke="#6D5EF7"
                        strokeWidth="2.5"
                      ></path>

                      {/* Deployments Line (Blue) */}
                      <path
                        d="M 0,110 Q 80,95 150,85 T 300,75 T 400,60 T 500,45"
                        fill="none"
                        stroke="#3563E9"
                        strokeWidth="2.5"
                      ></path>
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                    <span>Oct 1</span>
                    <span>Oct 7</span>
                    <span>Oct 13</span>
                    <span>Oct 19</span>
                    <span>Oct 25</span>
                    <span>Oct 31</span>
                  </div>
                </div>
              </div>

              {/* Lower Row: Recent Audits & Recent Deployments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Recent Audits Table */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-[#E4E7EC] flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#172033]">Recent Audits</h3>
                    <button
                      onClick={() => setActiveTab("audits")}
                      className="text-xs text-[#3563E9] font-semibold hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-[#E4E7EC]">
                          <th className="p-3">Project</th>
                          <th className="p-3">Framework</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Issues</th>
                          <th className="p-3">Run At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E7EC]">
                        {recentAudits.map((a) => (
                          <tr key={a.id} className="hover:bg-slate-50/60">
                            <td className="p-3 font-semibold text-[#172033] flex items-center gap-2">
                              <span>📁</span> {a.project}
                            </td>
                            <td className="p-3 text-slate-600">{a.framework}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  a.status === "Passed"
                                    ? "bg-emerald-50 text-[#16803D]"
                                    : a.status === "Warnings"
                                    ? "bg-amber-50 text-[#B7791F]"
                                    : "bg-red-50 text-[#C62828]"
                                }`}
                              >
                                ● {a.status}
                              </span>
                            </td>
                            <td className="p-3 font-medium text-slate-700">{a.issues}</td>
                            <td className="p-3 text-slate-500">{a.runAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Deployments Table */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-[#E4E7EC] flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#172033]">Recent Deployments</h3>
                    <span className="text-xs text-[#3563E9] font-semibold cursor-pointer hover:underline">
                      View All →
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-[#E4E7EC]">
                          <th className="p-3">Project</th>
                          <th className="p-3">Server</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Deployed At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E7EC]">
                        {recentDeployments.map((d) => (
                          <tr key={d.id} className="hover:bg-slate-50/60">
                            <td className="p-3 font-semibold text-[#172033] flex items-center gap-2">
                              <span>📁</span> {d.project}
                            </td>
                            <td className="p-3 text-slate-600 flex items-center gap-1.5">
                              <span>☁️</span> {d.server}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  d.status === "Success"
                                    ? "bg-emerald-50 text-[#16803D]"
                                    : "bg-red-50 text-[#C62828]"
                                }`}
                              >
                                ● {d.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500">{d.deployedAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Bottom Row: System Status + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* System Status */}
                <div className="lg:col-span-5 bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <h3 className="font-bold text-sm text-[#172033] mb-3">System Status</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="flex items-center gap-2"><span>🤖</span> AI Providers</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 2 Connected
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="flex items-center gap-2"><span>🖥️</span> VPS Manager</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 3 Servers
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="flex items-center gap-2"><span>📈</span> Monitoring</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 64 Websites
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="flex items-center gap-2"><span>⏱️</span> Scheduler</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="lg:col-span-7 bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-xs">
                  <h3 className="font-bold text-sm text-[#172033] mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                    <button
                      onClick={() => setActiveTab("audits")}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                      <div className="text-base mb-1">📁</div>
                      <div className="font-semibold text-slate-800">New Project</div>
                    </button>
                    <button
                      onClick={() => setActiveTab("audits")}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                      <div className="text-base mb-1">🛡️</div>
                      <div className="font-semibold text-slate-800">Run Audit</div>
                    </button>
                    <button
                      onClick={() => alert("Deployment wizard is planned for Release 1.")}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                      <div className="text-base mb-1">🚀</div>
                      <div className="font-semibold text-slate-800">Deploy App</div>
                    </button>
                    <button
                      onClick={() => alert("Server configuration is planned for Release 1.")}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                      <div className="text-base mb-1">🗄️</div>
                      <div className="font-semibold text-slate-800">Add Server</div>
                    </button>
                    <button
                      onClick={() => setActiveTab("ai")}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                      <div className="text-base mb-1">✨</div>
                      <div className="font-semibold text-slate-800">AI Assistant</div>
                    </button>
                    <button
                      onClick={() => setActiveTab("auth")}
                      className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                    >
                      <div className="text-base mb-1">👤</div>
                      <div className="font-semibold text-slate-800">Add User</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDIT REPORTS & RUNNER */}
          {activeTab === "audits" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#172033]">Pre-Deployment Audit Reports</h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Execute automated checks before code deployment. Detects exposed credentials, package discrepancies, and missing configurations.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveDiffModal(true);
                    setDiffApprovalState("pending");
                  }}
                  className="px-4 py-2 bg-[#3563E9] text-white text-xs font-semibold rounded-xl hover:bg-[#264FC7] transition-colors shadow-xs flex items-center gap-2"
                >
                  <span>✨</span> Inspect AI Fix for silvereraheritage.com
                </button>
              </div>

              {/* Active Finding Card for silvereraheritage.com */}
              <div className="bg-white border-2 border-red-300 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-red-100 text-[#C62828] text-xs font-bold rounded-md">CRITICAL</span>
                    <h3 className="font-bold text-sm text-[#172033]">SEC-001: Exposed AWS Access Key</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">silvereraheritage.com:src/config.ts#L14</span>
                </div>
                <p className="text-xs text-slate-600">
                  A potential hardcoded AWS credential was discovered. Committing secrets to version control exposes resources to unauthorized access.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 font-medium">Remediation: Move credentials to .env and rotate immediately.</span>
                  <button
                    onClick={() => {
                      setActiveDiffModal(true);
                      setDiffApprovalState("pending");
                    }}
                    className="px-3.5 py-1.5 bg-blue-50 text-[#3563E9] hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-bold transition-colors"
                  >
                    Review AI Patch Proposal ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI ASSISTANT & DIFF REVIEW MODAL */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#172033]">AI Coding Assistant & Diff Review</h1>
                  <p className="text-xs text-[#667085] mt-1">
                    Policy Invariant: AI models only propose structured patches. Explicit human review and approval is required before code changes are applied.
                  </p>
                </div>
              </div>

              {/* Side-by-side Visual Diff Viewer (Invariant Verification) */}
              <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-xs">
                <div className="p-4 bg-slate-50 border-b border-[#E4E7EC] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#172033]">Proposed Patch: src/config.ts</span>
                    <span className="ml-2 text-[11px] text-slate-500">• Model: meta-llama/llama-3-8b-instruct:free</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Diff Preview</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E4E7EC] font-mono text-xs">
                  {/* Original Code */}
                  <div className="p-5 bg-red-50/40">
                    <div className="font-bold text-red-800 mb-2 flex items-center gap-1.5">
                      <span>-</span> Original Vulnerable Code
                    </div>
                    <pre className="text-slate-800 text-[11px] whitespace-pre-wrap">
{`const awsKey = 'AKIA_EXPOSED_AWS_ACCESS_KEY';
const awsSecret = 'MOCK_SECRET_KEY_NOT_REAL';`}
                    </pre>
                  </div>

                  {/* AI Suggested Patch */}
                  <div className="p-5 bg-emerald-50/40">
                    <div className="font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                      <span>+</span> Suggested AI Remediation
                    </div>
                    <pre className="text-slate-800 text-[11px] whitespace-pre-wrap">
{`const awsKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;
if (!awsKey || !awsSecret) {
  throw new Error('Missing required AWS credentials in environment');
}`}
                    </pre>
                  </div>
                </div>

                {/* Human Approval Controls */}
                <div className="p-4 bg-slate-50 border-t border-[#E4E7EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <span className="font-bold text-[#172033]">Human Approval Status: </span>
                    {diffApprovalState === "pending" && (
                      <span className="text-amber-700 font-semibold">Pending Review</span>
                    )}
                    {diffApprovalState === "approved" && (
                      <span className="text-emerald-700 font-semibold">✅ Approved by Super Admin</span>
                    )}
                    {diffApprovalState === "rejected" && (
                      <span className="text-red-700 font-semibold">❌ Rejected</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setDiffApprovalState("rejected")}
                      className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Reject Patch
                    </button>
                    <button
                      onClick={() => {
                        setDiffApprovalState("approved");
                        alert("Patch approved by operator! Scheduled for isolated test runner.");
                      }}
                      className="px-4 py-2 bg-[#16803D] hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                    >
                      Approve & Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS & PROFILE (Exact Replica of Profile Settings Mockup) */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-blue-50 text-[#3563E9] rounded-xl text-lg">🗂️</span>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#172033]">Profile Settings</h1>
                  <p className="text-xs text-[#667085]">Dashboard › Settings › Profile</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Profile Navigation */}
                <div className="md:col-span-3 space-y-1">
                  <button className="w-full text-left px-3.5 py-2.5 rounded-xl bg-blue-50 text-[#3563E9] font-bold text-xs flex items-center gap-2.5">
                    <span>👤</span> Profile
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-[#667085] hover:bg-slate-50 font-medium text-xs flex items-center gap-2.5">
                    <span>🔒</span> Account & Security
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-[#667085] hover:bg-slate-50 font-medium text-xs flex items-center gap-2.5">
                    <span>⚙️</span> Preferences
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-[#667085] hover:bg-slate-50 font-medium text-xs flex items-center gap-2.5">
                    <span>🔔</span> Notifications
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-[#667085] hover:bg-slate-50 font-medium text-xs flex items-center gap-2.5">
                    <span>🔑</span> API Keys (BYOK)
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-[#667085] hover:bg-slate-50 font-medium text-xs flex items-center gap-2.5">
                    <span>🔗</span> SSO & Integrations
                  </button>
                  <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-[#667085] hover:bg-slate-50 font-medium text-xs flex items-center gap-2.5">
                    <span>⏱️</span> Activity Log
                  </button>
                </div>

                {/* Right Profile Form */}
                <div className="md:col-span-9 bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-xs space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E4E7EC]">
                    <div>
                      <h2 className="font-bold text-base text-[#172033]">Profile Information</h2>
                      <p className="text-xs text-[#667085]">Update your personal and admin profile details.</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-[#E4E7EC] rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        Discard
                      </button>
                      <button
                        onClick={() => alert("Profile details saved successfully.")}
                        className="px-4 py-2 bg-[#3563E9] text-white rounded-xl text-xs font-semibold hover:bg-[#264FC7] transition-colors shadow-xs"
                      >
                        💾 Save Changes
                      </button>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center font-bold text-lg text-[#3563E9]">
                      ND
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#172033] mb-0.5">Profile Photo</div>
                      <div className="text-[11px] text-[#667085] mb-2">JPG, PNG or WebP. Max 5 MB.</div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-blue-50 text-[#3563E9] border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors">
                          ↑ Upload New
                        </button>
                        <button className="px-3 py-1.5 border border-[#E4E7EC] text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors">
                          🗑 Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Display Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Mobile Number</label>
                      <input
                        type="text"
                        defaultValue="+91 98765 43210"
                        className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Role</label>
                      <input
                        type="text"
                        disabled
                        value="Super Admin"
                        className="w-full px-3 py-2 bg-slate-50 border border-[#E4E7EC] rounded-xl text-slate-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Department</label>
                      <input
                        type="text"
                        defaultValue="Product & Engineering"
                        className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* About Me */}
                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-slate-700">About Me</label>
                    <textarea
                      rows={3}
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                    ></textarea>
                    <div className="text-right text-[10px] text-slate-400">58 / 250</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AUTHENTICATION MODAL (Exact Replica of Login & Signup Mockup) */}
          {activeTab === "auth" && (
            <div className="max-w-2xl mx-auto bg-white border border-[#E4E7EC] rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
              {/* Left Features Panel */}
              <div className="md:col-span-5 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E4E7EC]">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-[#172033] mb-1">
                    Audit, Fix, Deploy and <span className="text-[#3563E9]">Monitor</span>
                  </h3>
                  <p className="text-[11px] text-[#667085] mb-6">
                    Pre-deployment audit, AI assistance, VPS deployment and website monitoring in one platform.
                  </p>
                  <div className="space-y-2 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2"><span className="text-[#3563E9]">✓</span> Code & security audit</div>
                    <div className="flex items-center gap-2"><span className="text-[#3563E9]">✓</span> AI coding assistance</div>
                    <div className="flex items-center gap-2"><span className="text-[#3563E9]">✓</span> One-click deployment</div>
                    <div className="flex items-center gap-2"><span className="text-[#3563E9]">✓</span> Website monitoring</div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-6">DevSparks India © 2026</div>
              </div>

              {/* Right Login Form */}
              <div className="md:col-span-7 p-6 space-y-4 text-xs">
                <div>
                  <h2 className="text-lg font-extrabold text-[#172033]">Welcome Back</h2>
                  <p className="text-[#667085]">Sign in to your DevSparks DeployCheck account</p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    defaultValue="nikhil@devsparksindia.com"
                    className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    defaultValue="••••••••••••"
                    className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={() => {
                    alert("Signed in successfully as Super Admin.");
                    setActiveTab("overview");
                  }}
                  className="w-full py-2.5 bg-[#3563E9] text-white font-bold rounded-xl hover:bg-[#264FC7] transition-colors shadow-xs"
                >
                  Sign In →
                </button>

                <div className="text-center text-slate-400 text-[11px] my-2">Or continue with</div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 border border-[#E4E7EC] rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                    <span>🐙</span> GitHub
                  </button>
                  <button className="py-2 border border-[#E4E7EC] rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                    <span>🌐</span> Google
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ACTIVE DIFF REVIEW MODAL (Triggered from Audits tab) */}
      {activeDiffModal && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E4E7EC] rounded-3xl max-w-2xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
              <div>
                <h3 className="font-bold text-sm text-[#172033]">AI Patch Review: silvereraheritage.com</h3>
                <p className="text-[11px] text-[#667085]">Model: meta-llama/llama-3-8b-instruct:free • Rule SEC-001</p>
              </div>
              <button
                onClick={() => setActiveDiffModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#E4E7EC] border border-[#E4E7EC] rounded-xl overflow-hidden font-mono text-[11px]">
              <div className="p-3 bg-red-50/50">
                <div className="font-bold text-red-800 mb-1">- Original Vulnerable Code</div>
                <pre className="whitespace-pre-wrap text-slate-700">
{`const awsKey = 'AKIA_EXPOSED_AWS_ACCESS_KEY';
const awsSecret = 'MOCK_SECRET_KEY_NOT_REAL';`}
                </pre>
              </div>
              <div className="p-3 bg-emerald-50/50">
                <div className="font-bold text-emerald-800 mb-1">+ AI Suggested Fix</div>
                <pre className="whitespace-pre-wrap text-slate-700">
{`const awsKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;
if (!awsKey || !awsSecret) {
  throw new Error('Missing AWS credentials');
}`}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Status: {diffApprovalState === "approved" ? "✅ Approved" : diffApprovalState === "rejected" ? "❌ Rejected" : "Pending Human Approval"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setDiffApprovalState("rejected")}
                  className="px-3.5 py-1.5 border border-[#E4E7EC] rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    setDiffApprovalState("approved");
                    alert("Patch approved by operator! Scheduled for isolated runner execution.");
                    setActiveDiffModal(false);
                  }}
                  className="px-3.5 py-1.5 bg-[#16803D] hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Approve Patch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
