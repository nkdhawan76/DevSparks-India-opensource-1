# DevSparks DeployCheck — Product Requirements Document (PRD)

**Company:** DevSparks India  
**Product:** DevSparks DeployCheck  
**Document version:** 1.3  
**Prepared:** 31 October 2026  
**Status:** Final proposed specification — approval required before implementation  
**Stack:** Node.js + TypeScript + Next.js + SQL (PostgreSQL recommended; confirmation pending)  
**Product model:** Open-source self-hosted core first; future DevSparks Cloud  
**AI model:** BYOK first; optional DevSparks-managed AI credits later  

## Document relationship

This PRD defines user problems, product goals, target users, feature modules, release priorities, plan/entitlement behavior, UI requirements, and acceptance scope. The companion `ARD.md` defines technical architecture, security controls, database, APIs, deployment design, testing, and engineering workflow. Both documents must be approved before implementation.

# 1. Executive Summary

DevSparks DeployCheck is an open-source developer operations platform for auditing applications before deployment, assisting with code fixes through user-configured AI providers, deploying applications to user-owned servers, and monitoring application and website health after deployment.

The platform aims to make deployment and basic server management approachable for developers and small teams who do not have deep DevOps experience.

## Core workflow

**Connect project → Audit → Understand issues → Ask AI for a fix → Review changes → Run tests → Approve → Deploy → Monitor → Maintain**

The platform will initially prioritize:
1. Pre-deployment audit engine.
2. AI coding assistance using user-owned API keys.
3. A foundational account, project, permissions, and feature-entitlement system.
4. Secure architecture that can later support SSH-based deployment and server management.
5. A future monitoring and maintenance module.

VPS deployment, advanced monitoring, paid plans, and DevSparks-hosted AI credits must be designed for but do not need to be fully launched in the first MVP.

## Product positioning

**DevSparks DeployCheck by DevSparks India**  
“Prepare, deploy, and maintain applications with confidence.”

The product is not an unrestricted AI shell agent. It is a policy-controlled developer platform that can use AI to explain a server, prepare a plan, and invoke approved operations through a restricted execution layer.

---

# 2. Assumptions and Decisions to Confirm

The following are proposed defaults, not confirmed commercial or legal commitments.

| ID | Assumption / proposal | Status |
|---|---|---|
| A-01 | Open-source self-hosted deployment is the first release. Architecture should support a future managed cloud version. | Proposed |
| A-02 | PostgreSQL is the default SQL database. | Proposed |
| A-03 | Node.js + TypeScript backend and Next.js frontend. | Requested |
| A-04 | Users provide their own AI provider API keys in the first release. | Requested |
| A-05 | Optional DevSparks-managed AI credits may be introduced later, subject to cost controls and provider terms. | Future |
| A-06 | Free and paid plan entitlements will be implemented as a module later. The system should be entitlement-ready, but must not pretend billing is active before it is implemented. | Requested |
| A-07 | VPS/server connections use SSH with key-based authentication preferred. Password authentication, if supported at all, requires additional safeguards. | Proposed |
| A-08 | AI-generated server operations require policy checks; high-impact operations require explicit human approval. | Security requirement |
| A-09 | Initial audit targets are Node.js, Next.js, and common web application projects. More frameworks can be added through adapters. | Proposed |
| A-10 | No server command, plan price, paid feature, or deployment capability should be represented as live until implemented and tested. | Requirement |

**Approval gate:** Confirm A-01, A-02, supported frameworks, SSH authentication policy, initial deployment targets, and open-source license before coding.

---

# PART I — PRODUCT REQUIREMENTS DOCUMENT (PRD)

# 3. Problem Statement

Developers often face fragmented workflows:
- They do not know whether a project is ready for production.
- Build, environment, dependency, and configuration errors can be difficult to diagnose.
- AI coding tools are disconnected from deployment readiness and operations.
- VPS setup requires knowledge of SSH, Linux, reverse proxies, TLS, process management, and firewall configuration.
- Post-deployment monitoring is handled through separate tools.
- AI-assisted server administration can be dangerous if arbitrary commands execute without controls.

DeployCheck should unify these workflows while keeping users in control of their code, credentials, and servers.

# 4. Goals

## 4.1 MVP goals

