# Changelog

All notable changes to the **DevSparks DeployCheck** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0-dev] - 2026-11-08

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


