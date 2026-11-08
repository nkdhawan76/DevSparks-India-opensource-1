import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaAction {
  label: string;
  href: string;
  external?: boolean;
}

interface PageHeroProps {
  badge?: string;
  badgeVariant?: "purple" | "blue" | "emerald" | "amber" | "success";
  title: string;
  description: string;
  primaryCta?: CtaAction;
  primaryAction?: CtaAction;
  secondaryCta?: CtaAction;
  secondaryAction?: CtaAction;
  children?: React.ReactNode;
}

export function PageHero({
  badge,
  badgeVariant = "purple",
  title,
  description,
  primaryCta,
  primaryAction,
  secondaryCta,
  secondaryAction,
  children,
}: PageHeroProps) {
  const activePrimary = primaryCta || primaryAction;
  const activeSecondary = secondaryCta || secondaryAction;

  const badgeStyles = {
    purple: "bg-purple-100 text-[#5938F5]",
    blue: "bg-blue-100 text-[#3563E9]",
    emerald: "bg-emerald-100 text-[#16A34A]",
    success: "bg-emerald-100 text-[#16A34A]",
    amber: "bg-amber-100 text-amber-800",
  }[badgeVariant];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#E5E7EB] bg-white">
      {/* Background Soft Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center sm:text-left">
        <div className="max-w-3xl">
          {badge && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 ${badgeStyles}`}>
              <span>{badge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17172A] leading-tight">
            {title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#667085] leading-relaxed">
            {description}
          </p>

          {(activePrimary || activeSecondary) && (
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3">
              {activePrimary && (
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto h-11 px-6 rounded-[8px] bg-[#5938F5] hover:bg-[#4726DB] text-white font-bold text-sm shadow-sm gap-2 group"
                >
                  <Link
                    href={activePrimary.href}
                    target={activePrimary.external ? "_blank" : undefined}
                    rel={activePrimary.external ? "noreferrer noopener" : undefined}
                  >
                    <span>{activePrimary.label}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              )}

              {activeSecondary && (
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto h-11 px-6 rounded-[8px] border-[#E5E7EB] hover:bg-slate-50 text-[#17172A] font-semibold text-sm shadow-2xs"
                >
                  <Link
                    href={activeSecondary.href}
                    target={activeSecondary.external ? "_blank" : undefined}
                    rel={activeSecondary.external ? "noreferrer noopener" : undefined}
                  >
                    {activeSecondary.label}
                  </Link>
                </Button>
              )}
            </div>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
