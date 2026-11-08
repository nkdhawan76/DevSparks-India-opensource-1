import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  LifeBuoy,
  BookOpen,
  Mail,
  ArrowRight,
} from "lucide-react";

const meta = getRouteMetadata("/support");

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

const SUPPORT_FAQS: FAQItem[] = [
  {
    question: "Why does my pre-deployment audit fail on dependency checks?",
    answer:
      "A failed dependency audit usually indicates known CVEs listed in npm advisory databases or missing peer dependencies. Run `npm audit` or inspect the Finding Cards in your DeployCheck dashboard to review recommended patch versions.",
  },
  {
    question: "How do I fix SSH connection timeouts when connecting my VPS?",
    answer:
      "Verify your target VPS firewall (e.g. UFW or cloud security group) allows inbound traffic on port 22 (or your custom SSH port). Also verify the host fingerprint and public key installed in your server's `~/.ssh/authorized_keys` file.",
  },
  {
    question: "What should I do if a deployment probe fails?",
    answer:
      "Check that your application process is listening on the expected localhost port and serving a valid HTTP response on `/` or `/api/v1/health`. If needed, trigger an instant one-click rollback from the Deployments dashboard.",
  },
  {
    question: "How do I reset my password if I forget it?",
    answer:
      "Navigate to the `/forgot-password` route from the Sign In page. Enter your registered email to receive a secure, time-limited password reset link.",
  },
];

export default function SupportPage() {
  return (
    <MarketingLayout currentPath="/support">
      <PageHero
        badge="HELP & TROUBLESHOOTING"
        badgeVariant="purple"
        title="DeployCheck Developer Support Center"
        description="Find answers to common operational questions, troubleshooting procedures for SSH servers and deployment pipelines, or connect with our engineering team."
        primaryAction={{
          label: "Contact Support Team",
          href: "/contact",
        }}
        secondaryAction={{
          label: "Browse Documentation",
          href: "/docs",
        }}
      />

      {/* Quick Help Cards */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/docs/getting-started"
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors mb-2">
              Getting Started
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed mb-4">
              Step-by-step walkthrough to clone, configure, and run pre-deployment checks in 5 minutes.
            </p>
            <span className="text-xs font-bold text-[#5938F5] flex items-center gap-1">
              <span>Read Guide</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/docs/api"
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] flex items-center justify-center mb-4">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] group-hover:text-[#3563E9] transition-colors mb-2">
              REST API Docs
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed mb-4">
              Complete endpoint schemas, error response codes, and authentication session models.
            </p>
            <span className="text-xs font-bold text-[#3563E9] flex items-center gap-1">
              <span>View API Reference</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/contact"
            className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#17172A] group-hover:text-[#16A34A] transition-colors mb-2">
              Direct Contact
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed mb-4">
              Submit a support inquiry directly to our engineering maintainers in India.
            </p>
            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
              <span>Send Message</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        <FAQAccordion items={SUPPORT_FAQS} />
      </section>

      <CTASection />
    </MarketingLayout>
  );
}
