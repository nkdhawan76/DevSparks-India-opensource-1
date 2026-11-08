"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  ShieldCheck,
  Sparkles,
  Server,
  Rocket,
  Terminal,
  Globe,
  FileText,
  Users,
  CreditCard,
  Settings,
  Zap,
  Key,
  Search,
  Cpu,
} from "./Icons";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView?: (view: string) => void;
  onTriggerAudit?: () => void;
}

interface CommandItem {
  id: string;
  category: "Navigation" | "Action" | "Projects";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onNavigateView,
  onTriggerAudit,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const navigate = (path: string, viewName: string) => {
    onClose();
    if (onNavigateView) {
      onNavigateView(viewName);
    } else {
      router.push(path);
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: "nav-dash", category: "Navigation", title: "Operations Dashboard", subtitle: "KPIs, health, recent audits", icon: <LayoutDashboard size={15} className="text-[#5938F5]" />, action: () => navigate("/app/dashboard", "dashboard") },
    { id: "nav-proj", category: "Navigation", title: "Project Workspace", subtitle: "Connected repos & branch tracking", icon: <FolderGit2 size={15} className="text-[#5938F5]" />, action: () => navigate("/app/projects", "projects") },
    { id: "nav-audit", category: "Navigation", title: "Pre-Deployment Audits", subtitle: "Deterministic static scanning", icon: <ShieldCheck size={15} className="text-[#3988F7]" />, action: () => navigate("/app/audits", "audits") },
    { id: "nav-ai", category: "Navigation", title: "AI Coding Assistant", subtitle: "BYOK OpenRouter & Diff Review", icon: <Sparkles size={15} className="text-[#5938F5]" />, action: () => navigate("/app/ai", "ai") },
    { id: "nav-servers", category: "Navigation", title: "VPS Server Infrastructure", subtitle: "Linux nodes & diagnostics", icon: <Server size={15} className="text-[#F59E0B]" />, action: () => navigate("/app/servers", "servers") },
    { id: "nav-deploy", category: "Navigation", title: "Production Deployments", subtitle: "Release pipeline & rollback", icon: <Rocket size={15} className="text-[#16A34A]" />, action: () => navigate("/app/deployments", "deployments") },
    { id: "nav-ssh", category: "Navigation", title: "Policy SSH Web Console", subtitle: "Restricted command terminal", icon: <Terminal size={15} className="text-[#17172A]" />, action: () => navigate("/app/ssh-console", "ssh-console") },
    { id: "nav-monitor", category: "Navigation", title: "Synthetic Monitoring", subtitle: "HTTP/SSL uptime probes", icon: <Globe size={15} className="text-[#2563EB]" />, action: () => navigate("/app/monitoring", "monitoring") },
    { id: "nav-logs", category: "Navigation", title: "Structured Logs & SEO", subtitle: "Redacted telemetry & bot crawlers", icon: <FileText size={15} className="text-[#64748B]" />, action: () => navigate("/app/logs", "logs") },
    { id: "nav-users", category: "Navigation", title: "Team Members & RBAC", subtitle: "Workspace permission matrix", icon: <Users size={15} className="text-[#5938F5]" />, action: () => navigate("/app/users", "users") },
    { id: "nav-plans", category: "Navigation", title: "Plans & Billing", subtitle: "Resource quotas & receipts", icon: <CreditCard size={15} className="text-[#16A34A]" />, action: () => navigate("/app/plans", "plans") },
    { id: "nav-settings", category: "Navigation", title: "Global Settings", subtitle: "Custom domains, SSL & BYOK key", icon: <Settings size={15} className="text-[#64748B]" />, action: () => navigate("/app/settings", "settings") },

    // Quick Actions
    {
      id: "act-audit",
      category: "Action",
      title: "Trigger Pre-Deployment Audit",
      subtitle: "Execute deterministic 0-vuln static scan",
      icon: <Zap size={15} className="text-[#5938F5]" />,
      action: () => {
        onClose();
        if (onTriggerAudit) onTriggerAudit();
        else navigate("/app/audits", "audits");
      },
    },
    {
      id: "act-connect-vps",
      category: "Action",
      title: "Connect Linux VPS Node",
      subtitle: "Establish SHA-256 host-verified session",
      icon: <Cpu size={15} className="text-[#3988F7]" />,
      action: () => navigate("/app/servers", "servers"),
    },
    {
      id: "act-byok",
      category: "Action",
      title: "Configure OpenRouter BYOK Key",
      subtitle: "Update AES-256 encrypted provider token",
      icon: <Key size={15} className="text-[#F59E0B]" />,
      action: () => navigate("/app/settings", "settings"),
    },

    // Projects
    { id: "proj-thefein", category: "Projects", title: "thefein.in", subtitle: "Next.js 14 • 100/100 Score • VPS-01", icon: <Globe size={15} className="text-slate-400" />, action: () => navigate("/app/projects", "projects") },
    { id: "proj-kreeda", category: "Projects", title: "kreedaportal.com", subtitle: "Laravel 11 • 92/100 Score • VPS-02", icon: <Globe size={15} className="text-slate-400" />, action: () => navigate("/app/projects", "projects") },
    { id: "proj-silverera", category: "Projects", title: "silvereraheritage.com", subtitle: "Next.js 14 • 88/100 Score • VPS-01", icon: <Globe size={15} className="text-slate-400" />, action: () => navigate("/app/projects", "projects") },
    { id: "proj-compikart", category: "Projects", title: "compikart.opm", subtitle: "Node.js • 100/100 Score • VPS-03", icon: <Globe size={15} className="text-slate-400" />, action: () => navigate("/app/projects", "projects") },
    { id: "proj-devsparks", category: "Projects", title: "devsparksindia.com", subtitle: "Next.js 14 • 96/100 Score • Production", icon: <Globe size={15} className="text-[#5938F5]" />, action: () => navigate("/app/projects", "projects") },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-100">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[70vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-3 bg-slate-50/50">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or section name..."
            className="w-full bg-transparent text-sm text-[#17172A] placeholder:text-slate-400 focus:outline-none font-medium"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white border border-[#E5E7EB] rounded text-slate-500 shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#667085]">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full text-left p-3 rounded-xl hover:bg-purple-50/60 hover:border-[#5938F5]/30 border border-transparent transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg p-1.5 rounded-lg bg-slate-100 group-hover:bg-purple-100 transition-colors">
                    {cmd.icon}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-[#17172A] group-hover:text-[#5938F5]">
                      {cmd.title}
                    </div>
                    {cmd.subtitle && (
                      <div className="text-[11px] text-[#667085]">{cmd.subtitle}</div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-100 uppercase">
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#E5E7EB] bg-slate-50/80 flex items-center justify-between text-[11px] text-[#667085]">
          <div className="flex items-center gap-2">
            <span>DeployCheck Quick Launcher</span>
          </div>
          <span>Strict Light Theme Enforced</span>
        </div>
      </div>
    </div>
  );
}
