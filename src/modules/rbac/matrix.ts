import { PermissionKey, WorkspaceRole } from "./types";

export const ROLE_PERMISSIONS: Record<WorkspaceRole, ReadonlySet<PermissionKey>> = {
  OWNER: new Set<PermissionKey>([
    "workspace.read",
    "workspace.manage_members",
    "workspace.delete",
    "project.create",
    "project.read",
    "project.update",
    "project.delete",
    "audit.run",
    "audit.read",
    "ai.use",
    "ai.provider.manage",
    "patch.propose",
    "patch.approve",
    "deployment.create",
    "deployment.approve",
    "entitlements.manage",
  ]),

  ADMIN: new Set<PermissionKey>([
    "workspace.read",
    "workspace.manage_members",
    "project.create",
    "project.read",
    "project.update",
    "project.delete",
    "audit.run",
    "audit.read",
    "ai.use",
    "ai.provider.manage",
    "patch.propose",
    "patch.approve",
    "deployment.create",
  ]),

  DEVELOPER: new Set<PermissionKey>([
    "workspace.read",
    "project.read",
    "project.create",
    "project.update",
    "audit.run",
    "audit.read",
    "ai.use",
    "patch.propose",
  ]),

  OPERATOR: new Set<PermissionKey>([
    "workspace.read",
    "project.read",
    "audit.read",
    "deployment.approve",
  ]),

  VIEWER: new Set<PermissionKey>([
    "workspace.read",
    "project.read",
    "audit.read",
  ]),

  PLATFORM_ADMIN: new Set<PermissionKey>([
    "workspace.read",
    "entitlements.manage",
  ]),
};
