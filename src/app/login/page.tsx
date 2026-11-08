"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "@/components/common/Icons";

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
  const [activeTestFill, setActiveTestFill] = useState<string | null>(null);

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

  const handleQuickFill = (accType: "super" | "admin") => {
    setActiveTestFill(accType);
    if (accType === "super") {
      setEmail("nikhil@devsparksindia.com");
      setPassword("DevSparks@2026!");
    } else {
      setEmail("admin.test@acs-solar.local");
      setPassword("ChangeMe_Admin_2026!");
    }
  };

  return (
    <AuthLayout mode="login">
      {/* Centered Elevated Studio Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 sm:p-9 shadow-xl shadow-slate-200/50 relative">
        {/* Brand Header Inside Card */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#5938F5] text-white flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-[#5938F5]/25">
            <Zap size={24} className="fill-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">
            Sign In to DeployCheck
          </h1>
          <p className="text-xs text-[#667085] mt-1.5">
            Enter your credentials to access your developer workspace
          </p>
        </div>

        {/* Alert Feedback Messages */}
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

        {/* 1-Click Developer Test Account Switcher */}
        <div className="mb-5 p-2.5 rounded-xl bg-slate-50 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Zap size={11} className="text-[#5938F5]" />
              <span>Quick Test Fill</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">1-click fill</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill("super")}
              className={`p-2 rounded-lg text-left transition-colors border text-xs flex flex-col justify-between ${
                activeTestFill === "super"
                  ? "bg-purple-50/80 border-[#5938F5] text-[#5938F5]"
                  : "bg-white border-[#E5E7EB] hover:border-slate-300 text-[#17172A]"
              }`}
            >
              <div className="font-bold text-[11px] truncate">Super Admin</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">nikhil@devsparks...</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill("admin")}
              className={`p-2 rounded-lg text-left transition-colors border text-xs flex flex-col justify-between ${
                activeTestFill === "admin"
                  ? "bg-purple-50/80 border-[#5938F5] text-[#5938F5]"
                  : "bg-white border-[#E5E7EB] hover:border-slate-300 text-[#17172A]"
              }`}
            >
              <div className="font-bold text-[11px] truncate">Workspace Admin</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">admin.test@acs...</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Work Email Address */}
          <div>
            <label className="block font-semibold text-[#17172A] mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                placeholder="developer@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setActiveTestFill(null);
                }}
                required
                autoComplete="email"
                className="w-full bg-white border border-[#D0D5DD] hover:border-slate-400 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:ring-2 focus:ring-[#5938F5]/10 transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Password */}
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
              <Lock size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setActiveTestFill(null);
                }}
                required
                autoComplete="current-password"
                className="w-full bg-white border border-[#D0D5DD] hover:border-slate-400 rounded-xl pl-10 pr-14 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:ring-2 focus:ring-[#5938F5]/10 transition-colors shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-[#17172A] text-[11px] font-semibold px-1 py-0.5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#5938F5] focus:ring-0 border-[#D0D5DD]"
              />
              <span className="text-[11px] text-[#667085] font-medium">Remember me for 30 days</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs hover:shadow transition-colors active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <ArrowRight size={14} />
            )}
            <span>{isLoading ? "Signing in..." : "Sign In to Workspace"}</span>
          </button>
        </form>

        {/* Card Footer */}
        <div className="mt-6 pt-5 border-t border-[#F1F4F9] text-center text-xs text-[#667085]">
          <span>Don&apos;t have an account? </span>
          <Link href="/signup" className="font-semibold text-[#5938F5] hover:underline">
            Create Developer Account
          </Link>
        </div>

        {/* Security Invariant Micro-Badge */}
        <div className="mt-4 pt-3 border-t border-[#F8FAFC] flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck size={12} className="text-emerald-600" />
          <span>256-bit TLS encrypted session · Policy enforced</span>
        </div>
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