1. Inspect a supported project and produce a useful audit report.
2. Identify actionable build, dependency, configuration, and secret-handling problems.
3. Explain findings in plain language.
4. Let a user connect an AI provider API key and ask contextual questions about audit findings.
5. Allow AI to propose changes without silently applying them.
6. Run approved checks and tests and display their output.
7. Provide secure authentication, project isolation, audit history, and basic role permissions.
8. Establish an entitlement system interface so future Free/Paid plans can gate features consistently.
9. Publish a usable open-source repository with installation and contribution documentation.

## 4.2 Later goals

- SSH-based VPS preflight and guided deployment.
- Multiple server connections per account or workspace.
- Prompt-driven, policy-controlled server administration.
- Application and website monitoring.
- Alerts, incidents, maintenance history, and reports.
- Team workspaces and more granular RBAC.
- Optional managed cloud deployment and managed AI credits.
- Billing, subscriptions, usage quotas, and plan administration.

## 4.3 Non-goals for the first MVP

- Unrestricted remote shell access controlled solely by an AI model.
- Running untrusted user code directly inside the main web application process.
- Supporting every programming language and deployment target.
- Guaranteeing that an audit proves an application is secure.
- Automatically making destructive production changes.
- Claiming unlimited or guaranteed-free AI access.
- Charging users before billing, entitlements, and support processes are implemented.
- Requiring a proprietary DevSparks service for the open-source core to function.

# 5. Target Users and Use Cases

## Persona A — Beginner developer

Needs to understand why an application fails to build or deploy.

**Journey:** Import project → Run audit → Open finding → Ask AI to explain → Review suggested fix → Run tests.

## Persona B — Full-stack developer

Needs repeatable pre-deployment checks and a faster debugging workflow.

**Journey:** Connect repository → Run checks → Inspect evidence → Ask AI to suggest patch → Review diff → Test and export report.

## Persona C — Freelancer or agency

Manages several client projects and wants repeatable deployment readiness.

**Journey:** Create workspace → Add client projects → Review audit history → Assign tasks → Later connect client-owned VPS → Produce maintenance report.

## Persona D — VPS beginner

Wants to manage a server using natural-language instructions.

**Journey:** Add server → Verify ownership and SSH access → Run read-only inventory → Ask “Why is my app down?” → AI prepares a plan → User reviews commands → Approved commands run through a restricted runner → Results and logs are shown.

## Persona E — Experienced operator

Needs a secure, traceable interface for approved server operations.

**Journey:** Configure server policies → Set allowed operations → Review planned changes → Approve deployment or restart → Inspect operation logs and rollback status.

# 6. Product Modules

## Module 1 — Accounts and Workspaces

- Sign up, sign in, sign out, password reset.
- Workspace creation and membership.
- User profile and security settings.
- Project ownership and access control.
- Session management.
- Future invitation and team features.

## Module 2 — Project Management

- Create project manually or import from a supported Git repository.
- Record project name, repository URL, detected stack, branch, and audit history.
- Support local CLI-based audit as a future option.
- Keep repository credentials separate from AI provider keys and SSH credentials.
- Never assume a public repository is safe to execute.

## Module 3 — Audit Engine (MVP priority)

Checks may include:
- Project/framework detection.
- Dependency manifest and lockfile consistency.
- Build and type-check execution in an isolated runner.
- Missing required configuration variables, without displaying secret values.
- Exposed secret detection using safe pattern-based checks.
- Unsafe configuration warnings.
- Dockerfile and deployment configuration checks where applicable.
- Dependency vulnerability scanning through a selected scanner or advisory source.
- Test availability and test execution status.
- Production readiness checklist.
- Report severity, evidence, file/line location where possible, remediation guidance, and confidence.

Finding severities: Critical, High, Medium, Low, Informational.

Every finding should include:
- Stable rule ID.
- Severity.
- Title and description.
- Evidence and affected path.
- Why it matters.
- Recommended remediation.
- Whether an AI explanation or fix suggestion is available.
- Scanner/rule version and timestamp.

A clean audit is not a security certification. Reports must state scope and limitations.

## Module 4 — AI Assistance (MVP priority)

- Configure a provider using a user-owned API key.
- Start with OpenRouter and a provider abstraction for future compatible APIs.
- Validate provider configuration without exposing the key.
- List available models only where provider API supports it.
- Allow users to choose a model.
- Explain audit findings using relevant project context.
- Suggest code patches and configuration changes.
- Generate tests and deployment checklists.
- Stream responses to the interface.
- Show model/provider and token/cost usage where available.
- Handle provider errors, rate limits, unavailable free models, and context limits.

