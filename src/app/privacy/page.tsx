import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { getRouteMetadata } from "@/lib/metadata-registry";

const meta = getRouteMetadata("/privacy");

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

export default function PrivacyPolicyPage() {
  return (
    <MarketingLayout currentPath="/privacy">
      <PageHero
        badge="LEGAL & PRIVACY"
        badgeVariant="purple"
        title="Privacy Policy"
        description="Last updated: November 8, 2026. How DevSparks India handles your account information, telemetry data, and encrypted credentials."
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#667085] leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">1. Overview &amp; Data Philosophy</h3>
            <p>
              DevSparks India (&quot;DeployCheck&quot;, &quot;we&quot;, &quot;us&quot;) designs developer tooling with a strict privacy-first architecture. We do not sell developer data, monetize source code, or train AI models on private repository contents. This Privacy Policy details what information we collect, how it is secured, and your rights.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">2. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#17172A]">Account Credentials:</strong> Full name, work email address, and bcrypt-hashed passwords for authentication.
              </li>
              <li>
                <strong className="text-[#17172A]">Encrypted Infrastructure Credentials:</strong> SSH server connection hostnames, ports, and encrypted private keys. These credentials are encrypted at rest using AES-256-GCM.
              </li>
              <li>
                <strong className="text-[#17172A]">Bring-Your-Own-Key (BYOK) AI Tokens:</strong> Third-party OpenRouter API keys saved for code diff diagnosis, stored encrypted and never logged in plaintext.
              </li>
              <li>
                <strong className="text-[#17172A]">Operational Telemetry:</strong> Anonymized HTTP status codes, p95 probe latencies, and uptime records needed to power monitoring dashboards.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">3. How Your Data Is Secured</h3>
            <p>
              In accordance with DevSparks DeployCheck Rule 4 (Credential Isolation &amp; Redaction), all sensitive keys, session tokens, and passwords are automatically redacted from server logs, transcripts, and API responses. Mutating server commands execute only within policy-governed environments with explicit human confirmation.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">4. Self-Hosted Deployment Sovereignity</h3>
            <p>
              When running the self-hosted edition of DeployCheck on your own infrastructure or private VPC, 100% of your data remains on your servers. DevSparks India receives zero telemetry, audit findings, or repository files from self-hosted installations.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">5. Inquiries &amp; Data Deletion</h3>
            <p>
              You may request full deletion of your account and all associated workspace records at any time by contacting our privacy team at <a href="mailto:privacy@devsparks.com" className="text-[#5938F5] font-semibold hover:underline">privacy@devsparks.com</a>.
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

