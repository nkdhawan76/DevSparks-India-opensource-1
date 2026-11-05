"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";
import { KpiCard } from "../common/KpiCard";
import { Rocket, TrendingUp, Clock, RotateCcw, Check, RefreshCw } from "../common/Icons";

export function DeploymentsView() {
  const [activeStep, _setActiveStep] = useState(4);
  const [rollbackSuccess, setRollbackSuccess] = useState(false);

  const deploymentSteps = [
    { step: 1, label: "Audit Gate Check", desc: "0 critical/high issues verified", done: true },
    { step: 2, label: "Build Container Image", desc: "Docker multi-stage build succeeded", done: true },
    { step: 3, label: "Registry Push", desc: "Digest sha256:7f8a9b verified", done: true },
    { step: 4, label: "VPS Service Update", desc: "Restarting daemon container on VPS-01", done: false },
    { step: 5, label: "Synthetic Probe Verification", desc: "HTTP 200 healthcheck validation", done: false },
  ];

  const history = [
    {
      id: "dep-01j8k9",
      project: "thefein.in",
      version: "v1.4.2",
      commit: "55e588d",
      target: "VPS-01 (Production)",
      status: "Success",
      duration: "42s",
      deployedAt: "Today, 11:10 PM",
    },
    {
      id: "dep-01j8k8",
      project: "kreedaportal.com",
      version: "v2.1.0",
      commit: "74a3259",
      target: "VPS-02 (Production)",
      status: "Success",
      duration: "58s",
      deployedAt: "Yesterday, 09:35 AM",
    },
    {
      id: "dep-01j8k7",
      project: "silvereraheritage.com",
      version: "v1.0.4",
      commit: "da7075d",
      target: "VPS-01 (Production)",
      status: "Rolled Back",
      duration: "18s",
      deployedAt: "Yesterday, 06:27 PM",
    },
  ];

  const handleTriggerRollback = () => {
    setRollbackSuccess(true);
    setTimeout(() => setRollbackSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#16A34A] border border-emerald-200">
              Deterministic Pipeline
            </span>
            <span className="text-xs text-[#667085]">Automatic Health Rollback Enabled</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Production Deployment Pipelines
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Pre-flight audit gates, immutable release history, and automatic state-machine rollback on probe failures.
          </p>
        </div>

        <button
          onClick={handleTriggerRollback}
          className="px-4 py-2 border border-rose-300 bg-rose-50 hover:bg-rose-100 text-[#DC2626] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto"
        >
          <RotateCcw size={15} />
          <span>Initiate Fast Rollback</span>
        </button>
      </div>

      {rollbackSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check size={15} className="text-[#16A34A] shrink-0" />
            <span className="font-bold">Rollback Orchestrator:</span> Restored previous stable release container on VPS-01. Traffic rerouted cleanly.
          </div>
          <span className="text-[10px] font-mono">Status: 200 OK</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Releases" value="14" subtitle="Across 3 target VPS nodes" icon={<Rocket size={16} className="text-[#16A34A]" />} />
        <KpiCard title="Deployment Success Rate" value="98.2%" subtitle="12/14 clean deployments" trend={{ value: "+1.2%", isPositive: true }} icon={<TrendingUp size={16} className="text-[#3988F7]" />} />
        <KpiCard title="Avg Pipeline Duration" value="48s" subtitle="Build + Scan + Deploy" icon={<Clock size={16} className="text-[#F59E0B]" />} />
        <KpiCard title="Rollback Readiness" value="Instant" subtitle="Retaining last 3 releases" icon={<RotateCcw size={16} className="text-[#5938F5]" />} badge="Active" />
      </div>

      {/* Step Tracker for Active Deployment */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F4F9]">
          <div>
            <h3 className="text-sm font-bold text-[#17172A]">Active Deployment Pipeline (thefein.in • Release v1.4.3)</h3>
            <p className="text-xs text-[#667085]">Tracking build progress and automated verification checkpoints</p>
          </div>
          <StatusBadge label="In Progress" variant="warning" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {deploymentSteps.map((s) => (
            <div
              key={s.step}
              className={`p-3.5 rounded-xl border text-xs transition-all ${
                s.done
                  ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                  : s.step === activeStep
                  ? "bg-purple-50/80 border-[#5938F5] text-purple-900 shadow-sm"
                  : "bg-slate-50 border-[#E5E7EB] text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[10px] uppercase">Step 0{s.step}</span>
                <span>{s.done ? <Check size={13} className="text-[#16A34A]" /> : s.step === activeStep ? <RefreshCw size={13} className="animate-spin text-[#5938F5]" /> : "○"}</span>
              </div>
              <div className="font-extrabold text-xs text-[#17172A]">{s.label}</div>
              <div className="text-[11px] text-[#667085] mt-1 leading-tight">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment History Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#17172A] mb-4">Deployment History & Release Ledger</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F1F4F9] text-slate-400 text-[10px] uppercase">
                <th className="pb-3 font-bold">Release ID</th>
                <th className="pb-3 font-bold">Project</th>
                <th className="pb-3 font-bold">Version</th>
                <th className="pb-3 font-bold">Commit</th>
                <th className="pb-3 font-bold">Target VPS</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold">Duration</th>
                <th className="pb-3 font-bold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-mono font-bold text-[#17172A]">{h.id}</td>
                  <td className="py-3 font-bold text-[#17172A]">{h.project}</td>
                  <td className="py-3 font-semibold text-[#5938F5]">{h.version}</td>
                  <td className="py-3 font-mono text-[11px] text-[#667085]">{h.commit}</td>
                  <td className="py-3 text-[#17172A]">{h.target}</td>
                  <td className="py-3">
                    <StatusBadge
                      label={h.status}
                      variant={h.status === "Success" ? "success" : "danger"}
                    />
                  </td>
                  <td className="py-3 text-[#667085] font-mono">{h.duration}</td>
                  <td className="py-3 text-[#667085]">{h.deployedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
