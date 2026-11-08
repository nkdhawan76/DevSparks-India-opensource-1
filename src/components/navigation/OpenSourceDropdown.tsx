"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ExternalLink, GitPullRequest, Map, FileText, Bug } from "lucide-react";
import { GitHubIcon } from "@/components/common/Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(containerRef.current, {
        y: -4,
        opacity: 0,
        scale: 0.98,
        duration: 0.2,
      });

      tl.from(
        ".dropdown-item",
        {
          y: 3,
          opacity: 0,
          duration: 0.15,
          stagger: 0.02,
        },
        "-=0.1"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-[220px] bg-white border border-[#E5E7EB] rounded-xl shadow-xl shadow-slate-200/60 p-1.5 font-sans select-none will-change-transform"
    >
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
                className="dropdown-item flex items-center justify-between p-1.5 rounded-[7px] text-[11.5px] font-semibold text-[#17172A] hover:bg-slate-50 hover:text-[#5938F5] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded-[5px] bg-slate-50 text-slate-700 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-[#5938F5] transition-colors">
                    <Icon className="h-3 w-3" size={12} />
                  </div>
                  <span>{item.title}</span>
                </div>
                <ExternalLink className="h-2.5 w-2.5 text-slate-400 opacity-60" />
              </a>
            );
          }
          return (
            <Link
              key={item.title}
              href={item.route}
              onClick={onClose}
              className="dropdown-item flex items-center gap-2 p-1.5 rounded-[7px] text-[11.5px] font-semibold text-[#17172A] hover:bg-slate-50 hover:text-[#5938F5] transition-colors group"
            >
              <div className="w-5.5 h-5.5 rounded-[5px] bg-slate-50 text-slate-700 flex items-center justify-center group-hover:bg-purple-50 group-hover:text-[#5938F5] transition-colors">
                <Icon className="h-3 w-3" size={12} />
              </div>
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
