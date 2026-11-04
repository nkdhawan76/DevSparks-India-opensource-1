"use client";

import React from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: string;
  badge?: string;
}

export function KpiCard({ title, value, subtitle, trend, icon, badge }: KpiCardProps) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">{title}</span>
        {icon && (
          <span className="w-8 h-8 rounded-lg bg-slate-50 border border-[#E5E7EB] flex items-center justify-center text-sm">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl font-extrabold tracking-tight text-[#17172A]">{value}</div>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend.isPositive ? "bg-emerald-50 text-[#16A34A]" : "bg-rose-50 text-[#DC2626]"
            }`}
          >
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{trend.value}</span>
          </span>
        )}
      </div>

      {(subtitle || badge) && (
        <div className="mt-3 pt-3 border-t border-[#F1F4F9] flex items-center justify-between text-xs text-[#667085]">
          {subtitle && <span>{subtitle}</span>}
          {badge && (
            <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] rounded font-medium text-[10px]">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
