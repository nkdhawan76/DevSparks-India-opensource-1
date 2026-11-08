"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, GitPullRequest, Map, FileText, Bug } from "lucide-react";
import { GitHubIcon } from "@/components/common/Icons";

const OPEN_SOURCE_ITEMS = [
  {
    title: "GitHub Repository",
    route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
    icon: GitHubIcon,
    external: true,
  },
  {
    title: "Contributing Guide",
    route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/blob/main/README.md",
    icon: GitPullRequest,
    external: true,
  },
  {
    title: "Project Roadmap",
    route: "/roadmap",
    icon: Map,
    external: false,
  },
  {
    title: "License (MIT)",
    route: "/docs/terms",
    icon: FileText,
    external: false,
  },
  {
    title: "Report a Bug",
    route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/issues",
    icon: Bug,
    external: true,
  },
];

export function OpenSourceDropdown({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-[240px] bg-white border border-[#E5E7EB] rounded-xl shadow-xl shadow-slate-200/50 p-2 font-sans">
      <div className="space-y-0.5">
        {OPEN_SOURCE_ITEMS.map((item) => {
          const Icon = item.icon;
          if (item.external) {
            return (
              <a
                key={item.title}
                href={item.route}
                target="_blank"
                rel="noreferrer noopener"
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-[#17172A] hover:bg-slate-50 hover:text-[#5938F5] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#5938F5]" size={14} />
                  <span>{item.title}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-slate-400 opacity-60" />
              </a>
            );
          }
          return (
            <Link
              key={item.title}
              href={item.route}
              onClick={onClose}
              className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-[#17172A] hover:bg-slate-50 hover:text-[#5938F5] transition-colors group"
            >
              <Icon className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#5938F5]" size={14} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
