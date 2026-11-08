"use client";

import React from "react";
import Link from "next/link";
import {
  Code,
  Workflow,
  Users,
  Building2,
  ShieldCheck,
  BrainCircuit,
  Server,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

interface SolutionItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const BY_ROLE_ITEMS: SolutionItem[] = [
  {
    title: "For Developers",
    description: "Audit, debug and prepare projects for deployment.",
    icon: Code,
    route: "/solutions/developers",
  },
  {
    title: "For DevOps Teams",
    description: "Manage deployment workflows and server health.",
    icon: Workflow,
    route: "/solutions/devops",
  },
  {
    title: "For Agencies",
    description: "Manage multiple client projects and environments.",
    icon: Users,
    route: "/solutions/agencies",
  },
  {
    title: "For Startups",
    description: "Simplify deployment operations with less DevOps overhead.",
    icon: Building2,
    route: "/solutions/startups",
  },
];

const BY_USE_CASE_ITEMS: SolutionItem[] = [
  {
    title: "Pre-deployment Security",
    description: "Catch issues before production.",
    icon: ShieldCheck,
    route: "/features/audit",
  },
  {
    title: "AI-assisted Debugging",
    description: "Understand errors and review suggested fixes.",
    icon: BrainCircuit,
    route: "/features/ai-assistant",
  },
  {
    title: "VPS Automation",
    description: "Simplify approved server operations.",
    icon: Server,
    route: "/features/vps",
  },
  {
    title: "Website Reliability",
    description: "Track uptime and respond to incidents.",
    icon: HeartPulse,
    route: "/features/monitoring",
  },
];

export function SolutionsMegaMenu({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-[680px] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl shadow-slate-200/50 p-6 grid grid-cols-12 gap-5 font-sans">
      {/* 2 Main Columns (8 cols) */}
      <div className="col-span-8 grid grid-cols-2 gap-4">
        {/* BY ROLE */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            BY ROLE
          </div>
          <div className="space-y-1">
            {BY_ROLE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-md bg-purple-50 text-[#5938F5] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#5938F5] group-hover:text-white transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#17172A] group-hover:text-[#5938F5] transition-colors leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[10.5px] text-[#667085] leading-tight mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* BY USE CASE */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            BY USE CASE
          </div>
          <div className="space-y-1">
            {BY_USE_CASE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-md bg-blue-50 text-[#3563E9] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#3563E9] group-hover:text-white transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#17172A] group-hover:text-[#3563E9] transition-colors leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[10.5px] text-[#667085] leading-tight mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Side Panel (4 cols) */}
      <div className="col-span-4 bg-gradient-to-br from-[#F7F8FC] to-[#EFF4FF] border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between">
        <div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-[#3563E9] text-[9.5px] font-bold uppercase tracking-wider mb-2">
            Tailored Stack
          </span>
          <h4 className="text-xs font-bold text-[#17172A] leading-snug">
            Less deployment complexity. More control.
          </h4>
          <p className="text-[11px] text-[#667085] mt-1.5 leading-relaxed">
            Standardize audits and deployments across your engineering organization.
          </p>
        </div>

        <Link
          href="/documentation"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3563E9] hover:text-[#264FC7] transition-colors mt-3 pt-3 border-t border-slate-200/60"
        >
          <span>Explore Solutions</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
