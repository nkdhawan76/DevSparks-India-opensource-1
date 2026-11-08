"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  ArrowRight,
  Eye,
  EyeOff,
  Zap,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { GitHubIcon, GoogleIcon } from "@/components/common/Icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/app/dashboard";

  const formScopeRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTestFill, setActiveTestFill] = useState<string | null>(null);

  // GSAP Entrance Animations
  useGSAP(
    () => {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".login-header", {
        y: 10,
        opacity: 0,
        duration: 0.35,
      });

      tl.from(
        ".test-accounts-box",
        {
          y: 8,
          opacity: 0,
          scale: 0.98,
          duration: 0.3,
        },
        "-=0.15"
      );

      tl.from(
        ".login-input-row",
        {
          y: 10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
        },
        "-=0.15"
      );

      tl.from(
        ".login-submit-btn",
        {
          scale: 0.98,
          opacity: 0,
          duration: 0.3,
        },
        "-=0.1"
      );

      tl.from(
        ".login-sso-section",
        {
          y: 8,
          opacity: 0,
          duration: 0.3,
        },
        "-=0.1"
      );

      tl.from(
        ".login-footer-row",
        {
          opacity: 0,
          duration: 0.25,
        },
        "-=0.1"
      );
    },
    { scope: formScopeRef }
  );

  // GSAP Animation when errorMsg changes
  useEffect(() => {
    if (errorMsg && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { y: -6, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" }
      );
    }
  }, [errorMsg]);

  // GSAP Animation when successMsg changes
  useEffect(() => {
    if (successMsg && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { y: -6, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [successMsg]);

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

    if (formScopeRef.current) {
      gsap.fromTo(
        formScopeRef.current.querySelectorAll(".shadcn-auth-input"),
        { borderColor: "#5938F5", backgroundColor: "rgba(89, 56, 245, 0.05)" },
        { borderColor: "#E5E7EB", backgroundColor: "#ffffff", duration: 0.45, ease: "power2.out" }
      );
    }
  };

  return (
    <AuthLayout mode="login">
      <div ref={formScopeRef}>
        {/* Form Header */}
        <div className="login-header mb-3.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17172A]">
            Welcome Back
          </h1>
          <p className="text-[11px] text-[#667085] mt-0.5">
            Sign in to your DevSparks DeployCheck account
          </p>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div
            ref={errorRef}
            className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-[#DC2626] flex items-center gap-2 will-change-transform"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div
            ref={successRef}
            className="mb-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-[#16A34A] flex items-center gap-2 will-change-transform"
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1-Click Developer Test Account Switcher (Compact) */}
        <div className="test-accounts-box mb-3.5 p-1.5 rounded-lg bg-slate-50 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Zap className="h-2.5 w-2.5 text-[#5938F5]" />
              <span>Test Accounts</span>
            </span>
            <Badge variant="secondary" className="text-[9px] py-0 px-1 font-mono h-3.5">
              1-click
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <Button
              type="button"
              variant={activeTestFill === "super" ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickFill("super")}
              className={`h-auto p-1.5 justify-start flex-col items-start text-left rounded-md ${
                activeTestFill === "super"
                  ? "bg-purple-50 text-[#5938F5] border-[#5938F5] hover:bg-purple-100"
                  : "bg-white hover:bg-slate-50 text-[#17172A]"
              }`}
            >
              <span className="font-bold text-[10px] truncate w-full">Super Admin</span>
              <span className="text-[9px] text-slate-400 font-mono font-normal truncate w-full">
                nikhil@devsparks...
              </span>
            </Button>

            <Button
              type="button"
              variant={activeTestFill === "admin" ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickFill("admin")}
              className={`h-auto p-1.5 justify-start flex-col items-start text-left rounded-md ${
                activeTestFill === "admin"
                  ? "bg-purple-50 text-[#5938F5] border-[#5938F5] hover:bg-purple-100"
                  : "bg-white hover:bg-slate-50 text-[#17172A]"
              }`}
            >
              <span className="font-bold text-[10px] truncate w-full">Workspace Admin</span>
              <span className="text-[9px] text-slate-400 font-mono font-normal truncate w-full">
                admin.test@acs...
              </span>
            </Button>
          </div>
        </div>

        {/* Main Login Form with shadcn components */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email Address */}
          <div className="login-input-row space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setActiveTestFill(null);
                }}
                required
                autoComplete="email"
                className="shadcn-auth-input pl-8.5 h-9"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-input-row space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-semibold text-[#5938F5] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setActiveTestFill(null);
                }}
                required
                autoComplete="current-password"
                className="shadcn-auth-input pl-8.5 pr-8.5 h-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="login-input-row flex items-center space-x-2 pt-0.5">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label htmlFor="remember" className="font-normal text-[#667085] cursor-pointer text-[11px]">
              Remember me
            </Label>
          </div>

          {/* Primary Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="login-submit-btn w-full h-9 text-xs font-semibold gap-1.5 mt-1 shadow-xs"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </form>

        {/* Or Continue With Social SSO */}
        <div className="login-sso-section">
          <div className="relative my-3.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="bg-white px-2.5 text-[#667085] font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail("nikhil@devsparksindia.com");
                setPassword("DevSparks@2026!");
              }}
              className="gap-2 h-8.5 border-[#E5E7EB] hover:bg-slate-50 text-xs"
            >
              <GitHubIcon size={14} />
              <span>GitHub</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail("admin.test@acs-solar.local");
                setPassword("ChangeMe_Admin_2026!");
              }}
              className="gap-2 h-8.5 border-[#E5E7EB] hover:bg-slate-50 text-xs"
            >
              <GoogleIcon size={14} />
              <span>Google</span>
            </Button>
          </div>
        </div>

        {/* Bottom Footer Switcher */}
        <div className="login-footer-row mt-4 text-center text-[11px] text-[#667085]">
          <span>Don&apos;t have an account? </span>
          <Link href="/signup" className="font-semibold text-[#5938F5] hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center text-xs text-slate-400 font-mono">
          Loading sign in...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
