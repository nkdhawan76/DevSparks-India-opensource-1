import { describe, it, expect } from "vitest";
import { encryptSecret, decryptSecret, maskApiKey } from "./encryption";

describe("AI Key Encryption (AES-256-GCM)", () => {
  it("should encrypt and successfully decrypt an OpenRouter API key", () => {
    const rawKey = "sk-or-v1-abcdef1234567890abcdef1234567890abcdef1234567890";
    const encrypted = encryptSecret(rawKey);

    expect(encrypted.ciphertext).toBeDefined();
    expect(encrypted.iv).toBeDefined();
    expect(encrypted.authTag).toBeDefined();
    expect(encrypted.keyVersion).toBe("v1");

    // Ciphertext must never contain the plain key
    expect(encrypted.ciphertext).not.toContain(rawKey);

    const decrypted = decryptSecret(encrypted);
    expect(decrypted).toBe(rawKey);
  });

  it("should fail decryption if auth tag is tampered", () => {
    const rawKey = "sk-secret-key";
    const encrypted = encryptSecret(rawKey);

    // Tamper with auth tag
    const tampered = {
      ...encrypted,
      authTag: Buffer.from("corruptedTag123").toString("base64"),
    };

    expect(() => decryptSecret(tampered)).toThrow();
  });

  it("should securely mask keys for frontend presentation", () => {
    const key = "sk-or-v1-9876543210zyxwvutsrq";
    const masked = maskApiKey(key);

    expect(masked).toBe("sk-o••••••••tsrq");
    expect(masked).not.toContain("9876543210");
  });
});
