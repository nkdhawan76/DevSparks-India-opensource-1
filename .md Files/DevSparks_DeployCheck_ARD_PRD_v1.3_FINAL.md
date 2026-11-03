# DevSparks DeployCheck
## Architecture Requirements Document (ARD) + Product Requirements Document (PRD)

**Company:** DevSparks India  
**Product:** DevSparks DeployCheck  
**Document version:** 1.2  
**Prepared:** 29 October 2026  
**Status:** Proposed specification — approval required before implementation  
**Primary stack:** Node.js, TypeScript, Next.js, SQL database  
**Deployment strategy:** Open-source self-hosted core first; architecture must support a future DevSparks-hosted cloud service  
**AI strategy:** Bring Your Own Key (BYOK) first; optional DevSparks-managed AI credits may be added later  
**Product principle:** AI proposes and explains; policy-controlled tools execute; sensitive/destructive actions require explicit approval.

---

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

# PART II — ARCHITECTURE REQUIREMENTS DOCUMENT (ARD)

# 8. Proposed Technology Architecture

## 8.1 Stack

| Layer | Proposed technology | Notes |
|---|---|---|
| Web UI | Next.js + TypeScript | Dashboard, audit reports, AI chat, settings |
| API | Node.js + TypeScript | Modular monolith initially; versioned REST API |
| SQL database | PostgreSQL | Relational data, migrations, transactions |
| Job queue | Redis + BullMQ | Long-running audits, builds, AI jobs, monitoring tasks |
| Execution | Separate worker/runner containers | Never execute untrusted code inside web/API process |
| AI providers | OpenRouter adapter first | Provider abstraction and per-user BYOK |
| Authentication | Mature auth library | Secure sessions, CSRF protection, password reset |
| Object storage | Local filesystem in dev; S3-compatible adapter later | Audit artifacts, reports, permitted build artifacts |
| Realtime | Server-Sent Events initially; WebSockets if needed | Stream job progress and AI responses |
| Testing | Vitest + Playwright | Unit, integration, end-to-end |
| CI | GitHub Actions | Lint, type-check, test, build, dependency checks |
| Deployment | Docker Compose initially | Web, API, worker, PostgreSQL, Redis |

**Database decision:** PostgreSQL is the recommended SQL database. If MySQL is preferred, confirm before schema implementation; avoid attempting to support both in the MVP.

## 8.2 Architecture style

Use a **modular monolith** for the API and domain logic, with separate worker processes for long-running or untrusted work. Avoid premature microservices.

Logical components:
1. Next.js web application.
2. API and application services.
3. PostgreSQL.
4. Redis/BullMQ queue.
5. Audit worker.
6. Isolated build/test runner.
7. AI provider adapter.
8. Future deployment runner.
9. Future monitoring scheduler and worker.
10. Notification service.

## 8.3 High-level architecture

```text
Browser
  |
  v
Next.js Web App
  |
  v
Node.js API ---- Authentication / RBAC / Entitlements
  |                         |
  |                         v
  |                    PostgreSQL
  |
  +---- Job Queue (Redis/BullMQ)
              |
              +---- Audit Worker ---- Isolated Runner
              |
              +---- AI Job Handler ---- AI Provider Adapter
              |
              +---- Future Deploy Worker ---- SSH Policy Gateway
              |
              +---- Future Monitoring Worker
```

The AI provider must not receive credentials or arbitrary server secrets. The execution layer must not treat model-generated text as trusted commands.

# 9. System Boundaries and Module Contracts

Each module owns its business rules and exposes typed service interfaces. Cross-module database writes should go through the owning service rather than scattered ad-hoc queries.

| Module | Owns | Must not own |
|---|---|---|
| Identity | Users, sessions, authentication | Audit execution |
| Workspace | Membership, project access | Provider key decryption logic outside credential service |
| Projects | Project metadata and source references | Arbitrary code execution |
| Audit | Rules, findings, report state | Account authentication |
| AI | Provider adapters, prompts, model requests | Unrestricted shell access |
| Secrets | Encryption, rotation, secret access policy | UI presentation |
| Entitlements | Feature and usage decisions | Payment processing in MVP |
| Jobs | Queue, status, retry and timeout policy | Product-specific audit rules |
| Runner | Sandboxed build/test/audit execution | Public-facing user authentication |
| Server Connections | SSH metadata and authorization | Direct AI access to private keys |
| Operations | Approved server actions and execution records | Arbitrary unreviewed commands |
| Deployment | Release lifecycle and rollback records | User identity ownership |
| Monitoring | Check scheduling, results and incidents | SSH deployment authority |
| Notifications | Delivery and retry records | Deciding access permissions |
| Admin | Operational policy/configuration | Bypassing audit trails |

# 10. Security and Threat Model

## 10.1 Threat actors and risks

- Malicious authenticated user attempting cross-tenant access.
- Malicious repository containing code designed to escape a runner.
- Prompt injection hidden in README, source files, logs, issues, or web content.
- Stolen AI API key or SSH credential.
- Compromised dependency or build script.
- AI model producing unsafe commands.
- Server connection targeting internal/private infrastructure or an unintended host.
- Queue worker compromise.
- Excessive API/model usage or denial of service.
- Admin account compromise.
- Malicious or accidental destructive production operation.

## 10.2 Required controls

### Identity and tenant isolation
- Enforce workspace/project authorization in every server-side operation.
- Never rely only on frontend visibility.
- Test IDOR and cross-tenant access cases.
- Use secure cookies, session expiry, CSRF protection where applicable, rate limits, and optional MFA in a later release.

