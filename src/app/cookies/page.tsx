import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { getRouteMetadata } from "@/lib/metadata-registry";

const meta = getRouteMetadata("/cookies");

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

export default function CookiesPolicyPage() {
  return (
    <MarketingLayout currentPath="/cookies">
      <PageHero
        badge="PRIVACY & COOKIES"
        badgeVariant="purple"
        title="Cookie Policy"
        description="Last updated: November 8, 2026. How DevSparks DeployCheck uses essential cookies for secure session authentication."
      />

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#667085] leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">1. Essential Cookies Only</h3>
            <p>
              DevSparks DeployCheck uses only essential cookies strictly required to deliver the service. We do not use third-party marketing cookies, cross-site trackers, or invasive analytics pixels.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">2. Cookies We Set</h3>
            <div className="bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl p-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-2 mb-2 border-b border-slate-200 font-bold text-[#17172A]">
                <span>Cookie Name</span>
                <span>Type</span>
                <span>Purpose</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[#667085]">
                <span className="font-semibold text-[#5938F5]">deploycheck_session</span>
                <span>HttpOnly, SameSite=Lax</span>
                <span>Stores authenticated session token securely</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#17172A] mb-3">3. Managing Cookie Preferences</h3>
            <p>
              Because our session cookie is strictly necessary to log in and protect your workspace data from CSRF attacks, disabling it in your browser will prevent you from signing in to the authenticated dashboard.
            </p>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

