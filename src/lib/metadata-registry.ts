export interface RouteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  category: "product" | "solutions" | "resources" | "company" | "legal" | "utility";
  keywords?: string[];
  breadcrumbs: { name: string; path: string }[];
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://deploycheck.devsparks.com";
export const BRAND_NAME = "DeployCheck";
export const COMPANY_NAME = "DevSparks India";
export const BRAND_SLOGAN = "Audit, Fix, Deploy and Monitor Your Applications";

export const METADATA_REGISTRY: Record<string, RouteMetadata> = {
  "/": {
    title: "DeployCheck — Developer Operations Platform | By DevSparks India",
    description: "Open-source developer operations platform for automated pre-deployment audits, BYOK AI patch suggestions, guided VPS deployments, and uptime telemetry.",
    canonicalPath: "/",
    category: "product",
    keywords: ["developer operations", "pre-deployment audit", "BYOK AI", "VPS deployment", "website monitoring", "open source devops"],
    breadcrumbs: [{ name: "Home", path: "/" }],
  },
  "/product": {
    title: "Product Overview — Complete Deployment Workflow | DeployCheck",
    description: "Explore the unified DeployCheck platform: code audits, AI coding assistance with BYOK, guided Linux VPS deployment, and production synthetic monitoring.",
    canonicalPath: "/product",
    category: "product",
    keywords: ["devops platform", "vps automation", "code audit", "deployment workflow"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }],
  },
  "/features/pre-deployment-audit": {
    title: "Pre-deployment Audit — Static Security & Config Scanner | DeployCheck",
    description: "Scan application dependencies, detect exposed secrets, validate environment variables, and inspect Docker configurations before code reaches production.",
    canonicalPath: "/features/pre-deployment-audit",
    category: "product",
    keywords: ["pre-deployment audit", "static analysis", "secret scanning", "docker check", "security audit"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "Pre-deployment Audit", path: "/features/pre-deployment-audit" }],
  },
  "/features/ai-assistant": {
    title: "AI Assistant (BYOK) — Approval-Controlled Code Review | DeployCheck",
    description: "Explain errors and review suggested code diffs using your own OpenRouter AI key. Zero unrestricted shell access; every change requires explicit human approval.",
    canonicalPath: "/features/ai-assistant",
    category: "product",
    keywords: ["BYOK AI", "OpenRouter", "AI coding assistant", "code diff review", "policy controlled AI"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "AI Assistant", path: "/features/ai-assistant" }],
  },
  "/features/vps-management": {
    title: "VPS Management — Linux Server Diagnostics & Inventory | DeployCheck",
    description: "Connect and monitor your Linux VPS nodes over SSH with host key verification. Inspect resource utilization and diagnose operational incidents with policy controls.",
    canonicalPath: "/features/vps-management",
    category: "product",
    keywords: ["vps management", "ssh server assistant", "linux monitoring", "server inventory"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "VPS Management", path: "/features/vps-management" }],
  },
  "/features/guided-deployment": {
    title: "Guided Deployment — Safe Release Pipelines & Rollbacks | DeployCheck",
    description: "Deploy supported Node.js, Next.js, and static web apps with preflight verification, build pipelines, health checks, and verified rollbacks.",
    canonicalPath: "/features/guided-deployment",
    category: "product",
    keywords: ["guided deployment", "release pipeline", "zero downtime rollback", "preflight checks"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "Guided Deployment", path: "/features/guided-deployment" }],
  },
  "/features/website-monitoring": {
    title: "Website Monitoring — Synthetic Probes & SSL Uptime Telemetry | DeployCheck",
    description: "Monitor website availability, response latency, TLS certificate validity, and DNS resolution with instant incident alert dispatch.",
    canonicalPath: "/features/website-monitoring",
    category: "product",
    keywords: ["website monitoring", "uptime telemetry", "ssl monitoring", "incident alerts", "synthetic probes"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "Website Monitoring", path: "/features/website-monitoring" }],
  },
  "/features/maintenance": {
    title: "Maintenance & Backups — Scheduled Health Tasks | DeployCheck",
    description: "Automate log rotation, temp cleanup, system package updates, and database backups with human approval for risky state mutations.",
    canonicalPath: "/features/maintenance",
    category: "product",
    keywords: ["server maintenance", "automated backup", "log rotation", "maintenance tasks"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "Maintenance", path: "/features/maintenance" }],
  },
  "/features/container-scanning": {
    title: "Container Registry Scanning (Planned) | DeployCheck",
    description: "Planned feature (Milestone 7): Scan container base images, Dockerfile configurations, and CVE vulnerabilities prior to cluster dispatch.",
    canonicalPath: "/features/container-scanning",
    category: "product",
    keywords: ["container scanning", "docker CVE", "registry scanner"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "Container Scanning (Planned)", path: "/features/container-scanning" }],
  },
  "/features/multi-region-monitoring": {
    title: "Multi-Region Probes (Planned) | DeployCheck",
    description: "Planned feature (Milestone 8): Global synthetic monitoring probes across North America, Europe, and Asia-Pacific datacenters.",
    canonicalPath: "/features/multi-region-monitoring",
    category: "product",
    keywords: ["multi-region probes", "global uptime", "distributed monitoring"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Product", path: "/product" }, { name: "Multi-Region Probes (Planned)", path: "/features/multi-region-monitoring" }],
  },
  "/solutions/developers": {
    title: "DeployCheck for Developers — Frictionless Audit & Deployment",
    description: "Eliminate deployment anxiety. Audit your code locally, fix security issues with AI assistance, and deploy to your own servers with confidence.",
    canonicalPath: "/solutions/developers",
    category: "solutions",
    keywords: ["for developers", "developer workflows", "git deployment", "self-host"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions/developers" }, { name: "For Developers", path: "/solutions/developers" }],
  },
  "/solutions/devops-teams": {
    title: "DeployCheck for DevOps Teams — Standardized Server Governance",
    description: "Unify server inventory, policy-governed deployment pipelines, and uptime telemetry across self-hosted and cloud infrastructures.",
    canonicalPath: "/solutions/devops-teams",
    category: "solutions",
    keywords: ["for devops", "server governance", "infrastructure automation"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions/developers" }, { name: "For DevOps Teams", path: "/solutions/devops-teams" }],
  },
  "/solutions/agencies": {
    title: "DeployCheck for Agencies — Multi-Client Workspace Management",
    description: "Manage multiple client repositories, isolated VPS deployments, and separate uptime monitoring alerts under one organized dashboard.",
    canonicalPath: "/solutions/agencies",
    category: "solutions",
    keywords: ["for agencies", "client management", "multi-tenant devops"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions/developers" }, { name: "For Agencies", path: "/solutions/agencies" }],
  },
  "/solutions/startups": {
    title: "DeployCheck for Startups — High Velocity Without DevOps Overhead",
    description: "Ship fast with enterprise-grade deployment controls, automated preflight audits, and synthetic monitoring on affordable VPS hardware.",
    canonicalPath: "/solutions/startups",
    category: "solutions",
    keywords: ["for startups", "lean devops", "low overhead deployment"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions/developers" }, { name: "For Startups", path: "/solutions/startups" }],
  },
  "/solutions/security-reliability": {
    title: "DeployCheck for Security & Reliability — Zero Blindspots",
    description: "Enforce strict pre-deployment checks, credential AES-256 encryption, human-approved AI operations, and 24/7 endpoint availability telemetry.",
    canonicalPath: "/solutions/security-reliability",
    category: "solutions",
    keywords: ["security and reliability", "appsec", "policy runners", "uptime assurance"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions/developers" }, { name: "Security & Reliability", path: "/solutions/security-reliability" }],
  },
  "/docs": {
    title: "Documentation & User Guides — DeployCheck",
    description: "Comprehensive installation, configuration, CLI usage, and architecture documentation for DeployCheck developer operations platform.",
    canonicalPath: "/docs",
    category: "resources",
    keywords: ["documentation", "user guide", "installation", "deploycheck docs"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Resources", path: "/docs" }, { name: "Documentation", path: "/docs" }],
  },
  "/docs/api": {
    title: "REST API Reference (/api/v1) — DeployCheck",
    description: "Explore the DeployCheck RESTful API endpoints, request/response JSON schemas, authentication session models, and webhook contracts.",
    canonicalPath: "/docs/api",
    category: "resources",
    keywords: ["api reference", "rest api", "openapi", "api/v1"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Resources", path: "/docs" }, { name: "API Reference", path: "/docs/api" }],
  },
  "/docs/getting-started": {
    title: "Getting Started Guide — Step-by-Step Tutorial | DeployCheck",
    description: "Step-by-step walkthrough to clone, configure environment variables, run database migrations, and execute your first application audit in 5 minutes.",
    canonicalPath: "/docs/getting-started",
    category: "resources",
    keywords: ["getting started", "quickstart", "tutorial", "first audit"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Resources", path: "/docs" }, { name: "Getting Started", path: "/docs/getting-started" }],
  },
  "/tutorials": {
    title: "Developer Tutorials & Architecture Recipes — DeployCheck",
    description: "Practical guides for setting up GitHub Actions CI/CD, configuring Linux VPS servers, integrating OpenRouter BYOK, and monitoring SSL certs.",
    canonicalPath: "/tutorials",
    category: "resources",
    keywords: ["tutorials", "devops guides", "vps setup guide", "github actions"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Resources", path: "/docs" }, { name: "Tutorials", path: "/tutorials" }],
  },
  "/changelog": {
    title: "Changelog & Release Notes — DeployCheck",
    description: "Read the genuine versioned release notes, audit rule updates, bug fixes, and feature releases from the DeployCheck engineering team.",
    canonicalPath: "/changelog",
    category: "resources",
    keywords: ["changelog", "release notes", "version history", "updates"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Resources", path: "/docs" }, { name: "Changelog", path: "/changelog" }],
  },
  "/roadmap": {
    title: "Public Roadmap & Milestone Progress — DeployCheck",
    description: "Transparent view of completed, in-progress, and planned milestones from M0 Foundation to M9 Cloud SaaS for DevSparks DeployCheck.",
    canonicalPath: "/roadmap",
    category: "resources",
    keywords: ["roadmap", "milestones", "product development", "feature plans"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Resources", path: "/docs" }, { name: "Roadmap", path: "/roadmap" }],
  },
  "/about": {
    title: "About DevSparks India — Company & Mission | DeployCheck",
    description: "Learn about DevSparks India, our mission to democratize enterprise-grade developer operations, and our commitment to transparent open source software.",
    canonicalPath: "/about",
    category: "company",
    keywords: ["about devsparks india", "open source company", "mission"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Company", path: "/about" }, { name: "About Us", path: "/about" }],
  },
  "/contact": {
    title: "Contact DevSparks India — Inquiries & Support | DeployCheck",
    description: "Get in touch with the DevSparks DeployCheck engineering team for technical inquiries, enterprise partnerships, and project feedback.",
    canonicalPath: "/contact",
    category: "company",
    keywords: ["contact", "support", "inquiry", "devsparks email"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Company", path: "/about" }, { name: "Contact", path: "/contact" }],
  },
  "/community": {
    title: "Developer Community & GitHub Discussions — DeployCheck",
    description: "Join fellow developers, ask architectural questions, share deployment runbooks, and discuss roadmap ideas on GitHub Discussions.",
    canonicalPath: "/community",
    category: "company",
    keywords: ["community", "github discussions", "developer forum"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Company", path: "/about" }, { name: "Community", path: "/community" }],
  },
  "/contribute": {
    title: "Contribute to DeployCheck — Open Source Guidelines",
    description: "Learn how to fork, develop, test, and submit pull requests to the open-source DevSparks DeployCheck repository.",
    canonicalPath: "/contribute",
    category: "company",
    keywords: ["contribute", "open source", "pull requests", "github repo"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Company", path: "/about" }, { name: "Contribute", path: "/contribute" }],
  },
  "/support": {
    title: "Developer Support & Troubleshooting — DeployCheck",
    description: "Find answers to common questions, operational troubleshooting steps, and official support contact channels.",
    canonicalPath: "/support",
    category: "company",
    keywords: ["support", "troubleshooting", "helpdesk", "faq"],
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Company", path: "/about" }, { name: "Support", path: "/support" }],
  },
  "/privacy": {
    title: "Privacy Policy — DeployCheck by DevSparks India",
    description: "How DeployCheck handles account information, telemetry, and encrypted user credentials with strict data isolation.",
    canonicalPath: "/privacy",
    category: "legal",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Legal", path: "/privacy" }, { name: "Privacy Policy", path: "/privacy" }],
  },
  "/terms": {
    title: "Terms of Service — DeployCheck by DevSparks India",
    description: "Terms governing usage of DeployCheck open-source software, cloud services, and community participation.",
    canonicalPath: "/terms",
    category: "legal",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Legal", path: "/privacy" }, { name: "Terms of Service", path: "/terms" }],
  },
  "/cookies": {
    title: "Cookie Policy — DeployCheck by DevSparks India",
    description: "Information about essential session authentication cookies used by the DeployCheck platform.",
    canonicalPath: "/cookies",
    category: "legal",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Legal", path: "/privacy" }, { name: "Cookie Policy", path: "/cookies" }],
  },
  "/acceptable-use": {
    title: "Acceptable Use Policy — DeployCheck",
    description: "Standards and guidelines for acceptable usage of the DeployCheck platform, API endpoints, and monitoring infrastructure.",
    canonicalPath: "/acceptable-use",
    category: "legal",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Legal", path: "/privacy" }, { name: "Acceptable Use", path: "/acceptable-use" }],
  },
  "/security": {
    title: "Security Policy & Responsible Disclosure — DeployCheck",
    description: "DeployCheck security architecture, AES-256 encryption, credential isolation, and responsible vulnerability reporting guidelines.",
    canonicalPath: "/security",
    category: "legal",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Legal", path: "/privacy" }, { name: "Security Policy", path: "/security" }],
  },
  "/license": {
    title: "MIT Open Source License — DeployCheck",
    description: "Full text of the official MIT License governing DevSparks DeployCheck open-source software repository.",
    canonicalPath: "/license",
    category: "legal",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Legal", path: "/privacy" }, { name: "License", path: "/license" }],
  },
  "/pricing": {
    title: "Pricing & Open Source Plans — DeployCheck",
    description: "100% free open-source core with self-hosted sovereignty. Transparent team tiers and upcoming cloud plans.",
    canonicalPath: "/pricing",
    category: "utility",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }],
  },
  "/status": {
    title: "System Status & Telemetry — DeployCheck",
    description: "Real-time health, operational metrics, datacenter latency, and uptime telemetry for the DeployCheck infrastructure.",
    canonicalPath: "/status",
    category: "utility",
    breadcrumbs: [{ name: "Home", path: "/" }, { name: "Status", path: "/status" }],
  },
};

export function getRouteMetadata(pathname: string): RouteMetadata {
  return (
    METADATA_REGISTRY[pathname] || {
      title: `${BRAND_NAME} — Developer Operations Platform | By ${COMPANY_NAME}`,
      description: "Open-source developer operations platform for auditing, AI-assisted development, secure deployment, and website monitoring.",
      canonicalPath: pathname,
      category: "product",
      breadcrumbs: [{ name: "Home", path: "/" }],
    }
  );
}

