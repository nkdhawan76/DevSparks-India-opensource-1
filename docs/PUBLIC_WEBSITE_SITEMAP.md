# DevSparks DeployCheck — Public Website Sitemap & Information Architecture

**Product:** DevSparks DeployCheck  
**Company:** DevSparks India  
**Repository:** [https://github.com/nkdhawan76/DevSparks-India-opensource-1](https://github.com/nkdhawan76/DevSparks-India-opensource-1)  
**Document Version:** 1.0.0 (Production Verified)  
**Design Standard:** Strict Light Theme Enforced (`#5938F5` primary, `#F7F8FC` page background, `#FFFFFF` cards)

---

## 1. Executive Summary

This sitemap documents the complete, multi-page public marketing website for DevSparks DeployCheck. Every route is statically or server-rendered with centralized metadata from `src/lib/metadata-registry.ts`, includes semantic `Breadcrumbs` with JSON-LD `BreadcrumbList` schema, and provides clean canonical paths with corresponding redirect aliases.

---

## 2. Complete Public Route Ledger

| # | Route Path | Component / Template | Page Title | Priority | Changefreq | JSON-LD Structured Data |
| :-: | :--- | :--- | :--- | :-: | :-: | :--- |
| **01** | `/` | `src/app/page.tsx` | DevSparks DeployCheck — Pre-Deployment Audit & Sovereign VPS Management | 1.0 | daily | `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage` |
| **02** | `/product` | `src/app/product/page.tsx` | Product Overview — Complete Deployment Workflow | 0.9 | weekly | `SoftwareApplication`, `BreadcrumbList` |
| **03** | `/features/pre-deployment-audit` | `src/app/features/pre-deployment-audit/page.tsx` | Pre-Deployment Audit Engine — Static Security & Dependency Scanner | 0.85 | weekly | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| **04** | `/features/ai-assistant` | `src/app/features/ai-assistant/page.tsx` | BYOK AI Assistant & Policy-Guarded Code Diff Reviews | 0.85 | weekly | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| **05** | `/features/vps-management` | `src/app/features/vps-management/page.tsx` | VPS Server Management & Policy-Guarded SSH Telemetry | 0.85 | weekly | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| **06** | `/features/guided-deployment` | `src/app/features/guided-deployment/page.tsx` | Guided Deployment — Safe Release Pipelines & Rollbacks | 0.85 | weekly | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| **07** | `/features/website-monitoring` | `src/app/features/website-monitoring/page.tsx` | Website Monitoring — Synthetic Probes & SSL Uptime Telemetry | 0.85 | weekly | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| **08** | `/features/maintenance` | `src/app/features/maintenance/page.tsx` | Maintenance & Backups — Scheduled Health Tasks | 0.80 | weekly | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| **09** | `/features/container-scanning` | `src/app/features/container-scanning/page.tsx` | Container Registry Scanning (Planned M7) | 0.70 | monthly | `SoftwareApplication`, `BreadcrumbList` |
| **10** | `/features/multi-region-monitoring` | `src/app/features/multi-region-monitoring/page.tsx` | Multi-Region Probes & Edge Latency (Planned M8) | 0.70 | monthly | `SoftwareApplication`, `BreadcrumbList` |
| **11** | `/solutions/developers` | `src/app/solutions/developers/page.tsx` | DeployCheck for Developers — Frictionless Audit & Deployment | 0.80 | weekly | `BreadcrumbList`, `FAQPage` |
| **12** | `/solutions/devops-teams` | `src/app/solutions/devops-teams/page.tsx` | DeployCheck for DevOps Teams — Standardized Server Governance | 0.80 | weekly | `BreadcrumbList`, `FAQPage` |
| **13** | `/solutions/agencies` | `src/app/solutions/agencies/page.tsx` | DeployCheck for Agencies — Multi-Client Workspace Management | 0.80 | weekly | `BreadcrumbList`, `FAQPage` |
| **14** | `/solutions/startups` | `src/app/solutions/startups/page.tsx` | DeployCheck for Startups — High Velocity Without DevOps Overhead | 0.80 | weekly | `BreadcrumbList`, `FAQPage` |
| **15** | `/solutions/security-reliability` | `src/app/solutions/security-reliability/page.tsx` | DeployCheck for Security & Reliability — Zero Blindspots | 0.80 | weekly | `BreadcrumbList`, `FAQPage` |
| **16** | `/docs` | `src/app/docs/page.tsx` | Documentation & User Guides — DeployCheck | 0.85 | weekly | `BreadcrumbList` |
| **17** | `/docs/api` | `src/app/docs/api/page.tsx` | REST API Reference (/api/v1) — DeployCheck | 0.85 | weekly | `BreadcrumbList` |
| **18** | `/docs/getting-started` | `src/app/docs/getting-started/page.tsx` | Getting Started Guide — Step-by-Step Tutorial | 0.85 | weekly | `BreadcrumbList` |
| **19** | `/tutorials` | `src/app/tutorials/page.tsx` | Developer Tutorials & Architecture Recipes — DeployCheck | 0.75 | weekly | `BreadcrumbList` |
| **20** | `/changelog` | `src/app/changelog/page.tsx` | Changelog & Release Notes — DeployCheck | 0.75 | weekly | `BreadcrumbList` |
| **21** | `/roadmap` | `src/app/roadmap/page.tsx` | Public Roadmap & Milestone Progress — DeployCheck | 0.75 | weekly | `BreadcrumbList` |
| **22** | `/about` | `src/app/about/page.tsx` | About DevSparks India — Company & Mission | 0.70 | monthly | `BreadcrumbList` |
| **23** | `/contact` | `src/app/contact/page.tsx` | Contact DevSparks India — Inquiries & Support | 0.70 | monthly | `BreadcrumbList` |
| **24** | `/community` | `src/app/community/page.tsx` | Developer Community & GitHub Discussions — DeployCheck | 0.70 | monthly | `BreadcrumbList` |
| **25** | `/contribute` | `src/app/contribute/page.tsx` | Contribute to DeployCheck — Open Source Guidelines | 0.70 | monthly | `BreadcrumbList` |
| **26** | `/support` | `src/app/support/page.tsx` | Developer Support & Troubleshooting — DeployCheck | 0.70 | monthly | `BreadcrumbList`, `FAQPage` |
| **27** | `/pricing` | `src/app/pricing/page.tsx` | Pricing & Open Source Plans — DeployCheck | 0.80 | weekly | `BreadcrumbList`, `FAQPage` |
| **28** | `/status` | `src/app/status/page.tsx` | System Status & Telemetry — DeployCheck | 0.70 | daily | `BreadcrumbList` |
| **29** | `/privacy` | `src/app/privacy/page.tsx` | Privacy Policy — DeployCheck by DevSparks India | 0.50 | monthly | `BreadcrumbList` |
| **30** | `/terms` | `src/app/terms/page.tsx` | Terms of Service — DeployCheck by DevSparks India | 0.50 | monthly | `BreadcrumbList` |
| **31** | `/cookies` | `src/app/cookies/page.tsx` | Cookie Policy — DeployCheck by DevSparks India | 0.50 | monthly | `BreadcrumbList` |
| **32** | `/acceptable-use` | `src/app/acceptable-use/page.tsx` | Acceptable Use Policy — DeployCheck | 0.50 | monthly | `BreadcrumbList` |
| **33** | `/security` | `src/app/security/page.tsx` | Security Policy & Responsible Disclosure — DeployCheck | 0.70 | monthly | `BreadcrumbList` |
| **34** | `/license` | `src/app/license/page.tsx` | MIT Open Source License — DeployCheck | 0.50 | yearly | `BreadcrumbList` |

---

## 3. Alias & Redirect Matrix

To guarantee zero dead links between shortened legacy routes and canonical paths, Next.js server redirects are deployed at:

- `/features/audit` &rarr; `/features/pre-deployment-audit`
- `/features/vps` &rarr; `/features/vps-management`
- `/features/deployment` &rarr; `/features/guided-deployment`
- `/features/monitoring` &rarr; `/features/website-monitoring`
- `/solutions/devops` &rarr; `/solutions/devops-teams`
- `/documentation` &rarr; `/docs`

---

## 4. XML Sitemap & Search Crawler Config

- **Dynamic Sitemap Endpoint:** `src/app/sitemap.ts` (`https://deploycheck.devsparks.com/sitemap.xml`)
- **Robots Rules:** `src/app/robots.ts` (`https://deploycheck.devsparks.com/robots.txt`)
  - Allows: Googlebot, Bingbot, OAI-SearchBot, GPTBot, PerplexityBot
  - Disallows: `/app/`, `/api/v1/auth/`, `/reset-password`
- **LLM Context Index:** `public/llms.txt`
