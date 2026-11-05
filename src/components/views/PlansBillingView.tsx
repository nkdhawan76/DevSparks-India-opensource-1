"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";

export function PlansBillingView() {
  const [activePlanTab, setActivePlanTab] = useState<"tiers" | "invoices">("tiers");
  const [planFeedback, setPlanFeedback] = useState<string | null>(null);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const plans = [
    {
      name: "Starter",
      badge: "Community",
      price: "$0",
      period: "forever",
      desc: "Essential pre-deployment auditing and BYOK AI assistant for individual developers.",
      features: ["Up to 3 Projects", "100 Audits / month", "BYOK OpenRouter Integration", "Community Discord Support", "Local Docker Runner"],
      current: false,
      cta: "Current Free Tier",
    },
    {
      name: "Pro",
      badge: "Most Popular",
      price: "$29",
      period: "per month",
      desc: "Complete operational suite with VPS management and synthetic endpoint monitoring.",
      features: ["Up to 15 Projects", "1,000 Audits / month", "3 Connected VPS Nodes", "60s Synthetic Monitoring", "Automated Fast Rollback", "Priority Email Support"],
      current: true,
      cta: "Current Active Plan",
    },
    {
      name: "Team",
      badge: "Growing Teams",
      price: "$99",
      period: "per month",
      desc: "Advanced multi-tenant RBAC permissions, webhook alerting, and SEO crawler insights.",
      features: ["Unlimited Projects", "10,000 Audits / month", "10 Connected VPS Nodes", "Multi-Tenant RBAC Matrix", "30s Synthetic Monitoring", "SEO & Crawler Analytics", "Audit Log Retention"],
      current: false,
      cta: "Upgrade to Team",
    },
    {
      name: "Enterprise",
      badge: "Custom Cloud",
      price: "Custom",
      period: "tailored",
      desc: "Dedicated DevSparks Cloud control plane with SLA guarantees and multi-cloud runners.",
      features: ["Dedicated Infrastructure", "Unlimited Everything", "Custom AI Model Routing", "Multi-Region Probes", "24/7 Dedicated Support", "SOC2 / HIPAA Compliance"],
      current: false,
      cta: "Contact Enterprise",
    },
  ];

  const invoices = [
    { id: "INV-2026-003", date: "01 Nov 2026", amount: "$29.00", status: "Paid", plan: "Pro Plan - Monthly" },
    { id: "INV-2026-002", date: "01 Oct 2026", amount: "$29.00", status: "Paid", plan: "Pro Plan - Monthly" },
    { id: "INV-2026-001", date: "01 Sep 2026", amount: "$29.00", status: "Paid", plan: "Pro Plan - Monthly" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
              Entitlements & Quotas
            </span>
            <span className="text-xs text-[#667085]">Active Tier: Pro ($29/mo)</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Plans, Billing & Subscriptions
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Server-side entitlement enforcement, resource quota allocations, and billing history.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F7F8FC] p-1.5 rounded-xl border border-[#E5E7EB]">
          <button
            onClick={() => setActivePlanTab("tiers")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activePlanTab === "tiers" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            💳 Plan Tiers
          </button>
          <button
            onClick={() => setActivePlanTab("invoices")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activePlanTab === "invoices" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            📑 Invoices & Receipts
          </button>
        </div>
      </div>

      {planFeedback && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-900 flex items-center justify-between animate-in fade-in">
          <span>⚡ {planFeedback}</span>
          <button onClick={() => setPlanFeedback(null)} className="text-purple-400 hover:text-purple-700 font-bold">✕</button>
        </div>
      )}

      {downloadFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
          <span>📄 {downloadFeedback}</span>
          <button onClick={() => setDownloadFeedback(null)} className="text-emerald-400 hover:text-emerald-700 font-bold">✕</button>
        </div>
      )}

      {/* Resource Quotas Usage */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#17172A]">Current Workspace Quotas (Pro Plan)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-[#667085]">Projects</span>
              <span className="text-[#17172A]">5 / 15 (33%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#5938F5] h-full rounded-full" style={{ width: "33%" }} />
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-[#667085]">Monthly Audits</span>
              <span className="text-[#17172A]">142 / 1,000 (14%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#16A34A] h-full rounded-full" style={{ width: "14%" }} />
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-[#667085]">VPS Nodes</span>
              <span className="text-[#17172A]">3 / 3 (100%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-[#E5E7EB] rounded-xl space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-[#667085]">Synthetic Probes</span>
              <span className="text-[#17172A]">3 / 10 (30%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#3988F7] h-full rounded-full" style={{ width: "30%" }} />
            </div>
          </div>
        </div>
      </div>

      {planFeedback && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-900 flex items-center justify-between animate-in fade-in">
          <span>⚡ {planFeedback}</span>
          <button onClick={() => setPlanFeedback(null)} className="text-purple-400 hover:text-purple-700 font-bold">✕</button>
        </div>
      )}

      {downloadFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
          <span>📄 {downloadFeedback}</span>
          <button onClick={() => setDownloadFeedback(null)} className="text-emerald-400 hover:text-emerald-700 font-bold">✕</button>
        </div>
      )}

      {activePlanTab === "tiers" ? (
        /* Tier Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all ${
                p.current
                  ? "border-[#5938F5] ring-2 ring-[#5938F5]/20 shadow-md"
                  : "border-[#E5E7EB] hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-base text-[#17172A]">{p.name}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.current
                        ? "bg-purple-100 text-[#5938F5]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-black text-[#17172A]">{p.price}</span>
                  <span className="text-xs text-[#667085]">/{p.period}</span>
                </div>

                <p className="text-xs text-[#667085] leading-relaxed mb-4">{p.desc}</p>

                <div className="space-y-2 pt-3 border-t border-[#F1F4F9] text-xs">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#17172A]">
                      <span className="text-[#16A34A] font-bold">✓</span>
                      <span className="text-[11px] leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F1F4F9]">
                <button
                  onClick={() => setPlanFeedback(`Selected ${p.name} tier configuration. Server quotas updated accordingly.`)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    p.current
                      ? "bg-[#5938F5] text-white shadow-sm hover:bg-[#4726DB]"
                      : "bg-slate-50 border border-[#E5E7EB] text-[#17172A] hover:bg-slate-100"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Invoices Table */
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-[#17172A] mb-4">Workspace Invoices & Billing Receipts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F1F4F9] text-slate-400 text-[10px] uppercase">
                  <th className="pb-3 font-bold">Invoice #</th>
                  <th className="pb-3 font-bold">Billing Date</th>
                  <th className="pb-3 font-bold">Plan Description</th>
                  <th className="pb-3 font-bold">Amount</th>
                  <th className="pb-3 font-bold">Payment Status</th>
                  <th className="pb-3 font-bold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8FAFC]">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-mono font-bold text-[#17172A]">{inv.id}</td>
                    <td className="py-3 text-[#667085]">{inv.date}</td>
                    <td className="py-3 font-semibold text-[#17172A]">{inv.plan}</td>
                    <td className="py-3 font-mono font-bold text-[#17172A]">{inv.amount}</td>
                    <td className="py-3">
                      <StatusBadge label={inv.status} variant="success" />
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setDownloadFeedback(`Generated cryptographically signed PDF receipt for ${inv.id} (${inv.amount}).`)}
                        className="text-[#5938F5] font-semibold hover:underline"
                      >
                        Download PDF ↓
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
