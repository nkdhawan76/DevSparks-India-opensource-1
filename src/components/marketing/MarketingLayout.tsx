"use client";

import React from "react";
import { WebsiteHeader } from "@/components/navigation/WebsiteHeader";
import { WebsiteFooter } from "@/components/navigation/WebsiteFooter";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { getRouteMetadata } from "@/lib/metadata-registry";

interface MarketingLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  currentPath?: string;
  showCta?: boolean;
  className?: string;
}

export function MarketingLayout({
  children,
  breadcrumbs,
  currentPath,
  showCta = true,
  className = "",
}: MarketingLayoutProps) {
  const activeBreadcrumbs =
    breadcrumbs ||
    (currentPath ? getRouteMetadata(currentPath).breadcrumbs : undefined);

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-between font-sans antialiased text-[#17172A] selection:bg-purple-100 selection:text-[#5938F5]">
      {/* Sticky Global Website Header */}
      <WebsiteHeader />

      {/* Semantic Breadcrumbs (Inner Pages) */}
      {activeBreadcrumbs && activeBreadcrumbs.length > 1 && (
        <Breadcrumbs items={activeBreadcrumbs} />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${className}`}>
        {children}
      </main>

      {/* Global Five-Column Modern Mega Footer */}
      <WebsiteFooter showCta={showCta} />
    </div>
  );
}
