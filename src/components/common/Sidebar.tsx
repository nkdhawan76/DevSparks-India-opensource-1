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
  collapsed: boolean;
  onToggleCollapse: () => void;
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

export function Sidebar({ activeView, onSelectView, collapsed, onToggleCollapse }: SidebarProps) {
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
        { id: "auth", label: "Sign In / Sign Up", icon: Key },
      ],
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-[72px]" : "w-64"
      } bg-white border-r border-[#E5E7EB] flex flex-col justify-between transition-all duration-200 shrink-0 z-20 h-screen sticky top-0 select-none`}
    >
      {/* Top: Brand Logo & Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 py-2.5 mb-3">
          <div
            onClick={() => onSelectView("dashboard")}
            className="flex items-center gap-3 overflow-hidden cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs shrink-0 group-hover:bg-[#4726DB] transition-colors">
              <Zap size={20} className="text-white fill-white" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-[15px] text-[#17172A] tracking-tight">DevSparks</span>
                  <span className="font-medium text-[15px] text-[#17172A]">DeployCheck</span>
                </div>
                <div className="text-[11px] text-[#667085] font-medium mt-1">By DevSparks India</div>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-slate-400 hover:text-[#17172A] hover:bg-slate-50 rounded-lg transition-colors shrink-0"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar collapse"
          >
            <div className="w-5 h-5 flex items-center justify-center font-mono text-xs font-bold text-slate-400">
              {collapsed ? "»" : "«"}
            </div>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-4">
          {navSections.map((section) => {
            const isGroupCollapsed = !!collapsedGroups[section.group];
            const isOverview = section.group === "Overview";

            return (
              <div key={section.group} className="space-y-1">
                {/* Section Header */}
                {!collapsed && !isOverview && (
                  <button
                    onClick={() => toggleGroup(section.group)}
                    className="w-full flex items-center justify-between px-3 py-1 text-[11px] font-semibold text-[#667085] hover:text-[#17172A] tracking-normal transition-colors"
                  >
                    <span>{section.group}</span>
                    <span className="text-slate-400">
                      {isGroupCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                    </span>
                  </button>
                )}

                {/* Items */}
                {(!isGroupCollapsed || collapsed || isOverview) && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = activeView === item.id;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelectView(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all relative ${
                            isActive
                              ? "bg-[#5938F5] text-white shadow-xs font-semibold"
                              : "text-[#334155] hover:bg-slate-50 hover:text-[#17172A] font-medium"
                          } ${collapsed ? "justify-center px-0" : ""}`}
                          title={collapsed ? item.label : undefined}
                        >
                          <Icon
                            size={18}
                            className={`shrink-0 ${
                              isActive ? "text-white" : "text-slate-500 group-hover:text-[#17172A]"
                            }`}
                          />
                          {!collapsed && <span className="truncate">{item.label}</span>}
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

      {/* Footer Info */}
      {!collapsed ? (
        <div className="p-3 border-t border-[#F1F4F9] text-xs text-[#667085]">
          <div className="px-3 py-2 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="font-semibold text-xs text-[#17172A]">Core Engine</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">v0.1.0</span>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-[#F1F4F9] flex justify-center">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" title="Core Engine Online" />
        </div>
      )}
    </aside>
  );
}
