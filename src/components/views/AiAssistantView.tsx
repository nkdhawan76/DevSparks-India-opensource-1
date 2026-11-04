"use client";

import React, { useState } from "react";
import { StatusBadge } from "../common/StatusBadge";

interface AiAssistantViewProps {
  onOpenDiffModal: () => void;
  streamedText: string;
  isStreaming: boolean;
  onStreamPrompt: () => void;
}

export function AiAssistantView({
  onOpenDiffModal,
  streamedText,
  isStreaming,
  onStreamPrompt,
}: AiAssistantViewProps) {
  const [selectedModel, setSelectedModel] = useState("anthropic/claude-3.5-sonnet");
  const [promptInput, setPromptInput] = useState(
    "Explain how to remediate the exposed AWS credentials in src/config/aws.ts using environment variables and generate a minimal diff proposal."
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
              BYOK • Bring Your Own Key Architecture
            </span>
            <span className="text-xs text-[#667085]">AES-256-GCM Encrypted</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#17172A]">
            AI Coding Assistant & Patch Review
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Policy-controlled assistant: AI models propose structured diffs only; maintainers approve via visual review modal.
          </p>
        </div>

        <button
          onClick={onOpenDiffModal}
          className="px-5 py-2.5 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <span>⚖️</span>
          <span>Open Visual Diff Modal</span>
        </button>
      </div>

      {/* Model & BYOK Provider Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#667085]">Connected Provider</div>
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm text-[#17172A]">OpenRouter Gateway</div>
            <StatusBadge label="BYOK Active" variant="success" />
          </div>
          <div className="text-xs font-mono text-slate-400">Key: sk-or-••••••••98b2</div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#667085]">Selected Model</div>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#17172A] focus:outline-none focus:border-[#5938F5]"
          >
            <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet (Recommended)</option>
            <option value="openai/gpt-4o">OpenAI GPT-4o</option>
            <option value="meta-llama/llama-3.1-70b-instruct">Meta Llama 3.1 70B</option>
            <option value="google/gemini-pro-1.5">Google Gemini Pro 1.5</option>
          </select>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-bold text-[#667085]">Policy Boundary</div>
          <div className="text-xs font-bold text-[#16A34A]">Restricted Runner Invariant</div>
          <div className="text-[11px] text-[#667085]">Direct shell execution disabled. Diff output only.</div>
        </div>
      </div>

      {/* Interactive Streaming Prompt Console */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#17172A] mb-1.5">
            Prompt / Finding Context
          </label>
          <div className="flex gap-3">
            <textarea
              rows={2}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="flex-1 bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl p-3 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5] leading-relaxed"
            />
            <button
              onClick={onStreamPrompt}
              disabled={isStreaming}
              className="px-5 py-2 bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-50 shrink-0"
            >
              <span className={`text-base ${isStreaming ? "animate-spin" : ""}`}>⚡</span>
              <span>{isStreaming ? "Streaming..." : "Send Request"}</span>
            </button>
          </div>
        </div>

        {/* Live SSE Token Stream Box */}
        <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden bg-slate-900 text-slate-100">
          <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isStreaming ? "bg-[#5938F5] animate-ping" : "bg-emerald-400"}`} />
              <span className="font-mono text-[11px]">Real-Time Server-Sent Events (SSE) Reader</span>
            </div>
            <span className="text-[10px] text-slate-400">Content-Type: text/event-stream</span>
          </div>

          <div className="p-4 font-mono text-xs overflow-y-auto max-h-72 whitespace-pre-wrap leading-relaxed text-slate-200">
            {streamedText || (
              <span className="text-slate-500 italic">
                {isStreaming
                  ? "Streaming tokens from /api/v1/ai/explain..."
                  : "Click 'Send Request' to trigger live SSE token streaming or 'Open Visual Diff Modal' to inspect proposed code patches."}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
