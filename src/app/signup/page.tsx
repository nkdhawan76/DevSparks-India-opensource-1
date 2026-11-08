"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { calculatePasswordStrength, validateSignupInput, getTestCredentials } from "@/lib/auth-logic.js";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function SignupPage() {
  const router = useRouter();

  const formScopeRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const strengthBarRef = useRef<HTMLDivElement>(null);

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

  // Password strength calculations from .js logic
  const { score: strengthScore, color: strengthColor, percentage: strengthPercentage } = calculatePasswordStrength(password);

  // GSAP Entrance Animations
  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".signup-header", {
        y: 8,
        opacity: 0,
        duration: 0.3,
      });

      tl.from(
        ".signup-input-row",
        {
          y: 8,
          opacity: 0,
          duration: 0.25,
          stagger: 0.03,
        },
        "-=0.15"
      );

      tl.from(
        ".signup-sso-section",
        {
          y: 6,
          opacity: 0,
          duration: 0.25,
        },
        "-=0.1"
      );
    },
    { scope: formScopeRef }
  );

  // GSAP Animation when strengthScore changes
  useEffect(() => {
    if (strengthBarRef.current) {
      gsap.to(strengthBarRef.current, {
        width: password.length === 0 ? "0%" : `${strengthPercentage}%`,
        backgroundColor: strengthColor,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [password, strengthPercentage, strengthColor]);

  // GSAP Animation when errorMsg changes
  useEffect(() => {
    if (errorMsg && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { y: -4, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
      );
    }
  }, [errorMsg]);

  // GSAP Animation when successMsg changes
  useEffect(() => {
    if (successMsg && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { y: -4, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [successMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = validateSignupInput({ name, email, password, confirmPassword, acceptTerms });
    if (!validation.valid) {
      setErrorMsg(validation.error || "Please check your inputs.");
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

  const handleTestSSOFill = (type: "github" | "google") => {
    const creds = getTestCredentials(type === "github" ? "super" : "admin");
    setName(creds.name || "");
    setEmail(creds.email);
    setPassword(creds.password);
    setConfirmPassword(creds.password);
    setAcceptTerms(true);

    if (formScopeRef.current) {
      gsap.fromTo(
        formScopeRef.current.querySelectorAll(".shadcn-auth-input"),
        { borderColor: "#5938F5", backgroundColor: "rgba(89, 56, 245, 0.05)" },
        { borderColor: "#E5E7EB", backgroundColor: "#ffffff", duration: 0.45, ease: "power2.out" }
      );
    }
  };

  return (
    <AuthLayout mode="signup">
      <div ref={formScopeRef}>
        {/* Form Header */}
        <div className="signup-header mb-3">
          <h1 className="text-xl font-bold tracking-tight text-[#17172A]">
            Create an Account
          </h1>
          <p className="text-[10.5px] text-[#667085] mt-0.5">
            Get started with DeployCheck developer workspace
          </p>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div
            ref={errorRef}
            className="mb-2.5 p-2 rounded-[8px] bg-rose-50 border border-rose-200 text-[11px] text-[#DC2626] flex items-center gap-1.5 will-change-transform"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div
            ref={successRef}
            className="mb-2.5 p-2 rounded-[8px] bg-emerald-50 border border-emerald-200 text-[11px] text-[#16A34A] flex items-center gap-1.5 will-change-transform"
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Signup Form (Refined Spacing & Alignment) */}
        <form onSubmit={handleSubmit} className="space-y-2 text-xs">
          {/* Full Name */}
          <div className="signup-input-row space-y-1">
            <Label htmlFor="fullname" className="text-xs font-medium text-[#17172A]">Full Name</Label>
            <div className="relative flex items-center">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <Input
                id="fullname"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="shadcn-auth-input pl-9 h-9 text-xs rounded-[8px] border-[#E5E7EB] bg-white focus-visible:border-[#5938F5] focus-visible:ring-1 focus-visible:ring-[#5938F5]/20 shadow-2xs"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="signup-input-row space-y-1">
            <Label htmlFor="email" className="text-xs font-medium text-[#17172A]">Work Email Address</Label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <Input
                id="email"
                type="email"
                placeholder="developer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="shadcn-auth-input pl-9 h-9 text-xs rounded-[8px] border-[#E5E7EB] bg-white focus-visible:border-[#5938F5] focus-visible:ring-1 focus-visible:ring-[#5938F5]/20 shadow-2xs"
              />
            </div>
          </div>

          {/* Password */}
          <div className="signup-input-row space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium text-[#17172A]">Password</Label>
              {password.length > 0 && (
                <Badge
                  variant={strengthScore >= 3 ? "success" : strengthScore === 2 ? "warning" : "destructive"}
                  className="text-[9px] py-0 px-1.5 h-3.5 rounded-[4px]"
                >
                  {strengthScore >= 4 ? "Strong" : strengthScore === 3 ? "Medium" : "Weak"}
                </Badge>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="shadcn-auth-input pl-9 pr-9 h-9 text-xs rounded-[8px] border-[#E5E7EB] bg-white focus-visible:border-[#5938F5] focus-visible:ring-1 focus-visible:ring-[#5938F5]/20 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* GSAP Password Strength Bar */}
            {password.length > 0 && (
              <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden mt-0.5">
                <div
                  ref={strengthBarRef}
                  className="h-full rounded-full transition-all will-change-[width,background-color]"
                  style={{ width: "0%", backgroundColor: "#EF4444" }}
                />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="signup-input-row space-y-1">
            <Label htmlFor="confirmPassword" className="text-xs font-medium text-[#17172A]">Confirm Password</Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="shadcn-auth-input pl-9 pr-9 h-9 text-xs rounded-[8px] border-[#E5E7EB] bg-white focus-visible:border-[#5938F5] focus-visible:ring-1 focus-visible:ring-[#5938F5]/20 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="signup-terms-row flex items-start space-x-2 pt-0.5">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(!!checked)}
              className="mt-0.5 rounded-[4px]"
            />
            <Label htmlFor="terms" className="text-[10.5px] text-[#667085] leading-tight cursor-pointer font-normal">
              I agree to the{" "}
              <Link href="/docs/terms" className="font-semibold text-[#5938F5] hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/docs/security" className="font-semibold text-[#5938F5] hover:underline">
                Privacy Policy
              </Link>
              .
            </Label>
          </div>

          {/* Submit Button with Outer Double-Line Ring */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-[8px] bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold gap-2 mt-2 shadow-xs ring-2 ring-[#5938F5]/20 ring-offset-1 ring-offset-white active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <span>Create Developer Account</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </form>

        {/* Or Sign Up With Social SSO */}
        <div className="signup-sso-section">
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-[10.5px]">
              <span className="bg-white px-2.5 text-slate-400 font-medium">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleTestSSOFill("github")}
              className="h-9 text-xs font-semibold gap-2 rounded-[8px] border-[#E5E7EB] hover:bg-slate-50 hover:border-slate-300 shadow-2xs"
            >
              <GitHubIcon size={14} className="text-[#17172A]" />
              <span>GitHub</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleTestSSOFill("google")}
              className="h-9 text-xs font-semibold gap-2 rounded-[8px] border-[#E5E7EB] hover:bg-slate-50 hover:border-slate-300 shadow-2xs"
            >
              <GoogleIcon size={14} />
              <span>Google</span>
            </Button>
          </div>
        </div>

        {/* Bottom Switcher */}
        <div className="signup-footer-row mt-3 text-center text-xs text-[#667085]">
          <span>Already have an account?</span>
          <Link href="/login" className="font-bold text-[#5938F5] hover:underline ml-1">
            Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
