# Changelog

All notable changes to the **DevSparks DeployCheck** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **Developer Signup System & 10,000+ Disposable Email Blocking:**
  - Integrated 10,167 verified disposable email domains (`src/data/disposable-domains.json`) with sub-millisecond in-memory lookup.
  - Implemented domain extraction, subdomain peeling, and inviolable allowlist for legitimate consumer/business email providers (`src/modules/auth/disposable-domains.ts`).
  - Added intelligent client-side email-domain autocomplete component (`src/components/auth/EmailAutocompleteInput.tsx`) offering popular domain suggestions (`gmail.com`, `outlook.com`, `yahoo.com`, `zoho.com`, `proton.me`, etc.) on `@` input with zero third-party latency.
  - Added 5-stage NIST 800-63B passphrase strength meter component (`src/components/auth/PasswordStrengthMeter.tsx`) requiring $\ge 15$ characters and rewarding natural passphrases with spaces.
  - Integrated Have I Been Pwned k-Anonymity API (`src/modules/auth/pwned-password.ts`) with local SHA-1 prefix comparison, 1,500ms timeout guard, and offline fallback cache.
  - Hardened registration route (`POST /api/v1/auth/signup`) with anti-bot honeypot check, client IP extraction, and typed error responses (`DISPOSABLE_EMAIL_NOT_ALLOWED`, `WEAK_PASSWORD`, `COMPROMISED_PASSWORD`).
  - Added Social Login "Coming Soon" indicators on signup page for GitHub and Google with disabled states.
  - Created Admin Email Protection Management UI (`/app/settings/email-protection`) featuring live statistics, interactive domain test sandbox, and manual allowlist/blocklist override controls.
  - Added PostgreSQL migration `migrations/0002_disposable_email_protection.sql` and database client repository methods.
  - Added upstream blocklist sync script (`scripts/sync-disposable-domains.mjs`) and weekly GitHub Actions workflow (`.github/workflows/disposable-domains-sync.yml`).
  - Added comprehensive documentation: `docs/AUTHENTICATION.md`, `docs/EMAIL_PROTECTION.md`, and `docs/PASSWORD_SECURITY.md`.
  - Added automated test suite `scripts/verify-signup-security.mjs` verifying all 10 security invariants.

---

## [0.1.0-alpha.1] - 2026-11-08

### Security & Vulnerability Remediation
- **Remediated CodeQL Alert #4 (Polynomial ReDoS in Email Validation):**
  - Replaced naive unbounded regular expression in `src/modules/auth/service.ts` with `isValidEmail()`.
  - Enforced RFC 5321 length limits (maximum 254 characters total, 64 local, 253 domain) and linear token validation executing in $0.11\text{ms}$ with zero catastrophic backtracking.
  - Added unit test coverage in `scripts/verify-codeql-fixes.mjs` verifying rejection of oversized and repeated adversarial character payloads.
- **Remediated CodeQL Alert #3 (DOM Text Reinterpreted as HTML / DOM XSS):**
  - Implemented `getSafeMonitoringUrl()` in `src/components/views/MonitoringView.tsx` with a strict protocol whitelist (only `http:` and `https:` permitted).
  - Explicitly sanitized dynamic link interpolation, rejecting `javascript:`, `data:`, `vbscript:`, and unparseable inputs.
  - Added server-side protocol verification in `src/app/api/v1/monitoring/targets/route.ts` to block non-HTTP/HTTPS destinations before SSRF evaluation.
- **Dependency Security Upgrades (0 Vulnerabilities in `npm audit`):**
  - Upgraded Next.js from `14.2.35` to `15.5.29` (maintained security backport), resolving 1 Critical and multiple High advisories (GHSA-9g9p-9gw9-jx7f, GHSA-h25m-26qc-wcjf, GHSA-ggv3-7p47-pfv8, GHSA-p293-qw3h-jr36).
  - Upgraded Zod to `^4.6.7`, remediating high-severity memory exhaustion vulnerability (GHSA-mrhx-c7xc-m3w5).
  - Upgraded `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` to `^8.72.1` paired with `minimatch@^11.0.5` override, eliminating glob amplification DoS (GHSA-g3hv-75wg-m249).
- **Reverse-Proxy-Aware Client IP Resolver:**
  - Implemented `resolveClientIp` in `src/lib/ip-resolver.js` removing reliance on deprecated `NextRequest.ip`.
  - Added IP address format validation and multi-hop `x-forwarded-for` leftmost IP extraction for brute-force rate-limiting in `src/app/api/v1/auth/login/route.ts`.

