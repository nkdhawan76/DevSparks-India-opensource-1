"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { GitHubIcon, GoogleIcon } from "@/components/common/Icons";

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
          Get started with DevSparks DeployCheck developer workspace
        </p>
      </div>

      {/* Alert Messages */}
      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-[#DC2626] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#16A34A] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Signup Form with shadcn UI Primitives */}
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullname">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="pl-10"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Work Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="developer@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="pl-10"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {password.length > 0 && (
              <Badge
                variant={strengthScore >= 3 ? "success" : strengthScore === 2 ? "warning" : "destructive"}
                className="text-[10px] py-0 px-1.5 h-4"
              >
                {strengthScore >= 4 ? "Strong" : strengthScore === 3 ? "Medium" : "Weak"}
              </Badge>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="pl-10 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="pl-10 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="flex items-start space-x-2 pt-1">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(!!checked)}
            className="mt-0.5"
          />
          <Label htmlFor="terms" className="text-[11px] text-[#667085] leading-snug cursor-pointer font-normal">
            I agree to the{" "}
            <Link href="/docs/terms" className="font-semibold text-[#5938F5] hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/docs/security" className="font-semibold text-[#5938F5] hover:underline">
              Privacy Policy
            </Link>
            .
          </Label>
        </div>

        {/* Primary Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-xs font-bold gap-2 mt-2 shadow-md shadow-[#5938F5]/20"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
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
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setName("Nikhil Dhawan");
            setEmail("nikhil@devsparksindia.com");
            setPassword("DevSparks@2026!");
            setConfirmPassword("DevSparks@2026!");
            setAcceptTerms(true);
          }}
          className="h-10 text-xs font-semibold gap-2 border-[#E5E7EB] hover:bg-slate-50"
        >
          <GitHubIcon size={16} className="text-[#17172A]" />
          <span>GitHub</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setName("Nikhil Dhawan");
            setEmail("admin.test@acs-solar.local");
            setPassword("ChangeMe_Admin_2026!");
            setConfirmPassword("ChangeMe_Admin_2026!");
            setAcceptTerms(true);
          }}
          className="h-10 text-xs font-semibold gap-2 border-[#E5E7EB] hover:bg-slate-50"
        >
          <GoogleIcon size={16} />
          <span>Google</span>
        </Button>
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
