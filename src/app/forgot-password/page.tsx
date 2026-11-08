"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

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
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {submitted ? (
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>Recovery Link Dispatched</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#17172A]">
              If an account with <strong>{email}</strong> exists in our system, an encrypted password reset link has been dispatched.
            </p>
          </div>

          <Button asChild className="w-full h-11 text-xs font-bold mt-2 shadow-md shadow-[#5938F5]/20">
            <Link href="/login">Return to Sign In</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 text-xs font-bold gap-2 mt-2 shadow-md shadow-[#5938F5]/20"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <span>Send Password Reset Link</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center text-xs text-[#667085]">
        <span>Remember your password? </span>
        <Link href="/login" className="font-bold text-[#5938F5] hover:underline">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
