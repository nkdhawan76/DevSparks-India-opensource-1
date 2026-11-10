import React from "react";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/common/Icons";
import { GitBranch, Boxes, Sparkles, Cloud, Activity, CheckCircle2, Zap } from "lucide-react";

interface IntegrationItem {
  name: string;
  category: string;
  description: string;
  status: "Active" | "Planned";
  protocol: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "GitHub",
    category: "Source Control",
    description: "Inspect repositories, read branch heads, verify commits, and parse package manifests.",
    status: "Active",
    protocol: "REST & Webhooks",
    icon: GitHubIcon,
  },
  {
    name: "GitLab",
    category: "Source Control",
    description: "Self-hosted and cloud GitLab repository syncing with scoped deploy tokens.",
    status: "Active",
    protocol: "OAuth & Personal Token",
    icon: GitBranch,
  },
  {
    name: "Docker Engine",
    category: "Containers",
    description: "Validate Dockerfiles, inspect base images, detect root users, and verify Compose.",
    status: "Active",
    protocol: "Daemon Socket & CLI",
    icon: Boxes,
  },
  {
    name: "OpenRouter AI",
    category: "AI Inference (BYOK)",
    description: "Bring Your Own Key for DeepSeek V3, Claude 3.5 Sonnet, and OpenAI GPT-4o models.",
    status: "Active",
    protocol: "AES-256 Encrypted API",
    icon: Sparkles,
  },
  {
    name: "Cloudflare",
    category: "Edge & DNS",
    description: "Automated DNS propagation checks, SSL handshake probes, and edge cache hooks.",
    status: "Planned",
    protocol: "Cloudflare v4 API",
    icon: Cloud,
  },
  {
    name: "Incident Webhooks",
    category: "Alerting & Slack",
    description: "Dispatch instant alert payloads to Slack, Discord, or custom HTTPS endpoints.",
    status: "Active",
    protocol: "SSRF-Guarded Webhook",
    icon: Activity,
  },
];

export function IntegrationGrid() {
  return (
    <section className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5938F5] text-[11px] font-bold uppercase tracking-wider mb-3">
          <Zap className="h-3 w-3 fill-[#5938F5]" />
          <span>Ecosystem & Native Tools</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172A] tracking-tight leading-tight">
          Works With Your Existing Engineering Tools
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#667085] leading-relaxed">
          No proprietary lock-in. Connect industry-standard developer platforms, bring your own API keys, and retain 100% infrastructure sovereignty.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTEGRATIONS.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.status === "Active";

          return (
            <div
              key={tool.name}
              className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-purple-300 hover:-translate-y-1 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#17172A] flex items-center justify-center group-hover:scale-105 group-hover:border-purple-200 group-hover:text-[#5938F5] transition-all">
                    <Icon className="h-5 w-5" size={20} />
                  </div>
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={`text-[9.5px] py-0.5 px-2 font-bold uppercase rounded-full ${
                      !isActive
                        ? "bg-slate-50 text-slate-400 border-slate-200"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    {isActive ? "Verified" : "Planned"}
                  </Badge>
                </div>

                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {tool.category}
                </div>

                <h3 className="text-base font-bold text-[#17172A] group-hover:text-[#5938F5] transition-colors mt-0.5">
                  {tool.name}
                </h3>

                <p className="mt-2 text-xs text-[#667085] leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="truncate">{tool.protocol}</span>
                {isActive && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
