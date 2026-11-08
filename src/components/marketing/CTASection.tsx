import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/common/Icons";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function CTASection({
  title = "Ready to take control of your deployment workflow?",
  description = "Audit your code, review patches with BYOK AI, deploy to your own servers, and monitor production uptime with zero lock-in.",
  primaryCtaText = "Get Started Free",
  primaryCtaHref = "/signup",
  secondaryCtaText = "Explore GitHub",
  secondaryCtaHref = "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
}: CTASectionProps) {
  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] border border-slate-200/90 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ring-1 ring-slate-200/60">
        {/* Soft Ambient Blur Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Text Area */}
        <div className="relative z-10 max-w-xl text-center md:text-left space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[#5938F5] text-[10px] font-bold uppercase tracking-wider">
            Open Source Developer Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight leading-snug">
            {title}
          </h2>
          <p className="text-sm text-[#667085] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Button
            size="lg"
            asChild
            className="h-11 rounded-[8px] px-6 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs gap-2 active:scale-[0.98] transition-all group"
          >
            <Link href={primaryCtaHref} className="inline-flex items-center justify-center gap-2">
              <span>{primaryCtaText}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="h-11 rounded-[8px] px-5 text-xs font-semibold border-[#E5E7EB] hover:bg-white text-[#17172A] gap-2 active:scale-[0.98] transition-all shadow-2xs"
          >
            <a
              href={secondaryCtaHref}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon size={15} className="text-[#17172A]" />
              <span>{secondaryCtaText}</span>
              <ExternalLink className="h-3 w-3 opacity-40" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

