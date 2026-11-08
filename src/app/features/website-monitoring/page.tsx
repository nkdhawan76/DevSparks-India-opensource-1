import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Activity,
  Lock,
  Globe,
  Bell,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const meta = getRouteMetadata("/features/website-monitoring");

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

const MONITORING_PILLARS = [
  {
    title: "Synthetic Uptime Probes",
    desc: "Automated HTTP and HTTPS health probes running on regular intervals to detect latency regressions, HTTP 5xx errors, and connection timeouts.",
    icon: Activity,
  },
  {
    title: "SSL / TLS Expiry Tracking",
    desc: "Continuous certificate inspection tracking remaining validity days, issuer verification, and timely alerts before certificates expire.",
    icon: Lock,
  },
  {
    title: "DNS Resolution Health",
    desc: "Verify DNS records (A, AAAA, CNAME) resolve accurately and detect misconfigurations or propagation lag following infrastructure updates.",
    icon: Globe,
  },
  {
    title: "Instant Incident Webhooks",
    desc: "Dispatch instant notifications via webhooks, Slack, Discord, and email the moment a probe detects consecutive failures.",
    icon: Bell,
  },
];

const MONITORING_FAQS: FAQItem[] = [
  {
    question: "What probe intervals are supported?",
    answer:
      "DeployCheck supports configurable probe frequencies from 60 seconds up to 30 minutes, allowing developers to balance detection speed with server load.",
  },
  {
    question: "Does DeployCheck protect against SSRF when monitoring internal targets?",
    answer:
      "Yes. DeployCheck enforces strict SSRF guards that validate destination URLs, resolve DNS, and block private IP address ranges (RFC 1918, localhost, link-local) from untrusted triggers.",
  },
  {
    question: "Can I receive alerts in Slack or Discord?",
    answer:
      "Yes. Webhook alert dispatch allows seamless integration with Slack, Discord, PagerDuty, or custom webhook endpoints with structured JSON payloads.",
  },
];

export default function WebsiteMonitoringPage() {
  return (
    <MarketingLayout currentPath="/features/website-monitoring">
      <PageHero
        badge="UPTIME & RELIABILITY"
        badgeVariant="purple"
        title="Real-time website monitoring and SSL certificate intelligence"
        description="Never find out your website is down from your users. Continuous synthetic probes, SSL expiry tracking, response time benchmarking, and incident alerts keep production reliable."
        primaryAction={{
          label: "Start Monitoring Endpoints",
          href: "/signup",
        }}
        secondaryAction={{
          label: "Explore Features",
          href: "/product",
        }}
      />

      {/* 4 Pillars Grid */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MONITORING_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17172A] mb-2">{pillar.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#5938F5]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Always Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Probe Telemetry Preview Card */}
      <section className="py-12 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F7F8FC] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#16A34A] animate-pulse" />
                <span className="text-sm font-bold text-[#17172A]">Production Target: https://api.devsparks.com</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-[#15803d]">
                99.98% 30-Day Uptime
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-3">
                <div className="text-[11px] text-[#667085]">HTTP Status</div>
                <div className="text-lg font-bold text-[#16A34A] mt-0.5">200 OK</div>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-3">
                <div className="text-[11px] text-[#667085]">Response Time</div>
                <div className="text-lg font-bold text-[#17172A] mt-0.5">42 ms</div>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-3">
                <div className="text-[11px] text-[#667085]">TLS / SSL Valid</div>
                <div className="text-lg font-bold text-[#5938F5] mt-0.5">74 Days</div>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-3">
                <div className="text-[11px] text-[#667085]">Probe Interval</div>
                <div className="text-lg font-bold text-[#17172A] mt-0.5">60s</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#667085]">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-[#F59E0B]" />
                <span>Zero false positive threshold (requires 2 consecutive failures)</span>
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Region: Primary Probe</span>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion items={MONITORING_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}

