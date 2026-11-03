/**
 * DevSparks DeployCheck — Core Application Errors
 */

export type ErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_FAILED"
  | "AUDIT_FAILED"
  | "RUNNER_TIMEOUT"
  | "AI_PROVIDER_ERROR"
  | "ENTITLEMENT_DENIED"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, code: ErrorCode, statusCode = 400, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  public toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
    };
  }
}

export class EntitlementDeniedError extends AppError {
  constructor(feature: string, reason?: string) {
    super(
      reason || `Access to feature '${feature}' is denied by workspace entitlements.`,
      "ENTITLEMENT_DENIED",
      403,
      { feature }
    );
  }
}

