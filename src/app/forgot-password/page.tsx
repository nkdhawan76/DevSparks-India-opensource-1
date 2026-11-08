"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { RefreshCw, CheckCircle2, AlertCircle } from "@/components/common/Icons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setErrorMsg("Failed to request password reset. Please try again.");
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (_err) {
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout mode="recovery">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17172A]">
          Reset Password
        </h1>
        <p className="text-xs text-[#667085] mt-1.5">
          Enter your work email to receive recovery instructions
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-[#DC2626] flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {submitted ? (
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 size={18} />
              <span>Recovery Link Dispatched</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#17172A]">
              If an account with <strong>{email}</strong> exists in our system, an encrypted password reset link has been dispatched.
            </p>
          </div>

          <Link
            href="/login"
            className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center text-center"
          >
            Return to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#17172A] mb-1.5">Work Email Address</label>
            <input
              type="email"
              placeholder="developer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:bg-white transition-all shadow-2xs"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading && <RefreshCw size={14} className="animate-spin" />}
            <span>{isLoading ? "Sending..." : "Send Password Reset Link"}</span>
          </button>
        </form>
      )}

      <div className="mt-6 pt-5 border-t border-[#F1F4F9] text-center text-xs text-[#667085]">
        <span>Remember your password? </span>
        <Link href="/login" className="font-semibold text-[#5938F5] hover:underline">
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}

