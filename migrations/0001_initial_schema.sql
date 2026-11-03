-- ==============================================================================
-- DevSparks DeployCheck — Initial Database Migration (PostgreSQL)
-- Schema Version: 0001_initial_schema.sql
-- Conforms to: docs/ARD.md Section 13 (Database Architecture)
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. Users & Authentication
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'INVITED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMPTZ NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);

-- ------------------------------------------------------------------------------
-- 2. Workspaces & Tenancy
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_workspaces_slug ON workspaces(slug);

CREATE TABLE IF NOT EXISTS workspace_members (
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'DEVELOPER', 'OPERATOR', 'VIEWER')),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PENDING')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (workspace_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_workspace_members_user ON workspace_members(user_id);

-- ------------------------------------------------------------------------------
-- 3. Projects & Pre-deployment Audits
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('GIT', 'UPLOAD', 'CLI')),
    repository_url TEXT NULL,
    default_branch VARCHAR(100) NULL,
    detected_stack JSONB NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_workspace ON projects(workspace_id, created_at DESC);

CREATE TABLE IF NOT EXISTS audit_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id VARCHAR(100) UNIQUE NOT NULL,
    version VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    default_severity VARCHAR(50) NOT NULL CHECK (default_severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL')),
    enabled_by_default BOOLEAN NOT NULL DEFAULT true,
    configuration JSONB NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('QUEUED', 'RUNNING', 'SUCCESS', 'WARNING', 'FAILED')),
    triggered_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    commit_sha VARCHAR(64) NULL,
    scanner_version VARCHAR(50) NOT NULL,
    started_at TIMESTAMPTZ NULL,
    completed_at TIMESTAMPTZ NULL,
    summary JSONB NULL,
    error_code VARCHAR(100) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_runs_workspace ON audit_runs(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_runs_project ON audit_runs(project_id, created_at DESC);

CREATE TABLE IF NOT EXISTS audit_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    audit_run_id UUID NOT NULL REFERENCES audit_runs(id) ON DELETE CASCADE,
    rule_id VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL')),
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    file_path TEXT NULL,
    line_start INTEGER NULL,
    line_end INTEGER NULL,
    evidence_redacted JSONB NULL,
    remediation TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_findings_run ON audit_findings(audit_run_id);
CREATE INDEX IF NOT EXISTS idx_audit_findings_severity ON audit_findings(workspace_id, severity);

-- ------------------------------------------------------------------------------
-- 4. BYOK AI Connections & Policy-Governed Remediation
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_provider_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    provider_key VARCHAR(100) NOT NULL,
    display_name VARCHAR(255) NULL,
    encrypted_api_key BYTEA NOT NULL,
    encryption_key_version VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INVALID')),
    last_validated_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_connections_workspace ON ai_provider_connections(workspace_id);

CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    title VARCHAR(255) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('system', 'user', 'assistant')),
    content_redacted TEXT NOT NULL,
    provider_key VARCHAR(100) NULL,
    model_name VARCHAR(100) NULL,
    input_tokens INTEGER NULL,
    output_tokens INTEGER NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'SUCCESS',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_messages_conversation ON ai_messages(conversation_id, created_at ASC);

CREATE TABLE IF NOT EXISTS ai_usage_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    provider_key VARCHAR(100) NULL,
    model_name VARCHAR(100) NULL,
    input_tokens INTEGER NULL,
    output_tokens INTEGER NULL,
    estimated_cost NUMERIC(10, 6) NULL,
    request_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 5. Jobs & Security Audit Events
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    job_type VARCHAR(100) NOT NULL,
    resource_id UUID NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    attempt_count INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ NULL,
    completed_at TIMESTAMPTZ NULL,
    error_code VARCHAR(100) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_jobs_workspace_status ON jobs(workspace_id, status);

CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NULL,
    resource_id UUID NULL,
    metadata_redacted JSONB NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_events_workspace ON audit_events(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_events_type ON audit_events(event_type);

-- ------------------------------------------------------------------------------
-- 6. Servers & Encrypted Secrets Store
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS secret_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    secret_type VARCHAR(100) NOT NULL CHECK (secret_type IN ('SSH_KEY', 'PASSWORD', 'API_KEY', 'WEBHOOK_SECRET')),
    encrypted_value BYTEA NOT NULL,
    key_version VARCHAR(50) NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    rotated_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_secret_store_workspace ON secret_store(workspace_id);

CREATE TABLE IF NOT EXISTS servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    port INTEGER NOT NULL DEFAULT 22 CHECK (port > 0 AND port <= 65535),
    username VARCHAR(100) NOT NULL,
    environment VARCHAR(50) NOT NULL CHECK (environment IN ('production', 'staging', 'development')),
    auth_secret_id UUID REFERENCES secret_store(id) ON DELETE SET NULL,
    host_key_fingerprint VARCHAR(255) NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'healthy' CHECK (status IN ('healthy', 'warning', 'offline', 'maintenance')),
    last_checked_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_servers_workspace ON servers(workspace_id);

CREATE TABLE IF NOT EXISTS server_operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    operation_type VARCHAR(100) NOT NULL,
    risk_level VARCHAR(50) NOT NULL CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    plan_redacted JSONB NOT NULL,
    approval_status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED')),
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'QUEUED' CHECK (status IN ('QUEUED', 'RUNNING', 'COMPLETED', 'FAILED')),
    started_at TIMESTAMPTZ NULL,
    completed_at TIMESTAMPTZ NULL,
    result_redacted JSONB NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_server_ops_server ON server_operations(server_id, created_at DESC);

-- ------------------------------------------------------------------------------
-- 7. Guided Deployments & Rollbacks
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    server_id UUID NOT NULL REFERENCES servers(id) ON DELETE RESTRICT,
    requested_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    release_reference VARCHAR(100) NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'QUEUED' CHECK (status IN ('QUEUED', 'AUDITING', 'WAITING_APPROVAL', 'BUILDING', 'DEPLOYING', 'VERIFYING', 'SUCCESS', 'FAILED', 'ROLLED_BACK')),
    approval_status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED')),
    health_check_result JSONB NULL,
    rollback_of UUID REFERENCES deployments(id) ON DELETE SET NULL,
    started_at TIMESTAMPTZ NULL,
    completed_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_deployments_workspace ON deployments(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deployments_project ON deployments(project_id, created_at DESC);

-- ------------------------------------------------------------------------------
-- 8. Synthetic Monitoring & Incidents
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS monitoring_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    target_url TEXT NOT NULL,
    check_type VARCHAR(50) NOT NULL CHECK (check_type IN ('HTTP', 'TCP', 'TLS', 'ICMP')),
    interval_seconds INTEGER NOT NULL DEFAULT 60 CHECK (interval_seconds >= 10),
    timeout_ms INTEGER NOT NULL DEFAULT 5000 CHECK (timeout_ms >= 500),
    enabled BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_monitoring_checks_workspace ON monitoring_checks(workspace_id);

CREATE TABLE IF NOT EXISTS monitoring_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    check_id UUID NOT NULL REFERENCES monitoring_checks(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('UP', 'DEGRADED', 'DOWN')),
    status_code INTEGER NULL,
    latency_ms INTEGER NULL,
    error_code VARCHAR(100) NULL,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_monitoring_results_check ON monitoring_results(check_id, checked_at DESC);

CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    check_id UUID NOT NULL REFERENCES monitoring_checks(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'ACKNOWLEDGED', 'RESOLVED')),
    opened_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMPTZ NULL,
    summary VARCHAR(500) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_incidents_workspace ON incidents(workspace_id, status);

