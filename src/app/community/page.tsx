import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { GitHubIcon } from "@/components/common/Icons";
import {
  MessagesSquare,
  Bug,
  Lightbulb,
  Heart,
  ArrowRight,
} from "lucide-react";

const meta = getRouteMetadata("/community");

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

const COMMUNITY_CHANNELS = [
  {
    title: "GitHub Discussions",
    desc: "Ask technical questions, share deployment setup recipes, and discuss proposed features with fellow developers.",
    icon: MessagesSquare,
    action: "Join Discussions",
    url: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/discussions",
  },
  {
    title: "Issue Tracker & Bug Reports",
    desc: "Report software defects, reproduction steps, or unexpected audit findings directly to our core engineering maintainers.",
    icon: Bug,
    action: "Report an Issue",
    url: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/issues",
  },
  {
    title: "Feature Requests & RFCs",
    desc: "Propose new stack detectors, deployment hooks, or cloud provider integrations using our structured RFC process.",
    icon: Lightbulb,
    action: "Propose Feature",
    url: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/discussions/categories/ideas",
  },
  {
    title: "Contributing Guide",
    desc: "Read our engineering standards, branch naming conventions, test guidelines, and submit your first pull request.",
    icon: Heart,
    action: "Read Guidelines",
    url: "/contribute",
  },
];

export default function CommunityPage() {
  return (
    <MarketingLayout currentPath="/community">
      <PageHero
        badge="OPEN SOURCE COMMUNITY"
        badgeVariant="purple"
        title="Connect with the DevSparks DeployCheck Developer Community"
        description="Join thousands of developers building sovereign, self-hosted deployment pipelines. Share runbooks, propose features, and contribute to the ecosystem."
        primaryAction={{
          label: "GitHub Repository",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
        secondaryAction={{
          label: "View Contributing Guide",
          href: "/contribute",
        }}
      />

      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMUNITY_CHANNELS.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17172A] mb-2">{ch.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed mb-6">{ch.desc}</p>
                </div>

                <a
                  href={ch.url}
                  target={ch.url.startsWith("http") ? "_blank" : undefined}
                  rel={ch.url.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5938F5] hover:text-[#4726DB] pt-4 border-t border-slate-100 group"
                >
                  <span>{ch.action}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Community Callout */}
        <div className="mt-12 bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#17172A] flex items-center justify-center shrink-0">
              <GitHubIcon size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#17172A]">Star DeployCheck on GitHub</h4>
              <p className="text-xs text-[#667085] mt-0.5">Support open-source developer sovereignty with a quick star on our repository.</p>
            </div>
          </div>

          <a
            href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
            target="_blank"
            rel="noreferrer noopener"
            className="px-4 py-2 rounded-[8px] bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold shrink-0 transition-colors shadow-2xs"
          >
            Star on GitHub &rarr;
          </a>
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}

