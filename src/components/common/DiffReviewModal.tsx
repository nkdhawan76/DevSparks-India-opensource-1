"use client";

import React from "react";
import { AlertTriangle, Check, X } from "./Icons";

interface DiffReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  approvalStatus: "pending" | "approved" | "rejected";
  title?: string;
  filePath?: string;
  beforeCode?: string;
  afterCode?: string;
  remediationAdvice?: string;
}

export function DiffReviewModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  approvalStatus,
  title = "Hardcoded Secret Remediation (AWS Access Key)",
  filePath = "src/config/aws.ts",
  beforeCode = `// Vulnerable Code: Hardcoded plaintext AWS credentials
export const awsConfig = {
  region: "ap-south-1",
  accessKeyId: "AKIA_EXPOSED_AWS_ACCESS_KEY_SAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
};`,
  afterCode = `// Hardened Code: Resolved via Environment Variables & AES-256 Secret Vault
export const awsConfig = {
  region: process.env.AWS_REGION || "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};`,
  remediationAdvice = "Replace hardcoded API credentials with environment variables loaded from the secure encrypted vault. Verify that credentials are not committed to Git.",
}: DiffReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5938F5] border border-purple-200">
                AI Patch Proposal
              </span>
              <span className="text-xs font-mono text-[#667085]">{filePath}</span>
            </div>
            <h3 className="text-base font-bold text-[#17172A]">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-[#17172A] hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Remediation Note */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Human Approval Policy Invariant:</span> {remediationAdvice}
            </div>
          </div>

          {/* Side by Side Diff Viewer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original / Before */}
            <div className="border border-rose-200 rounded-xl overflow-hidden bg-white">
              <div className="px-3 py-2 bg-rose-50 border-b border-rose-200 text-xs font-bold text-rose-800 flex items-center justify-between">
                <span>Current (Vulnerable)</span>
                <span className="text-[10px] uppercase font-mono">- Original</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-700 bg-rose-50/20 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {beforeCode}
              </pre>
            </div>

            {/* Proposed / After */}
            <div className="border border-emerald-200 rounded-xl overflow-hidden bg-white">
              <div className="px-3 py-2 bg-emerald-50 border-b border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-between">
                <span>Proposed Fix (Hardened)</span>
                <span className="text-[10px] uppercase font-mono">+ Proposed</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-700 bg-emerald-50/20 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {afterCode}
              </pre>
            </div>
          </div>

          {/* Test verification notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-[#E5E7EB] text-xs text-[#667085] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>Automated verification will run `scripts/verify-mvp.mjs` immediately after patch application.</span>
            </div>
            <span className="text-[11px] font-semibold text-[#17172A]">0 Breaking Changes</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E5E7EB] bg-slate-50 flex items-center justify-between">
          <div className="text-xs">
            {approvalStatus === "approved" && (
              <span className="inline-flex items-center gap-1.5 text-[#16A34A] font-bold">
                <Check size={14} /> Patch Approved & Staged for Deployment
              </span>
            )}
            {approvalStatus === "rejected" && (
              <span className="inline-flex items-center gap-1.5 text-[#DC2626] font-bold">
                <X size={14} /> Patch Rejected by Maintainer
              </span>
            )}
            {approvalStatus === "pending" && (
              <span className="text-[#667085]">Awaiting developer decision</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onReject}
              disabled={approvalStatus === "rejected"}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] bg-white text-[#DC2626] hover:bg-rose-50 text-xs font-bold transition-all disabled:opacity-50"
            >
              Reject Proposal
            </button>
            <button
              onClick={onApprove}
              disabled={approvalStatus === "approved"}
              className="px-5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            >
              Approve & Apply Patch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
