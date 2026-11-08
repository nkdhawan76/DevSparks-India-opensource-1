import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { getRouteMetadata } from "@/lib/metadata-registry";
import { Badge } from "@/components/ui/badge";

const meta = getRouteMetadata("/docs/api");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.canonicalPath },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonicalPath,
  },
};

interface EndpointDoc {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  status: "Live" | "Planned";
  description: string;
  auth: "Session / Bearer" | "Public";
  requestExample?: string;
  responseExample: string;
}

const ENDPOINTS: EndpointDoc[] = [
  {
    method: "GET",
    path: "/api/v1/health",
    status: "Live",
    description: "Check system readiness, database connectivity, and uptime telemetry.",
    auth: "Public",
    responseExample: `{\n  "success": true,\n  "data": {\n    "status": "healthy",\n    "database": "connected",\n    "timestamp": "2026-11-08T16:30:00.000Z"\n  }\n}`,
  },
  {
    method: "POST",
    path: "/api/v1/auth/login",
    status: "Live",
    description: "Authenticate with work email and password. Establishes HttpOnly session cookie.",
    auth: "Public",
    requestExample: `{\n  "email": "dev@devsparks.com",\n  "password": "SecurePassword123!"\n}`,
    responseExample: `{\n  "success": true,\n  "data": {\n    "user": {\n      "id": "usr_94f8...",\n      "email": "dev@devsparks.com",\n      "role": "DEVELOPER"\n    }\n  }\n}`,
  },
  {
    method: "GET",
    path: "/api/v1/auth/me",
    status: "Live",
    description: "Retrieve currently authenticated session identity and role permissions.",
    auth: "Session / Bearer",
    responseExample: `{\n  "success": true,\n  "data": {\n    "authenticated": true,\n    "user": {\n      "id": "usr_94f8...",\n      "email": "dev@devsparks.com",\n      "role": "DEVELOPER"\n    }\n  }\n}`,
  },
  {
    method: "POST",
    path: "/api/v1/audits",
    status: "Live",
    description: "Trigger a pre-deployment audit scan on a repository branch or workspace path.",
    auth: "Session / Bearer",
    requestExample: `{\n  "projectId": "proj_a1b2...",\n  "commitHash": "3b5ea43",\n  "branch": "main"\n}`,
    responseExample: `{\n  "success": true,\n  "data": {\n    "auditId": "aud_018f...",\n    "score": 98,\n    "status": "PASSED",\n    "criticalFindings": 0,\n    "highFindings": 0,\n    "findings": []\n  }\n}`,
  },
  {
    method: "GET",
    path: "/api/v1/servers/diagnostics",
    status: "Live",
    description: "Retrieve live hardware telemetry and host key fingerprint for a connected VPS.",
    auth: "Session / Bearer",
    responseExample: `{\n  "success": true,\n  "data": {\n    "serverId": "srv_7c2b...",\n    "cpuUsage": 14.2,\n    "memoryUsedMb": 1840,\n    "memoryTotalMb": 4096,\n    "diskPercent": 38.5,\n    "status": "online"\n  }\n}`,
  },
  {
    method: "POST",
    path: "/api/v1/ai/connections",
    status: "Live",
    description: "Save encrypted Bring-Your-Own-Key OpenRouter credentials for the workspace.",
    auth: "Session / Bearer",
    requestExample: `{\n  "apiKey": "sk-or-v1-xxxxxxxx...",\n  "provider": "openrouter"\n}`,
    responseExample: `{\n  "success": true,\n  "data": {\n    "connected": true,\n    "maskedKey": "sk-or-••••••••••••"\n  }\n}`,
  },
  {
    method: "GET",
    path: "/api/v1/monitoring/targets",
    status: "Live",
    description: "List synthetic uptime probe targets, response latencies, and SSL expiry status.",
    auth: "Session / Bearer",
    responseExample: `{\n  "success": true,\n  "data": [\n    {\n      "id": "mon_5d1a...",\n      "url": "https://api.devsparks.com",\n      "status": "UP",\n      "latencyMs": 42,\n      "sslDaysLeft": 74\n    }\n  ]\n}`,
  },
  {
    method: "POST",
    path: "/api/v1/containers/scan",
    status: "Planned",
    description: "Planned (M7): Scan container base image and Dockerfile for CVE vulnerabilities.",
    auth: "Session / Bearer",
    responseExample: `{\n  "success": false,\n  "code": "MILESTONE_PLANNED",\n  "error": "Container scanning is scheduled for Milestone 7."\n}`,
  },
];

export default function ApiDocsPage() {
  return (
    <MarketingLayout currentPath="/docs/api">
      <PageHero
        badge="REST API SPECIFICATION"
        badgeVariant="blue"
        title="DeployCheck RESTful API Reference (/api/v1)"
        description="Integrate pre-deployment audits, server inventory, and uptime telemetry into your CI/CD pipelines, custom dashboards, and terminal automation tools."
        primaryAction={{
          label: "View Quickstart Tutorial",
          href: "/docs/getting-started",
        }}
        secondaryAction={{
          label: "Explore GitHub Source",
          href: "https://github.com/nkdhawan76/DevSparks-India-opensource-1",
        }}
      />

      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Architecture Note */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs mb-8">
          <h3 className="text-sm font-bold text-[#17172A] mb-2">Standardized API Response Envelope</h3>
          <p className="text-xs text-[#667085] leading-relaxed mb-4">
            Every DeployCheck API endpoint follows a predictable JSON response envelope. Success responses return <code className="bg-slate-100 text-[#5938F5] px-1.5 py-0.5 rounded font-mono text-[11px]">&#123; success: true, data: ... &#125;</code>. Errors return <code className="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded font-mono text-[11px]">&#123; success: false, error: &quot;...&quot;, code: &quot;...&quot; &#125;</code>.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#17172A]">
            <span>Base URL: <code className="font-mono text-[#5938F5]">http://localhost:3000/api/v1</code></span>
            <span className="text-slate-300">|</span>
            <span>Auth Header: <code className="font-mono text-[#5938F5]">Authorization: Bearer &lt;token&gt;</code></span>
          </div>
        </div>

        {/* Endpoints Ledger */}
        <div className="space-y-6">
          {ENDPOINTS.map((ep) => (
            <div
              key={`${ep.method}-${ep.path}`}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      ep.method === "GET"
                        ? "bg-blue-100 text-blue-700"
                        : ep.method === "POST"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#17172A]">
                    {ep.path}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#667085] bg-slate-100 px-2 py-0.5 rounded">
                    {ep.auth}
                  </span>
                  <Badge
                    variant={ep.status === "Live" ? "success" : "secondary"}
                    className="text-[10px]"
                  >
                    {ep.status}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-[#667085] mb-4 leading-relaxed">{ep.description}</p>

              {ep.requestExample && (
                <div className="mb-3">
                  <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Request JSON Body:
                  </span>
                  <pre className="bg-[#17172A] text-slate-200 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                    {ep.requestExample}
                  </pre>
                </div>
              )}

              <div>
                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Response Envelope:
                </span>
                <pre className="bg-[#17172A] text-slate-200 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {ep.responseExample}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </MarketingLayout>
  );
}

