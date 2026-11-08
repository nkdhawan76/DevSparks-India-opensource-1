import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  ShieldAlert,
  Lock,
  UserCheck,
  Activity,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/solutions/security-reliability");

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

const SECURITY_PILLARS = [
  {
    title: "Mandatory Human Approval Gate",
    desc: "AI models never possess direct shell execution privileges. Every proposed fix or patch is presented as a git diff requiring human verification.",
    icon: UserCheck,
  },
  {
    title: "AES-256-GCM Credential Isolation",
    desc: "All SSH private keys, database passwords, and third-party AI keys are encrypted with authenticated AES-256-GCM. Decrypted values are never logged.",
    icon: Lock,
  },
  {
    title: "SSRF & Injection Prevention",
    desc: "Strict private IP blocking on monitoring probes, parameterized SQL queries, and zero arbitrary shell runner commands ensure OWASP Top 10 compliance.",
    icon: ShieldAlert,
  },
  {
    title: "24/7 Synthetic Uptime Guard",
    desc: "Continuous synthetic HTTP health probes and SSL certificate expiration watchers notify you of reliability anomalies before they cause user impact.",
    icon: Activity,
  },
];

const SECURITY_FAQS: FAQItem[] = [
  {
    question: "How does DeployCheck comply with enterprise security audits?",
    answer:
      "DeployCheck follows strict defensive security engineering standards (documented in AGENTS.md), including parameterization, tenant isolation, secret redaction, and policy-governed execution runners.",
  },
  {
    question: "Do AI models have access to our source code or secrets?",
    answer:
      "DeployCheck AI assistance operates under a Bring-Your-Own-Key model. Only selected file context requested for analysis is sent to your AI provider; environment secrets, SSH keys, and passwords are never shared.",
  },
];

export default function SecurityReliabilitySolutionPage() {
  return (
    <MarketingLayout currentPath="/solutions/security-reliability">
      <PageHero
        badge="APPLICATION SECURITY & RESILIENCE"
        badgeVariant="purple"
        title="Zero blindspots in code security, credential storage and production uptime"
        description="Engineering teams cannot afford security blindspots or unverified AI autonomy. DeployCheck guarantees human-in-the-loop governance, AES-256 encrypted credential vaults, and continuous uptime monitoring."
        primaryAction={{
          label: "Audit Your Security Posture",
          href: "/signup",
        }}
        secondaryAction={{
          label: "Read Security Standard",
          href: "/security",
        }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_PILLARS.map((p) => {
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
                  <span>Verified Safe</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FAQAccordion items={SECURITY_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}

