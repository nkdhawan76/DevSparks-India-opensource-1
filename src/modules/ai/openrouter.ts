import { redactSecrets } from "@/core/logger";
import { AIPatchSuggestion, CodePatch } from "./types";

export interface AIExplanationRequest {
  findingTitle: string;
  findingDescription: string;
  affectedFile?: string;
  affectedCodeSnippet?: string;
  remediationAdvice: string;
}

export class OpenRouterAdapter {
  private apiKey: string;
  private defaultModel: string;

  constructor(apiKey: string, defaultModel = "meta-llama/llama-3-8b-instruct:free") {
    this.apiKey = apiKey;
    this.defaultModel = defaultModel;
  }

  /**
   * Builds a safe prompt stripping any accidental secrets from the context.
   */
  public buildSanitizedPrompt(req: AIExplanationRequest): string {
    const cleanSnippet = req.affectedCodeSnippet
      ? redactSecrets(req.affectedCodeSnippet)
      : "No code snippet provided";

    return `
You are the DevSparks DeployCheck AI Assistance Engine.
Explain the following pre-deployment audit issue and propose a clean code fix.

ISSUE: ${req.findingTitle}
DESCRIPTION: ${req.findingDescription}
AFFECTED FILE: ${req.affectedFile || "Unknown"}
REMEDIATION GUIDANCE: ${req.remediationAdvice}

CODE CONTEXT (Sanitized):
\`\`\`
${cleanSnippet}
\`\`\`

INSTRUCTIONS:
1. Explain why this issue prevents safe production deployment.
2. Provide a structured patch suggestion with original and suggested replacement code.
3. Do NOT execute or propose destructive terminal commands.
`.trim();
  }

  /**
   * Generates a structured patch suggestion from finding context.
   */
  public generatePatchSuggestion(
    findingId: string,
    filePath: string,
    original: string,
    replacement: string,
    explanation: string
  ): AIPatchSuggestion {
    const patch: CodePatch = {
      filePath,
      originalSnippet: original,
      suggestedSnippet: replacement,
      diffSummary: `Update ${filePath} to resolve finding`,
      explanation,
    };

    return {
      id: `patch-${Date.now()}`,
      findingId,
      model: this.defaultModel,
      summary: explanation,
      patches: [patch],
      isApplied: false,
      createdAt: new Date().toISOString(),
    };
  }
}

