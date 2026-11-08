"use client";

import React, { useRef } from "react";
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
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface SolutionItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const BY_ROLE_ITEMS: SolutionItem[] = [
  {
    title: "For Developers",
    description: "Audit, debug and prepare projects.",
    icon: Code,
    route: "/solutions/developers",
  },
  {
    title: "For DevOps Teams",
    description: "Manage deployment and server health.",
    icon: Workflow,
    route: "/solutions/devops-teams",
  },
  {
    title: "For Agencies",
    description: "Manage client projects and setups.",
    icon: Users,
    route: "/solutions/agencies",
  },
  {
    title: "For Startups",
    description: "Deploy fast with minimal overhead.",
    icon: Building2,
    route: "/solutions/startups",
  },
];

const BY_USE_CASE_ITEMS: SolutionItem[] = [
  {
    title: "Pre-deployment Security",
    description: "Catch security flaws before production.",
    icon: ShieldCheck,
    route: "/features/pre-deployment-audit",
  },
  {
    title: "AI-assisted Debugging",
    description: "Understand errors and review fixes.",
    icon: BrainCircuit,
    route: "/features/ai-assistant",
  },
  {
    title: "VPS Automation",
    description: "Simplify approved server operations.",
    icon: Server,
    route: "/features/vps-management",
  },
  {
    title: "Website Reliability",
    description: "Track uptime and respond to incidents.",
    icon: HeartPulse,
    route: "/features/website-monitoring",
  },
];

export function SolutionsMegaMenu({ onClose }: { onClose?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        containerRef.current,
        { y: -6, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.22,
          clearProps: "all",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-[660px] max-w-[95vw] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden font-sans select-none will-change-transform"
    >
      {/* Main Top Grid */}
      <div className="p-4 sm:p-5 grid grid-cols-12 gap-4">
        {/* 2 Main Columns (8 cols) */}
        <div className="col-span-8 grid grid-cols-2 gap-3.5">
          {/* BY ROLE */}
          <div className="solutions-column">
            <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              BY ROLE
            </div>
            <div className="space-y-0.5">
              {BY_ROLE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.route}
                    onClick={onClose}
                    className="solutions-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-6.5 h-6.5 rounded-[6px] bg-purple-50 text-[#5938F5] border border-purple-100/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-100 group-hover:text-[#4726DB] group-hover:border-purple-200 transition-all duration-150 group-hover:scale-110 shadow-2xs">
                      <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-150" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11.5px] font-semibold text-[#17172A] group-hover:text-[#5938F5] transition-colors leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-[#667085] leading-tight mt-0.5 line-clamp-1">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* BY USE CASE */}
          <div className="solutions-column">
            <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
              BY USE CASE
            </div>
            <div className="space-y-0.5">
              {BY_USE_CASE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.route}
                    onClick={onClose}
                    className="solutions-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-6.5 h-6.5 rounded-[6px] bg-blue-50 text-[#3563E9] border border-blue-100/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-100 group-hover:text-[#254edb] group-hover:border-blue-200 transition-all duration-150 group-hover:scale-110 shadow-2xs">
                      <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-150" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11.5px] font-semibold text-[#17172A] group-hover:text-[#3563E9] transition-colors leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-[#667085] leading-tight mt-0.5 line-clamp-1">
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
        <div className="solutions-featured-panel col-span-4 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-[#E5E7EB] rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-[#3563E9] text-[8.5px] font-bold uppercase tracking-wider mb-1.5">
              Purpose Built
            </span>
            <h4 className="text-[11.5px] font-bold text-[#17172A] leading-snug">
              Less deployment complexity. More control.
            </h4>
            <p className="text-[10px] text-[#667085] mt-1.5 leading-relaxed">
              Tailored deployment pipelines and security automation for modern software teams.
            </p>
          </div>

          <Link
            href="/solutions/developers"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#3563E9] hover:text-blue-700 transition-colors mt-3 pt-2.5 border-t border-slate-200/60 group"
          >
            <span>Explore Solutions</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Full-Width Horizontal Bottom Bar */}
      <div className="solutions-bottom-bar border-t border-[#E5E7EB] bg-[#F7F8FC] px-4 sm:px-5 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded-full bg-blue-100 text-[#3563E9] flex items-center justify-center shrink-0">
            <Sparkles className="h-3 w-3" />
          </div>
          <p className="text-[11px] text-[#667085] truncate">
            Need tailored infrastructure governance or custom policy runners?
          </p>
        </div>
        <Link
          href="/contact"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3563E9] hover:text-[#254edb] transition-colors shrink-0 ml-3 group"
        >
          <span>Contact Team</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
