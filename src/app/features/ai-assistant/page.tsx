import React from "react";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { getRouteMetadata } from "@/lib/metadata-registry";
import {
  Key,
  GitCompare,
  UserCheck,
  ShieldAlert,
  Cpu,
} from "lucide-react";

const meta = getRouteMetadata("/features/ai-assistant");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.canonicalPath },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonicalPath,
  },
};

const AI_PILLARS = [
  {
    title: "Bring Your Own Key (BYOK)",
    desc: "Connect your personal or organization OpenRouter API key. DeployCheck never charges a subscription markup or forces you into proprietary AI models.",
    icon: Key,
  },
  {
    title: "Support for Leading LLMs",
    desc: "Seamlessly switch between DeepSeek V3, Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o, and Google Gemini with custom temperature and token limits.",
    icon: Cpu,
  },
  {
    title: "Structured Code Diff Proposals",
    desc: "AI responses are strictly structured as readable unified git diffs. You can inspect exact line-by-line additions and deletions before accepting.",
    icon: GitCompare,
  },
  {
    title: "Mandatory Human Approval Gate",
    desc: "No code is automatically committed or deployed. Every patch requires your explicit click approval inside a policy-restricted review dialog.",
    icon: UserCheck,
  },
];

const AI_FAQS: FAQItem[] = [
  {
    question: "Does DeployCheck AI have unrestricted terminal access?",
    answer: "Never. By design and governance invariant, DeployCheck AI models are never given direct or unrestricted shell execution privileges. Models can only return structured JSON diff proposals.",
  },
  {
    question: "How are my OpenRouter API credentials protected?",
    answer: "Your key is encrypted immediately upon entry using AES-256-GCM. It is decrypted only in ephemeral memory when sending prompt requests and is never logged in server transcripts or returned in client responses.",
  },
  {
    question: "Is AI usage required to use DeployCheck?",
    answer: "No. The AI Assistant is completely optional. DeployCheck's core static audit engine, VPS deployment runner, and uptime monitoring work 100% autonomously without any AI provider configured.",
  },
];

export default function AIAssistantPage() {
  return (
    <MarketingLayout breadcrumbs={meta.breadcrumbs}>
      <PageHero
        badge="Policy-Controlled BYOK"
        title="AI-Assisted Debugging with Strict Human Oversight"
        description="Diagnose audit findings, understand complex stack errors, and review structured patch proposals powered by your own OpenRouter AI keys."
        primaryCta={{ label: "Connect Your AI Key", href: "/signup" }}
        secondaryCta={{ label: "Read Architecture (ARD)", href: "/docs" }}
      />

      {/* Safety Invariant Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 border border-purple-200/90 flex items-start gap-3.5">
          <ShieldAlert className="h-5 w-5 text-[#5938F5] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#17172A] leading-relaxed">
            <strong className="font-bold">Permanent Safety Invariant:</strong> The DeployCheck AI Assistant is never an unrestricted shell runner. AI models only propose structured patches in unified diff format. Sensitive mutations strictly execute in policy runners after explicit human authorization.
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5938F5] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#17172A]">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Diff Preview Box */}
      <section className="py-12 sm:py-16 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
              CODE DIFF REVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
              Review and Approve Code Changes Visually
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-5 font-mono text-xs overflow-x-auto shadow-lg">
            <div className="pb-3 border-b border-slate-800 text-slate-400 flex justify-between items-center">
              <span>patch: fix-cors-policy.ts (Proposed by DeepSeek V3)</span>
              <span className="text-emerald-400">Status: Pending Approval</span>
            </div>
            <div className="pt-3 space-y-1">
              <p className="text-slate-500">@@ -14,5 +14,8 @@</p>
              <p className="text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded">- res.setHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);</p>
              <p className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">+ const origin = req.headers.origin;</p>
              <p className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">+ if (ALLOWED_ORIGINS.includes(origin)) &#123;</p>
              <p className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">+   res.setHeader(&quot;Access-Control-Allow-Origin&quot;, origin);</p>
              <p className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">+ &#125;</p>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion items={AI_FAQS} title="AI Assistant FAQ" />

      <CTASection
        title="Experience approval-gated AI coding assistance"
        description="Connect your OpenRouter key and inspect structured code patch proposals with total control."
      />
    </MarketingLayout>
  );
}
