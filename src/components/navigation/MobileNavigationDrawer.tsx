"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  ChevronDown,
  Zap,
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
import { GitHubIcon } from "@/components/common/Icons";

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigationDrawer({
  isOpen,
  onClose,
}: MobileNavigationDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("product");

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

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto font-sans z-10">
        {/* Top Header */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <Link href="/" onClick={onClose} className="inline-flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-[#5938F5] text-white flex items-center justify-center font-bold">
              <Zap className="h-3.5 w-3.5 fill-white" />
            </div>
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
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Accordion Navigation Groups */}
        <div className="p-4 flex-1 space-y-2 overflow-y-auto">
          {/* PRODUCT ACCORDION */}
          <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("product")}
              className="w-full p-3 flex items-center justify-between text-xs font-bold text-[#17172A] bg-slate-50/60 hover:bg-slate-50"
            >
              <span>Product</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "product" ? "rotate-180 text-[#5938F5]" : ""
                }`}
              />
            </button>
            {expandedSection === "product" && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-[#E5E7EB]">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">DEVELOP</div>
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

                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pt-2">DEPLOY</div>
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

                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pt-2">MONITOR</div>
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
          <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("solutions")}
              className="w-full p-3 flex items-center justify-between text-xs font-bold text-[#17172A] bg-slate-50/60 hover:bg-slate-50"
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "solutions" ? "rotate-180 text-[#5938F5]" : ""
                }`}
              />
            </button>
            {expandedSection === "solutions" && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-[#E5E7EB]">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">BY ROLE</div>
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
          <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("resources")}
              className="w-full p-3 flex items-center justify-between text-xs font-bold text-[#17172A] bg-slate-50/60 hover:bg-slate-50"
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "resources" ? "rotate-180 text-[#5938F5]" : ""
                }`}
              />
            </button>
            {expandedSection === "resources" && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-[#E5E7EB]">
                <Link href="/documentation" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <BookOpen className="h-3.5 w-3.5 text-purple-600" />
                  <span>Documentation</span>
                </Link>
                <Link href="/docs/api" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Code2 className="h-3.5 w-3.5 text-purple-600" />
                  <span>API Reference</span>
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

          {/* OPEN SOURCE ACCORDION */}
          <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection("opensource")}
              className="w-full p-3 flex items-center justify-between text-xs font-bold text-[#17172A] bg-slate-50/60 hover:bg-slate-50"
            >
              <span>Open Source</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  expandedSection === "opensource" ? "rotate-180 text-[#5938F5]" : ""
                }`}
              />
            </button>
            {expandedSection === "opensource" && (
              <div className="p-3 bg-white space-y-2 text-xs border-t border-[#E5E7EB]">
                <a
                  href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between py-1 text-slate-700 hover:text-[#5938F5]"
                >
                  <span className="flex items-center gap-2">
                    <GitHubIcon size={14} />
                    <span>GitHub Repository</span>
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
                <Link href="/roadmap" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Map className="h-3.5 w-3.5 text-slate-500" />
                  <span>Roadmap</span>
                </Link>
                <Link href="/docs/terms" onClick={onClose} className="flex items-center gap-2 py-1 text-slate-700 hover:text-[#5938F5]">
                  <Bookmark className="h-3.5 w-3.5 text-slate-500" />
                  <span>License (MIT)</span>
                </Link>
              </div>
            )}
          </div>

          {/* PRICING LINK */}
          <Link
            href="/documentation"
            onClick={onClose}
            className="block p-3 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#17172A] hover:bg-slate-50"
          >
            Pricing
          </Link>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E5E7EB] bg-slate-50 space-y-2">
          <Button
            variant="outline"
            asChild
            className="w-full h-9 rounded-[8px] text-xs font-semibold justify-center"
          >
            <Link href="/login" onClick={onClose}>
              Sign In
            </Link>
          </Button>

          <Button
            asChild
            className="w-full h-9 rounded-[8px] text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white justify-center shadow-xs"
          >
            <Link href="/signup" onClick={onClose}>
              <span>Get Started Free</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