AI must not:
- Receive unrelated users’ project data.
- read secrets or `.env` values by default.
- silently commit or apply a patch.
- execute arbitrary shell commands directly.
- receive private keys or credentials unless an explicit, narrowly scoped workflow requires it; default is never to send SSH private keys to an AI provider.

## Module 5 — Feature Entitlements / Plans (architecture now, commercial rollout later)

Design a centralized entitlement service now. Launch public Free/Paid plans, billing, and plan administration later.

The plan system must unlock modules and limits through server-side feature permissions. Keep each capability independent so the commercial model can change without rewriting product logic.

Potential future plan dimensions (examples only; not final promises or prices):
- **Free:** basic project limits, standard audits, limited audit history, and BYOK AI usage limits.
- **Pro:** higher project/audit limits, advanced audit checks, longer history, and additional AI assistance features.
- **Deployment entitlement/add-on:** server connections, guided VPS deployment, deployment history, and rollback workflows.
- **Monitoring entitlement/add-on:** uptime checks, SSL/DNS checks, alert channels, incident history, retention, and reports.
- **Team:** member seats, shared workspaces, role controls, approvals, and collaboration.
- **Enterprise:** custom policies, SSO, advanced audit retention, private runners, and support options.

A user may see a module in the navigation as **Locked / Available on another plan** only when the plan system is active. Before billing ships, future modules must be labelled **Planned**, not falsely presented as plan-locked production features. BYOK means the user pays their AI provider directly; DeployCheck must not imply AI usage is free merely because a model is marked free by a third-party provider.

Requirements:
- Entitlements must be enforced server-side.
- UI hiding is not sufficient.
- Self-hosted administrators must be able to configure local limits according to the license and product policy.
- Open-source core functionality must not be remotely disabled by DevSparks.
- Feature flags and commercial entitlements must be separate concepts.
- Billing must be a separate module and must not be simulated before implementation.
- Every denied feature request should return a clear reason and, where appropriate, a link to plan information.
- Avoid hardcoding plan names throughout business logic.
- Define entitlement keys such as `audit.basic`, `audit.advanced`, `ai.assistance`, `deployment.vps`, `monitoring.basic`, `monitoring.advanced`, `team.collaboration`, and `reports.export`.
- Enforce permissions and quotas in APIs/workers, not only by hiding frontend controls.
- Keep RBAC, security policy, feature flags, and commercial entitlements separate. A paid plan never grants extra security authority.
- Self-hosted mode must remain operable without contacting DevSparks Cloud; any local feature/limit configuration must follow the chosen open-source/commercial license model.
- Cloud plan and quota checks must fail safely and return a clear reason without leaking subscription or account secrets.

## Module 6 — Server Connections (later phase)

- Add server by hostname/IP, port, username, and authentication method.
- Prefer SSH key authentication; support an agent or dedicated deploy key where possible.
- Validate host-key fingerprints and prevent silent host-key changes.
- Test connectivity using a restricted, read-only handshake.
- Store credentials encrypted at rest; never return stored secrets to the frontend.
- Permit credential rotation and disconnection.
- Support multiple servers with separate policies.
- Show server owner, environment (development/staging/production), last validation time, and access scope.
- Default to read-only inspection.
- Never expose an SSH credential to the AI model.

## Module 7 — Prompt-driven Server Operations (later phase)

Example user requests:
- “Check why my Node.js app is returning 502.”
- “Show CPU, RAM, disk, running services, Docker containers, and recent app errors.”
- “Deploy the connected Next.js project to my staging server.”
- “Restart my staging app after explaining why it stopped.”
- “Check SSL expiry and explain why my domain is not resolving.”

The user selects a previously verified server and target application in the UI. The prompt is an intent input, not a raw terminal. The interface must show the selected host, environment, proposed action, impact, and approval requirement before any write operation.

