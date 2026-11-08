"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  FolderKanban,
  ShieldCheck,
  Bot,
  GitCompare,
  Server,
  Rocket,
  Terminal,
  Activity,
  ScrollText,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const DEVELOP_ITEMS: MenuItem[] = [
  {
    title: "Projects",
    description: "Connect and manage repositories.",
    icon: FolderKanban,
    route: "/app/projects",
  },
  {
    title: "Pre-deployment Audit",
    description: "Find dependency and security issues.",
    icon: ShieldCheck,
    route: "/features/audit",
  },
  {
    title: "AI Assistant",
    description: "Analyze code with your AI provider.",
    icon: Bot,
    route: "/features/ai-assistant",
  },
  {
    title: "Code Diff Review",
    description: "Review and approve code patches.",
    icon: GitCompare,
    route: "/features/code-review",
  },
];

const DEPLOY_ITEMS: MenuItem[] = [
  {
    title: "VPS Management",
    description: "Connect and inspect your servers.",
    icon: Server,
    route: "/features/vps",
  },
  {
    title: "Guided Deployment",
    description: "Deploy apps with guided workflows.",
    icon: Rocket,
    route: "/features/deployment",
  },
  {
    title: "SSH Server Assistant",
    description: "Diagnose server issues via AI.",
    icon: Terminal,
    route: "/features/ssh-assistant",
  },
];

const MONITOR_ITEMS: MenuItem[] = [
  {
    title: "Website Monitoring",
    description: "Track uptime, SSL and DNS.",
    icon: Activity,
    route: "/features/monitoring",
  },
  {
    title: "Logs & Incidents",
    description: "Analyze events and issues.",
    icon: ScrollText,
    route: "/features/logs",
  },
  {
    title: "Maintenance",
    description: "Manage health and scheduled tasks.",
    icon: Wrench,
    route: "/features/maintenance",
  },
];

export function ProductMegaMenu({ onClose }: { onClose?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(containerRef.current, {
        y: -6,
        opacity: 0,
        scale: 0.985,
        duration: 0.22,
      });

      tl.from(
        ".product-column",
        {
          y: 6,
          opacity: 0,
          duration: 0.2,
          stagger: 0.04,
        },
        "-=0.12"
      );

      tl.from(
        ".product-item",
        {
          y: 4,
          opacity: 0,
          duration: 0.16,
          stagger: 0.015,
        },
        "-=0.12"
      );

      tl.from(
        ".product-featured-panel",
        {
          x: 6,
          opacity: 0,
          duration: 0.2,
        },
        "-=0.15"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-[800px] max-w-[95vw] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl shadow-slate-200/60 p-4 sm:p-5 grid grid-cols-12 gap-4 font-sans select-none will-change-transform"
    >
      {/* 3 Main Action Columns (9 cols) */}
      <div className="col-span-9 grid grid-cols-3 gap-3.5">
        {/* DEVELOP */}
        <div className="product-column">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            DEVELOP
          </div>
          <div className="space-y-0.5">
            {DEVELOP_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="product-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-6.5 h-6.5 rounded-[6px] bg-purple-50 text-[#5938F5] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#5938F5] group-hover:text-white transition-all duration-150 group-hover:scale-105">
                    <Icon className="h-3.5 w-3.5" />
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

        {/* DEPLOY */}
        <div className="product-column">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            DEPLOY
          </div>
          <div className="space-y-0.5">
            {DEPLOY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="product-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-6.5 h-6.5 rounded-[6px] bg-blue-50 text-[#3563E9] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#3563E9] group-hover:text-white transition-all duration-150 group-hover:scale-105">
                    <Icon className="h-3.5 w-3.5" />
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

        {/* MONITOR */}
        <div className="product-column">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            MONITOR
          </div>
          <div className="space-y-0.5">
            {MONITOR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="product-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-6.5 h-6.5 rounded-[6px] bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#16A34A] group-hover:text-white transition-all duration-150 group-hover:scale-105">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11.5px] font-semibold text-[#17172A] group-hover:text-[#16A34A] transition-colors leading-tight">
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

      {/* Featured Side Panel (3 cols) */}
      <div className="product-featured-panel col-span-3 bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-[#E5E7EB] rounded-xl p-3.5 flex flex-col justify-between">
        <div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-[#5938F5] text-[8.5px] font-bold uppercase tracking-wider mb-1.5">
            Complete Workflow
          </span>
          <h4 className="text-[11.5px] font-bold text-[#17172A] leading-snug">
            One platform. Complete deployment workflow.
          </h4>
          <p className="text-[10px] text-[#667085] mt-1 leading-relaxed">
            Audit your code, fix issues with AI, deploy applications and monitor production health.
          </p>
        </div>

        <Link
          href="/documentation"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5938F5] hover:text-[#4726DB] transition-colors mt-2.5 pt-2.5 border-t border-slate-200/60"
        >
          <span>Explore All Features</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
