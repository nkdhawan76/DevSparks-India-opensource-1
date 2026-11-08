"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "@/components/common/Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  mode?: "login" | "signup" | "recovery";
}

export function AuthLayout({
  children,
  mode = "login",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FC] [background-image:radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:20px_20px] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#17172A] select-none">
      {/* 1. Sleek Top Navigation Header */}
      <header className="max-w-5xl mx-auto w-full py-2 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-colors">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-sm text-[#17172A] tracking-tight">DevSparks</span>
              <span className="font-semibold text-sm text-[#5938F5]">DeployCheck</span>
            </div>
            <div className="text-[10px] text-[#667085] font-medium mt-0.5">By DevSparks India</div>
          </div>
        </Link>

        {/* Top-Right Contextual Actions (No redundant Sign In button on login page!) */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          {/* Operational Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Systems Operational</span>
          </div>

          {mode === "login" ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-[#667085] font-medium">New developer?</span>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Create Account
              </Link>
            </div>
          ) : mode === "signup" ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-[#667085] font-medium">Already have an account?</span>
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
              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              Back to Sign In
            </Link>
          )}
        </div>
      </header>

      {/* 2. Main Centered Studio Card */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12">
        <div className="w-full max-w-[460px] mx-auto">
          {children}
        </div>
      </main>

      {/* 3. Minimal Engineering Footer */}
      <footer className="max-w-5xl mx-auto w-full py-3 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#667085]">
        <div className="flex items-center gap-2">
          <span>© 2026 DevSparks India.</span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] font-mono text-slate-500">Strict Light Theme Enforced</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
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
