import React from "react";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/common/Icons";
import { GitBranch, Box, Sparkles, Cloud, BarChart3 } from "lucide-react";

interface IntegrationItem {
  name: string;
  category: string;
  description: string;
  status: "Active" | "Planned";
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    name: "GitHub",
    category: "Source Control",
    description: "Inspect repositories, read branches, and verify commits.",
    status: "Active",
    icon: GitHubIcon,
  },
  {
    name: "GitLab",
    category: "Source Control",
    description: "Self-hosted and cloud GitLab repository syncing.",
    status: "Active",
    icon: GitBranch,
  },
  {
    name: "Docker Engine",
    category: "Containers",
    description: "Validate Dockerfiles, inspect base images, and parse compose files.",
    status: "Active",
    icon: Box,
  },
  {
    name: "OpenRouter AI",
    category: "AI Provider",
    description: "Bring Your Own Key (BYOK) for DeepSeek, Claude, and GPT-4o models.",
    status: "Active",
    icon: Sparkles,
  },
  {
    name: "Cloudflare",
    category: "Edge & DNS",
    description: "DNS resolution validation and edge cache purge hooks.",
    status: "Planned",
    icon: Cloud,
  },
  {
    name: "Google Analytics",
    category: "Telemetry",
    description: "Correlate deployment events with traffic drops and spikes.",
    status: "Planned",
    icon: BarChart3,
  },
];

export function IntegrationGrid() {
  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs font-bold text-[#5938F5] uppercase tracking-wider block mb-2">
          ECOSYSTEM & STACK
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17172A] tracking-tight">
          Works With Your Existing Engineering Tools
        </h2>
        <p className="mt-3 text-sm text-[#667085] leading-relaxed">
          No proprietary lock-in. Connect standard developer tools, bring your own API keys, and keep complete ownership of your infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {INTEGRATIONS.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.status === "Active";

          return (
            <div
              key={tool.name}
              className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-slate-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-[#17172A] flex items-center justify-center">
                    <Icon className="h-4.5 w-4.5" size={18} />
                  </div>
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={`text-[9px] py-0 px-2 h-4.5 font-bold uppercase rounded-[4px] ${
                      !isActive ? "bg-slate-50 text-slate-400 border-slate-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {tool.status}
                  </Badge>
                </div>

                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {tool.category}
                </div>

                <h3 className="text-sm font-bold text-[#17172A] mt-0.5">
                  {tool.name}
                </h3>

                <p className="mt-1.5 text-xs text-[#667085] leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
