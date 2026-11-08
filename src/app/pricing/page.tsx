import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { PricingTable } from "@/components/marketing/PricingTable";
import { getRouteMetadata } from "@/lib/metadata-registry";

const meta = getRouteMetadata("/pricing");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: meta.canonicalPath,
    languages: {
      "en-IN": "/in/pricing",
      "en-GB": "/uk/pricing",
      "en-US": "/us/pricing",
      "x-default": "/pricing",
    },
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonicalPath,
  },
};

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
  {
    question: "How does regional pricing and currency billing work?",
    answer:
      "Prices are automatically displayed in your local currency (INR ₹ in India, GBP £ in the United Kingdom, and USD $ in the United States and globally). You can change your preferred currency anytime using the regional market selector.",
  },
];

export default function PricingPage() {
  return (
    <MarketingLayout currentPath="/pricing">
      <PageHero
        badge="TRANSPARENT & OPEN SOURCE"
        badgeVariant="purple"
        title="Simple, transparent plans with zero server or bandwidth markups"
        description="Run sovereign deployments on your own infrastructure for free. Upgrade to Pro Team for multi-tenant isolation, or contact us for enterprise governance."
        primaryAction={{
          label: "Deploy Community Core Free",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
        secondaryAction={{
          label: "View Feature Matrix",
          href: "/product",
        }}
      />

      {/* Interactive Regional Pricing Table with Currency Selector & Billing Cycle */}
      <PricingTable />

      <FAQAccordion items={PRICING_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}
