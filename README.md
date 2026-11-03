# DevSparks DeployCheck

<div align="center">

**Prepare, deploy, and maintain applications with confidence.**  
*An open-source developer operations platform by **DevSparks India**.*

[![CI Pipeline](https://github.com/nkdhawan76/DevSparks-India-opensource-1/actions/workflows/ci.yml/badge.svg)](https://github.com/nkdhawan76/DevSparks-India-opensource-1/actions/workflows/ci.yml)
[![Security Analysis](https://github.com/nkdhawan76/DevSparks-India-opensource-1/actions/workflows/security.yml/badge.svg)](https://github.com/nkdhawan76/DevSparks-India-opensource-1/actions/workflows/security.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933.svg)](package.json)
[![UI Theme](https://img.shields.io/badge/UI%20Theme-Strict%20Light%20Only-3563E9.svg)](#uiux-design-principles)
[![Test Suite](https://img.shields.io/badge/Tests-15%2F15%20Passing-16803D.svg)](scripts/verify-mvp.mjs)

[**Explore Documentation**](docs/) • [**Architecture Spec**](docs/ARCHITECTURE.md) • [**API Reference**](docs/api/openapi.yaml) • [**Contributing**](CONTRIBUTING.md) • [**Roadmap**](docs/ROADMAP.md)

</div>

---

## 📑 Table of Contents

- [About DevSparks DeployCheck](#-about-devsparks-deploycheck)
  - [The Developer Problem](#the-developer-problem)
  - [Our Philosophy](#our-philosophy)
- [Core Product Workflow](#-core-product-workflow)
- [Features & Implementation Status](#-features--implementation-status)
- [Platform Architecture](#-platform-architecture)
- [Security & Invariants](#-security--invariants)
- [Technology Stack](#-technology-stack)
- [Visual Walkthrough & Screenshots](#-visual-walkthrough--screenshots)
- [Project Directory Structure](#-project-directory-structure)
- [Installation & Quick Start](#-installation--quick-start)
- [Environment Configuration](#-environment-configuration)
- [Bring Your Own Key (BYOK) AI Setup](#-bring-your-own-key-byok-ai-setup)
- [API Documentation](#-api-documentation)
- [Development Guide](#-development-guide)
- [Roadmap & Milestones](#-roadmap--milestones)
- [Contributing](#-contributing)
- [Security Reporting](#-security-reporting)
- [License & Attribution](#-license--attribution)
- [DevSparks India](#-devsparks-india)

---

## 📖 About DevSparks DeployCheck

**DevSparks DeployCheck** is an open-source developer operations platform engineered to make production readiness, pre-deployment security auditing, AI-assisted code remediation, server configuration, and post-deployment monitoring accessible to developers and growing engineering teams.

### The Developer Problem
Solo developers and small engineering teams frequently ship applications with preventable configuration failures:
- Hardcoded secrets and live API tokens committed into Git history.
- Missing production environment variables that trigger immediate runtime crashes.
- Unpinned or vulnerable dependencies that break container builds.
- Destructive commands executed on live production servers during manual deployments.
- Silent post-deployment outages with no automated synthetic health verification or instant rollback.

DeployCheck solves this by establishing a **guarded, pre-flight gatekeeper**: scanning code before deployment, generating policy-controlled AI patches with side-by-side human review, orchestrating atomic VPS deployments with automated health rollback, and continuously probing live endpoints.

### Our Philosophy
1. **Self-Hosted Open-Source Core:** The entire platform runs locally or self-hosted via standard Node.js and PostgreSQL with zero mandatory cloud lock-in.
2. **Bring Your Own Key (BYOK) AI:** Users retain full ownership and privacy over their AI credentials. All keys are encrypted at rest with AES-256-GCM.
3. **Policy-Controlled Automation:** AI models propose structured diffs, but never execute shell commands directly. Sensitive mutations require explicit human review and approval.
4. **Strict Light Theme Only:** Built exclusively with a crisp, accessible light-theme interface (`#F7F9FC` background, `#FFFFFF` cards, `#172033` primary text, `#3563E9` brand blue). Zero dark theme tokens or toggles.

---

## 🔄 Core Product Workflow

```mermaid
flowchart TD
    A["1. Connect Project\n(Git / Upload / CLI)"] --> B["2. Pre-Deployment Audit\n(Secrets, Deps, Docker, Env)"]
    B --> C{"Findings Detected?"}
    C -- "No Findings (Ready)" --> G["5. Policy Deployment Gate\n(Preflight Checks Passed)"]
    C -- "Findings Detected" --> D["3. AI Remediation (BYOK)\n(Streaming Explanation & Patch)"]
    D --> E["4. Visual Diff Review Modal\n(Human Approval Gate)"]
    E -- "Rejected / Revised" --> D
    E -- "Approved by Human" --> F["Run Local Tests\n(Deterministic Verification)"]
    F --> G
    G --> H["6. Guided VPS Deployment\n(Sequential Build & Container Step)"]
    H --> I["7. Synthetic Health Probes\n(HTTP / TCP / TLS Verification)"]
    I -- "Health Probe Passed" --> J["8. Service LIVE\n(Continuous Synthetic Monitoring)"]
    I -- "Health Probe Failed" --> K["Automatic Rollback\n(Previous Stable Release Restored)"]
```

---

## ⚡ Features & Implementation Status

| Feature Area | Description | Implementation Status |
| :--- | :--- | :---: |
| **Pre-Deployment Audit Engine** | Detects exposed secrets, AWS/Stripe tokens, dependency discrepancies, missing environment variables, and Docker best practices. | **✅ Implemented** |
| **BYOK AI Assistance** | OpenRouter integration with token usage tracking and AES-256-GCM authenticated cipher encryption. | **✅ Implemented** |
| **Visual Diff Review Modal** | Side-by-side before/after code viewer with explicit human approval state machine. | **✅ Implemented** |
| **Policy Gateway Command Filter** | Prohibits destructive shell commands (`rm -rf /`, formatting) and gates mutations behind authorization. | **✅ Implemented** |
| **SSRF & Loopback Guard** | Blocks loopback (`127.0.0.1`) and cloud metadata endpoints (`169.254.169.254`) prior to socket connections. | **✅ Implemented** |
| **Guided VPS Deployment Pipeline** | Atomic deployment runner with pre-deploy audit gating and automatic rollback upon health probe failure. | **✅ Implemented** |
| **Synthetic Health Monitoring** | Multi-target HTTP/TCP probes with consecutive failure thresholds (`HEALTHY` ➔ `DEGRADED` ➔ `DOWN`). | **✅ Implemented** |
| **Outgoing Webhook Dispatcher** | Dispatches alert payloads to Slack, Discord, and Generic webhooks with HMAC-SHA256 signatures. | **✅ Implemented** |
| **Multi-Tier Plan Gating** | Enforces resource quotas for `free`, `pro`, `enterprise`, and `self_hosted_standard` workspace tiers. | **✅ Implemented** |
| **PostgreSQL Schema (21 Tables)** | Full migration schema mapping identity, projects, audits, servers, deployments, and incidents. | **✅ Implemented** |
| **Live API Dashboard Controls** | Interactive dashboard with live health polling, live audit runner, and SSE AI stream reader. | **✅ Implemented** |
| **Multi-Region Distributed Probes** | Geographically distributed synthetic probe runners across global regions. | **⏳ Planned** |
| **Container Registry Vulnerability Scan**| In-depth container image vulnerability scanning and automated SBOM generation. | **⏳ Planned** |

---

## 🏗️ Platform Architecture

```mermaid
graph TD
    subgraph Presentation["Presentation Layer (Strict Light Theme)"]
        Dashboard["Next.js 14 Dashboard\n(#F7F9FC Surface / #3563E9 Accents)"]
        CLI["DeployCheck CLI\n(Developer Workstation)"]
    end

    subgraph APIPlane["API Control Plane (/api/v1)"]
        AuthMiddleware["Auth Middleware & RBAC Evaluator\n(6 Roles / 16 Permissions)"]
        RouteHandlers["Next.js Route Handlers\n(Audits, Servers, Deployments, AI, Health)"]
    end

    subgraph CoreServices["Modular Monolith Services"]
        AuditEngine["Audit Engine\n(5 Static Analysis Rules)"]
        AIEngine["AI BYOK Engine\n(OpenRouter / AES-256-GCM)"]
        PolicyGW["Server Policy Gateway\n(SSRF Guard / Command Filter)"]
        DeployPipe["Deployment Pipeline\n(State Machine / Auto-Rollback)"]
        MonitorEngine["Synthetic Monitor & Alerts\n(Probes / Webhook Dispatcher)"]
        Entitlements["Entitlements Service\n(Tier Quota Gating)"]
    end

    subgraph Storage["Persistence Layer"]
        Postgres[(PostgreSQL Relational DB\n21 ARD Schema Tables)]
        SecretVault[(Encrypted Secret Vault\nAES-256-GCM Cipher)]
    end

    subgraph Targets["Target Infrastructure"]
        VPS["Target VPS / Servers\n(Port 22 SSH / Tailscale)"]
    end

    Dashboard --> RouteHandlers
    CLI --> RouteHandlers
    RouteHandlers --> AuthMiddleware
    AuthMiddleware --> CoreServices
    CoreServices --> Postgres
    CoreServices --> SecretVault
    CoreServices --> VPS
```

---

## 🔒 Security & Invariants

DevSparks DeployCheck enforces four non-negotiable security invariants:

1. **Policy-Controlled AI Invariant:** AI models only propose structured diff proposals. Under no circumstances does model output pipe directly to a system shell. Sensitive mutations require explicit operator approval through the visual diff review modal.
2. **BYOK Secret Encryption (AES-256-GCM):** API keys are encrypted at rest with authenticated AES-256-GCM using a 256-bit derived key. Keys are masked (`sk-o••••••••tsrq`) for display. Raw keys are never output in logs or client-facing responses. Private SSH keys are never transmitted to AI models.
3. **SSRF Guard & Network Isolation:** All target server hostnames and webhook destinations are validated before socket creation. Loopback addresses (`127.0.0.0/8`, `localhost`) and cloud instance metadata endpoints (`169.254.169.254`, `metadata.google.internal`) are blocked.
4. **Zero-Failure CI Rule:** Every workflow execution is strictly deterministic. Pull requests and commits must maintain 100% green builds across all verification suites.

---

## 💻 Technology Stack

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router) | `14.2.18` | Light-themed responsive dashboard, diff viewer, charts |
| **UI Library** | React | `18.3.1` | Component lifecycle, interactive modals, client-side streaming |
| **Styling** | Tailwind CSS | `3.4.15` | Strict Light Theme tokens (`#F7F9FC`, `#FFFFFF`, `#172033`) |
| **Language** | TypeScript | `5.6.3` | End-to-end static typing across UI, API, and core modules |
| **Runtime** | Node.js | `>=20.0.0 LTS`| Modular monolith execution environment |
| **Database** | PostgreSQL | `>=14.0` | 21 relational tables with tenant boundary isolation |
| **Encryption** | `node:crypto` AES-256-GCM | Native | Authenticated cipher for BYOK API keys and server secrets |
| **AI Provider Adapter** | OpenRouter Client | BYOK | LLM access for code remediation and diagnostic explanations |
| **Verification Runner**| Node Test Harness | Native | Zero-dependency deterministic verification suite |
| **Linting & Quality** | ESLint + TypeScript ESLint | `8.57.1` | Static code analysis and type invariant checking |

---

## 📸 Visual Walkthrough & Screenshots

All interface mockups adhere strictly to the **Strict Light Theme Only** design system:

| Dashboard View | Mockup File | Description |
| :--- | :--- | :--- |
| **Super Admin Dashboard** | [`UI Design/Super Admin Dashboard with Sidebar Toggle.png`](UI%20Design/Super%20Admin%20Dashboard%20with%20Sidebar%20Toggle.png) | Unified KPI cards, project health doughnut chart, and trend line. |
| **Project Workspace** | [`UI Design/DevSparks Project Dashboard.png`](UI%20Design/DevSparks%20Project%20Dashboard.png) | Workspace overview with project metrics, status badges, and quick actions. |
| **Pre-Deployment Audits** | [`UI Design/DevSparks Audit Report Dashboard.png`](UI%20Design/DevSparks%20Audit%20Report%20Dashboard.png) | Static analysis findings grouped by Critical, High, and Warnings. |
| **AI Deployment & Remediation** | [`UI Design/DevSparks AI Deployment Dashboard.png`](UI%20Design/DevSparks%20AI%20Deployment%20Dashboard.png) | Side-by-side visual diff review modal with human approval gate. |
| **Deployment Pipelines** | [`UI Design/DevSparks DeployCheck Deployments Dashboard.png`](UI%20Design/DevSparks%20DeployCheck%20Deployments%20Dashboard.png) | Deployment step tracker, release history, and rollback states. |
| **Synthetic Monitoring** | [`UI Design/DevSparks DeployCheck Monitoring Dashboard.png`](UI%20Design/DevSparks%20DeployCheck%20Monitoring%20Dashboard.png) | Uptime %, p95 latency, probe response status, and incident ledger. |
| **VPS Server Management** | [`UI Design/DevSparks VPS Server Management Dashboard.png`](UI%20Design/DevSparks%20VPS%20Server%20Management%20Dashboard.png) | Connected servers, host-key fingerprints, and policy gateway status. |
| **SSH Web Console** | [`UI Design/DevSparks SSH Console Dashboard.png`](UI%20Design/DevSparks%20SSH%20Console%20Dashboard.png) | Policy-governed web terminal with command allowlisting and live redaction. |
| **System & Deployment Logs** | [`UI Design/DevSparks DeployCheck Logs Dashboard.png`](UI%20Design/DevSparks%20DeployCheck%20Logs%20Dashboard.png) | Structured log viewer with level filtering, auto-scroll, and secret masking. |
| **Logs & SEO Analytics** | [`UI Design/DevSparks Logs and SEO Dashboard.png`](UI%20Design/DevSparks%20Logs%20and%20SEO%20Dashboard.png) | Search engine crawl analytics, status code distributions, and bot traffic audits. |
| **Users Management** | [`UI Design/DevSparks Users Management Dashboard.png`](UI%20Design/DevSparks%20Users%20Management%20Dashboard.png) | Workspace team members, permission roles, and activity audits. |
| **Roles & Permissions** | [`UI Design/DevSparks Roles & Permissions Dashboard.png`](UI%20Design/DevSparks%20Roles%20%26%20Permissions%20Dashboard.png) | Granular RBAC permissions matrix across workspace and server resources. |
| **Plans & Billing** | [`UI Design/DevSparks DeployCheck Plans & Billing Dashboard.png`](UI%20Design/DevSparks%20DeployCheck%20Plans%20%26%20Billing%20Dashboard.png) | Tier comparison (Starter, Pro, Team, Enterprise) and active quota usage. |
| **Subscription Management** | [`UI Design/DevSparks Subscription Management Dashboard.png`](UI%20Design/DevSparks%20Subscription%20Management%20Dashboard.png) | Workspace billing cycles, payment methods, and automated invoice history. |
| **Notifications Center** | [`UI Design/DevSparks DeployCheck Notifications Dashboard.png`](UI%20Design/DevSparks%20DeployCheck%20Notifications%20Dashboard.png) | Multi-channel alert preferences, incident notifications, and audit webhooks. |
| **Workspace Settings** | [`UI Design/DevSparks DeployCheck Settings Dashboard.png`](UI%20Design/DevSparks%20DeployCheck%20Settings%20Dashboard.png) | Global organization configurations, Git integrations, and BYOK AI provider tokens. |
| **Website Settings** | [`UI Design/DevSparks Website Settings Dashboard.png`](UI%20Design/DevSparks%20Website%20Settings%20Dashboard.png) | Custom domain mapping, SSL certificate automation, and reverse proxy rules. |
| **Profile Settings** | [`UI Design/DevSparks Profile Settings Dashboard.png`](UI%20Design/DevSparks%20Profile%20Settings%20Dashboard.png) | User profile details, session activity, and personal credentials. |
| **Authentication & Onboarding** | [`UI Design/DevSparks DeployCheck Login and Signup Mockup.png`](UI%20Design/DevSparks%20DeployCheck%20Login%20and%20Signup%20Mockup.png) | Clean developer sign-in, MFA verification, and workspace registration. |
| **Project Setup Wizard** | [`UI Design/DevSparks DeployCheck Project Setup.png`](UI%20Design/DevSparks%20DeployCheck%20Project%20Setup.png) | Step-by-step repository connection, stack detection, and initial audit baseline. |

---

## 📁 Project Directory Structure

```text
devsparks-deploycheck/
├── .agents/skills/              # Antigravity agent skills (hallmark, ponytail, gravitas, etc.)
├── .github/
│   ├── ISSUE_TEMPLATE/          # Issue templates (bug, feature, documentation)
│   ├── workflows/
│   │   ├── ci.yml               # Node 20 CI (Lint, Typecheck, 15 Tests, Audit, Build)
│   │   └── security.yml         # CodeQL static application security testing
│   ├── dependabot.yml           # Automated dependency updates
│   └── PULL_REQUEST_TEMPLATE.md # Standard PR checklist
├── docs/
│   ├── api/                     # OpenAPI 3.1 specification and endpoint documentation
│   │   ├── examples/            # Request/response JSON payloads
│   │   └── openapi.yaml         # Complete REST API specification
│   ├── decisions/               # Architectural Decision Records (ADRs 0001–0005)
│   ├── development/             # Code review guidelines (CODE_REVIEW.md)
│   ├── releases/                # Release milestones (MILESTONES.md, VERSIONING.md)
│   ├── ARCHITECTURE.md          # Architecture overview and Mermaid diagrams
│   ├── ARD.md                   # Complete Architecture Requirements Document
│   ├── DEVELOPMENT.md           # Local development guide
│   ├── PRD.md                   # Product Requirements Document
│   ├── ROADMAP.md               # Implementation roadmap
│   └── THIRD_PARTY_SKILLS.md    # External skills register
├── migrations/
│   └── 0001_initial_schema.sql  # PostgreSQL initial migration (21 relational entities)
├── scripts/
│   ├── run-audit.mjs            # Static pre-deployment auditor runner
│   └── verify-mvp.mjs           # Deterministic 15-test invariant verification suite
├── src/
│   ├── app/                     # Next.js App Router (UI & API Route Handlers)
│   │   ├── api/v1/              # Versioned REST API endpoints
│   │   │   ├── ai/              # /api/v1/ai/connections, /api/v1/ai/explain
│   │   │   ├── audits/          # /api/v1/audits (POST run, GET paginated)
│   │   │   ├── deployments/     # /api/v1/deployments (POST create, GET list)
│   │   │   ├── health/          # /api/v1/health (System status & invariants)
│   │   │   ├── monitoring/      # /api/v1/monitoring/targets, /checks
│   │   │   ├── servers/         # /api/v1/servers/validate, /diagnostics
│   │   │   └── workspaces/      # /api/v1/workspaces/plan
│   │   ├── globals.css          # Tailwind CSS base and strict light tokens
│   │   ├── layout.tsx           # Root light layout wrapper
│   │   └── page.tsx             # Interactive dashboard UI with live API integrations
│   ├── core/                    # Core error classes and sensitive secret redaction logger
│   ├── db/                      # PostgreSQL client repository and migration runner
│   └── modules/                 # Modular monolith business logic
│       ├── ai/                  # AES-256-GCM vault, key masking, OpenRouter client
│       ├── audit/               # Static audit engine and 5 rule scanners
│       ├── deployment/          # Deployment pipeline state machine & auto-rollback
│       ├── entitlements/        # Multi-tier plans & resource quota gating
│       ├── monitoring/          # Synthetic probe tracker & webhook dispatcher
│       ├── rbac/                # Role-based authorization & tenant isolation matrix
│       └── server/              # SSRF guard & policy gateway command filter
├── UI Design/                   # 20 verified light-theme product mockups
├── .editorconfig                # Universal indentation and whitespace formatting
├── .env.example                 # Environment configuration template
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore patterns (strict secret isolation)
├── AGENTS.md                    # Antigravity agent engineering guidelines
├── CHANGELOG.md                 # Semantic version changelog
├── CODE_OF_CONDUCT.md           # Contributor Covenant Code of Conduct
├── CONTRIBUTING.md              # Contribution standards and PR guidelines
├── LICENSE                      # MIT License
├── package.json                 # Project dependencies and script declarations
├── package-lock.json            # Deterministic dependency lockfile
├── SECURITY.md                  # Security vulnerability reporting policy
├── SUPPORT.md                   # Community assistance and support channels
└── tsconfig.json                # TypeScript strict compiler configuration
```

---

## 🚀 Installation & Quick Start

### 1. Prerequisites
- **Node.js:** `>= 20.0.0 LTS`
- **npm:** `>= 10.0.0`
- **Git:** `>= 2.30.0`

### 2. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/nkdhawan76/DevSparks-India-opensource-1.git
cd DevSparks-India-opensource-1

# Copy environment configuration template
cp .env.example .env.local

# Install dependencies deterministically
npm install
```

### 3. Verify Codebase Invariants
```bash
# Run the 15-test deterministic MVP verification suite
npm test

# Run the static pre-deployment auditor
npm run audit

# Run TypeScript type checking
npm run typecheck

# Run ESLint analysis
npm run lint
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env.local` to configure local runtime settings. **Never commit `.env` or real API credentials to version control.**

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Local application port | `3000` |
| `NODE_ENV` | Runtime environment (`development`, `production`) | `development` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/deploycheck_dev` |
| `DEPLOYCHECK_MASTER_ENCRYPTION_KEY` | 32-byte secret salt for AES-256-GCM cipher | `devsparks-deploycheck-dev-secret-salt-32b` |
| `OPENROUTER_API_KEY` | BYOK OpenRouter API token for AI assistance | *(User provided)* |
| `OPENROUTER_DEFAULT_MODEL` | Default model identifier | `meta-llama/llama-3-8b-instruct:free` |
| `NEXT_PUBLIC_APP_URL` | Base application URL | `http://localhost:3000` |
| `MONITORING_PROBE_TIMEOUT_MS` | Timeout for synthetic HTTP probes | `5000` |

---

## 🤖 Bring Your Own Key (BYOK) AI Setup

DevSparks DeployCheck uses a **Bring Your Own Key** model for AI-powered diagnostics:

1. **Obtain an API Key:** Sign up at [OpenRouter](https://openrouter.ai/) and generate a secret key.
2. **Configure in Settings:** In the DeployCheck Dashboard, navigate to **Settings › AI Provider** or add `OPENROUTER_API_KEY` to `.env.local`.
3. **Encryption at Rest:** Your key is immediately encrypted using AES-256-GCM before being persisted.
4. **Token Cost Awareness:** DeployCheck tracks input and output tokens per request. You are only billed directly by your chosen provider.

---

## 📡 API Documentation

The REST API contract is documented using **OpenAPI 3.1** at [`docs/api/openapi.yaml`](docs/api/openapi.yaml).

### Core Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Control plane health and architectural invariant verification |
| `POST` | `/api/v1/audits` | Trigger pre-deployment static analysis audit on ingested files |
| `GET` | `/api/v1/audits` | List historical audits with cursor-based pagination |
| `POST` | `/api/v1/ai/connections` | Securely register an encrypted BYOK AI provider credential |
| `POST` | `/api/v1/ai/explain` | Generate AI remediation proposal with Server-Sent Events (SSE) streaming |
| `POST` | `/api/v1/servers/validate` | SSRF-guarded validation of server host and SSH port |
| `GET` | `/api/v1/servers/diagnostics` | Retrieve server uptime, disk, and memory diagnostics |
| `POST` | `/api/v1/deployments` | Initiate guided policy-controlled deployment pipeline |
| `GET` | `/api/v1/monitoring/targets` | List monitored website endpoints and health states |
| `GET` | `/api/v1/workspaces/plan` | Query workspace plan tier and resource quota entitlements |

---

## 🛠️ Development Guide

For local development setup, coding guidelines, and PR checklists, refer to [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md).

### Code Review Invariants
- **Strict Light Theme Only:** Zero dark mode classes, dark backgrounds, or theme toggles.
- **Evidence-Based Engineering:** Verify Git status before changes, report diffs, and substantiate claims with observed test outputs.
- **Guaranteed Green CI:** Never commit configurations that fail on missing prerequisites. Restore 100% green builds immediately if checks fail.

---

## 🗺️ Roadmap & Milestones

The product follows a verified phased roadmap detailed in [`docs/ROADMAP.md`](docs/ROADMAP.md):

- [x] **Milestone M0: Foundation & Governance** — Repository standards, light theme tokens, CI/CD, and ADRs.
- [x] **Milestone M1: Audit Engine MVP** — Static analysis rule engine (secrets, deps, docker, env).
- [x] **Milestone M2: BYOK AI Assistance** — OpenRouter client, AES-256-GCM cipher, and visual diff reviews.
- [x] **Milestone M3: Secure Server Connections** — SSRF guard, policy gateway command filter, and diagnostics.
- [x] **Milestone M4: Guided Deployment** — Pre-deploy audit gating, build steps, and automatic health rollback.
- [x] **Milestone M5: Synthetic Monitoring** — HTTP/TCP health probes, uptime metrics, and webhook dispatching.
- [x] **Milestone M6: Multi-Tier Plans & Quotas** — Free, Pro, Enterprise plans, and PostgreSQL migration schema.
- [ ] **Milestone M7: Container Registry Scanning** — Image vulnerability scanning and automated SBOMs.
- [ ] **Milestone M8: Multi-Region Probes** — Geographically distributed synthetic probe runners.
- [ ] **Milestone M9: DevSparks Cloud Control Plane** — Managed multi-tenant SaaS hosting.

---

## 🤝 Contributing

Contributions are warmly welcomed from developers of all experience levels!

1. Fork the repository and create your feature branch: `git checkout -b feat/my-new-feature`.
2. Ensure all tests and linting pass: `npm test && npm run audit && npm run typecheck && npm run lint`.
3. Commit your changes using Conventional Commits: `git commit -m 'feat(audit): add nginx configuration rule'`.
4. Push to your branch and open a Pull Request.

Please review our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 🛡️ Security Reporting

Security is central to DeployCheck. If you discover a vulnerability, please review our [Security Policy](SECURITY.md) and submit a private report via GitHub Security Advisories or email [security@devsparksindia.com](mailto:security@devsparksindia.com). Please do **not** report security vulnerabilities via public GitHub issues.

---

## 📄 License & Attribution

DevSparks DeployCheck is licensed under the [MIT License](LICENSE) © 2026 DevSparks India.

Third-party dependencies and agent skills are documented in [`docs/THIRD_PARTY_SKILLS.md`](docs/THIRD_PARTY_SKILLS.md).

---

## ⚡ DevSparks India

DevSparks DeployCheck is proudly designed, maintained, and open-sourced by **DevSparks India**.

- **Website:** [https://devsparksindia.com](https://devsparksindia.com)
- **GitHub:** [@nkdhawan76](https://github.com/nkdhawan76)
- **Project Repository:** [nkdhawan76/DevSparks-India-opensource-1](https://github.com/nkdhawan76/DevSparks-India-opensource-1)
- **Contact:** [support@devsparksindia.com](mailto:support@devsparksindia.com)
