# ADR 0003: BYOK AES-256-GCM Encryption at Rest & Key Isolation

## Status
Accepted

## Context
DeployCheck operates on a Bring-Your-Own-Key (BYOK) architecture where workspaces provide their own API keys for LLM providers (e.g., OpenRouter, OpenAI, Anthropic). Storing API keys in plaintext or exposing them in client responses or error logs creates severe credential compromise risks.

## Decision
1. **Authenticated Encryption at Rest:** All BYOK API keys are encrypted using AES-256-GCM authenticated cipher with a 12-byte random initialization vector (IV) and a 16-byte authentication tag.
2. **Key Masking:** In UI presentations and API payloads, raw keys are never returned. Only masked representations (e.g., `sk-o••••••••tsrq`) are provided.
3. **Secret Redaction:** Structured loggers and AI prompt builders automatically sanitize and redact tokens matching API key patterns (`sk-*`, `ghp_*`, `Bearer *`, etc.).
4. **Credential Isolation Invariant:** Private SSH keys and server root credentials are never sent to external AI providers under any circumstances.

## Consequences
- Workspace BYOK keys remain protected against database snapshot leaks and unauthorized inspection.
- Full compliance with GitHub Secret Scanning and Push Protection rules.

