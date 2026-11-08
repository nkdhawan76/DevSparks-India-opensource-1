## Summary of Changes

<!-- Provide a clear, high-level summary of what this pull request introduces or fixes. -->

### Related Issue
Closes # <!-- Link related issue if applicable, e.g., Closes #42 -->

---

## Root Cause & Motivation

<!-- What was the underlying root cause of the bug, or the technical motivation for this feature? -->

---

## Implementation Details

<!-- Outline the technical approach, architectural decisions, and key files modified. -->

---

## Security Impact & Invariant Verification

- [ ] **Strict Light Theme Only (Rule 1):** Verified zero dark mode tokens, dark surfaces, or theme toggles. Palette strictly adheres to `#5938F5` (purple), `#F7F8FC` (canvas), `#FFFFFF` (cards), `#17172A` (text), and `#E5E7EB` (border).
- [ ] **Policy-Controlled AI (Rule 2):** Model operations propose structured JSON patches only. No unrestricted shell execution.
- [ ] **Truth in Engineering (Rule 3):** No fabricated metrics, mock data, or artificial commits.
- [ ] **Credential Isolation (Rule 4):** No `.env` files, API keys, private keys, or plaintext secrets committed or returned in API responses.
- [ ] **Evidence-Based Quality (Rule 6):** Local test suite passed with verified output before requesting review.
- [ ] **Zero-Failure CI (Rule 7):** All prerequisite configurations, lockfiles, and workflows pass with 0 errors and 0 warnings.

---

## Type of Change

- [ ] `fix(security)`: Vulnerability remediation or defensive hardening
- [ ] `feat`: New user-facing feature or API capability
- [ ] `fix`: Bug fix
- [ ] `build(deps)`: Dependency upgrade or security patch
- [ ] `ci`: Workflow, action, or build infrastructure change
- [ ] `docs`: Documentation, runbook, or specification update
- [ ] `refactor`: Internal code refactoring without behavior change

---

## Verification Evidence & Test Output

Please paste observed terminal command results:
- `npm run typecheck` output:
- `npx eslint . --ext .ts,.tsx --max-warnings 0` output:
- `node scripts/verify-mvp.mjs` output:
- `npm audit` output:

---

## Reviewer Checklist

- [ ] Verified diff contains no extraneous or unintended file modifications.
- [ ] Verified input validation, parameter boundaries, and SSRF guards where applicable.
- [ ] Confirmed `CHANGELOG.md` entry added under `[Unreleased]`.
- [ ] Verified responsive layout and accessibility guards.
