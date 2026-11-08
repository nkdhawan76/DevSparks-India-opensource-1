import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, CheckCircle2, Shield, Lock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/common/Icons";
import { WebsiteHeader } from "@/components/navigation/WebsiteHeader";
import { WebsiteFooter } from "@/components/navigation/WebsiteFooter";
import { HeroDashboardPreview } from "@/components/marketing/HeroDashboardPreview";
import { FeatureSection, FeatureCardData } from "@/components/marketing/FeatureSection";
import { WorkflowTimeline } from "@/components/marketing/WorkflowTimeline";
import { IntegrationGrid } from "@/components/marketing/IntegrationGrid";
import { RoadmapSection } from "@/components/marketing/RoadmapSection";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { StructuredData } from "@/components/marketing/StructuredData";
import {
  ShieldCheck,
  Sparkles,
  Server,
  Rocket,
  Activity,
  Wrench,
  Box,
  Globe,
  Cloud,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DeployCheck — Developer Operations Platform | By DevSparks India",
  description: "Open-source developer operations platform for auditing, AI-assisted development, secure deployment and website monitoring.",
  alternates: {
    canonical: "https://deploycheck.devsparks.com/",
  },
  openGraph: {
    title: "DeployCheck — Developer Operations Platform | By DevSparks India",
    description: "Audit, Fix, Deploy and Monitor Your Applications with zero lock-in.",
    url: "https://deploycheck.devsparks.com/",
    siteName: "DeployCheck",
    images: [{ url: "/icon.svg" }],
    type: "website",
  },
};

