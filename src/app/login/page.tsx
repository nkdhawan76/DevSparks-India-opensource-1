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
        y: 12,
        opacity: 0,
        duration: 0.4,
      });

      tl.from(
        ".test-accounts-box",
        {
          y: 10,
          opacity: 0,
          scale: 0.98,
          duration: 0.35,
        },
        "-=0.2"
      );

      tl.from(
        ".login-input-row",
        {
          y: 12,
          opacity: 0,
          duration: 0.35,
          stagger: 0.06,
        },
        "-=0.15"
      );

      tl.from(
        ".login-submit-btn",
        {
          scale: 0.97,
          opacity: 0,
          duration: 0.35,
        },
        "-=0.1"
      );

      tl.from(
        ".login-sso-section",
        {
          y: 10,
          opacity: 0,
          duration: 0.35,
        },
        "-=0.15"
      );

      tl.from(
        ".login-footer-row",
        {
          opacity: 0,
          duration: 0.3,
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

    // GSAP micro-pulse feedback on the inputs
    if (formScopeRef.current) {
      gsap.fromTo(
        formScopeRef.current.querySelectorAll(".shadcn-auth-input"),
        { borderColor: "#5938F5", backgroundColor: "rgba(89, 56, 245, 0.05)" },
        { borderColor: "#E5E7EB", backgroundColor: "#ffffff", duration: 0.5, ease: "power2.out" }
      );
    }
  };

  return (
    <AuthLayout mode="login">
      <div ref={formScopeRef}>
        {/* Form Header */}
        <div className="login-header mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17172A]">
            Welcome Back
          </h1>
          <p className="text-xs text-[#667085] mt-1.5">
            Sign in to your DevSparks DeployCheck account
          </p>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div
            ref={errorRef}
            className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-[#DC2626] flex items-center gap-2 will-change-transform"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div
            ref={successRef}
            className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#16A34A] flex items-center gap-2 will-change-transform"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1-Click Developer Test Account Switcher (shadcn style) */}
        <div className="test-accounts-box mb-5 p-2 rounded-xl bg-slate-50 border border-[#E5E7EB] shadow-2xs">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Zap className="h-3 w-3 text-[#5938F5]" />
              <span>Developer Test Accounts</span>
            </span>
            <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-mono">
              1-click fill
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={activeTestFill === "super" ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickFill("super")}
              className={`h-auto p-2 justify-start flex-col items-start text-left transition-all active:scale-[0.98] ${
                activeTestFill === "super"
                  ? "bg-purple-50 text-[#5938F5] border-[#5938F5] hover:bg-purple-100"
                  : "bg-white hover:bg-slate-50 text-[#17172A]"
              }`}
            >
              <span className="font-bold text-[11px] truncate w-full">Super Admin</span>
              <span className="text-[10px] text-slate-500 font-mono font-normal truncate w-full">
                nikhil@devsparks...
              </span>
            </Button>

            <Button
              type="button"
              variant={activeTestFill === "admin" ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickFill("admin")}
              className={`h-auto p-2 justify-start flex-col items-start text-left transition-all active:scale-[0.98] ${
                activeTestFill === "admin"
                  ? "bg-purple-50 text-[#5938F5] border-[#5938F5] hover:bg-purple-100"
                  : "bg-white hover:bg-slate-50 text-[#17172A]"
              }`}
            >
              <span className="font-bold text-[11px] truncate w-full">Workspace Admin</span>
              <span className="text-[10px] text-slate-500 font-mono font-normal truncate w-full">
                admin.test@acs...
              </span>
            </Button>
          </div>
        </div>

        {/* Main Login Form with shadcn components */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Address */}
          <div className="login-input-row space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
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
                className="shadcn-auth-input pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-input-row space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#5938F5] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
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
                className="shadcn-auth-input pl-10 pr-11"
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

          {/* Remember Me */}
          <div className="login-input-row flex items-center space-x-2 pt-0.5">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label htmlFor="remember" className="font-medium text-[#667085] cursor-pointer">
              Remember me
            </Label>
          </div>

          {/* Primary Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="login-submit-btn w-full h-11 text-xs font-bold gap-2 mt-2 shadow-md shadow-[#5938F5]/20 active:scale-[0.99] transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Or Continue With Social SSO */}
        <div className="login-sso-section">
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[#667085] font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEmail("nikhil@devsparksindia.com");
                setPassword("DevSparks@2026!");
              }}
              className="gap-2.5 h-10 border-[#E5E7EB] hover:bg-slate-50 active:scale-[0.98] transition-transform"
            >
              <GitHubIcon size={16} />
              <span>GitHub</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEmail("admin.test@acs-solar.local");
                setPassword("ChangeMe_Admin_2026!");
              }}
              className="gap-2.5 h-10 border-[#E5E7EB] hover:bg-slate-50 active:scale-[0.98] transition-transform"
            >
              <GoogleIcon size={16} />
              <span>Google</span>
            </Button>
          </div>
        </div>

        {/* Bottom Footer Switcher */}
        <div className="login-footer-row mt-8 text-center text-xs text-[#667085]">
          <span>Don&apos;t have an account? </span>
          <Link href="/signup" className="font-bold text-[#5938F5] hover:underline">
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
