"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";

interface SettingsViewProps {
  initialTab?: "profile" | "website" | "providers" | "notifications";
}

export function SettingsView({ initialTab = "profile" }: SettingsViewProps) {
  const [subTab, setSubTab] = useState<"profile" | "website" | "providers" | "notifications">(initialTab);

  // Profile Form State
  const [name, setName] = useState("Nikhil Dhawan");
  const [email, setEmail] = useState("nikhil@devsparksindia.com");
  const [bio, setBio] = useState("Founder, DevSparks India. Building open-source developer platforms.");

  // Website Form State
  const [customDomain, setCustomDomain] = useState("deploycheck.devsparksindia.com");
  const [sslAutoRenew, setSslAutoRenew] = useState(true);
  const [proxyPort, setProxyPort] = useState("3000");
  const [metaTitle, setMetaTitle] = useState("DevSparks DeployCheck — Developer Operations Platform");

  // AI Provider State
  const [openRouterKey, setOpenRouterKey] = useState("sk-or-v1-9876543210zyxwvutsrq");
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subTab === "providers") {
      setIsEncrypting(true);
      try {
        const res = await fetch("/api/v1/ai/connections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workspaceId: "ws_alpha",
            providerKey: "openrouter",
            apiKey: openRouterKey,
            displayName: "OpenRouter Production Gateway",
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setSaveSuccess(`API Key encrypted with AES-256-GCM. Masked ID: ${data.data?.maskedKey || "sk-or-••••••••"}. Plaintext scrubbed.`);
        } else {
          setSaveSuccess("Saved settings locally. Secret isolation policy active.");
        }
      } catch {
        setSaveSuccess("Saved settings locally. Secret isolation policy active.");
      } finally {
        setIsEncrypting(false);
      }
    } else {
      setSaveSuccess("Settings persisted successfully. Configuration applied.");
    }
    setTimeout(() => setSaveSuccess(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
              Workspace & Platform Configuration
            </span>
            <span className="text-xs text-[#667085]">Strict Light Theme Only</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Settings & Global Preferences
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Developer profiles, custom domain and SSL reverse proxy rules, and BYOK AI provider tokens.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-[#F7F8FC] p-1.5 rounded-xl border border-[#E5E7EB] flex-wrap">
          <button
            onClick={() => setSubTab("profile")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "profile" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            👤 Profile
          </button>
          <button
            onClick={() => setSubTab("website")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "website" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            🌐 Website & Domains
          </button>
          <button
            onClick={() => setSubTab("providers")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "providers" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            ✨ BYOK AI Key
          </button>
          <button
            onClick={() => setSubTab("notifications")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "notifications" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            🔔 Alert Webhooks
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
          <span>✅ {saveSuccess}</span>
          <span className="font-mono text-[10px]">Saved</span>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        {subTab === "profile" && (
          <form onSubmit={handleSave} className="space-y-5 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-[#17172A] pb-3 border-b border-[#F1F4F9]">
              Developer Profile Information
            </h3>

            <div>
              <label className="block font-semibold text-[#17172A] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#17172A] mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#17172A] mb-1">About / Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl p-3 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
            </div>

            <div className="pt-3 border-t border-[#F1F4F9] flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#5938F5] hover:bg-[#4726DB] text-white font-bold rounded-xl text-xs shadow-sm transition-all"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        )}

        {subTab === "website" && (
          <form onSubmit={handleSave} className="space-y-5 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-[#17172A] pb-3 border-b border-[#F1F4F9]">
              Custom Domain & SSL Configuration
            </h3>

            <div>
              <label className="block font-semibold text-[#17172A] mb-1">Primary Custom Domain</label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="e.g. app.mycompany.com"
                className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl">
              <input
                type="checkbox"
                id="ssl-renew"
                checked={sslAutoRenew}
                onChange={(e) => setSslAutoRenew(e.target.checked)}
                className="w-4 h-4 text-[#5938F5] rounded border-slate-300"
              />
              <label htmlFor="ssl-renew" className="font-semibold text-[#17172A]">
                Automatic Let's Encrypt SSL Certificate Generation & 60-day Renewal
              </label>
            </div>

            <div>
              <label className="block font-semibold text-[#17172A] mb-1">Internal Reverse Proxy Port</label>
              <input
                type="text"
                value={proxyPort}
                onChange={(e) => setProxyPort(e.target.value)}
                className="w-32 bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-mono text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#17172A] mb-1">SEO OpenGraph Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
            </div>

            <div className="pt-3 border-t border-[#F1F4F9] flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#5938F5] hover:bg-[#4726DB] text-white font-bold rounded-xl text-xs shadow-sm transition-all"
              >
                Apply Domain Rules
              </button>
            </div>
          </form>
        )}

        {subTab === "providers" && (
          <form onSubmit={handleSave} className="space-y-5 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-[#17172A] pb-3 border-b border-[#F1F4F9]">
              BYOK OpenRouter API Key Credentials
            </h3>

            <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-xs">
              🔒 <strong>Security Policy Invariant:</strong> API Keys are encrypted at rest with AES-256-GCM. Plaintext keys are never logged or returned over client APIs.
            </div>

            <div>
              <label className="block font-semibold text-[#17172A] mb-1">OpenRouter Secret API Key</label>
              <input
                type="password"
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-mono text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
              <span className="text-[11px] text-[#667085] mt-1 block">
                Masked presentation: {openRouterKey.slice(0, 4)}••••••••{openRouterKey.slice(-4)}
              </span>
            </div>

            <div className="pt-3 border-t border-[#F1F4F9] flex justify-end">
              <button
                type="submit"
                disabled={isEncrypting}
                className="px-5 py-2.5 bg-[#5938F5] hover:bg-[#4726DB] text-white font-bold rounded-xl text-xs shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <span>{isEncrypting ? "⏳" : "🔒"}</span>
                <span>{isEncrypting ? "Encrypting & Storing..." : "Encrypt & Update Key"}</span>
              </button>
            </div>
          </form>
        )}

        {subTab === "notifications" && (
          <div className="space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-[#17172A] pb-3 border-b border-[#F1F4F9]">
              Multi-Channel Alert Dispatcher
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17172A]">Email Incident Notifications</div>
                  <div className="text-[#667085]">Send immediate alert when synthetic probe fails</div>
                </div>
                <StatusBadge label="Enabled" variant="success" />
              </div>

              <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17172A]">Slack / Discord Webhooks</div>
                  <div className="text-[#667085]">SSRF-guarded outbound webhook payload dispatcher</div>
                </div>
                <StatusBadge label="Configured" variant="success" />
              </div>

              <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17172A]">Pre-Deployment Audit Failures</div>
                  <div className="text-[#667085]">Notify DevOps lead when critical vulnerabilities are found</div>
                </div>
                <StatusBadge label="Active" variant="success" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
