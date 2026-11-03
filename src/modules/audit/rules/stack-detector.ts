import { DetectedStack, ProjectContext } from "../types";

export function detectProjectStack(context: ProjectContext): DetectedStack {
  let packageManager: "npm" | "pnpm" | "yarn" | "unknown" = "unknown";

  if (context.files.has("pnpm-lock.yaml")) {
    packageManager = "pnpm";
  } else if (context.files.has("yarn.lock")) {
    packageManager = "yarn";
  } else if (context.files.has("package-lock.json")) {
    packageManager = "npm";
  }

  const hasTypeScript =
    context.files.has("tsconfig.json") ||
    Array.from(context.files.keys()).some((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

  const hasDockerfile =
    context.files.has("Dockerfile") || context.files.has("docker-compose.yml");

  let framework = "Node.js (Generic)";
  const pkgJsonStr = context.files.get("package.json");

  if (pkgJsonStr) {
    try {
      const pkg = JSON.parse(pkgJsonStr);
      const allDeps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {}),
      };

      if (allDeps["next"]) {
        framework = "Next.js";
      } else if (allDeps["express"]) {
        framework = "Express.js";
      } else if (allDeps["fastify"]) {
        framework = "Fastify";
      } else if (allDeps["react"]) {
        framework = "React (SPA)";
      }
    } catch {
      // Invalid package.json will be flagged by dependency checker
    }
  }

  return {
    runtime: "Node.js",
    framework,
    language: hasTypeScript ? "TypeScript" : "JavaScript",
    packageManager,
    hasTypeScript,
    hasDockerfile,
  };
}

