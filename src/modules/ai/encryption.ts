import crypto from "crypto";
import { EncryptedSecret } from "./types";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // 96 bits for GCM
const KEY_VERSION = "v1";

/**
 * Derives a 256-bit encryption key from a master secret or returns a 32-byte buffer.
 */
function getMasterKey(masterKeyString?: string): Buffer {
  const secret = masterKeyString || process.env.DEPLOYCHECK_MASTER_ENCRYPTION_KEY;
  if (!secret) {
    // Default fallback for development/testing only
    return crypto.scryptSync("devsparks-deploycheck-dev-secret-salt-32b", "salt", 32);
  }
  if (secret.length === 64) {
    return Buffer.from(secret, "hex");
  }
  return crypto.scryptSync(secret, "deploycheck_salt", 32);
}

/**
 * Encrypts a sensitive string (e.g. BYOK AI API key) using AES-256-GCM authenticated encryption.
 */
export function encryptSecret(plainText: string, masterKeyStr?: string): EncryptedSecret {
  const key = getMasterKey(masterKeyStr);
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    keyVersion: KEY_VERSION,
  };
}

/**
 * Decrypts an authenticated ciphertext. Throws if tampered or corrupt.
 */
export function decryptSecret(secret: EncryptedSecret, masterKeyStr?: string): string {
  const key = getMasterKey(masterKeyStr);
  const iv = Buffer.from(secret.iv, "base64");
  const authTag = Buffer.from(secret.authTag, "base64");
  const ciphertext = Buffer.from(secret.ciphertext, "base64");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString("utf8");
}

/**
 * Masks a secret string for safe display in settings UI (e.g., sk-abc••••••••xyz).
 */
export function maskApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length <= 8) {
    return "••••••••";
  }
  const start = apiKey.slice(0, 4);
  const end = apiKey.slice(-4);
  return `${start}••••••••${end}`;
}

