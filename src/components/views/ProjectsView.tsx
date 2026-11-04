"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";

interface Project {
  id: string;
  name: string;
  domain: string;
  framework: string;
  repo: string;
  branch: string;
  score: number;
  status: "Healthy" | "Attention" | "Building";
  lastAudit: string;
}

export function ProjectsView() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectRepo, setNewProjectRepo] = useState("");
  const [newProjectBranch, setNewProjectBranch] = useState("main");

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      name: "The Fein India",
      domain: "thefein.in",
      framework: "Next.js 14",
      repo: "nkdhawan76/thefein-prod",
      branch: "main",
      score: 100,
      status: "Healthy",
      lastAudit: "Today, 11:42 AM",
    },
    {
      id: "proj-2",
      name: "Kreeda Portal",
      domain: "kreedaportal.com",
      framework: "Laravel 11",
      repo: "nkdhawan76/kreeda-portal",
      branch: "main",
      score: 92,
      status: "Attention",
      lastAudit: "Today, 10:18 AM",
    },
    {
      id: "proj-3",
      name: "Silver Era Heritage",
      domain: "silvereraheritage.com",
      framework: "Next.js 14",
      repo: "nkdhawan76/silverera-heritage",
      branch: "main",
      score: 88,
      status: "Attention",
      lastAudit: "Yesterday, 08:47 PM",
    },
    {
      id: "proj-4",
      name: "Compikart Store",
      domain: "compikart.opm",
      framework: "Node.js Express",
      repo: "nkdhawan76/compikart-backend",
      branch: "production",
      score: 100,
      status: "Healthy",
      lastAudit: "Yesterday, 05:22 PM",
    },
    {
      id: "proj-5",
      name: "DevSparks India",
      domain: "devsparksindia.com",
      framework: "Next.js 14",
      repo: "nkdhawan76/devsparks-website",
      branch: "main",
      score: 96,
      status: "Healthy",
      lastAudit: "Yesterday, 02:11 PM",
    },
  ]);

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.domain.toLowerCase().includes(search.toLowerCase()) ||
      p.framework.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: newProjectName,
      domain: `${newProjectName.toLowerCase().replace(/\s+/g, "")}.com`,
      framework: "Next.js 14 (Auto-detected)",
      repo: newProjectRepo || `nkdhawan76/${newProjectName.toLowerCase().replace(/\s+/g, "-")}`,
      branch: newProjectBranch,
      score: 100,
      status: "Healthy",
      lastAudit: "Just now",
    };
    setProjects([newProj, ...projects]);
    setNewProjectName("");
    setNewProjectRepo("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">Project Workspace</h1>
          <p className="text-xs text-[#667085] mt-1">
            Connect repositories, manage branch environments, and verify pre-deployment status.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>＋</span>
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter projects by name, domain, or framework..."
            className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl pl-8 pr-4 py-1.5 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
          />
        </div>
        <div className="text-xs text-[#667085]">
          Showing <strong>{filteredProjects.length}</strong> of {projects.length} connected applications
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-extrabold text-base text-[#17172A]">{p.name}</h3>
                  <a
                    href={`https://${p.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-[#5938F5] hover:underline"
                  >
                    {p.domain} ↗
                  </a>
                </div>
                <StatusBadge
                  label={p.status}
                  variant={p.status === "Healthy" ? "success" : "warning"}
                />
              </div>

              <div className="space-y-2 py-3 border-y border-[#F1F4F9] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Framework:</span>
                  <span className="font-semibold text-[#17172A] px-2 py-0.5 rounded bg-slate-50 border border-[#E5E7EB]">
                    {p.framework}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Repository:</span>
                  <span className="font-mono text-[11px] text-[#17172A] truncate max-w-[180px]">
                    {p.repo}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667085]">Tracking Branch:</span>
                  <span className="font-mono text-[11px] text-[#5938F5] bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                    {p.branch}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] text-[#667085] uppercase">Readiness Score</div>
                <div className="text-base font-extrabold text-[#16A34A]">{p.score}/100</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Running pre-deployment audit for ${p.name}...`)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] text-[#17172A] font-semibold rounded-lg text-xs transition-colors"
                >
                  Audit
                </button>
                <button
                  onClick={() => alert(`Navigating to deployment pipeline for ${p.name}...`)}
                  className="px-3 py-1.5 bg-[#5938F5] hover:bg-[#4726DB] text-white font-semibold rounded-lg text-xs transition-colors"
                >
                  Deploy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="font-bold text-base text-[#17172A]">Connect New Project</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#17172A]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#17172A] mb-1">Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. My Next.js SaaS App"
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17172A] mb-1">GitHub / Git Repository</label>
                <input
                  type="text"
                  value={newProjectRepo}
                  onChange={(e) => setNewProjectRepo(e.target.value)}
                  placeholder="e.g. nkdhawan76/my-app"
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17172A] mb-1">Deploy Branch</label>
                <select
                  value={newProjectBranch}
                  onChange={(e) => setNewProjectBranch(e.target.value)}
                  className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
                >
                  <option value="main">main (Production)</option>
                  <option value="staging">staging (Pre-release)</option>
                  <option value="develop">develop (Active development)</option>
                </select>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-[11px]">
                ⚡ <strong>Stack Auto-Detection:</strong> DeployCheck will inspect package.json, Dockerfile, and .env.example upon connection to initialize rule scanning.
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
                onClick={handleCreateProject}
                className="px-5 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white rounded-xl text-xs font-bold"
              >
                Initialize & Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
