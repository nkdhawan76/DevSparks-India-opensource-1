import { AuthorizationDecision, AuthorizationRequest } from "./types";
import { ROLE_PERMISSIONS } from "./matrix";

export class RbacEvaluator {
  /**
   * Evaluates an authorization decision enforcing ARD Section 11 invariant:
   * 1. Authenticated user
   * 2. Active membership
   * 3. Tenant isolation (workspace match)
   * 4. Role permission match
   * 5. Resource boundary containment
   */
  public evaluate(request: AuthorizationRequest): AuthorizationDecision {
    const { subject, targetWorkspaceId, permission, resourceOwnerWorkspaceId } = request;

    // 1. Authenticated check
    if (!subject.userId || !subject.email) {
      return {
        allowed: false,
        reason: "Unauthenticated subject: Missing user identity",
      };
    }

    // 2. Active membership check
    if (!subject.isActive) {
      return {
        allowed: false,
        reason: "Subject workspace membership is inactive or suspended",
      };
    }

    // 3. Workspace tenant isolation
    if (subject.workspaceId !== targetWorkspaceId) {
      return {
        allowed: false,
        reason: `Tenant isolation violation: Subject belongs to ${subject.workspaceId}, requested ${targetWorkspaceId}`,
      };
    }

    // 4. Resource boundary isolation
    if (resourceOwnerWorkspaceId && resourceOwnerWorkspaceId !== subject.workspaceId) {
      return {
        allowed: false,
        reason: `Cross-tenant resource access blocked: Resource belongs to ${resourceOwnerWorkspaceId}`,
      };
    }

    // 5. Permission matrix check
    const allowedPermissions = ROLE_PERMISSIONS[subject.role];
    if (!allowedPermissions || !allowedPermissions.has(permission)) {
      return {
        allowed: false,
        reason: `Role '${subject.role}' lacks required permission '${permission}'`,
      };
    }

    return {
      allowed: true,
      matchedPermission: permission,
    };
  }
}

export const rbacEvaluator = new RbacEvaluator();
