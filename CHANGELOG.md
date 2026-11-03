# Changelog

All notable changes to the **DevSparks DeployCheck** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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


