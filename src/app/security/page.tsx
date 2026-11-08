import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Globe,
  Key,
} from "lucide-react";

const meta = getRouteMetadata("/security");

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
    title: "AES-256-GCM Authenticated Encryption",
    desc: "All SSH private keys, database passwords, and third-party AI tokens are encrypted with authenticated AES-256-GCM before database insertion. Decrypted secrets exist solely in ephemeral runner memory.",
    icon: Lock,
  },
  {
    title: "Policy-Guarded Server Runners",
    desc: "AI models and remote commands operate inside strict policy runners. Commands outside allowlists are rejected. Mutating operations mandate explicit human click approval.",
    icon: UserCheck,
  },
  {
    title: "SSRF Protection Architecture",
    desc: "Synthetic monitoring probes and webhook dispatchers enforce strict domain resolution checks, blocking RFC 1918 private subnets, localhost, and AWS/cloud metadata endpoints (169.254.169.254).",
    icon: Globe,
  },
  {
    title: "Automated Credential Redaction",
    desc: "All terminal output streams, execution logs, error traces, and agent transcripts pass through automated redaction filters that scrub session cookies, API tokens, and private keys.",
    icon: Key,
  },
];

export default function SecurityPolicyPage() {
  return (
    <MarketingLayout currentPath="/security">
      <PageHero
        badge="APPLICATION SECURITY & RESPONSIBLE DISCLOSURE"
        badgeVariant="purple"
        title="DeployCheck Security Architecture & Disclosure Policy"
        description="Security is not an afterthought at DevSparks India. Review our defensive architecture, encryption standards, and responsible vulnerability reporting program."
        primaryAction={{
          label: "Report Vulnerability",
          href: "mailto:security@devsparks.com",
        }}
        secondaryAction={{
          label: "View Architecture Document",
          href: "/docs",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {SECURITY_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#17172A] mb-2">{p.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Responsible Disclosure Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-xs sm:text-sm text-[#667085] leading-relaxed">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17172A]">Responsible Vulnerability Disclosure</h3>
              <span className="text-xs text-slate-400">We appreciate the efforts of security researchers.</span>
            </div>
          </div>

          <p>
            If you believe you have found a security vulnerability in DevSparks DeployCheck, please report it to us immediately via encrypted email to <a href="mailto:security@devsparks.com" className="text-[#5938F5] font-semibold hover:underline">security@devsparks.com</a>. Please do not disclose vulnerabilities publicly until our team has verified and patched the issue.
          </p>

          <h4 className="text-sm font-bold text-[#17172A]">Our Commitments to Researchers:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>We will acknowledge receipt of your report within 24 hours.</li>
            <li>We will provide an estimated timeline for remediation.</li>
            <li>We will credit your discovery in our security release notes upon mutual consent.</li>
          </ul>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}

