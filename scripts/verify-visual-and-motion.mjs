/**
 * Automated Verification Suite for Advanced Visual Design & Motion Engineering
 * DevSparks DeployCheck
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🚀 Starting Verification: Advanced Visual Design & Motion Engineering...\n");

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

// 1. Verify Motion Utilities & Reduced Motion
runTest("Motion utilities provide centralized GSAP curves and reduced-motion guard", () => {
  const motionPath = path.join(projectRoot, "src", "lib", "motion.ts");
  assert.ok(fs.existsSync(motionPath), "src/lib/motion.ts must exist");
  const content = fs.readFileSync(motionPath, "utf-8");
  assert.ok(content.includes("prefers-reduced-motion"), "Must check prefers-reduced-motion");
  assert.ok(content.includes("ScrollTrigger"), "Must register ScrollTrigger safely");
  assert.ok(content.includes("MOTION"), "Must export MOTION constants");
});

// 2. Verify Complete Skeleton Loading System
runTest("Skeletons component exports all 11 required skeleton variants", () => {
  const skeletonPath = path.join(projectRoot, "src", "components", "common", "Skeletons.tsx");
  assert.ok(fs.existsSync(skeletonPath), "Skeletons.tsx must exist");
  const content = fs.readFileSync(skeletonPath, "utf-8");
  
  const expectedSkeletons = [
    "PageSkeleton",
    "HeroPreviewSkeleton",
    "FeatureCardSkeleton",
    "ProjectListSkeleton",
    "AuditReportSkeleton",
    "DashboardSkeleton",
    "ChartSkeleton",
    "TableSkeleton",
    "DocumentationSkeleton",
    "PricingSkeleton",
    "NotificationSkeleton",
  ];

  for (const skel of expectedSkeletons) {
    assert.ok(content.includes(`export function ${skel}`), `Must export ${skel}`);
  }
  assert.ok(content.includes('aria-busy="true"'), "Skeletons must be accessible with aria-busy");
});

// 3. Verify Route-Level Next.js Loading Skeletons
runTest("Next.js loading.tsx files exist for key routes", () => {
  const loadingRoutes = [
    path.join(projectRoot, "src", "app", "loading.tsx"),
    path.join(projectRoot, "src", "app", "pricing", "loading.tsx"),
    path.join(projectRoot, "src", "app", "docs", "loading.tsx"),
    path.join(projectRoot, "src", "app", "changelog", "loading.tsx"),
  ];

  for (const file of loadingRoutes) {
    assert.ok(fs.existsSync(file), `Loading route file must exist: ${file}`);
  }
});

// 4. Verify Asymmetric Split Hero with GSAP Entrance
runTest("HeroContent component implements staggered GSAP entrance with reduced motion", () => {
  const heroPath = path.join(projectRoot, "src", "components", "marketing", "HeroContent.tsx");
  assert.ok(fs.existsSync(heroPath), "HeroContent.tsx must exist");
  const content = fs.readFileSync(heroPath, "utf-8");
  assert.ok(content.includes("useGSAP"), "HeroContent must use useGSAP hook");
  assert.ok(content.includes("prefers-reduced-motion"), "Must check prefers-reduced-motion");
  assert.ok(content.includes("HeroDashboardPreview"), "Must integrate HeroDashboardPreview");
});

// 5. Verify Bento Feature Grid
runTest("BentoFeatureGrid replaces flat cards with varied 12-column visual composition", () => {
  const bentoPath = path.join(projectRoot, "src", "components", "marketing", "BentoFeatureGrid.tsx");
  assert.ok(fs.existsSync(bentoPath), "BentoFeatureGrid.tsx must exist");
  const content = fs.readFileSync(bentoPath, "utf-8");
  assert.ok(content.includes("lg:col-span-7"), "Must have varied bento col spans (col-span-7)");
  assert.ok(content.includes("lg:col-span-5"), "Must have varied bento col spans (col-span-5)");
  assert.ok(content.includes("Static Security Score"), "Must contain audit micro visual");
  assert.ok(content.includes("Code Patch Diff"), "Must contain AI code patch diff visual");
  assert.ok(content.includes("SSH Sovereign"), "Must contain VPS telemetry visual");
});

// 6. Verify Interactive Workflow Timeline
runTest("WorkflowTimeline features connected line and interactive stage inspection", () => {
  const workflowPath = path.join(projectRoot, "src", "components", "marketing", "WorkflowTimeline.tsx");
  assert.ok(fs.existsSync(workflowPath), "WorkflowTimeline.tsx must exist");
  const content = fs.readFileSync(workflowPath, "utf-8");
  assert.ok(content.includes("selectedStepIndex"), "Must support interactive step selection");
  assert.ok(content.includes("deploycheck terminal runtime"), "Must show terminal runtime output");
});

// 7. Verify Homepage Uses New Visual Modules
runTest("Homepage mounts HeroContent and BentoFeatureGrid", () => {
  const homePath = path.join(projectRoot, "src", "app", "page.tsx");
  const content = fs.readFileSync(homePath, "utf-8");
  assert.ok(content.includes("<HeroContent />"), "Homepage must render HeroContent");
  assert.ok(content.includes("<BentoFeatureGrid />"), "Homepage must render BentoFeatureGrid");
});

// 8. Strict Light Theme Invariant
runTest("Strict light theme invariant is preserved (zero dark theme tokens)", () => {
  const homePath = path.join(projectRoot, "src", "app", "page.tsx");
  const content = fs.readFileSync(homePath, "utf-8");
  assert.ok(!content.includes("dark:"), "Must not contain dark: Tailwind variants");
});

console.log(`\n========================================`);
console.log(`Total tests: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
