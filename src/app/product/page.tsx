import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { FeatureSection, FeatureCardData } from "@/components/marketing/FeatureSection";
import { WorkflowTimeline } from "@/components/marketing/WorkflowTimeline";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  ShieldCheck,
  Sparkles,
  Server,
  Rocket,
  Activity,
  Wrench,
  Check,
} from "lucide-react";

const meta = getRouteMetadata("/product");

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

const PRODUCT_MODULES: FeatureCardData[] = [
  {
    title: "Pre-deployment Audit",
    description: "Scan code dependencies, detect unencrypted secrets, validate env configs, and verify Docker files before production dispatch.",
    icon: ShieldCheck,
    status: "Live",
    route: "/features/pre-deployment-audit",
    details: ["Static analysis with 150+ rules", "Regex secret detection", "Zero false positives on lockfiles"],
  },
  {
    title: "AI Assistant (BYOK)",
    description: "Explain errors and review suggested code diffs using your own OpenRouter AI key. Every change requires explicit human approval.",
    icon: Sparkles,
    status: "BYOK",
    route: "/features/ai-assistant",
    details: ["DeepSeek, Claude 3.5, GPT-4o models", "Structured JSON diff proposals", "Zero shell execution"],
  },
  {
    title: "VPS Management",
    description: "Connect and monitor your Linux VPS nodes over SSH with host key verification. Inspect real-time CPU, RAM, and disk utilization.",
    icon: Server,
    status: "Live",
    route: "/features/vps-management",
    details: ["SHA-256 host verification", "Live hardware telemetry", "Isolated policy runners"],
  },
  {
    title: "Guided Deployment",
    description: "Deploy supported Node.js, Next.js, and static web apps with preflight verification, build pipelines, and verified rollbacks.",
    icon: Rocket,
    status: "Live",
    route: "/features/guided-deployment",
    details: ["Preflight state machine", "Release commit logging", "Automated rollbacks"],
  },
  {
    title: "Website Monitoring",
    description: "Track live HTTP response latency, SSL certificate expiration dates, and DNS health with instant incident alerting.",
    icon: Activity,
    status: "Live",
    route: "/features/website-monitoring",
    details: ["Continuous HTTP/HTTPS probes", "SSL expiration watcher", "Webhook dispatchers"],
  },
  {
    title: "Scheduled Maintenance",
    description: "Manage automated log rotation, temp directory cleanups, package updates, and backups with risk-gated execution.",
    icon: Wrench,
    status: "Live",
    route: "/features/maintenance",
    details: ["Log rotation runbooks", "System package sweeps", "Confirmation for risky ops"],
  },
];

const COMPARISON_ROWS = [
  { feature: "Open Source Core (MIT License)", deployCheck: true, traditionalSaaS: false, manualScripts: true },
  { feature: "Self-Hosted Sovereignty", deployCheck: true, traditionalSaaS: false, manualScripts: true },
  { feature: "BYOK AI Coding Assistance", deployCheck: true, traditionalSaaS: false, manualScripts: false },
  { feature: "Deterministic Security Audit", deployCheck: true, traditionalSaaS: true, manualScripts: false },
  { feature: "Automated Preflight Verification", deployCheck: true, traditionalSaaS: true, manualScripts: false },
  { feature: "Synthetic Uptime & SSL Probes", deployCheck: true, traditionalSaaS: false, manualScripts: false },
  { feature: "Zero Proprietary Cloud Lock-in", deployCheck: true, traditionalSaaS: false, manualScripts: true },
];

export default function ProductPage() {
  return (
    <MarketingLayout breadcrumbs={meta.breadcrumbs}>
      {/* Page Hero */}
      <PageHero
        badge="Platform Architecture"
        title="One Unified Platform for Your Entire Deployment Lifecycle"
        description="DevSparks DeployCheck brings code audits, AI patch generation, Linux server operations, and website uptime telemetry into a single, cohesive developer workspace."
        primaryCta={{ label: "Get Started Free", href: "/signup" }}
        secondaryCta={{ label: "Explore Features", href: "/features/pre-deployment-audit" }}
      />

      {/* Product Modules Grid */}
      <FeatureSection
        eyebrow="CORE MODULES"
        title="Engineered for Autonomy, Reliability, and Control"
        description="Every DeployCheck module operates both independently and as part of an end-to-end continuous deployment loop."
        features={PRODUCT_MODULES}
        columns={3}
      />

      {/* 5-Step Workflow */}
      <WorkflowTimeline />

      {/* Feature Comparison Table */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
            WHY DEPLOYCHECK
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
            How DeployCheck Compares
          </h2>
          <p className="mt-2 text-sm text-[#667085]">
            Compare DeployCheck against black-box PaaS vendors and fragile manual bash scripts.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-slate-50/70 text-[#17172A]">
                <th className="py-3.5 px-4 sm:px-6 font-bold">Platform Capability</th>
                <th className="py-3.5 px-4 text-center font-extrabold text-[#5938F5] bg-purple-50/50">DeployCheck</th>
                <th className="py-3.5 px-4 text-center font-semibold text-slate-600">Traditional PaaS</th>
                <th className="py-3.5 px-4 text-center font-semibold text-slate-600">Manual Bash Scripts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#17172A]">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 sm:px-6 font-medium">{row.feature}</td>
                  <td className="py-3 px-4 text-center bg-purple-50/20">
                    {row.deployCheck ? (
                      <Check className="h-4 w-4 text-[#5938F5] mx-auto stroke-[2.5]" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.traditionalSaaS ? (
                      <Check className="h-4 w-4 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.manualScripts ? (
                      <Check className="h-4 w-4 text-emerald-600 mx-auto" />
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion />

      {/* Call to action */}
      <CTASection />
    </MarketingLayout>
  );
}

