"use client";

import React, { useState } from "react";
import { KpiCard } from "../common/KpiCard";
import { FileText, TrendingUp, Bot, CheckCircle2, Zap, AlertTriangle } from "../common/Icons";

export function LogsSeoView() {
  const [activeSubTab, setActiveSubTab] = useState<"logs" | "seo">("logs");
  const [levelFilter, setLevelFilter] = useState<"ALL" | "INFO" | "WARN" | "ERROR">("ALL");
  const [logSearch, setLogSearch] = useState("");

  const systemLogs = [
    { id: "log-1", time: "18:42:01", level: "INFO", context: "AuditEngine", msg: "Initiating pre-deployment static scan on workspace ws_alpha" },
    { id: "log-2", time: "18:42:04", level: "INFO", context: "SecretScanner", msg: "Evaluated 93 files against sensitive pattern registry [REDACTED_SECRET]" },
    { id: "log-3", time: "18:42:08", level: "WARN", context: "DockerChecker", msg: "Base image node:latest has no immutable SHA-256 digest" },
    { id: "log-4", time: "18:42:15", level: "INFO", context: "PolicyGateway", msg: "Authorized restricted diagnostic command: df -h / from devops_lead" },
    { id: "log-5", time: "18:42:22", level: "INFO", context: "OpenRouterAdapter", msg: "Token stream connected. Bearer [REDACTED_SECRET] authenticated" },
  ];

  const filteredLogs = systemLogs.filter((l) => {
    if (levelFilter !== "ALL" && l.level !== levelFilter) return false;
    if (logSearch && !l.msg.toLowerCase().includes(logSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
              Observability & Analytics
            </span>
            <span className="text-xs text-[#667085]">Live Secret Redaction Active</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Structured Logs & SEO Crawler Analytics
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Real-time deployment and operational telemetry alongside search engine crawler distributions.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-2 bg-[#F7F8FC] p-1.5 rounded-xl border border-[#E5E7EB]">
          <button
            onClick={() => setActiveSubTab("logs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "logs" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5"><FileText size={14} /> System Logs</span>
          </button>
          <button
            onClick={() => setActiveSubTab("seo")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === "seo" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5"><TrendingUp size={14} /> SEO & Crawlers</span>
          </button>
        </div>
      </div>

      {activeSubTab === "logs" ? (
        <div className="space-y-4">
          {/* Log Controls */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {(["ALL", "INFO", "WARN", "ERROR"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    levelFilter === lvl
                      ? "bg-[#5938F5] text-white shadow-sm"
                      : "text-[#667085] hover:bg-slate-50"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
              placeholder="Search log message..."
              className="bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-1.5 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
            />
          </div>

          {/* Log Terminal Viewer */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 shadow-xl max-h-[500px] overflow-y-auto space-y-2">
            <div className="text-slate-500 text-[10px] pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>DeployCheck Structured JSON Log Stream</span>
              <span>Filter: {levelFilter}</span>
            </div>
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-1 hover:bg-slate-900/60 rounded px-1.5 transition-colors">
                <span className="text-slate-500 shrink-0">{log.time}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    log.level === "ERROR"
                      ? "bg-rose-950 text-rose-300"
                      : log.level === "WARN"
                      ? "bg-amber-950 text-amber-300"
                      : "bg-blue-950 text-blue-300"
                  }`}
                >
                  {log.level}
                </span>
                <span className="text-purple-400 font-semibold shrink-0">[{log.context}]</span>
                <span className="text-slate-200">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* SEO KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="24h Bot Crawls" value="4,820" subtitle="Googlebot & Bingbot" trend={{ value: "+14%", isPositive: true }} icon={<Bot size={16} className="text-[#5938F5]" />} />
            <KpiCard title="200 OK Rate" value="98.4%" subtitle="Optimal crawl efficiency" icon={<CheckCircle2 size={16} className="text-[#16A34A]" />} badge="Healthy" />
            <KpiCard title="Avg Server Response" value="112ms" subtitle="Fast TTFB for bots" icon={<Zap size={16} className="text-[#F59E0B]" />} />
            <KpiCard title="4xx Errors Detected" value="6" subtitle="Missing asset requests" icon={<AlertTriangle size={16} className="text-[#DC2626]" />} />
          </div>

          {/* Crawler Distribution & Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#17172A] mb-4">Search Engine Crawler Share</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Googlebot (Mobile + Desktop)</span>
                    <span className="text-[#5938F5]">64% (3,084 requests)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#5938F5] h-full rounded-full" style={{ width: "64%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Bingbot</span>
                    <span className="text-[#3988F7]">22% (1,060 requests)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3988F7] h-full rounded-full" style={{ width: "22%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Other Verified Crawlers (Yandex, DuckDuckGo)</span>
                    <span className="text-[#16A34A]">14% (676 requests)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full rounded-full" style={{ width: "14%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#17172A] mb-4">HTTP Status Code Distribution</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                    <span className="font-bold text-[#17172A]">200 OK</span>
                  </div>
                  <span className="font-bold text-[#16A34A]">4,742 (98.4%)</span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                    <span className="font-bold text-[#17172A]">301 Permanent Redirect</span>
                  </div>
                  <span className="font-bold text-[#2563EB]">68 (1.4%)</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="font-bold text-[#17172A]">404 Not Found</span>
                  </div>
                  <span className="font-bold text-[#D97706]">10 (0.2%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
