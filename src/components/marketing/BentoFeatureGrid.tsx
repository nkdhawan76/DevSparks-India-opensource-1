"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Server,
  Rocket,
  Activity,
  Box,
  Globe,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoFeatureGrid() {
  return (
    <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5938F5] text-[11px] font-bold uppercase tracking-wider mb-3">
          <Zap className="h-3 w-3 fill-[#5938F5]" />
          <span>Platform Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172A] tracking-tight leading-tight">
          Engineered for Full Stack Confidence
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#667085] leading-relaxed">
          Each capability is purposefully built as an isolated, policy-controlled module. No generic wrappers or artificial dependencies.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
        {/* CARD 1: Pre-deployment Audit Engine (Span 7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-bold">
                Live Engine
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors">
              Pre-deployment Static Audit Engine
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              Scan application code, dependencies, and container definitions before release. Detect exposed API keys, private SSH tokens, unpinned packages, and configuration vulnerabilities.
            </p>

            {/* Embedded Micro UI Visual */}
            <div className="mt-5 p-4 rounded-xl bg-[#F7F8FC] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#17172A]">Static Security Score</span>
                <span className="font-extrabold text-[#5938F5]">100 / 100 Passed</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-white border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">Dependencies</span>
                  <span className="text-xs font-bold text-emerald-600">0 High CVEs</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">Secrets Scan</span>
                  <span className="text-xs font-bold text-emerald-600">0 Exposed</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">Dockerfiles</span>
                  <span className="text-xs font-bold text-emerald-600">Non-Root OK</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#5938F5] group-hover:text-[#4726DB]">
            <Link
              href="/features/pre-deployment-audit"
              className="inline-flex items-center gap-1.5"
            >
              <span>Explore Audit Engine</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARD 2: Bring Your Own Key AI Assistant (Span 5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="text-[10px] font-bold">
                BYOK AI
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors">
              Approval-Gated AI Assistant
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              Diagnose errors and review patch diffs using your own OpenRouter key. Zero unrestricted shell access; changes execute only after human sign-off.
            </p>

            {/* Embedded Code Diff Visual */}
            <div className="mt-5 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[10.5px] space-y-1.5 border border-slate-800">
              <div className="text-[9.5px] text-slate-400 pb-1 border-b border-slate-800 flex justify-between">
                <span>Code Patch Diff</span>
                <span className="text-[#5938F5] font-bold">Claude 3.5 / DeepSeek</span>
              </div>
              <div className="text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded">
                - eval(untrustedInput);
              </div>
              <div className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                + JSON.parse(sanitizedInput);
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#5938F5] group-hover:text-[#4726DB]">
            <Link
              href="/features/ai-assistant"
              className="inline-flex items-center gap-1.5"
            >
              <span>Explore AI Review</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARD 3: Sovereign VPS Server Manager (Span 5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-blue-300 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Server className="h-5 w-5" />
              </div>
              <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-[10px] font-bold">
                SSH Sovereign
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-[#17172A] group-hover:text-[#3563E9] transition-colors">
              Sovereign VPS Management
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              Connect Linux instances over SSH with host key verification. Monitor CPU, RAM, disk health, and run safe diagnostic scripts without third-party agents.
            </p>

            {/* Embedded Live Gauge Visual */}
            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10.5px] text-slate-700 font-bold">
                  ubuntu@vps-prod-01
                </span>
                <span className="text-[9.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  24% CPU • 42% RAM
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#3563E9] rounded-full" style={{ width: "38%" }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#3563E9]">
            <Link
              href="/features/vps-management"
              className="inline-flex items-center gap-1.5"
            >
              <span>Explore VPS Fleet</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARD 4: Guided Zero-Downtime Deployment (Span 7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Rocket className="h-5 w-5" />
              </div>
              <Badge className="bg-purple-50 text-[#5938F5] border-purple-200 text-[10px] font-bold">
                Zero Downtime
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors">
              Guided Release Pipelines & Rollbacks
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              Release Node.js, Next.js, and static applications with deterministic preflight checks, automated builds, health verification probes, and instant rollbacks.
            </p>

            {/* Embedded Stepper Pipeline Visual */}
            <div className="mt-5 p-4 rounded-xl bg-[#F7F8FC] border border-[#E5E7EB]">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  Preflight ✓
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  Build ✓
                </div>
                <div className="p-2 rounded-lg bg-purple-50 text-[#5938F5] font-bold border border-purple-200">
                  Verify ✓
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  Live Active
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#5938F5]">
            <Link
              href="/features/guided-deployment"
              className="inline-flex items-center gap-1.5"
            >
              <span>Explore Deployment Engine</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARD 5: Synthetic Uptime & SSL Telemetry (Span 6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-emerald-300 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Activity className="h-5 w-5" />
              </div>
              <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-bold">
                Live Synthetic Probes
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-[#17172A] group-hover:text-[#16A34A] transition-colors">
              Website Monitoring & Alerting
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              Continuous HTTP latency checks, TLS certificate expiry warnings, and webhook notifications for Discord, Slack, and email before users notice an outage.
            </p>

            {/* Embedded Telemetry Card Visual */}
            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-800">42ms Global Latency</span>
              </div>
              <span className="font-mono text-[10.5px] text-[#16A34A] font-bold">
                99.99% Uptime (30d)
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#16A34A]">
            <Link
              href="/features/website-monitoring"
              className="inline-flex items-center gap-1.5"
            >
              <span>Explore Monitoring Probes</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARD 6: Container Scanning & Multi-Region Probes (Span 6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Box className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="text-slate-500 border-slate-200 text-[10px] font-bold">
                Roadmap Milestones 7 & 8
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors">
              Container Security & Edge Probes
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              Planned container base image vulnerability scanners and multi-region synthetic uptime telemetry across US East, Europe, and Asia edge clusters.
            </p>

            {/* Embedded Multi-Region Visual */}
            <div className="mt-5 p-3.5 rounded-xl bg-[#F7F8FC] border border-[#E5E7EB] flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#5938F5]" />
                <span>Multi-Region Edge Topology</span>
              </div>
              <span className="text-[10px] font-bold text-[#5938F5] uppercase">Planned</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#5938F5]">
            <Link href="/roadmap" className="inline-flex items-center gap-1.5">
              <span>View Product Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
