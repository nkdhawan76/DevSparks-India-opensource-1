"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Zap, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/common/Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface FooterLinkItem {
  label: string;
  route: string;
  external?: boolean;
}

const PRODUCT_LINKS: FooterLinkItem[] = [
  { label: "Overview", route: "/features" },
  { label: "Pre-deployment Audit", route: "/features/audit" },
  { label: "AI Assistant", route: "/features/ai-assistant" },
  { label: "VPS Management", route: "/features/vps" },
  { label: "Guided Deployment", route: "/features/deployment" },
  { label: "Website Monitoring", route: "/features/monitoring" },
  { label: "Maintenance", route: "/features/maintenance" },
];

const SOLUTIONS_LINKS: FooterLinkItem[] = [
  { label: "For Developers", route: "/solutions/developers" },
  { label: "For DevOps Teams", route: "/solutions/devops" },
  { label: "For Agencies", route: "/solutions/agencies" },
  { label: "For Startups", route: "/solutions/startups" },
  { label: "Security & Reliability", route: "/docs/security" },
];

const RESOURCES_LINKS: FooterLinkItem[] = [
  { label: "Documentation", route: "/documentation" },
  { label: "API Reference", route: "/docs/api" },
  { label: "Getting Started", route: "/documentation" },
  { label: "Tutorials", route: "/documentation" },
  { label: "Changelog", route: "/changelog" },
  { label: "Roadmap", route: "/roadmap" },
  { label: "GitHub Repository", route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1", external: true },
];

const COMPANY_LINKS: FooterLinkItem[] = [
  { label: "About DevSparks India", route: "/about" },
  { label: "Contact", route: "/contact" },
  { label: "Community", route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/discussions", external: true },
  { label: "Contribute", route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/blob/main/README.md", external: true },
  { label: "Support", route: "/support" },
];

const LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Privacy Policy", route: "/docs/terms" },
  { label: "Terms of Service", route: "/docs/terms" },
  { label: "Cookie Policy", route: "/docs/terms" },
  { label: "Acceptable Use Policy", route: "/docs/terms" },
  { label: "Security Policy", route: "/docs/security" },
  { label: "License (MIT)", route: "/docs/terms" },
];

export function WebsiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(".footer-column", {
        y: 10,
        opacity: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: "power2.out",
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="w-full bg-[#F7F8FC] border-t border-[#E5E7EB] font-sans select-none mt-8 will-change-transform">
      {/* 5-Column Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Info Column (4 cols) */}
          <div className="footer-column md:col-span-4 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-7.5 h-7.5 rounded-[8px] bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] transition-colors">
                <Zap className="h-4 w-4 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[13px] text-[#17172A] tracking-tight leading-none">
                  DeployCheck
                </span>
                <span className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5">
                  By DevSparks India
                </span>
              </div>
            </Link>

            <p className="text-[11.5px] text-[#667085] leading-relaxed max-w-sm">
              Open-source developer operations platform for auditing, AI-assisted development, secure deployment and website monitoring.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
                target="_blank"
                rel="noreferrer noopener"
                className="w-7.5 h-7.5 rounded-lg bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#17172A] hover:border-slate-300 flex items-center justify-center transition-colors shadow-2xs"
                title="GitHub"
                aria-label="GitHub"
              >
                <GitHubIcon size={14} />
              </a>

              <a
                href="https://linkedin.com/company/devsparks-india"
                target="_blank"
                rel="noreferrer noopener"
                className="w-7.5 h-7.5 rounded-lg bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#3563E9] hover:border-slate-300 flex items-center justify-center transition-colors shadow-2xs text-[11px] font-bold"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                in
              </a>

              <a
                href="https://x.com/devsparksindia"
                target="_blank"
                rel="noreferrer noopener"
                className="w-7.5 h-7.5 rounded-lg bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#17172A] hover:border-slate-300 flex items-center justify-center transition-colors shadow-2xs text-[11px] font-bold"
                title="X"
                aria-label="X"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Links Columns (8 cols: 5 distinct sub-columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 text-xs">
            {/* PRODUCT */}
            <div className="footer-column">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                PRODUCT
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.route}
                      className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOLUTIONS */}
            <div className="footer-column">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                SOLUTIONS
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {SOLUTIONS_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.route}
                      className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div className="footer-column">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
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
                        className="text-slate-600 hover:text-[#5938F5] transition-colors inline-flex items-center gap-1 leading-tight"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-40" />
                      </a>
                    ) : (
                      <Link
                        href={link.route}
                        className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="footer-column">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
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
                        className="text-slate-600 hover:text-[#5938F5] transition-colors inline-flex items-center gap-1 leading-tight"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-40" />
                      </a>
                    ) : (
                      <Link
                        href={link.route}
                        className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div className="footer-column">
              <h5 className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                LEGAL
              </h5>
              <ul className="space-y-1.5 text-[11.5px]">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.route}
                      className="text-slate-600 hover:text-[#5938F5] transition-colors leading-tight"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="border-t border-[#E5E7EB] bg-white py-3.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#667085]">
          <div className="text-[11px]">© DevSparks India. All rights reserved.</div>

          {/* Quick Legal Links & Status */}
          <div className="flex items-center gap-3.5 text-[11px]">
            <Link href="/docs/terms" className="hover:text-[#17172A] transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/docs/terms" className="hover:text-[#17172A] transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/docs/security" className="hover:text-[#17172A] transition-colors">
              Security
            </Link>
            <span>•</span>
            {/* System Status */}
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
