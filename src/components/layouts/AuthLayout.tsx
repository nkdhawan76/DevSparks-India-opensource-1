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
      // Respect accessibility reduced-motion preference
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate top header
      tl.from(".auth-header", {
        y: -16,
        opacity: 0,
        duration: 0.5,
      });

      // Animate main split card entrance
      tl.from(
        ".auth-card",
        {
          y: 24,
          opacity: 0,
          scale: 0.98,
          duration: 0.65,
        },
        "-=0.25"
      );

      // Animate left showcase elements
      tl.from(
        ".showcase-headline",
        {
          y: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
        },
        "-=0.35"
      );

      // Animate 3D mockup window
      tl.from(
        mockupRef.current,
        {
          y: 25,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
        },
        "-=0.3"
      );

      // Animate telemetry bars popping up from bottom
      tl.from(
        ".telemetry-bar",
        {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.8)",
        },
        "-=0.3"
      );

      // Animate feature bullet points
      tl.from(
        ".feature-item",
        {
          x: -16,
          opacity: 0,
          duration: 0.45,
          stagger: 0.06,
        },
        "-=0.2"
      );

      // Animate right pane content
      tl.from(
        ".auth-pane-content",
        {
          y: 16,
          opacity: 0,
          duration: 0.55,
        },
        "-=0.4"
      );

      // Animate footer
      tl.from(
        ".auth-footer",
        {
          opacity: 0,
          duration: 0.4,
        },
        "-=0.2"
      );

      // Subtle ambient floating animation on the mockup illustration
      if (mockupRef.current) {
        gsap.to(mockupRef.current, {
          y: "-=6",
          duration: 3.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.8,
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
      {/* Top minimal header bar with Brand and Auth Action Pill */}
      <header className="auth-header max-w-5xl mx-auto w-full flex items-center justify-between text-xs py-2">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-all group-hover:scale-105 active:scale-95">
            <Zap className="h-4 w-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-[#17172A] tracking-tight leading-none">
              DevSparks <span className="text-[#5938F5]">DeployCheck</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">By DevSparks India</span>
          </div>
        </Link>

        {/* Top Right Auth Action Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {mode === "login" ? (
            <>
              <span className="text-xs font-semibold text-[#17172A] px-2 py-1">
                Sign In
              </span>
              <Button
                size="sm"
                asChild
                className="rounded-full px-4 h-8 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs transition-transform active:scale-95"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </>
          ) : mode === "signup" ? (
            <>
              <span className="hidden sm:inline text-xs text-[#667085]">
                Already have an account?
              </span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full px-4 h-8 text-xs font-bold border-[#E5E7EB] hover:bg-slate-50 transition-transform active:scale-95"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full px-4 h-8 text-xs font-bold border-[#E5E7EB] hover:bg-slate-50 transition-transform active:scale-95"
            >
              <Link href="/login">Back to Sign In</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Main Split-Card Studio Container (Matches Figma Mockup) */}
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6">
        <div className="auth-card w-full max-w-5xl mx-auto bg-white border border-[#E5E7EB] rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
          {/* Left Panel: Feature Showcase & Illustration */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] p-8 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E7EB] relative overflow-hidden">
            {/* Soft decorative curves */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

            {/* Top Showcase Header */}
            <div className="relative z-10">
              <div className="showcase-headline">
                <h2 className="text-3xl font-extrabold text-[#17172A] tracking-tight leading-tight">
                  Audit, Fix,<br />
                  Deploy and<br />
                  <span className="text-[#5938F5]">Monitor</span>
                </h2>
                <p className="text-xs text-[#667085] mt-3 leading-relaxed">
                  Pre-deployment audit, AI assistance, VPS deployment and website monitoring in one platform.
                </p>
              </div>

              {/* Floating 3D-styled UI Window Illustration */}
              <div
                ref={mockupRef}
                className="mt-8 p-4 bg-white/90 backdrop-blur-xs border border-purple-100 rounded-2xl shadow-lg shadow-purple-500/5 relative will-change-transform"
              >
                {/* Window header dots */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1 opacity-40">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                </div>

                {/* Window Body Mockup */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 w-3/4 bg-[#5938F5]/20 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                    <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
                  </div>
                </div>

                {/* Mini telemetry bars */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between gap-1.5 h-9 px-2">
                  <div className="telemetry-bar w-3 bg-purple-200 rounded-t h-4" />
                  <div className="telemetry-bar w-3 bg-purple-300 rounded-t h-6" />
                  <div className="telemetry-bar w-3 bg-[#5938F5] rounded-t h-8" />
                  <div className="telemetry-bar w-3 bg-blue-300 rounded-t h-5" />
                  <div className="telemetry-bar w-3 bg-blue-400 rounded-t h-7" />
                  <div className="telemetry-bar w-3 bg-emerald-400 rounded-t h-9" />
                </div>
              </div>
            </div>

            {/* Bottom 4 Feature Bullet Points */}
            <div className="mt-8 space-y-3 relative z-10">
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
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-[#5938F5] flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: The Authentication Form */}
          <div className="auth-pane-content md:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-center">
            {/* Brand Header Inside Right Pane */}
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center gap-3 group mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-md shadow-[#5938F5]/20 group-hover:bg-[#4726DB] transition-all group-hover:scale-105 shrink-0">
                  <Zap className="h-5 w-5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-extrabold text-base text-[#17172A] tracking-tight">DevSparks</span>
                    <span className="font-semibold text-base text-[#5938F5]">DeployCheck</span>
                  </div>
                  <div className="text-[11px] text-[#667085] font-medium mt-1">By DevSparks India</div>
                </div>
              </Link>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </main>

      {/* Footer Below Card */}
      <footer className="auth-footer max-w-5xl mx-auto w-full py-3 border-t border-[#E5E7EB]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#667085]">
        <div>© 2026 DevSparks India. Strict Light Theme Developer Platform.</div>
        <div className="flex items-center gap-4">
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
            Status (Operational)
          </span>
        </div>
      </footer>
    </div>
  );
}
