"use client";

import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { CheckCircle2 } from "@/components/common/Icons";

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Email Verification"
      subtitle="Security and tenancy verification status"
    >
      <div className="space-y-4 text-xs text-center">
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-sm">
            <CheckCircle2 size={20} />
            <span>Verification Link Verified</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#17172A]">
            Your developer email has been verified for production operations. You can now access your workspaces.
          </p>
        </div>

        <Link
          href="/login"
          className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center"
        >
          Sign In to Dashboard
        </Link>
      </div>
    </AuthLayout>
  );
}

