/**
 * DevSparks DeployCheck — Disposable Email Domains Upstream Synchronizer
 *
 * Fetches the latest community blocklist, deduplicates, validates domain syntax,
 * enforces safety filtering against legitimate providers (Gmail, Outlook, Zoho, etc.),
 * and updates src/data/disposable-domains.json.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const TARGET_FILE = path.join(PROJECT_ROOT, "src", "data", "disposable-domains.json");

const UPSTREAM_URL =
  "https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf";

// Inviolable allowlist of legitimate consumer and business email domains
const PROTECTED_ALLOWLIST = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "yahoo.com.br",
  "ymail.com",
  "rocketmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "tuta.com",
  "tutanota.com",
  "tuta.io",
  "fastmail.com",
  "fastmail.fm",
  "zoho.com",
  "zohomail.com",
  "rediffmail.com",
  "rediff.com",
  "aol.com",
  "aim.com",
  "mail.com",
  "gmx.com",
  "gmx.net",
  "yandex.com",
  "yandex.ru",
  "devsparks.in",
  "devsparksindia.com",
]);

async function sync() {
  console.log("==================================================");
  console.log("DevSparks DeployCheck — Disposable Domains Sync");
  console.log("==================================================\n");

  console.log(`[1/4] Fetching upstream blocklist from:\n  ${UPSTREAM_URL}`);
  const res = await fetch(UPSTREAM_URL, {
    headers: { "User-Agent": "DevSparks-DeployCheck-Sync/1.0" },
  });

  if (!res.ok) {
    throw new Error(`Upstream fetch failed with HTTP ${res.status}: ${res.statusText}`);
  }

  const rawText = await res.text();
  const rawLines = rawText.split(/\r?\n/);
  console.log(`  Received ${rawLines.length.toLocaleString()} raw lines.`);

  console.log("[2/4] Normalizing, deduplicating, and applying safety guards...");
  const domainSet = new Set();
  let filteredCount = 0;

  for (const line of rawLines) {
    const trimmed = line.trim().toLowerCase();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) continue;

    // Check basic domain format
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(trimmed)) continue;

    // Inviolable safety filter: never allow legitimate providers in blocklist
    if (PROTECTED_ALLOWLIST.has(trimmed)) {
      console.warn(`  ⚠️ Filtered out protected legitimate domain: ${trimmed}`);
      filteredCount++;
      continue;
    }

    domainSet.add(trimmed);
  }

  const sortedDomains = Array.from(domainSet).sort();
  console.log(`  Processed ${sortedDomains.length.toLocaleString()} unique valid disposable domains.`);
  if (filteredCount > 0) {
    console.log(`  Filtered out ${filteredCount} protected domains.`);
  }

  if (sortedDomains.length < 5000) {
    throw new Error(`Sanity check failed: Expected >= 5000 domains, but got ${sortedDomains.length}`);
  }

  console.log(`[3/4] Comparing with existing dataset...`);
  let existingCount = 0;
  try {
    const currentData = JSON.parse(await fs.readFile(TARGET_FILE, "utf8"));
    existingCount = currentData.length;
    console.log(`  Existing dataset size: ${existingCount.toLocaleString()} domains.`);
  } catch {
    console.log(`  No existing dataset found. Initializing new file.`);
  }

  console.log(`[4/4] Writing output to ${TARGET_FILE}...`);
  await fs.writeFile(TARGET_FILE, JSON.stringify(sortedDomains), "utf8");

  const diff = sortedDomains.length - existingCount;
  console.log(`\n✅ Synchronization complete!`);
  console.log(`  Final count: ${sortedDomains.length.toLocaleString()} domains (${diff >= 0 ? "+" : ""}${diff})`);
}

sync().catch((err) => {
  console.error("\n❌ Sync failed:", err.message);
  process.exit(1);
});