### API key security
- Encrypt BYOK secrets at rest using an authenticated encryption design and a key supplied through server configuration or a secrets manager.
- Never store keys in plaintext.
- Never return decrypted values from normal APIs.
- Never write keys to logs, telemetry, error traces, analytics, or prompts.
- Support deletion and rotation.
- Explain that a self-hosted administrator controlling the host may ultimately access application secrets; do not promise protection against the host owner.

### Untrusted project execution
- Run builds and tests in disposable, isolated containers or stronger sandboxing.
- Do not mount the Docker socket into untrusted runners.
- Use non-root users, resource quotas, timeouts, filesystem restrictions, and network egress controls.
- Keep worker/runner infrastructure separated from the control plane.
- Avoid mounting host secrets into project containers.
- Treat package install scripts as untrusted execution.

### AI and prompt injection
- Treat repository contents and logs as untrusted data, not system instructions.
- Give AI only the minimum project context required.
- Use structured tool schemas and strict validation.
- AI text must never be executed directly as a shell command.
- Use allowlisted operations, policy validation, and approvals.
- Record proposed plan, approval identity, execution result, and timestamps.

### SSH and server security
- Prefer dedicated least-privilege deploy accounts and scoped SSH keys.
- Verify host-key fingerprints and alert on unexpected changes.
- Never disable host-key verification to “fix” connection errors.
- Do not transmit SSH private keys to AI providers.
- Separate read-only diagnostics from write operations.
- Production changes require explicit approval.
- Commands must have bounded execution time and output size.
- Prevent SSRF and unauthorized network access in connection testing.
- Block or explicitly govern access to cloud metadata endpoints and sensitive internal ranges.
- Provide credential revocation and rotation.

### Application and data security
- TLS in transit.
- Secure headers and CSRF controls where relevant.
- Input validation with a schema library.
- Parameterized SQL queries.
- Dependency scanning and lockfile policy.
- Backups and tested restore procedures.
- Audit log retention and redaction.
- No secret values in client-side bundles.
- Security disclosure policy and patch process.

## 10.3 Operations requiring approval

| Operation | Default policy |
|---|---|
| Read app/service status | Allowed if user has server access |
| Read sanitized logs | Allowed if user has server access |
| Disk/memory usage | Allowed if user has server access |
| Restart a non-production app service | Approval required by default |
| Deploy a new release | Explicit approval |
| Change firewall/network rules | High-risk approval; additional safeguards |
| Modify production environment variables | Explicit approval and audit log |
| Database migrations | Explicit approval and backup/rollback plan |
| Delete files or databases | Denied by default or restricted to a separately designed workflow |
| Disable firewall/security controls | Denied by default |
| Arbitrary root shell from AI | Prohibited |

# 11. RBAC and Authorization

Initial roles:

- **Owner:** Owns workspace, controls membership, settings, and credentials.
- **Admin:** Manages projects, configuration, and permitted operations.
- **Developer:** Creates projects, runs audits, uses AI, and proposes changes.
- **Operator:** Views approved server/monitoring data and executes only permitted operational workflows.
- **Viewer:** Read-only access to projects and reports.
- **Platform Admin:** Self-hosted instance administration; not automatically authorized to operate every external server without an explicit grant.

Use permissions, not hard-coded role checks scattered throughout code.

Example permissions:
- `workspace.read`
- `workspace.manage_members`
- `project.create`
- `project.read`
- `project.update`
- `project.delete`
- `audit.run`
- `audit.read`
- `ai.use`
- `ai.provider.manage`
- `patch.propose`
- `patch.approve`
- `server.connect`
- `server.read`
- `server.operation.propose`
- `server.operation.approve`
- `deployment.create`
- `deployment.approve`
- `monitoring.manage`
- `monitoring.read`
- `billing.manage` (future)
- `entitlements.manage`

The effective authorization decision is:

```text
Authenticated user
  AND active workspace membership
  AND required permission
  AND resource belongs to authorized workspace
  AND feature entitlement allows operation
  AND security policy permits operation
```

A paid plan must never override RBAC or security policy.

# 12. Feature Entitlements Design

Implement a server-side interface from the start:

```ts
type FeatureKey =
  | "audit.basic"
  | "audit.advanced"
  | "ai.assistance"
  | "ai.patch_suggestions"
  | "deployment.vps"
  | "monitoring.basic"
  | "monitoring.advanced"
  | "team.collaboration"
  | "reports.export";

type EntitlementDecision = {
  allowed: boolean;
  reason?: string;
  limit?: number;
  remaining?: number;
};

interface EntitlementService {
  check(input: {
    workspaceId: string;
    feature: FeatureKey;
    usage?: number;
  }): Promise<EntitlementDecision>;
}
```

The interface is a design contract, not an instruction to start coding before approval.

Requirements:
- API endpoints call the service before gated actions.
- Usage limits must be enforced atomically where concurrent requests could exceed quotas.
- Feature flags are for rollout; entitlements are for access/usage.
- Plan definitions and limits live in configuration/database, not scattered constants.
- Local self-hosted mode must have a documented behavior when no DevSparks cloud is reachable.
- Future billing provider webhooks must be verified and idempotent.
- Do not collect payment details directly unless a compliant payment flow is deliberately designed.

# 13. Proposed SQL Database Schema

Use PostgreSQL and migrations. UUID primary keys are recommended. All tenant-owned records should include `workspace_id` directly or have a verified relationship to a workspace-owned parent.

## 13.1 Identity and workspace

### `users`
- `id UUID PK`
- `email VARCHAR UNIQUE NOT NULL`
- `name VARCHAR`
- `password_hash VARCHAR` (only if local password auth is used)
- `status VARCHAR`
- `created_at TIMESTAMPTZ`
- `updated_at TIMESTAMPTZ`

### `sessions`
- `id UUID PK`
- `user_id UUID FK users`
- `token_hash VARCHAR UNIQUE`
- `expires_at TIMESTAMPTZ`
- `created_at TIMESTAMPTZ`
- `revoked_at TIMESTAMPTZ NULL`

