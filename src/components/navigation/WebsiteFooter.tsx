"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Zap, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/common/Icons";
import { FooterBrand } from "@/components/navigation/footer/FooterBrand";
import { FooterNavColumns } from "@/components/navigation/footer/FooterNavColumns";
import { FooterNewsletter } from "@/components/navigation/footer/FooterNewsletter";
import { FooterBottomBar } from "@/components/navigation/footer/FooterBottomBar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WebsiteFooterProps {
  showCta?: boolean;
}

export function WebsiteFooter({ showCta = true }: WebsiteFooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  // GSAP Coordinated ScrollTrigger Entrance
  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      // 1. ScrollTrigger line reveal: Expand top border from center
      tl.fromTo(
        ".footer-line-reveal",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // 2. Pre-Footer CTA entrance (if shown)
      if (showCta) {
        tl.from(
          ".footer-cta-card",
          {
            y: 18,
            opacity: 0,
            scale: 0.99,
            duration: 0.45,
          },
          "-=0.3"
        );
      }

      // 3. Brand presentation fade-in
      tl.from(
        ".footer-brand",
        {
          y: 14,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.2"
      );

      // 4. Staggered 5 navigation columns reveal
      tl.from(
        ".footer-nav-col",
        {
          y: 12,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
        },
        "-=0.25"
      );

      // 5. Developer changelog & newsletter strip
      tl.from(
        ".footer-newsletter",
        {
          y: 10,
          opacity: 0,
          duration: 0.35,
        },
        "-=0.15"
      );

      // 6. Sub-bar copyright & legal links
      tl.from(
        ".footer-bottom",
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.15"
      );
    },
    { scope: footerRef, dependencies: [showCta] }
  );

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      aria-label="Platform Footer"
      className="w-full bg-[#F7F8FC] font-sans select-none overflow-hidden will-change-transform"
    >
      {/* ScrollTrigger Animated Line Reveal */}
      <div className="footer-line-reveal h-[1px] w-full bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent origin-center" />

      {/* Optional Pre-Footer CTA Studio Card */}
      {showCta && (
        <div className="footer-cta-card max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 ring-1 ring-slate-200/60">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

            {/* Left Content */}
            <div className="relative z-10 max-w-xl text-center md:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-[#5938F5] text-[9.5px] font-bold uppercase tracking-wider">
                <Zap className="h-3 w-3 fill-[#5938F5]" />
                <span>Open-Source Developer Platform</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#17172A] tracking-tight leading-snug">
                Ready to take control of your deployment workflow?
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Audit your code, fix security issues with AI, and manage production deployments with DeployCheck.
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <Button
                size="sm"
                asChild
                className="h-9.5 rounded-[8px] px-4.5 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] active:scale-[0.98] text-white shadow-xs gap-1.5 transition-all group"
              >
                <Link href="/signup">
                  <span>Get Started Free</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9.5 rounded-[8px] px-4 text-xs font-semibold border-[#E5E7EB] hover:bg-white text-[#17172A] gap-2 active:scale-[0.98] transition-all"
              >
                <a
                  href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <GitHubIcon size={14} className="text-[#17172A]" />
                  <span>Explore GitHub</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-40" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & Telemetry Column (4 cols) */}
          <div className="md:col-span-4">
            <FooterBrand />
          </div>

          {/* 5-Column Navigation Links (8 cols) */}
          <div className="md:col-span-8">
            <FooterNavColumns />
          </div>
        </div>

        {/* Developer Changelog Subscription Strip */}
        <FooterNewsletter />
      </div>

      {/* Bottom Sub-Bar */}
      <FooterBottomBar />
    </footer>
  );
}
