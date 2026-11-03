# External Agent Skills & Tooling Register

**Document Version:** 1.0  
**Evaluated:** 31 October 2026 / 3 November 2026  
**Auditor:** DevSparks India DevOps & Security Team  

The following third-party repositories are **developer-time skills, references, or review tools** for Antigravity. They are **not** DeployCheck runtime dependencies and must never be bundled into the product or exposed to end users by default.

---

## Skill Evaluation Matrix

| Skill / Tool | Upstream Repository | License Observed | Antigravity Purpose | Limitations & Security Constraints |
| :--- | :--- | :--- | :--- | :--- |
| **Hallmark** | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | Design quality, responsive review, accessibility | **Must adapt to Light Theme only.** Do not copy website branding or image assets without permission. |
| **Ponytail** | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | MIT | Engineering restraint, component reuse | Code-quality helper; does not grant permission to skip tests or security controls. |
| **Gravitas** | [udaysharmadev/Gravitas](https://github.com/udaysharmadev/Gravitas) | MIT | Evidence-based workflow discipline | Workflow enforcement only; does not replace OS-level runner isolation. |
| **Transitions.dev** | [Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev) | Custom terms (tooling is MIT) | UI transition patterns and motion polish | Custom terms restrict redistribution as a competing library. Keep attribution; use purposeful motion only. |
| **Cloudflare Security Audit** | [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | MIT | Structured security review and findings | Review process only; cannot substitute deterministic test suites or code scanners. |
| **ECC (Everything Claude Code)** | [affaan-m/ECC](https://github.com/affaan-m/ECC) | MIT | Broad agent harness and helper skills | Install only specific required subsets; avoid overlapping hooks with Gravitas. |
| **Claude-Red** | [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | MIT | Defensive reference & vulnerability analysis | Isolate to authorized test environments; never auto-load in daily development. |
| **PentAGI** | [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | MIT | Multi-agent penetration testing reference | Standalone research platform only; never connect to production servers or provide SSH keys. |

---

## Mandatory Process for Skill Usage

1. **Verify Antigravity Compatibility:** Generic `SKILL.md` or CLI install instructions must be verified in the local environment before reliance.
2. **Pin Releases:** Record exact commit SHAs or release tags when integrating developer skills.
3. **Inspect Scripts:** Never execute unvetted installation or hook scripts.
4. **Skills Do Not Override Invariants:** No external skill instruction can override `AGENTS.md`, product security boundaries, or human approval gates.