### Added
- **Complete Public Marketing Website (34 Unique Routes):**
  - Homepage (`/`) with Hero dashboard preview, architecture timeline, integration grid, and FAQ.
  - 8 Feature Pages: Pre-deployment Audit (`/features/pre-deployment-audit`), AI Assistant (`/features/ai-assistant`), VPS Management (`/features/vps-management`), Guided Deployment (`/features/guided-deployment`), Website Monitoring (`/features/website-monitoring`), Maintenance (`/features/maintenance`), Container Scanning (`/features/container-scanning`), and Multi-Region Probes (`/features/multi-region-monitoring`).
  - 5 Solution Pages: Developers (`/solutions/developers`), DevOps Teams (`/solutions/devops-teams`), Agencies (`/solutions/agencies`), Startups (`/solutions/startups`), and Security & Reliability (`/solutions/security-reliability`).
  - 6 Resource & Doc Pages: Documentation index (`/docs`), API Reference (`/docs/api`), Getting Started (`/docs/getting-started`), Tutorials (`/tutorials`), Changelog (`/changelog`), and Roadmap (`/roadmap`).
  - 5 Company Pages: About (`/about`), Contact (`/contact` with interactive client validation), Community (`/community`), Contribute (`/contribute`), and Support (`/support`).
  - 6 Legal & Compliance Pages: Privacy Policy (`/privacy`), Terms of Service (`/terms`), Cookie Policy (`/cookies`), Acceptable Use (`/acceptable-use`), Security (`/security`), and License (`/license`).
- **Interactive Global Navigation & Modern Mega Menu:**
  - Three-column mega menus (`ProductMegaMenu`, `SolutionsMegaMenu`, `ResourcesMegaMenu`) with full-width bottom discovery bar.
  - Sticky glassmorphic pill header with GSAP entrance and dynamic scroll elevation.
  - Standalone vector brand component (`DeployCheckLogo`) in `src/components/common/Icons.tsx` replacing previous icon container with crisp 32px circular `#5938F5` badge.
  - Mobile navigation drawer with animated overlay, collapsible sections, and direct GitHub links.
- **Automated GitHub Release & CI/CD Governance:**
  - Configured automated GitHub Release publication (`.github/workflows/release.yml`) triggered on verified semantic version tags (`v*`).
  - Added GitHub Release notes category mapping in `.github/release.yml`.
  - Grouped Dependabot configuration in `.github/dependabot.yml` separating production from development updates.
  - Added comprehensive security runbooks: `docs/SECURITY_BASELINE.md`, `docs/GITHUB_SECURITY_SETTINGS.md`, `docs/PR_TRIAGE.md`, and `docs/GITHUB_RELEASE_PROCESS.md`.

### Changed
- Enforced strict ESLint maximum warnings threshold (`--max-warnings 0`) across all TypeScript and TSX files.
- Added custom fractional spacing utilities (`4.5`, `5.5`, `6.5`, `7.5`) to `tailwind.config.ts`.
- Configured `.eslintrc.json` with browser environment and ignore patterns for auto-generated files.

### Added
- **Database-Backed Authentication & Route Protection:**
  - Implemented secure `AuthService` in `src/modules/auth/service.ts` using `scrypt` hashing with unique cryptographic salt, SHA-256 session token hashing, IP-based brute-force rate-limiting, and default least-privilege role assignment (`DEVELOPER`).
  - Added Next.js Edge Middleware (`src/middleware.ts`) enforcing authenticated access on all `/app/*` routes and protected `/api/v1/*` endpoints, with automatic redirection to `/login?redirect=...`.
  - Built dedicated auth layout (`src/components/layouts/AuthLayout.tsx`) and auth routes (`/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-email`) completely decoupled from authenticated application navigation.
  - Implemented 13-test automated authentication verification suite in `scripts/verify-auth.mjs`.
- **Real-Time Data Integration (Zero Fabricated Data):**
  - Built live Project API endpoints (`GET /api/v1/projects` & `POST /api/v1/projects`) backed by database client `dbClient`, allowing dynamic project registration and live tracking.
  - Added live VPS Server Management API (`GET /api/v1/servers` & `POST /api/v1/servers`) and live host diagnostic metrics (`GET /api/v1/servers/diagnostics`) utilizing Node.js `os` system telemetry (CPU usage, memory allocation, uptime).
  - Connected `GET /api/v1/audits` and `POST /api/v1/audits` to read and scan genuine repository files on disk deterministically, recording audit runs and findings to `dbClient`.
  - Connected `GET /api/v1/deployments` and `POST /api/v1/deployments` with release tracking and instant rollback verification.
  - Connected `src/app/app/dashboard/page.tsx` and `DashboardView.tsx` with live data aggregations, dynamic KPI counts, and an interactive SVG donut chart for project health breakdown.
