"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import { calculatePasswordStrength } from "@/lib/auth-logic";

interface PasswordStrengthMeterProps {
  password: string;
  pwnedWarning?: string | null;
  className?: string;
}

export function PasswordStrengthMeter({
  password,
  pwnedWarning,
  className = "",
}: PasswordStrengthMeterProps) {
  if (!password) {
    return (
      <div className={`text-[11px] text-[#667085] flex items-center gap-1.5 pt-1 ${className}`}>
        <ShieldCheck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
        <span>Minimum 15 characters. Passphrases with spaces are recommended.</span>
      </div>
    );
  }

  const { score, label, color, feedback } = calculatePasswordStrength(password);

  // 5 segments (indexes 0, 1, 2, 3, 4)
  const segments = [0, 1, 2, 3, 4];

  return (
    <div className={`space-y-1.5 pt-1.5 ${className}`}>
      {/* Segmented Progress Bars */}
      <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full">
        {segments.map((idx) => {
          const isActive = idx <= score;
          return (
            <div
              key={idx}
              className="h-full rounded-full transition-all duration-200"
              style={{
                backgroundColor: isActive ? color : "#E5E7EB",
              }}
            />
          );
        })}
      </div>

      {/* Strength Label & Real-time NIST Guidance */}
      <div className="flex items-center justify-between text-[11px] leading-tight">
        <div className="flex items-center gap-1.5">
          {score >= 3 ? (
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" style={{ color }} />
          ) : (
            <ShieldAlert className="h-3.5 w-3.5 shrink-0" style={{ color }} />
          )}
          <span className="font-semibold" style={{ color }}>
            {label}
          </span>
          <span className="text-[#667085]">— {feedback}</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono shrink-0">
          {password.length}/128
        </span>
      </div>

      {/* Compromised Password Warning Alert */}
      {pwnedWarning && (
        <div className="flex items-start gap-2 p-2 bg-rose-50 border border-rose-200 rounded-[8px] text-[11.5px] text-rose-800 leading-snug animate-in fade-in">
          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-semibold">Security Alert: </strong>
            <span>{pwnedWarning}</span>
          </div>
        </div>
      )}
    </div>
  );
}
