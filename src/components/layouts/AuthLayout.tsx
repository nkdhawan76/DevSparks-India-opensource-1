"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Zap, Check } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WebsiteHeader } from "@/components/navigation/WebsiteHeader";
import { WebsiteFooter } from "@/components/navigation/WebsiteFooter";

interface AuthLayoutProps {
  children: React.ReactNode;
  mode?: "login" | "signup" | "recovery";
}

export function AuthLayout({
  children,
  mode: _mode = "login",
}: AuthLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".auth-outer-frame", {
        y: 16,
        opacity: 0,
        scale: 0.985,
        duration: 0.5,
      });

      tl.from(
        ".showcase-headline",
        {
          y: 12,
          opacity: 0,
          duration: 0.35,
        },
        "-=0.2"
      );

      tl.from(
        mockupRef.current,
        {
          y: 14,
          opacity: 0,
          scale: 0.97,
          duration: 0.45,
        },
        "-=0.2"
      );

      tl.from(
        ".telemetry-bar",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.4,
          stagger: 0.03,
          ease: "back.out(1.6)",
        },
        "-=0.2"
      );

      tl.from(
        ".feature-item",
        {
          x: -10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.04,
        },
        "-=0.15"
      );

      // Subtle ambient hover motion on the preview window
      if (mockupRef.current) {
        gsap.to(mockupRef.current, {
          y: "-=4",
          duration: 3.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.7,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between p-3 sm:p-5 font-sans antialiased text-[#17172A] select-none"
    >
      {/* Top Website Header with Mega Menus */}
      <WebsiteHeader />

      {/* Main Container with Outer Double-Line Frame and Curv 32px (Compact Scale) */}
      <main className="flex-1 flex items-center justify-center py-6 sm:py-8">
        {/* Outer Frame with Padding & Outer Border Line */}
        <div className="auth-outer-frame w-full max-w-[760px] mx-auto p-2 sm:p-2.5 rounded-[36px] bg-slate-100/70 border border-slate-200/80 shadow-lg shadow-slate-200/60 backdrop-blur-xs ring-1 ring-slate-200/50">
          {/* Inner Card with Curv 32px & Inner Border Line */}
          <div className="auth-card w-full bg-white border border-[#E5E7EB] rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-xs">
            {/* Left Panel: Feature Showcase & Illustration */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E7EB] relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-purple-200/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-blue-200/25 rounded-full blur-2xl pointer-events-none" />

              {/* Showcase Header */}
              <div className="relative z-10">
                <div className="showcase-headline">
                  <h2 className="text-lg sm:text-xl font-bold text-[#17172A] tracking-tight leading-snug">
                    Audit, Fix,<br />
                    Deploy and<br />
                    <span className="text-[#5938F5]">Monitor</span>
                  </h2>
                  <p className="text-[10.5px] text-[#667085] mt-1.5 leading-relaxed">
                    Pre-deployment audit, AI assistance, VPS deployment and website monitoring in one platform.
                  </p>
                </div>

                {/* Floating UI Window Illustration (Compact) */}
                <div
                  ref={mockupRef}
                  className="mt-4 p-3 bg-white/95 backdrop-blur-xs border border-purple-100 rounded-[14px] shadow-xs shadow-purple-500/5 relative will-change-transform"
                >
                  {/* Header Dots */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-0.5 opacity-40">
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                    </div>
                  </div>

                  {/* Window Body Mockup */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-emerald-500/20">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-3/4 bg-[#5938F5]/20 rounded-full" />
                      <div className="h-1.5 w-1/2 bg-slate-200 rounded-full" />
                      <div className="h-1.5 w-5/6 bg-slate-100 rounded-full" />
                    </div>
                  </div>

                  {/* Telemetry Bars */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-end justify-between gap-1 h-6 px-1">
                    <div className="telemetry-bar w-2 bg-purple-200 rounded-t h-2.5" />
                    <div className="telemetry-bar w-2 bg-purple-300 rounded-t h-4" />
                    <div className="telemetry-bar w-2 bg-[#5938F5] rounded-t h-5.5" />
                    <div className="telemetry-bar w-2 bg-blue-300 rounded-t h-3.5" />
                    <div className="telemetry-bar w-2 bg-blue-400 rounded-t h-4.5" />
                    <div className="telemetry-bar w-2 bg-emerald-400 rounded-t h-6" />
                  </div>
                </div>
              </div>

              {/* Bottom 4 Feature Bullet Points */}
              <div className="mt-5 space-y-2 relative z-10">
                {[
                  "Code & security audit",
                  "AI coding assistance",
                  "One-click deployment",
                  "Website monitoring",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="feature-item flex items-center gap-2 text-[10.5px] font-medium text-[#17172A]"
                  >
                    <div className="w-4 h-4 rounded-full bg-purple-100 text-[#5938F5] flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: The Authentication Form (Compact Proportions) */}
            <div className="auth-pane-content md:col-span-7 bg-white p-5 sm:p-6 flex flex-col justify-center">
              {/* Brand Header Inside Right Pane: strictly "DeployCheck" by "DevSparks India" */}
              <div className="mb-3.5">
                <Link href="/" className="inline-flex items-center gap-2 group mb-2">
                  <div className="w-7 h-7 rounded-[8px] bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-all shrink-0">
                    <Zap className="h-3.5 w-3.5 fill-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xs text-[#17172A] tracking-tight leading-none group-hover:text-[#5938F5] transition-colors">
                      DeployCheck
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium leading-tight mt-0.5">
                      By DevSparks India
                    </span>
                  </div>
                </Link>
              </div>

              {/* Form Content */}
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Global Marketing Website Footer */}
      <WebsiteFooter />
    </div>
  );
}
