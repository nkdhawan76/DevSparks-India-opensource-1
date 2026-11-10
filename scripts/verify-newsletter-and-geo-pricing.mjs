/**
 * Automated Verification Suite for Newsletter API, Geo Pricing, and Footer Refinements
 * DevSparks DeployCheck
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🚀 Starting Verification: Newsletter, Geo Pricing & Footer Refinements...\n");

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

// 1. Verify Logo Square Shape Invariant
runTest("DeployCheckLogo uses square rect with rounded corners (never circle)", () => {
  const iconsPath = path.join(projectRoot, "src", "components", "common", "Icons.tsx");
  const content = fs.readFileSync(iconsPath, "utf-8");
  assert.ok(content.includes('<rect width="32" height="32" rx="7" fill="#5938F5" />'), "DeployCheckLogo must contain square rect");
  assert.ok(!content.includes('<circle cx="16" cy="16" r="16" fill="#5938F5" />'), "DeployCheckLogo must not contain circle badge");
});

// 2. Verify Footer Phase 1 Cleanups
runTest("WebsiteFooter removes Platform Health card and unsupported claims", () => {
  const footerPath = path.join(projectRoot, "src", "components", "navigation", "WebsiteFooter.tsx");
  const content = fs.readFileSync(footerPath, "utf-8");
  assert.ok(!content.includes("Platform Health"), "Must not contain 'Platform Health'");
  assert.ok(!content.includes("Mumbai Core"), "Must not contain 'Mumbai Core'");
  assert.ok(!content.includes("99.98% Uptime"), "Must not contain '99.98% Uptime'");
});

runTest("WebsiteFooter removes 'Built with ❤️ for developers worldwide' tagline", () => {
  const footerPath = path.join(projectRoot, "src", "components", "navigation", "WebsiteFooter.tsx");
  const content = fs.readFileSync(footerPath, "utf-8");
  assert.ok(!content.includes("Built with"), "Must not contain 'Built with' copyright tagline");
  assert.ok(!content.includes("for developers worldwide"), "Must not contain 'for developers worldwide'");
});

runTest("WebsiteFooter bottom sub-bar includes MarketSelector and removes Operational badge", () => {
  const footerPath = path.join(projectRoot, "src", "components", "navigation", "WebsiteFooter.tsx");
  const bottomBarPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterBottomBar.tsx");
  const content = fs.existsSync(bottomBarPath)
    ? fs.readFileSync(footerPath, "utf-8") + "\n" + fs.readFileSync(bottomBarPath, "utf-8")
    : fs.readFileSync(footerPath, "utf-8");
  assert.ok(content.includes("<MarketSelector"), "Must contain MarketSelector in footer");
  assert.ok(!content.includes('href="/status"\n              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50'), "Must not contain operational pill in sub-bar");
});

// 3. Verify Breadcrumbs Layout & Spacing
runTest("Breadcrumbs component has spacious vertical padding (pt-4/pt-5 pb-5/pb-6)", () => {
  const breadcrumbPath = path.join(projectRoot, "src", "components", "marketing", "Breadcrumbs.tsx");
  const content = fs.readFileSync(breadcrumbPath, "utf-8");
  assert.ok(content.includes("pt-4 sm:pt-5 pb-5 sm:pb-6"), "Breadcrumbs must have spacious vertical padding");
  assert.ok(content.includes('aria-current="page"'), "Current item must be unclickable with aria-current");
  assert.ok(content.includes("BreadcrumbList"), "Breadcrumbs must output Schema.org BreadcrumbList");
});

// 4. Verify Market Registry & Pricing Engine
runTest("Centralized market registry correctly defines IN, UK, and US", async () => {
  const { getMarket, getRegionalPricing } = await import("../src/lib/markets.ts");
  
  const inMarket = getMarket("in");
  assert.equal(inMarket.currency, "INR");
  assert.equal(inMarket.currencySymbol, "₹");
  
  const ukMarket = getMarket("uk");
  assert.equal(ukMarket.currency, "GBP");
  assert.equal(ukMarket.currencySymbol, "£");
  
  const usMarket = getMarket("us");
  assert.equal(usMarket.currency, "USD");
  assert.equal(usMarket.currencySymbol, "$");

  const inPricing = getRegionalPricing("in");
  assert.equal(inPricing.pro.formattedMonthly, "₹999");

  const ukPricing = getRegionalPricing("uk");
  assert.equal(ukPricing.pro.formattedMonthly, "£9.99");

  const usPricing = getRegionalPricing("us");
  assert.equal(usPricing.pro.formattedMonthly, "$12.99");
});

// 5. Verify SQL Migration File
runTest("SQL migration 0003_newsletter_and_markets.sql exists and creates required tables", () => {
  const migrationPath = path.join(projectRoot, "migrations", "0003_newsletter_and_markets.sql");
  assert.ok(fs.existsSync(migrationPath), "Migration file must exist");
  const content = fs.readFileSync(migrationPath, "utf-8");
  assert.ok(content.includes("CREATE TABLE IF NOT EXISTS newsletter_subscriptions"), "Must create newsletter_subscriptions table");
  assert.ok(content.includes("CREATE TABLE IF NOT EXISTS markets"), "Must create markets table");
  assert.ok(content.includes("CREATE TABLE IF NOT EXISTS regional_plan_prices"), "Must create regional_plan_prices table");
});

// 6. Verify Git Markdown Tracking Invariant
runTest("Only CHANGELOG.md is tracked as markdown file in git", () => {
  const gitignorePath = path.join(projectRoot, ".gitignore");
  const content = fs.readFileSync(gitignorePath, "utf-8");
  assert.ok(content.includes("*.md"), ".gitignore must ignore *.md");
  assert.ok(content.includes("!CHANGELOG.md"), ".gitignore must allow !CHANGELOG.md");
});

console.log(`\n========================================`);
console.log(`Total tests: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}

