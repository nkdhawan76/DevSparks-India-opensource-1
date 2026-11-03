# API Authentication & Credential Management

**DevSparks DeployCheck** uses multi-layered authentication and token management designed to prevent credential exposure.

---

## 1. User & Session Authentication

All REST endpoints under `/api/v1` require session authentication via secure cookies or a Bearer token:

```http
Authorization: Bearer <session_token>
```

- **Sessions:** Session hashes are verified against the PostgreSQL `sessions` entity.
- **Tenant Scope:** Every authenticated session is associated with an active workspace membership.

---

## 2. Bring Your Own Key (BYOK) AI Credentials

AI provider keys (e.g. OpenRouter) are user-owned:

1. Keys are submitted via `POST /api/v1/ai/connections`.
2. The control plane encrypts the key immediately using **AES-256-GCM** authenticated encryption.
3. Raw API keys are **never** stored in plaintext, never printed to application logs, and never returned in API payloads.
4. Client interfaces receive a masked representation (`sk-or••••••••1234`).
