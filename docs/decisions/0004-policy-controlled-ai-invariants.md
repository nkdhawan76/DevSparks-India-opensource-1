# ADR 0004: Policy-Controlled AI Invariants & Patch Approvals

## Status
Accepted

## Context
Treating AI-generated text as executable shell commands or allowing models unrestricted autonomous access to production servers risks destructive accidents, prompt injections, and security perimeter breaches.

## Decision
1. **No Unrestricted Shell Runners:** AI models are never piped directly into a terminal shell.
2. **Structured Patch Proposals Only:** AI assistance is restricted to generating structured diff proposals (`{ targetFile, originalCode, replacementCode, rationale }`).
3. **Mandatory Human-in-the-Loop Approval:** No code modification, deployment action, or operational server mutation can occur without explicit human approval via the Visual Diff Review Modal.
4. **Audit Logging:** Every proposed patch, approval identity, timestamp, and application status is immutably logged.

## Consequences
- Prompt injections cannot achieve arbitrary command execution.
- Human operators retain full supervisory control over all codebase and infrastructure changes.

