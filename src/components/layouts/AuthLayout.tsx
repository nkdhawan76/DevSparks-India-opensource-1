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
        y: -12,
        opacity: 0,
        duration: 0.45,
      });

      tl.from(
        ".auth-card",
        {
          y: 18,
          opacity: 0,
          scale: 0.985,
          duration: 0.55,
        },
        "-=0.2"
      );

      tl.from(
        ".showcase-headline",
        {
          y: 14,
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
        ".auth-pane-content",
        {
          y: 12,
          opacity: 0,
          duration: 0.45,
        },
        "-=0.3"
      );

      tl.from(
        ".auth-footer",
        {
          opacity: 0,
          duration: 0.35,
        },
        "-=0.15"
      );

      // Subtle ambient hover motion on the preview window
      if (mockupRef.current) {
        gsap.to(mockupRef.current, {
          y: "-=4",
          duration: 3,
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
      {/* Top minimal header bar with Brand and Auth Action Pill */}
      <header className="auth-header max-w-[840px] mx-auto w-full flex items-center justify-between text-xs py-1.5">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-2xs group-hover:bg-[#4726DB] transition-all group-hover:scale-105 active:scale-95">
            <Zap className="h-3.5 w-3.5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs text-[#17172A] tracking-tight leading-none">
              DevSparks <span className="text-[#5938F5]">DeployCheck</span>
            </span>
            <span className="text-[9px] text-slate-400 font-medium leading-tight">By DevSparks India</span>
          </div>
        </Link>

        {/* Top Right Auth Action Switcher */}
        <div className="flex items-center gap-2">
          {mode === "login" ? (
            <>
              <span className="text-[11px] font-semibold text-[#17172A] px-1.5">
                Sign In
              </span>
              <Button
                size="sm"
                asChild
                className="rounded-full px-3 h-7 text-[11px] font-semibold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-2xs"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </>
          ) : mode === "signup" ? (
            <>
              <span className="hidden sm:inline text-[11px] text-[#667085]">
                Already registered?
              </span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full px-3 h-7 text-[11px] font-semibold border-[#E5E7EB] hover:bg-slate-50"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full px-3 h-7 text-[11px] font-semibold border-[#E5E7EB] hover:bg-slate-50"
            >
              <Link href="/login">Back to Sign In</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Main Split-Card Container (Compact Proportions) */}
      <main className="flex-1 flex items-center justify-center py-2 sm:py-3">
        <div className="auth-card w-full max-w-[840px] mx-auto bg-white border border-[#E5E7EB] rounded-2xl shadow-md shadow-slate-200/50 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Panel: Feature Showcase & Illustration */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E7EB] relative overflow-hidden">
            {/* Soft decorative curves */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200/25 rounded-full blur-2xl pointer-events-none" />

            {/* Top Showcase Header */}
            <div className="relative z-10">
              <div className="showcase-headline">
                <h2 className="text-xl sm:text-2xl font-bold text-[#17172A] tracking-tight leading-snug">
                  Audit, Fix,<br />
                  Deploy and<br />
                  <span className="text-[#5938F5]">Monitor</span>
                </h2>
                <p className="text-[11px] text-[#667085] mt-1.5 leading-relaxed">
                  Pre-deployment audit, AI assistance, VPS deployment and website monitoring in one platform.
                </p>
              </div>

              {/* Floating UI Window Illustration (Compact) */}
              <div
                ref={mockupRef}
                className="mt-5 p-3 bg-white/90 backdrop-blur-xs border border-purple-100 rounded-xl shadow-sm shadow-purple-500/5 relative will-change-transform"
              >
                {/* Window header dots */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-0.5 opacity-40">
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                  </div>
                </div>

                {/* Window Body Mockup */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                    <Check className="h-4.5 w-4.5 stroke-[3]" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-3/4 bg-[#5938F5]/20 rounded-full" />
                    <div className="h-1.5 w-1/2 bg-slate-200 rounded-full" />
                    <div className="h-1.5 w-5/6 bg-slate-100 rounded-full" />
                  </div>
                </div>

                {/* Mini telemetry bars */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-end justify-between gap-1 h-7 px-1">
                  <div className="telemetry-bar w-2.5 bg-purple-200 rounded-t h-3" />
                  <div className="telemetry-bar w-2.5 bg-purple-300 rounded-t h-4.5" />
                  <div className="telemetry-bar w-2.5 bg-[#5938F5] rounded-t h-6" />
                  <div className="telemetry-bar w-2.5 bg-blue-300 rounded-t h-4" />
                  <div className="telemetry-bar w-2.5 bg-blue-400 rounded-t h-5.5" />
                  <div className="telemetry-bar w-2.5 bg-emerald-400 rounded-t h-7" />
                </div>
              </div>
            </div>

            {/* Bottom 4 Feature Bullet Points */}
            <div className="mt-6 space-y-2 relative z-10">
              {[
                "Code & security audit",
                "AI coding assistance",
                "One-click deployment",
                "Website monitoring",
              ].map((feature) => (
                <div
                  key={feature}
                  className="feature-item flex items-center gap-2 text-[11px] font-medium text-[#17172A]"
                >
                  <div className="w-4 h-4 rounded-full bg-purple-100 text-[#5938F5] flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: The Authentication Form (Sleek, Compact) */}
          <div className="auth-pane-content md:col-span-7 bg-white p-5 sm:p-7 flex flex-col justify-center">
            {/* Brand Header Inside Right Pane */}
            <div className="mb-4">
              <Link href="/" className="inline-flex items-center gap-2 group mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-all group-hover:scale-105 shrink-0">
                  <Zap className="h-3.5 w-3.5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-extrabold text-xs text-[#17172A] tracking-tight">DevSparks</span>
                    <span className="font-semibold text-xs text-[#5938F5]">DeployCheck</span>
                  </div>
                  <div className="text-[9px] text-[#667085] font-medium mt-0.5">By DevSparks India</div>
                </div>
              </Link>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </main>

      {/* Footer Below Card */}
      <footer className="auth-footer max-w-[840px] mx-auto w-full py-2 border-t border-[#E5E7EB]/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#667085]">
        <div>© 2026 DevSparks India. Strict Light Theme Developer Platform.</div>
        <div className="flex items-center gap-3">
          <Link href="/docs/security" className="hover:text-[#17172A] transition-colors">
            Security Policy
          </Link>
          <span>•</span>
          <Link href="/docs/terms" className="hover:text-[#17172A] transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operational
          </span>
        </div>
      </footer>
    </div>
  );
}
