"use client";

import React from "react";

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

export function Sidebar({ activeView, onSelectView, collapsed, onToggleCollapse }: SidebarProps) {
  const navSections = [
    {
      group: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "📊" },
      ],
    },
    {
      group: "Projects & Audits",
      items: [
        { id: "projects", label: "All Projects", icon: "📁" },
        { id: "audits", label: "Audit Reports", icon: "🛡️" },
        { id: "ai", label: "AI Assistant", icon: "✨" },
      ],
    },
    {
      group: "Deploy & Servers",
      items: [
        { id: "servers", label: "VPS Servers", icon: "🖥️" },
        { id: "deployments", label: "Deployments", icon: "🚀" },
        { id: "ssh-console", label: "SSH Console", icon: "💻" },
      ],
    },
    {
      group: "Monitoring & SEO",
      items: [
        { id: "monitoring", label: "Website Health", icon: "📡" },
        { id: "logs", label: "System Logs", icon: "📜" },
        { id: "seo", label: "Logs & SEO", icon: "📈" },
      ],
    },
    {
      group: "Team & Billing",
      items: [
        { id: "users", label: "Team Members", icon: "👥" },
        { id: "roles", label: "Roles & RBAC", icon: "🔑" },
        { id: "plans", label: "Plans & Billing", icon: "💳" },
        { id: "subscriptions", label: "Subscriptions", icon: "📑" },
      ],
    },
    {
      group: "Preferences",
      items: [
        { id: "notifications", label: "Notifications", icon: "🔔" },
        { id: "website-settings", label: "Website Settings", icon: "🌐" },
        { id: "settings", label: "Global Settings", icon: "⚙️" },
        { id: "profile", label: "Profile", icon: "👤" },
        { id: "auth", label: "Sign In / Sign Up", icon: "🔒" },
      ],
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white border-r border-[#E5E7EB] flex flex-col justify-between transition-all duration-200 shrink-0 z-20 h-screen sticky top-0`}
    >
      {/* Top: Brand Header & Nav List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        {/* Brand Logo */}
        <div className="flex items-center justify-between px-2 py-3 mb-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5938F5] to-[#3988F7] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
              ⚡
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="font-extrabold text-sm tracking-tight text-[#17172A] leading-none">
                  DevSparks
                </div>
                <div className="text-[10px] text-[#667085] font-semibold mt-0.5">DeployCheck</div>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-slate-400 hover:text-[#17172A] hover:bg-slate-50 rounded-lg text-xs"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-5">
          {navSections.map((section, idx) => (
            <div key={idx}>
              {!collapsed && (
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
                  {section.group}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectView(item.id as NavView)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#5938F5] text-white shadow-sm"
                          : "text-[#667085] hover:bg-slate-50 hover:text-[#17172A]"
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className="text-sm shrink-0">{item.icon}</span>
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Info */}
      {!collapsed && (
        <div className="p-3 border-t border-[#F1F4F9] text-[11px] text-[#667085]">
          <div className="px-2 py-1.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span className="font-semibold text-[#17172A]">Core Engine</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">v0.1.0</span>
          </div>
        </div>
      )}
    </aside>
  );
}
