"use client";

import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <AuthLayout mode="recovery">
      <div className="mb-3.5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#17172A]">
          Email Verification
        </h1>
        <p className="text-[11px] text-[#667085] mt-0.5">
          Security and tenancy verification status
        </p>
      </div>

      <div className="space-y-3 text-xs text-center">
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16A34A] space-y-1.5 text-left">
          <div className="flex items-center gap-2 font-bold text-xs">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Verification Successful</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#17172A]">
            Your developer email has been verified for production operations. You can now access your workspaces.
          </p>
        </div>

        <Button asChild className="w-full h-9 text-xs font-semibold gap-1.5 mt-1">
          <Link href="/login">
            <span>Sign In to Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
