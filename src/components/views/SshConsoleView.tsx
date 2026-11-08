"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";

export function SshConsoleView() {
  const [selectedServer, setSelectedServer] = useState("VPS-01 (194.195.112.44)");
  const [commandInput, setCommandInput] = useState("docker ps");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string; status: "success" | "blocked" }>>([
    {
      cmd: "uptime",
      output: "23:59:12 up 48 days, 14:12, 1 user, load average: 0.18, 0.22, 0.19",
      status: "success",
    },
    {
      cmd: "df -h /",
      output: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/vda1       120G   38G   78G  33% /",
      status: "success",
    },
  ]);

  const handleExecuteCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    // Check prohibited patterns (matches Policy Gateway invariant)
    const isProhibited =
      /\brm\s+(-[rfRF]+\s+)?(\/|\/\*|~\/|\*)(\s|$)/.test(cmd) ||
      /\bmkfs\b/.test(cmd) ||
      /\bdd\s+if=/.test(cmd) ||
      /:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/.test(cmd) ||
      /\bchmod\s+(-[rR]+\s+)?777\s+\//.test(cmd);

    if (isProhibited) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          cmd,
          output: `[POLICY GATEWAY VIOLATION] Command blocked by Security Policy (Rule Invariant: No destructive arbitrary shell operations). Audit incident logged.`,
          status: "blocked",
        },
      ]);
      setCommandInput("");
      return;
    }

    // Mock output for standard diagnostic commands
    let out = `Executed: ${cmd}\nExit Code: 0`;
    if (cmd.startsWith("docker ps")) {
      out = `CONTAINER ID   IMAGE                    COMMAND                  STATUS         PORTS\n4a8b7c9d0e1f   devsparks/deploycheck    "node server.js"         Up 3 hours     0.0.0.0:3000->3000/tcp\n2e3f4a5b6c7d   postgres:16-alpine       "docker-entrypoint.s…"   Up 48 days     127.0.0.1:5432->5432/tcp\n7f8a9b0c1d2e   nginx:alpine             "/docker-entrypoint.…"   Up 48 days     0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp`;
    } else if (cmd.startsWith("free")) {
      out = `               total        used        free      shared  buff/cache   available\nMem:         8192000     2140000     4500000       42000     1552000     5800000\nSwap:        2097152           0     2097152`;
    }

    setTerminalHistory((prev) => [...prev, { cmd, output: out, status: "success" }]);
    setCommandInput("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
              Policy-Controlled Web Terminal
            </span>
            <span className="text-xs text-[#667085]">Deterministic Secret Redaction</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            Policy-Guarded SSH Web Console
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Restricted diagnostic operations inside authorized target VPS nodes. Destructive commands are blocked automatically.
          </p>
        </div>

        {/* Server Target Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#667085]">Target:</span>
          <select
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
            className="bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#17172A] focus:outline-none focus:border-[#5938F5]"
          >
            <option>VPS-01 (194.195.112.44)</option>
            <option>VPS-02 (139.59.88.19)</option>
            <option>VPS-03 (159.89.172.91)</option>
          </select>
        </div>
      </div>

      {/* Allowlist Helper Pills */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#17172A]">Safe Allowlist Commands:</span>
          {["uptime", "df -h", "free -m", "docker ps", "systemctl status nginx"].map((c) => (
            <button
              key={c}
              onClick={() => setCommandInput(c)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-[#E5E7EB] font-mono text-[11px] text-[#5938F5]"
            >
              {c}
            </button>
          ))}
        </div>
        <StatusBadge label="Allowlist Gating Active" variant="success" />
      </div>

      {/* Terminal View */}
      <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden bg-slate-950 text-slate-100 shadow-xl flex flex-col h-[520px]">
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 font-mono text-slate-300">deploycheck@{selectedServer.split(" ")[0].toLowerCase()}</span>
          </div>
          <span className="text-[10px] font-mono">SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6</span>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-4">
          <div className="text-slate-500 text-[11px]">
            Welcome to DeployCheck Policy-Controlled Terminal.<br />
            Invariant: Destructive commands (rm -rf, format, raw disk overwrite) are blocked server-side.<br />
            --------------------------------------------------------------------------------
          </div>

          {terminalHistory.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-purple-400">
                <span>❯</span>
                <span className="text-slate-100 font-bold">{item.cmd}</span>
              </div>
              <pre
                className={`p-3 rounded-lg text-[11px] whitespace-pre-wrap leading-relaxed ${
                  item.status === "blocked"
                    ? "bg-rose-950/40 text-rose-300 border border-rose-800"
                    : "bg-slate-900 text-slate-300 border border-slate-800/60"
                }`}
              >
                {item.output}
              </pre>
            </div>
          ))}
        </div>

        {/* Command Input Prompt Form */}
        <form onSubmit={handleExecuteCommand} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
          <span className="text-purple-400 font-mono text-sm pl-2">❯</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type command (e.g. docker ps, uptime, free -m)..."
            className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl transition-colors"
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
}
