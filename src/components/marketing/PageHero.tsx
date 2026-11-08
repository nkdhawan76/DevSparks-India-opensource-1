import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeroProps {
  badge?: string;
  badgeVariant?: "purple" | "blue" | "emerald" | "amber";
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string; external?: boolean };
  children?: React.ReactNode;
}

export function PageHero({
  badge,
  badgeVariant = "purple",
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  const badgeStyles = {
    purple: "bg-purple-100 text-[#5938F5]",
    blue: "bg-blue-100 text-[#3563E9]",
    emerald: "bg-emerald-100 text-[#16A34A]",
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

          {(primaryCta || secondaryCta) && (
            <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {primaryCta && (
                <Button
                  asChild
                  className="h-10 rounded-[8px] px-5 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-xs gap-1.5 active:scale-[0.98] transition-all"
                >
                  <Link href={primaryCta.href}>
                    <span>{primaryCta.label}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              )}

              {secondaryCta && (
                <Button
                  variant="outline"
                  asChild
                  className="h-10 rounded-[8px] px-4.5 text-xs font-semibold border-[#E5E7EB] hover:bg-slate-50 text-[#17172A]"
                >
                  {secondaryCta.external ? (
                    <a
                      href={secondaryCta.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {secondaryCta.label}
                    </a>
                  ) : (
                    <Link href={secondaryCta.href}>
                      {secondaryCta.label}
                    </Link>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
