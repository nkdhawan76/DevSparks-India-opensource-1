"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  ChevronDown,
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
  Code,
  Workflow,
  Users,
  Building2,
  BookOpen,
  Code2,
  Bookmark,
  History,
  Map,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon, DeployCheckLogo } from "@/components/common/Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigationDrawer({
  isOpen,
  onClose,
}: MobileNavigationDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("product");
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  // GSAP Drawer animation on open
  useGSAP(
    () => {
      if (!isOpen) return;

      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (backdropRef.current && drawerRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" }
        );

        gsap.fromTo(
          drawerRef.current,
          { x: "-100%" },
          { x: "0%", duration: 0.32, ease: "power3.out" }
        );

        gsap.from(".mobile-drawer-item", {
          opacity: 0,
          x: -8,
          duration: 0.2,
          stagger: 0.03,
          delay: 0.1,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-slate-900/35 backdrop-blur-xs will-change-[opacity]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto font-sans z-10 will-change-transform"
      >
        {/* Top Header */}
        <div className="p-3.5 border-b border-[#E5E7EB] flex items-center justify-between">
          <Link href="/" onClick={onClose} className="inline-flex items-center gap-2.5">
            <DeployCheckLogo size={28} className="w-7 h-7 shrink-0 shadow-xs" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-bold text-xs text-[#17172A] leading-tight">
                DeployCheck
              </span>
              <span className="text-[9px] text-slate-400 font-medium">By DevSparks India</span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Accordion Navigation Groups */}
        <div className="p-3.5 flex-1 space-y-2 overflow-y-auto">
          {/* PRODUCT ACCORDION */}
          <div className="mobile-drawer-item border border-[#E5E7EB] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("product")}
              className="w-full p-2.5 flex items-center justify-between text-xs font-bold text-[#17172A] bg-slate-50/60 hover:bg-slate-50"
            >
              <span>Product</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                  expandedSection === "product" ? "rotate-180 text-[#5938F5]" : ""
                }`}
              />
            </button>
            {expandedSection === "product" && (
              <div className="p-2.5 bg-white space-y-1.5 text-xs border-t border-[#E5E7EB]">
                <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">DEVELOP</div>
                <Link href="/app/projects" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <FolderKanban className="h-3.5 w-3.5 text-purple-600" />
                  <span>Projects</span>
                </Link>
                <Link href="/features/audit" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
                  <span>Pre-deployment Audit</span>
                </Link>
                <Link href="/features/ai-assistant" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Bot className="h-3.5 w-3.5 text-purple-600" />
                  <span>AI Assistant</span>
                </Link>
                <Link href="/features/code-review" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <GitCompare className="h-3.5 w-3.5 text-purple-600" />
                  <span>Code Diff Review</span>
                </Link>

                <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider pt-1.5">DEPLOY</div>
                <Link href="/features/vps" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#3563E9]">
                  <Server className="h-3.5 w-3.5 text-blue-600" />
                  <span>VPS Management</span>
                </Link>
                <Link href="/features/deployment" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#3563E9]">
                  <Rocket className="h-3.5 w-3.5 text-blue-600" />
                  <span>Guided Deployment</span>
                </Link>
                <Link href="/features/ssh-assistant" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#3563E9]">
                  <Terminal className="h-3.5 w-3.5 text-blue-600" />
                  <span>SSH Server Assistant</span>
                </Link>

                <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider pt-1.5">MONITOR</div>
                <Link href="/features/monitoring" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#16A34A]">
                  <Activity className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Website Monitoring</span>
                </Link>
                <Link href="/features/logs" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#16A34A]">
                  <ScrollText className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Logs & Incidents</span>
                </Link>
                <Link href="/features/maintenance" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#16A34A]">
                  <Wrench className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Maintenance</span>
                </Link>
              </div>
            )}
          </div>

          {/* SOLUTIONS ACCORDION */}
          <div className="mobile-drawer-item border border-[#E5E7EB] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("solutions")}
              className="w-full p-2.5 flex items-center justify-between text-xs font-bold text-[#17172A] bg-slate-50/60 hover:bg-slate-50"
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                  expandedSection === "solutions" ? "rotate-180 text-[#5938F5]" : ""
                }`}
              />
            </button>
            {expandedSection === "solutions" && (
              <div className="p-2.5 bg-white space-y-1.5 text-xs border-t border-[#E5E7EB]">
                <div className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">BY ROLE</div>
                <Link href="/solutions/developers" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Code className="h-3.5 w-3.5 text-purple-600" />
                  <span>For Developers</span>
                </Link>
                <Link href="/solutions/devops" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Workflow className="h-3.5 w-3.5 text-purple-600" />
                  <span>For DevOps Teams</span>
                </Link>
                <Link href="/solutions/agencies" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Users className="h-3.5 w-3.5 text-purple-600" />
                  <span>For Agencies</span>
                </Link>
                <Link href="/solutions/startups" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Building2 className="h-3.5 w-3.5 text-purple-600" />
                  <span>For Startups</span>
                </Link>
              </div>
            )}
          </div>

          {/* RESOURCES ACCORDION */}
          <div className="mobile-drawer-item border border-[#E5E7EB] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("resources")}
              className="w-full p-2.5 flex items-center justify-between text-xs font-bold text-[#17172A] bg-slate-50/60 hover:bg-slate-50"
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                  expandedSection === "resources" ? "rotate-180 text-[#5938F5]" : ""
                }`}
              />
            </button>
            {expandedSection === "resources" && (
              <div className="p-2.5 bg-white space-y-1.5 text-xs border-t border-[#E5E7EB]">
                <Link href="/documentation" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <BookOpen className="h-3.5 w-3.5 text-purple-600" />
                  <span>Documentation</span>
                </Link>
                <Link href="/docs/api" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Code2 className="h-3.5 w-3.5 text-purple-600" />
                  <span>API Reference</span>
                </Link>
                <Link href="/documentation" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Bookmark className="h-3.5 w-3.5 text-purple-600" />
                  <span>Getting Started</span>
                </Link>
                <Link href="/changelog" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <History className="h-3.5 w-3.5 text-purple-600" />
                  <span>Changelog</span>
                </Link>
                <Link href="/roadmap" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Map className="h-3.5 w-3.5 text-purple-600" />
                  <span>Roadmap</span>
                </Link>
              </div>
            )}
          </div>

          {/* OPEN SOURCE DIRECT LINK */}
          <div className="mobile-drawer-item border border-[#E5E7EB] rounded-xl p-2.5">
            <a
              href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
              target="_blank"
              rel="noreferrer noopener"
              onClick={onClose}
              className="flex items-center justify-between text-xs font-bold text-[#17172A] hover:text-[#5938F5] group transition-colors"
            >
              <div className="flex items-center gap-2">
                <GitHubIcon size={14} className="text-slate-800 group-hover:text-[#5938F5] transition-colors" />
                <span>Open Source on GitHub</span>
              </div>
              <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-[#5938F5] transition-colors" />
            </a>
          </div>

          {/* PRICING LINK */}
          <div className="mobile-drawer-item border border-[#E5E7EB] rounded-xl p-2.5">
            <Link
              href="/pricing"
              onClick={onClose}
              className="flex items-center justify-between text-xs font-bold text-[#17172A] hover:text-[#5938F5] group transition-colors"
            >
              <span>Pricing</span>
              <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-[#5938F5] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-3.5 border-t border-[#E5E7EB] space-y-2 bg-slate-50/50">
          <Button
            asChild
            className="w-full h-8 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white rounded-[8px]"
          >
            <Link href="/signup" onClick={onClose}>
              Get Started Free
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full h-8 text-xs font-semibold border-[#E5E7EB] text-[#17172A] rounded-[8px] bg-white"
          >
            <Link href="/login" onClick={onClose}>
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
