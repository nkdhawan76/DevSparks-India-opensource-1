import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { Globe, Activity, CheckCircle2, AlertCircle } from "lucide-react";

const meta = getRouteMetadata("/features/multi-region-monitoring");

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

export default function MultiRegionMonitoringPage() {
  return (
    <MarketingLayout currentPath="/features/multi-region-monitoring">
      <PageHero
        badge="ROADMAP MILESTONE 8 (PLANNED)"
        badgeVariant="blue"
        title="Multi-Region Synthetic Probes & Edge Uptime"
        description="Planned capability: Global synthetic health probes dispatching tests from North America, Europe, and Asia-Pacific edge locations to detect regional latency anomalies."
        primaryAction={{
          label: "View Roadmap Milestones",
          href: "/roadmap",
        }}
        secondaryAction={{
          label: "View Single-Region Monitoring",
          href: "/features/website-monitoring",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-amber-900 mb-8 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold">Transparent Engineering Notice:</strong> In adherence to DevSparks DeployCheck Rule 3 (No Fabricated Data or Artificial Work), this capability is explicitly designated as <strong>Planned for Milestone 8</strong>. Our current live version provides single-region synthetic HTTP, SSL, and DNS monitoring with SSRF protection.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] mb-2">Planned: Edge Probe Nodes</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Dispatch simultaneous synthetic requests from distributed Cloudflare / AWS edge workers to pinpoint CDN propagation issues and geo-blocking.
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] mb-2">Planned: Geo-Latency Comparison</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Compare p50 and p95 latency percentiles across US East, Frankfurt, Singapore, and Mumbai regions in one unified latency ledger.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white border border-[#E5E7EB] rounded-2xl p-6">
          <h4 className="text-sm font-bold text-[#17172A] mb-3">Live Capabilities Available Today:</h4>
          <ul className="space-y-2 text-xs text-[#667085]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Single-region synthetic HTTP/HTTPS health checks with configurable intervals</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Automated TLS / SSL certificate expiry date watcher with alert thresholds</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Instant webhook dispatch on 2 consecutive probe failures</span>
            </li>
          </ul>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}

