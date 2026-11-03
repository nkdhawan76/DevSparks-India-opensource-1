export type WorkspaceRole =
  | "OWNER"
  | "ADMIN"
  | "DEVELOPER"
  | "OPERATOR"
  | "VIEWER"
  | "PLATFORM_ADMIN";

export type PermissionKey =
  | "workspace.read"
  | "workspace.manage_members"
  | "workspace.delete"
  | "project.create"
  | "project.read"
  | "project.update"
  | "project.delete"
  | "audit.run"
  | "audit.read"
  | "ai.use"
  | "ai.provider.manage"
  | "patch.propose"
  | "patch.approve"
  | "deployment.create"
  | "deployment.approve"
  | "entitlements.manage";

export interface SubjectContext {
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  isActive: boolean;
  email: string;
}

export interface AuthorizationRequest {
  subject: SubjectContext;
  targetWorkspaceId: string;
  permission: PermissionKey;
  resourceOwnerWorkspaceId?: string;
}

export interface AuthorizationDecision {
  allowed: boolean;
  reason?: string;
  matchedPermission?: PermissionKey;
}

