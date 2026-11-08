import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Wrench,
  Clock,
  Database,
  Trash2,
  HardDrive,
  ShieldCheck,
} from "lucide-react";

const meta = getRouteMetadata("/features/maintenance");

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

const TASKS = [
  {
    title: "Automated Log Rotation",
    desc: "Compress and archive application and web server log files to prevent unmanaged disk bloat and unexpected server freezes.",
    icon: Trash2,
  },
  {
    title: "Database Backup Automation",
    desc: "Execute scheduled pg_dump database snapshots with secure storage, verification checks, and retention schedule cleanup.",
    icon: Database,
  },
  {
    title: "Disk Space & Temp Cleanup",
    desc: "Safely prune orphaned build artifacts, temporary cache files, and dangling package caches under approval-enforced policy.",
    icon: HardDrive,
  },
  {
    title: "Human Approval for State Changes",
    desc: "Risky server tasks such as package upgrades or system reboots require explicit confirmation before execution begins.",
    icon: ShieldCheck,
  },
];

const MAINTENANCE_FAQS: FAQItem[] = [
  {
    question: "Are maintenance tasks executed directly without confirmation?",
    answer:
      "Routine safe read-only checks run on schedule. Any mutating operation (such as database restoration or system reboots) strictly adheres to DeployCheck Rule 2 and requires explicit human approval.",
  },
  {
    question: "How are backup credentials secured?",
    answer:
      "Database credentials and storage target tokens are encrypted with AES-256-GCM in the secure credential vault and decrypted only in ephemeral runner memory.",
  },
];

export default function MaintenancePage() {
  return (
    <MarketingLayout currentPath="/features/maintenance">
      <PageHero
        badge="INFRASTRUCTURE HYGIENE"
        badgeVariant="blue"
        title="Scheduled maintenance, automated backups and disk hygiene"
        description="Prevent outages before they occur. Automate log rotation, temp file pruning, database snapshots, and system health checks with policy-controlled safety."
        primaryAction={{
          label: "Configure Maintenance",
          href: "/signup",
        }}
        secondaryAction={{
          label: "View VPS Management",
          href: "/features/vps-management",
        }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TASKS.map((task) => {
            const Icon = task.icon;
            return (
              <div
                key={task.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-[#5938F5]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17172A] mb-2">{task.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">{task.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#5938F5]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Scheduled Automation</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FAQAccordion items={MAINTENANCE_FAQS} />
      <CTASection />
    </MarketingLayout>
  );
}
