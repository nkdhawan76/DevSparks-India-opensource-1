import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Server,
  Lock,
  Cpu,
  Terminal,
  Activity,
  HardDrive,
} from "lucide-react";

const meta = getRouteMetadata("/features/vps-management");

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

const VPS_FEATURES = [
  {
    title: "SSH Host Key Fingerprinting",
    desc: "Verify remote server identity using SHA-256 fingerprint verification on first connection to eliminate man-in-the-middle attacks.",
    icon: Lock,
  },
  {
    title: "Live Hardware Telemetry",
    desc: "Inspect real-time CPU core utilization, RAM allocation, and disk volume capacity across all connected Linux nodes without heavy agent daemons.",
    icon: Cpu,
  },
  {
    title: "Policy-Restricted Diagnostics",
    desc: "Run approved read-only diagnostics (systemctl status, docker ps, free -m, df -h) within restricted, safe execution boundaries.",
    icon: Terminal,
  },
  {
    title: "Encrypted Credential Vault",
    desc: "SSH private keys and passphrases are stored strictly encrypted at rest with AES-256-GCM. Private keys are never returned in client API payloads.",
    icon: HardDrive,
  },
];

const VPS_FAQS: FAQItem[] = [
  {
    question: "Do I have to install a proprietary agent on my servers?",
    answer: "No. DeployCheck connects agentlessly via standard SSH protocol. You only need standard SSH access on an Ubuntu, Debian, CentOS, or AlmaLinux host.",
  },
  {
    question: "Which Linux distributions are supported?",
    answer: "DeployCheck supports all major modern Linux distributions including Ubuntu 20.04/22.04 LTS, Debian 11/12, CentOS Stream, and AlmaLinux.",
  },
];

export default function VPSManagementPage() {
  return (
    <MarketingLayout breadcrumbs={meta.breadcrumbs}>
      <PageHero
        badge="Agentless Server Operations"
        title="Manage Your Own Linux Servers with Complete Sovereignty"
        description="Connect, inspect, and diagnose your Linux VPS nodes over SSH with cryptographic host key verification and hardware utilization telemetry."
        primaryCta={{ label: "Connect a Server", href: "/signup" }}
        secondaryCta={{ label: "View Architecture", href: "/docs" }}
      />

      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VPS_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3563E9] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#17172A]">{feat.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Server Mockup */}
      <section className="py-12 sm:py-16 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
              REAL-TIME INVENTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
              Unified VPS Node Overview
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#3563E9] flex items-center justify-center">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#17172A]">mumbai-core-vps-01</div>
                  <div className="text-xs text-slate-400 font-mono">194.168.21.40 • Ubuntu 22.04 LTS</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold self-start sm:self-center">
                <Activity className="h-3 w-3 text-emerald-600" />
                <span>Connected & Healthy</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-slate-400 font-medium">CPU Utilization</div>
                <div className="text-lg font-bold text-[#17172A] mt-1">18.4%</div>
                <div className="text-[10px] text-slate-400">4 vCPUs (AMD EPYC)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-slate-400 font-medium">Memory Used</div>
                <div className="text-lg font-bold text-[#17172A] mt-1">2.4 / 8.0 GB</div>
                <div className="text-[10px] text-slate-400">30% consumed</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-slate-400 font-medium">NVMe Disk Space</div>
                <div className="text-lg font-bold text-[#17172A] mt-1">42.1 / 160 GB</div>
                <div className="text-[10px] text-slate-400">26% consumed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion items={VPS_FAQS} title="VPS Management FAQ" />

      <CTASection
        title="Connect and manage your Linux infrastructure"
        description="Experience agentless, host-verified server operations with complete sovereignty."
      />
    </MarketingLayout>
  );
}
