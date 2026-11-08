"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface FooterLinkItem {
  label: string;
  route: string;
  external?: boolean;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning";
}

export const PRODUCT_LINKS: FooterLinkItem[] = [
  { label: "Overview", route: "/product" },
  { label: "Pre-deployment Audit", route: "/features/pre-deployment-audit", badge: "Live", badgeVariant: "success" },
  { label: "AI Assistant", route: "/features/ai-assistant", badge: "BYOK", badgeVariant: "secondary" },
  { label: "VPS Management", route: "/features/vps-management" },
  { label: "Guided Deployment", route: "/features/guided-deployment" },
  { label: "Website Monitoring", route: "/features/website-monitoring" },
  { label: "Maintenance", route: "/features/maintenance" },
];

export const SOLUTIONS_LINKS: FooterLinkItem[] = [
  { label: "For Developers", route: "/solutions/developers" },
  { label: "For DevOps Teams", route: "/solutions/devops-teams" },
  { label: "For Agencies", route: "/solutions/agencies" },
  { label: "For Startups", route: "/solutions/startups" },
  { label: "Security & Reliability", route: "/solutions/security-reliability" },
];

export const RESOURCES_LINKS: FooterLinkItem[] = [
  { label: "Documentation", route: "/docs" },
  { label: "API Reference", route: "/docs/api" },
  { label: "Getting Started", route: "/docs/getting-started" },
  { label: "Tutorials", route: "/tutorials" },
  { label: "Changelog", route: "/changelog", badge: "v0.2.1", badgeVariant: "secondary" },
  { label: "Roadmap", route: "/roadmap" },
  { label: "GitHub Repository", route: "https://github.com/nkdhawan76/DevSparks-India-opensource-1", external: true },
];

export const COMPANY_LINKS: FooterLinkItem[] = [
  { label: "About DevSparks India", route: "/about" },
  { label: "Contact", route: "/contact" },
  { label: "Community", route: "/community" },
  { label: "Contribute", route: "/contribute" },
  { label: "Support", route: "/support" },
];

export const LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Privacy Policy", route: "/privacy" },
  { label: "Terms of Service", route: "/terms" },
  { label: "Cookie Policy", route: "/cookies" },
  { label: "Acceptable Use Policy", route: "/acceptable-use" },
  { label: "Security Policy", route: "/security" },
  { label: "License (MIT)", route: "/license" },
];

interface NavColumnSectionProps {
  title: string;
  links: FooterLinkItem[];
}

function NavColumnSection({ title, links }: NavColumnSectionProps) {
  return (
    <div className="footer-nav-col">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-0.5">
        {title}
      </h3>
      <ul className="space-y-1.5 text-[11.5px]">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.route}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#667085] hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center gap-1 group py-0.5 focus:outline-none focus-visible:underline rounded-[4px]"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                  {link.label}
                </span>
                <ExternalLink className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <Link
                href={link.route}
                className="text-[#667085] hover:text-[#5938F5] transition-colors leading-tight inline-flex items-center gap-1.5 group py-0.5 focus:outline-none focus-visible:underline rounded-[4px]"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                  {link.label}
                </span>
                {link.badge && (
                  <Badge
                    variant={link.badgeVariant || "secondary"}
                    className="text-[8px] py-0 px-1 h-3.5 font-bold uppercase rounded-[3px] border-none"
                  >
                    {link.badge}
                  </Badge>
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterNavColumns() {
  return (
    <nav
      aria-label="Footer Navigation"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-5 text-xs"
    >
      <NavColumnSection title="PRODUCT" links={PRODUCT_LINKS} />
      <NavColumnSection title="SOLUTIONS" links={SOLUTIONS_LINKS} />
      <NavColumnSection title="RESOURCES" links={RESOURCES_LINKS} />
      <NavColumnSection title="COMPANY" links={COMPANY_LINKS} />
      <NavColumnSection title="LEGAL" links={LEGAL_LINKS} />
    </nav>
  );
}

