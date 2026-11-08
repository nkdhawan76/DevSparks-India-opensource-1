/**
 * DevSparks DeployCheck — PostgreSQL Database Schema Definitions
 * (Direct mapping to ARD Section 13)
 */

export interface DbUser {
  id: string; // UUID PK
  email: string;
  name?: string;
  passwordHash?: string;
  status: "ACTIVE" | "SUSPENDED" | "INVITED";
  createdAt: Date;
  updatedAt: Date;
}

export interface DbSession {
  id: string; // UUID PK
  userId: string; // FK users
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  revokedAt?: Date;
}

export interface DbWorkspace {
  id: string; // UUID PK
  name: string;
  slug: string;
  createdBy: string; // FK users
  createdAt: Date;
  updatedAt: Date;
}

export interface DbWorkspaceMember {
  workspaceId: string; // FK workspaces
  userId: string; // FK users
  role: "OWNER" | "ADMIN" | "DEVELOPER" | "OPERATOR" | "VIEWER";
  status: "ACTIVE" | "PENDING";
  createdAt: Date;
}

export interface DbProject {
  id: string; // UUID PK
  workspaceId: string; // FK workspaces
  name: string;
  sourceType: "GIT" | "UPLOAD" | "CLI";
  repositoryUrl?: string;
  defaultBranch?: string;
  detectedStack?: Record<string, unknown>;
  createdBy: string; // FK users
  createdAt: Date;
  updatedAt: Date;
}

export interface DbAuditRun {
  id: string; // UUID PK
  workspaceId: string; // FK workspaces
  projectId: string; // FK projects
  status: "QUEUED" | "RUNNING" | "SUCCESS" | "WARNING" | "FAILED";
  triggeredBy: string; // FK users
  commitSha?: string;
  scannerVersion: string;
  startedAt?: Date;
  completedAt?: Date;
  summary?: Record<string, unknown>;
  errorCode?: string;
  createdAt: Date;
}

export interface DbAuditFinding {
  id: string; // UUID PK
  workspaceId: string; // FK workspaces
  auditRunId: string; // FK audit_runs
  ruleId: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFORMATIONAL";
  title: string;
  description?: string;
  filePath?: string;
  lineStart?: number;
  lineEnd?: number;
  evidenceRedacted?: Record<string, unknown>;
  remediation?: string;
  createdAt: Date;
}

export interface DbAIProviderConnection {
  id: string; // UUID PK
  workspaceId: string; // FK workspaces
  createdBy: string; // FK users
  providerKey: string;
  displayName?: string;
  encryptedApiKey: Buffer; // BYTEA encrypted at rest
  encryptionKeyVersion: string;
  status: "ACTIVE" | "INVALID";
  lastValidatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbAuditEvent {
  id: string; // UUID PK
  workspaceId?: string; // FK workspaces
  actorUserId?: string; // FK users
  eventType: string;
  resourceType?: string;
  resourceId?: string;
  metadataRedacted?: Record<string, unknown>;
  createdAt: Date;
}

export interface DbDisposableEmailDomain {
  id: string;
  domain: string;
  source: string;
  sourceVersion?: string;
  createdAt: Date;
  updatedAt: Date;
  lastVerifiedAt?: Date;
}

export interface DbEmailDomainAllowlist {
  id: string;
  domain: string;
  reason?: string;
  createdBy: string;
  createdAt: Date;
}

export interface DbEmailDomainOverride {
  id: string;
  domain: string;
  status: "ALLOW" | "BLOCK";
  reason?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbEmailBlocklistSyncLog {
  id: string;
  source: string;
  previousVersion?: string;
  currentVersion?: string;
  domainsAdded: number;
  domainsRemoved: number;
  syncStatus: "SUCCESS" | "FAILED" | "PARTIAL";
  syncedAt: Date;
}

export interface DbNewsletterSubscription {
  id: string;
  email: string;
  status: "pending_confirmation" | "subscribed" | "unsubscribed" | "bounced";
  confirmationToken?: string;
  tokenExpiresAt?: Date;
  consentTimestamp: Date;
  policyVersion: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbMarket {
  id: string;
  slug: string;
  countryCode: string;
  displayName: string;
  currencyCode: string;
  currencySymbol: string;
  locale: string;
  isActive: boolean;
  createdAt: Date;
}

export interface DbRegionalPlanPrice {
  id: string;
  planId: string;
  marketId: string;
  currencyCode: string;
  amountMinorUnits: number;
  billingInterval: "monthly" | "annual";
  trialDays: number;
  taxDisplayMode: "tax_inclusive" | "tax_exclusive";
  taxNote?: string;
  isActive: boolean;
  createdAt: Date;
}


