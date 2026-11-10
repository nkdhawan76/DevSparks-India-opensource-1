import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/common/GlowCard";

interface Milestone {
  id: string;
  title: string;
  desc: string;
  status: "Completed" | "Active" | "Planned";
}

const MILESTONES: Milestone[] = [
  {
    id: "M0",
    title: "Monolith Architecture & Next.js Core",
    desc: "PostgreSQL schema, strict light design system, secure session authentication.",
    status: "Completed",
  },
  {
    id: "M1",
    title: "Pre-deployment Static Audit Engine",
    desc: "150+ deterministic static CVE rules, package.json vulnerabilities, secret regex scanning.",
    status: "Completed",
  },
  {
    id: "M2",
    title: "Structured BYOK AI Patch Review",
    desc: "OpenRouter client integration, AES-256 encrypted vault, human-in-the-loop approval gate.",
    status: "Completed",
  },
  {
    id: "M3",
    title: "Sovereign VPS Server Fleet Manager",
    desc: "SSH host verification (SHA-256 fingerprint), encrypted credential vault, server metrics.",
    status: "Completed",
  },
  {
    id: "M4",
    title: "Atomic Release Pipelines & Rollbacks",
    desc: "Preflight state machine, release runbooks, atomic Linux symlink switching with instant rollback.",
    status: "Completed",
  },
  {
    id: "M5",
    title: "Synthetic Uptime & SSL Telemetry",
    desc: "Continuous HTTP status probes, SSL certificate expiration watcher, incident alerting webhooks.",
    status: "Completed",
  },
  {
    id: "M6",
    title: "Multi-Tenant Workspace Isolation",
    desc: "PostgreSQL row-level workspace scoping, RBAC permissions, audit history, resource quotas.",
    status: "Active",
  },
  {
    id: "M7",
    title: "Container Registry Vulnerability Scans",
    desc: "Docker base image CVE scanning, multi-stage inspection, container SBOM generation.",
    status: "Active",
  },
  {
    id: "M8",
    title: "Multi-Region Edge Synthetic Probes",
    desc: "Global latency and uptime probes from US, Europe, and Asia clusters with incident escalation.",
    status: "Planned",
  },
  {
    id: "M9",
    title: "DevSparks Cloud Managed SaaS",
    desc: "Zero-maintenance multi-tenant managed hosting with auto-scaling and enterprise governance.",
    status: "Planned",
  },
];

export function RoadmapSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#F7F8FC] border-y border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
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

        {/* 10 Milestone Cards in a 3-Column Grid with Cursor Outer Line Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MILESTONES.map((item) => {
            const isCompleted = item.status === "Completed";
            const isActive = item.status === "Active";

            return (
              <GlowCard
                key={item.id}
                className="hover:shadow-lg transition-all duration-300 shadow-2xs group"
                innerClassName="p-5 sm:p-6 flex flex-col justify-between"
                glowColor={isCompleted ? "#5938F5" : isActive ? "#3563E9" : "#94A3B8"}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-extrabold text-[#5938F5] bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                      {item.id}
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
                          <span>In Review</span>
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

                  <h3 className="text-sm sm:text-[15px] font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#667085] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>Target: Q1–Q2 2026</span>
                  <span className={`font-semibold ${isCompleted ? "text-emerald-600" : isActive ? "text-[#5938F5]" : "text-slate-400"}`}>
                    {isCompleted ? "100% Verified" : isActive ? "Active Build" : "Scheduled"}
                  </span>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
