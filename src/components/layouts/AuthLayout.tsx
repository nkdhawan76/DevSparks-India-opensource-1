"use client";

import React from "react";
import Link from "next/link";
import { Zap, Check } from "@/components/common/Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  mode?: "login" | "signup" | "recovery";
}

export function AuthLayout({
  children,
  mode: _mode = "login",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#17172A] select-none">
      {/* Top minimal status bar (optional helper) */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs py-2">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-[#4726DB] transition-colors">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-extrabold text-sm text-[#17172A] tracking-tight">DeployCheck</span>
        </Link>

        <div className="flex items-center gap-3 text-xs text-[#667085]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Systems Operational</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] font-mono text-slate-500">v0.1.0</span>
        </div>
      </div>

      {/* Main Split-Card Studio Container (Matches Figma Mockup) */}
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6">
        <div className="w-full max-w-5xl mx-auto bg-white border border-[#E5E7EB] rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
          {/* Left Panel: Feature Showcase & Illustration */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E7EB] relative overflow-hidden">
            {/* Soft decorative curves */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

            {/* Top Showcase Header */}
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold text-[#17172A] tracking-tight leading-tight">
                Audit, Fix,<br />
                Deploy and<br />
                <span className="text-[#5938F5]">Monitor</span>
              </h2>
              <p className="text-xs text-[#667085] mt-3 leading-relaxed">
                Pre-deployment audit, AI assistance, VPS deployment and website monitoring in one platform.
              </p>

              {/* Floating 3D-styled UI Window Illustration */}
              <div className="mt-8 p-4 bg-white/90 backdrop-blur-xs border border-purple-100 rounded-2xl shadow-lg shadow-purple-500/5 relative">
                {/* Window header dots */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1 opacity-40">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                </div>

                {/* Window Body Mockup */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                    <Check size={22} className="stroke-[3]" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 w-3/4 bg-[#5938F5]/20 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                    <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
                  </div>
                </div>

                {/* Mini telemetry bars */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between gap-1.5 h-9 px-2">
                  <div className="w-3 bg-purple-200 rounded-t h-4" />
                  <div className="w-3 bg-purple-300 rounded-t h-6" />
                  <div className="w-3 bg-[#5938F5] rounded-t h-8" />
                  <div className="w-3 bg-blue-300 rounded-t h-5" />
                  <div className="w-3 bg-blue-400 rounded-t h-7" />
                  <div className="w-3 bg-emerald-400 rounded-t h-9" />
                </div>
              </div>
            </div>

            {/* Bottom 4 Feature Bullet Points */}
            <div className="mt-8 space-y-3 relative z-10">
              {[
                "Code & security audit",
                "AI coding assistance",
                "One-click deployment",
                "Website monitoring",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-xs font-semibold text-[#17172A]">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-[#5938F5] flex items-center justify-center shrink-0">
                    <Check size={12} className="stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: The Authentication Form */}
          <div className="md:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-center">
            {/* Brand Header Inside Right Pane */}
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center gap-3 group mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-md shadow-[#5938F5]/20 group-hover:bg-[#4726DB] transition-colors shrink-0">
                  <Zap size={22} className="text-white fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-extrabold text-base text-[#17172A] tracking-tight">DevSparks</span>
                    <span className="font-semibold text-base text-[#5938F5]">DeployCheck</span>
                  </div>
                  <div className="text-[11px] text-[#667085] font-medium mt-1">By DevSparks India</div>
                </div>
              </Link>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </main>

      {/* Footer Below Card */}
      <footer className="max-w-5xl mx-auto w-full py-3 border-t border-[#E5E7EB]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#667085]">
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
            Status (Operational)
          </span>
        </div>
      </footer>
    </div>
  );
}
