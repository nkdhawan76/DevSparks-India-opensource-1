import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Code,
  ShieldCheck,
  Bot,
  Rocket,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/solutions/developers");

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

const DEV_PILLARS = [
  {
    title: "Instant Pre-Push Audits",
    desc: "Run static security and dependency audits on your machine or in CI. Catch vulnerable npm packages, exposed secrets, and bad configs before git push.",
    icon: ShieldCheck,
  },
  {
    title: "AI-Assisted Fixes with Diff Previews",
    desc: "Bring your own API key to diagnose syntax or configuration issues. Get clean, readable unified git diffs that you review and approve line by line.",
    icon: Bot,
  },
  {
    title: "Direct Git-to-VPS Deployments",
    desc: "Deploy straight to your favorite $5-$10 VPS (Hetzner, DigitalOcean, Linode) with automated atomic symlinks and zero deployment anxiety.",
    icon: Rocket,
  },
  {
    title: "Lightweight & CLI-Ready",
    desc: "Zero bloated agent sidecars. Pure JavaScript business logic, minimal memory overhead, and terminal-friendly command scripts.",
    icon: Code,
  },
];

const DEV_FAQS: FAQItem[] = [
  {
    question: "Do I need a credit card to use DeployCheck as an individual developer?",
    answer:
      "No. DeployCheck is open-source and free to self-host. You connect your own VPS and your own AI keys without any subscription paywalls.",
  },
  {
    question: "How does DeployCheck compare to Vercel or Netlify?",
    answer:
      "Platforms like Vercel charge per-seat and per-bandwidth markups for proprietary hosting. DeployCheck gives you the same streamlined push-to-deploy developer experience on your own affordable, sovereign Linux servers.",
  },
];

export default function DevelopersSolutionPage() {
  return (
    <MarketingLayout currentPath="/solutions/developers">
      <PageHero
        badge="FOR INDIVIDUAL DEVELOPERS & BUILDERS"
        badgeVariant="purple"
        title="Deploy to your own servers with zero fear and full control"
        description="Eliminate late-night deployment panic. Audit your code locally, fix security issues with human-approved AI diffs, and ship to your Linux VPS with instant rollback safety."
        primaryAction={{
          label: "Start Building Free",
          href: "/signup",
        }}
        secondaryAction={{
          label: "Explore Pre-deployment Audit",
          href: "/features/pre-deployment-audit",
        }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEV_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17172A] mb-2">{p.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#16A34A]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Developer Sovereign</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FAQAccordion items={DEV_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}
