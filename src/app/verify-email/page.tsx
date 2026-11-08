"use client";

import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { CheckCircle2 } from "@/components/common/Icons";

export default function VerifyEmailPage() {
  return (
    <AuthLayout mode="recovery">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 sm:p-9 shadow-xl shadow-slate-200/50 relative">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3.5 shadow-xs">
            <CheckCircle2 size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">
            Email Verification
          </h1>
          <p className="text-xs text-[#667085] mt-1.5">
            Security and tenancy verification status
          </p>
        </div>

        <div className="space-y-4 text-xs text-center">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] space-y-2">
            <div className="flex items-center justify-center gap-2 font-bold text-sm">
              <CheckCircle2 size={18} />
              <span>Verification Successful</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#17172A]">
              Your developer email has been verified for production operations. You can now access your workspaces.
            </p>
          </div>

          <Link
            href="/login"
            className="w-full py-2.5 px-4 rounded-xl bg-[#5938F5] hover:bg-[#4726DB] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center"
          >
            Sign In to Dashboard
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

