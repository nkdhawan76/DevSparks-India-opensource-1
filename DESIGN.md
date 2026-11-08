# DevSparks DeployCheck — Public Navigation, Header & Footer System

This document outlines the architecture, interaction models, and responsive design specifications for the **DeployCheck** public navigation system and global marketing footer (designed by and for **DevSparks India**).

---

## 1. Design Tokens & Invariants

- **Brand Hierarchy:**
  - **Main Product Name:** `DeployCheck`
  - **Attribution & Lineage:** `By DevSparks India`
  - *Invariant:* "DevSparks" is never placed side-by-side inside the main product title.
- **Strict Light Theme Only:**
  - Canvas: `#F7F8FC`
  - Cards & Menus: `#FFFFFF`
  - Primary Text: `#17172A`
  - Secondary Text: `#667085`
  - Border Lines: `#E5E7EB`
  - Brand Purple: `#5938F5` (Hover: `#4726DB`)
  - Accent Blue: `#3563E9`
  - Success: `#16A34A`
- **Single Font Family:**
  - Platform-wide typeface: **Inter** (`Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
  - Both `font-sans` and `font-mono` map to Inter.
- **Border Radii:**
  - Elements (buttons, inputs, dropdown items): `rounded-[8px]` (8px radius).
  - Studio Outer Frame: `rounded-[36px]` with `p-2 sm:p-2.5` padding.
  - Studio Inner Card: `rounded-[32px]` with double-line architectural border.

---

## 2. Navigation Architecture (`src/components/navigation/`)

### A. `WebsiteHeader.tsx`
- **Floating Glass Container:** Max-width `6xl` (`1152px`), backdrop blur `md`, subtle border `#E5E7EB`.
- **Brand Identity:** Lightning tile (`#5938F5`) + bold `DeployCheck` with `By DevSparks India` caption.
- **Interactive Triggers:**
  - `Product` (Mega Menu)
  - `Solutions` (Mega Menu)
  - `Resources` (Mega Menu)
  - `Open Source` (Dropdown)
  - `Pricing` (Direct link)
- **Right Action Suite:**
  - `Documentation` link
  - `Sign In` (`/login`, secondary button)
  - `Get Started Free` (`/signup`, primary purple button)
- **Pointer & Focus Handling:**
  - Debounced mouse leave (150ms timeout) prevents accidental menu closing when transitioning from trigger to panel.
  - `Escape` key and click-outside dismissal listeners.

### B. `ProductMegaMenu.tsx`
- 3 distinct operational columns:
  - **DEVELOP:** Projects (`/app/projects`), Pre-deployment Audit (`/features/audit`), AI Assistant (`/features/ai-assistant`), Code Diff Review (`/features/code-review`).
  - **DEPLOY:** VPS Management (`/features/vps`), Guided Deployment (`/features/deployment`), SSH Server Assistant (`/features/ssh-assistant`).
  - **MONITOR:** Website Monitoring (`/features/monitoring`), Logs & Incidents (`/features/logs`), Maintenance (`/features/maintenance`).
- **Featured Panel:** Highlights the unified workflow with direct link to all features.

### C. `SolutionsMegaMenu.tsx`
- Multi-column role & use-case navigation:
  - **BY ROLE:** For Developers, For DevOps Teams, For Agencies, For Startups.
  - **BY USE CASE:** Pre-deployment Security, AI-assisted Debugging, VPS Automation, Website Reliability.
- **Featured Panel:** Highlights tailored engineering stacks.

### D. `ResourcesMegaMenu.tsx`
- Comprehensive learning & community hub:
  - **LEARN:** Documentation (`/documentation`), API Reference (`/docs/api`), Getting Started, Tutorials.
  - **COMMUNITY:** GitHub Repository (`DevSparks-India-opensource-1`), Changelog (`/changelog`), Roadmap (`/roadmap`), Community Discussions.

### E. `OpenSourceDropdown.tsx`
- Quick developer links: GitHub Repository, Contributing Guide, Project Roadmap, MIT License, Bug Report.

### F. `MobileNavigationDrawer.tsx`
- Responsive navigation drawer for viewports below `1024px` (`lg`):
  - Expandable accordion groups (`Product`, `Solutions`, `Resources`, `Open Source`).
  - Background scroll lock when open.
  - Accessible `X` dismiss, `Escape` key listener, and bottom CTA buttons.

### G. `FooterCTA.tsx`
- Pre-footer marketing banner:
  - Title: *"Ready to take control of your deployment workflow?"*
  - Dual CTAs: *Get Started Free* and *Explore GitHub*.

### H. `WebsiteFooter.tsx`
- 5 comprehensive columns: `PRODUCT`, `SOLUTIONS`, `RESOURCES`, `COMPANY`, `LEGAL`.
- Brand block: `DeployCheck` by `DevSparks India` with social links (GitHub, LinkedIn, X).
- Sub-bar: Copyright notice, legal links (Privacy, Terms, Security), and live System Operational status pill.

---

## 3. Responsive Breakpoints

- **1440px / 1280px:** Full desktop layout with multi-column mega menus.
- **1024px:** Compact desktop layout, menus center-aligned within viewport.
- **768px / 390px:** Mobile layout with hamburger trigger and full-height slide drawer.

