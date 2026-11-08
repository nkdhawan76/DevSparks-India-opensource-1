"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, ArrowRight, Sparkles, Building2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarketSelector } from "@/components/marketing/MarketSelector";
import {
  getMarket,
  getRegionalPricing,
  DEFAULT_MARKET_SLUG,
  extractMarketFromPath,
  Market,
} from "@/lib/markets";

export function PricingTable() {
  const pathname = usePathname() || "/";
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const { marketSlug: pathMarket } = extractMarketFromPath(pathname);
  const [market, setMarket] = useState<Market>(() => getMarket(pathMarket || DEFAULT_MARKET_SLUG));

  useEffect(() => {
    if (pathMarket) {
      setMarket(getMarket(pathMarket));
    } else {
      const match = document.cookie.match(/(?:^|;\s*)deploycheck_market=([^;]*)/);
      if (match && match[1]) {
        setMarket(getMarket(match[1]));
      }
    }
  }, [pathMarket, pathname]);

  const pricing = getRegionalPricing(market.slug);

  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Market Selector Bar & Billing Cycle Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        {/* Region & Currency Display */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-slate-500 font-medium">Selected Region:</span>
          <MarketSelector variant="compact" />
          <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">
            • {market.taxNote}
          </span>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              billingCycle === "monthly"
                ? "bg-white text-[#17172A] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`px-3.5 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-white text-[#5938F5] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-100 text-[#5938F5]">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Community Core Tier */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-slate-700" />
                <h3 className="text-lg font-bold text-[#17172A]">Community Core</h3>
              </div>
              <Badge variant="secondary" className="text-xs">
                MIT License
              </Badge>
            </div>

            <div className="mb-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#17172A]">
                {pricing.free.formattedMonthly}
              </span>
              <span className="text-xs text-[#667085] ml-2 font-medium">Free Forever</span>
            </div>

            <p className="text-xs text-[#667085] leading-relaxed mb-6">
              Full self-hosted platform sovereignty for independent developers and open-source teams.
            </p>

            <div className="pt-6 border-t border-slate-100">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Included Capabilities:
              </span>
              <ul className="space-y-2.5">
                {[
                  "Full source code under MIT License",
                  "Unlimited self-hosted projects",
                  "Unlimited connected SSH VPS servers",
                  "Bring Your Own Key (BYOK) AI diffs",
                  "Deterministic pre-deployment audit engine",
                  "Atomic zero-downtime release pipelines",
                  "Single-region synthetic uptime monitoring",
                  "Community GitHub Discussions support",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#17172A]">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Button
              asChild
              className="w-full h-10 rounded-[8px] text-xs font-bold inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-[#17172A] border border-[#E5E7EB] active:scale-[0.99] transition-all"
            >
              <a
                href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>Clone on GitHub</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </a>
            </Button>
          </div>
        </div>

        {/* Pro / Team Tier */}
        <div className="bg-white border-2 border-[#5938F5] ring-4 ring-[#5938F5]/10 rounded-2xl p-7 sm:p-8 shadow-md flex flex-col justify-between relative transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#5938F5]" />
                <h3 className="text-lg font-bold text-[#17172A]">Pro Team</h3>
              </div>
              <Badge className="text-xs bg-[#5938F5] text-white">Most Popular</Badge>
            </div>

            <div className="mb-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#17172A]">
                {billingCycle === "monthly"
                  ? pricing.pro.formattedMonthly
                  : pricing.pro.formattedAnnual}
              </span>
              <span className="text-xs text-[#667085] ml-2 font-medium">
                {billingCycle === "monthly" ? "per workspace / mo" : "per workspace / yr"}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mb-4">{market.taxNote}</div>

            <p className="text-xs text-[#667085] leading-relaxed mb-6">
              Advanced team collaboration, granular role permissions, and priority engineering support.
            </p>

            <div className="pt-6 border-t border-slate-100">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Everything in Core, plus:
              </span>
              <ul className="space-y-2.5">
                {[
                  "Multi-user RBAC (Admin, Developer)",
                  "Multi-workspace client isolation",
                  "Unlimited audit log history retention",
                  "Custom Slack & Discord incident webhooks",
                  "Database snapshot backup automation",
                  "Priority email engineering support",
                  "Commercial deployment indemnity",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#17172A]">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Button
              asChild
              className="w-full h-10 rounded-[8px] text-xs font-bold inline-flex items-center justify-center gap-2 bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs active:scale-[0.99] transition-all"
            >
              <Link href="/signup?plan=pro">
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Enterprise Sovereign Tier */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-7 sm:p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-slate-700" />
                <h3 className="text-lg font-bold text-[#17172A]">Enterprise Sovereign</h3>
              </div>
              <Badge variant="outline" className="text-xs text-slate-700 border-slate-300">
                Custom SLA
              </Badge>
            </div>

            <div className="mb-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#17172A]">
                {billingCycle === "monthly"
                  ? pricing.enterprise.formattedMonthly
                  : pricing.enterprise.formattedAnnual}
              </span>
              <span className="text-xs text-[#667085] ml-2 font-medium">
                {billingCycle === "monthly" ? "per organization / mo" : "per organization / yr"}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mb-4">{market.taxNote}</div>

            <p className="text-xs text-[#667085] leading-relaxed mb-6">
              Dedicated high-availability clustering, customized compliance controls, and custom integrations.
            </p>

            <div className="pt-6 border-t border-slate-100">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Everything in Pro, plus:
              </span>
              <ul className="space-y-2.5">
                {[
                  "Dedicated high-availability cluster setup",
                  "Custom compliance runbooks & security reports",
                  "Air-gapped on-premise installation option",
                  "Custom SSO / SAML 2.0 integration",
                  "99.95% uptime SLA guarantee",
                  "Dedicated senior DevOps engineer",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#17172A]">
                    <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Button
              asChild
              className="w-full h-10 rounded-[8px] text-xs font-bold inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-[#17172A] border border-[#E5E7EB] active:scale-[0.99] transition-all"
            >
              <Link href="/contact?subject=enterprise">
                <span>Contact Solutions</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
