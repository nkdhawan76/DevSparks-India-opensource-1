import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { Box, Shield, CheckCircle2, AlertCircle } from "lucide-react";

const meta = getRouteMetadata("/features/container-scanning");

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

export default function ContainerScanningPage() {
  return (
    <MarketingLayout currentPath="/features/container-scanning">
      <PageHero
        badge="ROADMAP MILESTONE 7 (PLANNED)"
        badgeVariant="blue"
        title="Container Registry Scanning & Docker CVE Analysis"
        description="Planned capability: Deep container vulnerability scanning across Docker base images, multi-stage Dockerfile configurations, and SBOM generation prior to server dispatch."
        primaryAction={{
          label: "View Roadmap Milestones",
          href: "/roadmap",
        }}
        secondaryAction={{
          label: "Try Pre-deployment Audit",
          href: "/features/pre-deployment-audit",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-amber-900 mb-8 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold">Transparent Engineering Notice:</strong> In adherence to DevSparks DeployCheck Rule 3 (No Fabricated Data or Artificial Work), this capability is explicitly marked as <strong>Planned for Milestone 7</strong>. Our current live version provides comprehensive source-level static dependency, secret, and configuration auditing.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
              <Box className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] mb-2">Planned: Base Image CVE Auditing</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Verify upstream Alpine, Debian, and Ubuntu base images against current national vulnerability databases before deploying container images.
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] flex items-center justify-center mb-4">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] mb-2">Planned: Dockerfile Linter</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Flag insecure root execution, missing health checks, unpinned package managers, and leaked secret arguments inside container definitions.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white border border-[#E5E7EB] rounded-2xl p-6">
          <h4 className="text-sm font-bold text-[#17172A] mb-3">Live Capabilities Available Today:</h4>
          <ul className="space-y-2 text-xs text-[#667085]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Package.json dependency vulnerability analysis via Pre-deployment Audit</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Regex pattern secret token scanning (.env, private keys, API secrets)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>SSH Server diagnostics and live hardware telemetry on Linux VPS</span>
            </li>
          </ul>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
