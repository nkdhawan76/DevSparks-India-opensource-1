# ADR 0005: Multi-Layer RBAC & Tenant Boundary Isolation

## Status
Accepted

## Context
DeployCheck supports multi-tenant workspaces where different organizational roles require differentiated access to projects, audits, AI configurations, deployments, and member administration.

## Decision
1. **Standard Workspace Roles:**
   - `OWNER`: Full control over workspace, membership, credentials, and projects.
   - `ADMIN`: Project management, configuration, and permitted operations.
   - `DEVELOPER`: Audit execution, AI patch proposals, and code remediation.
   - `OPERATOR`: Server status inspection, monitoring diagnostics, and deployment approvals.
   - `VIEWER`: Read-only access to audit reports and dashboard metrics.
   - `PLATFORM_ADMIN`: Self-hosted system configuration and entitlement management.
2. **Effective Authorization Formula:**
   ```text
   Authenticated User
     AND Active Workspace Membership
     AND Required Permission Key
     AND Resource Belongs to Authorized Workspace (Tenant Containment)
     AND Feature Entitlement Allows Operation
     AND Security Policy Permits Operation
   ```
3. **Cross-Tenant Guardrails:** Requests attempting to access resources belonging to a different workspace ID are rejected at the service layer with a tenant isolation violation.

## Consequences
- Strict prevention of IDOR (Insecure Direct Object Reference) and cross-workspace leakage.
- Clear audit trails linking every action to an authenticated subject and role.
