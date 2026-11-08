"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Zap,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Send,
  ShieldCheck,
  Server,
  Activity,
  Heart,
} from "lucide-react";
import { GitHubIcon } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getCurrentYear } from "@/lib/formatters.js";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface FooterLinkItem {
  label: string;
  route: string;
  external?: boolean;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning";
}

const PRODUCT_LINKS: FooterLinkItem[] = [
  { label: "Overview", route: "/product" },
  { label: "Pre-deployment Audit", route: "/features/pre-deployment-audit", badge: "Live", badgeVariant: "success" },
  { label: "AI Assistant", route: "/features/ai-assistant", badge: "BYOK", badgeVariant: "secondary" },
  { label: "VPS Management", route: "/features/vps-management" },
  { label: "Guided Deployment", route: "/features/guided-deployment" },
  { label: "Website Monitoring", route: "/features/website-monitoring" },
  { label: "Maintenance", route: "/features/maintenance" },
];

const SOLUTIONS_LINKS: FooterLinkItem[] = [
  { label: "For Developers", route: "/solutions/developers" },
  { label: "For DevOps Teams", route: "/solutions/devops-teams" },
  { label: "For Agencies", route: "/solutions/agencies" },
  { label: "For Startups", route: "/solutions/startups" },
  { label: "Security & Reliability", route: "/solutions/security-reliability" },
];

const RESOURCES_LINKS: FooterLinkItem[] = [
  { label: "Documentation", route: "/docs" },
  { label: "API Reference", route: "/docs/api" },
  { label: "Getting Started", route: "/docs/getting-started" },
  { label: "Tutorials", route: "/tutorials" },
  { label: "Changelog", route: "/changelog", badge: "v0.1.0", badgeVariant: "secondary" },
  { label: "Roadmap", route: "/roadmap" },
  { label: "GitHub Repository", route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1", external: true },
];

const COMPANY_LINKS: FooterLinkItem[] = [
  { label: "About DevSparks India", route: "/about" },
  { label: "Contact", route: "/contact" },
  { label: "Community", route: "/community" },
  { label: "Contribute", route: "/contribute" },
  { label: "Support", route: "/support" },
];

const LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Privacy Policy", route: "/privacy" },
  { label: "Terms of Service", route: "/terms" },
  { label: "Cookie Policy", route: "/cookies" },
  { label: "Acceptable Use Policy", route: "/acceptable-use" },
  { label: "Security Policy", route: "/security" },
  { label: "License (MIT)", route: "/license" },
];

interface WebsiteFooterProps {
  showCta?: boolean;
}

