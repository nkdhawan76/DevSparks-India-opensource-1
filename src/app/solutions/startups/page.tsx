import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Building2,
  DollarSign,
  Rocket,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/solutions/startups");

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

const STARTUP_PILLARS = [
  {
    title: "Cut Cloud PaaS Bills by 80%",
    desc: "Host your Next.js and Node.js applications on affordable $10-$40 VPS instances instead of paying escalating PaaS seat and bandwidth penalties.",
    icon: DollarSign,
  },
  {
    title: "Zero Dedicated DevOps Headcount",
    desc: "Get automated pre-deployment sanity checks, atomic symlink zero-downtime releases, and automated SSL renewals without hiring a dedicated DevOps engineer.",
    icon: Building2,
  },
  {
    title: "Continuous Production Confidence",
    desc: "Catch bad commits and security vulnerabilities before release. Synthetic probes notify you of downtime before customers tweet about it.",
    icon: Rocket,
  },
  {
    title: "Enterprise AppSec from Day One",
    desc: "AES-256 encrypted secrets, policy-restricted runners, and OWASP-aligned security scans build trust with your early enterprise buyers.",
    icon: ShieldCheck,
  },
];

const STARTUP_FAQS: FAQItem[] = [
  {
    question: "Can an early-stage startup run DeployCheck on one server?",
    answer:
      "Yes. DeployCheck's modular monolith architecture runs comfortably on a modest 1-2 vCPU server alongside your database, requiring minimal resources.",
  },
  {
    question: "How easily can we scale as our traffic grows?",
    answer:
      "DeployCheck manages multiple servers independently. As you scale, simply connect additional VPS nodes or separate your database without re-architecting your deployment pipelines.",
  },
];

export default function StartupsSolutionPage() {
  return (
    <MarketingLayout currentPath="/solutions/startups">
      <PageHero
        badge="FOR LEAN STARTUPS & FOUNDERS"
        badgeVariant="success"
        title="Ship fast with enterprise deployment safety and zero PaaS tax"
        description="Build and scale your product without draining your runway on proprietary cloud platforms. Run your apps on sovereign VPS hardware with automated audits and rollbacks."
        primaryAction={{
          label: "Deploy Your Startup",
          href: "/signup",
        }}
        secondaryAction={{
          label: "Explore Pricing",
          href: "/pricing",
        }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STARTUP_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17172A] mb-2">{p.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#16A34A]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Runway Preserving</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FAQAccordion items={STARTUP_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}
