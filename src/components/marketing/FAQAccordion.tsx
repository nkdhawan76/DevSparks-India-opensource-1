"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "What is DevSparks DeployCheck?",
    answer: "DevSparks DeployCheck is an open-source developer operations platform engineered by DevSparks India. It unifies static pre-deployment audits, BYOK AI coding assistance, guided VPS server deployments, and 24/7 synthetic website uptime monitoring into a single self-hosted dashboard.",
  },
  {
    question: "Is DevSparks DeployCheck open source?",
    answer: "Yes. The core DeployCheck platform is 100% open source under the permissive MIT License. You can inspect the source code, contribute features, and run it on your own hardware without licensing fees.",
  },
  {
    question: "Can I self-host DeployCheck on my own server?",
    answer: "Absolutely. DeployCheck is engineered for self-hosting with Node.js and PostgreSQL. You can run it on any standard Linux VPS, Docker container, or bare metal server, maintaining complete sovereignty over your code and server credentials.",
  },
  {
    question: "How does Bring Your Own Key (BYOK) work?",
    answer: "DeployCheck never marks up AI token prices or locks you into proprietary LLMs. You provide your own OpenRouter API key in Global Settings. Your key is encrypted at rest using AES-256-GCM and decrypted only in ephemeral memory when analyzing code diffs.",
  },
  {
    question: "Which AI models and providers are supported?",
    answer: "Through our OpenRouter integration, DeployCheck supports DeepSeek V3/R1, Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o, and Google Gemini models. You choose the exact model and temperature for each audit review.",
  },
  {
    question: "How does secure VPS management work without root risk?",
    answer: "DeployCheck establishes SSH connections with host key verification (SHA-256 fingerprinting). AI models are strictly policy-controlled: they never execute raw arbitrary shell commands. Any system mutation or deployment action requires explicit human confirmation in the UI.",
  },
  {
    question: "Does it support guided deployment and automated rollbacks?",
    answer: "Yes. DeployCheck includes a state-machine-driven deployment engine with automated preflight checks (dependency installation, env validation, build step). If a post-deployment health check fails, you can trigger a rollback to the previous verified release commit.",
  },
  {
    question: "How does website monitoring work?",
    answer: "DeployCheck executes continuous synthetic HTTP and HTTPS ping probes against your production endpoints. It tracks response status codes, latency in milliseconds, SSL/TLS certificate validity dates, and DNS resolution, dispatching webhook notifications when incidents occur.",
  },
  {
    question: "What is planned for DevSparks Cloud?",
    answer: "DevSparks Cloud is our planned Milestone 9 managed SaaS offering. It will provide a zero-maintenance, fully managed multi-tenant experience for teams that want DeployCheck's operational capabilities without managing their own PostgreSQL database.",
  },
];

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  description?: string;
  includeSchema?: boolean;
}

export function FAQAccordion({
  items = DEFAULT_FAQS,
  title = "Frequently Asked Questions",
  description = "Get direct answers to common questions about DeployCheck architecture, self-hosting, and security controls.",
  includeSchema = true,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="text-center mb-10 sm:mb-12">
        <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
          FAQ
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm text-[#667085] leading-relaxed max-w-xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <span className="text-sm font-bold text-[#17172A] leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#5938F5]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#667085] leading-relaxed border-t border-slate-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
