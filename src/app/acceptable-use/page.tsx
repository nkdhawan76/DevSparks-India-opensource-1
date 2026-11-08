import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { getRouteMetadata } from "@/lib/metadata-registry";

const meta = getRouteMetadata("/acceptable-use");

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

export default function AcceptableUsePolicyPage() {
  return (
    <MarketingLayout currentPath="/acceptable-use">
      <PageHero
        badge="PLATFORM POLICIES"
        badgeVariant="blue"
        title="Acceptable Use Policy"
        description="Last updated: November 8, 2026. Standards governing acceptable use of the DeployCheck platform, API endpoints, and monitoring infrastructure."
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#667085] leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">1. Purpose &amp; Scope</h3>
            <p>
              This Acceptable Use Policy outlines forbidden behaviors when using DeployCheck to connect servers, audit source code, or dispatch synthetic uptime probes. It applies to all users across cloud and community instances.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">2. Prohibited Infrastructure Activities</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#17172A]">Unauthorized Server Access:</strong> Connecting SSH hosts, IP addresses, or containers without the explicit authorization of the system administrator.
              </li>
              <li>
                <strong className="text-[#17172A]">Denial-of-Service (DoS) Probing:</strong> Setting excessively aggressive synthetic probe frequencies intended to degrade or overwhelm target endpoints.
              </li>
              <li>
                <strong className="text-[#17172A]">SSRF Exploitation:</strong> Attempting to probe private IP address ranges (RFC 1918, link-local, loopback) through synthetic monitoring hooks or webhooks.
              </li>
              <li>
                <strong className="text-[#17172A]">Malicious Code Deployment:</strong> Using deployment pipelines to deliver malware, cryptocurrency miners, or spyware.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">3. Enforcement &amp; Account Suspension</h3>
            <p>
              We reserve the right to suspend or terminate access to DeployCheck accounts that engage in abusive or harmful infrastructure activities that threaten server safety or network integrity.
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
