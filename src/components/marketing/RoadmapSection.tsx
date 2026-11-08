import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MILESTONES = [
  { id: "M0", title: "Foundation & Architecture", desc: "Monolith core, Next.js 14, PostgreSQL schema, strict light design system.", status: "Completed" },
  { id: "M1", title: "Pre-deployment Audit Engine", desc: "Static security analysis, package.json vulnerabilities, secret regex detection.", status: "Completed" },
  { id: "M2", title: "BYOK AI Assistance", desc: "OpenRouter client integration, diff viewer, human approval safety gate.", status: "Completed" },
  { id: "M3", title: "VPS Server Connections", desc: "SSH host verification, encrypted credential vault, live server inventory.", status: "Completed" },
  { id: "M4", title: "Guided Deployment Pipeline", desc: "Preflight state machine, release runbooks, automated rollback logic.", status: "Completed" },
  { id: "M5", title: "Synthetic Monitoring", desc: "HTTP status checks, SSL expiration watcher, incident alerting webhooks.", status: "Completed" },
  { id: "M6", title: "Workspace & Resource Quotas", desc: "RBAC permissions, audit history, project limits, enterprise tiers.", status: "Completed" },
  { id: "M7", title: "Container Registry Scanning", desc: "Docker base image CVE scanning, multi-stage inspection, container SBOMs.", status: "Planned" },
  { id: "M8", title: "Multi-Region Probes", desc: "Global synthetic uptime monitoring from US, EU, and APAC edge locations.", status: "Planned" },
  { id: "M9", title: "DevSparks Cloud Managed SaaS", desc: "Zero-ops fully managed multi-tenant hosting with automated scaling.", status: "Planned" },
];

export function RoadmapSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#F7F8FC] border-y border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
              PUBLIC ROADMAP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
              Transparent Engineering Milestones
            </h2>
            <p className="mt-2 text-sm text-[#667085] max-w-xl leading-relaxed">
              We build in the open. Every capability is verified against our deterministic engineering test suite before being marked complete.
            </p>
          </div>

          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5938F5] hover:text-[#4726DB] transition-colors shrink-0"
          >
            <span>View Full Roadmap</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MILESTONES.map((item) => {
            const isCompleted = item.status === "Completed";

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl bg-white border border-[#E5E7EB] hover:border-slate-300 shadow-2xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <Badge
                      variant={isCompleted ? "default" : "outline"}
                      className={`text-[9.5px] py-0 px-1.5 h-4 font-semibold gap-1 ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                          <span>Delivered</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-2.5 w-2.5 text-slate-400" />
                          <span>Planned</span>
                        </>
                      )}
                    </Badge>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#17172A] leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[11px] sm:text-xs text-[#667085] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
