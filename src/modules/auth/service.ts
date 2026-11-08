/**
 * DevSparks DeployCheck — Core Authentication & Session Service
 * Provides cryptographic password hashing, session issuance, rate limiting, and RBAC binding.
 */

import crypto from "node:crypto";
import { dbClient } from "../../db/client";
import { DbUser, DbSession, DbWorkspace, DbWorkspaceMember } from "../../db/schema";
import { secureLogger } from "../../core/logger";

const SCRYPT_KEYLEN = 64;
const DEFAULT_SALT_BYTES = 16;
const SESSION_EXPIRY_DAYS_STANDARD = 7;
const SESSION_EXPIRY_DAYS_REMEMBER = 30;

interface ResetTokenEntry {
  email: string;
  expiresAt: number;
  used: boolean;
}

const globalForAuth = globalThis as unknown as {
  authService: AuthService | undefined;
  resetTokens: Map<string, ResetTokenEntry> | undefined;
  loginRateLimitMap: Map<string, { count: number; firstAttempt: number }> | undefined;
};

// Rate limiting state: key -> { count, firstAttempt }
const loginRateLimitMap = globalForAuth.loginRateLimitMap ?? new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_FAILED_ATTEMPTS = 5;

// Password reset token store: token -> { email, expiresAt, used }
const resetTokens = globalForAuth.resetTokens ?? new Map<string, ResetTokenEntry>();

if (process.env.NODE_ENV !== "production") {
  globalForAuth.resetTokens = resetTokens;
  globalForAuth.loginRateLimitMap = loginRateLimitMap;
}

/**
 * Hash a plain password using cryptographic scrypt with high-entropy salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(DEFAULT_SALT_BYTES).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
  return `scrypt:${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plain password against an scrypt hash in constant time
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(":");
    if (parts.length !== 3 || parts[0] !== "scrypt") {
      return false;
    }
    const [, salt, expectedHex] = parts;
    const derivedKey = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
    const expectedBuffer = Buffer.from(expectedHex, "hex");
    if (derivedKey.length !== expectedBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(derivedKey, expectedBuffer);
  } catch {
    return false;
  }
}

/**
 * Validate password complexity: min 8 characters, mixed case, number or symbol
 */
export function validatePasswordStrength(password: string): { valid: boolean; reason?: string } {
  if (!password || password.length < 8) {
    return { valid: false, reason: "Password must be at least 8 characters long." };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one uppercase letter." };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one lowercase letter." };
  }
  if (!/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one number or special symbol." };
  }
  return { valid: true };
}

/**
 * Validates an email address safely against RFC 5321/5322 constraints.
 * Enforces maximum input length (254 chars) and linear structural tokenization
 * to completely eliminate polynomial regular expression backtracking (CodeQL ReDoS Alert #4).
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim().toLowerCase();

  // RFC 5321 Section 4.5.3.1.3: Total email length must not exceed 254 octets
  if (trimmed.length === 0 || trimmed.length > 254) return false;

  // Exactly one '@' symbol separating local and domain parts
  const atIndex = trimmed.indexOf("@");
  if (atIndex <= 0 || atIndex !== trimmed.lastIndexOf("@")) return false;

  const localPart = trimmed.slice(0, atIndex);
  const domainPart = trimmed.slice(atIndex + 1);

  // Local part max length: 64 octets
  if (localPart.length === 0 || localPart.length > 64) return false;

  // Domain part max length: 253 octets
  if (domainPart.length === 0 || domainPart.length > 253) return false;

  // Local part formatting: cannot start/end with dot, no consecutive dots
  if (localPart.startsWith(".") || localPart.endsWith(".") || localPart.includes("..")) return false;

  // Bounded non-backtracking character set check for local part
  if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(localPart)) return false;

  // Domain formatting: cannot start/end with dot, no consecutive dots
  if (domainPart.startsWith(".") || domainPart.endsWith(".") || domainPart.includes("..")) return false;

  const labels = domainPart.split(".");
  if (labels.length < 2) return false;

  for (const label of labels) {
    if (label.length === 0 || label.length > 63) return false;
    if (label.startsWith("-") || label.endsWith("-")) return false;
    if (!/^[a-z0-9-]+$/.test(label)) return false;
  }

  // TLD must consist of at least 2 alpha characters
  const tld = labels[labels.length - 1];
  if (!/^[a-z]{2,}$/.test(tld)) return false;

  return true;
}

/**
 * Check rate limit for an identifier (e.g. IP or email)
 */
