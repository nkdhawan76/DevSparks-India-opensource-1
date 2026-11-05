"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { RefreshCw, CheckCircle2, AlertCircle } from "@/components/common/Icons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/app/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Authentication failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Signed in successfully. Redirecting to workspace...");
      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 400);
    } catch (_err) {
      setErrorMsg("Network error. Unable to connect to authentication gateway.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your DevSparks DeployCheck operations plane"
    >
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-semibold text-[#17172A]">Password</label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-semibold text-[#5938F5] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl pl-3.5 pr-12 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:bg-white transition-all shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-[#17172A] text-[11px] font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#5938F5] focus:ring-0 border-[#E5E7EB]"
            />
            <span className="text-[11px] text-[#667085] font-medium">Remember me for 30 days</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isLoading && <RefreshCw size={14} className="animate-spin" />}
          <span>{isLoading ? "Signing in..." : "Sign In to Workspace"}</span>
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#F1F4F9] text-center text-xs text-[#667085]">
        <span>Don&apos;t have an account? </span>
        <Link href="/signup" className="font-semibold text-[#5938F5] hover:underline">
          Create Developer Account
        </Link>
      </div>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center text-xs text-slate-400 font-mono">Loading sign in...</div>}>
      <LoginForm />
    </Suspense>
  );
}
