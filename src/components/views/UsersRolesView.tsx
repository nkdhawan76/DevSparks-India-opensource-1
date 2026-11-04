"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";
import { KpiCard } from "../common/KpiCard";

export function UsersRolesView() {
  const [activeSubTab, setActiveSubTab] = useState<"users" | "roles">("users");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Developer");

  const [members, setMembers] = useState([
    { id: "u-1", name: "Nikhil Dhawan", email: "nikhil@devsparksindia.com", role: "Super Admin", status: "Active", lastActive: "Just now" },
    { id: "u-2", name: "Aarav Sharma", email: "aarav@devsparksindia.com", role: "DevOps Lead", status: "Active", lastActive: "15 mins ago" },
    { id: "u-3", name: "Priya Patel", email: "priya@devsparksindia.com", role: "Senior Developer", status: "Active", lastActive: "1 hour ago" },
    { id: "u-4", name: "Rohan Verma", email: "rohan@devsparksindia.com", role: "Security Auditor", status: "Active", lastActive: "3 hours ago" },
    { id: "u-5", name: "External Auditor", email: "audit@partner.org", role: "Viewer", status: "Active", lastActive: "Yesterday" },
  ]);

  const permissionMatrix = [
    { capability: "Trigger Pre-Deployment Audits", superAdmin: true, admin: true, dev: true, devops: true, viewer: true },
    { capability: "Request AI Patch Diff Proposals", superAdmin: true, admin: true, dev: true, devops: true, viewer: false },
    { capability: "Approve & Apply AI Code Diffs", superAdmin: true, admin: true, dev: true, devops: false, viewer: false },
    { capability: "Execute VPS Diagnostic Commands", superAdmin: true, admin: true, dev: false, devops: true, viewer: false },
    { capability: "Trigger Production Deployments", superAdmin: true, admin: true, dev: false, devops: true, viewer: false },
    { capability: "Fast State-Machine Rollback", superAdmin: true, admin: true, dev: false, devops: true, viewer: false },
    { capability: "Manage Team Members & RBAC", superAdmin: true, admin: true, dev: false, devops: false, viewer: false },
    { capability: "Configure Subscriptions & Billing", superAdmin: true, admin: false, dev: false, devops: false, viewer: false },
  ];

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setMembers([
      ...members,
      {
        id: `u-${Date.now()}`,
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole,
        status: "Active",
        lastActive: "Invited",
      },
    ]);
    setInviteEmail("");
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
              Multi-Tenant RBAC & Isolation
            </span>
            <span className="text-xs text-[#667085]">Workspace: ws_alpha</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Users Management & Role Permissions
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Server-side authorization rules, team membership control, and capability assignment matrices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#F7F8FC] p-1.5 rounded-xl border border-[#E5E7EB]">
            <button
              onClick={() => setActiveSubTab("users")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === "users" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
              }`}
            >
              👥 Team Members
            </button>
            <button
              onClick={() => setActiveSubTab("roles")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === "roles" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
              }`}
            >
              🔑 RBAC Matrix
            </button>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            ＋ Invite Member
          </button>
        </div>
      </div>

      {activeSubTab === "users" ? (
        <div className="space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Total Members" value={String(members.length)} subtitle="5 active seats occupied" icon="👥" />
            <KpiCard title="Super Admins" value="1" subtitle="Full workspace authority" icon="👑" badge="Owner" />
            <KpiCard title="DevOps & Developers" value="3" subtitle="Deployment & audit capabilities" icon="💻" />
            <KpiCard title="Security & Viewers" value="1" subtitle="Read-only audit reports" icon="🔍" />
          </div>

          {/* Members Table */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#17172A] mb-4">Workspace Team Members</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F1F4F9] text-slate-400 text-[10px] uppercase">
                    <th className="pb-3 font-bold">User</th>
                    <th className="pb-3 font-bold">Email</th>
                    <th className="pb-3 font-bold">Role</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold">Last Activity</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFC]">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#5938F5] text-white flex items-center justify-center font-bold text-xs">
                            {m.name.charAt(0)}
                          </div>
                          <span className="font-bold text-[#17172A]">{m.name}</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-[11px] text-[#667085]">{m.email}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-purple-50 text-[#5938F5] border border-purple-200 font-semibold text-[11px]">
                          {m.role}
                        </span>
                      </td>
                      <td className="py-3">
                        <StatusBadge label={m.status} variant="success" />
                      </td>
                      <td className="py-3 text-[#667085]">{m.lastActive}</td>
                      <td className="py-3 text-right">
                        <button className="text-slate-400 hover:text-[#5938F5] font-bold">•••</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F4F9] mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#17172A]">RBAC Capability & Permission Matrix</h3>
              <p className="text-xs text-[#667085]">Explicit server-side authorization boundaries per role</p>
            </div>
            <StatusBadge label="Server Gated" variant="success" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F1F4F9] text-slate-400 text-[10px] uppercase">
                  <th className="pb-3 font-bold">Platform Capability</th>
                  <th className="pb-3 font-bold text-center">Super Admin</th>
                  <th className="pb-3 font-bold text-center">Admin</th>
                  <th className="pb-3 font-bold text-center">Developer</th>
                  <th className="pb-3 font-bold text-center">DevOps</th>
                  <th className="pb-3 font-bold text-center">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8FAFC]">
                {permissionMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-semibold text-[#17172A]">{row.capability}</td>
                    <td className="py-3 text-center">{row.superAdmin ? "✅" : "❌"}</td>
                    <td className="py-3 text-center">{row.admin ? "✅" : "❌"}</td>
                    <td className="py-3 text-center">{row.dev ? "✅" : "❌"}</td>
                    <td className="py-3 text-center">{row.devops ? "✅" : "❌"}</td>
                    <td className="py-3 text-center">{row.viewer ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-base text-[#17172A]">Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-[#17172A]">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#17172A] mb-1">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@devsparksindia.com"
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#17172A] mb-1">Assigned Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                >
                  <option value="Admin">Admin</option>
                  <option value="DevOps Lead">DevOps</option>
                  <option value="Developer">Developer</option>
                  <option value="Viewer">Viewer (Read-only)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#667085]"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className="px-5 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white rounded-xl text-xs font-bold"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
