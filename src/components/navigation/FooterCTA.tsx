"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/common/Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function FooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(containerRef.current, {
        y: 12,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 py-6 select-none will-change-transform">
      <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Left Copy */}
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-[#5938F5] text-[9.5px] font-bold uppercase tracking-wider mb-1.5">
            Open-Source Developer Platform
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#17172A] tracking-tight leading-snug">
            Ready to take control of your deployment workflow?
          </h3>
          <p className="text-xs text-[#667085] mt-1 leading-relaxed">
            Audit, fix and manage applications with DeployCheck by DevSparks India.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 shrink-0">
          <Button
            size="sm"
            asChild
            className="h-9 rounded-[8px] px-4 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs gap-1.5 active:scale-[0.98]"
          >
            <Link href="/signup">
              <span>Get Started Free</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-9 rounded-[8px] px-3.5 text-xs font-semibold border-[#E5E7EB] hover:bg-white text-[#17172A] gap-1.5 active:scale-[0.98]"
          >
            <a
              href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon size={14} />
              <span>Explore GitHub</span>
              <ExternalLink className="h-2.5 w-2.5 opacity-40 ml-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
