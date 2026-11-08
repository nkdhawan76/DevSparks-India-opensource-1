"use client";

import React, { useState } from "react";
import { ShieldCheck, Server, Activity, Rocket, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroDashboardPreview() {
  const [activeTab, setActiveTab] = useState<"audit" | "vps" | "monitoring">("audit");

  return (
    <div className="w-full rounded-2xl bg-white border border-[#E5E7EB] shadow-xl shadow-slate-200/50 p-4 sm:p-5 text-left font-sans select-none ring-1 ring-slate-200/60">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 pl-2">
            app.deploycheck.devsparks.com
          </span>
        </div>

        <Badge variant="outline" className="text-[9px] py-0 px-2 h-4 bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Simulated Product Preview</span>
        </Badge>
      </div>

      {/* Mini Segment Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100/80 mb-3 text-[11px] font-semibold">
        <button
          onClick={() => setActiveTab("audit")}
          className={`flex-1 py-1 px-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "audit"
              ? "bg-white text-[#5938F5] shadow-2xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[#5938F5]" />
          <span>Audit Engine</span>
        </button>

        <button
          onClick={() => setActiveTab("vps")}
          className={`flex-1 py-1 px-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "vps"
              ? "bg-white text-[#3563E9] shadow-2xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <Server className="h-3.5 w-3.5 text-[#3563E9]" />
          <span>VPS Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab("monitoring")}
          className={`flex-1 py-1 px-2.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "monitoring"
              ? "bg-white text-[#16A34A] shadow-2xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <Activity className="h-3.5 w-3.5 text-[#16A34A]" />
          <span>Live Uptime</span>
        </button>
      </div>

      {/* Dynamic Tab Body */}
      {activeTab === "audit" && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#5938F5] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#17172A]">Production Readiness Score</div>
                <div className="text-[10.5px] text-slate-500">Static scan completed: 158 files checked</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold text-[#5938F5]">100 / 100</div>
              <span className="text-[9px] font-bold text-emerald-600 uppercase">Passed</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[10px] text-slate-400">Critical</div>
              <div className="font-extrabold text-[#17172A] mt-0.5">0</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[10px] text-slate-400">High</div>
              <div className="font-extrabold text-[#17172A] mt-0.5">0</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[10px] text-slate-400">Advisories</div>
              <div className="font-extrabold text-[#5938F5] mt-0.5">3 Fixed</div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
            <span>BYOK Provider: OpenRouter (DeepSeek V3)</span>
            <span className="text-[#5938F5] font-semibold flex items-center gap-0.5 cursor-pointer">
              <span>View Diff</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </div>
        </div>
      )}

      {activeTab === "vps" && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3563E9] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                <Rocket className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#17172A]">Mumbai Core VPS-01</div>
                <div className="text-[10.5px] text-slate-500">Ubuntu 22.04 LTS • Docker 24.0</div>
              </div>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9.5px]">Connected</Badge>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-[10.5px]">
              <span className="text-slate-500">CPU Load:</span>
              <span className="font-mono text-[#17172A] font-semibold">18% (4 Cores)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#3563E9] h-full rounded-full" style={{ width: "18%" }} />
            </div>
            <div className="flex justify-between text-[10.5px]">
              <span className="text-slate-500">Memory Utilization:</span>
              <span className="font-mono text-[#17172A] font-semibold">2.4 GB / 8.0 GB</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "monitoring" && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#16A34A] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#17172A]">Synthetic Probes</div>
                <div className="text-[10.5px] text-slate-500">Checking every 60s across HTTPS & DNS</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">99.98%</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[10px] text-slate-400">Average Latency</div>
              <div className="font-mono font-bold text-[#17172A] mt-0.5">34 ms</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[10px] text-slate-400">SSL Certificate</div>
              <div className="font-mono font-bold text-emerald-600 mt-0.5">Valid (82 Days)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
