"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/common/Icons";

export function FooterCTA() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 select-none">
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] border border-slate-200/90 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Left Copy */}
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-[#5938F5] text-[10px] font-bold uppercase tracking-wider mb-2">
            Open-Source Developer Platform
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#17172A] tracking-tight leading-snug">
            Ready to take control of your deployment workflow?
          </h3>
          <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
            Audit, fix and manage applications with DeployCheck by DevSparks India.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Button
            size="default"
            asChild
            className="h-10 rounded-[8px] px-5 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-md shadow-[#5938F5]/20 gap-2 active:scale-[0.98]"
          >
            <Link href="/signup">
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="default"
            asChild
            className="h-10 rounded-[8px] px-4 text-xs font-semibold border-[#E5E7EB] hover:bg-white text-[#17172A] gap-2 active:scale-[0.98]"
          >
            <a
              href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon size={16} />
              <span>Explore GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-40 ml-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
