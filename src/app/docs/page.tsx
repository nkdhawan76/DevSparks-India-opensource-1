import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Code2,
  Bookmark,
  GraduationCap,
  ShieldCheck,
  Terminal,
  Server,
  ArrowRight,
} from "lucide-react";

const meta = getRouteMetadata("/docs");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.canonicalPath },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonicalPath,
  },
};

const DOC_SECTIONS = [
  {
    title: "Getting Started",
    description: "Prerequisites, system requirements, local setup, and running your first pre-deployment audit in under 5 minutes.",
    icon: Bookmark,
    href: "/docs/getting-started",
    badge: "5 Min Setup",
  },
  {
    title: "REST API Reference",
    description: "Detailed endpoint documentation for /api/v1 including audits, authentication, servers, deployments, and monitoring.",
    icon: Code2,
    href: "/docs/api",
    badge: "v1.0.0",
  },
  {
    title: "Pre-deployment Audit Engine",
    description: "Understanding static vulnerability detection, regex secret scanning patterns, dependency auditing, and exit codes.",
    icon: ShieldCheck,
    href: "/features/pre-deployment-audit",
    badge: "Deterministic",
  },
  {
    title: "VPS & SSH Infrastructure",
    description: "Connecting Linux servers, host fingerprint verification, AES-256 encrypted credential vaults, and hardware telemetry.",
    icon: Server,
    href: "/features/vps-management",
    badge: "Sovereign VPS",
  },
  {
    title: "Practical Developer Tutorials",
    description: "Step-by-step guides for GitHub Actions CI/CD workflows, setting up reverse proxies, and configuring OpenRouter BYOK.",
    icon: GraduationCap,
    href: "/tutorials",
    badge: "Step-by-Step",
  },
  {
    title: "CLI Command Reference",
    description: "Run audits locally, verify authentication sessions, and automate checks from terminal scripts and CI pipelines.",
    icon: Terminal,
    href: "/docs/getting-started",
    badge: "Zero-Fat CLI",
  },
];

export default function DocsLandingPage() {
  return (
    <MarketingLayout currentPath="/docs">
      <PageHero
        badge="DEVELOPER DOCUMENTATION"
        badgeVariant="purple"
        title="DeployCheck Documentation & Architecture Reference"
        description="Everything you need to install, configure, automate, and extend DevSparks DeployCheck across local machines, continuous integration, and self-hosted VPS servers."
        primaryAction={{
          label: "Read Getting Started Guide",
          href: "/docs/getting-started",
        }}
        secondaryAction={{
          label: "Explore REST API",
          href: "/docs/api",
        }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOC_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center group-hover:bg-[#5938F5] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#5938F5] uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 border border-purple-100">
                      {section.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors mb-2">
                    {section.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#5938F5]">
                  <span>Explore Documentation</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Terminal Snippet */}
      <section className="py-12 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-1">
              ZERO-INSTALL QUICK AUDIT
            </span>
            <h3 className="text-lg font-bold text-[#17172A]">Run pre-deployment audit on any repository</h3>
          </div>
          <div className="bg-[#17172A] text-slate-100 rounded-2xl p-5 shadow-lg border border-slate-800 font-mono text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-purple-400">$</span>
              <span>git clone https://github.com/nkdhawan76/DevSparks-India-opensource-1.git &amp;&amp; node scripts/run-audit.mjs</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold hidden sm:inline-block">EXIT CODE: 0</span>
          </div>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
