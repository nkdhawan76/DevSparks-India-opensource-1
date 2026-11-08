import React from "react";
import { FolderGit2, ShieldCheck, Sparkles, Rocket, Activity } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Connect Project",
    description: "Link your GitHub repository or local directory. DeployCheck detects stack metadata and Docker configs automatically.",
    icon: FolderGit2,
    badge: "Instant Setup",
  },
  {
    step: "02",
    title: "Pre-deployment Audit",
    description: "Run deterministic static security scanners to find dependency vulnerabilities, exposed credentials, and missing env vars.",
    icon: ShieldCheck,
    badge: "150+ Invariants",
  },
  {
    step: "03",
    title: "Fix with AI (BYOK)",
    description: "Review structured patch proposals powered by your OpenRouter API key. Every edit requires explicit human approval.",
    icon: Sparkles,
    badge: "Policy Controlled",
  },
  {
    step: "04",
    title: "Guided Deployment",
    description: "Deploy to your own Linux VPS over SSH with automated preflight checks, isolated builds, and verified rollback runbooks.",
    icon: Rocket,
    badge: "Zero Lock-In",
  },
  {
    step: "05",
    title: "Continuous Telemetry",
    description: "Track live HTTP response latency, SSL certificate expiration, and DNS health with instant incident alerting.",
    icon: Activity,
    badge: "24/7 Probes",
  },
];

export function WorkflowTimeline() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
            From Code Commit to Production Telemetry in 5 Steps
          </h2>
          <p className="mt-3 text-sm text-[#667085] leading-relaxed">
            Eliminate deployment surprises with a deterministic workflow designed specifically for modern developers and DevOps engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-4 sm:p-5 rounded-2xl bg-[#F7F8FC] border border-[#E5E7EB] hover:border-[#5938F5]/40 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#5938F5] bg-purple-100 px-2 py-0.5 rounded-full">
                      Step {step.step}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {idx + 1} of 5
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-[#5938F5] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-[#5938F5] group-hover:text-white transition-all shadow-2xs">
                    <Icon className="h-4 w-4" />
                  </div>

                  <h3 className="text-sm font-bold text-[#17172A] leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#667085] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  {step.badge}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

