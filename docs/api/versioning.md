# API Versioning Policy

All public endpoints are versioned in the URI path:

```text
/api/v1/...
```

---

## 1. Backwards Compatibility Rules

The following changes are considered backwards-compatible within a major version (e.g. `v1`):
- Adding new endpoints.
- Adding new optional request query parameters or request body fields.
- Adding new fields to response JSON objects.
- Introducing new audit rules or finding severity categories.

The following changes require a new API version (e.g. `v2`):
- Removing or renaming an existing endpoint.
- Changing required fields in request bodies.
- Changing the data type of an existing field.
- Changing HTTP status codes for existing failure modes.

---

## 2. Deprecation Schedule

When an endpoint is scheduled for deprecation:
1. It is marked as `deprecated: true` in `docs/api/openapi.yaml`.
2. A `Deprecation: true` response header is added.
3. The endpoint remains functional for at least one minor release cycle before removal.

