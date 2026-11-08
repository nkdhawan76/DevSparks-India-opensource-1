"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { RefreshCw, CheckCircle2, AlertCircle, Lock } from "@/components/common/Icons";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!token) {
      setErrorMsg("Missing or invalid password reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Password reset failed.");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Password successfully reset! Redirecting to sign in...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (_err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout mode="recovery">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 sm:p-9 shadow-xl shadow-slate-200/50 relative">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#5938F5] text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-[#5938F5]/25">
            <Lock size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">
            Create New Password
          </h1>
          <p className="text-xs text-[#667085] mt-1.5">
            Enter a strong new password for your account
          </p>
        </div>

        {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-[#DC2626] flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#16A34A] flex items-center gap-2">
          <CheckCircle2 size={15} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-[#17172A] mb-1.5">New Password</label>
          <input
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <div>
          <label className="block font-semibold text-[#17172A] mb-1.5">Confirm New Password</label>
          <input
            type="password"
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isLoading && <RefreshCw size={14} className="animate-spin" />}
          <span>{isLoading ? "Updating..." : "Update Password"}</span>
        </button>
      </form>

        <div className="mt-6 pt-5 border-t border-[#F1F4F9] text-center text-xs text-[#667085]">
          <Link href="/login" className="font-semibold text-[#5938F5] hover:underline">
            Return to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center text-xs text-slate-400 font-mono">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