export function WebsiteFooter({ showCta = true }: WebsiteFooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = getCurrentYear();

  // GSAP Entrance Animations
  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (showCta) {
        tl.from(".mega-footer-cta", {
          y: 16,
          opacity: 0,
          scale: 0.99,
          duration: 0.45,
        });
      }

      tl.from(
        ".mega-footer-brand",
        {
          y: 12,
          opacity: 0,
          duration: 0.35,
        },
        "-=0.2"
      );

      tl.from(
        ".mega-footer-col",
        {
          y: 10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
        },
        "-=0.2"
      );

      tl.from(
        ".mega-footer-bottom",
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.15"
      );
    },
    { scope: footerRef, dependencies: [showCta] }
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;

    setSubscribed(true);
    if (footerRef.current) {
      gsap.fromTo(
        ".newsletter-success-badge",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }
      );
    }
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#F7F8FC] border-t border-[#E5E7EB] font-sans select-none mt-6 overflow-hidden will-change-transform"
    >
      {/* Optional Mega Pre-Footer CTA Studio Card */}
      {showCta && (
        <div className="mega-footer-cta max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#EEF4FF] via-[#F4F1FF] to-[#FAF8FF] border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 ring-1 ring-slate-200/60">
            {/* Ambient Background Blur Rings */}
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

            {/* Right Action Buttons with GSAP Micro-Interactions */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <Button
                size="sm"
                asChild
                className="h-9.5 rounded-[8px] px-4.5 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs gap-1.5 active:scale-[0.98] transition-all group"
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

      {/* Main Mega Footer Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & Telemetry Column (4 cols) */}
          <div className="mega-footer-brand md:col-span-4 space-y-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-[8px] bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] group-hover:scale-105 active:scale-95 transition-all">
                <Zap className="h-4 w-4 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-[#17172A] tracking-tight leading-none group-hover:text-[#5938F5] transition-colors">
                  DeployCheck
                </span>
                <span className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5">
                  By DevSparks India
                </span>
              </div>
            </Link>

            <p className="text-[11.5px] text-[#667085] leading-relaxed max-w-sm">
              Open-source developer operations platform for automated security auditing, AI-assisted patch generation, guided VPS deployment, and website uptime telemetry.
            </p>

            {/* Live Infrastructure Telemetry Card */}
            <div className="p-2.5 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1.5 max-w-xs">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Activity className="h-3 w-3 text-emerald-500" />
                  <span>Platform Health</span>
                </span>
                <Badge variant="outline" className="text-[9px] py-0 px-1.5 h-4 bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Operational</span>
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[9.5px] text-slate-500 font-mono pt-0.5">
                <div className="flex items-center gap-1">
                  <Server className="h-2.5 w-2.5 text-slate-400" />
                  <span>Mumbai Core</span>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <ShieldCheck className="h-2.5 w-2.5 text-slate-400" />
                  <span>99.98% Uptime</span>
                </div>
              </div>
            </div>

            {/* Social Links with Hover GSAP Lift */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
                target="_blank"
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#17172A] hover:border-slate-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs"
                title="GitHub Repository"
                aria-label="GitHub"
              >
                <GitHubIcon size={15} />
              </a>

              <a
                href="https://linkedin.com/company/devsparks-india"
                target="_blank"
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#3563E9] hover:border-slate-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs text-xs font-bold"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                in
              </a>

              <a
                href="https://x.com/devsparksindia"
                target="_blank"
                rel="noreferrer noopener"
                className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#17172A] hover:border-slate-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs text-xs font-bold"
                title="X (Twitter)"
                aria-label="X"
              >
                𝕏
              </a>

              <Link
                href="/status"
                className="w-8 h-8 rounded-[8px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-emerald-600 hover:border-emerald-300 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-2xs"
                title="System Status"
                aria-label="System Status"
              >
                <Activity className="h-3.5 w-3.5 text-emerald-600" />
              </Link>
            </div>
          </div>

          {/* 5-Column Navigation Links (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 text-xs">
            {/* PRODUCT */}
            <div className="mega-footer-col">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-0.5">
                PRODUCT
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.route}
                      className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center gap-1.5 group py-0.5"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                      {link.badge && (
                        <Badge
                          variant={link.badgeVariant || "secondary"}
                          className="text-[8px] py-0 px-1 h-3.5 font-bold uppercase rounded-[3px]"
                        >
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOLUTIONS */}
            <div className="mega-footer-col">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-0.5">
                SOLUTIONS
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {SOLUTIONS_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.route}
                      className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center group py-0.5"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div className="mega-footer-col">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-0.5">
                RESOURCES
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {RESOURCES_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.route}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center gap-1 group py-0.5"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-40" />
                      </a>
                    ) : (
                      <Link
                        href={link.route}
                        className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center gap-1.5 group py-0.5"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                        {link.badge && (
                          <Badge
                            variant={link.badgeVariant || "secondary"}
                            className="text-[8px] py-0 px-1 h-3.5 font-bold uppercase rounded-[3px]"
                          >
                            {link.badge}
                          </Badge>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="mega-footer-col">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-0.5">
                COMPANY
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.route}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center gap-1 group py-0.5"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-40" />
                      </a>
                    ) : (
                      <Link
                        href={link.route}
                        className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center group py-0.5"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div className="mega-footer-col">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-0.5">
                LEGAL
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.route}
                      className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center group py-0.5"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Developer Changelog Subscription Strip */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold text-[#17172A]">
              Subscribe to developer changelog & security releases
            </h4>
            <p className="text-[10.5px] text-[#667085] mt-0.5">
              Get notified of new vulnerability rules, AI models, and deployment runbooks. No spam.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="newsletter-success-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Subscribed! You&apos;ll receive our next changelog.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-1.5 max-w-sm w-full">
                <Input
                  type="email"
                  placeholder="developer@company.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="h-8.5 text-xs rounded-[8px] bg-white border-[#E5E7EB] w-56 sm:w-64"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-8.5 rounded-[8px] px-3 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white gap-1"
                >
                  <span>Subscribe</span>
                  <Send className="h-3 w-3" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="mega-footer-bottom border-t border-[#E5E7EB] bg-white py-3.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#667085]">
          {/* Copyright & Attribution */}
          <div className="text-[11px] flex items-center gap-1.5">
            <span>© {currentYear} DevSparks India. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-500">
              Built with <Heart className="h-2.5 w-2.5 fill-rose-500 text-rose-500 inline" /> for developers worldwide
            </span>
          </div>

          {/* Quick Policy Links & Live Status */}
          <div className="flex items-center gap-3 text-[11px]">
            <Link href="/privacy" className="hover:text-[#17172A] transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#17172A] transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/security" className="hover:text-[#17172A] transition-colors">
              Security
            </Link>
            <span>•</span>
            <Link
              href="/status"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold hover:bg-emerald-100 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Operational</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
