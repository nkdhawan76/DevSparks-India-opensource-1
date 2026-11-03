# API Error Standards

DevSparks DeployCheck uses standard HTTP status codes paired with structured, machine-readable JSON error responses.

---

## Error Schema

```json
{
  "error": {
    "code": "ENTITLEMENT_DENIED",
    "message": "Access to feature 'deployment.vps' is denied by workspace entitlements.",
    "details": {
      "feature": "deployment.vps"
    }
  }
}
```

---

## Standard Error Codes

| Code | HTTP Status | Description |
| :--- | :---: | :--- |
| `UNAUTHORIZED` | `401` | Missing or invalid authentication token. |
| `FORBIDDEN` | `403` | User lacks required role permissions within the workspace. |
| `NOT_FOUND` | `404` | Requested project, audit, or server resource was not found. |
| `VALIDATION_FAILED` | `400` | Request parameters failed schema validation. |
| `ENTITLEMENT_DENIED` | `403` | Feature is gated by workspace plan or quota exceeded. |
| `AUDIT_FAILED` | `500` | Static analysis worker encountered an execution error. |
| `INTERNAL_ERROR` | `500` | Unhandled server error. |
