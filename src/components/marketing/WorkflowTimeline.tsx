"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  ShieldCheck,
  Sparkles,
  Rocket,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface WorkflowStep {
  step: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  detail: {
    heading: string;
    description: string;
    metrics: { label: string; value: string }[];
    codePreview?: string;
  };
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Connect Project",
    shortDesc: "Link your GitHub repository or local directory. Detects stack and Docker configs.",
    icon: FolderGit2,
    badge: "Instant Setup",
    detail: {
      heading: "Automated Stack & Dependency Discovery",
      description: "DeployCheck inspects your package manifest, detects frameworks (Next.js, Node.js, static sites), locates Dockerfiles, and establishes a secure isolated workspace.",
      metrics: [
        { label: "Supported Runtimes", value: "Node, Next.js, Bun" },
        { label: "Git Integration", value: "GitHub, GitLab, Local" },
        { label: "Configuration", value: "Zero Config Needed" },
      ],
      codePreview: "$ deploycheck init --repo github.com/my-org/web-service\n✓ Detected Next.js 15.5.29 App Router\n✓ Found valid package-lock.json and Dockerfile\n✓ Workspace scoped: ws_prod_alpha",
    },
  },
  {
    step: "02",
    title: "Pre-deployment Audit",
    shortDesc: "Deterministic static scanners uncover CVEs, exposed credentials, and missing env vars.",
    icon: ShieldCheck,
    badge: "150+ Invariants",
    detail: {
      heading: "Continuous Security & Architecture Verification",
      description: "Runs 150+ deterministic security checks before any code reaches servers. Scans for known CVEs, unpinned dependencies, exposed SSH keys, and unvalidated environment variables.",
      metrics: [
        { label: "CVE Database", value: "Daily Sync" },
        { label: "Secret Scanning", value: "Regex + Shannon Entropy" },
        { label: "Audit Readiness", value: "100/100 Score" },
      ],
      codePreview: "$ deploycheck audit --strict\n✓ Dependency Vulnerabilities: 0 High / 0 Critical\n✓ Secret Leak Scan: 0 Exposed API tokens\n✓ Architecture Verdict: READY FOR DEPLOYMENT",
    },
  },
  {
    step: "03",
    title: "Fix with AI (BYOK)",
    shortDesc: "Review structured patch proposals powered by your OpenRouter API key.",
    icon: Sparkles,
    badge: "Policy Controlled",
    detail: {
      heading: "Human-in-the-Loop AI Coding Assistant",
      description: "Explain errors and review proposed code diffs with your own OpenRouter AI key. Zero unrestricted shell runners; every code patch requires explicit human sign-off.",
      metrics: [
        { label: "AI Key Sovereignty", value: "BYOK Encrypted (AES-256)" },
        { label: "Execution Boundary", value: "Restricted Policy Sandbox" },
        { label: "Model Selection", value: "Claude 3.5, DeepSeek, GPT-4o" },
      ],
      codePreview: "PROPOSAL #14: Remediate input validation vulnerability\n- emailRegex.test(rawInput);\n+ isValidEmail(normalizedInput); // RFC 5321 bounded tokenization\n[Awaiting Human Approval] -> Click [Approve] to apply",
    },
  },
  {
    step: "04",
    title: "Guided Deployment",
    shortDesc: "Deploy to your own Linux VPS over SSH with automated preflight checks and rollbacks.",
    icon: Rocket,
    badge: "Zero Lock-In",
    detail: {
      heading: "Atomic Release Pipelines with Instant Rollbacks",
      description: "Deploy to your sovereign VPS infrastructure over SSH with SHA-256 host key fingerprinting, automated preflight checks, isolated builds, and verified rollback states.",
      metrics: [
        { label: "Target Infrastructure", value: "Ubuntu, Debian, Alpine VPS" },
        { label: "Downtime", value: "0 Seconds (Symlink Switch)" },
        { label: "Rollback Time", value: "< 500 ms" },
      ],
      codePreview: "$ deploycheck deploy --target vps-mumbai-01\n✓ Preflight host check passed (SHA256:7xK3...)\n✓ Running isolated production build: 11.8s\n✓ Release symlink switched: rev_42 -> active\n✓ Health check 200 OK: Deployment successful",
    },
  },
  {
    step: "05",
    title: "Continuous Telemetry",
    shortDesc: "Track live HTTP response latency, SSL certificate expiration, and DNS health.",
    icon: Activity,
    badge: "24/7 Probes",
    detail: {
      heading: "Synthetic Availability Monitoring & Incident Alerting",
      description: "Synthetic edge probes verify website responsiveness, TLS certificate validity, and DNS resolution 24/7. Immediate webhooks for Slack, Discord, and email prevent silent downtime.",
      metrics: [
        { label: "Probe Frequency", value: "Every 30 Seconds" },
        { label: "Global Latency", value: "42 ms Average" },
        { label: "Alert Dispatch", value: "Slack, Discord, Email" },
      ],
      codePreview: "TELEMETRY MONITOR: https://deploycheck.devsparks.com\n● Status: HTTP 200 OK (Latency: 42ms)\n● SSL Certificate: Valid (89 days remaining)\n● Incident Ledger: 0 Outages (100% 30-Day Uptime)",
    },
  },
];