### `workspaces`
- `id UUID PK`
- `name VARCHAR NOT NULL`
- `slug VARCHAR UNIQUE NOT NULL`
- `created_by UUID FK users`
- `created_at TIMESTAMPTZ`
- `updated_at TIMESTAMPTZ`

### `workspace_members`
- `workspace_id UUID FK workspaces`
- `user_id UUID FK users`
- `role VARCHAR NOT NULL`
- `status VARCHAR NOT NULL`
- `created_at TIMESTAMPTZ`
- Primary key: `(workspace_id, user_id)`

## 13.2 Projects and audits

### `projects`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `name VARCHAR NOT NULL`
- `source_type VARCHAR NOT NULL`
- `repository_url TEXT NULL`
- `default_branch VARCHAR NULL`
- `detected_stack JSONB NULL`
- `created_by UUID FK users`
- `created_at TIMESTAMPTZ`
- `updated_at TIMESTAMPTZ`
- Index `(workspace_id, created_at)`

### `audit_runs`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `project_id UUID FK projects`
- `status VARCHAR NOT NULL`
- `triggered_by UUID FK users`
- `commit_sha VARCHAR NULL`
- `scanner_version VARCHAR`
- `started_at TIMESTAMPTZ NULL`
- `completed_at TIMESTAMPTZ NULL`
- `summary JSONB NULL`
- `error_code VARCHAR NULL`
- `created_at TIMESTAMPTZ`

### `audit_findings`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `audit_run_id UUID FK audit_runs`
- `rule_id VARCHAR NOT NULL`
- `severity VARCHAR NOT NULL`
- `title VARCHAR NOT NULL`
- `description TEXT`
- `file_path TEXT NULL`
- `line_start INTEGER NULL`
- `line_end INTEGER NULL`
- `evidence_redacted JSONB NULL`
- `remediation TEXT NULL`
- `created_at TIMESTAMPTZ`

### `audit_rules`
- `id UUID PK`
- `rule_id VARCHAR UNIQUE NOT NULL`
- `version VARCHAR NOT NULL`
- `category VARCHAR NOT NULL`
- `default_severity VARCHAR NOT NULL`
- `enabled_by_default BOOLEAN NOT NULL`
- `configuration JSONB`
- `created_at TIMESTAMPTZ`

## 13.3 AI provider configuration and usage

### `ai_provider_connections`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `created_by UUID FK users`
- `provider_key VARCHAR NOT NULL`
- `display_name VARCHAR`
- `encrypted_api_key BYTEA NOT NULL`
- `encryption_key_version VARCHAR NOT NULL`
- `status VARCHAR NOT NULL`
- `last_validated_at TIMESTAMPTZ NULL`
- `created_at TIMESTAMPTZ`
- `updated_at TIMESTAMPTZ`

Never include the encrypted key in standard response DTOs.

### `ai_conversations`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `project_id UUID FK projects NULL`
- `created_by UUID FK users`
- `title VARCHAR`
- `created_at TIMESTAMPTZ`
- `updated_at TIMESTAMPTZ`

### `ai_messages`
- `id UUID PK`
- `conversation_id UUID FK ai_conversations`
- `role VARCHAR NOT NULL`
- `content_redacted TEXT NOT NULL`
- `provider_key VARCHAR NULL`
- `model_name VARCHAR NULL`
- `input_tokens INTEGER NULL`
- `output_tokens INTEGER NULL`
- `status VARCHAR NOT NULL`
- `created_at TIMESTAMPTZ`

Do not store secrets or unredacted environment variables in conversation content.

### `ai_usage_events`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `user_id UUID FK users`
- `provider_key VARCHAR`
- `model_name VARCHAR`
- `input_tokens INTEGER NULL`
- `output_tokens INTEGER NULL`
- `estimated_cost NUMERIC NULL`
- `request_status VARCHAR`
- `created_at TIMESTAMPTZ`

## 13.4 Jobs and operations

### `jobs`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `job_type VARCHAR NOT NULL`
- `resource_id UUID NULL`
- `status VARCHAR NOT NULL`
- `progress INTEGER NULL`
- `attempt_count INTEGER NOT NULL DEFAULT 0`
- `started_at TIMESTAMPTZ NULL`
- `completed_at TIMESTAMPTZ NULL`
- `error_code VARCHAR NULL`
- `created_at TIMESTAMPTZ`

### `audit_events`
- `id UUID PK`
- `workspace_id UUID FK workspaces NULL`
- `actor_user_id UUID FK users NULL`
- `event_type VARCHAR NOT NULL`
- `resource_type VARCHAR NULL`
- `resource_id UUID NULL`
- `metadata_redacted JSONB`
- `created_at TIMESTAMPTZ`

## 13.5 Future server, deployment, and monitoring schema

### `servers`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `name VARCHAR NOT NULL`
- `hostname VARCHAR NOT NULL`
- `port INTEGER NOT NULL`
- `username VARCHAR NOT NULL`
- `environment VARCHAR NOT NULL`
- `auth_secret_id UUID NULL`
- `host_key_fingerprint VARCHAR NULL`
- `status VARCHAR NOT NULL`
- `last_checked_at TIMESTAMPTZ NULL`
- `created_at TIMESTAMPTZ`

### `secret_store`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `secret_type VARCHAR NOT NULL`
- `encrypted_value BYTEA NOT NULL`
- `key_version VARCHAR NOT NULL`
- `created_by UUID FK users`
- `rotated_at TIMESTAMPTZ NULL`
- `created_at TIMESTAMPTZ`

Access to this table must be isolated behind a secrets service.

