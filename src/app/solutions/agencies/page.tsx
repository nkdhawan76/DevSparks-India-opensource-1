import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Users,
  ShieldCheck,
  Globe,
  Lock,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/solutions/agencies");

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

const AGENCY_PILLARS = [
  {
    title: "Isolated Client Workspaces",
    desc: "Maintain strict tenant isolation. Keep client repositories, server credentials, and audit ledgers segregated with workspace-scoped queries.",
    icon: Users,
  },
  {
    title: "Client-Facing Audit Reports",
    desc: "Generate professional pre-deployment audit summaries showing security score, resolved vulnerabilities, and deployment readiness to share with clients.",
    icon: ShieldCheck,
  },
  {
    title: "Multi-Client Uptime Oversight",
    desc: "Monitor dozens of client websites and APIs in one dashboard. Receive immediate incident notifications if a client's site or SSL certificate experiences issues.",
    icon: Globe,
  },
  {
    title: "Per-Client Credential Vault",
    desc: "Isolate client API keys and SSH server credentials in dedicated encrypted vaults. Zero credential leakage between accounts.",
    icon: Lock,
  },
];

const AGENCY_FAQS: FAQItem[] = [
  {
    question: "Can clients access their own workspace?",
    answer:
      "Yes. DeployCheck supports granular RBAC roles allowing agency admins to invite client stakeholders with view-only or developer-scoped access to specific workspaces.",
  },
  {
    question: "Is there a limit on how many client servers we can connect?",
    answer:
      "Self-hosted DeployCheck has zero artificial server or project limits. You can manage as many client VPS nodes as your infrastructure needs.",
  },
];

export default function AgenciesSolutionPage() {
  return (
    <MarketingLayout currentPath="/solutions/agencies">
      <PageHero
        badge="FOR DIGITAL AGENCIES & STUDIOS"
        badgeVariant="purple"
        title="Manage multiple client servers and releases without chaos"
        description="Deliver rock-solid web applications for your clients. Multi-workspace isolation, professional pre-deployment security audits, and continuous uptime monitoring under one roof."
        primaryAction={{
          label: "Manage Client Workspaces",
          href: "/signup",
        }}
        secondaryAction={{
          label: "View Pricing Tiers",
          href: "/pricing",
        }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENCY_PILLARS.map((p) => {
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
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#5938F5]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Client Isolation</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FAQAccordion items={AGENCY_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}
