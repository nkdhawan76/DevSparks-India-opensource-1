"use client";

import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";
import { GitHubIcon, DeployCheckLogo } from "@/components/common/Icons";

export function FooterBrand() {
  return (
    <div className="footer-brand space-y-4">
      {/* Brand Identity */}
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5938F5] rounded-[8px]"
        aria-label="DeployCheck Home"
      >
        <DeployCheckLogo
          size={32}
          className="w-8 h-8 shrink-0 shadow-xs transition-transform duration-150 group-hover:scale-105 active:scale-95"
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <span className="font-extrabold text-sm text-[#17172A] tracking-tight leading-none group-hover:text-[#5938F5] transition-colors">
            DeployCheck
          </span>
          <span className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5">
            By DevSparks India
          </span>
        </div>
      </Link>

      {/* Brand Mission Statement */}
      <p className="text-[11.5px] text-[#667085] leading-relaxed max-w-sm">
        Open-source developer operations platform for automated security auditing, AI-assisted patch generation, guided VPS deployment, and website uptime telemetry.
      </p>

      {/* Social Links with Accessible Tooltips & Hover Transitions */}
      <div className="flex items-center gap-2 pt-1" aria-label="Social and status links">
        <a
          href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
          target="_blank"
          rel="noreferrer noopener"
          className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#17172A] hover:border-slate-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5938F5]"
          title="GitHub Repository"
          aria-label="GitHub Repository"
        >
          <GitHubIcon size={15} />
        </a>

        <a
          href="https://linkedin.com/company/devsparks-india"
          target="_blank"
          rel="noreferrer noopener"
          className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#0A66C2] hover:border-blue-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5938F5]"
          title="LinkedIn"
          aria-label="LinkedIn"
        >
          in
        </a>

        <a
          href="https://x.com/devsparksindia"
          target="_blank"
          rel="noreferrer noopener"
          className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#17172A] hover:border-slate-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5938F5]"
          title="X (Twitter)"
          aria-label="X (Twitter)"
        >
          𝕏
        </a>

        <Link
          href="/status"
          className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-emerald-600 hover:border-emerald-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5938F5]"
          title="System Status"
          aria-label="System Status"
        >
          <Activity className="h-3.5 w-3.5 text-emerald-600" />
        </Link>
      </div>
    </div>
  );
}

