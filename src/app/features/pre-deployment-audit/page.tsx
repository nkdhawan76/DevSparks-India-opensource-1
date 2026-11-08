import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Package,
  Key,
  FileCode2,
  Box,
  AlertTriangle,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const meta = getRouteMetadata("/features/pre-deployment-audit");

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

const AUDIT_CHECKS = [
  {
    title: "Dependency & CVE Vulnerability Checks",
    desc: "Parses package.json and lockfiles to discover known vulnerabilities, outdated dependencies, and dangerous nested packages without requiring network egress.",
    icon: Package,
  },
  {
    title: "Hardcoded Secret & API Key Detection",
    desc: "Uses high-entropy heuristic regexes to uncover private SSH keys, AWS access tokens, GitHub PATs, and OpenAI/OpenRouter keys mistakenly committed into source code.",
    icon: Key,
  },
  {
    title: "Environment Variable Validation",
    desc: "Cross-references your code's process.env requirements against your production .env templates to catch missing runtime variables before crashes occur.",
    icon: FileCode2,
  },
  {
    title: "Docker & Container Configuration Checks",
    desc: "Lints Dockerfile syntax, checks for root user execution, non-deterministic latest tags, and exposed sensitive daemon ports.",
    icon: Box,
  },
];

const AUDIT_FAQS: FAQItem[] = [
  {
    question: "How long does a pre-deployment audit take?",
    answer: "Audits are executed statically and deterministically, scanning typical repositories (150+ files) in under 1.5 seconds.",
  },
  {
    question: "Can I run the audit engine from my terminal or CI/CD?",
    answer: "Yes. You can execute `node scripts/run-audit.mjs` locally or in GitHub Actions. It outputs structured JSON and standard exit codes (0 for pass, 1 for critical findings).",
  },
  {
    question: "Does the audit scanner upload my source code to external servers?",
    answer: "No. The static analysis scanner runs completely locally within your self-hosted DeployCheck environment. No code files are uploaded or transmitted to external AI providers during scanning.",
  },
];

export default function PreDeploymentAuditPage() {
  return (
    <MarketingLayout breadcrumbs={meta.breadcrumbs}>
      <PageHero
        badge="Zero-Vulnerability Gate"
        title="Stop Bugs, Leaked Secrets, and Missing Configs Before Production"
        description="DeployCheck's deterministic static analysis scanner inspects your application stack, packages, Dockerfiles, and secrets to calculate an accurate production readiness score."
        primaryCta={{ label: "Run Your First Audit", href: "/signup" }}
        secondaryCta={{ label: "View API Specification", href: "/docs/api" }}
      />

      {/* 4 Core Scanners */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
            DETECTION CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
            Comprehensive Static Inspection Engine
          </h2>
          <p className="mt-3 text-sm text-[#667085]">
            Four specialized scanners analyze your project before any build command or deployment workflow is initiated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AUDIT_CHECKS.map((check) => {
            const Icon = check.icon;
            return (
              <div
                key={check.title}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#17172A]">{check.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {check.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Simulated Live Audit Terminal Report */}
      <section className="py-12 sm:py-16 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
              VERIFIABLE OUTPUT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
              Deterministic Terminal & UI Telemetry
            </h2>
            <p className="mt-2 text-sm text-[#667085]">
              Every audit produces both human-readable UI summaries and machine-readable JSON logs for CI/CD pipelines.
            </p>
          </div>

          <div className="rounded-2xl bg-[#17172A] text-slate-100 p-5 sm:p-6 font-mono text-xs shadow-xl ring-1 ring-slate-800 space-y-2 overflow-x-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-300 font-bold">deploycheck-audit-engine v1.3.0</span>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                EXIT CODE 0
              </Badge>
            </div>

            <p className="text-slate-400">📁 Ingested 158 project files for static inspection...</p>
            <p className="text-purple-300">📦 Stack: Node.js 20 • Next.js 14 (App Router) • TypeScript • npm</p>
            <p className="text-slate-400">────────────────────────────────────────────────────────────────</p>
            <p className="text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Zero hardcoded private keys or plain text credentials found.</span>
            </p>
            <p className="text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>All 14 required environment variables verified against schema.</span>
            </p>
            <p className="text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>Advisory: Docker base image alpine:latest should pin exact digest.</span>
            </p>
            <p className="text-slate-400">────────────────────────────────────────────────────────────────</p>
            <p className="text-slate-200 font-bold">
              Readiness Score: <span className="text-emerald-400">100 / 100 — APPROVED FOR DEPLOYMENT</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={AUDIT_FAQS} title="Pre-deployment Audit FAQ" />

      {/* CTA */}
      <CTASection
        title="Run pre-deployment audits on your repositories today"
        description="Integrate DeployCheck audit into your local developer workflow or GitHub Actions pipeline with zero lock-in."
      />
    </MarketingLayout>
  );
}
