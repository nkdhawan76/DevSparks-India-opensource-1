"use client";

import React from "react";
import Link from "next/link";
import { getCurrentYear } from "@/lib/formatters.js";
import { MarketSelector } from "@/components/marketing/MarketSelector";

export function FooterBottomBar() {
  const currentYear = getCurrentYear();

  return (
    <div className="footer-bottom border-t border-[#E5E7EB] bg-white py-3.5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#667085]">
        {/* Copyright */}
        <div className="text-[11px] flex items-center gap-1.5 font-normal">
          <span>© {currentYear} DevSparks India. All rights reserved.</span>
        </div>

        {/* Legal Links & Market Selector */}
        <div className="flex items-center gap-3 text-[11px]">
          <Link
            href="/privacy"
            className="hover:text-[#17172A] transition-colors focus:outline-none focus-visible:underline rounded-[3px]"
          >
            Privacy
          </Link>
          <span className="text-slate-300 select-none">•</span>
          <Link
            href="/terms"
            className="hover:text-[#17172A] transition-colors focus:outline-none focus-visible:underline rounded-[3px]"
          >
            Terms
          </Link>
          <span className="text-slate-300 select-none">•</span>
          <Link
            href="/security"
            className="hover:text-[#17172A] transition-colors focus:outline-none focus-visible:underline rounded-[3px]"
          >
            Security
          </Link>
          <span className="text-slate-300 select-none">•</span>
          <MarketSelector variant="footer" />
        </div>
      </div>
    </div>
  );
}
