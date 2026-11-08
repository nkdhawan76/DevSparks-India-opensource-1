"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface AuthLayoutProps {
  children: React.ReactNode;
  mode?: "login" | "signup" | "recovery";
}

export function AuthLayout({
  children,
  mode = "login",
}: AuthLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".auth-header", {
        y: -14,
        opacity: 0,
        duration: 0.45,
      });

      tl.from(
        ".auth-outer-frame",
        {
          y: 20,
          opacity: 0,
          scale: 0.985,
          duration: 0.55,
        },
        "-=0.2"
      );

      tl.from(
        ".showcase-headline",
        {
          y: 15,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.25"
      );

      tl.from(
        mockupRef.current,
        {
          y: 18,
          opacity: 0,
          scale: 0.97,
          duration: 0.5,
        },
        "-=0.2"
      );

      tl.from(
        ".telemetry-bar",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.45,
          stagger: 0.04,
          ease: "back.out(1.6)",
        },
        "-=0.25"
      );

      tl.from(
        ".feature-item",
        {
          x: -12,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
        },
        "-=0.15"
      );

      tl.from(
        ".auth-footer",
        {
          opacity: 0,
          duration: 0.35,
        },
        "-=0.1"
      );

      // Subtle ambient hover motion on the preview window
      if (mockupRef.current) {
        gsap.to(mockupRef.current, {
          y: "-=5",
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
      className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased text-[#17172A] select-none"
    >
      {/* Top Header Bar with Brand & Mode Switcher */}
      <header className="auth-header max-w-[890px] mx-auto w-full flex items-center justify-between text-xs py-2">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[8px] bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-all group-hover:scale-105 active:scale-95">
            <Zap className="h-4 w-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-[#17172A] tracking-tight leading-none">
              DevSparks <span className="text-[#5938F5]">DeployCheck</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">By DevSparks India</span>
          </div>
        </Link>

        {/* Top Right Auth Action Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {mode === "login" ? (
            <>
              <span className="text-xs font-semibold text-[#17172A] px-1.5">
                Sign In
              </span>
              <Button
                size="sm"
                asChild
                className="rounded-full px-4 h-8 text-xs font-semibold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-2xs"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </>
          ) : mode === "signup" ? (
            <>
              <span className="hidden sm:inline text-xs text-[#667085]">
                Already registered?
              </span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full px-4 h-8 text-xs font-semibold border-[#E5E7EB] hover:bg-slate-50"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full px-4 h-8 text-xs font-semibold border-[#E5E7EB] hover:bg-slate-50"
            >
              <Link href="/login">Back to Sign In</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Main Container with Outer Double-Line Frame and Curv 32px */}
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6">
        {/* Outer Frame with Padding & Outer Border Line */}
        <div className="auth-outer-frame w-full max-w-[890px] mx-auto p-2.5 sm:p-3 rounded-[38px] bg-slate-100/70 border border-slate-200/80 shadow-xl shadow-slate-200/60 backdrop-blur-xs ring-1 ring-slate-200/50">
          {/* Inner Card with Curv 32px & Inner Border Line */}
          <div className="auth-card w-full bg-white border border-[#E5E7EB] rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-sm">
            {/* Left Panel: Feature Showcase & Illustration */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] p-7 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E7EB] relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-purple-200/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-200/25 rounded-full blur-2xl pointer-events-none" />

              {/* Showcase Header */}
              <div className="relative z-10">
                <div className="showcase-headline">
                  <h2 className="text-2xl font-extrabold text-[#17172A] tracking-tight leading-snug">
                    Audit, Fix,<br />
                    Deploy and<br />
                    <span className="text-[#5938F5]">Monitor</span>
                  </h2>
                  <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                    Pre-deployment audit, AI assistance, VPS deployment and website monitoring in one platform.
                  </p>
                </div>

                {/* Floating UI Window Illustration (Curv 16px) */}
                <div
                  ref={mockupRef}
                  className="mt-6 p-4 bg-white/90 backdrop-blur-xs border border-purple-100 rounded-[16px] shadow-sm shadow-purple-500/5 relative will-change-transform"
                >
                  {/* Header Dots */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-1 opacity-40">
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                    </div>
                  </div>

                  {/* Window Body Mockup */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-[10px] bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2 w-3/4 bg-[#5938F5]/20 rounded-full" />
                      <div className="h-1.5 w-1/2 bg-slate-200 rounded-full" />
                      <div className="h-1.5 w-5/6 bg-slate-100 rounded-full" />
                    </div>
                  </div>

                  {/* Telemetry Bars */}
                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-end justify-between gap-1.5 h-8 px-1">
                    <div className="telemetry-bar w-2.5 bg-purple-200 rounded-t h-3.5" />
                    <div className="telemetry-bar w-2.5 bg-purple-300 rounded-t h-5" />
                    <div className="telemetry-bar w-2.5 bg-[#5938F5] rounded-t h-7" />
                    <div className="telemetry-bar w-2.5 bg-blue-300 rounded-t h-4.5" />
                    <div className="telemetry-bar w-2.5 bg-blue-400 rounded-t h-6" />
                    <div className="telemetry-bar w-2.5 bg-emerald-400 rounded-t h-8" />
                  </div>
                </div>
              </div>

              {/* Bottom 4 Feature Bullet Points */}
              <div className="mt-6 space-y-2.5 relative z-10">
                {[
                  "Code & security audit",
                  "AI coding assistance",
                  "One-click deployment",
                  "Website monitoring",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="feature-item flex items-center gap-2.5 text-xs font-semibold text-[#17172A]"
                  >
                    <div className="w-4.5 h-4.5 rounded-full bg-purple-100 text-[#5938F5] flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: The Authentication Form */}
            <div className="auth-pane-content md:col-span-7 bg-white p-7 sm:p-9 flex flex-col justify-center">
              {/* Brand Header Inside Right Pane */}
              <div className="mb-5">
                <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
                  <div className="w-8 h-8 rounded-[8px] bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-all group-hover:scale-105 shrink-0">
                    <Zap className="h-4 w-4 fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="font-extrabold text-sm text-[#17172A] tracking-tight">DevSparks</span>
                      <span className="font-semibold text-sm text-[#5938F5]">DeployCheck</span>
                    </div>
                    <div className="text-[10px] text-[#667085] font-medium mt-0.5">By DevSparks India</div>
                  </div>
                </Link>
              </div>

              {/* Form Content */}
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Below Card */}
      <footer className="auth-footer max-w-[890px] mx-auto w-full py-2.5 border-t border-[#E5E7EB]/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-[#667085]">
        <div>© 2026 DevSparks India. Strict Light Theme Developer Platform.</div>
        <div className="flex items-center gap-3.5">
          <Link href="/docs/security" className="hover:text-[#17172A] transition-colors">
            Security Policy
          </Link>
          <span>•</span>
          <Link href="/docs/terms" className="hover:text-[#17172A] transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational
          </span>
        </div>
      </footer>
    </div>
  );
}
