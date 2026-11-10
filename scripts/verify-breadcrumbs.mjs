/**
 * Automated Verification Suite for DevSparks DeployCheck Breadcrumb Architecture
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🚀 Starting Verification: Global Breadcrumb Architecture & Layout...\n");

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

// 1. Verify Public Breadcrumbs Component
runTest("Breadcrumbs component conforms to spacing, semantic markup, and responsive design", () => {
  const breadcrumbPath = path.join(projectRoot, "src", "components", "marketing", "Breadcrumbs.tsx");
  const content = fs.readFileSync(breadcrumbPath, "utf-8");

  assert.ok(content.includes('aria-label="Breadcrumb"'), "Must have accessible nav landmark");
  assert.ok(content.includes('aria-current="page"'), "Must mark active page");
  assert.ok(content.includes("max-w-6xl mx-auto"), "Must use shared max-w-6xl container");
  assert.ok(content.includes("pt-4"), "Must have 16px to 24px top padding");
  assert.ok(content.includes("pb-5"), "Must have 20px to 28px bottom padding");
  assert.ok(content.includes("BreadcrumbList"), "Must output Schema.org BreadcrumbList JSON-LD");
});

// 2. Verify Zero Duplicate Paths in METADATA_REGISTRY Breadcrumbs
runTest("METADATA_REGISTRY breadcrumb arrays contain zero duplicate paths and valid hierarchies", () => {
  const metaPath = path.join(projectRoot, "src", "lib", "metadata-registry.ts");
  const content = fs.readFileSync(metaPath, "utf-8");

  // Regex to extract all breadcrumbs: [{ ... }]
  const breadcrumbMatches = content.matchAll(/breadcrumbs:\s*\[([\s\S]*?)\]/g);
  let count = 0;

  for (const match of breadcrumbMatches) {
    const arrayStr = match[1];
    // Extract paths
    const pathMatches = [...arrayStr.matchAll(/path:\s*["']([^"']+)["']/g)].map((m) => m[1]);
    assert.ok(pathMatches.length > 0, "Breadcrumb must have at least one path");

    // Check for duplicate consecutive or duplicate overall paths
    const uniquePaths = new Set(pathMatches);
    assert.strictEqual(
      uniquePaths.size,
      pathMatches.length,
      `Duplicate paths found in breadcrumb: ${pathMatches.join(" -> ")}`
    );

    // First path must always be home '/'
    assert.strictEqual(pathMatches[0], "/", `First breadcrumb must be Home ('/'), got: ${pathMatches[0]}`);

    count++;
  }

  assert.ok(count >= 20, `Expected at least 20 registered routes, verified ${count}`);
});

// 3. Verify App Dashboard Header Breadcrumbs
runTest("App Dashboard Header implements accessible, responsive, clickable breadcrumbs", () => {
  const headerPath = path.join(projectRoot, "src", "components", "common", "Header.tsx");
  const content = fs.readFileSync(headerPath, "utf-8");

  assert.ok(content.includes('aria-label="App Breadcrumb"'), "Must have accessible App Breadcrumb nav landmark");
  assert.ok(content.includes('href="/app/dashboard"'), "Must link DeployCheck to /app/dashboard");
  assert.ok(content.includes("ChevronRight"), "Must use ChevronRight separator icon");
  assert.ok(content.includes('aria-current="page"'), "Must mark currentSection as active page");
  assert.ok(content.includes("hidden md:flex"), "Must be visible on tablet and desktop (not restricted to xl)");
  assert.ok(!content.includes("hidden xl:flex"), "Must not hide breadcrumbs on md/lg screens");
});

// 4. Verify MarketingLayout Mounting
runTest("MarketingLayout mounts Breadcrumbs when route has inner page hierarchy (> 1 item)", () => {
  const layoutPath = path.join(projectRoot, "src", "components", "marketing", "MarketingLayout.tsx");
  const content = fs.readFileSync(layoutPath, "utf-8");

  assert.ok(content.includes("<Breadcrumbs items={activeBreadcrumbs} />"), "Must mount Breadcrumbs component");
  assert.ok(content.includes("activeBreadcrumbs.length > 1"), "Must only display on inner pages with >1 item");
});

// 5. Verify Solutions Overview Route Exists
runTest("Solutions overview route (/solutions) redirects to first solution", () => {
  const solutionsPage = path.join(projectRoot, "src", "app", "solutions", "page.tsx");
  assert.ok(fs.existsSync(solutionsPage), "src/app/solutions/page.tsx must exist");
  const content = fs.readFileSync(solutionsPage, "utf-8");
  assert.ok(content.includes('redirect("/solutions/developers")'), "Must redirect /solutions to /solutions/developers");
});

console.log(`\n========================================`);
console.log(`Total tests: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}

