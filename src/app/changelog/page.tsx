import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const meta = getRouteMetadata("/changelog");

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

const RELEASES = [
  {
    version: "v0.1.0-dev",
    date: "November 8, 2026",
    badge: "Current Release",
    badgeVariant: "default" as const,
    highlights: [
      "Complete public marketing website with dedicated product, feature, solution, legal, and resource pages.",
      "Refined high-contrast mega menus (Product, Solutions, Resources) with balanced 4-item columns and CLI bottom bars.",
      "Semantic breadcrumb navigation on all inner pages with embedded JSON-LD BreadcrumbList structured data.",
      "Technical SEO, AEO, and LLMO suite including dynamic XML sitemap (sitemap.ts), robots.ts, and curated public/llms.txt.",
      "Strict Light Theme Only invariant enforced across the entire website platform with zero dark mode tokens.",
      "Evidence-based engineering protocol with automated verification scripts (verify-mvp, verify-auth, run-audit).",
    ],
  },
  {
    version: "v0.0.3-alpha",
    date: "November 5, 2026",
    badge: "Milestone",
    badgeVariant: "secondary" as const,
    highlights: [
      "Responsive authenticated dashboard shell with collapsible navigation sidebar and mobile drawer.",
      "Complete developer authentication flow: Sign-In, Sign-Up, Password Recovery, and Session Management.",
      "GSAP smooth micro-interactions respecting prefers-reduced-motion accessibility guards.",
      "Tenant-isolated PostgreSQL queries with workspace scoping (WHERE workspace_id = $1).",
    ],
  },
  {
    version: "v0.0.2-alpha",
    date: "November 4, 2026",
    badge: "Feature Release",
    badgeVariant: "success" as const,
    highlights: [
      "Pre-deployment static audit engine with npm dependency scanner and secret regex pattern detection.",
      "AES-256-GCM encrypted credential vault for SSH host keys and OpenRouter BYOK API tokens.",
      "Policy-guarded AI code diff viewer requiring mandatory human approval before patch execution.",
      "Single-region synthetic HTTP and SSL certificate expiration telemetry probes.",
    ],
  },
  {
    version: "v0.0.1-alpha",
    date: "November 3, 2026",
    badge: "Foundation",
    badgeVariant: "outline" as const,
    highlights: [
      "Core architecture definition (ARD & PRD master specifications).",
      "Modular monolith Next.js 14 App Router project setup with strict TypeScript configuration.",
      "Forward and rollback PostgreSQL database migrations.",
      "Restricted REST /api/v1 standardized response envelopes.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <MarketingLayout currentPath="/changelog">
      <PageHero
        badge="TRANSPARENT RELEASE NOTES"
        badgeVariant="purple"
        title="DeployCheck Changelog & Release History"
        description="Every feature, security improvement, bug fix, and architectural milestone delivered by the DevSparks DeployCheck engineering team."
        primaryAction={{
          label: "View Roadmap",
          href: "/roadmap",
        }}
        secondaryAction={{
          label: "Star on GitHub",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-slate-200">
          {RELEASES.map((rel) => (
            <div key={rel.version} className="relative pl-10 sm:pl-14">
              {/* Timeline marker */}
              <div className="absolute left-2.5 sm:left-4.5 -translate-x-1/2 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#5938F5]" />

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base sm:text-lg font-black text-[#17172A]">
                      {rel.version}
                    </span>
                    <Badge variant={rel.badgeVariant} className="text-xs">
                      {rel.badge}
                    </Badge>
                  </div>
                  <span className="text-xs text-[#667085] font-medium">{rel.date}</span>
                </div>

                <ul className="space-y-2.5">
                  {rel.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#667085] leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
