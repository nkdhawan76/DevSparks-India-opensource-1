"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "./Icons";

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  badge?: string;
  sparklineColor?: "purple" | "blue" | "rose" | "emerald" | "amber";
}

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  badge,
  sparklineColor = "purple",
}: KpiCardProps) {
  // Sparkline color themes
  const sparklineGradients = {
    purple: {
      stroke: "#5938F5",
      fill: "url(#purple-grad)",
      startColor: "rgba(89, 56, 245, 0.15)",
      stopColor: "rgba(89, 56, 245, 0.0)",
    },
    blue: {
      stroke: "#3988F7",
      fill: "url(#blue-grad)",
      startColor: "rgba(57, 136, 247, 0.15)",
      stopColor: "rgba(57, 136, 247, 0.0)",
    },
    rose: {
      stroke: "#DC2626",
      fill: "url(#rose-grad)",
      startColor: "rgba(220, 38, 38, 0.15)",
      stopColor: "rgba(220, 38, 38, 0.0)",
    },
    emerald: {
      stroke: "#16A34A",
      fill: "url(#emerald-grad)",
      startColor: "rgba(22, 163, 74, 0.15)",
      stopColor: "rgba(22, 163, 74, 0.0)",
    },
    amber: {
      stroke: "#F59E0B",
      fill: "url(#amber-grad)",
      startColor: "rgba(245, 158, 11, 0.15)",
      stopColor: "rgba(245, 158, 11, 0.0)",
    },
  };

  const theme = sparklineGradients[sparklineColor] || sparklineGradients.purple;
  const gradientId = `grad-${sparklineColor}-${Math.random().toString(36).substring(2, 6)}`;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group relative overflow-hidden">
      <div>
        {/* Top: Icon + Title */}
        <div className="flex items-center gap-2.5 mb-3">
          {icon && (
            <div className="w-8 h-8 rounded-xl bg-slate-50 border border-[#E5E7EB] flex items-center justify-center text-slate-700 shrink-0">
              {icon}
            </div>
          )}
          <span className="text-xs font-semibold text-[#667085] truncate">{title}</span>
        </div>

        {/* Middle: Big Metric Value + Trend Indicator */}
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#17172A] font-sans">
              {value}
            </span>

            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                  trend.isPositive ? "text-[#16A34A]" : "text-[#DC2626]"
                }`}
              >
                {trend.isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                <span>{trend.value}</span>
              </span>
            )}
          </div>

          {/* Sparkline Graphic */}
          <div className="w-16 h-8 shrink-0">
            <svg viewBox="0 0 80 32" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.startColor} />
                  <stop offset="100%" stopColor={theme.stopColor} />
                </linearGradient>
              </defs>
              <path
                d="M 0,26 C 15,22 25,28 40,16 C 55,6 68,14 80,4 L 80,32 L 0,32 Z"
                fill={`url(#${gradientId})`}
              />
              <path
                d="M 0,26 C 15,22 25,28 40,16 C 55,6 68,14 80,4"
                fill="none"
                stroke={theme.stroke}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtitle / Footer meta */}
      {(subtitle || badge) && (
        <div className="mt-3 pt-2.5 border-t border-[#F1F4F9] flex items-center justify-between text-[11px] text-[#667085]">
          {subtitle && <span className="truncate">{subtitle}</span>}
          {badge && (
            <span className="px-2 py-0.5 bg-slate-50 border border-[#E5E7EB] text-[#17172A] rounded-md font-semibold text-[10px]">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
