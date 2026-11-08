import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Heart,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/about");

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

const VALUES = [
  {
    title: "Permissive Open Source",
    desc: "We believe infrastructure tooling should be transparent, inspectable, and sovereign. DeployCheck core is licensed under MIT with no artificial gates.",
    icon: Heart,
  },
  {
    title: "Truth in Engineering",
    desc: "We do not fabricate operational stats, fake partner logos, or hide uncompleted milestones behind vague marketing copy. Our roadmap is genuine.",
    icon: CheckCircle2,
  },
  {
    title: "Human-in-the-Loop Safety",
    desc: "AI should empower developers, not run unchecked commands on production servers. Every mutating operation requires explicit human click approval.",
    icon: ShieldCheck,
  },
  {
    title: "Zero Dark Mode / Strict Light Theme",
    desc: "Designed from the ground up for maximum visual clarity and professional SaaS appeal using our canonical light design tokens and Inter typography.",
    icon: Zap,
  },
];

export default function AboutPage() {
  return (
    <MarketingLayout currentPath="/about">
      <PageHero
        badge="DEVSPARKS INDIA"
        badgeVariant="purple"
        title="Engineering sovereign developer operations for modern software teams"
        description="DevSparks India was founded on a simple conviction: developers shouldn't have to choose between fragile manual deployments and overpriced proprietary cloud platforms."
        primaryAction={{
          label: "Explore Open Source Source",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
        secondaryAction={{
          label: "View Roadmap",
          href: "/roadmap",
        }}
      />

      {/* Mission & Story */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs mb-12">
          <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
            OUR MISSION
          </span>
          <h2 className="text-2xl font-extrabold text-[#17172A] tracking-tight mb-4">
            Democratizing enterprise-grade DevOps without proprietary lock-in
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-[#667085] leading-relaxed">
            <p>
              Modern cloud platforms have made pushing code simple, but at a severe cost: skyrocketing bandwidth bills, opaque pricing models, and vendor lock-in. Meanwhile, managing your own Linux VPS has remained complicated, requiring brittle shell scripts and risky terminal sessions.
            </p>
            <p>
              DevSparks DeployCheck bridges this gap. We provide a beautiful, cohesive, light-theme web dashboard that connects to your affordable Linux servers via SSH. You get pre-deployment static security analysis, human-approved AI diff reviews, atomic zero-downtime symlink deploys, and continuous uptime monitoring—all under your own control.
            </p>
            <p>
              Built with Next.js 14, TypeScript, and PostgreSQL, DeployCheck is engineered to be reliable, fast, and 100% auditable.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#17172A] mb-2">{v.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
