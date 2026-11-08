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
      <div className="mb-3">
        <h1 className="text-xl font-bold tracking-tight text-[#17172A]">
          Reset Password
        </h1>
        <p className="text-[10.5px] text-[#667085] mt-0.5">
          Enter your work email to receive recovery instructions
        </p>
      </div>

      {errorMsg && (
        <div className="mb-2.5 p-2 rounded-[8px] bg-rose-50 border border-rose-200 text-[11px] text-[#DC2626] flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {submitted ? (
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-[8px] bg-emerald-50 border border-emerald-200 text-[#16A34A] space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Recovery Link Dispatched</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#17172A]">
              If an account with <strong>{email}</strong> exists, a password reset link has been dispatched.
            </p>
          </div>

          <Button asChild className="w-full h-9 rounded-[8px] text-xs font-semibold mt-1">
            <Link href="/login">Return to Sign In</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
          <div className="space-y-1">
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
                className="pl-10 pr-3.5 h-9 text-xs rounded-[8px] border-[#E5E7EB] bg-white focus-visible:border-[#5938F5] focus-visible:ring-1 focus-visible:ring-[#5938F5]/20 shadow-2xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 rounded-[8px] bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-bold gap-2 mt-2 shadow-xs ring-2 ring-[#5938F5]/20 ring-offset-1 ring-offset-white active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <span>Send Password Reset Link</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </form>
      )}

      <div className="mt-3 text-center text-xs text-[#667085]">
        <span>Remember your password?</span>
        <Link href="/login" className="font-bold text-[#5938F5] hover:underline ml-1">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
