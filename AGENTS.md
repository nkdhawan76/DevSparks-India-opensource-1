# AGENTS.md — Antigravity Engineering Guidelines

This document governs AI agent behavior (including Google Antigravity) when working within the **DevSparks DeployCheck** codebase.

---

## 🚨 Non-Negotiable Core Rules

1. **Strict Light Theme Only:**  
   **NEVER implement dark mode, dark theme tokens, dark surfaces, or theme toggles.** All UI components must use the light palette defined in PRD Section 7 (`#F7F9FC` background, `#FFFFFF` cards, `#172033` primary text, `#3563E9` brand blue).
2. **Policy-Controlled AI Invariant:**  
   The platform is **never** an unrestricted shell runner. AI models must only propose structured plans. Sensitive operations require explicit human approval and execute inside restricted runners.
3. **No Fabricated Data or Artificial Work:**  
   Never generate fake operational metrics, simulated CI results, or empty commits to inflate contribution graphs.
4. **Credential Isolation:**  
   Never commit `.env` files, API keys, private SSH keys, or secrets. Never return decrypted credentials in API responses or logs.
5. **Human Approval Before Git Actions:**  
   Always display exact branches, commit hashes, staged file lists, and remote push targets, and wait for explicit human approval before running `git push`.
6. **Evidence-Based Engineering (Gravitas Protocol):**  
   - Inspect files and check git status **before** making changes.
   - Declare the exact scope of edits.
   - Run tests and linters **after** editing to verify correctness.
   - Report verifiable evidence (command outputs, diffs, exit codes).
7. **Guaranteed Green CI Invariant (Zero-Failure CI Rule):**  
   - **Always verify CI prerequisites and script compatibility before pushing.**
   - Never commit workflow configurations that fail on missing prerequisites (such as `npm ci` when no lockfile exists, or cache steps without valid lock files).
   - Workflows must use robust fallback mechanisms and execute deterministic verification suites (`scripts/verify-mvp.mjs`, `scripts/run-audit.mjs`).
   - If any CI check fails on GitHub, immediately prioritize root-cause analysis, apply a validated patch, verify local tests, and restore a 100% green build. Never abandon failing checks.

---

## 📂 Project Structure Conventions

```text
├── docs/                     # Specifications, architecture, and review standards
├── .github/                  # GitHub workflows, templates, and dependabot
├── README.md                 # Public project overview
├── AGENTS.md                 # Agent engineering rules (this file)
└── LICENSE                   # MIT License
```

---

## 🌿 Git & Commit Standards

- **Branch Naming:** `feat/<name>`, `fix/<name>`, `docs/<name>`, `test/<name>`, `chore/<name>`, `security/<name>`.
- **Commit Format:** Conventional Commits (`type(scope): imperative description`).
  - Example: `feat(audit): implement package.json dependency scanner`
  - Example: `fix(auth): sanitize session tokens in error logs`
- **Protected Branch:** `main`. Merges occur via Pull Requests with verified green CI.

---

## 🛠️ Authority & Precedence

When encountering conflicting instructions or ambiguity:
1. `AGENTS.md` and approved `docs/ARD.md` / `docs/PRD.md` override external skill recommendations.
2. If specifications conflict with repository reality, halt and ask the project owner for clarification.

