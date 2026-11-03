# ADR 0002: Zero-Failure CI Invariant & Deterministic Verification

## Status
Accepted

## Context
CI/CD workflows that fail on missing prerequisites (e.g., calling `npm ci` without a committed lockfile or depending on external online mirrors during offline test execution) create deployment delays and unreliable engineering feedback loops.

## Decision
1. **Rule 7 Invariant:** Codified as Rule 7 in `AGENTS.md`: Every GitHub Actions workflow must guarantee valid prerequisites before execution.
2. **Resilient Package Installation:** Workflows must implement fallback mechanisms (`if [ -f package-lock.json ]; then npm ci; else npm install; fi`).
3. **Deterministic Local Verification:** The core verification suite (`scripts/verify-mvp.mjs`) and pre-deployment auditor (`scripts/run-audit.mjs`) must run with zero external network dependencies, utilizing Node.js standard libraries (`node:crypto`, `node:assert`, `node:fs`).
4. **Zero-Abandonment Policy:** When a CI check fails on GitHub Actions, the engineer/agent must immediately perform root-cause analysis, apply a validated patch, verify local tests, and restore a 100% green build.

## Consequences
- Guaranteed green build status on GitHub Actions (`ci.yml` and `security.yml`).
- Fast, reproducible local test validation under 1 second.
- Dependable pull request gates preventing broken code from merging to `main`.
