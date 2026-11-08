"use client";

import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <AuthLayout mode="recovery">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17172A]">
          Email Verification
        </h1>
        <p className="text-xs text-[#667085] mt-1.5">
          Security and tenancy verification status
        </p>
      </div>

      <div className="space-y-4 text-xs text-center">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] space-y-2 text-left">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>Verification Successful</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#17172A]">
            Your developer email has been verified for production operations. You can now access your workspaces.
          </p>
        </div>

        <Button asChild className="w-full h-11 text-xs font-bold gap-2 mt-2 shadow-md shadow-[#5938F5]/20">
          <Link href="/login">
            <span>Sign In to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
