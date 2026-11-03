import { describe, it } from "node:test";
import assert from "node:assert";
import { encryptSecret, decryptSecret, maskApiKey } from "./encryption";

describe("AI Key Encryption (AES-256-GCM)", () => {
  it("should encrypt and successfully decrypt an OpenRouter API key", () => {
    const rawKey = "sk-or-v1-abcdef1234567890abcdef1234567890abcdef1234567890";
    const encrypted = encryptSecret(rawKey);

    assert(encrypted.ciphertext, "Ciphertext must exist");
    assert(encrypted.iv, "IV must exist");
    assert(encrypted.authTag, "AuthTag must exist");
    assert.strictEqual(encrypted.keyVersion, "v1");

    // Ciphertext must never contain the plain key
    assert(!encrypted.ciphertext.includes(rawKey), "Ciphertext must not leak raw key");

    const decrypted = decryptSecret(encrypted);
    assert.strictEqual(decrypted, rawKey);
  });

  it("should fail decryption if auth tag is tampered", () => {
    const rawKey = "sk-secret-key";
    const encrypted = encryptSecret(rawKey);

    // Tamper with auth tag
    const tampered = {
      ...encrypted,
      authTag: Buffer.from("corruptedTag123").toString("base64"),
    };

    assert.throws(() => decryptSecret(tampered));
  });

  it("should securely mask keys for frontend presentation", () => {
    const key = "sk-or-v1-9876543210zyxwvutsrq";
    const masked = maskApiKey(key);

    assert.strictEqual(masked, "sk-o••••••••tsrq");
    assert(!masked.includes("9876543210"));
  });
});

