"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { RefreshCw, CheckCircle2, AlertCircle } from "@/components/common/Icons";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Password strength calculations
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasNumberOrSymbol].filter(Boolean).length;

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-rose-400", "bg-rose-400", "bg-amber-400", "bg-blue-400", "bg-emerald-500"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (strengthScore < 3) {
      setErrorMsg("Please choose a stronger password matching the criteria below.");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("You must accept the Terms of Service to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, acceptTerms }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Registration failed.");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Account created successfully. Preparing your workspace...");
      setTimeout(() => {
        router.push("/app/dashboard");
        router.refresh();
      }, 500);
    } catch (_err) {
      setErrorMsg("Network error. Unable to connect to registration service.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register a developer workspace on DevSparks DeployCheck"
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

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div>
          <label className="block font-semibold text-[#17172A] mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Nikhil Dhawan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <div>
          <label className="block font-semibold text-[#17172A] mb-1">Work Email Address</label>
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
          <label className="block font-semibold text-[#17172A] mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
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

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#667085]">Password strength:</span>
                <span className="font-semibold text-[#17172A]">{strengthLabels[strengthScore]}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full flex-1 rounded-full transition-all ${
                      strengthScore >= step ? strengthColors[strengthScore] : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold text-[#17172A] mb-1">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none focus:border-[#5938F5] focus:bg-white transition-all shadow-2xs"
          />
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 rounded text-[#5938F5] focus:ring-0 border-[#E5E7EB] mt-0.5"
            />
            <span className="text-[11px] text-[#667085] leading-snug">
              I accept the{" "}
              <span className="font-semibold text-[#17172A] hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and acknowledge the{" "}
              <span className="font-semibold text-[#17172A] hover:underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 mt-3"
        >
          {isLoading && <RefreshCw size={14} className="animate-spin" />}
          <span>{isLoading ? "Creating Account..." : "Create Developer Account"}</span>
        </button>
      </form>

      <div className="mt-5 pt-4 border-t border-[#F1F4F9] text-center text-xs text-[#667085]">
        <span>Already have an account? </span>
        <Link href="/login" className="font-semibold text-[#5938F5] hover:underline">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
