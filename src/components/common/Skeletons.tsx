import React from "react";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Primitive neutral skeleton block with subtle shimmer
 */
export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div
      className={`bg-slate-200/70 animate-pulse rounded-[8px] motion-reduce:animate-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton placeholder for Feature Card
 */
export function FeatureCardSkeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading feature..."
      className={`p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-16 h-4.5 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-5 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="w-full h-3.5 rounded" />
        <Skeleton className="w-5/6 h-3.5 rounded" />
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="w-20 h-4 rounded" />
        <Skeleton className="w-4 h-4 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Hero Interactive Preview
 */
export function HeroPreviewSkeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading interactive preview..."
      className={`w-full rounded-2xl bg-white border border-[#E5E7EB] shadow-xl p-5 space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-2.5 h-2.5 rounded-full" />
            <Skeleton className="w-2.5 h-2.5 rounded-full" />
            <Skeleton className="w-2.5 h-2.5 rounded-full" />
          </div>
          <Skeleton className="w-32 h-3 rounded" />
        </div>
        <Skeleton className="w-28 h-4 rounded-full" />
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-lg">
        <Skeleton className="flex-1 h-7 rounded-md" />
        <Skeleton className="flex-1 h-7 rounded-md" />
        <Skeleton className="flex-1 h-7 rounded-md" />
      </div>

      <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="w-32 h-3.5 rounded" />
              <Skeleton className="w-48 h-2.5 rounded" />
            </div>
          </div>
          <Skeleton className="w-12 h-6 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 rounded-lg" />
        <Skeleton className="h-14 rounded-lg" />
        <Skeleton className="h-14 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Project List
 */
export function ProjectListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div role="status" aria-busy="true" className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="w-36 h-4 rounded" />
              <Skeleton className="w-24 h-3 rounded" />
            </div>
          </div>
          <Skeleton className="w-20 h-6 rounded-md" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton placeholder for Audit Report
 */
export function AuditReportSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading security audit report..."
      className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-5"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="w-48 h-5 rounded" />
          <Skeleton className="w-64 h-3 rounded" />
        </div>
        <Skeleton className="w-24 h-8 rounded-lg" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>

      <div className="space-y-2 pt-2">
        <Skeleton className="w-full h-12 rounded-lg" />
        <Skeleton className="w-full h-12 rounded-lg" />
        <Skeleton className="w-full h-12 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Dashboard Overview
 */
export function DashboardSkeleton() {
  return (
    <div role="status" aria-busy="true" className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="lg:col-span-2 h-72 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Charts
 */
export function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`w-full ${height} rounded-2xl bg-white border border-[#E5E7EB] p-5 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="w-32 h-4 rounded" />
        <Skeleton className="w-16 h-3 rounded" />
      </div>
      <div className="flex items-end gap-2 h-36 pt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t"
            style={{ height: `${25 + ((i * 19) % 70)}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between pt-2">
        <Skeleton className="w-12 h-2.5 rounded" />
        <Skeleton className="w-12 h-2.5 rounded" />
        <Skeleton className="w-12 h-2.5 rounded" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Data Tables
 */
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className="w-full rounded-2xl bg-white border border-[#E5E7EB] overflow-hidden p-4 space-y-3"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <Skeleton className="w-40 h-4 rounded" />
        <Skeleton className="w-24 h-4 rounded" />
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton
              key={c}
              className={`h-4 rounded ${c === 0 ? "w-1/3" : "flex-1"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton placeholder for Documentation Pages
 */
export function DocumentationSkeleton() {
  return (
    <div role="status" aria-busy="true" className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <Skeleton className="w-48 h-8 rounded-lg" />
      <Skeleton className="w-full h-4 rounded" />
      <Skeleton className="w-5/6 h-4 rounded" />
      <div className="pt-4 space-y-3">
        <Skeleton className="w-32 h-6 rounded" />
        <Skeleton className="w-full h-32 rounded-xl" />
      </div>
      <div className="pt-4 space-y-2">
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-4/5 h-4 rounded" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Pricing Page
 */
export function PricingSkeleton() {
  return (
    <div role="status" aria-busy="true" className="max-w-6xl mx-auto py-12 px-4 sm:px-6 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <Skeleton className="w-28 h-5 rounded-full mx-auto" />
        <Skeleton className="w-72 h-8 rounded-lg mx-auto" />
        <Skeleton className="w-96 h-4 rounded mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Skeleton className="h-96 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for Notification List
 */
export function NotificationSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div role="status" aria-busy="true" className="space-y-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-7 h-7 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="w-40 h-3.5 rounded" />
              <Skeleton className="w-24 h-2.5 rounded" />
            </div>
          </div>
          <Skeleton className="w-12 h-3 rounded" />
        </div>
      ))}
    </div>
  );
}

/**
 * Full Page Skeleton
 */
export function PageSkeleton() {
  return (
    <div role="status" aria-busy="true" className="min-h-screen bg-[#F7F8FC] p-4 sm:p-6 space-y-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3">
        <Skeleton className="w-32 h-8 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="w-16 h-8 rounded-md" />
          <Skeleton className="w-20 h-8 rounded-md" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <HeroPreviewSkeleton />
      </div>
    </div>
  );
}