export function checkLoginRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = loginRateLimitMap.get(identifier);
  if (!entry) return true;

  if (now - entry.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    loginRateLimitMap.delete(identifier);
    return true;
  }
  return entry.count < MAX_FAILED_ATTEMPTS;
}

/**
 * Record a failed login attempt
 */
export function recordFailedLogin(identifier: string): void {
  const now = Date.now();
  const entry = loginRateLimitMap.get(identifier);
  if (!entry || now - entry.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    loginRateLimitMap.set(identifier, { count: 1, firstAttempt: now });
  } else {
    entry.count += 1;
  }
}

/**
 * Clear rate limit entry on successful authentication
 */
export function clearLoginRateLimit(identifier: string): void {
  loginRateLimitMap.delete(identifier);
}

export interface AuthSessionResult {
  rawToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
    status: string;
    role: string;
  };
  expiresAt: Date;
}

export class AuthService {
  private initialized = false;

  public async initialize(): Promise<void> {
    // 1. Seed primary default administrator
    const defaultEmail = "nikhil@devsparksindia.com";
    const existing = await dbClient.getUserByEmail(defaultEmail);
    if (!existing) {
      const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || "DevSparks@2026!";
      const adminUser: DbUser = {
        id: crypto.randomUUID(),
        email: defaultEmail,
        name: "Nikhil Dhawan",
        passwordHash: hashPassword(defaultPassword),
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await dbClient.createUser(adminUser);

      // Create primary default workspace
      const defaultWorkspace: DbWorkspace = {
        id: "ws_alpha",
        name: "DevSparks Primary",
        slug: "devsparks-primary",
        createdBy: adminUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await dbClient.createWorkspace(defaultWorkspace);

      // Assign OWNER role
      const member: DbWorkspaceMember = {
        workspaceId: defaultWorkspace.id,
        userId: adminUser.id,
        role: "OWNER",
        status: "ACTIVE",
        createdAt: new Date(),
      };
      await dbClient.addWorkspaceMember(member);

      secureLogger.info(`[AuthService] Seeded default administrator: ${defaultEmail}`);
    }

    // 2. Seed test admin account matching user entry (admin.test@acs-solar.local)
    const testAdminEmail = "admin.test@acs-solar.local";
    const existingTestAdmin = await dbClient.getUserByEmail(testAdminEmail);
    if (!existingTestAdmin) {
      const testAdminUser: DbUser = {
        id: crypto.randomUUID(),
        email: testAdminEmail,
        name: "ACS Solar Admin",
        passwordHash: hashPassword("ChangeMe_Admin_2026!"),
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await dbClient.createUser(testAdminUser);

      const member: DbWorkspaceMember = {
        workspaceId: "ws_alpha",
        userId: testAdminUser.id,
        role: "ADMIN",
        status: "ACTIVE",
        createdAt: new Date(),
      };
      await dbClient.addWorkspaceMember(member);
      secureLogger.info(`[AuthService] Seeded test admin: ${testAdminEmail}`);
    }

    // 3. Seed demo developer account (demo@devsparksindia.com)
    const demoEmail = "demo@devsparksindia.com";
    const existingDemo = await dbClient.getUserByEmail(demoEmail);
    if (!existingDemo) {
      const demoUser: DbUser = {
        id: crypto.randomUUID(),
        email: demoEmail,
        name: "Demo Developer",
        passwordHash: hashPassword("DevSparks@2026!"),
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await dbClient.createUser(demoUser);

      const member: DbWorkspaceMember = {
        workspaceId: "ws_alpha",
        userId: demoUser.id,
        role: "DEVELOPER",
        status: "ACTIVE",
        createdAt: new Date(),
      };
      await dbClient.addWorkspaceMember(member);
      secureLogger.info(`[AuthService] Seeded demo developer: ${demoEmail}`);
    }

    this.initialized = true;
  }

  /**
   * Authenticate user with email and password
   */
  public async login(
    email: string,
    passwordPlain: string,
    rememberMe = false,
    clientIp = "127.0.0.1"
  ): Promise<{ success: boolean; data?: AuthSessionResult; error?: string; status: number }> {
    await this.initialize();
    const rateLimitKey = `${clientIp}:${email.toLowerCase().trim()}`;

    if (!checkLoginRateLimit(rateLimitKey)) {
      return {
        success: false,
        error: "Too many failed attempts. Please wait 15 minutes before trying again.",
        status: 429,
      };
    }

    const user = await dbClient.getUserByEmail(email);
    if (!user || !user.passwordHash || user.status === "SUSPENDED") {
      recordFailedLogin(rateLimitKey);
      return {
        success: false,
        error: "Invalid email or password.",
        status: 401,
      };
    }

    const passwordMatch = verifyPassword(passwordPlain, user.passwordHash);
    if (!passwordMatch) {
      recordFailedLogin(rateLimitKey);
      return {
        success: false,
        error: "Invalid email or password.",
        status: 401,
      };
    }

    clearLoginRateLimit(rateLimitKey);

    // Create session
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiryDays = rememberMe ? SESSION_EXPIRY_DAYS_REMEMBER : SESSION_EXPIRY_DAYS_STANDARD;
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    const session: DbSession = {
      id: crypto.randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt,
      createdAt: new Date(),
    };
    await dbClient.createSession(session);

    // Fetch primary workspace member role
    const members = await dbClient.getUserWorkspaces(user.id);
    const primaryRole = members.length > 0 ? members[0].role : "VIEWER";

    return {
      success: true,
      status: 200,
      data: {
        rawToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          status: user.status,
          role: primaryRole,
        },
        expiresAt,
      },
    };
  }

  /**
   * Register a new developer account.
   * INVARIANT: Never allows privileged role assignment on self-signup.
   */
  public async register(
    email: string,
    passwordPlain: string,
    name: string
  ): Promise<{ success: boolean; data?: AuthSessionResult; error?: string; status: number }> {
    await this.initialize();

    // 1. Validate Email (Strict bounded RFC 5321 check, CodeQL ReDoS remediation)
    const normalizedEmail = email.toLowerCase().trim();
    if (!isValidEmail(normalizedEmail)) {
      return { success: false, error: "Please provide a valid email address.", status: 400 };
    }

    // 2. Validate Password Strength
    const strength = validatePasswordStrength(passwordPlain);
    if (!strength.valid) {
      return { success: false, error: strength.reason || "Weak password.", status: 400 };
    }

    // 3. Duplicate Account Prevention
    const existing = await dbClient.getUserByEmail(normalizedEmail);
    if (existing) {
      return { success: false, error: "An account with this email address already exists.", status: 409 };
    }

    // 4. Create User (Lowest permitted initial role: DEVELOPER)
    const newUser: DbUser = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      name: name.trim() || normalizedEmail.split("@")[0],
      passwordHash: hashPassword(passwordPlain),
      status: "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await dbClient.createUser(newUser);

    // 5. Create default personal workspace
    const workspaceId = crypto.randomUUID();
    const safeName = (newUser.name || "user").toLowerCase().replace(/[^a-z0-9]/g, "-");
    const workspaceSlug = `ws-${safeName}-${workspaceId.substring(0, 4)}`;
    const workspace: DbWorkspace = {
      id: workspaceId,
      name: `${newUser.name || "Personal"}'s Workspace`,
      slug: workspaceSlug,
      createdBy: newUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await dbClient.createWorkspace(workspace);

    // 6. Assign Member Role (strictly DEVELOPER, never ADMIN or OWNER)
    const member: DbWorkspaceMember = {
      workspaceId: workspace.id,
      userId: newUser.id,
      role: "DEVELOPER",
      status: "ACTIVE",
      createdAt: new Date(),
    };
    await dbClient.addWorkspaceMember(member);

    // 7. Auto-issue session
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS_STANDARD * 24 * 60 * 60 * 1000);

    const session: DbSession = {
      id: crypto.randomUUID(),
      userId: newUser.id,
      tokenHash,
      expiresAt,
      createdAt: new Date(),
    };
    await dbClient.createSession(session);

    return {
      success: true,
      status: 201,
      data: {
        rawToken,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          status: newUser.status,
          role: "DEVELOPER",
        },
        expiresAt,
      },
    };
  }

  /**
   * Validate a raw bearer/cookie session token
   */
  public async validateSession(
    rawToken: string
  ): Promise<{ valid: boolean; user?: DbUser; role?: string; workspaceId?: string } | null> {
    if (!rawToken || rawToken.length < 32) return null;
    await this.initialize();

    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const session = await dbClient.getSessionByTokenHash(tokenHash);

    if (!session || session.revokedAt) {
      return null;
    }

    if (new Date(session.expiresAt).getTime() < Date.now()) {
      return null;
    }

    const user = await dbClient.getUserById(session.userId);
    if (!user || user.status === "SUSPENDED") {
      return null;
    }

    const members = await dbClient.getUserWorkspaces(user.id);
    const primaryMember = members.length > 0 ? members[0] : null;

    return {
      valid: true,
      user,
      role: primaryMember ? primaryMember.role : "VIEWER",
      workspaceId: primaryMember ? primaryMember.workspaceId : undefined,
    };
  }

  /**
   * Revoke active session on logout
   */
  public async logout(rawToken: string): Promise<boolean> {
    if (!rawToken) return false;
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    return dbClient.revokeSession(tokenHash);
  }

  /**
   * Request password reset token
   */
  public async requestPasswordReset(email: string): Promise<{ success: boolean; token?: string }> {
    await this.initialize();
    const normalized = email.toLowerCase().trim();
    if (!isValidEmail(normalized)) {
      return { success: true }; // Constant-time enumeration defense for invalid input
    }
    const user = await dbClient.getUserByEmail(normalized);

    // Invariant: Always return success to prevent account enumeration
    if (!user) {
      return { success: true };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    resetTokens.set(resetToken, {
      email: normalized,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
      used: false,
    });

    secureLogger.info(`[AuthService] Password reset token generated for ${normalized}`);
    return { success: true, token: resetToken };
  }

  /**
   * Complete password reset with single-use token
   */
  public async resetPassword(
    token: string,
    newPasswordPlain: string
  ): Promise<{ success: boolean; error?: string }> {
    await this.initialize();
    const entry = resetTokens.get(token);

    if (!entry || entry.used || entry.expiresAt < Date.now()) {
      return { success: false, error: "Password reset link is invalid or has expired." };
    }

    const strength = validatePasswordStrength(newPasswordPlain);
    if (!strength.valid) {
      return { success: false, error: strength.reason || "Weak password." };
    }

    const user = await dbClient.getUserByEmail(entry.email);
    if (!user) {
      return { success: false, error: "User account not found." };
    }

    const newHash = hashPassword(newPasswordPlain);
    await dbClient.updateUser(user.id, { passwordHash: newHash });

    // Mark token used
    entry.used = true;

    // Invalidate all existing sessions for security
    await dbClient.revokeAllUserSessions(user.id);

    secureLogger.info(`[AuthService] Password reset succeeded for ${entry.email}, revoked prior sessions.`);
    return { success: true };
  }
}

export const authService = globalForAuth.authService ?? new AuthService();

if (process.env.NODE_ENV !== "production") {
  globalForAuth.authService = authService;
}