Workflow:
1. Parse request into a structured intent.
2. Determine target server and application.
3. Check user authorization and server policy.
4. Collect only permitted read-only diagnostics.
5. Provide sanitized outputs to the AI model.
6. AI returns a structured plan with rationale, commands/tools, expected impact, and rollback approach.
7. Validate every requested operation against an allowlist and policy.
8. Classify risk.
9. Require explicit confirmation for changes; production or destructive actions need stronger confirmation.
10. Execute in a restricted worker with timeout, output limits, and least privilege.
11. Capture command/tool audit logs and results.
12. Verify the outcome and offer rollback steps where available.

Risk classes:
- **Read-only:** status, disk usage, memory, process/service status, logs with sensitive values redacted.
- **Low-impact change:** a narrowly defined, reversible action such as restarting an approved app service.
- **High-impact:** firewall changes, package upgrades, configuration replacement, deployment, database migration, service restart on production.
- **Prohibited by default:** destructive filesystem operations, disabling security controls, credential exfiltration, unrestricted root shell, and destructive database operations.

High-impact actions require explicit human approval. Prohibited actions must not be enabled through prompt wording alone.

## Module 8 — Deployment Engine (later phase)

- Server preflight checks: OS compatibility, disk/memory availability, required runtime, network and port requirements.
- Support a deliberately limited first target, such as Docker-based deployment of Node.js/Next.js applications.
- Build image in isolated CI/runner environment.
- Transfer/pull image or artifact using scoped credentials.
- Configure environment variables securely.
- Health-check before routing traffic.
- Use a documented reverse-proxy and TLS strategy.
- Record deployment version, actor, time, logs, and result.
- Support rollback to a previous known-good release where technically possible.
- Separate deployment credentials from monitoring credentials.
- Require approval before production deployment.

Do not promise universal “one-click VPS deployment” until supported OS, project types, runtime assumptions, and rollback behavior are verified.

## Module 9 — Website Health Monitoring (later phase)

- HTTP/HTTPS uptime checks.
- Response time and status code.
- SSL certificate expiry.
- DNS resolution.
- Configurable check intervals.
- Incident detection and deduplication.
- Recovery detection and incident closure.
- Email alerts initially; other channels later.
- Maintenance windows.
- Status history and basic uptime reports.
- Application health checks for deployments.
- Resource monitoring only where a secure agent or supported telemetry source exists.

Monitoring is distinct from security auditing. Avoid intrusive scanning without authorization.

## Module 10 — Audit Logs and Notifications

- Login and account security events.
- Project creation/deletion.
- AI provider configuration changes (never log key values).
- Audit execution and report export.
- Server connection changes.
- Approvals, deployments, rollbacks, and privileged operations.
- Entitlement changes.
- Alert delivery and incident lifecycle.
- Logs should be append-only from the application’s perspective, with retention configurable.

## Module 11 — Administration

- User and workspace administration.
- Abuse/rate-limit controls.
- Feature flag configuration.
- Entitlement and plan configuration when launched.
- Audit rule version management.
- Operational health dashboard.
- No admin screen may reveal raw API keys, SSH private keys, passwords, or secret values.

# 7. MVP Scope and Release Gates

## MVP 0 — Audit + AI foundation

Included:
- Authentication and basic workspace/project model.
- Project upload or repository connection through a safe workflow.
- Initial Node.js/TypeScript/Next.js detection.
- Dependency, secret-pattern, configuration, build, and type-check audits.
- Audit findings and history.
- BYOK provider settings with OpenRouter integration.
- AI explanation and suggested patch output.
- Diff review; no silent code application.
- Basic RBAC.
- Centralized entitlement checks, with a single configurable self-hosted profile and no public paid billing yet.
- Docker-based local development and documented self-hosted installation.
- Tests, threat model, security policy, README, contribution guide, and license.

Not included:
- General-purpose SSH command execution.
- Production VPS deployment.
- Paid subscriptions.
- Managed AI credits.
- Full monitoring and maintenance suite.

## MVP acceptance gate

The release is ready for a limited beta when:
- Supported sample projects produce reproducible reports.
- Audit tasks run outside the web process with resource limits.
- Cross-workspace access tests pass.
- API keys are not returned in API responses or logs.
- AI-generated patches are reviewable and not automatically applied.
- Rate limits and job timeouts work.
- Installation instructions work from a clean environment.
- Build, type checks, unit tests, and integration tests pass.
- Security review has no unresolved critical findings.

## Release 1 — Guided VPS deployment