### `server_operations`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `server_id UUID FK servers`
- `requested_by UUID FK users`
- `operation_type VARCHAR NOT NULL`
- `risk_level VARCHAR NOT NULL`
- `plan_redacted JSONB NOT NULL`
- `approval_status VARCHAR NOT NULL`
- `approved_by UUID FK users NULL`
- `status VARCHAR NOT NULL`
- `started_at TIMESTAMPTZ NULL`
- `completed_at TIMESTAMPTZ NULL`
- `result_redacted JSONB NULL`
- `created_at TIMESTAMPTZ`

### `deployments`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `project_id UUID FK projects`
- `server_id UUID FK servers`
- `requested_by UUID FK users`
- `release_reference VARCHAR NULL`
- `status VARCHAR NOT NULL`
- `approval_status VARCHAR NOT NULL`
- `health_check_result JSONB NULL`
- `rollback_of UUID NULL`
- `started_at TIMESTAMPTZ NULL`
- `completed_at TIMESTAMPTZ NULL`
- `created_at TIMESTAMPTZ`

### `monitoring_checks`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `project_id UUID FK projects NULL`
- `target_url TEXT NOT NULL`
- `check_type VARCHAR NOT NULL`
- `interval_seconds INTEGER NOT NULL`
- `timeout_ms INTEGER NOT NULL`
- `enabled BOOLEAN NOT NULL`
- `created_at TIMESTAMPTZ`

### `monitoring_results`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `check_id UUID FK monitoring_checks`
- `status VARCHAR NOT NULL`
- `status_code INTEGER NULL`
- `latency_ms INTEGER NULL`
- `error_code VARCHAR NULL`
- `checked_at TIMESTAMPTZ NOT NULL`

### `incidents`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `check_id UUID FK monitoring_checks`
- `status VARCHAR NOT NULL`
- `opened_at TIMESTAMPTZ NOT NULL`
- `resolved_at TIMESTAMPTZ NULL`
- `summary VARCHAR NOT NULL`

### `notifications`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `event_type VARCHAR NOT NULL`
- `channel VARCHAR NOT NULL`
- `status VARCHAR NOT NULL`
- `attempt_count INTEGER NOT NULL DEFAULT 0`
- `last_error_redacted TEXT NULL`
- `created_at TIMESTAMPTZ`

## 13.6 Future plans and entitlements

### `plan_definitions`
- `id UUID PK`
- `plan_key VARCHAR UNIQUE NOT NULL`
- `display_name VARCHAR NOT NULL`
- `status VARCHAR NOT NULL`
- `configuration JSONB NOT NULL`
- `created_at TIMESTAMPTZ`
- `updated_at TIMESTAMPTZ`

### `workspace_entitlements`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `plan_key VARCHAR NOT NULL`
- `source VARCHAR NOT NULL`
- `valid_from TIMESTAMPTZ NOT NULL`
- `valid_until TIMESTAMPTZ NULL`
- `overrides JSONB NULL`
- `created_at TIMESTAMPTZ`

### `usage_counters`
- `id UUID PK`
- `workspace_id UUID FK workspaces`
- `feature_key VARCHAR NOT NULL`
- `period_start TIMESTAMPTZ NOT NULL`
- `period_end TIMESTAMPTZ NOT NULL`
- `used_amount BIGINT NOT NULL DEFAULT 0`
- Unique key `(workspace_id, feature_key, period_start, period_end)`

Do not create every future table in the first migration unless its module is being implemented. This schema is a target model; migrations should follow approved release scope.

# 14. API Design

Use versioned REST endpoints under `/api/v1`. Use a consistent error format, request IDs, pagination, input validation, and authorization middleware.

