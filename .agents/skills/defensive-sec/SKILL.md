---
name: defensive-sec
description: Defensive application security verification derived from Claude-Red methodologies. Focuses on IDOR prevention, injection testing, and API credential protection in DevSparks code.
---

# Defensive Security Verification

Select defensive analysis patterns for DevSparks DeployCheck:

## Core Verification Checks

1. **Broken Object Level Authorization (BOLA/IDOR):**  
   Ensure all database queries and API endpoints verify `workspace_id` and user membership.
2. **Prompt Injection Hardening:**  
   Treat uploaded repository content, package names, and build logs as untrusted text, never executable instructions.
3. **Secret Redaction:**  
   Verify that regex scanners sanitize environment variables and API keys before logging or sending context to AI providers.
4. **Isolated Runner Boundaries:**  
   Ensure child processes and containers run as non-root with timeout limits, egress restrictions, and without Docker socket access.

