"use client";

import React, { useState, useRef } from "react";
import {
  ShieldCheck,
  Server,
  Activity,
  Rocket,
  Check,
  CheckCircle2,
  Terminal,
  Cpu,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type PreviewTab = "audit" | "ai" | "vps" | "deployment" | "monitoring";

export function HeroDashboardPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("audit");
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP Tab Switch Transition
  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 8, scale: 0.99 },
          { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" }
        );
      }
    },
    { scope: containerRef, dependencies: [activeTab] }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-white border border-[#E5E7EB] shadow-2xl shadow-purple-500/5 p-4 sm:p-5 text-left font-sans select-none ring-1 ring-slate-200/80 transition-all hover:border-slate-300"
    >
      {/* Soft Ambient Radial Glow Behind Card */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Top Window Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 pl-2 hidden sm:inline">
            app.deploycheck.devsparks.com
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-[9.5px] py-0 px-2 h-5 bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Platform Preview</span>
          </Badge>
        </div>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="relative z-10 grid grid-cols-5 gap-1 p-1 rounded-xl bg-slate-100/80 mb-3.5 text-[11px] font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("audit")}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === "audit"
              ? "bg-white text-[#5938F5] shadow-xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Audit</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ai")}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === "ai"
              ? "bg-white text-[#5938F5] shadow-xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <Terminal className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">AI Diff</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vps")}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === "vps"
              ? "bg-white text-[#3563E9] shadow-xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <Server className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">VPS</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("deployment")}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === "deployment"
              ? "bg-white text-[#5938F5] shadow-xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <Rocket className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Deploy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("monitoring")}
          className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
            activeTab === "monitoring"
              ? "bg-white text-[#16A34A] shadow-xs font-bold"
              : "text-slate-600 hover:text-[#17172A]"
          }`}
        >
          <Activity className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Uptime</span>
        </button>
      </div>

      {/* Dynamic Tab Body */}
      <div ref={contentRef} className="relative z-10 min-h-[220px]">
        {/* TAB 1: AUDIT ENGINE */}
        {activeTab === "audit" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Check className="h-4.5 w-4.5 stroke-[3]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#17172A]">Production Readiness Score</div>
                  <div className="text-[10.5px] text-slate-500 font-medium">
                    240 files scanned • 0 vulnerabilities found
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-[#5938F5] leading-none">100 / 100</div>
                <span className="text-[9.5px] font-bold text-emerald-600 uppercase tracking-wider">
                  Passed
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Critical</div>
                <div className="font-extrabold text-[#17172A] text-sm mt-0.5">0</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">High</div>
                <div className="font-extrabold text-[#17172A] text-sm mt-0.5">0</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Advisories</div>
                <div className="font-extrabold text-[#5938F5] text-sm mt-0.5">0 Pending</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Next.js 15.5.29, Zod 4.6.7, Minimatch 11.0.5</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                OWASP Clean
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: AI DIFF ASSISTANT (BYOK) */}
        {activeTab === "ai" && (
          <div className="space-y-3 font-mono text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-1.5 overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800">
                <span>src/modules/auth/service.ts (Diff Proposal)</span>
                <span className="text-[#5938F5] bg-purple-950/80 px-2 py-0.5 rounded text-[9px] font-sans font-bold">
                  BYOK Review
                </span>
              </div>
              <div className="text-rose-400 bg-rose-950/30 px-2 py-1 rounded">
                - const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;$/;
              </div>
              <div className="text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded">
                + export function isValidEmail(email: string): boolean &#123; /* linear O(n) tokenization */ &#125;
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs font-sans">
              <span className="text-slate-700 text-[11px] font-medium flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#5938F5]" />
                <span>Human Approval Required</span>
              </span>
              <button
                type="button"
                className="px-2.5 py-1 rounded-md bg-[#5938F5] hover:bg-[#4726DB] text-white text-[10.5px] font-bold shadow-2xs"
              >
                Approve Patch
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: VPS MANAGEMENT */}
        {activeTab === "vps" && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5 text-slate-600" />
                  <span className="font-bold text-[#17172A]">vps-mumbai-core-01</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                  SSH Connected
                </span>
              </div>

              {/* Progress Gauges */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[10.5px] text-slate-500">
                  <span>CPU (4 vCPU)</span>
                  <span className="font-semibold text-slate-800">24%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#5938F5] rounded-full" style={{ width: "24%" }} />
                </div>

                <div className="flex justify-between text-[10.5px] text-slate-500 pt-1">
                  <span>Memory (8 GB)</span>
                  <span className="font-semibold text-slate-800">42%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3988F7] rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
              <span className="font-mono text-[10px] text-slate-500">
                Fingerprint: SHA256:7xK3...9LmZ
              </span>
              <span className="text-emerald-600 font-semibold">Policy Gated</span>
            </div>
          </div>
        )}

        {/* TAB 4: GUIDED DEPLOYMENT */}
        {activeTab === "deployment" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#17172A]">Deployment Pipeline #42</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Active Release
                </span>
              </div>

              {/* Stepper */}
              <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  1. Preflight ✓
                </div>
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  2. Build ✓
                </div>
                <div className="p-1.5 rounded-lg bg-purple-50 text-[#5938F5] font-bold border border-purple-200 animate-pulse">
                  3. Health...
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 font-medium border border-slate-100">
                  4. Live
                </div>
              </div>

              <div className="text-[10.5px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                <span>Target: nodejs-prod-cluster</span>
                <span className="font-mono text-[#5938F5]">Atomic Rollback Armed</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WEBSITE MONITORING */}
        {activeTab === "monitoring" && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold text-[#17172A]">https://deploycheck.devsparks.com</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  HTTP 200 OK
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-[10px] text-slate-400">Response</div>
                  <div className="font-extrabold text-[#17172A] mt-0.5">42 ms</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-[10px] text-slate-400">30d Uptime</div>
                  <div className="font-extrabold text-emerald-600 mt-0.5">99.99%</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <div className="text-[10px] text-slate-400">TLS Cert</div>
                  <div className="font-extrabold text-[#5938F5] mt-0.5">Valid (89d)</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-[10.5px] text-slate-500">
              <span>Edge Probes: Mumbai, Frankfurt, Virginia</span>
              <span className="text-slate-800 font-semibold">Zero Incidents</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Micro Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5938F5]" />
          <span>Policy-Controlled Execution Engine</span>
        </span>
        <span className="text-[#5938F5] font-semibold flex items-center gap-1 hover:underline cursor-pointer">
          <span>Explore Architecture</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}