- **21st.dev Component Engineering CLI:**
  - Integrated `@21st-dev/cli` globally and configured in `package.json` devDependencies with authenticated token in `~/.config/21st/auth.json`.
- **Brand Identity & Favicon:**
  - Integrated purple squircle `Zap` brand vector in `public/icon.svg` and `public/favicon.ico`.
  - Permanently fixed desktop sidebar width to `w-[270px]` with visible `DeployCheck By DevSparks India` attribution.

### Changed
- **Eradication of AI-Generated Emoji Icons:**
  - Systematically replaced all prototype emoji characters (`📊`, `📁`, `🛡️`, `✨`, `🖥️`, `🚀`, `📡`, `📜`, `📈`, `🤖`, `👥`, `🔑`, `💳`, `👑`, `💻`, `🔍`, `✅`, `❌`, `👋`, `⚡`, `⚠️`) across 15 views and modals with the unified Lucide outline SVG suite in `src/components/common/Icons.tsx`.
  - Updated `CommandPalette.tsx`, `DiffReviewModal.tsx`, `AiAssistantView.tsx`, `AuditReportsView.tsx`, `AuthView.tsx`, `DashboardView.tsx`, `DeploymentsView.tsx`, `LogsSeoView.tsx`, `MonitoringView.tsx`, `PlansBillingView.tsx`, `ProjectsView.tsx`, `ServersView.tsx`, `SettingsView.tsx`, `SshConsoleView.tsx`, and `UsersRolesView.tsx`.
- **UI Design System Refinement:**
  - Enforced Strict Light Theme palette (`#F7F8FC` canvas, `#FFFFFF` cards, `#17172A` text, `#5938F5` brand purple accent) across all views and modals without dark-mode toggles or dark surfaces.

### Security Hardening
- **Credential Isolation Verification:** Confirmed `.env` and `.env*.local` are strictly excluded from version control and verified with Rule CFG-001 in `scripts/run-audit.mjs`.
- **Host Key & SSRF Validation:** Enforced host verification on server node connections and private IP range filtering in synthetic monitoring probes.

---

## [0.1.0-dev] - 2026-11-04

### Added
- **Core Verification Suite:** Established deterministic 15-test invariant suite in `scripts/verify-mvp.mjs` covering AES-256-GCM encryption, key masking, secret redaction, audit rules, entitlements, AI patch generator, Docker rules, RBAC isolation, SSE streaming, SSRF guards, deployment rollbacks, synthetic monitoring, and webhook dispatching.
- **Pre-Deployment Audit Engine:** Implemented policy-controlled audit engine (`scripts/run-audit.mjs`) scanning 93 files with 0 critical/high findings and 100% deployment readiness.
- **Database Schema & Migrations:** Created PostgreSQL migration (`migrations/0001_initial_schema.sql`) defining 21 relational entities conforming to ARD Section 13 with automated SQL parser and migration runner (`src/db/migrate.ts`).
- **Interactive UI Connectors:** Connected Next.js dashboard (`src/app/page.tsx`) to live `/api/v1/health` polling, `/api/v1/audits` execution, and `/api/v1/ai/explain` real-time SSE streaming.
- **Authentic Visual Showcase:** Integrated 20 verified light-theme product mockups in `UI Design/` cataloged in `README.md`.
- **Documentation Suite:** Established production-grade `README.md`, `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`, `docs/ROADMAP.md`, `docs/THIRD_PARTY_SKILLS.md`, `docs/api/openapi.yaml`, `docs/releases/VERSIONING.md`, and `docs/development/CODE_REVIEW.md`.

### Security Hardening
- **CodeQL Remediation:** Eliminated polynomial ReDoS (CodeQL Alert #1) in `src/core/logger.ts` by replacing unbounded regex with deterministic $O(n)$ string-searching scanner `redactPemKeys()`.
- **Dependency Upgrades:** Upgraded `next` to `^14.2.35`, `zod` to `^3.24.2`, and `postcss` to `^8.5.3`. Configured npm `overrides: { "postcss": "^8.5.3" }` in `package.json` to eliminate nested vulnerable PostCSS instances.
- **Attack Surface Elimination:** Eradicated `vitest`, `tinypool`, `vite`, `launch-editor`, `esbuild`, and `@vitest/mocker` from `package-lock.json`, closing over 15 Dependabot advisories.

### Changed
- **Lint Guard Hardening:** Replaced SSE constant condition loop in `src/app/page.tsx` with guarded boolean flag to enforce zero-failure ESLint compliance.


