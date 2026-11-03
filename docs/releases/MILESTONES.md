# Product Milestones & Definition of Done — DevSparks DeployCheck

This document tracks the phased milestones for the DevSparks DeployCheck platform as established in the Architecture Requirements Document (ARD) and Product Requirements Document (PRD).

---

## Definition of Done (DoD)

A milestone or feature is considered **Done** only when:
1. **Implementation:** Code is implemented in accordance with approved ARD/PRD specifications.
2. **Light Theme Only:** Strict compliance with the Light Theme Only design system (`#F7F9FC` background, `#FFFFFF` cards, `#172033` primary text, `#3563E9` brand blue). Zero dark theme tokens or toggles.
3. **Deterministic Testing:** Local verification test suites pass completely (`scripts/verify-mvp.mjs`).
4. **Pre-Deployment Audit:** Scanner reports 0 critical or high issues (`scripts/run-audit.mjs`).
5. **CI/CD Quality Gate:** GitHub Actions CI Pipeline and CodeQL Security Scan report 100% green builds.
6. **Documentation & API:** OpenAPI 3.1 specifications and documentation updated in `docs/api/`.
7. **Conventional Commits:** Merged to `main` with standard conventional commit messages.

---

## Roadmap Milestones

### 🏁 Milestone M0: Repository Foundation & Governance (Completed)
- **Scope:** Git initialization, remote connection, governance standards, skill registry, GitHub workflows.
- **Deliverables:**
  - `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, `CHANGELOG.md`, `LICENSE` (MIT).
  - GitHub issue templates (`bug_report.yml`, `feature_request.yml`, `documentation.yml`, `config.yml`) and `PULL_REQUEST_TEMPLATE.md`.
  - `.github/workflows/ci.yml`, `.github/workflows/security.yml`, `.github/dependabot.yml`.
  - Seven Antigravity agent skills configured in `.agents/skills/`.
- **Status:** **COMPLETED** (Green CI verified on `main`).

---

### 🛡️ Milestone M1: Pre-Deployment Audit Engine MVP (Completed)
- **Scope:** Application scaffold, Audit Engine core, rule detectors, light-theme Super Admin Dashboard.
- **Deliverables:**
  - Next.js 14 App Router scaffold with strict light theme.
  - Audit Engine (`src/modules/audit/engine.ts`).
  - Five core audit rules:
    - `StackDetectorRule`: Node.js, Next.js, package managers.
    - `SecretScannerRule`: AWS, Stripe, GitHub tokens, private keys.
    - `DependencyCheckerRule`: Wildcard dependencies, install scripts.
    - `EnvCheckerRule`: Committed `.env` files and missing production variables.
    - `DockerCheckerRule`: Unpinned `:latest` tags, root `USER`, missing `HEALTHCHECK`.
  - CLI pre-deployment auditor: `scripts/run-audit.mjs`.
  - Pixel-accurate Super Admin Dashboard matching `UI Design/` mockups.
- **Status:** **COMPLETED** (Green CI verified on `main`).

---

### 🤖 Milestone M2: BYOK AI Assistance & Remediation (Completed)
- **Scope:** Bring-Your-Own-Key LLM integration, encrypted storage, prompt sanitization, structured patch proposals.
- **Deliverables:**
  - AES-256-GCM authenticated encryption at rest for provider credentials.
  - Key masking (`sk-o••••••••tsrq`) and secret redaction logger.
  - OpenRouter adapter generating structured diff proposals.
  - Interactive Side-by-Side Visual Diff Review Modal with human approval gate.
  - Server-Sent Events (SSE) streaming endpoint (`POST /api/v1/ai/explain`).
  - Feature Entitlements service (`src/modules/entitlements/`).
  - Multi-layer RBAC authorization and tenant isolation matrix (`src/modules/rbac/`).
  - OpenAPI 3.1 specification (`docs/api/openapi.yaml`) and example payloads.
- **Status:** **COMPLETED** (Green CI verified on `main`).

---

### 🔒 Milestone M3: Secure Server & VPS Connections (Completed)
- **Scope:** SSH connection testing, host key verification, credential isolation, and diagnostic inspection.
- **Deliverables:**
  - `src/modules/server/ssrf-guard.ts`: Strict SSRF protection blocking loopback (`127.0.0.0/8`, `::1`) and cloud metadata (`169.254.169.254`, `169.254.0.0/16`).
  - `src/modules/server/policy-gateway.ts`: Command evaluation gateway separating read-only diagnostics from gated mutations, blocking destructive commands (`rm -rf /`, `mkfs`, fork bombs).
  - `src/app/api/v1/servers/validate/route.ts`: Pre-flight server connection validator.
  - `src/app/api/v1/servers/diagnostics/route.ts`: System resource telemetry (CPU, RAM, disk, uptime, active containers).
- **Status:** **COMPLETED** (Green CI verified on `main`).

---

### 🚀 Milestone M4: Guided Policy-Controlled Deployment (Completed)
- **Scope:** Automated deployment scripts, rollback triggers, and deployment history logs.
- **Deliverables:**
  - `src/modules/deployment/pipeline.ts`: Policy-governed deployment orchestrator enforcing pre-deploy audit gating and sequential steps.
  - Automatic rollback engine restoring previous stable snapshot upon health check probe failure.
  - `src/app/api/v1/deployments/route.ts`: Deployment lifecycle triggers (`POST`) and cursor-paginated deployment history (`GET`).
- **Status:** **COMPLETED** (Green CI verified on `main`).

---

### 📊 Milestone M5: Post-Deployment Monitoring & Maintenance (Completed)
- **Scope:** Synthetic health check scheduler, uptime tracking, alert notifications.
- **Deliverables:**
  - `src/modules/monitoring/engine.ts`: Multi-probe engine (HTTP, TCP, TLS certs) with failure threshold state transitions (`HEALTHY`, `DEGRADED`, `DOWN`).
  - Automated alert generator dispatching `DOWN` and `RECOVERED` events.
  - Telemetry analytics calculating uptime percentage, average response latency, and p95 latency.
  - `src/app/api/v1/monitoring/targets/route.ts` & `src/app/api/v1/monitoring/checks/route.ts`.
- **Status:** **COMPLETED** (Green CI verified on `main`).

---

### ☁️ Milestone M6: Plans & DevSparks Cloud (Completed)
- **Scope:** Multi-tenant workspace quotas, enterprise audit retention, team collaboration, plan tier matrix.
- **Deliverables:**
  - `src/modules/entitlements/service.ts`: Multi-tier plan definitions (`free`, `pro`, `enterprise`, `self_hosted_standard`).
  - Server quota gating (`maxServers`) and monitoring target quota gating (`maxMonitors`).
  - `src/app/api/v1/workspaces/plan/route.ts`: Workspace plan details, feature flags, and usage quota tracking.
- **Status:** **COMPLETED** (Green CI verified on `main`).

