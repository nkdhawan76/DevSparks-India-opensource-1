"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components/common/Header";
import { Sidebar, NavView } from "@/components/common/Sidebar";
import { DiffReviewModal } from "@/components/common/DiffReviewModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [systemHealth, setSystemHealth] = useState<string>("healthy");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Global Diff Review Modal
  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [diffApprovalStatus, setDiffApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending");

  // Determine active view from pathname
  const getActiveView = (): NavView => {
    if (!pathname) return "dashboard";
    if (pathname.includes("/app/projects")) return "projects";
    if (pathname.includes("/app/audits")) return "audits";
    if (pathname.includes("/app/ai")) return "ai";
    if (pathname.includes("/app/servers")) return "servers";
    if (pathname.includes("/app/deployments")) return "deployments";
    if (pathname.includes("/app/ssh-console")) return "ssh-console";
    if (pathname.includes("/app/monitoring")) return "monitoring";
    if (pathname.includes("/app/logs")) return "logs";
    if (pathname.includes("/app/seo")) return "seo";
    if (pathname.includes("/app/users")) return "users";
    if (pathname.includes("/app/roles")) return "roles";
    if (pathname.includes("/app/plans")) return "plans";
    if (pathname.includes("/app/subscriptions")) return "subscriptions";
    if (pathname.includes("/app/settings/website")) return "website-settings";
    if (pathname.includes("/app/settings")) return "settings";
    if (pathname.includes("/app/profile")) return "profile";
    return "dashboard";
  };

  const activeView = getActiveView();

  const handleSelectView = (view: NavView) => {
    if (view === "dashboard") router.push("/app/dashboard");
    else if (view === "auth") router.push("/login");
    else if (view === "website-settings") router.push("/app/settings/website");
    else router.push(`/app/${view}`);
  };

  const refreshHealth = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/v1/health");
      if (res.ok) {
        const data = await res.json();
        setSystemHealth(data.status || "healthy");
      }
    } catch {
      // Fallback
    } finally {
      setIsRefreshing(false);
    }
  };

  const viewTitles: Record<NavView, string> = {
    dashboard: "Operations Dashboard",
    projects: "Project Workspace",
    audits: "Pre-Deployment Audits",
    ai: "AI Coding Assistant",
    servers: "VPS Server Management",
    deployments: "Production Deployments",
    "ssh-console": "Policy SSH Console",
    monitoring: "Synthetic Monitoring",
    logs: "Structured Logs",
    seo: "Logs & SEO Crawlers",
    users: "Team Members",
    roles: "Roles & Permissions",
    plans: "Plans & Billing",
    subscriptions: "Subscription Management",
    notifications: "Notification Center",
    settings: "Global Settings",
    "website-settings": "Website Settings",
    profile: "Developer Profile",
    auth: "Authentication",
  };

  return (
    <div className="flex min-h-screen bg-[#F7F8FC] text-[#17172A] font-sans antialiased">
      {/* Persistent Collapsible Sidebar */}
      <Sidebar
        activeView={activeView}
        onSelectView={handleSelectView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentSection={viewTitles[activeView]}
          systemHealth={systemHealth}
          isRefreshing={isRefreshing}
          onRefreshHealth={refreshHealth}
          onRunAudit={() => router.push("/app/audits")}
          onOpenNotifications={() => router.push("/app/notifications")}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Diff Review Modal */}
      <DiffReviewModal
        isOpen={diffModalOpen}
        onClose={() => setDiffModalOpen(false)}
        onApprove={() => setDiffApprovalStatus("approved")}
        onReject={() => setDiffApprovalStatus("rejected")}
        approvalStatus={diffApprovalStatus}
      />
    </div>
  );
}

