# Security Policy

**DevSparks DeployCheck** treats security as a core architectural invariant. Because this platform interacts with repository sources, AI providers, and server infrastructure, we prioritize defense-in-depth, prompt-injection defense, and least-privilege execution.

---

## Supported Versions

| Version | Supported |
| :--- | :--- |
| `0.1.x` (Pre-release) | ✅ Yes |
| Earlier commits | ❌ No |

---

## Reporting a Vulnerability

**DO NOT submit security vulnerabilities via public GitHub issues, discussions, or pull requests.**

If you discover a security vulnerability in DevSparks DeployCheck, report it privately using one of the following methods:

1. **GitHub Private Security Advisory:**  
   Navigate to the repository's **Security** tab and click **Report a vulnerability**.
2. **Email Disclosure:**  
   Send an encrypted or direct email to **`nkdhawan76@gmail.com`** with the subject `[SECURITY] DevSparks DeployCheck Vulnerability Report`.

### What to Include in Your Report:
- Detailed description of the vulnerability and attack vector.
- Step-by-step reproduction steps or Proof of Concept (PoC).
- Potential impact and affected components.
- Any suggested mitigations or patches.

### Our Commitment:
- We acknowledge receipt within **48 hours**.
- We provide an assessment and timeline within **7 business days**.
- We coordinate public disclosure after a patch is validated and deployed.

---

## Architectural Security Invariants

- **Isolated Execution:** User builds and test runs must occur in disposable container environments without Docker socket mounting.
- **BYOK Credential Protection:** AI provider keys are encrypted at rest with authenticated encryption and never returned in API payloads or client bundles.
- **Policy Enforcement:** AI models are never granted direct command-line or shell execution authority. Sensitive operations require human approval and execution logs are append-only.
