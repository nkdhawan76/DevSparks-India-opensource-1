"use client";

import React from "react";
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

interface MenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const DEVELOP_ITEMS: MenuItem[] = [
  {
    title: "Projects",
    description: "Connect and manage your application repositories.",
    icon: FolderKanban,
    route: "/app/projects",
  },
  {
    title: "Pre-deployment Audit",
    description: "Find dependency, configuration and security issues.",
    icon: ShieldCheck,
    route: "/features/audit",
  },
  {
    title: "AI Assistant",
    description: "Analyze code and suggest fixes using your AI provider.",
    icon: Bot,
    route: "/features/ai-assistant",
  },
  {
    title: "Code Diff Review",
    description: "Review and approve AI-generated code changes.",
    icon: GitCompare,
    route: "/features/code-review",
  },
];

const DEPLOY_ITEMS: MenuItem[] = [
  {
    title: "VPS Management",
    description: "Connect and inspect your own servers.",
    icon: Server,
    route: "/features/vps",
  },
  {
    title: "Guided Deployment",
    description: "Deploy supported applications with guided workflows.",
    icon: Rocket,
    route: "/features/deployment",
  },
  {
    title: "SSH Server Assistant",
    description: "Diagnose server issues with approval-based AI operations.",
    icon: Terminal,
    route: "/features/ssh-assistant",
  },
];

const MONITOR_ITEMS: MenuItem[] = [
  {
    title: "Website Monitoring",
    description: "Track uptime, response time, SSL and DNS.",
    icon: Activity,
    route: "/features/monitoring",
  },
  {
    title: "Logs & Incidents",
    description: "Analyze application events and operational issues.",
    icon: ScrollText,
    route: "/features/logs",
  },
  {
    title: "Maintenance",
    description: "Manage scheduled health and maintenance tasks.",
    icon: Wrench,
    route: "/features/maintenance",
  },
];

export function ProductMegaMenu({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-[840px] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl shadow-slate-200/50 p-6 grid grid-cols-12 gap-6 font-sans">
      {/* 3 Main Action Columns (9 cols) */}
      <div className="col-span-9 grid grid-cols-3 gap-5">
        {/* DEVELOP */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            DEVELOP
          </div>
          <div className="space-y-1">
            {DEVELOP_ITEMS.map((item) => {
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

        {/* DEPLOY */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            DEPLOY
          </div>
          <div className="space-y-1">
            {DEPLOY_ITEMS.map((item) => {
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

        {/* MONITOR */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            MONITOR
          </div>
          <div className="space-y-1">
            {MONITOR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-md bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#16A34A] group-hover:text-white transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#17172A] group-hover:text-[#16A34A] transition-colors leading-tight">
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

      {/* Featured Side Panel (3 cols) */}
      <div className="col-span-3 bg-gradient-to-br from-[#F7F8FC] to-[#EEF2FF] border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between">
        <div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-[#5938F5] text-[9.5px] font-bold uppercase tracking-wider mb-2">
            Complete Workflow
          </span>
          <h4 className="text-xs font-bold text-[#17172A] leading-snug">
            One platform. Complete deployment workflow.
          </h4>
          <p className="text-[11px] text-[#667085] mt-1.5 leading-relaxed">
            Audit your code, fix issues with AI, deploy applications and monitor production health.
          </p>
        </div>

        <Link
          href="/documentation"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5938F5] hover:text-[#4726DB] transition-colors mt-3 pt-3 border-t border-slate-200/60"
        >
          <span>Explore All Features</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
