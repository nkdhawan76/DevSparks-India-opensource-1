# DevSparks DeployCheck — UI Design Inventory & Reference Analysis

**Document Version:** 1.0  
**Product:** DevSparks DeployCheck  
**Company:** DevSparks India  
**Design Reference Directory:** `UI Design/`  
**Design System Policy:** Strict Light Theme Enforced (`#F7F8FC` background, `#FFFFFF` cards, `#17172A` text, `#5938F5` primary purple brand)  

---

## 1. Executive Summary

This document establishes the comprehensive design inventory and route mapping for all 20 light-theme reference mockups provided in the `UI Design/` directory. Each reference design is mapped to an architectural module, route, reusable component set, and live backend API.

---

## 2. Complete Design Inventory & Route Mapping

| # | Reference Image Asset | Target Route | Module / Scope | Key Components & Features | Live API / Integration |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | `Super Admin Dashboard with Sidebar Toggle.png` | `/` / `/app/dashboard` | Super Admin Dashboard | Collapsible Sidebar, KPI Cards, Doughnut Chart, Recent Audits Table, Recent Deployments Table | `GET /api/v1/health`, `GET /api/v1/audits` |
| **02** | `DevSparks Project Dashboard.png` | `/app/projects` | Project Workspace | Project Cards, Framework Badges, Branch Selectors, Last Audit Score, Quick Actions | `GET /api/v1/projects` (planned) |
| **03** | `DevSparks Audit Report Dashboard.png` | `/app/audits` | Pre-Deployment Audit Engine | Severity Breakdown (Critical/High/Warn), Finding Cards, Remediation Tabs, Filter Bar | `POST /api/v1/audits` (live) |
| **04** | `DevSparks AI Deployment Dashboard.png` | `/app/ai` | AI Assistant & Diff Review | Side-by-side Diff Modal, Human Approval Gate, Streaming SSE Token Stream, Patch Runner | `POST /api/v1/ai/explain` (live SSE) |
| **05** | `DevSparks DeployCheck Deployments Dashboard.png` | `/app/deployments` | Deployment Pipelines | Step Progress Tracker, Release History, Rollback Trigger Modal, Server Target Selector | `GET /api/v1/deployments` |
| **06** | `DevSparks DeployCheck Monitoring Dashboard.png` | `/app/monitoring` | Synthetic Monitoring | Uptime Percentage Card, p95 Latency Gauge, Endpoint Probe Ledger, SSL Expiry Tracker | `GET /api/v1/monitoring/targets` |
| **07** | `DevSparks VPS Server Management Dashboard.png` | `/app/servers` | Server Infrastructure | Server Node Cards, CPU/RAM/Disk Gauges, Host Fingerprint Badges, Policy Status | `GET /api/v1/servers/diagnostics` |
| **08** | `DevSparks SSH Console Dashboard.png` | `/app/ssh-console` | Policy-Guarded Terminal | Web Terminal Runner, Command Allowlist Bar, Live Output Stream with Secret Redaction | `POST /api/v1/servers/execute` |
| **09** | `DevSparks DeployCheck Logs Dashboard.png` | `/app/logs` | Structured Log Viewer | Log Level Selector (Info/Warn/Error), Live Stream Toggle, Text Search, Auto-scroll | `GET /api/v1/logs` |
| **10** | `DevSparks Logs and SEO Dashboard.png` | `/app/seo` | SEO & Crawler Analytics | Crawler Activity Trends, HTTP Status Distribution (2xx/3xx/4xx/5xx), Bot Ledger | `GET /api/v1/seo/crawlers` |
| **11** | `DevSparks Users Management Dashboard.png` | `/app/users` | Teams & RBAC | Member Table, Role Dropdown (Super Admin, Admin, Dev), Invite Member Modal | `GET /api/v1/users` |
| **12** | `DevSparks Roles & Permissions Dashboard.png` | `/app/roles` | RBAC Matrix | Permission Table, Scoped Capability Toggles (Read/Write/Admin), Custom Role Builder | `GET /api/v1/roles` |
| **13** | `DevSparks DeployCheck Plans & Billing Dashboard.png` | `/app/plans` | Plans & Entitlements | Tier Comparison Cards (Starter, Pro, Team, Enterprise), Resource Quota Bars | `GET /api/v1/workspaces/plan` |
| **14** | `DevSparks Subscription Management Dashboard.png` | `/app/subscriptions` | Subscription Billing | Active Plan Card, Next Billing Cycle, Payment Methods, Invoice History Table | `GET /api/v1/billing/invoices` |
| **15** | `DevSparks DeployCheck Notifications Dashboard.png` | `/app/notifications` | Alert Notification Center | Channel Toggles (Email, Webhook, In-App), Severity Thresholds, Event History | `GET /api/v1/notifications` |
| **16** | `DevSparks DeployCheck Settings Dashboard.png` | `/app/settings` | Platform Global Settings | General Org Settings, Git Provider Connections, BYOK AI Keys (OpenRouter) | `POST /api/v1/ai/connections` |
| **17** | `DevSparks Website Settings Dashboard.png` | `/app/settings/website` | Website & Domain Config | Custom Domain Mapping, SSL Automation, Reverse Proxy Port, Nginx Headers | `GET /api/v1/settings/website` |
| **18** | `DevSparks Profile Settings Dashboard.png` | `/app/profile` | Developer Profile | User Avatar, Full Name, Contact Email, About Bio, Active Sessions, Security Tokens | Profile State Storage |
| **19** | `DevSparks DeployCheck Login and Signup Mockup.png` | `/login` / `/signup` | Developer Authentication | Sign-In Card, Sign-Up Card, Password Visibility Toggle, Form Validation | Authentication Handler |
| **20** | `DevSparks DeployCheck Project Setup.png` | `/app/projects/new` | Project Setup Wizard | 4-Step Setup (Details -> Repo -> Config -> Review), Branch Picker, Stack Detector | `POST /api/v1/projects` |

---

## 3. Shared Design System Tokens

```css
:root {
  --color-primary: #5938F5;
  --color-primary-hover: #4726DB;
  --color-secondary: #3988F7;
  --color-background: #F7F8FC;
  --color-surface: #FFFFFF;
  --color-text-primary: #17172A;
  --color-text-secondary: #667085;
  --color-border: #E5E7EB;
  --color-success: #16A34A;
  --color-warning: #F59E0B;
  --color-danger: #DC2626;
  --color-info: #2563EB;
}
```

---

## 4. Layout Architecture

- **Global Shell (`src/app/layout.tsx`):** Light background (`#F7F8FC`), Inter typography, responsive meta tags.
- **Navigation (`Sidebar.tsx`):**
  - Collapsible mode for desktop (`64px` icon-only vs `260px` expanded).
  - Off-canvas drawer for tablet/mobile (`< 1024px`).
  - Active route highlighting with purple brand accent (`#5938F5`).
- **Header (`Header.tsx`):**
  - Global search (`Ctrl + K`).
  - Quick action buttons ("Run Audit", "Deploy").
  - Live status indicator (Healthy / Degraded).
  - Notifications bell with badge.
  - User avatar & profile dropdown.

