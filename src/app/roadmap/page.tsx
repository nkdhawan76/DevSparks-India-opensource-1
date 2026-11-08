import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Calendar } from "lucide-react";

const meta = getRouteMetadata("/roadmap");

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

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: "Completed" | "Planned";
  date: string;
  deliverables: string[];
}

const MILESTONES: Milestone[] = [
  {
    id: "M0",
    title: "Foundation & Architecture Specification",
    description: "Core architecture documents (ARD, PRD), Next.js 14 App Router monolith, strict light theme design tokens, and PostgreSQL schema migrations.",
    status: "Completed",
    date: "November 2026",
    deliverables: [
      "Modular monolith architecture blueprint (docs/ARD.md)",
      "Strict Light Theme Only token palette (#5938F5, #F7F8FC, #FFFFFF)",
      "Base database migrations with tenant workspace isolation",
      "Standardized REST /api/v1 response envelope",
    ],
  },
  {
    id: "M1",
    title: "Pre-deployment Static Audit Engine",
    description: "Source code scanner detecting vulnerable dependencies in package.json, exposed API secrets, missing environment variables, and stack heuristics.",
    status: "Completed",
    date: "November 2026",
    deliverables: [
      "Deterministic static scanner scripts/run-audit.mjs",
      "Regex secret detector (.env, AWS, OpenRouter, SSH keys)",
      "Dependency vulnerability severity breakdown (Critical, High, Warn)",
      "Automated exit codes for CI/CD pipeline gating",
    ],
  },
  {
    id: "M2",
    title: "Bring-Your-Own-Key (BYOK) AI Assistant",
    description: "Policy-guarded code analysis via OpenRouter API with unified diff proposal generator and mandatory human approval gate.",
    status: "Completed",
    date: "November 2026",
    deliverables: [
      "OpenRouter integration with BYOK key management",
      "Side-by-side git diff review dialog",
      "Strict policy runner restricting AI autonomy",
      "AES-256-GCM encrypted credential vault",
    ],
  },
  {
    id: "M3",
    title: "VPS Server Infrastructure & Telemetry",
    description: "SSH server connection manager with host fingerprint verification, live hardware metrics (CPU, RAM, Disk), and command allowlists.",
    status: "Completed",
    date: "November 2026",
    deliverables: [
      "Linux server node inventory with Ed25519 authentication",
      "Host key SHA-256 fingerprint verification",
      "Live hardware telemetry polling (CPU %, RAM MB, Disk %)",
      "Encrypted credential storage with zero plaintext leaks",
    ],
  },
  {
    id: "M4",
    title: "Guided Deployment Pipeline & Rollbacks",
    description: "Safe multi-step deployment runner using atomic symlinks, preflight verification, and instant single-click rollbacks.",
    status: "Completed",
    date: "November 2026",
    deliverables: [
      "Atomic symlink directory swapping for zero downtime",
      "Synthetic preflight process warmup and health verification",
      "Automated fallback to previous stable release on failure",
      "Deployment event log capture with secret token redaction",
    ],
  },
  {
    id: "M5",
    title: "Synthetic Website Monitoring & Alerts",
    description: "Configurable HTTP/HTTPS uptime probes, response latency benchmarking, TLS/SSL expiration monitoring, and webhook alert dispatches.",
    status: "Completed",
    date: "November 2026",
    deliverables: [
      "60-second to 30-minute configurable synthetic probe intervals",
      "SSL certificate expiration tracking and alert thresholds",
      "SSRF guards blocking private IP ranges (RFC 1918, localhost)",
      "Webhook alert dispatcher with 2-failure threshold",
    ],
  },
  {
    id: "M6",
    title: "Workspaces, Multi-Tenancy & RBAC",
    description: "Team workspaces, role-based access control (Super Admin, Admin, Developer), resource quotas, and audit log history.",
    status: "Completed",
    date: "November 2026",
    deliverables: [
      "Tenant workspace scoping on all database queries",
      "Granular RBAC role enforcement server-side",
      "Audit history tracking with immutable logs",
      "Multi-workspace developer management",
    ],
  },
  {
    id: "M7",
    title: "Container Registry Scanning (Planned)",
    description: "Planned capability: Scan container base images (Alpine, Debian), multi-stage Dockerfiles, and generate container SBOMs.",
    status: "Planned",
    date: "Target: Q1 2027",
    deliverables: [
      "Docker base image CVE scanning against NVD databases",
      "Multi-stage Dockerfile security linting",
      "Software Bill of Materials (SBOM) generation",
      "Container registry webhook triggers (Docker Hub, GHCR)",
    ],
  },
  {
    id: "M8",
    title: "Multi-Region Probes & Edge Latency (Planned)",
    description: "Planned capability: Global synthetic uptime probes dispatching tests from North America, Europe, and Asia-Pacific edge locations.",
    status: "Planned",
    date: "Target: Q2 2027",
    deliverables: [
      "Edge probe network across US, EU, and APAC",
      "Geo-latency comparison ledgers (p50, p95)",
      "Global CDN propagation validation",
      "Regional incident root cause diagnosis",
    ],
  },
  {
    id: "M9",
    title: "DevSparks Cloud Managed SaaS (Planned)",
    description: "Planned capability: Zero-ops fully managed multi-tenant hosting with automated scaling, automated backups, and dedicated enterprise support.",
    status: "Planned",
    date: "Target: Q3 2027",
    deliverables: [
      "Zero-configuration managed cloud hosting",
      "Automated cross-region database backups",
      "Custom domain SSL termination with auto-renewals",
      "Enterprise SLA and 24/7 dedicated support",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <MarketingLayout currentPath="/roadmap">
      <PageHero
        badge="TRANSPARENT PRODUCT ROADMAP"
        badgeVariant="blue"
        title="DeployCheck Public Roadmap & Engineering Milestones"
        description="We believe in transparent engineering. Follow our verified milestone progress from M0 Foundation to M9 Cloud Managed SaaS with zero fabricated claims."
        primaryAction={{
          label: "Read Changelog",
          href: "/changelog",
        }}
        secondaryAction={{
          label: "Star on GitHub",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
      />

      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {MILESTONES.map((m) => (
            <div
              key={m.id}
              className={`bg-white border rounded-2xl p-6 sm:p-7 shadow-xs transition-all ${
                m.status === "Completed"
                  ? "border-[#E5E7EB] hover:border-[#5938F5]/40"
                  : "border-slate-200/80 bg-slate-50/40 opacity-90"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-slate-100 text-[#17172A]">
                    {m.id}
                  </span>
                  <h3 className="text-base font-bold text-[#17172A]">{m.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#667085] flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{m.date}</span>
                  </span>
                  <Badge
                    variant={m.status === "Completed" ? "success" : "secondary"}
                    className="text-xs"
                  >
                    {m.status}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-[#667085] leading-relaxed mb-4">{m.description}</p>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Deliverables &amp; Invariants:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {m.deliverables.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-[#17172A] bg-[#F7F8FC] p-2.5 rounded-xl border border-slate-200/50"
                    >
                      {m.status === "Completed" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}

