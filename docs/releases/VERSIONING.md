# Versioning and Release Management Standard

**DevSparks DeployCheck** follows strict [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html) practices.

---

## 1. Early Development Phase (`0.x.y`)

During initial development leading up to general availability:
- **`0.y.z`:** Breaking changes or significant feature milestones increment the minor version (`0.1.0` ➔ `0.2.0`).
- **`0.y.z`:** Bug fixes and small non-breaking improvements increment the patch version (`0.1.0` ➔ `0.1.1`).
- The public API is stabilized prior to `1.0.0`.

---

## 2. General Availability (`X.Y.Z`)

Once reaching `1.0.0`:
- **MAJOR (`X`):** Incompatible API changes, breaking database migrations, or deprecated feature removals.
- **MINOR (`Y`):** Backwards-compatible new features, new audit rules, or new non-breaking endpoints.
- **PATCH (`Z`):** Backwards-compatible bug fixes, performance improvements, or security patches.

---

## 3. Git Tagging & GitHub Releases

- Tags use the canonical prefix `vX.Y.Z` (e.g., `v0.1.0-dev`).
- Every GitHub Release must include:
  - Highlights and description of changes.
  - Links to merged pull requests and commit hashes.
  - Database migration instructions (if any).
  - Breaking changes or deprecation notices.
  - Security acknowledgements.

