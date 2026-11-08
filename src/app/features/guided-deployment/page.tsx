import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Rocket,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/features/guided-deployment");

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

const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Preflight Audit",
    desc: "Deterministic verification of package dependencies, uncommitted secrets, missing env variables, and lockfile consistency before code touches production.",
  },
  {
    step: "02",
    title: "Isolated Build Runner",
    desc: "Clean build execution with strict policy constraints, resource isolation, and explicit terminal log capture with sensitive token redaction.",
  },
  {
    step: "03",
    title: "Health Probe & Switch",
    desc: "Target server synthetic HTTP ping checks ensure the new release is listening, serving 200 OK responses, and healthy before traffic routes.",
  },
  {
    step: "04",
    title: "Instant One-Click Rollback",
    desc: "State machine retains the previous verified release directory. If probes fail or errors spike, rollback restores the previous healthy release in seconds.",
  },
];

const GUIDED_FAQS: FAQItem[] = [
  {
    question: "How does DeployCheck prevent deployment downtime?",
    answer:
      "DeployCheck uses atomic directory symlinks on your target VPS. The new release is built and verified alongside the current active release. Traffic switches only after synthetic health probes return 200 OK.",
  },
  {
    question: "What happens if a deployment fails halfway?",
    answer:
      "If build or health checks fail, the deployment state machine automatically marks the run as FAILED and maintains the existing active release without switching symlinks, ensuring zero user-facing disruption.",
  },
  {
    question: "Can I trigger rollbacks manually?",
    answer:
      "Yes. Every completed deployment record includes an explicit 'Rollback to this Release' action in the Deployments dashboard, restoring the previous stable symlink in seconds.",
  },
];

export default function GuidedDeploymentPage() {
  return (
    <MarketingLayout currentPath="/features/guided-deployment">
      <PageHero
        badge="SAFE RELEASE PIPELINES"
        badgeVariant="success"
        title="Deploy apps with guided workflows and zero-downtime rollbacks"
        description="Ship applications to your Linux VPS with confidence. Deterministic preflight checks, isolated builds, atomic symlink switches, and instant rollbacks protect production."
        primaryAction={{
          label: "Try Deployment Workflows",
          href: "/signup",
        }}
        secondaryAction={{
          label: "View Server Setup",
          href: "/features/vps-management",
        }}
      />

      {/* Pipeline Architecture Grid */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
            RELEASE STATE MACHINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
            How DeployCheck executes safe releases
          </h2>
          <p className="text-sm text-[#667085] mt-2">
            No fragile shell scripts. Every deployment follows a verified 4-step state machine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PIPELINE_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black text-[#5938F5] block mb-3 font-mono">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-[#17172A] mb-2">{step.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#16A34A]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Deterministic Safety</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Terminal Pipeline Preview */}
      <section className="py-12 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#17172A] text-slate-100 rounded-2xl p-6 shadow-xl border border-slate-800 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs ml-2 text-slate-300">deploycheck-pipeline-runner --target production</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">STATE: HEALTHY_VERIFIED</span>
            </div>
            <pre className="text-slate-300 leading-relaxed">
{`[00:01.04] PREFLIGHT: Running static audit on repo commit 3b5ea43...
[00:01.89] AUDIT: 0 critical vulnerabilities, 0 uncommitted secrets detected.
[00:02.12] BUILD: Executing npm run build in isolated runner workspace...
[00:08.45] BUILD: Next.js App Router static optimization complete (32 pages).
[00:09.10] STAGE: Copying release assets to /var/www/deploycheck/releases/20261108-1630...
[00:09.84] PROBE: Testing synthetic HTTP ping on http://127.0.0.1:3000/api/v1/health...
[00:10.02] PROBE: Received HTTP 200 OK (latency: 18ms). Verification PASSED.
[00:10.15] SWITCH: Updating active symlink /var/www/deploycheck/current -> 20261108-1630.
[00:10.22] SUCCESS: Release successfully deployed to 2 VPS targets with 0 downtime.`}
            </pre>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
              <Rocket className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] mb-2">Atomic Symlink Switching</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Never serve partial or corrupted files. The symlink switches in milliseconds only after your target process has passed warmup and health probes.
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] flex items-center justify-center mb-4">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] mb-2">Instant Rollback Safety</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              If an uncaught regression occurs in production, trigger one-click rollback to immediately repoint traffic to the previous healthy release directory.
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] mb-2">Policy Restricted Execution</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Commands execute inside strict policy runners. Sensitive keys are redacted automatically from execution logs and output transcripts.
            </p>
          </div>
        </div>
      </section>

      <FAQAccordion items={GUIDED_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}