export function WorkflowTimeline() {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const activeStep = WORKFLOW_STEPS[selectedStepIndex];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172A] tracking-tight leading-tight">
            From Code Commit to Production Telemetry in 5 Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#667085] leading-relaxed">
            Eliminate deployment surprises with a deterministic workflow designed specifically for modern developers and DevOps engineers.
          </p>
        </div>

        {/* 5-Step Connected Timeline Bar */}
        <div className="relative mb-10">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative z-10">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = idx === selectedStepIndex;

              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 flex flex-col justify-between cursor-pointer border ${
                    isSelected
                      ? "bg-white border-[#5938F5] ring-2 ring-[#5938F5]/20 shadow-md translate-y-[-2px]"
                      : "bg-[#F7F8FC] border-[#E5E7EB] hover:border-slate-300 hover:bg-white hover:shadow-2xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
                          isSelected
                            ? "bg-[#5938F5] text-white"
                            : "bg-purple-100 text-[#5938F5]"
                        }`}
                      >
                        Step {step.step}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {idx + 1} of 5
                      </span>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-all ${
                        isSelected
                          ? "bg-[#5938F5] text-white shadow-xs"
                          : "bg-white border border-slate-200 text-[#5938F5]"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    <h3
                      className={`text-sm font-bold leading-snug transition-colors ${
                        isSelected ? "text-[#5938F5]" : "text-[#17172A]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs text-[#667085] line-clamp-2 leading-relaxed">
                      {step.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    <span>{step.badge}</span>
                    {isSelected && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#5938F5]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detailed Preview Box */}
        <div className="rounded-2xl bg-[#F7F8FC] border border-[#E5E7EB] p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-100 text-[#5938F5] text-xs font-bold">
                <span>Step {activeStep.step} Details</span>
                <span>•</span>
                <span>{activeStep.badge}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-[#17172A] tracking-tight">
                {activeStep.detail.heading}
              </h4>

              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                {activeStep.detail.description}
              </p>

              {/* Metrics Pill Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {activeStep.detail.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-[#E5E7EB]">
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {m.label}
                    </span>
                    <span className="text-xs font-bold text-[#17172A] mt-0.5 block truncate">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Terminal / Preview Output */}
            <div className="lg:col-span-6">
              <div className="rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px] p-4 shadow-md space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="pl-1">deploycheck terminal runtime</span>
                  </div>
                  <span className="text-emerald-400 font-bold">LIVE STAGE</span>
                </div>
                <pre className="text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {activeStep.detail.codePreview}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
