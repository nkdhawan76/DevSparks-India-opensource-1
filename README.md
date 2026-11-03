# DevSparks DeployCheck

> **Prepare, deploy, and maintain applications with confidence.**  
> An open-source developer operations platform by **DevSparks India**.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Theme: Light Only](https://img.shields.io/badge/UI%20Theme-Light%20Only-3563E9.svg)](#uiux-design-principles)
[![Status: Specification & Standards](https://img.shields.io/badge/Status-Specification%20Phase-amber.svg)](#project-status)

---

## 📖 Overview

**DevSparks DeployCheck** is an open-source platform designed to unify pre-deployment auditing, AI-assisted code remediation, policy-governed deployment, and post-deployment website health monitoring. It makes server administration and deployment readiness accessible to developers and small teams without requiring deep DevOps expertise.

### Core Workflow

```text
Connect Project ➔ Audit ➔ Understand Issues ➔ Ask AI for Fix ➔ Review Changes ➔ Run Tests ➔ Approve ➔ Deploy ➔ Monitor ➔ Maintain
```

---

## 🛡️ Core Architecture & Security Invariants

1. **Policy-Controlled AI Invariant:**  
   The platform is **never** an unrestricted AI shell. Model-generated output is never piped directly to a shell. The execution lifecycle is strictly:  
   $$\text{AI Proposes} \longrightarrow \text{Policy Validates} \longrightarrow \text{Authorized Human Approves} \longrightarrow \text{Restricted Runner Executes} \longrightarrow \text{Audit Log Recorded}$$
2. **Strict Light Theme Only:**  
   In compliance with PRD Section 7, DeployCheck is designed exclusively with a crisp, accessible light-theme interface (`#F7F9FC` background, `#FFFFFF` cards, `#172033` primary text, `#3563E9` brand blue). Dark theme tokens, dark panels, and theme toggles are intentionally omitted.
3. **Bring Your Own Key (BYOK):**  
   AI provider credentials (OpenRouter adapter first) are owned by the user, encrypted at rest, and never returned in client bundles, server logs, or prompts. SSH private keys are never transmitted to AI models.
4. **Self-Hosted Open-Source Core:**  
   The core engine operates entirely standalone via Docker Compose with zero mandatory dependency on external cloud services.

---

## 🛠️ Proposed Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Web UI** | Next.js (TypeScript) + Tailwind CSS | Light-themed responsive dashboard, audit viewer, AI chat |
| **API** | Node.js (TypeScript) | Modular monolith architecture with versioned REST API (`/api/v1`) |
| **Database** | PostgreSQL | Relational storage with strict `workspace_id` tenant isolation |
| **Job Queue** | Redis + BullMQ | Isolated background workers for long-running audits and builds |
| **Execution** | Isolated Runner Containers | Sandboxed environment without host Docker socket mounting |
| **AI Layer** | OpenRouter Adapter | BYOK provider abstraction for streaming explanations and diff proposals |

---

## 🗺️ Release Roadmap

- [x] **M0 — Repository Foundation & Governance (Current):** Specifications, Git conventions, CI/CD templates, and review standards.
- [ ] **M1 — Audit Engine MVP:** Project ingestion, dependency analysis, secret pattern detection, and build checks.
- [ ] **M2 — BYOK AI Assistance:** OpenRouter integration, encrypted credential vault, patch proposals, and diff reviews.
- [ ] **M3 — Secure VPS Connections:** Dedicated SSH keys, host-key fingerprint verification, and read-only diagnostics.
- [ ] **M4 — Guided Deployment:** Preflight checks, containerized deployment, health verification, and rollback workflows.
- [ ] **M5 — Monitoring & Maintenance:** HTTP uptime checks, SSL certificate expiry, DNS checks, and alert management.
- [ ] **M6 — Plans & DevSparks Cloud:** Server-side entitlement quotas and managed hosting layer.

---

## 📚 Project Documentation

Comprehensive specifications and operational guides are maintained in the [`docs/`](docs/) directory:

- [**PRD (Product Requirements Document)**](docs/PRD.md)
- [**ARD (Architecture Requirements Document)**](docs/ARD.md)
- [**Consolidated Master Specification**](docs/ARD_PRD_MASTER.md)
- [**External Agent Skills Register**](docs/THIRD_PARTY_SKILLS.md)
- [**Versioning & SemVer Standards**](docs/releases/VERSIONING.md)
- [**Code Review Policy**](docs/development/CODE_REVIEW.md)
- [**Repository Audit**](docs/repository-audit.md)

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting pull requests.

## 📄 License

This project is licensed under the [MIT License](LICENSE) © 2026 DevSparks India.
