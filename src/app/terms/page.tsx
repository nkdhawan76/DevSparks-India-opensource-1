import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { getRouteMetadata } from "@/lib/metadata-registry";

const meta = getRouteMetadata("/terms");

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

export default function TermsOfServicePage() {
  return (
    <MarketingLayout currentPath="/terms">
      <PageHero
        badge="LEGAL & TERMS"
        badgeVariant="blue"
        title="Terms of Service"
        description="Last updated: November 8, 2026. Terms governing the usage of DevSparks DeployCheck software, APIs, and self-hosted instances."
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#667085] leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">1. Acceptance of Terms</h3>
            <p>
              By accessing or using DevSparks DeployCheck (&quot;the Platform&quot;), provided by DevSparks India, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use the Platform.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">2. Open Source License &amp; Self-Hosting</h3>
            <p>
              DeployCheck core software is released under the permissive MIT License. You are granted the right to inspect, modify, fork, and self-host the application on your own computing hardware in accordance with the MIT License terms.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">3. User Responsibilities &amp; Server Access</h3>
            <p>
              You are solely responsible for ensuring that you have authorized access to any SSH servers, domain names, or repositories connected to your DeployCheck account. You agree not to use DeployCheck to probe, scan, or deploy to servers without explicit authorization from the infrastructure owner.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">4. AI Provider Usage &amp; API Keys</h3>
            <p>
              DeployCheck provides Bring-Your-Own-Key (BYOK) connectivity to third-party AI providers (e.g. OpenRouter). You are responsible for all token fees, terms of service, and rate limits imposed by your designated third-party AI providers.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">5. Disclaimer of Warranties</h3>
            <p>
              The platform and pre-deployment audit findings are provided &quot;AS IS&quot; without warranty of any kind. Pre-deployment audits provide static heuristics and dependency vulnerability checks, but do not guarantee complete protection against all software vulnerabilities or deployment regressions.
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

