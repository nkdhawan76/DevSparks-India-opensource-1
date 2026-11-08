"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Server,
  Rocket,
  Check,
  Cpu,
  Lock,
} from "@/components/common/Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  mode?: "login" | "signup" | "recovery";
}

export function AuthLayout({
  children,
  title,
  subtitle,
  badge = "Production Gateway",
  mode = "login",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#17172A] select-none">
      {/* 1. Top Brand Header */}
      <header className="max-w-6xl mx-auto w-full py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-colors">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-[15px] text-[#17172A] tracking-tight">DevSparks</span>
              <span className="font-semibold text-[15px] text-[#5938F5]">DeployCheck</span>
            </div>
            <div className="text-[11px] text-[#667085] font-medium mt-1">By DevSparks India</div>
          </div>
        </Link>

        {/* Top-Right Contextual Actions */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          {/* Operational Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Systems Operational</span>
          </div>

          {/* Contextual navigation based on current screen */}
          {mode === "login" ? (
            <div className="flex items-center gap-2 text-[#667085]">
              <span className="hidden md:inline text-xs font-medium">Don&apos;t have an account?</span>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-slate-300 text-[#17172A] text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Create Account
              </Link>
            </div>
          ) : mode === "signup" ? (
            <div className="flex items-center gap-2 text-[#667085]">
              <span className="hidden md:inline text-xs font-medium">Already have an account?</span>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-slate-300 text-[#17172A] text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              Back to Sign In
            </Link>
          )}
        </div>
      </header>

      {/* 2. Main Authentication & Showcase Grid */}
      <main className="flex-1 flex items-center justify-center py-6 sm:py-8">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: The Authentication Console */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-2xs">
              {/* Form Title & Subtitle */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-[#5938F5] border border-purple-100">
                    <Lock size={11} />
                    <span>{badge}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Strict Light Theme</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">{title}</h1>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">{subtitle}</p>
              </div>

              {/* Form Body */}
              {children}
            </div>
          </div>

          {/* Right Column: Platform Showcase & Telemetry Panel (Desktop) */}
          <div className="lg:col-span-6 xl:col-span-6 hidden lg:flex flex-col justify-between bg-white border border-[#E5E7EB] rounded-2xl p-7 shadow-2xs relative overflow-hidden">
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F9] mb-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#5938F5]" />
                  <span className="text-xs font-bold text-[#17172A] uppercase tracking-wider">
                    DeployCheck Control Plane
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-50 border border-[#E5E7EB] text-slate-600">
                  v0.1.0-dev
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-[#17172A]">
                  Verify before code reaches production.
                </h2>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                  Automated pre-flight security scans, policy-controlled VPS deployments, and deterministic healthcheck rollbacks.
                </p>
              </div>

              {/* Telemetry Feature Previews */}
              <div className="space-y-3.5">
                {/* Telemetry Item 1: Audit Gate */}
                <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-slate-50/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#16A34A]">
                        <Check size={13} />
                      </div>
                      <span className="text-xs font-bold text-[#17172A]">Pre-Deployment Audit Gate</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-[#16A34A] border border-emerald-100">
                      15/15 Passed
                    </span>
                  </div>
                  <p className="text-[11px] text-[#667085] pl-8">
                    Static inspection of dependencies, secrets, Dockerfiles, and environment templates.
                  </p>
                </div>

                {/* Telemetry Item 2: Host Node Runner */}
                <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-slate-50/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
                        <Server size={13} />
                      </div>
                      <span className="text-xs font-bold text-[#17172A]">Host VPS Runner Isolation</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-[#5938F5] border border-purple-100">
                      Policy Enforced
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-[#667085] pl-8">
                    <span className="flex items-center gap-1">
                      <Cpu size={12} className="text-slate-400" />
                      <span>CPU: <strong>18.5%</strong></span>
                    </span>
                    <span>•</span>
                    <span>Target: <strong>VPS-01 (Mumbai)</strong></span>
                  </div>
                </div>

                {/* Telemetry Item 3: Release Assurance */}
                <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-slate-50/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-200 flex items-center justify-center text-[#5938F5]">
                        <Rocket size={13} />
                      </div>
                      <span className="text-xs font-bold text-[#17172A]">Immutable Release History</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100">
                      Zero Rollbacks
                    </span>
                  </div>
                  <p className="text-[11px] text-[#667085] pl-8">
                    Atomic container updates with automatic fallback if synthetic probes fail.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Quote & Attribution */}
            <div className="pt-5 mt-6 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
              <span className="italic">&ldquo;Engineered for zero-failure production deployments.&rdquo;</span>
              <span className="font-semibold text-[#17172A]">DevSparks India</span>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Minimal Engineering Footer */}
      <footer className="max-w-6xl mx-auto w-full py-3 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#667085]">
        <div>© 2026 DevSparks India. Strict Light Theme Developer Platform.</div>
        <div className="flex items-center gap-4">
          <Link href="/documentation" className="hover:text-[#17172A] transition-colors">
            Documentation
          </Link>
          <span>•</span>
          <span className="hover:text-[#17172A] cursor-pointer transition-colors">
            Security Policy
          </span>
          <span>•</span>
          <span className="hover:text-[#17172A] cursor-pointer transition-colors">
            API Status (Operational)
          </span>
        </div>
      </footer>
    </div>
  );
}
