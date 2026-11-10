/**
 * Automated Verification Suite for DevSparks DeployCheck Footer Redesign
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🚀 Starting Verification: DevSparks DeployCheck Footer Redesign...\n");

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

// 1. Verify Modular Component Architecture
runTest("Modular footer subcomponents exist in src/components/navigation/footer/", () => {
  const brandPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterBrand.tsx");
  const navPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterNavColumns.tsx");
  const newsPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterNewsletter.tsx");
  const bottomPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterBottomBar.tsx");

  assert.ok(fs.existsSync(brandPath), "FooterBrand.tsx must exist");
  assert.ok(fs.existsSync(navPath), "FooterNavColumns.tsx must exist");
  assert.ok(fs.existsSync(newsPath), "FooterNewsletter.tsx must exist");
  assert.ok(fs.existsSync(bottomPath), "FooterBottomBar.tsx must exist");
});

// 2. Verify Reusable Footer Skeleton
runTest("Skeletons.tsx exports reusable FooterSkeleton with aria-busy", () => {
  const skeletonsPath = path.join(projectRoot, "src", "components", "common", "Skeletons.tsx");
  const content = fs.readFileSync(skeletonsPath, "utf-8");

  assert.ok(content.includes("export function FooterSkeleton"), "FooterSkeleton must be exported");
  assert.ok(content.includes('aria-busy="true"'), "FooterSkeleton must declare aria-busy");
  assert.ok(content.includes('role="status"'), "FooterSkeleton must declare role='status'");
});

// 3. Verify Banned Elements Completely Removed
runTest("Banned elements (Platform Health, Mumbai Core, 99.98% Uptime, Built with heart) are absent", () => {
  const footerDir = path.join(projectRoot, "src", "components", "navigation", "footer");
  const mainFooter = path.join(projectRoot, "src", "components", "navigation", "WebsiteFooter.tsx");

  const files = [
    mainFooter,
    path.join(footerDir, "FooterBrand.tsx"),
    path.join(footerDir, "FooterNavColumns.tsx"),
    path.join(footerDir, "FooterNewsletter.tsx"),
    path.join(footerDir, "FooterBottomBar.tsx"),
  ];

  const bannedPatterns = [
    "Platform Health",
    "Mumbai Core",
    "99.98% Uptime",
    "Built with heart",
    "Built with ❤️",
    "Made with love",
    "for developers worldwide",
  ];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf-8");
    for (const banned of bannedPatterns) {
      assert.ok(
        !text.includes(banned),
        `File ${path.basename(file)} must not contain banned text: "${banned}"`
      );
    }
  }
});

// 4. Verify Brand & 5-Column Navigation Preservation
runTest("Brand and 5-Column Navigation (Product, Solutions, Resources, Company, Legal) preserved", () => {
  const navPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterNavColumns.tsx");
  const content = fs.readFileSync(navPath, "utf-8");

  assert.ok(content.includes('title="PRODUCT"'), "PRODUCT column must exist");
  assert.ok(content.includes('title="SOLUTIONS"'), "SOLUTIONS column must exist");
  assert.ok(content.includes('title="RESOURCES"'), "RESOURCES column must exist");
  assert.ok(content.includes('title="COMPANY"'), "COMPANY column must exist");
  assert.ok(content.includes('title="LEGAL"'), "LEGAL column must exist");
});

// 5. Verify Social Links
runTest("Social links exist with accessible labels (GitHub, LinkedIn, X, Status)", () => {
  const brandPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterBrand.tsx");
  const content = fs.readFileSync(brandPath, "utf-8");

  const requiredAttributes = [
    'href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"',
    'href="https://linkedin.com/company/devsparks-india"',
    'href="https://x.com/devsparksindia"',
  ];
  for (const attr of requiredAttributes) {
    assert.ok(content.indexOf(attr) !== -1, `Required link attribute ${attr} must exist`);
  }
  assert.ok(content.indexOf('href="/status"') !== -1, "Status link must exist");
  assert.ok(content.indexOf('aria-label="GitHub Repository"') !== -1, "Accessible aria-label for GitHub");
});

// 6. Verify Real Newsletter API & Loading State
runTest("Newsletter form integrates with POST /api/v1/newsletter/subscribe with loading state", () => {
  const newsPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterNewsletter.tsx");
  const content = fs.readFileSync(newsPath, "utf-8");

  assert.ok(content.includes("/api/v1/newsletter/subscribe"), "Must call newsletter subscribe endpoint");
  assert.ok(content.includes("aria-busy={submitting}"), "Must communicate busy state to accessibility tree");
  assert.ok(content.includes("group-hover:translate-x-0.5"), "Must have micro-animation on send icon");
});

// 7. Verify GSAP Coordinated Entrance & ScrollTrigger Line Reveal
runTest("WebsiteFooter implements ScrollTrigger line reveal and reduced-motion guard", () => {
  const footerPath = path.join(projectRoot, "src", "components", "navigation", "WebsiteFooter.tsx");
  const content = fs.readFileSync(footerPath, "utf-8");

  assert.ok(content.includes("ScrollTrigger"), "Must use GSAP ScrollTrigger");
  assert.ok(content.includes(".footer-line-reveal"), "Must implement line reveal");
  assert.ok(content.includes("prefers-reduced-motion"), "Must respect prefers-reduced-motion");
  assert.ok(content.includes('role="contentinfo"'), "Must have role='contentinfo' for accessibility");
});

// 8. Verify Bottom Bar Legal Links & MarketSelector
runTest("FooterBottomBar contains copyright, legal links, and MarketSelector", () => {
  const bottomPath = path.join(projectRoot, "src", "components", "navigation", "footer", "FooterBottomBar.tsx");
  const content = fs.readFileSync(bottomPath, "utf-8");

  assert.ok(content.includes("DevSparks India. All rights reserved."), "Must contain copyright");
  assert.ok(content.includes('href="/privacy"'), "Must have Privacy link");
  assert.ok(content.includes('href="/terms"'), "Must have Terms link");
  assert.ok(content.includes('href="/security"'), "Must have Security link");
  assert.ok(content.includes("<MarketSelector"), "Must mount MarketSelector");
});

console.log(`\n========================================`);
console.log(`Total tests: ${passed + failed}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}

