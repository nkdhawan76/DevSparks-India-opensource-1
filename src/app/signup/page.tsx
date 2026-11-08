"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import {
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  GitHubIcon,
  GoogleIcon,
} from "@/components/common/Icons";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Password strength calculations
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const strengthScore = [hasMinLength, hasUppercase, hasLowercase, hasNumberOrSymbol].filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (strengthScore < 3) {
      setErrorMsg("Please choose a stronger password (at least 8 chars, mixed case, and numbers/symbols).");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("You must agree to the Terms of Use and Privacy Policy to proceed.");
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
        setErrorMsg(data.error || "Failed to create developer account.");
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
    <AuthLayout mode="signup">
      {/* Form Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17172A]">
          Create an Account
        </h1>
        <p className="text-xs text-[#667085] mt-1.5">
          Get started with DevSparks DeployCheck
        </p>
      </div>

      {/* Alert Messages */}
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

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        {/* Full Name */}
        <div>
          <label className="block font-semibold text-[#17172A] mb-1">
            Full Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full bg-white border border-[#E5E7EB] hover:border-slate-300 focus:border-[#5938F5] focus:ring-2 focus:ring-[#5938F5]/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block font-semibold text-[#17172A] mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-white border border-[#E5E7EB] hover:border-slate-300 focus:border-[#5938F5] focus:ring-2 focus:ring-[#5938F5]/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none transition-colors shadow-2xs"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold text-[#17172A] mb-1">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full bg-white border border-[#E5E7EB] hover:border-slate-300 focus:border-[#5938F5] focus:ring-2 focus:ring-[#5938F5]/10 rounded-xl pl-10 pr-11 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none transition-colors shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-semibold text-[#17172A] mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full bg-white border border-[#E5E7EB] hover:border-slate-300 focus:border-[#5938F5] focus:ring-2 focus:ring-[#5938F5]/10 rounded-xl pl-10 pr-11 py-2.5 text-xs text-[#17172A] placeholder-slate-400 focus:outline-none transition-colors shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 rounded text-[#5938F5] focus:ring-0 border-[#E5E7EB] mt-0.5"
            />
            <span className="text-[11px] text-[#667085] leading-snug">
              I agree to the{" "}
              <span className="font-semibold text-[#5938F5] hover:underline cursor-pointer">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="font-semibold text-[#5938F5] hover:underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </span>
          </label>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold shadow-md shadow-[#5938F5]/20 hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-2"
        >
          {isLoading ? (
            <RefreshCw size={15} className="animate-spin" />
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Or Sign Up With Social SSO */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E5E7EB]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-[#667085] font-medium">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setName("Nikhil Dhawan");
            setEmail("nikhil@devsparksindia.com");
            setPassword("DevSparks@2026!");
            setConfirmPassword("DevSparks@2026!");
            setAcceptTerms(true);
          }}
          className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-[#E5E7EB] hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-[#17172A] transition-colors shadow-2xs"
        >
          <GitHubIcon size={16} className="text-[#17172A]" />
          <span>GitHub</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setName("Nikhil Dhawan");
            setEmail("admin.test@acs-solar.local");
            setPassword("ChangeMe_Admin_2026!");
            setConfirmPassword("ChangeMe_Admin_2026!");
            setAcceptTerms(true);
          }}
          className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-[#E5E7EB] hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-[#17172A] transition-colors shadow-2xs"
        >
          <GoogleIcon size={16} />
          <span>Google</span>
        </button>
      </div>

      {/* Bottom Footer Switcher */}
      <div className="mt-6 text-center text-xs text-[#667085]">
        <span>Already have an account? </span>
        <Link href="/login" className="font-bold text-[#5938F5] hover:underline">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