- SSH server connection management.
- Host-key verification.
- Read-only server inventory.
- Policy-controlled deployment workflows.
- Docker-based Node.js/Next.js deployment.
- Explicit approvals, logs, health checks, and rollback.
- No unrestricted AI shell.

## Release 2 — Monitoring and maintenance

- Uptime, latency, SSL, and DNS checks.
- Alert delivery and incident history.
- Deployment health linkage.
- Reports and maintenance tasks.
- Optional supported host telemetry.

## Release 3 — Cloud and commercial layer

- DevSparks-managed hosting option.
- Billing and subscriptions.
- Plan editor and entitlement management.
- Usage quotas and metering.
- Optional managed AI credits.
- Team collaboration and enterprise controls.

---

# 7. UI / UX Requirements — Light Theme Only

These requirements apply to public pages, onboarding, dashboards, project/audit screens, settings, dialogs, charts, and admin pages.

## 7.1 Theme policy

- **Light theme only. Never implement dark mode, dark theme tokens, dark surfaces, or a theme toggle.**
- No dark background panels, dark KPI cards, dark charts, or dark admin pages. Ignore dark theme examples in third-party design references.
- Use Hallmark as a design-quality/audit aid where compatible: preserve real product workflows, links, forms, field labels, handlers, and content while reviewing visual quality. Choose or adapt a light visual direction only; do not blindly import a dark theme or third-party brand assets.
- Use white surfaces, light neutral backgrounds, readable dark text, subtle borders, restrained shadows, and accessible contrast.
- Prefer one consistent font family throughout the product.
- Prioritize clear information hierarchy and data density; avoid decorative cards without a job.
- Use meaningful motion only; respect reduced-motion settings.

Suggested initial palette (verify contrast before release):
- App background: `#F7F9FC`
- Card/surface: `#FFFFFF`
- Primary text: `#172033`
- Secondary text: `#667085`
- Borders: `#E4E7EC`
- Brand blue: `#3563E9`
- Secondary violet accent: `#6D5EF7` (limited use)
- Success: `#16803D`
- Warning: `#B7791F`
- Error: `#C62828`
- Chart grid: `#EAECF0`

Use semantic design tokens instead of scattering raw hex values across components. Status must not rely on color alone.

## 7.2 KPI cards

- Light cards with clear label, metric, context/trend, and meaningful time range.
- Avoid excessive gradients, heavy shadows, neon color, and clutter.
- Use consistent spacing and number formats.
- Trends need a comparison period and accessible text.
- Design loading, empty, stale, and error states explicitly.
- Never invent production metrics. Demo fixtures must be labeled as demo data.
- Never invent production metrics. Demo fixtures must be labeled as demo data.
- Relevant KPIs may include projects audited, audit pass rate, critical/high findings, AI requests, deployment success rate, incidents, and uptime—but display only metrics supported by the enabled module and actual stored data.
- Include a comparison window (for example, previous 7 days) when showing percentage change; distinguish unavailable data from zero.

## 7.3 Charts

- Modern, restrained charts on light surfaces.
- Titles, axes, units, legends, and date/time window must be clear.
- Light gridlines, readable labels, consistent series colors, and useful tooltips.
- Tooltips should provide exact values/timestamps and be keyboard-accessible where feasible.
- Do not use color as the only indicator of status or severity.
- Responsive sizing, readable labels, and accessible textual summaries.
- Responsive sizing, readable labels, and accessible textual summaries.
- Prefer purposeful line/area charts for time-series, horizontal bars for ranked categories, and small sparklines only when context is also visible. Avoid decorative 3D charts and unnecessary doughnut charts.
- Provide date-range selection, timezone context, data freshness, and clear empty/error states. Never truncate an axis or manipulate a scale in a way that distorts the story.

## 7.4 Navigation and screen states

Suggested navigation: Overview, Projects, Audits, AI Assistant, Deployments (planned until implemented), Servers (planned until implemented), Monitoring (planned until implemented), Incidents, Reports, Members, AI Providers, Usage & Plans (when available), Settings, Admin (authorized users only).

Use consistent icons, clear active states, keyboard navigation, visible focus, accessible labels, responsive layouts, and no horizontal overflow. No dead buttons or fake functionality. Clearly label future modules as planned rather than pretending they work.

---

## Approval status

No application implementation is authorized until the product owner confirms the open decisions in `ARD.md` Section 21.
