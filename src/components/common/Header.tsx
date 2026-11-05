"use client";

import React, { useState, useEffect } from "react";
import { StatusBadge } from "./StatusBadge";
import { CommandPalette } from "./CommandPalette";

interface HeaderProps {
  currentSection: string;
  systemHealth: string;
  isRefreshing: boolean;
  onRefreshHealth: () => void;
  onRunAudit: () => void;
  onOpenNotifications?: () => void;
  onToggleSidebar?: () => void;
  onNavigateView?: (view: string) => void;
  userFullName?: string;
  userRole?: string;
}

export function Header({
  currentSection,
  systemHealth,
  isRefreshing,
  onRefreshHealth,
  onRunAudit,
  onOpenNotifications,
  onToggleSidebar,
  onNavigateView,
  userFullName = "Nikhil Dhawan",
  userRole = "Super Admin",
}: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-[#667085] hover:text-[#17172A] hover:bg-slate-50 transition-colors"
            title="Toggle Sidebar"
          >
            <span className="text-lg">☰</span>
          </button>
        )}
        <div className="flex items-center gap-2 text-xs font-medium text-[#667085]">
          <span>DeployCheck</span>
          <span>/</span>
          <span className="text-[#17172A] font-bold">{currentSection}</span>
        </div>
      </div>

      {/* Center: Global Search */}
      <div
        onClick={() => setPaletteOpen(true)}
        className="hidden md:flex items-center relative w-72 lg:w-96 cursor-pointer"
      >
        <span className="absolute left-3 text-slate-400 text-sm">🔍</span>
        <div className="w-full bg-[#F7F8FC] hover:bg-slate-100/80 border border-[#E5E7EB] rounded-xl pl-9 pr-12 py-1.5 text-xs text-slate-400 select-none transition-all flex items-center justify-between">
          <span>Search projects, audits, servers...</span>
        </div>
        <kbd className="absolute right-3 px-1.5 py-0.5 text-[10px] bg-white border border-[#E5E7EB] rounded text-slate-400 font-mono shadow-2xs">
          ⌘K
        </kbd>
      </div>

      {/* Right: Status, Actions, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Health status pill */}
        <button
          onClick={onRefreshHealth}
          disabled={isRefreshing}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-slate-50 hover:bg-white text-xs text-[#17172A] transition-all"
          title="Click to refresh system health"
        >
          <StatusBadge
            label={systemHealth === "healthy" ? "Healthy" : "Degraded"}
            variant={systemHealth === "healthy" ? "success" : "warning"}
          />
          <span className={`text-[10px] ${isRefreshing ? "animate-spin" : ""}`}>🔄</span>
        </button>

        {/* Quick Action: Run Pre-Deployment Audit */}
        <button
          onClick={onRunAudit}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>🛡️</span>
          <span>Run Audit</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationPopup(!showNotificationPopup);
              if (onOpenNotifications) onOpenNotifications();
            }}
            className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#667085] hover:text-[#17172A] hover:bg-slate-50 transition-colors relative"
            title="Notifications"
          >
            <span>🔔</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#5938F5]" />
          </button>

          {/* Quick Notifications Dropdown Preview */}
          {showNotificationPopup && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-4 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F4F9] mb-3">
                <span className="font-bold text-[#17172A]">Notifications</span>
                <span className="text-[10px] font-semibold text-[#5938F5] cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex gap-2.5">
                  <span className="text-base shrink-0">🛡️</span>
                  <div>
                    <div className="font-semibold text-[#17172A]">Audit Completed</div>
                    <div className="text-[11px] text-[#667085]">93 files scanned, 0 high vulnerabilities found.</div>
                    <div className="text-[10px] text-slate-400 mt-1">2 mins ago</div>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-[#E5E7EB] flex gap-2.5">
                  <span className="text-base shrink-0">🚀</span>
                  <div>
                    <div className="font-semibold text-[#17172A]">Deployment Ready</div>
                    <div className="text-[11px] text-[#667085]">Release v0.1.0 ready for staging VPS.</div>
                    <div className="text-[10px] text-slate-400 mt-1">15 mins ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#5938F5] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {userFullName.charAt(0)}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-[#17172A] leading-none">{userFullName}</div>
              <div className="text-[10px] text-[#667085] leading-tight mt-0.5">{userRole}</div>
            </div>
            <span className="text-xs text-slate-400">▾</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-[#F1F4F9] mb-1">
                <div className="font-bold text-[#17172A]">{userFullName}</div>
                <div className="text-[10px] text-[#667085]">DevSparks India</div>
              </div>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full text-left px-3 py-2 rounded-lg text-[#667085] hover:text-[#17172A] hover:bg-slate-50 font-medium"
              >
                👤 Profile Settings
              </button>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full text-left px-3 py-2 rounded-lg text-[#667085] hover:text-[#17172A] hover:bg-slate-50 font-medium"
              >
                ⚙️ Workspace Settings
              </button>
              <div className="border-t border-[#F1F4F9] my-1" />
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full text-left px-3 py-2 rounded-lg text-[#DC2626] hover:bg-rose-50 font-medium"
              >
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Global Interactive Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigateView={onNavigateView}
        onTriggerAudit={onRunAudit}
      />
    </header>
  );
}
