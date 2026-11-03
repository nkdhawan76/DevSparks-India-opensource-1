# API Rate Limits and Quota Management

Rate limits protect the DevSparks DeployCheck control plane, runner queues, and external AI providers from denial-of-service and abuse.

---

## 1. Rate Limit Headers

Every API response returns standard rate-limiting headers:

```http
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 115
X-RateLimit-Reset: 1730650000
```

When a rate limit is exceeded, the server returns HTTP `429 Too Many Requests` with a `Retry-After` header indicating seconds until requests can resume.

---

## 2. Default Limits (Self-Hosted Standard)

- **General REST Reads:** 120 requests / minute per IP / session.
- **Audit Submissions:** 10 audit runs / minute per workspace.
- **AI Requests:** 20 requests / minute per workspace (subject to upstream BYOK provider rate limits).
