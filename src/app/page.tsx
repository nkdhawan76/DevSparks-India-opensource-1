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
  const [activeDiffPatch, setActiveDiffPatch] = useState<{
    title?: string;
    filePath?: string;
    beforeCode?: string;
    afterCode?: string;
    remediationAdvice?: string;
  } | null>(null);

  const findingPatches: Record<string, {
    title: string;
    filePath: string;
    beforeCode: string;
    afterCode: string;
    remediationAdvice: string;
  }> = {
    "find-1": {
      title: "Remediate Hardcoded AWS Credentials",
      filePath: "src/config/aws.ts",
      beforeCode: `export const awsConfig = {\n  region: "ap-south-1",\n  accessKeyId: "AKIA_EXPOSED_AWS_ACCESS_KEY_SAMPLE",\n  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n};`,
      afterCode: `export const awsConfig = {\n  region: process.env.AWS_REGION || "ap-south-1",\n  accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY\n};`,
      remediationAdvice: "Replace hardcoded API credentials with environment variables loaded from the secure encrypted vault. Never commit plaintext keys.",
    },
    "find-2": {
      title: "Pin Dockerfile Base Image to Immutable Digest",
      filePath: "Dockerfile",
      beforeCode: `FROM node:latest\nWORKDIR /app\nCOPY package*.json ./`,
      afterCode: `FROM node:20.17.0-alpine3.20@sha256:7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a\nWORKDIR /app\nCOPY package*.json ./`,
      remediationAdvice: "Pin Docker base images to explicit version tags or immutable SHA-256 digests to prevent supply-chain drift.",
    },
    "find-3": {
      title: "Replace Deprecated Dependencies",
      filePath: "package.json",
      beforeCode: `  "dependencies": {\n    "rimraf": "^3.0.2",\n    "glob": "^7.2.3"\n  }`,
      afterCode: `  "dependencies": {\n    "rimraf": "^5.0.5",\n    "glob": "^10.3.10"\n  }`,
      remediationAdvice: "Upgrade to current major versions or use Node.js 20+ native fs.rm({ recursive: true, force: true }).",
    },
    "find-4": {
      title: "Document Missing Environment Variable in .env.example",
      filePath: ".env.example",
      beforeCode: `DATABASE_URL=postgres://user:pass@localhost:5432/db`,
      afterCode: `PORT=3000\nDATABASE_URL=postgres://user:pass@localhost:5432/db`,
      remediationAdvice: "Ensure all runtime configuration variables have documented fallbacks and descriptive entries in .env.example.",
    },
  };

  const handleOpenDiffModal = (findingId?: string) => {
    if (findingId && findingPatches[findingId]) {
      setActiveDiffPatch(findingPatches[findingId]);
    } else if (!activeDiffPatch) {
      setActiveDiffPatch(findingPatches["find-1"]);
    }
    setDiffApprovalStatus("pending");
    setDiffModalOpen(true);
  };

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
          workspaceId: "ws_alpha",
          findingId: "sec-aws-001",
          findingTitle: "Hardcoded AWS Access Key in src/config/aws.ts",
          affectedFile: "src/config/aws.ts",
          affectedCodeSnippet: "const awsKey = 'AKIA_EXPOSED_AWS_ACCESS_KEY';",
          remediationAdvice: "Load credentials securely via environment variables and AES-256 vault.",
          stream: true,
        }),
      });
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let streamFinished = false;
        let displayedText = "";
        while (!streamFinished) {
          const result = await reader.read();
          if (result.done) {
            streamFinished = true;
          } else if (result.value) {
            const rawChunk = decoder.decode(result.value);
            const lines = rawChunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const jsonStr = line.slice(6).trim();
                if (jsonStr === "[DONE]") {
                  displayedText += "\n\n✓ Token stream complete. Structured patch proposal generated.";
                } else {
                  try {
                    const parsed = JSON.parse(jsonStr);
                    if (parsed.type === "chunk") {
                      displayedText += parsed.text;
                    } else if (parsed.type === "explanation") {
                      displayedText += `\n${parsed.explanation}`;
                    } else if (parsed.type === "patch" && parsed.patch) {
                      const p = parsed.patch.patches?.[0];
                      if (p) {
                        setActiveDiffPatch({
                          title: parsed.patch.summary,
                          filePath: p.filePath,
                          beforeCode: p.originalSnippet,
                          afterCode: p.suggestedSnippet,
                          remediationAdvice: p.explanation,
                        });
                      }
                    }
                  } catch {
                    displayedText += jsonStr;
                  }
                }
                setStreamedAiText(displayedText);
              }
            }
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

          {activeView === "projects" && (
            <ProjectsView
              onRunAudit={(_name) => {
                setActiveView("audits");
                runLiveAudit();
              }}
              onDeploy={(_name) => {
                setActiveView("deployments");
              }}
            />
          )}

          {activeView === "audits" && (
            <AuditReportsView
              onOpenDiffModal={(findingId) => handleOpenDiffModal(findingId)}
              onRunAudit={runLiveAudit}
              isLoading={liveAuditLoading}
              liveAuditResult={liveAuditResult}
            />
          )}

          {activeView === "ai" && (
            <AiAssistantView
              onOpenDiffModal={() => handleOpenDiffModal()}
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
        title={activeDiffPatch?.title}
        filePath={activeDiffPatch?.filePath}
        beforeCode={activeDiffPatch?.beforeCode}
        afterCode={activeDiffPatch?.afterCode}
        remediationAdvice={activeDiffPatch?.remediationAdvice}
      />
    </div>
  );
}
