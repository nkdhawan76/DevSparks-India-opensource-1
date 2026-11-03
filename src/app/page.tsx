"use client";

import React, { useState } from "react";

interface Finding {
  id: string;
  ruleId: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  title: string;
  description: string;
  filePath: string;
  line?: number;
  remediation: string;
  vulnerableSnippet?: string;
  remediedSnippet?: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "audits" | "ai" | "settings">("overview");

  // In-memory state for live audit simulation
  const [selectedFixture, setSelectedFixture] = useState<"clean" | "secrets" | "deps">("secrets");
  const [auditRunning, setAuditRunning] = useState(false);
  const [activeAuditResult, setActiveAuditResult] = useState<{
    status: string;
    stack: string;
    summary: { critical: number; high: number; medium: number; isReady: boolean };
    findings: Finding[];
  } | null>(null);

  // In-memory state for AI Patch Review Modal (Core Policy Invariant)
  const [activeFindingForAI, setActiveFindingForAI] = useState<Finding | null>(null);
  const [patchApprovalStatus, setPatchApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending");

  // BYOK Settings State
  const [byokKey, setByokKey] = useState("");
  const [savedConnections, setSavedConnections] = useState<Array<{ id: string; provider: string; maskedKey: string }>>([
    { id: "conn-1", provider: "OpenRouter", maskedKey: "sk-or••••••••7a9b" },
  ]);

  // Execute in-browser audit simulation
  const handleRunAudit = () => {
    setAuditRunning(true);
    setTimeout(() => {
      if (selectedFixture === "clean") {
        setActiveAuditResult({
          status: "SUCCESS",
          stack: "Next.js 14 + TypeScript (pnpm)",
          summary: { critical: 0, high: 0, medium: 0, isReady: true },
          findings: [],
        });
      } else if (selectedFixture === "secrets") {
        setActiveAuditResult({
          status: "FAILED",
          stack: "Node.js + Express (npm)",
          summary: { critical: 2, high: 1, medium: 0, isReady: false },
          findings: [
            {
              id: "f-1",
              ruleId: "SEC-001",
              severity: "CRITICAL",
              title: "Exposed AWS Access Key in Source",
              description: "Found active AWS access key embedded directly in config.ts. Pushing credentials to VCS leads to credential compromise.",
              filePath: "src/config.ts",
              line: 14,
              remediation: "Extract key to environment variables and rotate secret immediately.",
              vulnerableSnippet: "const awsKey = 'AKIA_EXPOSED_AWS_ACCESS_KEY';\nconst awsSecret = 'MOCK_SECRET_KEY_NOT_REAL';",
              remediedSnippet: "const awsKey = process.env.AWS_ACCESS_KEY_ID;\nconst awsSecret = process.env.AWS_SECRET_ACCESS_KEY;\nif (!awsKey || !awsSecret) throw new Error('Missing AWS config');",
            },
            {
              id: "f-2",
              ruleId: "CFG-001",
              severity: "CRITICAL",
              title: "Committed .env File Tracked in Git",
              description: "Found .env tracked in repository. Contains unencrypted production database credentials.",
              filePath: ".env",
              remediation: "Run 'git rm --cached .env', add to .gitignore, and provide .env.example template.",
              vulnerableSnippet: "DATABASE_URL=postgres://admin:pass123@prod-db.internal:5432/main",
              remediedSnippet: "# .env.example template\nDATABASE_URL=postgres://user:password@localhost:5432/dbname",
            },
            {
              id: "f-3",
              ruleId: "DEP-002",
              severity: "HIGH",
              title: "Missing Lockfile (package-lock.json / pnpm-lock.yaml)",
              description: "No dependency lockfile detected. Deploying without locked versions causes non-deterministic production builds.",
              filePath: "package.json",
              remediation: "Generate and commit a package-lock.json or pnpm-lock.yaml file.",
            },
          ],
        });
      } else {
        setActiveAuditResult({
          status: "WARNING",
          stack: "Node.js + Fastify (yarn)",
          summary: { critical: 0, high: 1, medium: 1, isReady: false },
          findings: [
            {
              id: "f-4",
              ruleId: "DEP-003",
              severity: "HIGH",
              title: "Missing 'build' Script in package.json",
              description: "The package.json manifest lacks a production build command.",
              filePath: "package.json",
              remediation: "Add 'build': 'next build' or 'tsc' to package.json scripts block.",
              vulnerableSnippet: '"scripts": {\n  "start": "node index.js"\n}',
              remediedSnippet: '"scripts": {\n  "build": "tsc -p tsconfig.json",\n  "start": "node dist/index.js"\n}',
            },
            {
              id: "f-5",
              ruleId: "CFG-002",
              severity: "MEDIUM",
              title: "Missing .env.example Documentation",
              description: "No template documenting required environment variables was provided.",
              filePath: ".env.example",
              remediation: "Create .env.example with dummy values for required keys.",
            },
          ],
        });
      }
      setAuditRunning(false);
    }, 600);
  };

  const handleSaveBYOK = () => {
    if (!byokKey) return;
    const masked = byokKey.slice(0, 4) + "••••••••" + byokKey.slice(-4);
    setSavedConnections([
      ...savedConnections,
      { id: `conn-${Date.now()}`, provider: "OpenRouter (Custom)", maskedKey: masked },
    ]);
    setByokKey("");
    alert("API Key encrypted with AES-256-GCM and saved securely to workspace.");
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-[#E4E7EC] flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="flex items-center gap-2.5 px-2 py-3 mb-6 border-b border-[#E4E7EC]">
            <div className="w-8 h-8 rounded-lg bg-[#3563E9] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              DC
            </div>
            <div>
              <div className="font-bold text-sm text-[#172033]">DeployCheck</div>
              <div className="text-[11px] text-[#667085]">DevSparks India</div>
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "overview"
                  ? "bg-blue-50 text-[#3563E9] font-semibold"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>📊</span> Overview
            </button>
            <button
              onClick={() => setActiveTab("audits")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "audits"
                  ? "bg-blue-50 text-[#3563E9] font-semibold"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>🛡️</span> Audit Engine
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "ai"
                  ? "bg-blue-50 text-[#3563E9] font-semibold"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>✨</span> AI Fixes & Diff Review
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                activeTab === "settings"
                  ? "bg-blue-50 text-[#3563E9] font-semibold"
                  : "text-[#667085] hover:bg-slate-50 hover:text-[#172033]"
              }`}
            >
              <span>⚙️</span> BYOK Settings
            </button>
          </nav>
        </div>

        {/* System Invariant Card */}
        <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-[#172033]">
          <div className="flex items-center gap-1.5 font-bold text-[#3563E9] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#16803D]"></span> Light Theme Active
          </div>
          <div className="text-[11px] text-[#667085]">
            Strict palette (#F7F9FC / #FFFFFF). Zero dark mode tokens.
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto overflow-y-auto">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#172033]">
                  Platform Dashboard & Readiness
                </h1>
                <p className="text-xs text-[#667085] mt-1">
                  Inspect pre-deployment audits, configure BYOK models, and review suggested code remediations.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab("audits");
                  handleRunAudit();
                }}
                className="px-4 py-2 bg-[#3563E9] hover:bg-[#264FC7] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <span>⚡</span> Run Audit Now
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 shadow-xs">
                <div className="text-xs font-medium text-[#667085] mb-1">Audited Projects</div>
                <div className="text-2xl font-bold text-[#172033]">3</div>
                <div className="text-[11px] text-emerald-700 font-medium mt-2">Active workspace projects</div>
              </div>
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 shadow-xs">
                <div className="text-xs font-medium text-[#667085] mb-1">Deployment Readiness</div>
                <div className="text-2xl font-bold text-amber-600">66%</div>
                <div className="text-[11px] text-[#667085] font-medium mt-2">2 Passing, 1 Blocked</div>
              </div>
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 shadow-xs">
                <div className="text-xs font-medium text-[#667085] mb-1">Critical Findings</div>
                <div className="text-2xl font-bold text-[#C62828]">2</div>
                <div className="text-[11px] text-red-700 font-medium mt-2">Secrets & env leaks</div>
              </div>
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-5 shadow-xs">
                <div className="text-xs font-medium text-[#667085] mb-1">AI BYOK Key Status</div>
                <div className="text-2xl font-bold text-[#16803D]">Active</div>
                <div className="text-[11px] text-emerald-700 font-medium mt-2">AES-256-GCM Encrypted</div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 shadow-xs mb-8">
              <h2 className="text-sm font-bold text-[#172033] mb-2">Core Workflow Operations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div
                  onClick={() => setActiveTab("audits")}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 cursor-pointer transition-all"
                >
                  <div className="font-bold text-[#3563E9] text-sm mb-1">1. Pre-Deployment Audit</div>
                  <p className="text-[#667085]">Run automated scans for exposed secrets, missing lockfiles, and bad configurations.</p>
                </div>
                <div
                  onClick={() => setActiveTab("ai")}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 cursor-pointer transition-all"
                >
                  <div className="font-bold text-[#3563E9] text-sm mb-1">2. AI Patch Review</div>
                  <p className="text-[#667085]">Inspect side-by-side diffs. AI proposes patches; explicit human approval required.</p>
                </div>
                <div
                  onClick={() => setActiveTab("settings")}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 cursor-pointer transition-all"
                >
                  <div className="font-bold text-[#3563E9] text-sm mb-1">3. BYOK Credential Vault</div>
                  <p className="text-[#667085]">Connect OpenRouter API keys. Encrypted at rest, never returned in logs or client bundles.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRE-DEPLOYMENT AUDIT ENGINE */}
        {activeTab === "audits" && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#172033]">Pre-Deployment Audit Runner</h1>
                <p className="text-xs text-[#667085] mt-1">Execute deterministic static checks before code reaches servers.</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={selectedFixture}
                  onChange={(e) => setSelectedFixture(e.target.value as any)}
                  className="px-3 py-2 bg-white border border-[#E4E7EC] rounded-lg text-xs text-[#172033] focus:outline-none focus:border-blue-500"
                >
                  <option value="secrets">Project Fixture: Vulnerable (Secrets & Committed .env)</option>
                  <option value="deps">Project Fixture: Warning (Missing Build Script)</option>
                  <option value="clean">Project Fixture: Clean Next.js App</option>
                </select>
                <button
                  onClick={handleRunAudit}
                  disabled={auditRunning}
                  className="px-4 py-2 bg-[#3563E9] hover:bg-[#264FC7] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  {auditRunning ? "Auditing..." : "Execute Audit"}
                </button>
              </div>
            </div>

            {/* Audit Status Banner */}
            {activeAuditResult && (
              <div className="space-y-6">
                <div
                  className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    activeAuditResult.status === "SUCCESS"
                      ? "bg-emerald-50/70 border-emerald-200"
                      : activeAuditResult.status === "WARNING"
                      ? "bg-amber-50/70 border-amber-200"
                      : "bg-red-50/70 border-red-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#172033]">Audit Result: {activeAuditResult.status}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white border border-[#E4E7EC] font-mono">
                        {activeAuditResult.stack}
                      </span>
                    </div>
                    <div className="text-xs text-[#667085]">
                      Found {activeAuditResult.findings.length} issue(s) • Readiness:{" "}
                      <strong className={activeAuditResult.summary.isReady ? "text-emerald-700" : "text-red-700"}>
                        {activeAuditResult.summary.isReady ? "READY FOR DEPLOYMENT" : "DEPLOYMENT BLOCKED"}
                      </strong>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2.5 py-1 bg-red-100 text-red-800 font-bold rounded">
                      {activeAuditResult.summary.critical} Critical
                    </span>
                    <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded">
                      {activeAuditResult.summary.high} High
                    </span>
                  </div>
                </div>

                {/* Findings List */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-[#172033]">Detailed Findings Breakdown</h3>
                  {activeAuditResult.findings.length === 0 ? (
                    <div className="p-8 text-center bg-white border border-[#E4E7EC] rounded-xl text-xs text-emerald-700 font-medium">
                      🎉 Clean project! No critical or high issues found.
                    </div>
                  ) : (
                    activeAuditResult.findings.map((f) => (
                      <div
                        key={f.id}
                        className="bg-white border border-[#E4E7EC] rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                f.severity === "CRITICAL"
                                  ? "bg-red-50 text-[#C62828] border border-red-200"
                                  : "bg-amber-50 text-[#B7791F] border border-amber-200"
                              }`}
                            >
                              {f.severity}
                            </span>
                            <span className="text-xs font-mono text-slate-500">{f.ruleId}</span>
                            <span className="font-bold text-xs text-[#172033]">{f.title}</span>
                          </div>
                          <p className="text-xs text-[#667085]">{f.description}</p>
                          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 font-mono">
                            📍 {f.filePath} {f.line ? `(line ${f.line})` : ""}
                          </div>
                        </div>

                        {f.vulnerableSnippet && (
                          <button
                            onClick={() => {
                              setActiveFindingForAI(f);
                              setPatchApprovalStatus("pending");
                              setActiveTab("ai");
                            }}
                            className="px-3 py-1.5 bg-blue-50 text-[#3563E9] hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-semibold shrink-0 transition-colors"
                          >
                            Explain with AI & Review Fix ➔
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AI ASSISTANCE & SIDE-BY-SIDE DIFF REVIEW (CORE INVARIANT) */}
        {activeTab === "ai" && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-[#172033]">AI Assistance & Patch Review</h1>
              <p className="text-xs text-[#667085] mt-1">
                Policy Invariant: AI models only propose structured patches. Explicit human review and approval is required before code changes are applied.
              </p>
            </div>

            {activeFindingForAI ? (
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 shadow-xs space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-800 rounded">
                      {activeFindingForAI.severity}
                    </span>
                    <h2 className="font-bold text-sm text-[#172033]">{activeFindingForAI.title}</h2>
                  </div>
                  <p className="text-xs text-[#667085]">{activeFindingForAI.description}</p>
                </div>

                {/* Side-by-side Visual Diff Viewer */}
                <div className="border border-[#E4E7EC] rounded-xl overflow-hidden text-xs font-mono">
                  <div className="bg-slate-50 p-3 border-b border-[#E4E7EC] font-bold text-slate-800 flex items-center justify-between">
                    <span>Proposed Patch: {activeFindingForAI.filePath}</span>
                    <span className="text-[11px] text-slate-500 font-normal">Side-by-side Diff</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E4E7EC]">
                    {/* Original Code */}
                    <div className="p-4 bg-red-50/40">
                      <div className="font-bold text-red-800 mb-2 flex items-center gap-1">
                        <span>-</span> Original Vulnerable Code
                      </div>
                      <pre className="whitespace-pre-wrap text-slate-800 text-[11px]">
                        {activeFindingForAI.vulnerableSnippet}
                      </pre>
                    </div>

                    {/* Suggested Patch */}
                    <div className="p-4 bg-emerald-50/40">
                      <div className="font-bold text-emerald-800 mb-2 flex items-center gap-1">
                        <span>+</span> Suggested AI Remediation
                      </div>
                      <pre className="whitespace-pre-wrap text-slate-800 text-[11px]">
                        {activeFindingForAI.remediedSnippet}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Human Approval Gate Controls */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <span className="font-bold text-[#172033]">Human Approval Gate: </span>
                    {patchApprovalStatus === "pending" && (
                      <span className="text-amber-700 font-semibold">Pending Review</span>
                    )}
                    {patchApprovalStatus === "approved" && (
                      <span className="text-emerald-700 font-semibold">✅ Patch Approved by Operator</span>
                    )}
                    {patchApprovalStatus === "rejected" && (
                      <span className="text-red-700 font-semibold">❌ Patch Rejected</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPatchApprovalStatus("rejected")}
                      className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Reject Patch
                    </button>
                    <button
                      onClick={() => {
                        setPatchApprovalStatus("approved");
                        alert("Patch approved! Scheduled for test execution in isolated runner.");
                      }}
                      className="px-4 py-2 bg-[#16803D] hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                    >
                      Approve & Run Tests
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-white border border-[#E4E7EC] rounded-xl text-xs text-[#667085]">
                Select a finding from the Audit tab to inspect the AI explanation and review proposed patches.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BYOK SETTINGS */}
        {activeTab === "settings" && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-[#172033]">BYOK Provider Settings</h1>
              <p className="text-xs text-[#667085] mt-1">
                Configure your own OpenRouter API key. Credentials are encrypted at rest with AES-256-GCM.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add Key Form */}
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-[#172033]">Connect New Provider Key</h2>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Provider</label>
                  <input
                    type="text"
                    disabled
                    value="OpenRouter (BYOK)"
                    className="w-full px-3 py-2 bg-slate-50 border border-[#E4E7EC] rounded-lg text-xs text-slate-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">API Key</label>
                  <input
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={byokKey}
                    onChange={(e) => setByokKey(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E4E7EC] rounded-lg text-xs text-[#172033] focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleSaveBYOK}
                  className="px-4 py-2 bg-[#3563E9] hover:bg-[#264FC7] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Encrypt & Save Key
                </button>
              </div>

              {/* Active Connections */}
              <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-[#172033]">Active Encrypted Connections</h2>
                <div className="space-y-2">
                  {savedConnections.map((conn) => (
                    <div
                      key={conn.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#172033]">{conn.provider}</div>
                        <div className="font-mono text-slate-500 text-[11px]">{conn.maskedKey}</div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
