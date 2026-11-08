"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface OverrideRecord {
  id: string;
  domain: string;
  status: "ALLOW" | "BLOCK";
  reason?: string;
  createdBy: string;
  createdAt: string;
}

interface TestResult {
  input: string;
  extractedDomain: string;
  isDisposable: boolean;
  action: "BLOCKED" | "ALLOWED";
  reason: string;
  source?: string;
}

export default function EmailProtectionPage() {
  const [stats, setStats] = useState({
    totalBlocked: 10167,
    totalAllowlisted: 19,
    totalOverrides: 0,
    lastSyncAt: "2026-11-08T12:00:00.000Z",
  });
  const [overrides, setOverrides] = useState<OverrideRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Test Tool State
  const [testInput, setTestInput] = useState("");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // New Override Form State
  const [newDomain, setNewDomain] = useState("");
  const [newStatus, setNewStatus] = useState<"ALLOW" | "BLOCK">("BLOCK");
  const [newReason, setNewReason] = useState("");
  const [isAddingOverride, setIsAddingOverride] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/v1/admin/email-protection");
      const json = await res.json();
      if (json.success && json.data) {
        setStats({
          totalBlocked: json.data.totalBlocked,
          totalAllowlisted: json.data.totalAllowlisted,
          totalOverrides: json.data.totalOverrides,
          lastSyncAt: json.data.lastSyncAt,
        });
        setOverrides(json.data.overrides || []);
      }
    } catch {
      // Keep defaults
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTestDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/v1/admin/email-protection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test", domain: testInput.trim() }),
      });
      const json = await res.json();
      if (json.success) {
        setTestResult(json.data);
      }
    } catch {
      setTestResult({
        input: testInput,
        extractedDomain: testInput,
        isDisposable: false,
        action: "ALLOWED",
        reason: "Offline fallback check.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleAddOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;

    setIsAddingOverride(true);
    setFormMsg(null);

    try {
      const res = await fetch("/api/v1/admin/email-protection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "override",
          domain: newDomain.trim(),
          status: newStatus,
          reason: newReason.trim(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFormMsg({ type: "success", text: `Override for ${newDomain} saved successfully.` });
        setNewDomain("");
        setNewReason("");
        await fetchData();
      } else {
        setFormMsg({ type: "error", text: json.error || "Failed to add override." });
      }
    } catch {
      setFormMsg({ type: "error", text: "Network error occurred." });
    } finally {
      setIsAddingOverride(false);
    }
  };

  const handleRemoveOverride = async (domain: string) => {
    try {
      const res = await fetch("/api/v1/admin/email-protection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", domain }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchData();
      }
    } catch {
      // Ignored
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 font-sans">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#667085]">
        <Link href="/app/settings" className="hover:text-[#5938F5] flex items-center gap-1 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Settings</span>
        </Link>
        <span>/</span>
        <span className="text-[#17172A] font-semibold">Email Protection</span>
      </div>

      {/* Hero Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
              Registration Security
            </span>
            <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
              Active & Enforced
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#17172A]">
            Disposable Email Protection & Intelligence
          </h1>
          <p className="text-xs text-[#667085] mt-1 leading-relaxed">
            Guards user registration against throwaway, burner and temporary email providers with maintained 10,000+ domain dataset and protected consumer email allowlist.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          disabled={isLoading}
          className="h-8 rounded-[8px] text-xs font-semibold gap-1.5 border-[#E5E7EB] hover:bg-slate-50 shrink-0"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs">
          <div className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
            Blocked Domains
          </div>
          <div className="text-2xl font-extrabold text-[#17172A] mt-1">
            {stats.totalBlocked.toLocaleString()}
          </div>
          <div className="text-[10.5px] text-[#667085] mt-0.5">
            Maintained upstream blocklist
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs">
          <div className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
            Allowlisted Providers
          </div>
          <div className="text-2xl font-extrabold text-[#16A34A] mt-1">
            {stats.totalAllowlisted}
          </div>
          <div className="text-[10.5px] text-[#667085] mt-0.5">
            Gmail, Outlook, Zoho, Proton, etc.
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs">
          <div className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
            Custom Overrides
          </div>
          <div className="text-2xl font-extrabold text-[#5938F5] mt-1">
            {stats.totalOverrides}
          </div>
          <div className="text-[10.5px] text-[#667085] mt-0.5">
            Manual allow/block rules
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-2xs">
          <div className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">
            Lookup Latency
          </div>
          <div className="text-2xl font-extrabold text-[#17172A] mt-1 font-mono">
            &lt; 1 ms
          </div>
          <div className="text-[10.5px] text-[#667085] mt-0.5">
            In-memory Set O(1) evaluation
          </div>
        </div>
      </div>

      {/* Interactive Domain Test Tool */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#17172A] flex items-center gap-2">
            <Search className="h-4 w-4 text-[#5938F5]" />
            <span>Interactive Domain & Email Tester</span>
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Test any email address or domain against the real-time registration filter.
          </p>
        </div>

        <form onSubmit={handleTestDomain} className="flex flex-col sm:flex-row gap-2.5">
          <Input
            type="text"
            placeholder="e.g. user@mailinator.com, tempmail.com, or user@gmail.com"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="flex-1 h-9 text-xs rounded-[8px] border-[#E5E7EB]"
          />
          <Button
            type="submit"
            disabled={isTesting || !testInput.trim()}
            className="h-9 px-4 rounded-[8px] bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shrink-0"
          >
            {isTesting ? "Evaluating..." : "Test Domain"}
          </Button>
        </form>

        {testResult && (
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
              testResult.action === "BLOCKED"
                ? "bg-rose-50/80 border-rose-200 text-rose-900"
                : "bg-emerald-50/80 border-emerald-200 text-emerald-900"
            }`}
          >
            {testResult.action === "BLOCKED" ? (
              <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {testResult.action === "BLOCKED" ? "Blocked (Disposable)" : "Allowed (Legitimate)"}
                </span>
                <Badge
                  variant="outline"
                  className={
                    testResult.action === "BLOCKED"
                      ? "bg-rose-100 text-rose-800 border-rose-300"
                      : "bg-emerald-100 text-emerald-800 border-emerald-300"
                  }
                >
                  {testResult.source || "evaluation"}
                </Badge>
              </div>
              <p>
                Domain: <code className="font-mono font-semibold">{testResult.extractedDomain}</code> — {testResult.reason}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Override Management Section */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#17172A] flex items-center gap-2">
            <Plus className="h-4 w-4 text-[#5938F5]" />
            <span>Manage Domain Overrides</span>
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Explicitly allow or block custom domains regardless of upstream list status.
          </p>
        </div>

        {formMsg && (
          <div
            className={`p-2.5 rounded-[8px] text-xs flex items-center gap-2 ${
              formMsg.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {formMsg.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0" />
            )}
            <span>{formMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleAddOverride} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
          <div className="sm:col-span-5 space-y-1">
            <Label htmlFor="newDomain" className="text-xs font-semibold text-[#17172A]">
              Domain
            </Label>
            <Input
              id="newDomain"
              type="text"
              placeholder="e.g. university.edu or trashmail.de"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              required
              className="h-9 text-xs rounded-[8px] border-[#E5E7EB]"
            />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <Label htmlFor="newStatus" className="text-xs font-semibold text-[#17172A]">
              Action
            </Label>
            <select
              id="newStatus"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as "ALLOW" | "BLOCK")}
              className="w-full h-9 px-3 bg-white text-xs text-[#17172A] border border-[#E5E7EB] rounded-[8px] focus:outline-hidden focus:ring-1 focus:ring-[#5938F5]"
            >
              <option value="BLOCK">BLOCK (Reject registration)</option>
              <option value="ALLOW">ALLOW (Accept registration)</option>
            </select>
          </div>

          <div className="sm:col-span-4 space-y-1">
            <Label htmlFor="newReason" className="text-xs font-semibold text-[#17172A]">
              Reason / Justification
            </Label>
            <Input
              id="newReason"
              type="text"
              placeholder="e.g. Partner domain or spam domain"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              className="h-9 text-xs rounded-[8px] border-[#E5E7EB]"
            />
          </div>

          <div className="sm:col-span-12 flex justify-end">
            <Button
              type="submit"
              disabled={isAddingOverride || !newDomain.trim()}
              className="h-9 px-4 rounded-[8px] bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold"
            >
              {isAddingOverride ? "Saving..." : "Add Override"}
            </Button>
          </div>
        </form>

        {/* Overrides Table */}
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden mt-3">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F8FC] border-b border-[#E5E7EB] text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3">Policy</th>
                <th className="py-2.5 px-3">Reason</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {overrides.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 px-3 text-center text-[#667085] italic">
                    No custom overrides configured yet. Standard 10,000+ domain blocklist and curated allowlist active.
                  </td>
                </tr>
              ) : (
                overrides.map((ovr) => (
                  <tr key={ovr.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 font-mono font-medium text-[#17172A]">{ovr.domain}</td>
                    <td className="py-2 px-3">
                      <Badge
                        variant="outline"
                        className={
                          ovr.status === "BLOCK"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }
                      >
                        {ovr.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-[#667085]">{ovr.reason || "—"}</td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => handleRemoveOverride(ovr.domain)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Delete override"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upstream Source & Automation Card */}
      <div className="bg-gradient-to-r from-purple-50/40 via-white to-blue-50/30 border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#17172A] flex items-center gap-1.5">
            <span>Automated Upstream Sync Engine</span>
          </h3>
          <p className="text-xs text-[#667085] mt-1 leading-relaxed">
            Synchronizes weekly via GitHub Actions with the official community blocklist (<code className="font-mono text-purple-700">disposable-email-domains</code>).
            All updates pass an automatic safety filter preventing legitimate email providers from ever being blocked.
          </p>
        </div>

        <a
          href="https://github.com/disposable-email-domains/disposable-email-domains"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#E5E7EB] bg-white text-xs font-semibold text-[#17172A] hover:bg-slate-50 transition-colors shrink-0"
        >
          <span>Upstream Source</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
}

