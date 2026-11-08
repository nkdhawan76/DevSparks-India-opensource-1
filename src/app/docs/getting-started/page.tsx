import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  ShieldCheck,
  Server,
  ArrowRight,
} from "lucide-react";

const meta = getRouteMetadata("/docs/getting-started");

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

const STEPS = [
  {
    step: "01",
    title: "Clone Repository & Install Dependencies",
    desc: "Clone the official open-source repository and install the verified packages using npm.",
    command: `git clone https://github.com/nkdhawan76/DevSparks-India-opensource-1.git\ncd DevSparks-India-opensource-1\nnpm install`,
  },
  {
    step: "02",
    title: "Configure Environment Variables",
    desc: "Copy the template environment file and set your secure session secret and optional database credentials.",
    command: `cp .env.example .env\n# Update SESSION_SECRET and ENCRYPTION_MASTER_KEY in .env`,
  },
  {
    step: "03",
    title: "Execute Database Schema Migrations",
    desc: "Apply the forward PostgreSQL schema migrations to create tenants, users, server vaults, and audit tables.",
    command: `node scripts/migrate.mjs`,
  },
  {
    step: "04",
    title: "Run Deterministic Pre-Deployment Audit",
    desc: "Test the static security and dependency scanner on your local repository to verify everything is green.",
    command: `node scripts/run-audit.mjs\n# Output: Readiness Score: READY FOR DEPLOYMENT (0 critical findings)`,
  },
  {
    step: "05",
    title: "Launch Development Server",
    desc: "Start the Next.js development server and navigate to http://localhost:3000 to access the platform.",
    command: `npm run dev\n# Ready in 1200ms at http://localhost:3000`,
  },
];

export default function GettingStartedPage() {
  return (
    <MarketingLayout currentPath="/docs/getting-started">
      <PageHero
        badge="STEP-BY-STEP QUICKSTART"
        badgeVariant="purple"
        title="Get DeployCheck running locally in under 5 minutes"
        description="Follow this step-by-step developer tutorial to clone the repository, configure environment variables, run schema migrations, and execute your first pre-deployment audit."
        primaryAction={{
          label: "View API Reference",
          href: "/docs/api",
        }}
        secondaryAction={{
          label: "Explore GitHub Source",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs relative"
            >
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center font-black font-mono text-base shrink-0 border border-purple-100">
                  {s.step}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#17172A] mb-1">{s.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed mb-4">{s.desc}</p>

                  <div className="bg-[#17172A] text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto relative">
                    <pre className="text-purple-300 leading-relaxed">{s.command}</pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps Card */}
        <div className="mt-10 bg-gradient-to-br from-purple-50/50 to-indigo-50/30 border border-purple-200/60 rounded-2xl p-6 sm:p-8">
          <h4 className="text-base font-bold text-[#17172A] mb-2">What&apos;s Next?</h4>
          <p className="text-xs text-[#667085] leading-relaxed mb-6">
            Now that your local environment is running, connect your Linux VPS server or link an OpenRouter API key to test human-in-the-loop AI assistance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/features/vps-management"
              className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:border-[#5938F5] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Server className="h-5 w-5 text-[#5938F5]" />
                <span className="text-xs font-bold text-[#17172A]">Connect Linux VPS</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/features/pre-deployment-audit"
              className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:border-[#5938F5] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#16A34A]" />
                <span className="text-xs font-bold text-[#17172A]">Audit Your Codebase</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
