---
name: security-audit
description: Structured six-phase security audit methodology. Guides architecture reconnaissance, threat modeling, coverage ledgers, and verified vulnerability findings.
---

# Cloudflare Security Audit Methodology

Adapted from Cloudflare's security-audit-skill for DevSparks DeployCheck.

## The 6-Phase Review Process

1. **Reconnaissance:**  
   Map entry points, trust boundaries, public APIs, worker processes, and untrusted input paths.
2. **Coverage-Led Hunting:**  
   Review specific coverage units (Authentication, Tenant Isolation, Secret Handling, Runner Sandboxing, Input Validation).
3. **Candidate Validation:**  
   Identify potential security defects or logic bypasses with concrete evidence.
4. **Independent Record Verification:**  
   Test and attempt to disprove each candidate finding. Only findings that survive rigorous scrutiny advance.
5. **Structured Schema Output:**  
   Record verified findings using stable rule IDs, severity ratings (Critical, High, Medium, Low), and remediation paths.
6. **Reporting:**  
   Produce actionable security summaries without exposing private credentials.

## Strict Boundaries
- Audit only authorized DevSparks project code.
- No live external network probing or automated brute-forcing.
- Runner execution must always remain isolated.
