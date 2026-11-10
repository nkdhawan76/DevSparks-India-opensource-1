"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "@/lib/metadata-registry";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items || items.length <= 1) {
    return null;
  }

  // Schema.org BreadcrumbList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`w-full pt-4 sm:pt-5 pb-5 sm:pb-6 px-4 sm:px-6 text-xs font-sans select-none ${className}`}
      >
        <ol className="max-w-6xl mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-slate-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.path} className="inline-flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" aria-hidden="true" />
                )}

                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-[#17172A] truncate max-w-[280px] sm:max-w-none"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-[#667085] hover:text-[#5938F5] transition-colors inline-flex items-center gap-1.5 group font-medium focus:outline-none focus-visible:underline rounded-[3px]"
                  >
                    {isFirst && (
                      <Home className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#5938F5] transition-colors shrink-0" aria-hidden="true" />
                    )}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

