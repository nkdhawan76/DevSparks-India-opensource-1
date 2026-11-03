## Description

<!-- Provide a clear summary of changes and the problem solved. -->

Closes # <!-- Link related issue if applicable -->

---

## Type of Change

- [ ] `feat`: New feature or capability
- [ ] `fix`: Bug fix
- [ ] `docs`: Documentation update
- [ ] `refactor`: Code refactoring without behavior change
- [ ] `test`: New or updated tests
- [ ] `security`: Security remediation or hardening
- [ ] `chore`: Build tooling or maintenance

---

## Invariant & Quality Checklist

Please confirm each item before requesting review:

- [ ] **Light Theme Only:** Verified that NO dark theme tokens, dark surfaces, or theme toggles are introduced. UI adheres strictly to the light palette (`#F7F9FC` background, `#FFFFFF` cards, `#3563E9` accents).
- [ ] **No Hardcoded Secrets:** Verified that no `.env` files, API keys, private keys, or credentials are committed.
- [ ] **Tests Added / Passing:** Unit, integration, or fixture tests added or verified for this change.
- [ ] **Type Check & Lint:** Passed `typecheck` and `lint` without errors or warnings.
- [ ] **Documentation Updated:** `docs/`, OpenAPI specs, or README updated if applicable.
- [ ] **Conventional Commit:** PR title and commit messages adhere to Conventional Commits format.

