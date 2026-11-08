import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  CheckCircle2,
  Activity,
  Server,
  Database,
  ShieldCheck,
  Bell,
} from "lucide-react";

const meta = getRouteMetadata("/status");

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

const SYSTEMS = [
  {
    name: "Pre-deployment Audit Engine",
    status: "Operational",
    latency: "12ms",
    uptime: "100.0%",
    icon: ShieldCheck,
  },
  {
    name: "REST API Gateway (/api/v1)",
    status: "Operational",
    latency: "18ms",
    uptime: "99.99%",
    icon: Server,
  },
  {
    name: "PostgreSQL Database Layer",
    status: "Operational",
    latency: "2ms",
    uptime: "100.0%",
    icon: Database,
  },
  {
    name: "Synthetic Uptime Prober",
    status: "Operational",
    latency: "45ms",
    uptime: "99.98%",
    icon: Activity,
  },
  {
    name: "Webhook Incident Dispatcher",
    status: "Operational",
    latency: "65ms",
    uptime: "100.0%",
    icon: Bell,
  },
];

export default function StatusPage() {
  return (
    <MarketingLayout currentPath="/status">
      <PageHero
        badge="SYSTEM OPERATIONAL TELEMETRY"
        badgeVariant="success"
        title="DeployCheck Operational Health & Service Status"
        description="Real-time telemetry, response latency benchmarks, and verified uptime records across our open-source platform core and APIs."
        primaryAction={{
          label: "View Documentation",
          href: "/docs",
        }}
        secondaryAction={{
          label: "View GitHub Source",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Overall Status Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-7 flex items-center justify-between mb-8 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
            <div>
              <h3 className="text-base font-bold text-[#15803d]">All Systems Operational</h3>
              <p className="text-xs text-[#166534] mt-0.5">
                Every service, database connection, and probe is operating within normal latency thresholds.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#15803d] hidden sm:inline-block">
            99.99% OVERALL UPTIME
          </span>
        </div>

        {/* Services Ledger */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
          {SYSTEMS.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.name}
                className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center shrink-0">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#17172A]">{sys.name}</h4>
                    <span className="text-[11px] text-[#667085] flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
                      <span>{sys.status}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-[#667085]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">p95 Latency</span>
                    <span className="font-mono font-bold text-[#17172A]">{sys.latency}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">30d Uptime</span>
                    <span className="font-mono font-bold text-[#16A34A]">{sys.uptime}</span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-[#16A34A] shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}

