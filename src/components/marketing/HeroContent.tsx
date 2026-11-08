"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/common/Icons";
import { HeroDashboardPreview } from "@/components/marketing/HeroDashboardPreview";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-badge", {
        y: -12,
        opacity: 0,
        duration: 0.4,
      })
        .from(
          ".hero-heading",
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
          },
          "-=0.2"
        )
        .from(
          ".hero-desc",
          {
            y: 12,
            opacity: 0,
            duration: 0.45,
          },
          "-=0.3"
        )
        .from(
          ".hero-cta",
          {
            y: 10,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
          },
          "-=0.25"
        )
        .from(
          ".hero-features",
          {
            opacity: 0,
            y: 8,
            duration: 0.35,
          },
          "-=0.2"
        )
        .from(
          ".hero-preview",
          {
            x: 20,
            opacity: 0,
            duration: 0.65,
            scale: 0.98,
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      {/* Left Column: Headline & Value Proposition */}
      <div className="lg:col-span-7 text-center lg:text-left space-y-5">
        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-[#5938F5] text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5938F5] animate-pulse" />
          <span>Open Source · Self-Hosted · Cloud SaaS</span>
        </div>

        <h1 className="hero-heading text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#17172A] leading-[1.12]">
          Audit, Fix, Deploy and <span className="text-[#5938F5]">Monitor</span> Your Applications
        </h1>

        <p className="hero-desc text-sm sm:text-base text-[#667085] leading-relaxed max-w-xl mx-auto lg:mx-0">
          Open-source developer operations platform for automated pre-deployment audits, AI-assisted code patch reviews, guided Linux VPS deployments, and production uptime monitoring.
        </p>

        {/* CTAs */}
        <div className="hero-cta pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
          <Button
            size="lg"
            asChild
            className="h-11 rounded-[8px] px-6 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs gap-2 active:scale-[0.98] transition-all group"
          >
            <Link href="/signup" className="inline-flex items-center justify-center gap-2">
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="h-11 rounded-[8px] px-5 text-xs font-semibold border-[#E5E7EB] hover:bg-slate-50 text-[#17172A] gap-2 active:scale-[0.98] transition-all shadow-2xs"
          >
            <a
              href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2"
            >
              <GitHubIcon size={15} className="text-[#17172A]" />
              <span>Star on GitHub</span>
            </a>
          </Button>
        </div>

        {/* 4 Feature Bullet Points */}
        <div className="hero-features pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-700 font-medium">
          {[
            "Pre-deployment audit",
            "AI-powered assistance",
            "Secure deployment",
            "Uptime monitoring",
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-1.5 justify-center lg:justify-start">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#5938F5] shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Interactive Product Preview */}
      <div className="hero-preview lg:col-span-5 w-full">
        <HeroDashboardPreview />
      </div>
    </div>
  );
}
