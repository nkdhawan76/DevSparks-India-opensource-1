"use client";

import React from "react";

export type BadgeVariant = "success" | "warning" | "danger" | "critical" | "info" | "neutral";

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

export function StatusBadge({ label, variant = "neutral", size = "sm", dot = true }: StatusBadgeProps) {
  const styles: Record<BadgeVariant, { bg: string; text: string; border: string; dotColor: string }> = {
    success: { bg: "bg-emerald-50", text: "text-[#16A34A]", border: "border-emerald-200", dotColor: "bg-[#16A34A]" },
    warning: { bg: "bg-amber-50", text: "text-[#D97706]", border: "border-amber-200", dotColor: "bg-[#F59E0B]" },
    danger: { bg: "bg-rose-50", text: "text-[#DC2626]", border: "border-rose-200", dotColor: "bg-[#DC2626]" },
    critical: { bg: "bg-rose-100", text: "text-[#B91C1C]", border: "border-rose-300", dotColor: "bg-[#DC2626]" },
    info: { bg: "bg-blue-50", text: "text-[#2563EB]", border: "border-blue-200", dotColor: "bg-[#2563EB]" },
    neutral: { bg: "bg-slate-50", text: "text-[#667085]", border: "border-[#E5E7EB]", dotColor: "bg-[#94A3B8]" },
  };

  const style = styles[variant] || styles.neutral;
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${style.bg} ${style.text} ${style.border} ${sizeClasses}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dotColor}`} />}
      {label}
    </span>
  );
}
