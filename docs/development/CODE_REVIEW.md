# Code Review & Quality Policy

This guide outlines our code review standards for all pull requests submitted to **DevSparks DeployCheck**.

---

## Reviewer Checklist

Before approving any pull request, reviewers must verify:

### 1. Architectural Integrity
- [ ] Change strictly adheres to module boundaries outlined in `docs/ARD.md`.
- [ ] No direct shell execution from AI model text.
- [ ] Multi-tenant isolation verified: `workspace_id` scoped on all database queries and authorization middleware.

### 2. UI / UX Standards (Strict Light Theme)
- [ ] **Zero Dark Mode:** The UI must be strictly light-themed (`#F7F9FC` background, `#FFFFFF` cards, `#3563E9` accents).
- [ ] No dark mode tokens, dark backgrounds on KPI panels, or dark charts.
- [ ] Accessible typography, clear contrast ratios, and visible focus states.
- [ ] Truthful metrics: No fabricated charts or simulated operational data.

### 3. Security & Privacy
- [ ] No credentials, `.env` files, or private keys committed.
- [ ] SQL queries parameterized; user inputs validated with schema libraries.
- [ ] Sensitive tokens redacted from error traces and logs.
- [ ] Safe runner execution: No Docker socket mounting in user code containers.

### 4. Code Quality & Testing
- [ ] Conventional Commits used for all commits.
- [ ] Unit or integration tests accompany every functional change.
- [ ] All CI checks pass cleanly.
- [ ] No breaking API changes without explicit documentation and deprecation notice.

