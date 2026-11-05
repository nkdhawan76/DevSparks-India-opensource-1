"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";
import { KpiCard } from "../common/KpiCard";

export function MonitoringView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTargetName, setNewTargetName] = useState("");
  const [newTargetUrl, setNewTargetUrl] = useState("");
  const [newInterval, setNewInterval] = useState("60s");
  const [probes, setProbes] = useState([
    {
      id: "probe-1",
      name: "The Fein India Health Endpoint",
      url: "https://thefein.in/api/health",
      interval: "60s",
      latency: "48ms",
      status: "Operational",
      uptime: "99.99%",
      sslDays: 74,
      lastCheck: "12s ago",
    },
    {
      id: "probe-2",
      name: "Kreeda Portal Webhook Listener",
      url: "https://kreedaportal.com/webhook",
      interval: "30s",
      latency: "112ms",
      status: "Operational",
      uptime: "99.85%",
      sslDays: 48,
      lastCheck: "28s ago",
    },
    {
      id: "probe-3",
      name: "Silver Era Heritage Gateway",
      url: "https://silvereraheritage.com",
      interval: "60s",
      latency: "84ms",
      status: "Operational",
      uptime: "99.95%",
      sslDays: 82,
      lastCheck: "44s ago",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#16A34A] border border-emerald-200">
              Synthetic Prober Active
            </span>
            <span className="text-xs text-[#667085]">Global SSRF Defense Enforced</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Synthetic Uptime & Endpoint Monitoring
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            HTTP/TCP health checks, SSL certificate expiry automation, p95 response telemetry, and alert webhooks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
        >
          ＋ New Monitor Target
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Network Uptime" value="99.98%" subtitle="Across 3 target endpoints" trend={{ value: "+0.02%", isPositive: true }} icon="📡" badge="Optimal" />
        <KpiCard title="Average Latency" value="81ms" subtitle="p95: 124ms" trend={{ value: "-6ms", isPositive: true }} icon="⚡" />
        <KpiCard title="SSL Certificates" value="3 Valid" subtitle="Auto-renewing before 14 days" icon="🔒" badge="Active" />
        <KpiCard title="Active Incidents" value="0" subtitle="Clean status ledger" icon="🛡️" />
      </div>

      {/* Target Probes Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F9] mb-4">
          <h3 className="text-sm font-bold text-[#17172A]">Monitored HTTP & Webhook Endpoints</h3>
          <span className="text-xs text-[#667085]">Auto-refreshing every 30 seconds</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F1F4F9] text-slate-400 text-[10px] uppercase">
                <th className="pb-3 font-bold">Target Name</th>
                <th className="pb-3 font-bold">URL</th>
                <th className="pb-3 font-bold">Latency</th>
                <th className="pb-3 font-bold">30d Uptime</th>
                <th className="pb-3 font-bold">SSL Expiry</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold">Last Probe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {probes.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-bold text-[#17172A]">{p.name}</td>
                  <td className="py-3 font-mono text-[11px] text-[#5938F5]">
                    <a href={p.url} target="_blank" rel="noreferrer" className="hover:underline">
                      {p.url} ↗
                    </a>
                  </td>
                  <td className="py-3 font-mono font-semibold text-[#17172A]">{p.latency}</td>
                  <td className="py-3 font-bold text-[#16A34A]">{p.uptime}</td>
                  <td className="py-3 text-[#667085]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">
                      {p.sslDays} days
                    </span>
                  </td>
                  <td className="py-3">
                    <StatusBadge label={p.status} variant="success" />
                  </td>
                  <td className="py-3 text-[#667085]">{p.lastCheck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Synthetic Target Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-base text-[#17172A]">Add Synthetic Health Probe Target</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#17172A] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#17172A] mb-1">Target Name</label>
                <input
                  type="text"
                  value={newTargetName}
                  onChange={(e) => setNewTargetName(e.target.value)}
                  placeholder="e.g. Compikart API Health Endpoint"
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17172A] mb-1">Target URL</label>
                <input
                  type="url"
                  value={newTargetUrl}
                  onChange={(e) => setNewTargetUrl(e.target.value)}
                  placeholder="https://api.compikart.opm/health"
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17172A] mb-1">Probe Interval</label>
                <select
                  value={newInterval}
                  onChange={(e) => setNewInterval(e.target.value)}
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                >
                  <option value="30s">Every 30 seconds</option>
                  <option value="60s">Every 60 seconds (Standard)</option>
                  <option value="300s">Every 5 minutes</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px]">
                🛡️ <strong>SSRF Guard Invariant:</strong> DeployCheck validates all probe destinations against RFC 1918 private ranges, AWS/GCP instance metadata, and loopback IP addresses before socket creation.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#667085] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newTargetName.trim() || !newTargetUrl.trim()) return;
                  setProbes([
                    ...probes,
                    {
                      id: `probe-${Date.now()}`,
                      name: newTargetName,
                      url: newTargetUrl,
                      interval: newInterval,
                      latency: "54ms",
                      status: "Operational",
                      uptime: "100%",
                      sslDays: 90,
                      lastCheck: "Just now",
                    },
                  ]);
                  setNewTargetName("");
                  setNewTargetUrl("");
                  setShowAddModal(false);
                }}
                className="px-5 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white rounded-xl text-xs font-bold"
              >
                Create Target & Start Probing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