## 14.1 Authentication and workspace

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/password/forgot`
- `POST /api/v1/auth/password/reset`
- `GET /api/v1/me`
- `GET /api/v1/workspaces`
- `POST /api/v1/workspaces`
- `GET /api/v1/workspaces/:workspaceId`
- `GET /api/v1/workspaces/:workspaceId/members`
- `POST /api/v1/workspaces/:workspaceId/members` (future invitations)

## 14.2 Projects and audits

- `GET /api/v1/workspaces/:workspaceId/projects`
- `POST /api/v1/workspaces/:workspaceId/projects`
- `GET /api/v1/projects/:projectId`
- `PATCH /api/v1/projects/:projectId`
- `DELETE /api/v1/projects/:projectId`
- `POST /api/v1/projects/:projectId/audits`
- `GET /api/v1/projects/:projectId/audits`
- `GET /api/v1/audits/:auditId`
- `GET /api/v1/audits/:auditId/findings`
- `GET /api/v1/audits/:auditId/report`

Audit creation should return a job/audit ID quickly. The client then polls or subscribes to job progress. Do not run lengthy builds in the HTTP request lifecycle.

## 14.3 AI provider and assistance

- `GET /api/v1/workspaces/:workspaceId/ai/providers`
- `POST /api/v1/workspaces/:workspaceId/ai/connections`
- `POST /api/v1/ai/connections/:connectionId/validate`
- `DELETE /api/v1/ai/connections/:connectionId`
- `POST /api/v1/projects/:projectId/ai/conversations`
- `GET /api/v1/ai/conversations/:conversationId`
- `POST /api/v1/ai/conversations/:conversationId/messages`
- `POST /api/v1/ai/suggestions/:suggestionId/approve` (only if patch approval is later implemented)
- `GET /api/v1/workspaces/:workspaceId/ai/usage`

Streaming messages should use SSE or a carefully designed streaming transport with authorization checked before stream creation.

## 14.4 Jobs and events

- `GET /api/v1/jobs/:jobId`
- `GET /api/v1/jobs/:jobId/events` (SSE)
- `POST /api/v1/jobs/:jobId/cancel` where cancellation is supported.

## 14.5 Future server and deployment APIs

- `POST /api/v1/workspaces/:workspaceId/servers`
- `GET /api/v1/workspaces/:workspaceId/servers`
- `POST /api/v1/servers/:serverId/validate`
- `POST /api/v1/servers/:serverId/diagnostics`
- `POST /api/v1/servers/:serverId/operations`
- `POST /api/v1/server-operations/:operationId/approve`
- `POST /api/v1/server-operations/:operationId/reject`
- `GET /api/v1/server-operations/:operationId`
- `POST /api/v1/projects/:projectId/deployments`
- `POST /api/v1/deployments/:deploymentId/approve`
- `POST /api/v1/deployments/:deploymentId/rollback`

Never create a generic endpoint such as `/execute-shell` that accepts arbitrary command strings from the browser or model.

## 14.6 Future monitoring APIs

- `POST /api/v1/workspaces/:workspaceId/monitoring-checks`
- `GET /api/v1/workspaces/:workspaceId/monitoring-checks`
- `PATCH /api/v1/monitoring-checks/:checkId`
- `POST /api/v1/monitoring-checks/:checkId/run`
- `GET /api/v1/monitoring-checks/:checkId/results`
- `GET /api/v1/workspaces/:workspaceId/incidents`
- `POST /api/v1/incidents/:incidentId/acknowledge`
- `POST /api/v1/incidents/:incidentId/resolve`

## 14.7 Future entitlements and billing APIs

- `GET /api/v1/workspaces/:workspaceId/entitlements`
- `GET /api/v1/workspaces/:workspaceId/usage`
- `GET /api/v1/plans` (when plan catalogue is enabled)
- `POST /api/v1/billing/checkout` (future)
- `POST /api/v1/billing/webhooks/:provider` (future, signature verification required)

# 15. User Interface Requirements

## Main navigation proposal

- Overview
- Projects
- Audits
- AI Assistant
- Deployments (feature-gated until available)
- Servers (feature-gated until available)
- Monitoring (feature-gated until available)
- Incidents
- Reports
- Workspace Members
- AI Providers
- Usage & Plans (show only when relevant; commercial module later)
- Settings
- Admin (authorized users only)

## Required screens for MVP

1. Sign in / sign up.
2. Workspace selector and overview.
3. Project list.
4. Add/import project.
5. Project details and audit history.
6. Start audit and show progress.
7. Audit report with filters by severity/category.
8. Finding detail and remediation guidance.
9. AI assistant linked to project/audit context.
10. AI provider connection settings.
11. Review suggested fix/diff without silently applying it.
12. Workspace members and roles.
13. Security and account settings.
14. Basic job/activity history.
15. Self-hosted setup/configuration documentation.

Design requirements:
- Responsive interface.
- Accessible keyboard navigation and labels.
- Clear job progress and error states.
- Avoid displaying secrets.
- Distinguish proposed AI advice from verified audit results.
- Clearly label features that are not yet available.
- No fake charts, fake monitoring data, or inactive buttons presented as functional.

# 16. Operational Requirements

## Reliability
- Background jobs must be retryable where safe.
- Retry policy must distinguish transient failures from invalid requests.
- Use idempotency for repeatable operations.
- Track job status and failure reason.
- Prevent duplicate scheduled jobs.

## Performance targets (initial targets to validate)
- Normal API reads: p95 under 500 ms under a defined test load.
- Audit request acknowledgement: under 2 seconds; actual audit duration depends on project size.
- UI should stream job progress rather than wait for a long HTTP response.
- Enforce maximum upload size, file count, archive expansion size, CPU time, memory, and wall-clock duration.

These are proposed engineering targets, not existing performance claims.

## Observability
- Structured application logs with request/job IDs.
- Metrics for queue depth, audit duration, failure rates, provider errors, and runner resource usage.
- Redact tokens, keys, passwords, private data, and sensitive command output.
- Provide a health/readiness endpoint without exposing system secrets.

## Backup and recovery
- Document PostgreSQL backups and restore procedures.
- Include configuration/key recovery guidance.
- Do not back up raw unencrypted API keys or SSH private keys.
- Test restore procedures before production use.

---

# PART III — STEP-BY-STEP DEVELOPMENT WORKFLOW

# 17. Antigravity Workflow

Do not ask Antigravity to build the entire platform in one prompt. Use gated stages with explicit deliverables and review points.

## Stage 0 — Repository and product approval

Tasks:
1. Confirm project name, company attribution, deployment strategy, database, and license candidate.
2. Decide supported initial project types.
3. Approve MVP scope and explicit non-goals.
4. Approve threat model and secret-handling policy.
5. Create a repository only after the plan is accepted.

Exit criteria:
- Product decisions documented.
- No unresolved architecture decision that blocks the MVP.
- No implementation started before approval.

## Stage 1 — Technical design

Tasks:
1. Create system context and component diagrams.
2. Define module boundaries and service contracts.
3. Finalize SQL entities, indexes, migrations approach, and tenant isolation.
4. Define API schemas and error conventions.
5. Define RBAC and entitlement interfaces.
6. Define runner isolation model.
7. Define CI and test strategy.

Exit criteria:
- ARD approved.
- API contract reviewed.
- Threat model reviewed.
- MVP PRD accepted.

## Stage 2 — Repository foundation

Tasks:
1. Initialize TypeScript project structure.
2. Configure formatting, linting, type checking, and tests.
3. Configure environment validation and safe defaults.
4. Set up PostgreSQL migrations.
5. Add Docker Compose for local development.
6. Set up CI workflows.
7. Add health/readiness checks and structured logging.

Exit criteria:
- Clean install works.
- CI passes.
- No secrets in repository.
- Database migrations can run from scratch.

## Stage 3 — Identity, workspace, and authorization

Tasks:
1. Implement authentication.
2. Implement workspace creation.
3. Implement membership and roles.
4. Add centralized authorization middleware.
5. Add cross-tenant integration tests.
6. Add security event audit logging.

Exit criteria:
- Unauthorized requests are rejected server-side.
- Cross-workspace tests pass.
- Session and password-reset flows work.

## Stage 4 — Audit engine

Tasks:
1. Define scanner interface and finding schema.
2. Implement safe project/file inspection.
3. Implement framework and manifest detection.
4. Implement dependency and lockfile checks.
5. Implement secret-pattern checks with redaction.
6. Implement configuration checks.
7. Implement isolated build/type-check jobs.
8. Save audit reports and findings.
9. Add fixture projects with known issues.
10. Add timeout, cancellation, resource limits, and runner cleanup.

Exit criteria:
- Fixture tests produce expected findings.
- Malicious archive and path traversal tests pass.
- Runner failure does not crash the API.
- Findings include evidence and remediation guidance.

## Stage 5 — BYOK AI assistance

Tasks:
1. Implement secrets encryption service.
2. Add provider connection model and masked settings UI.
3. Integrate OpenRouter behind a provider adapter.
4. Add provider validation and clear error handling.
5. Implement conversation/job lifecycle.
6. Provide redacted audit context to AI.
7. Stream AI output to UI.
8. Add usage metering where provider responses expose it.
9. Add patch proposal/diff review.
10. Add prompt-injection tests using malicious repository files.

Exit criteria:
- API keys never appear in client responses or logs.
- Rate-limit and provider outage behavior works.
- AI output cannot execute commands.
- Proposed code changes require user review.

## Stage 6 — Beta hardening and open-source release

Tasks:
1. Run unit, integration, end-to-end, and security tests.
2. Perform dependency and secret scans.
3. Review error messages and logging for leakage.
4. Verify clean self-hosted installation.
5. Write README, configuration reference, contribution guide, code of conduct, security policy, and license.
6. Document known limitations.
7. Test with a small group of real projects.

Exit criteria:
- No unresolved critical security issue.
- Reproducible build and installation.
- User documentation complete.
- Release scope and limitations clearly stated.

## Stage 7 — VPS connection and controlled operations

Tasks:
1. Define supported Linux distributions and SSH policy.
2. Implement encrypted credential storage and host-key verification.
3. Implement read-only server diagnostics.
4. Implement structured operation intents and risk levels.
5. Add allowlisted operation handlers.
6. Add approval flow and operation audit log.
7. Test prompt injection and malicious command attempts.
8. Add production environment safeguards.

Exit criteria:
- No direct model-to-shell execution.
- Unexpected host keys are rejected or require a secure re-verification flow.
- High-impact actions require approval.
- Server credentials never enter model prompts.

## Stage 8 — Guided deployment

Tasks:
1. Support a narrow set of app types and server configurations.
2. Implement preflight checks.
3. Build in an isolated runner.
4. Transfer/pull release artifacts securely.
5. Deploy with health checks.
6. Record release metadata and logs.
7. Implement rollback and failure recovery.
8. Test failed deployment and recovery scenarios.

Exit criteria:
- Successful and failed deployment paths are tested.
- Rollback behavior is documented and verified for supported deployments.
- No unsupported deployment target is presented as available.

## Stage 9 — Monitoring and maintenance

Tasks:
1. Implement HTTP/HTTPS check scheduler.
2. Add SSL expiry and DNS checks.
3. Persist results with retention rules.
4. Detect incidents and recovery.
5. Add notification retry and deduplication.
6. Add dashboards and reports.
7. Add monitoring/deployment relationship.
8. Test target validation to prevent SSRF.

Exit criteria:
- Check intervals and timeouts are enforced.
- Incident opening and recovery are deterministic.
- Internal/private target restrictions are verified.
- Alerts are not sent repeatedly for every failed poll.

## Stage 10 — Plans and DevSparks Cloud

Tasks:
1. Finalize free/paid product limits based on observed cost and demand.
2. Implement plan administration and entitlements.
3. Add usage quotas and atomic usage metering.
4. Integrate billing provider and webhook validation.
5. Add optional managed AI credits with spending limits.
6. Build cloud tenancy, isolation, abuse prevention, backups, and support operations.
7. Publish pricing and service limits only after validation.

Exit criteria:
- Entitlements are enforced server-side.
- Billing events are idempotent and verified.
- Cloud operations are observable and recoverable.
- Self-hosted core remains usable without a DevSparks cloud account, subject to the selected open-source license.

---

# 18. Testing Strategy

## Unit tests
- Audit rule logic.
- Framework detection.
- Finding severity mapping.
- Entitlement decisions.
- Role and permission checks.
- Secret redaction.
- Provider adapter error mapping.
- Server-operation risk classification.

## Integration tests
- PostgreSQL migrations and repositories.
- Workspace authorization across API endpoints.
- Audit job lifecycle.
- Runner timeouts and cleanup.
- AI provider connection validation.
- Usage metering.
- Approval workflow.
- Notification retry behavior.

## End-to-end tests
- Register → create workspace → create project → run audit → view findings.
- Configure provider → ask AI → view streamed response.
- Propose patch → review diff → reject or approve.
- Unauthorized user attempts to access another workspace.
- Future: connect test VPS → run read-only diagnostics → approve deployment → health check → rollback.

## Security tests
- IDOR and cross-tenant access.
- SQL injection and input validation.
- Archive traversal and malicious filenames.
- Secret leakage in logs, responses, browser bundle, and AI context.
- Prompt injection in README, source files, logs, and dependency output.
- Container escape hardening review.
- SSRF and private/internal address blocking.
- SSH host-key mismatch.
- Rate-limit and resource-exhaustion tests.
- Approval bypass attempts.
- Malicious shell payloads in model responses.

## Acceptance criteria
A feature is complete only when:
- Its acceptance tests pass.
- Authorization is checked server-side.
- Failure states are handled.
- Sensitive data is redacted.
- Logs are useful without exposing secrets.
- Documentation is updated.
- No unimplemented feature is presented as operational.

---

# 19. Open-Source License Options

Select the license before public release. This is a product and legal decision.

## MIT
- Simple, permissive reuse.
- Commercial reuse and proprietary forks generally permitted.
- Low-friction adoption.
- Does not require downstream users to publish modified source merely because they distribute or host it.

## Apache-2.0
- Permissive reuse.
- Includes explicit patent license and patent-related terms.
- Useful for projects that want a permissive license with more explicit patent provisions.

## AGPL-3.0
- Copyleft license.
- Network interaction with a modified covered version can trigger source-offer obligations under its terms.
- May better align with a goal of sharing modifications, but some commercial adopters avoid AGPL software.

## Recommendation process
1. Decide whether maximum adoption or stronger reciprocal sharing is the priority.
2. Review all dependencies and their licenses.
3. Confirm the company has rights to contribute all included code.
4. Have counsel review the selected license and any future commercial offering.
5. Publish `LICENSE` and contribution terms before accepting external contributions.

Do not assume an open-source license prevents others from offering paid hosting. Revenue should come from trusted operations, convenience, support, and additional services rather than relying only on exclusivity.

---

# 20. Revenue and Sustainability Model

## Stage 1 — Open-source adoption
- Public repository and clear roadmap.
- Community contributions and issue triage.
- DevSparks India branding in project documentation.
- Paid installation, onboarding, and custom integration services.

## Stage 2 — Services
- VPS setup and migration.
- Deployment pipeline configuration.
- Monitoring and maintenance contracts.
- Custom audit rules and reports.
- Business-hours or priority support.

## Stage 3 — DevSparks Cloud
- Managed control plane and runners.
- Hosted monitoring and alert delivery.
- Team collaboration.
- Longer history retention and reports.
- Managed backups and deployment operations where supported.

## Stage 4 — Plans and AI credits
- Free plan with limits selected after cost modelling.
- Paid plans for higher usage and operational convenience.
- Optional DevSparks-managed AI credits.
- User-owned BYOK remains available where feasible.
- Clear model, usage, quota, and spending information.

Potential costs to model before pricing:
- CPU, RAM, and storage for runners.
- AI provider usage and failed/retried requests.
- Monitoring frequency and retention.
- Outbound bandwidth and artifact storage.
- Support and incident response.
- Email delivery and billing fees.

Never market third-party free model availability as guaranteed or unlimited. Free model access and quotas can change.

---

# 21. Open Decisions Before Coding

The product owner must approve or revise:

1. PostgreSQL versus MySQL.
2. Initial supported project types (recommended: Node.js, TypeScript, Next.js).
3. Initial source input: upload, GitHub import, or both.
4. Authentication method and whether email verification is required.
5. Candidate license: MIT, Apache-2.0, or AGPL-3.0.
6. Initial audit rules and scanner sources.
7. Runner isolation and hosting requirements for self-hosted installs.
8. SSH authentication policy for the later server module.
9. First supported VPS operating systems and deployment approach.
10. Whether paid plan management is excluded from MVP but represented by an entitlement interface (recommended).
11. Whether DevSparks-managed AI credits are explicitly deferred (recommended).
12. Retention and deletion policy for source snapshots, reports, logs, and AI conversations.

---

# 22. External Agent Skills and Tooling for Antigravity

Owner-selected references (8 repositories):

1. **Hallmark** — https://github.com/Nutlope/hallmark
2. **Ponytail** — https://github.com/DietrichGebert/ponytail
3. **Claude-Red** — https://github.com/SnailSploit/Claude-Red
4. **Gravitas** — https://github.com/udaysharmadev/Gravitas
5. **Transitions.dev** — https://github.com/Jakubantalik/transitions.dev
6. **PentAGI** — https://github.com/vxcontrol/pentagi
7. **Cloudflare security-audit-skill** — https://github.com/cloudflare/security-audit-skill
8. **ECC (Everything Claude Code)** — https://github.com/affaan-m/ECC

These are **developer-time skills, references, or tools** for Antigravity—not DeployCheck runtime dependencies. They must not be bundled into the product or exposed to end users by default.

## Intended use and compatibility

- **Hallmark:** design quality and anti-generic-UI review. Use to critique page hierarchy, real content/actions, responsive behavior, accessibility, and visual craft. Hallmark's README currently lists Claude Code, Codex CLI, Cursor, and OpenCode harness paths; it does not list Antigravity in that table. Its Skills CLI install path exists, but verify the installed skill is visible and works in the current Antigravity setup before relying on it. Hallmark may offer many themes; DeployCheck must use light themes/custom light styling only. Do not copy its website branding, logos, or image assets without separate rights review.
- **Ponytail:** engineering restraint, reuse existing project components, avoid unnecessary code, and review risky logic/tests. Its README names Antigravity CLI and an `AGENTS.md` fallback. Use as a code-quality helper, not as permission to skip tests or security controls.
- **Claude-Red:** Claude-focused offensive-security SKILL.md library. No native Antigravity support is claimed here. Only selectively review methodology for authorized lab/CTF or explicitly scoped security testing. Do not auto-load the full offensive catalog into routine development or let it target third-party systems.
- **Gravitas:** agent workflow discipline—inspect before editing, declare scope, validate after final change, and report evidence. Its README documents an Antigravity skill installation path: `npx skills add udaysharmadev/Gravitas --skill gravitas --agent antigravity --yes`. Optional native plugin path must be reviewed and validated separately. Its own documentation distinguishes workflow enforcement from an OS sandbox; it does not replace runner isolation.
- **Transitions.dev:** motion patterns and UI transitions. Its repository contains custom terms for transition/skill content and MIT-licensed tooling. The custom terms permit use of transitions in products but restrict redistributing the collection or a substantial part as a competing library/pack. The terms also specify Business-plan requirements for company use of paid Pro transitions/agent features. Use only content allowed by the current terms; do not redistribute the library. Keep required source comments/attribution where terms require them. Do not import animation-heavy motion that harms usability or reduced-motion support.
- **PentAGI:** standalone self-hosted multi-agent penetration-testing platform, not a simple coding skill. Treat as an isolated security-research reference only. Never connect it to production client servers or grant it DeployCheck SSH credentials. Any security test needs explicit asset ownership/authorization, defined scope, isolated environment, and independent approval.
- **Cloudflare security-audit-skill:** structured security-audit workflow with coverage, independent candidate validation, machine-readable findings, and reporting. Its README documents: `npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit`. Verify Skills CLI compatibility with the current Antigravity version before use. Use as a review process, not as a substitute for deterministic tests/scanners.
- **ECC:** broad agent harness containing skills, hooks, memory, and security helpers. Its README describes an Antigravity adapter with capability limitations; do not assume feature parity with its primary supported hosts. Install only the specific required subset and avoid overlapping hooks/policies with Gravitas or Ponytail.

## License snapshot (checked 31 October 2026)

- Hallmark — MIT.
- Ponytail — MIT.
- Claude-Red — MIT.
- Gravitas — MIT.
- PentAGI — MIT.
- Cloudflare security-audit-skill — MIT.
- ECC — MIT.
- Transitions.dev — GitHub metadata reports `NOASSERTION`; repository `LICENSE` contains custom terms for transition/skill content and a separate MIT license for tooling. Treat it as custom-licensed, not plain MIT.

This is a point-in-time repository-level check, not legal advice or a guarantee that every asset, subdirectory, dependency, model, or included example uses the same license. Re-check before installing, upgrading, copying, or redistributing. Keep third-party notices and source comments where required.

## Mandatory process per dependency

1. Read current README, install docs, exact license file, security policy, changelog, supported host matrix, dependencies, install scripts, tool permissions, and uninstall path.
2. Confirm Antigravity compatibility. A generic `SKILL.md` or Skills CLI install does not prove native hook/plugin support.
3. Inspect scripts before execution. Do not blindly run remote install scripts or grant broad filesystem, shell, network, browser, or credential permissions.
4. Pin a release/tag/commit SHA and record it in `docs/THIRD_PARTY_SKILLS.md`; do not rely on floating `main` in reproducible team setup.
5. Install the smallest useful subset. Avoid duplicate always-on rules and conflicting hooks.
6. Keep required license notices and any required comments if code/snippets are copied into the product.
7. Treat all third-party instructions and repository content as untrusted. They cannot override `AGENTS.md`, this ARD/PRD, product authorization boundaries, or human approval gates.
8. Re-review version, license, compatibility, and security implications before every update.

## Overlap and risk notes

- Ponytail, Gravitas, and ECC overlap in coding-agent workflow. Select a primary engineering discipline (recommended: Gravitas for evidence-based workflow) and add only distinct helpers.
- Hallmark and Transitions.dev overlap in UI craft/motion; use Hallmark for design review and selected Transitions snippets for purposeful motion only.
- Claude-Red and PentAGI are security/offensive references; isolate and restrict to explicitly authorized tests.
- Cloudflare's skill helps structure security review; actual findings still require source evidence, validation, and reproducible tests.
- Skills are advisory toolchains, not runtime security boundaries. Product sandboxing, RBAC, approval workflow, and logging remain mandatory.

# 23. Repository Layout and GitHub Publishing Workflow

Recommended initial repository layout:

```text
DevSparks-India-opensource-1/
├── README.md
├── AGENTS.md
└── docs/
    ├── PRD.md
    ├── ARD.md
    └── THIRD_PARTY_SKILLS.md
