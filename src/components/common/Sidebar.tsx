"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FolderGit2,
  ShieldCheck,
  Sparkles,
  Server,
  Rocket,
  Terminal,
  Globe,
  Activity,
  FileText,
  Users,
  Key,
  CreditCard,
  Layers,
  Settings,
  Bell,
  ChevronDown,
  ChevronUp,
  Zap,
  X,
} from "./Icons";

export type NavView =
  | "dashboard"
  | "projects"
  | "audits"
  | "ai"
  | "servers"
  | "deployments"
  | "ssh-console"
  | "monitoring"
  | "logs"
  | "seo"
  | "users"
  | "roles"
  | "plans"
  | "subscriptions"
  | "notifications"
  | "settings"
  | "website-settings"
  | "profile"
  | "auth";

interface SidebarProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: NavView;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export function Sidebar({
  activeView,
  onSelectView,
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  // Accordion state for expandable sections
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    Settings: true,
  });

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const navSections: NavGroup[] = [
    {
      group: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      group: "Projects",
      items: [
        { id: "projects", label: "All Projects", icon: FolderGit2 },
        { id: "audits", label: "Audit Reports", icon: ShieldCheck },
        { id: "ai", label: "AI Assistant", icon: Sparkles },
      ],
    },
    {
      group: "Deploy",
      items: [
        { id: "servers", label: "VPS Servers", icon: Server },
        { id: "deployments", label: "Deployments", icon: Rocket },
        { id: "ssh-console", label: "SSH Console", icon: Terminal },
      ],
    },
    {
      group: "Monitor",
      items: [
        { id: "monitoring", label: "Websites & Apps", icon: Globe },
        { id: "logs", label: "Uptime & Status", icon: Activity },
        { id: "seo", label: "Logs & SEO", icon: FileText },
      ],
    },
    {
      group: "Teams & Access",
      items: [
        { id: "users", label: "Users", icon: Users },
        { id: "roles", label: "Roles & Permissions", icon: Key },
      ],
    },
    {
      group: "Plans & Billing",
      items: [
        { id: "plans", label: "Plans", icon: CreditCard },
        { id: "subscriptions", label: "Subscriptions", icon: Layers },
      ],
    },
    {
      group: "Settings",
      items: [
        { id: "settings", label: "Global Settings", icon: Settings },
        { id: "website-settings", label: "Website Settings", icon: Globe },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "profile", label: "Profile", icon: Users },
      ],
    },
  ];

  const handleItemClick = (id: NavView) => {
    onSelectView(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  // Content of navigation
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-white text-[#17172A] select-none">
      {/* Top: Brand Logo & Navigation List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        {/* Brand Header (Permanent on desktop, no collapse button) */}
        <div className="flex items-center justify-between px-2 py-2 mb-3">
          <div
            onClick={() => handleItemClick("dashboard")}
            className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs shrink-0 group-hover:bg-[#4726DB] transition-colors">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 leading-none whitespace-nowrap">
                <span className="font-extrabold text-[15px] text-[#17172A] tracking-tight">DevSparks</span>
                <span className="font-semibold text-[15px] text-[#5938F5]">DeployCheck</span>
              </div>
              <div className="text-[11px] text-[#667085] font-medium mt-1 whitespace-nowrap">By DevSparks India</div>
            </div>
          </div>

          {/* Close button for mobile drawer only */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-[#17172A] hover:bg-slate-50 rounded-lg transition-colors shrink-0"
              title="Close navigation"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="space-y-4">
          {navSections.map((section) => {
            const isGroupCollapsed = !!collapsedGroups[section.group];
            const isOverview = section.group === "Overview";

            return (
              <div key={section.group} className="space-y-1">
                {/* Section Header */}
                {!isOverview && (
                  <button
                    onClick={() => toggleGroup(section.group)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-700 transition-colors"
                  >
                    <span>{section.group}</span>
                    <span className="text-slate-400">
                      {isGroupCollapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
                    </span>
                  </button>
                )}

                {/* Items */}
                {(!isGroupCollapsed || isOverview) && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = activeView === item.id;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors group relative ${
                            isActive
                              ? "bg-purple-50/90 text-[#5938F5] font-semibold border-l-[3px] border-[#5938F5] shadow-2xs"
                              : "text-slate-600 hover:bg-slate-50 hover:text-[#17172A] font-medium"
                          }`}
                        >
                          <Icon
                            size={16}
                            className={`shrink-0 transition-colors ${
                              isActive ? "text-[#5938F5]" : "text-slate-400 group-hover:text-slate-700"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Status */}
      <div className="p-3 border-t border-[#F1F4F9] text-xs text-[#667085]">
        <div className="px-3 py-2 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="font-semibold text-xs text-[#17172A]">Core Engine</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">v0.1.0</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop: Permanently expanded sidebar, no collapse toggle */}
      <aside className="hidden lg:flex w-[270px] border-r border-[#E5E7EB] shrink-0 z-20 h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* 2. Mobile: Drawer navigation overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-[280px] max-w-[85vw] h-full shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
