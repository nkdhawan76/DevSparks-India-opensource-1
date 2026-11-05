"use client";

import React, { useState, useEffect } from "react";
import { StatusBadge } from "./StatusBadge";
import { CommandPalette } from "./CommandPalette";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Plus,
  ChevronDown,
  RefreshCw,
  Users,
  Settings,
  ShieldCheck,
} from "./Icons";

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

  const handleSignOut = async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    window.location.href = "/login";
  };

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
    <header className="h-16 bg-white border-b border-[#E5E7EB] px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Left: Sidebar Toggle & Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-2xl">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-[#17172A] hover:bg-slate-50 transition-colors border border-transparent hover:border-[#E5E7EB]"
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={18} />
          </button>
        )}

        {/* Breadcrumb Navigation */}
        {currentSection && (
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#667085] shrink-0 font-medium mr-1">
            <span>DeployCheck</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#17172A] font-semibold">{currentSection}</span>
          </div>
        )}

        {/* Global Search Bar */}
        <div
          onClick={() => setPaletteOpen(true)}
          className="flex-1 max-w-md flex items-center relative cursor-pointer group"
        >
          <Search size={16} className="absolute left-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          <div className="w-full bg-[#F7F8FC] group-hover:bg-slate-100/70 border border-[#E5E7EB] rounded-xl pl-10 pr-16 py-2 text-xs text-slate-400 select-none transition-all flex items-center justify-between shadow-2xs">
            <span className="truncate">Search projects, servers, audits...</span>
          </div>
          <kbd className="absolute right-3 px-2 py-0.5 text-[10px] bg-white border border-[#E5E7EB] rounded-md text-slate-500 font-mono shadow-2xs">
            Ctrl + K
          </kbd>
        </div>
      </div>

      {/* Right Controls: New Project, System Health, Notifications, Help, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* New Project Primary Action */}
        <button
          onClick={() => onNavigateView?.("projects")}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.98]"
        >
          <Plus size={15} />
          <span>New Project</span>
          <ChevronDown size={14} className="opacity-70 ml-0.5" />
        </button>

        {/* Health status badge */}
        <button
          onClick={onRefreshHealth}
          disabled={isRefreshing}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E5E7EB] bg-slate-50 hover:bg-white text-xs text-[#17172A] transition-all"
          title="System health status (click to refresh)"
        >
          <StatusBadge
            label={systemHealth === "healthy" ? "Healthy" : "Degraded"}
            variant={systemHealth === "healthy" ? "success" : "warning"}
          />
          <RefreshCw size={13} className={`text-slate-400 ${isRefreshing ? "animate-spin text-[#5938F5]" : ""}`} />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationPopup(!showNotificationPopup);
              if (onOpenNotifications) onOpenNotifications();
            }}
            className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-slate-500 hover:text-[#17172A] hover:bg-slate-50 transition-colors relative"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#5938F5] ring-2 ring-white" />
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
                <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 flex gap-2.5">
                  <ShieldCheck size={18} className="text-[#5938F5] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#17172A]">Audit Completed</div>
                    <div className="text-[11px] text-[#667085]">93 files scanned, zero high vulnerabilities found.</div>
                    <div className="text-[10px] text-slate-400 mt-1">2 mins ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Button */}
        <button
          onClick={() => onNavigateView?.("settings")}
          className="w-9 h-9 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-slate-500 hover:text-[#17172A] hover:bg-slate-50 transition-colors hidden sm:flex"
          title="Help & Documentation"
          aria-label="Help & Documentation"
        >
          <HelpCircle size={17} />
        </button>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-[#E5E7EB]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5938F5] to-[#3988F7] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {userFullName.charAt(0)}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-[#17172A] leading-none">{userFullName}</div>
              <div className="text-[10px] text-[#667085] leading-tight mt-0.5">{userRole}</div>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-[#F1F4F9] mb-1">
                <div className="font-bold text-[#17172A]">{userFullName}</div>
                <div className="text-[10px] text-[#667085]">DevSparks India</div>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigateView?.("profile");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#334155] hover:text-[#17172A] hover:bg-slate-50 font-medium transition-colors"
              >
                <Users size={15} />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigateView?.("settings");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#334155] hover:text-[#17172A] hover:bg-slate-50 font-medium transition-colors"
              >
                <Settings size={15} />
                <span>Global Settings</span>
              </button>
              <div className="border-t border-[#F1F4F9] my-1" />
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  handleSignOut();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#DC2626] hover:bg-rose-50 font-medium transition-colors"
              >
                <span>Sign Out</span>
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