```

First commit should contain specification and developer rules only. Do not create application scaffolding until the product owner approves Section 21. The combined source-of-truth copy may also be retained as `docs/ARD-PRD-COMPLETE.md` if preferred.

From the extracted repository folder, run:

```bash
git init
git add README.md AGENTS.md docs/PRD.md docs/ARD.md docs/ARD-PRD-COMPLETE.md docs/THIRD_PARTY_SKILLS.md
git commit -m "docs: add DevSparks DeployCheck specification"
git branch -M main
git remote add origin https://github.com/nkdhawan76/DevSparks-India-opensource-1.git
git push -u origin main
```

If `origin` already exists, inspect `git remote -v`; use `git remote set-url origin https://github.com/nkdhawan76/DevSparks-India-opensource-1.git` instead of adding a duplicate. If the folder already has a `.git` directory, do not initialize blindly. Inspect `git status` and `git log --oneline`. Never force-push to overwrite remote history.

Do not add a root `LICENSE` file until the project license is chosen and license compatibility is reviewed.

# 24. Final Product Recommendation

Build the self-hostable core first. MVP = audit engine + safe BYOK AI assistance + accounts/workspaces/RBAC + entitlement boundary + light-theme UI + documentation and tests.

Then add SSH-based, approval-controlled server operations; guided deployment; monitoring and maintenance; finally plans, billing, and DevSparks Cloud.

**Security invariant:** AI proposes → policy validates → authorized human approves sensitive action → restricted runner executes → logs capture evidence → outcome verified.

**Design invariant:** Light theme only. Modern, readable KPI cards and charts. No dark mode or dark KPI/chart surfaces.

**Approval rule:** This is a proposed specification. Do not begin implementation until the owner approves unresolved decisions, MVP scope, database, project license, and security model.
