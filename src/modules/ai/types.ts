/**
 * DevSparks DeployCheck — BYOK AI Assistance Types
 */

export type ProviderKey = "openrouter" | "anthropic" | "openai";

export interface EncryptedSecret {
  ciphertext: string; // Base64
  iv: string;         // Base64
  authTag: string;    // Base64
  keyVersion: string;
}

export interface AIProviderConnection {
  id: string;
  workspaceId: string;
  providerKey: ProviderKey;
  displayName: string;
  encryptedApiKey: EncryptedSecret;
  status: "ACTIVE" | "INVALID" | "PENDING";
  lastValidatedAt?: string;
  createdAt: string;
}

export interface CodePatch {
  filePath: string;
  originalSnippet: string;
  suggestedSnippet: string;
  diffSummary: string;
  explanation: string;
}

export interface AIPatchSuggestion {
  id: string;
  findingId?: string;
  model: string;
  summary: string;
  patches: CodePatch[];
  isApplied: boolean;
  createdAt: string;
}

