#!/usr/bin/env node

/**
 * DevSparks DeployCheck — Local CLI Pre-Deployment Auditor
 * Usage: node scripts/run-audit.mjs [directory]
 */

import fs from "node:fs";
import path from "node:path";

const targetDir = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

console.log("\n================================================================================");
console.log(" 🛡️  DevSparks DeployCheck — Pre-Deployment Audit Engine");
console.log("================================================================================");
console.log(` Target Directory: ${targetDir}`);
console.log(` Scanner Version:  1.3.0 (Policy Controlled)`);
console.log(` Design System:    Strict Light Theme Enforced`);
console.log("--------------------------------------------------------------------------------\n");

// Read files recursively up to 3 levels, ignoring node_modules, .git, etc.
const IGNORED_DIRS = new Set(["node_modules", ".git", ".next", "out", "build", "dist", "coverage", ".antigravity"]);
const filesMap = new Map();

function walk(dir, depth = 0) {
  if (depth > 3) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        walk(path.join(dir, entry.name), depth + 1);
      }
    } else if (entry.isFile()) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(targetDir, fullPath).replace(/\\/g, "/");

      // Atomically read file without TOCTOU race condition
      try {
        const fileBuffer = fs.readFileSync(fullPath);
        if (fileBuffer.byteLength < 512 * 1024) {
          filesMap.set(relativePath, fileBuffer.toString("utf-8"));
        }
      } catch {
        // Skip unreadable or locked files
      }
    }
  }
}

walk(targetDir);
console.log(`📁 Ingested ${filesMap.size} files for static analysis.\n`);

// Rule 1: Stack Detection
function detectStack(files) {
  let packageManager = "unknown";
  if (files.has("pnpm-lock.yaml")) packageManager = "pnpm";
  else if (files.has("yarn.lock")) packageManager = "yarn";
  else if (files.has("package-lock.json")) packageManager = "npm";

  const hasTypeScript = files.has("tsconfig.json") || Array.from(files.keys()).some(f => f.endsWith(".ts") || f.endsWith(".tsx"));
  let framework = "Node.js (Generic)";

  const pkgStr = files.get("package.json");
  if (pkgStr) {
    try {
      const pkg = JSON.parse(pkgStr);
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      if (deps["next"]) framework = "Next.js";
      else if (deps["express"]) framework = "Express.js";
      else if (deps["fastify"]) framework = "Fastify";
      else if (deps["react"]) framework = "React (SPA)";
    } catch {}
  }

  return { runtime: "Node.js", framework, packageManager, hasTypeScript };
}

const stack = detectStack(filesMap);
console.log("📦 Detected Stack:");
console.log(`   • Runtime:         ${stack.runtime}`);
console.log(`   • Framework:       ${stack.framework}`);
console.log(`   • Language:        ${stack.hasTypeScript ? "TypeScript" : "JavaScript"}`);
console.log(`   • Package Manager: ${stack.packageManager}`);
console.log("--------------------------------------------------------------------------------\n");

// Findings collection
const findings = [];

// Rule 2: Secret Scanning
const SECRET_PATTERNS = [
  { name: "AWS Access Key", regex: /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/g, severity: "CRITICAL" },
  { name: "Generic Private Key", regex: /-----BEGIN (?:RSA|OPENSSH|DSA|EC)? PRIVATE KEY-----/g, severity: "CRITICAL" },
  { name: "GitHub Personal Access Token", regex: /ghp_[a-zA-Z0-9]{36}/g, severity: "CRITICAL" },
  { name: "OpenAI / AI Key", regex: /sk-[a-zA-Z0-9]{20,48}/g, severity: "CRITICAL" },
];

for (const [filePath, content] of filesMap.entries()) {
  if (filePath.includes(".test.") || filePath.includes("scripts/") || filePath.endsWith(".md")) continue;

  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (const pat of SECRET_PATTERNS) {
      pat.regex.lastIndex = 0;
      if (pat.regex.test(lines[i])) {
        findings.push({
          ruleId: "SEC-001",
          severity: pat.severity,
          title: `Exposed Credential: ${pat.name}`,
          file: filePath,
          line: i + 1,
          remediation: "Remove hardcoded secret, rotate credential, and use environment variables.",
        });
      }
    }
  }
}

// Rule 3: Dependency and Lockfile Check
const pkgStr = filesMap.get("package.json");
if (!pkgStr) {
  findings.push({
    ruleId: "DEP-001",
    severity: "CRITICAL",
    title: "Missing package.json",
    file: "package.json",
    remediation: "Create package.json to define project dependencies and scripts.",
  });
} else {
  try {
    const pkg = JSON.parse(pkgStr);
    if (!pkg.scripts || !pkg.scripts.build) {
      findings.push({
        ruleId: "DEP-003",
        severity: "MEDIUM",
        title: "Missing Production Build Script",
        file: "package.json",
        remediation: "Add 'build' script to package.json (e.g., 'next build').",
      });
    }
  } catch {
    findings.push({
      ruleId: "DEP-004",
      severity: "CRITICAL",
      title: "Malformed package.json Syntax",
      file: "package.json",
      remediation: "Fix JSON syntax errors in package.json.",
    });
  }
}

// Rule 4: Committed .env Check
for (const f of filesMap.keys()) {
  if (/^\.env(?:\.local|\.production|\.development)?$/.test(f)) {
    findings.push({
      ruleId: "CFG-001",
      severity: "CRITICAL",
      title: `Committed Environment File: ${f}`,
      file: f,
      remediation: `Remove '${f}' from version control and add to .gitignore.`,
    });
  }
}

// Output Results
console.log("🔍 Audit Findings:");
if (findings.length === 0) {
  console.log("   🎉 No critical or high issues detected! Workspace is ready for deployment.\n");
} else {
  for (const f of findings) {
    const colorBadge = f.severity === "CRITICAL" ? "🔴 [CRITICAL]" : f.severity === "HIGH" ? "🟠 [HIGH]" : "🟡 [MEDIUM]";
    console.log(`   ${colorBadge} ${f.title}`);
    console.log(`      File:        ${f.file}${f.line ? `:${f.line}` : ""}`);
    console.log(`      Rule ID:     ${f.ruleId}`);
    console.log(`      Remediation: ${f.remediation}\n`);
  }
}

const criticalCount = findings.filter(f => f.severity === "CRITICAL").length;
const highCount = findings.filter(f => f.severity === "HIGH").length;
const isReady = criticalCount === 0 && highCount === 0;

console.log("--------------------------------------------------------------------------------");
console.log(` Summary: ${findings.length} Finding(s) [${criticalCount} Critical, ${highCount} High]`);
console.log(` Readiness Score: ${isReady ? "✅ READY FOR DEPLOYMENT" : "❌ DEPLOYMENT BLOCKED"}`);
console.log("================================================================================\n");

process.exit(isReady ? 0 : 1);

