import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

const meta = getRouteMetadata("/pricing");

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

const TIERS = [
  {
    name: "Community Core",
    price: "$0",
    period: "Free Forever",
    badge: "MIT License",
    badgeVariant: "secondary" as const,
    description: "Full self-hosted platform sovereignty for independent developers and builders.",
    features: [
      "Full source code under MIT License",
      "Unlimited self-hosted projects",
      "Unlimited connected SSH VPS servers",
      "Bring Your Own Key (BYOK) AI diffs",
      "Deterministic pre-deployment audit engine",
      "Atomic zero-downtime release pipelines",
      "Single-region synthetic uptime monitoring",
      "Community GitHub Discussions support",
    ],
    cta: "Clone on GitHub",
    href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
    featured: false,
  },
  {
    name: "Team Self-Hosted",
    price: "$29",
    period: "per workspace / month",
    badge: "Most Popular",
    badgeVariant: "default" as const,
    description: "Advanced team collaboration, granular permissions, and priority support.",
    features: [
      "Everything in Community Core",
      "Multi-user RBAC (Admin, Developer)",
      "Multi-workspace client isolation",
      "Unlimited audit log history retention",
      "Custom Slack & Discord incident webhooks",
      "Database snapshot backup automation",
      "Priority email engineering support",
      "Commercial deployment indemnity",
    ],
    cta: "Start 14-Day Trial",
    href: "/signup",
    featured: true,
  },
  {
    name: "DevSparks Cloud",
    price: "Planned",
    period: "Milestone 9",
    badge: "Upcoming",
    badgeVariant: "secondary" as const,
    description: "Zero-ops fully managed multi-tenant cloud hosting with multi-region edge probes.",
    features: [
      "Everything in Team Self-Hosted",
      "Zero-configuration managed cloud infrastructure",
      "Global multi-region synthetic uptime probes",
      "Container registry SBOM & CVE scanning",
      "Automated cross-region disaster recovery",
      "Custom domain SSL termination with auto-renewals",
      "Dedicated account manager & SLA",
    ],
    cta: "View Cloud Roadmap",
    href: "/roadmap",
    featured: false,
  },
];

const PRICING_FAQS: FAQItem[] = [
  {
    question: "Is DeployCheck really 100% free to self-host?",
    answer:
      "Yes. The Community Core is licensed under the permissive MIT License. You can clone the repository, run it on your own server, and connect as many projects and VPS nodes as you need without paying any licensing fees.",
  },
  {
    question: "How do AI tokens work with Bring Your Own Key (BYOK)?",
    answer:
      "DeployCheck does not charge any markup on AI queries. You provide your own OpenRouter API key, allowing you to pay your AI provider directly at raw provider rates for DeepSeek, Anthropic, or OpenAI models.",
  },
  {
    question: "Are there per-seat user limits on the Community plan?",
    answer:
      "No. Self-hosted instances have zero artificial user or server caps. Team tiers provide pre-packaged RBAC, enterprise audit logging, and commercial support.",
  },
];

export default function PricingPage() {
  return (
    <MarketingLayout currentPath="/pricing">
      <PageHero
        badge="TRANSPARENT & OPEN SOURCE"
        badgeVariant="purple"
        title="Simple, transparent plans with zero server or bandwidth markups"
        description="Run sovereign deployments on your own infrastructure for free. Upgrade to Team self-hosted for multi-tenant isolation, or follow our managed cloud roadmap."
        primaryAction={{
          label: "Deploy Community Core Free",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
        secondaryAction={{
          label: "View Feature Matrix",
          href: "/product",
        }}
      />

      {/* Pricing Cards Grid */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white border rounded-2xl p-7 sm:p-8 shadow-xs flex flex-col justify-between transition-all ${
                tier.featured
                  ? "border-[#5938F5] ring-2 ring-[#5938F5]/20 shadow-md relative"
                  : "border-[#E5E7EB] hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#17172A]">{tier.name}</h3>
                  <Badge variant={tier.badgeVariant} className="text-xs">
                    {tier.badge}
                  </Badge>
                </div>

                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#17172A]">
                    {tier.price}
                  </span>
                  <span className="text-xs text-[#667085] ml-2 font-medium">
                    {tier.period}
                  </span>
                </div>

                <p className="text-xs text-[#667085] leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="pt-6 border-t border-slate-100">
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                    Included Capabilities:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#17172A]">
                        <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Button
                  asChild
                  className={`w-full h-10 rounded-[8px] text-xs font-bold gap-1.5 ${
                    tier.featured
                      ? "bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-[#17172A] border border-[#E5E7EB]"
                  }`}
                >
                  <Link href={tier.href}>
                    <span>{tier.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQAccordion items={PRICING_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}
