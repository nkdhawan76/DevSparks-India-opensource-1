"use client";

import React, { useState } from "react";
import { Header } from "@/components/common/Header";
import { Sidebar, NavView } from "@/components/common/Sidebar";
import { DiffReviewModal } from "@/components/common/DiffReviewModal";

import { DashboardView } from "@/components/views/DashboardView";
import { ProjectsView } from "@/components/views/ProjectsView";
import { AuditReportsView } from "@/components/views/AuditReportsView";
import { AiAssistantView } from "@/components/views/AiAssistantView";
import { ServersView } from "@/components/views/ServersView";
import { DeploymentsView } from "@/components/views/DeploymentsView";
import { SshConsoleView } from "@/components/views/SshConsoleView";
import { MonitoringView } from "@/components/views/MonitoringView";
import { LogsSeoView } from "@/components/views/LogsSeoView";
import { UsersRolesView } from "@/components/views/UsersRolesView";
import { PlansBillingView } from "@/components/views/PlansBillingView";
import { SettingsView } from "@/components/views/SettingsView";
import { AuthView } from "@/components/views/AuthView";

export default function DeployCheckApp() {
  const [activeView, setActiveView] = useState<NavView>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Live REST API Integration States
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemHealth, setSystemHealth] = useState<string>("healthy");
  const [liveAuditLoading, setLiveAuditLoading] = useState(false);
  const [liveAuditResult, setLiveAuditResult] = useState<{
    status: string;
    scannerVersion: string;
    totalFindings: number;
    findings: Array<{ ruleId: string; severity: string; title: string; remediation?: string }>;
  } | null>(null);

  // AI Diff Review Modal State (Human Approval Gate)
  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [diffApprovalStatus, setDiffApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending");

  // Live SSE AI Streaming State
  const [isStreamingAi, setIsStreamingAi] = useState(false);
  const [streamedAiText, setStreamedAiText] = useState("");

  const refreshHealth = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/v1/health");
      if (res.ok) {
        const data = await res.json();
        setSystemHealth(data.status || "healthy");
      }
    } catch (_err) {
      // Fallback
    } finally {
      setIsRefreshing(false);
    }
  };

  const runLiveAudit = async () => {
    setLiveAuditLoading(true);
    try {
      const res = await fetch("/api/v1/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: "ws_alpha",
          projectId: "proj_thefein",
          files: {
            "package.json": JSON.stringify({ name: "demo-app", dependencies: { next: "^14.2.35" } }),
            ".env.example": "PORT=3000\nDATABASE_URL=postgres://user:pass@localhost:5432/db",
          },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setLiveAuditResult(data.data);
        }
      }
    } catch (_err) {
      // Fallback
    } finally {
      setLiveAuditLoading(false);
    }
  };

  const streamAiExplanation = async () => {
    setIsStreamingAi(true);
    setStreamedAiText("");
    try {
      const res = await fetch("/api/v1/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          findingId: "sec-aws-001",
          ruleId: "secret-scanner",
          title: "Hardcoded AWS Access Key in src/config/aws.ts",
          codeSnippet: "const awsKey = 'AKIA_EXPOSED_AWS_ACCESS_KEY';",
          stream: true,
        }),
      });
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let streamFinished = false;
        while (!streamFinished) {
          const result = await reader.read();
          if (result.done) {
            streamFinished = true;
          } else if (result.value) {
            const chunk = decoder.decode(result.value);
            accumulated += chunk;
            setStreamedAiText(accumulated);
          }
        }
      }
    } catch (_err) {
      // Fallback
    } finally {
      setIsStreamingAi(false);
    }
  };

  // Mock fixtures matching dashboard
  const recentAudits = [
    { id: "aud-1", project: "thefein.in", framework: "Next.js 14", status: "Passed" as const, issues: 0, runAt: "Today, 11:42 AM" },
    { id: "aud-2", project: "kreedaportal.com", framework: "Laravel 11", status: "Warnings" as const, issues: 5, runAt: "Today, 10:18 AM" },
    { id: "aud-3", project: "silvereraheritage.com", framework: "Next.js 14", status: "Critical" as const, issues: 8, runAt: "Yesterday, 08:47 PM" },
    { id: "aud-4", project: "compikart.opm", framework: "Node.js", status: "Passed" as const, issues: 0, runAt: "Yesterday, 05:22 PM" },
    { id: "aud-5", project: "devsparksindia.com", framework: "Next.js 14", status: "Warnings" as const, issues: 3, runAt: "Yesterday, 02:11 PM" },
  ];

  const recentDeployments = [
    { id: "dep-1", project: "kreedaportal.com", server: "VPS-01 (Mumbai)", status: "Success" as const, deployedAt: "Today, 09:35 AM" },
    { id: "dep-2", project: "thefein.in", server: "VPS-02 (Bangalore)", status: "Success" as const, deployedAt: "Yesterday, 11:10 PM" },
    { id: "dep-3", project: "silvereraheritage.com", server: "VPS-01 (Mumbai)", status: "Failed" as const, deployedAt: "Yesterday, 06:27 PM" },
    { id: "dep-4", project: "compikart.opm", server: "VPS-03 (Mumbai)", status: "Success" as const, deployedAt: "Yesterday, 09:14 PM" },
  ];

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
      {/* Reusable Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onSelectView={(view) => setActiveView(view)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main App Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Reusable Header */}
        <Header
          currentSection={viewTitles[activeView]}
          systemHealth={systemHealth}
          isRefreshing={isRefreshing}
          onRefreshHealth={refreshHealth}
          onRunAudit={() => {
            setActiveView("audits");
            runLiveAudit();
          }}
          onOpenNotifications={() => setActiveView("notifications")}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigateView={(view) => setActiveView(view as NavView)}
        />

        {/* View Surface */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {activeView === "dashboard" && (
            <DashboardView
              onRunAudit={() => {
                setActiveView("audits");
                runLiveAudit();
              }}
              onNavigate={(view) => setActiveView(view as NavView)}
              recentAudits={recentAudits}
              recentDeployments={recentDeployments}
              systemHealth={systemHealth}
            />
          )}

          {activeView === "projects" && <ProjectsView />}

          {activeView === "audits" && (
            <AuditReportsView
              onOpenDiffModal={() => setDiffModalOpen(true)}
              onRunAudit={runLiveAudit}
              isLoading={liveAuditLoading}
              liveAuditResult={liveAuditResult}
            />
          )}

          {activeView === "ai" && (
            <AiAssistantView
              onOpenDiffModal={() => setDiffModalOpen(true)}
              streamedText={streamedAiText}
              isStreaming={isStreamingAi}
              onStreamPrompt={streamAiExplanation}
            />
          )}

          {activeView === "servers" && <ServersView />}

          {activeView === "deployments" && <DeploymentsView />}

          {activeView === "ssh-console" && <SshConsoleView />}

          {activeView === "monitoring" && <MonitoringView />}

          {(activeView === "logs" || activeView === "seo") && <LogsSeoView />}

          {(activeView === "users" || activeView === "roles") && <UsersRolesView />}

          {(activeView === "plans" || activeView === "subscriptions") && <PlansBillingView />}

          {(activeView === "settings" || activeView === "website-settings" || activeView === "notifications" || activeView === "profile") && (
            <SettingsView
              initialTab={
                activeView === "website-settings"
                  ? "website"
                  : activeView === "notifications"
                  ? "notifications"
                  : activeView === "profile"
                  ? "profile"
                  : "providers"
              }
            />
          )}

          {activeView === "auth" && <AuthView />}
        </main>
      </div>

      {/* Global AI Diff Review Modal (Human Approval Gate) */}
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
