import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Workflow,
  Server,
  Key,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const meta = getRouteMetadata("/solutions/devops-teams");

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

const DEVOPS_PILLARS = [
  {
    title: "Server Fleet Inventory",
    desc: "Centralize your remote SSH servers across cloud providers. Track CPU, RAM, disk usage, and host key fingerprints from one single pane of glass.",
    icon: Server,
  },
  {
    title: "Restricted Policy Runners",
    desc: "Enforce strict allowlists for server command execution. Prevent arbitrary shell runners and log all operations with automated secret redaction.",
    icon: ShieldCheck,
  },
  {
    title: "Role-Based Access Control (RBAC)",
    desc: "Assign granular permissions (Super Admin, Admin, Developer). Restrict server mutation and deployment actions to authorized operators.",
    icon: Key,
  },
  {
    title: "Standardized CI/CD Integration",
    desc: "Trigger pre-deployment audits and atomic release workflows via GitHub Actions, GitLab CI, or terminal scripts with deterministic exit codes.",
    icon: Workflow,
  },
];

const DEVOPS_FAQS: FAQItem[] = [
  {
    question: "How does DeployCheck store SSH server keys?",
    answer:
      "All SSH private keys and passwords are encrypted using AES-256-GCM. Encryption keys reside in protected environment variables, and decrypted credentials never touch API responses or logs.",
  },
  {
    question: "Can we run DeployCheck inside our private VPC?",
    answer:
      "Yes. DeployCheck can be deployed as a Docker container or Node.js service entirely within your private subnet, communicating with internal servers without public internet exposure.",
  },
];

export default function DevOpsTeamsSolutionPage() {
  return (
    <MarketingLayout currentPath="/solutions/devops-teams">
      <PageHero
        badge="FOR DEVOPS & INFRASTRUCTURE TEAMS"
        badgeVariant="blue"
        title="Standardized server governance and policy-controlled deployments"
        description="Replace fragmented bash scripts and undocumented SSH keys. Unify server telemetry, pre-deployment security scanning, and atomic release pipelines across your infrastructure."
        primaryAction={{
          label: "Govern Your Fleet",
          href: "/signup",
        }}
        secondaryAction={{
          label: "View VPS Management",
          href: "/features/vps-management",
        }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEVOPS_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17172A] mb-2">{p.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#3563E9]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Fleet Governance</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FAQAccordion items={DEVOPS_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}