const HOMEPAGE_CAPABILITIES: FeatureCardData[] = [
  {
    title: "Pre-deployment Audit",
    description: "Scan code dependencies, detect unencrypted secrets, validate env configs, and verify Docker files before production dispatch.",
    icon: ShieldCheck,
    status: "Live",
    route: "/features/pre-deployment-audit",
    details: ["Package.json static checks", "Regex secret detection", "Stack detection (Next.js, Node, Docker)"],
  },
  {
    title: "AI Assistant (BYOK)",
    description: "Analyze code errors and review suggested patches using your own OpenRouter key. Every change requires explicit human approval.",
    icon: Sparkles,
    status: "BYOK",
    route: "/features/ai-assistant",
    details: ["OpenRouter integration", "Interactive diff review", "Zero unrestricted shell execution"],
  },
  {
    title: "VPS Management",
    description: "Connect and monitor your Linux VPS nodes over SSH with host key verification. Inspect real-time CPU, RAM, and disk utilization.",
    icon: Server,
    status: "Live",
    route: "/features/vps-management",
    details: ["SSH host key fingerprinting", "Hardware telemetry", "Approval-based diagnostics"],
  },
  {
    title: "Guided Deployment",
    description: "Deploy supported Node.js, Next.js, and static web apps with preflight verification, build pipelines, and verified rollbacks.",
    icon: Rocket,
    status: "Live",
    route: "/features/guided-deployment",
    details: ["Preflight verification", "Automated rollbacks", "Release history logs"],
  },
  {
    title: "Website Monitoring",
    description: "Track live HTTP response latency, SSL certificate expiration dates, and DNS health with instant incident alerting.",
    icon: Activity,
    status: "Live",
    route: "/features/website-monitoring",
    details: ["Synthetic HTTP/HTTPS pings", "SSL cert expiry watcher", "Incident alert webhooks"],
  },
  {
    title: "Scheduled Maintenance",
    description: "Manage automated log rotation, temp directory cleanups, package updates, and backups with risk-gated execution.",
    icon: Wrench,
    status: "Live",
    route: "/features/maintenance",
    details: ["Log rotation runbooks", "System package sweeps", "Confirmation for risky ops"],
  },
  {
    title: "Container Registry Scanning",
    description: "Scan Docker container base images, dependencies, and CVE vulnerabilities prior to cluster dispatch.",
    icon: Box,
    status: "Planned",
    route: "/features/container-scanning",
    details: ["Planned for Milestone 7", "Dockerfile linting", "Container CVE registry alerts"],
  },
  {
    title: "Multi-Region Probes",
    description: "Distributed synthetic monitoring probes across North America, Europe, and Asia-Pacific edge locations.",
    icon: Globe,
    status: "Planned",
    route: "/features/multi-region-monitoring",
    details: ["Planned for Milestone 8", "Global latency matrix", "Edge outage triangulation"],
  },
  {
    title: "DevSparks Cloud Managed SaaS",
    description: "Zero-maintenance multi-tenant managed hosting with automated backups and cloud scaling.",
    icon: Cloud,
    status: "Planned",
    route: "/pricing",
    details: ["Planned for Milestone 9", "Fully managed PostgreSQL", "Team collaboration tiers"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between font-sans antialiased text-[#17172A] selection:bg-purple-100 selection:text-[#5938F5]">
      <StructuredData type="website" />
      <StructuredData type="software" />

      {/* Global Sticky Website Header */}
      <WebsiteHeader />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-[#E5E7EB] bg-white">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headline & Value Proposition */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-[#5938F5] text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5938F5] animate-pulse" />
                  <span>Open Source · Self-Hosted · Cloud SaaS</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#17172A] leading-[1.12]">
                  Audit, Fix, Deploy and <span className="text-[#5938F5]">Monitor</span> Your Applications
                </h1>

                <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Open-source developer operations platform for automated pre-deployment audits, AI-assisted code patch reviews, guided Linux VPS deployments, and production uptime monitoring.
                </p>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Button
                    size="lg"
                    asChild
                    className="h-11 rounded-[8px] px-6 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs gap-2 active:scale-[0.98] transition-all group"
                  >
                    <Link href="/signup" className="inline-flex items-center justify-center gap-2">
                      <span>Get Started Free</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="h-11 rounded-[8px] px-5 text-xs font-semibold border-[#E5E7EB] hover:bg-slate-50 text-[#17172A] gap-2 active:scale-[0.98] transition-all shadow-2xs"
                  >
                    <a
                      href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <GitHubIcon size={15} className="text-[#17172A]" />
                      <span>Star on GitHub</span>
                    </a>
                  </Button>
                </div>

                {/* 4 Feature Bullet Points */}
                <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-700 font-medium">
                  {[
                    "Pre-deployment audit",
                    "AI-powered assistance",
                    "Secure deployment",
                    "Uptime monitoring",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 justify-center lg:justify-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#5938F5] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive Product Preview */}
              <div className="lg:col-span-5 w-full">
                <HeroDashboardPreview />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST HIGHLIGHTS BAR */}
        <section className="py-6 bg-[#F7F8FC] border-b border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <div className="text-base font-extrabold text-[#17172A]">Open Source Core</div>
                <div className="text-xs text-[#667085] mt-0.5">MIT Licensed • 100% Transparent</div>
              </div>
              <div className="p-3">
                <div className="text-base font-extrabold text-[#17172A]">Self-Hosted or Cloud</div>
                <div className="text-xs text-[#667085] mt-0.5">Complete Sovereign Control</div>
              </div>
              <div className="p-3">
                <div className="text-base font-extrabold text-[#17172A]">Secure by Design</div>
                <div className="text-xs text-[#667085] mt-0.5">AES-256 Encryption at Rest</div>
              </div>
              <div className="p-3">
                <div className="text-base font-extrabold text-[#17172A]">Developer First</div>
                <div className="text-xs text-[#667085] mt-0.5">BYOK AI • Zero Vendor Lock-in</div>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM CAPABILITIES */}
        <FeatureSection
          eyebrow="PLATFORM CAPABILITIES"
          title="Everything You Need to Deploy With Complete Confidence"
          description="Explore our modular developer operations capabilities. Every feature is built with strict policy controls and deterministic test verification."
          features={HOMEPAGE_CAPABILITIES}
          columns={3}
        />

        {/* HOW IT WORKS TIMELINE */}
        <WorkflowTimeline />

        {/* SECURITY & TRUST DEEP DIVE */}
        <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
              SECURITY & GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
              Enterprise Grade Security Without Enterprise Complexity
            </h2>
            <p className="mt-3 text-sm text-[#667085] leading-relaxed">
              We treat your code and server credentials as zero-trust assets. The platform is strictly policy-controlled at every level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                <Key className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#17172A]">BYOK Credential Isolation</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                Bring your own OpenRouter AI key. All tokens are encrypted using AES-256-GCM before database storage and never logged in plain text or shared between tenants.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] flex items-center justify-center mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#17172A]">Human-in-the-Loop AI Gates</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                DeployCheck AI never has unrestricted shell access. AI models only propose structured JSON code patches and diagnostic insights that require explicit human approval.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#17172A]">Host Verification on SSH</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                Server connections require SHA-256 host key fingerprinting to prevent man-in-the-middle attacks. Operations execute inside restricted, isolated policy runners.
              </p>
            </div>
          </div>
        </section>

        {/* ROADMAP SECTION */}
        <RoadmapSection />

        {/* INTEGRATIONS ECOSYSTEM */}
        <IntegrationGrid />

        {/* FAQ ACCORDION */}
        <FAQAccordion />

        {/* FINAL CALL TO ACTION */}
        <CTASection />
      </main>

      {/* Global Five-Column Modern Mega Footer */}
      <WebsiteFooter showCta={false} />
    </div>
  );
}
