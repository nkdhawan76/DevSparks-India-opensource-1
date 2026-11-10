import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, Rocket, Activity, Key } from "lucide-react";
import { GlowCard } from "@/components/common/GlowCard";
import { WebsiteHeader } from "@/components/navigation/WebsiteHeader";
import { WebsiteFooter } from "@/components/navigation/WebsiteFooter";
import { HeroContent } from "@/components/marketing/HeroContent";
import { BentoFeatureGrid } from "@/components/marketing/BentoFeatureGrid";
import { WorkflowTimeline } from "@/components/marketing/WorkflowTimeline";
import { IntegrationGrid } from "@/components/marketing/IntegrationGrid";
import { RoadmapSection } from "@/components/marketing/RoadmapSection";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { StructuredData } from "@/components/marketing/StructuredData";

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
            <HeroContent />
          </div>
        </section>

        {/* TRUST HIGHLIGHTS BAR — ENGINEERING METRICS */}
        <section className="py-8 bg-[#F7F8FC] border-b border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <GlowCard className="shadow-2xs hover:shadow-md transition-all duration-300 group" innerClassName="p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#5938F5] border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#17172A] leading-tight tracking-tight">150+ Invariants</div>
                  <div className="text-[11px] text-[#667085] mt-0.5 font-medium">Deterministic Static CVE & Secrets Scan</div>
                </div>
              </GlowCard>

              <GlowCard className="shadow-2xs hover:shadow-md transition-all duration-300 group" innerClassName="p-4 flex items-center gap-3.5" glowColor="rgba(53, 99, 233, 0.55)">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#3563E9] border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#17172A] leading-tight tracking-tight">100% BYOK AI</div>
                  <div className="text-[11px] text-[#667085] mt-0.5 font-medium">AES-256 Encrypted • Zero Data Retention</div>
                </div>
              </GlowCard>

              <GlowCard className="shadow-2xs hover:shadow-md transition-all duration-300 group" innerClassName="p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#5938F5] border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#17172A] leading-tight tracking-tight">&lt; 500ms Rollbacks</div>
                  <div className="text-[11px] text-[#667085] mt-0.5 font-medium">Atomic Linux Symlink Switching</div>
                </div>
              </GlowCard>

              <GlowCard className="shadow-2xs hover:shadow-md transition-all duration-300 group" innerClassName="p-4 flex items-center gap-3.5" glowColor="rgba(22, 163, 74, 0.55)">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#16A34A] border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-[#17172A] leading-tight tracking-tight">24/7 Edge Radar</div>
                  <div className="text-[11px] text-[#667085] mt-0.5 font-medium">Multi-Region Latency & TLS Probes</div>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* PLATFORM CAPABILITIES — ADVANCED BENTO GRID */}
        <BentoFeatureGrid />

        {/* HOW IT WORKS TIMELINE */}
        <WorkflowTimeline />

        {/* SECURITY & TRUST DEEP DIVE */}
        <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5938F5] text-[11px] font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero-Trust Governance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172A] tracking-tight leading-tight">
              Enterprise Grade Security Without Enterprise Complexity
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#667085] leading-relaxed">
              We treat your code, secrets, and server credentials as zero-trust assets. The platform is strictly policy-controlled at every boundary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard className="shadow-2xs hover:shadow-lg transition-all duration-300 group" innerClassName="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Key className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-[#5938F5] border border-purple-200">
                    AES-256-GCM
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors">
                  BYOK Credential Isolation
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                  Bring your own OpenRouter AI key. All tokens are encrypted using AES-256-GCM before database storage and never logged in plain text or shared between tenants.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Zero model training on your code</span>
              </div>
            </GlowCard>

            <GlowCard className="shadow-2xs hover:shadow-lg transition-all duration-300 group" innerClassName="p-6 sm:p-7 flex flex-col justify-between" glowColor="rgba(53, 99, 233, 0.55)">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#3563E9] border border-blue-200">
                    Human-in-the-Loop
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17172A] group-hover:text-[#3563E9] transition-colors">
                  Approval-Gated Policy Runner
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                  DeployCheck AI never has unrestricted shell access. AI models only propose structured JSON code patches and diagnostic insights that require explicit human approval.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Mandatory human sign-off on changes</span>
              </div>
            </GlowCard>

            <GlowCard className="shadow-2xs hover:shadow-lg transition-all duration-300 group" innerClassName="p-6 sm:p-7 flex flex-col justify-between" glowColor="rgba(22, 163, 74, 0.55)">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Lock className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    SSRF & Host Guard
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17172A] group-hover:text-[#16A34A] transition-colors">
                  Host Verification & SSRF Guard
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                  Server connections require SHA-256 host key fingerprinting to prevent man-in-the-middle attacks. All outbound webhooks block loopback and RFC 1918 private IP ranges.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Private IP filtering enforced</span>
              </div>
            </GlowCard>
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
