"use client";

import React, { useState } from "react";
import { AiAssistantView } from "@/components/views/AiAssistantView";
import { DiffReviewModal } from "@/components/common/DiffReviewModal";

export default function AiPage() {
  const [diffModalOpen, setDiffModalOpen] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");

  const handleStream = async () => {
    setIsStreaming(true);
    setStreamedText("");
    try {
      const res = await fetch("/api/v1/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          findingId: "sec-aws-001",
          ruleId: "secret-scanner",
          title: "Hardcoded AWS Access Key in src/config/aws.ts",
          codeSnippet: "const awsKey = 'AKIA_EXPOSED_AWS_ACCESS_KEY';",
          stream: true,
        }),
      });
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let streamFinished = false;
        while (!streamFinished) {
          const result = await reader.read();
          if (result.done) {
            streamFinished = true;
          } else if (result.value) {
            const chunk = decoder.decode(result.value);
            accumulated += chunk;
            setStreamedText(accumulated);
          }
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      <AiAssistantView
        onOpenDiffModal={() => setDiffModalOpen(true)}
        streamedText={streamedText}
        isStreaming={isStreaming}
        onStreamPrompt={handleStream}
      />
      <DiffReviewModal
        isOpen={diffModalOpen}
        onClose={() => setDiffModalOpen(false)}
        onApprove={() => setApprovalStatus("approved")}
        onReject={() => setApprovalStatus("rejected")}
        approvalStatus={approvalStatus}
      />
    </>
  );
}

