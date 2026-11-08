"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "@/components/common/Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#17172A] select-none">
      {/* Top Brand Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-colors">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1 leading-none">
              <span className="font-extrabold text-sm text-[#17172A] tracking-tight">DevSparks</span>
              <span className="font-semibold text-sm text-[#5938F5]">DeployCheck</span>
            </div>
            <div className="text-[10px] text-[#667085] font-medium mt-0.5">By DevSparks India</div>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#667085]">
          <Link href="/login" className="hover:text-[#17172A] transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-3 py-1.5 rounded-lg bg-[#5938F5] text-white hover:bg-[#4726DB] transition-colors shadow-xs"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="flex-1 flex items-center justify-center py-6 sm:py-10">
        <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-[#5938F5] flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <Zap size={24} className="fill-[#5938F5]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17172A]">{title}</h1>
            <p className="text-xs text-[#667085] mt-1">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="max-w-5xl mx-auto w-full py-4 border-t border-[#E5E7EB]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#667085]">
        <div>© 2026 DevSparks India. Strict Light Theme Developer Platform.</div>
        <div className="flex items-center gap-4">
          <span className="hover:underline cursor-pointer">Security Policy</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Status (Operational)</span>
        </div>
      </footer>
    </div>
  );
}

