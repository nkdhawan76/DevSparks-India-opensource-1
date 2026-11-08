import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface FeatureCardData {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
  status?: "Live" | "BYOK" | "Planned" | "Beta";
  route?: string;
  details?: string[];
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  status = "Live",
  route,
  details,
}: FeatureCardData) {
  const statusVariant = {
    Live: "default",
    BYOK: "secondary",
    Planned: "outline",
    Beta: "warning",
  }[status] as "default" | "secondary" | "outline" | "warning";

  const cardContent = (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-slate-300 hover:shadow-md shadow-2xs transition-all duration-200 flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5938F5] border border-purple-100/60 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-purple-100 group-hover:text-[#4726DB] transition-all">
            <Icon className="h-4.5 w-4.5 shrink-0" />
          </div>
          <Badge
            variant={statusVariant}
            className={`text-[9.5px] py-0 px-2 h-4.5 font-bold uppercase rounded-[4px] ${
              status === "Planned" ? "bg-slate-100 text-slate-500 border-slate-200" : ""
            }`}
          >
            {status}
          </Badge>
        </div>

        <h3 className="text-base font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors leading-snug">
          {title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
          {description}
        </p>

        {details && details.length > 0 && (
          <ul className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
            {details.map((detail) => (
              <li key={detail} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5938F5]" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {route && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#5938F5] group-hover:text-[#4726DB]">
          <span>Learn more</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );

  if (route) {
    return <Link href={route}>{cardContent}</Link>;
  }

  return cardContent;
}

interface FeatureSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  features: FeatureCardData[];
  columns?: 2 | 3 | 4;
}

export function FeatureSection({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
}: FeatureSectionProps) {
  const colClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        {eyebrow && (
          <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
          {title}
        </h2>
        <p className="mt-3 text-sm text-[#667085] leading-relaxed">
          {description}
        </p>
      </div>

      <div className={`grid gap-4 sm:gap-6 ${colClass}`}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

