import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Clock,
  ArrowRight,
  Workflow,
  Server,
  Bot,
  Bell,
  Database,
} from "lucide-react";

const meta = getRouteMetadata("/tutorials");

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

interface Tutorial {
  title: string;
  category: string;
  readTime: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  slug: string;
}

const TUTORIALS: Tutorial[] = [
  {
    title: "Configuring GitHub Actions for Deterministic Pre-Deployment Auditing",
    category: "CI / CD",
    readTime: "6 min read",
    summary: "Integrate scripts/run-audit.mjs into your GitHub Actions workflow with zero dependencies, catching secret leaks and dependency CVEs before merge.",
    icon: Workflow,
    slug: "github-actions-audit",
  },
  {
    title: "Hardening an Ubuntu 24.04 VPS for Policy-Guarded SSH Deployments",
    category: "Infrastructure",
    readTime: "8 min read",
    summary: "Set up dedicated deployment users, configure Ed25519 SSH keys, configure UFW firewall rules, and verify host fingerprints in DeployCheck.",
    icon: Server,
    slug: "harden-ubuntu-vps",
  },
  {
    title: "Setting Up Bring-Your-Own-Key (BYOK) AI Diff Reviews with OpenRouter",
    category: "AI & AppSec",
    readTime: "5 min read",
    summary: "Connect DeepSeek V3 or Claude 3.5 Sonnet to diagnose pre-deployment audit findings and review policy-guarded git diffs before execution.",
    icon: Bot,
    slug: "byok-ai-setup",
  },
  {
    title: "Configuring Zero-False-Positive Synthetic Monitoring & Slack Webhooks",
    category: "Monitoring",
    readTime: "4 min read",
    summary: "Set up 60-second synthetic pings, SSL expiration alerts, and SSRF-guarded incident notifications directly to your team Slack channel.",
    icon: Bell,
    slug: "synthetic-monitoring-slack",
  },
  {
    title: "Executing Zero-Downtime Atomic Symlink Deployments with Node.js",
    category: "Pipelines",
    readTime: "7 min read",
    summary: "Understand atomic symlink directory swapping, process warmup verification, and instant single-click rollbacks on production servers.",
    icon: Database,
    slug: "atomic-symlinks-deployment",
  },
];

export default function TutorialsPage() {
  return (
    <MarketingLayout currentPath="/tutorials">
      <PageHero
        badge="DEVELOPER RECIPES & TUTORIALS"
        badgeVariant="blue"
        title="Actionable architecture recipes and deployment tutorials"
        description="Learn how to harden servers, automate GitHub Actions CI preflights, configure BYOK AI code reviews, and maintain zero-downtime application releases."
        primaryAction={{
          label: "Read Getting Started Guide",
          href: "/docs/getting-started",
        }}
        secondaryAction={{
          label: "View API Reference",
          href: "/docs/api",
        }}
      />

      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {TUTORIALS.map((tut) => {
            const Icon = tut.icon;
            return (
              <div
                key={tut.slug}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] font-bold text-[#5938F5] uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 border border-purple-100">
                        {tut.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{tut.readTime}</span>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#17172A] mb-1 leading-snug">
                      {tut.title}
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      {tut.summary}
                    </p>
                  </div>
                </div>

                <Link
                  href="/docs/getting-started"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-purple-50 text-xs font-bold text-[#17172A] hover:text-[#5938F5] border border-[#E5E7EB] hover:border-purple-200 transition-colors shrink-0 group"
                >
                  <span>Read Tutorial</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
