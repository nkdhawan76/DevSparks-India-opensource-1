import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  GitPullRequest,
  GitBranch,
  Terminal,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/contribute");

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

const CONTRIBUTION_STEPS = [
  {
    step: "01",
    title: "Fork & Create Topic Branch",
    desc: "Fork the repository and branch from main using our branch standard (e.g. feat/new-scanner, fix/auth-token).",
    code: "git checkout -b feat/my-improvement",
    icon: GitBranch,
  },
  {
    step: "02",
    title: "Implement with Evidence-Based Engineering",
    desc: "Follow the 6-step delivery workflow: Understand, Implement, Test, Fix, Review, and Deliver. Preserve strict Light Theme (#5938F5, #F7F8FC).",
    code: "npm run dev # Verify changes locally at http://localhost:3000",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Pass All Local Verification Suites",
    desc: "Your PR must pass TypeScript checks, zero-warning ESLint, and all deterministic verification suites before submitting.",
    code: "npm run typecheck && npx eslint . --ext .ts,.tsx --max-warnings 0 && node scripts/verify-mvp.mjs",
    icon: Terminal,
  },
  {
    step: "04",
    title: "Format Commits & Open Pull Request",
    desc: "Use Conventional Commits (feat(audit): description, fix(auth): description). Open your PR against main for automated CI checks.",
    code: "git commit -m \"feat(audit): add docker-compose validator\"",
    icon: GitPullRequest,
  },
];

export default function ContributePage() {
  return (
    <MarketingLayout currentPath="/contribute">
      <PageHero
        badge="OPEN SOURCE CONTRIBUTIONS"
        badgeVariant="blue"
        title="Contributing to DevSparks DeployCheck"
        description="We welcome community contributions, bug fixes, stack detectors, and documentation enhancements. Follow our engineering standards to get your pull request reviewed and merged."
        primaryAction={{
          label: "View GitHub Repo",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
        secondaryAction={{
          label: "Read Engineering Standards",
          href: "/docs",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          {CONTRIBUTION_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center font-black font-mono text-base shrink-0 border border-purple-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#5938F5]">{s.step}</span>
                      <h3 className="text-base font-bold text-[#17172A]">{s.title}</h3>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed mb-4">{s.desc}</p>

                    <div className="bg-[#17172A] text-slate-200 rounded-xl p-3.5 font-mono text-xs overflow-x-auto">
                      <pre className="text-purple-300 leading-relaxed">{s.code}</pre>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Non-Negotiable Standards Notice */}
        <div className="mt-10 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
          <h4 className="text-sm font-bold text-[#17172A] mb-3">Core Contribution Invariants:</h4>
          <ul className="space-y-2.5 text-xs text-[#667085]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span><strong>Strict Light Theme Only:</strong> Do not add dark surfaces, dark mode tokens, or theme toggles.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span><strong>Zero ESLint Warnings:</strong> All pull requests must pass <code className="font-mono bg-slate-100 px-1 rounded text-[#17172A]">--max-warnings 0</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span><strong>No Fabricated Data:</strong> Test suites must execute real checks against actual schemas. No mocked green passes.</span>
            </li>
          </ul>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}

