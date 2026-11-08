"use client";

import React, { useRef } from "react";
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
  ArrowRight,
  Heart,
} from "lucide-react";
import { GitHubIcon } from "@/components/common/Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
    description: "Installation and complete guides.",
    icon: BookOpen,
    route: "/docs",
  },
  {
    title: "API Reference",
    description: "API endpoints and client examples.",
    icon: Code2,
    route: "/docs/api",
  },
  {
    title: "Getting Started",
    description: "Start using DeployCheck step by step.",
    icon: Bookmark,
    route: "/docs/getting-started",
  },
  {
    title: "Tutorials",
    description: "Real-world developer tutorials.",
    icon: GraduationCap,
    route: "/tutorials",
  },
];

const COMMUNITY_ITEMS: ResourceItem[] = [
  {
    title: "GitHub Repository",
    description: "Explore source and star on GitHub.",
    icon: GitHubIcon,
    route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
    external: true,
  },
  {
    title: "Changelog",
    description: "Latest improvements and releases.",
    icon: History,
    route: "/changelog",
  },
  {
    title: "Roadmap",
    description: "Upcoming platform milestones.",
    icon: Map,
    route: "/roadmap",
  },
  {
    title: "Community Discussions",
    description: "Ask questions and share feedback.",
    icon: MessagesSquare,
    route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1/discussions",
    external: true,
  },
];

export function ResourcesMegaMenu({ onClose }: { onClose?: () => void }) {
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

      tl.from(
        ".resources-column",
        {
          y: 6,
          opacity: 0,
          duration: 0.2,
          stagger: 0.04,
        },
        "-=0.12"
      );

      tl.from(
        ".resources-item",
        {
          y: 4,
          opacity: 0,
          duration: 0.16,
          stagger: 0.015,
        },
        "-=0.12"
      );

      tl.from(
        ".resources-bottom-bar",
        {
          y: 4,
          opacity: 0,
          duration: 0.18,
        },
        "-=0.1"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-[540px] max-w-[95vw] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden font-sans select-none will-change-transform"
    >
      {/* Main 2-Column Grid */}
      <div className="p-4 sm:p-5 grid grid-cols-2 gap-4">
        {/* LEARN */}
        <div className="resources-column">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            LEARN
          </div>
          <div className="space-y-0.5">
            {LEARN_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="resources-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
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

        {/* COMMUNITY */}
        <div className="resources-column">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            COMMUNITY
          </div>
          <div className="space-y-0.5">
            {COMMUNITY_ITEMS.map((item) => {
              const Icon = item.icon;
              if (item.external) {
                return (
                  <a
                    key={item.title}
                    href={item.route}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={onClose}
                    className="resources-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-6.5 h-6.5 rounded-[6px] bg-slate-100 text-slate-700 border border-slate-200/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-50 group-hover:text-[#5938F5] group-hover:border-purple-200 transition-all duration-150 group-hover:scale-110 shadow-2xs">
                      <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-150" size={13} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11.5px] font-semibold text-[#17172A] group-hover:text-[#5938F5] transition-colors flex items-center justify-between leading-tight">
                        <span>{item.title}</span>
                        <ExternalLink className="h-2.5 w-2.5 text-slate-400 opacity-60" />
                      </div>
                      <div className="text-[10px] text-[#667085] leading-tight mt-0.5 line-clamp-1">
                        {item.description}
                      </div>
                    </div>
                  </a>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.route}
                  onClick={onClose}
                  className="resources-item flex items-start gap-2 p-1.5 rounded-[8px] hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-6.5 h-6.5 rounded-[6px] bg-purple-50 text-[#5938F5] border border-purple-100/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-100 group-hover:text-[#4726DB] group-hover:border-purple-200 transition-all duration-150 group-hover:scale-110 shadow-2xs">
                    <Icon className="h-3.5 w-3.5 shrink-0 transition-transform duration-150" size={13} />
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
      </div>

      {/* Full-Width Horizontal Bottom Bar */}
      <div className="resources-bottom-bar border-t border-[#E5E7EB] bg-[#F7F8FC] px-4 sm:px-5 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Heart className="h-3 w-3 fill-rose-600" />
          </div>
          <p className="text-[11px] text-[#667085] truncate">
            Free and open-source forever under the permissive MIT license.
          </p>
        </div>
        <a
          href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
          target="_blank"
          rel="noreferrer noopener"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5938F5] hover:text-[#4726DB] transition-colors shrink-0 ml-3 group"
        >
          <span>Star on GitHub</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
