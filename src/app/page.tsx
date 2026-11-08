import React from "react";
import { Metadata } from "next";
import { Shield, Lock, Key } from "lucide-react";
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

        {/* PLATFORM CAPABILITIES — ADVANCED BENTO GRID */}
        <BentoFeatureGrid />

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
