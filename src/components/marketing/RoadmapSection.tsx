import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/common/GlowCard";

interface MilestonePhase {
  phase: string;
  title: string;
  period: string;
  status: "Completed" | "Active" | "Planned";
  progress: number;
  milestones: { id: string; title: string; desc: string; done: boolean }[];
}

const PHASES: MilestonePhase[] = [
  {
    phase: "Phase 1",
    title: "Core Engine & Sovereign Security",
    period: "Milestones M0 – M2",
    status: "Completed",
    progress: 100,
    milestones: [
      { id: "M0", title: "Monolith Architecture & Next.js Core", desc: "PostgreSQL schema, strict light design system, session auth.", done: true },
      { id: "M1", title: "Pre-deployment Static Audit Engine", desc: "150+ deterministic static CVE & secret scanning rules.", done: true },
      { id: "M2", title: "Approval-Gated BYOK AI Review", desc: "OpenRouter integration, AES-256 vault, structured diff review.", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Sovereign VPS & Release Automation",
    period: "Milestones M3 – M5",
    status: "Completed",
    progress: 100,
    milestones: [
      { id: "M3", title: "SSH VPS Server Fleet Manager", desc: "Host key verification (SHA-256) and live CPU/RAM telemetry.", done: true },
      { id: "M4", title: "Atomic Release Pipelines & Rollbacks", desc: "Preflight state machine, symlink releases, instant rollback.", done: true },
      { id: "M5", title: "Synthetic Uptime & SSL Telemetry", desc: "Continuous HTTP probes, TLS expiry monitoring, webhooks.", done: true },
    ],
  },
  {
    phase: "Phase 3",
    title: "Workspace Multi-Tenancy & Containers",
    period: "Milestones M6 – M7",
    status: "Active",
    progress: 65,
    milestones: [
      { id: "M6", title: "Tenant Isolation & Resource Quotas", desc: "PostgreSQL row-level workspace scoping & RBAC policy gates.", done: true },
      { id: "M7", title: "Container Registry Vulnerability Scans", desc: "Docker base image CVE scanning and container SBOM parsing.", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Edge Probes & Sovereign Cloud SaaS",
    period: "Milestones M8 – M9",
    status: "Planned",
    progress: 15,
    milestones: [
      { id: "M8", title: "Multi-Region Edge Synthetic Probes", desc: "Global latency probes from US, Europe, and Asia clusters.", done: false },
      { id: "M9", title: "DevSparks Cloud Managed SaaS", desc: "Zero-maintenance multi-tenant managed hosting with auto-scaling.", done: false },
    ],
  },
];

export function RoadmapSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#F7F8FC] border-y border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5938F5] text-[11px] font-bold uppercase tracking-wider mb-3">
              <Zap className="h-3 w-3 fill-[#5938F5]" />
              <span>Public Product Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172A] tracking-tight leading-tight">
              Transparent Engineering Milestones
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#667085] max-w-xl leading-relaxed">
              We build in the open with strict accountability. Every capability is verified against deterministic test suites before release.
            </p>
          </div>

          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5938F5] hover:text-[#4726DB] transition-colors shrink-0 group"
          >
            <span>View Full Roadmap</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Phase Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHASES.map((p) => {
            const isCompleted = p.status === "Completed";
            const isActive = p.status === "Active";

            return (
              <GlowCard
                key={p.phase}
                className="hover:shadow-lg transition-all duration-300 shadow-2xs group"
                innerClassName="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-extrabold text-[#5938F5] bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                      {p.phase} • {p.period}
                    </span>

                    <Badge
                      className={`text-[10px] font-bold uppercase py-0.5 px-2 gap-1 rounded-full ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : isActive
                          ? "bg-purple-50 text-[#5938F5] border-purple-200"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      {isCompleted && (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>Delivered</span>
                        </>
                      )}
                      {isActive && (
                        <>
                          <Zap className="h-3 w-3 text-[#5938F5] fill-[#5938F5]" />
                          <span>Active Engineering</span>
                        </>
                      )}
                      {!isCompleted && !isActive && (
                        <>
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span>Planned</span>
                        </>
                      )}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors mb-2">
                    {p.title}
                  </h3>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? "bg-[#16A34A]" : isActive ? "bg-[#5938F5]" : "bg-slate-300"
                      }`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>

                  {/* Milestones List */}
                  <div className="space-y-2.5">
                    {p.milestones.map((m) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5"
                      >
                        <div className="mt-0.5 shrink-0">
                          {m.done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                              {m.id}
                            </span>
                            <span className="text-xs font-bold text-[#17172A] truncate">
                              {m.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#667085] mt-1 leading-snug">
                            {m.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

