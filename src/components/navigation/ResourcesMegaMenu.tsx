"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  Bookmark,
  GraduationCap,
  History,
  Map,
  MessagesSquare,
  ExternalLink,
} from "lucide-react";
import { GitHubIcon } from "@/components/common/Icons";

interface ResourceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  route: string;
  external?: boolean;
}

const LEARN_ITEMS: ResourceItem[] = [
  {
    title: "Documentation",
    description: "Installation and complete usage guides.",
    icon: BookOpen,
    route: "/documentation",
  },
  {
    title: "API Reference",
    description: "Explore API endpoints and integration examples.",
    icon: Code2,
    route: "/docs/api",
  },
  {
    title: "Getting Started",
    description: "Start using DeployCheck step by step.",
    icon: Bookmark,
    route: "/documentation",
  },
  {
    title: "Tutorials",
    description: "Practical developer guides.",
    icon: GraduationCap,
    route: "/documentation",
  },
];

const COMMUNITY_ITEMS: ResourceItem[] = [
  {
    title: "GitHub Repository",
    description: "Explore source code and contribute.",
    icon: GitHubIcon,
    route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
    external: true,
  },
  {
    title: "Changelog",
    description: "See latest improvements and releases.",
    icon: History,
    route: "/changelog",
  },
  {
    title: "Roadmap",
    description: "Explore upcoming milestones.",
    icon: Map,
    route: "/roadmap",
  },
  {
    title: "Community Discussions",
    description: "Ask questions and share ideas.",
    icon: MessagesSquare,
    route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/discussions",
    external: true,
  },
];

export function ResourcesMegaMenu({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-[580px] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl shadow-slate-200/50 p-6 grid grid-cols-2 gap-5 font-sans">
      {/* LEARN */}
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          LEARN
        </div>
        <div className="space-y-1">
          {LEARN_ITEMS.map((item) => {
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

      {/* COMMUNITY */}
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          COMMUNITY
        </div>
        <div className="space-y-1">
          {COMMUNITY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.route}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer noopener" : undefined}
                onClick={onClose}
                className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#17172A] group-hover:text-white transition-colors">
                  <Icon className="h-3.5 w-3.5" size={14} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#17172A] group-hover:text-[#5938F5] transition-colors leading-tight flex items-center gap-1">
                    <span>{item.title}</span>
                    {item.external && <ExternalLink className="h-3 w-3 opacity-40" />}
                  </div>
                  <div className="text-[10.5px] text-[#667085] leading-tight mt-0.5">
                    {item.description}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
