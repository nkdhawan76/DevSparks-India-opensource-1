"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  MARKETS,
  DEFAULT_MARKET_SLUG,
  getMarket,
  buildRegionalUrl,
  extractMarketFromPath,
  Market,
} from "@/lib/markets";

interface MarketSelectorProps {
  variant?: "footer" | "header" | "compact";
  className?: string;
}

export function MarketSelector({ variant = "footer", className = "" }: MarketSelectorProps) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine current market from pathname or cookie fallback
  const { marketSlug: pathMarket } = extractMarketFromPath(pathname);
  const [currentMarket, setCurrentMarket] = useState<Market>(() => {
    return getMarket(pathMarket || DEFAULT_MARKET_SLUG);
  });

  useEffect(() => {
    if (pathMarket) {
      setCurrentMarket(getMarket(pathMarket));
    } else {
      // Check document cookie
      const match = document.cookie.match(/(?:^|;\s*)deploycheck_market=([^;]*)/);
      if (match && match[1]) {
        setCurrentMarket(getMarket(match[1]));
      }
    }
  }, [pathMarket, pathname]);

  // Handle outside click to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectMarket = (targetMarket: Market) => {
    setCurrentMarket(targetMarket);
    setIsOpen(false);

    // Persist user preference cookie for 365 days
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `deploycheck_market=${targetMarket.slug}; path=/; max-age=${maxAge}; SameSite=Lax`;

    // Navigate to localized regional URL
    const targetUrl = buildRegionalUrl(pathname, targetMarket.slug);
    router.push(targetUrl);
  };

  const isFooter = variant === "footer";

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex items-center gap-1.5 rounded-[8px] transition-all font-medium select-none ${
          isFooter
            ? "px-2.5 py-1 text-[11px] bg-white border border-[#E5E7EB] text-slate-700 hover:text-[#17172A] hover:border-slate-300 shadow-2xs"
            : "px-2.5 py-1 text-xs bg-white border border-slate-200 text-slate-800 hover:border-purple-200 shadow-xs"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Select Region & Currency"
      >
        <span className="text-xs leading-none" role="img" aria-label={currentMarket.name}>
          {currentMarket.flag}
        </span>
        <span className="font-semibold text-slate-800">
          {currentMarket.currency} ({currentMarket.currencySymbol})
        </span>
        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select Region and Currency"
          className={`absolute z-50 w-56 rounded-xl bg-white border border-[#E5E7EB] shadow-lg p-1 space-y-0.5 focus:outline-none ${
            isFooter ? "bottom-full mb-2 left-0 sm:left-auto sm:right-0" : "top-full mt-1.5 left-0"
          }`}
        >
          <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-slate-400" />
              <span>Region & Currency</span>
            </span>
          </div>

          {Object.values(MARKETS).map((market) => {
            const isSelected = market.slug === currentMarket.slug;
            return (
              <button
                key={market.slug}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectMarket(market)}
                className={`w-full text-left px-2.5 py-2 rounded-[6px] text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-purple-50/70 text-[#5938F5] font-semibold"
                    : "text-slate-700 hover:bg-slate-50 font-normal"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-none" role="img" aria-label={market.name}>
                    {market.flag}
                  </span>
                  <div className="flex flex-col">
                    <span className="leading-tight text-[11.5px] font-medium text-slate-800">
                      {market.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {market.currency} • {market.currencySymbol}
                    </span>
                  </div>
                </div>

                {isSelected && <Check className="h-3.5 w-3.5 text-[#5938F5] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
