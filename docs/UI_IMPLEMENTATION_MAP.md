# DevSparks DeployCheck — UI Implementation & Component Architecture Map

**Document Version:** 1.0  
**Company:** DevSparks India  
**Product:** DevSparks DeployCheck  
**Frontend Framework:** Next.js (App Router) + TypeScript + Tailwind CSS  
**Theme Policy:** Strict Light Theme Only (`#F7F8FC` background, `#FFFFFF` cards, `#17172A` text, `#5938F5` purple brand)  

---

## 1. Architectural Strategy

The application user interface consists of three primary layers:
1. **Public Marketing Shell (`/`, `/features`, `/pricing`, `/docs`)** — Conversion-focused, informative, responsive developer portal.
2. **Authentication Flow (`/login`, `/signup`, `/forgot-password`)** — Secure developer authentication, token exchange, and tenant onboarding.
3. **Core Dashboard Application (`/app/*`)** — Full-featured developer operations control plane sharing a common header, collapsible sidebar, notifications drawer, and modal systems.

---

## 2. Reusable Component Hierarchy

```text
src/components/
├── common/
│   ├── Header.tsx              # App header (search, notifications, status, profile)
│   ├── Sidebar.tsx             # Collapsible navigation drawer with light active states
│   ├── Breadcrumbs.tsx         # Hierarchical route breadcrumbs
│   ├── KpiCard.tsx             # Standard metrics card with trend delta
│   ├── StatusBadge.tsx         # Severity (Critical, High, Warning, Success) badges
│   └── ConfirmModal.tsx        # High-risk human approval modal (Gate Invariant)
├── audit/
│   ├── AuditFindingCard.tsx    # Finding detail card with file/line evidence
│   ├── SeverityFilter.tsx      # Multi-select severity toggle
│   └── RemediationAdvice.tsx   # Patch guidance and code snippet
├── ai/
│   ├── DiffReviewModal.tsx     # Side-by-side patch proposal with accept/reject gate
│   ├── StreamingTokenView.tsx  # Real-time SSE token reader
│   └── ProviderSelector.tsx    # BYOK model & provider selector
├── server/
│   ├── ServerMetricsGauge.tsx  # CPU / RAM / Disk usage bar
│   ├── HostFingerprint.tsx     # SSH SHA-256 fingerprint badge
│   └── PolicyCommandBar.tsx    # Restricted command runner with allowlist filter
└── monitoring/
    ├── ProbeStatusCard.tsx     # Real-time HTTP/TCP uptime badge
    ├── LatencyChart.tsx        # p95 response time SVG sparkline
    └── IncidentLedger.tsx      # Deduplicated incident log table
```

---

## 3. Responsive Breakpoint Standards

All views adhere strictly to the following responsive design rules:
- **Mobile (`< 768px`):** Single-column stacked layouts, sidebar collapses to an off-canvas drawer, tables enable horizontal scroll with sticky primary identifier column.
- **Tablet (`768px – 1024px`):** 2-column KPI card grid, condensed sidebar, modals fit viewport with vertical scroll.
- **Desktop (`>= 1024px`):** Full 4-column KPI cards, side-by-side diff review modal, persistent expandable sidebar.

---

## 4. Phase Execution Ledger

| Phase | Module | Target Routes | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Design Reference Inspection & Inventory | All 20 assets | ✅ Completed (`docs/UI_DESIGN_INVENTORY.md`) |
| **Phase 2** | Shared Component Library | Common components | 🔄 In Progress |
| **Phase 3** | Public Marketing & Docs | `/` | 🔄 Next |
| **Phase 4** | Authentication Suite | `/login`, `/signup` | 🔄 Scheduled |
| **Phase 5** | Super Admin Dashboard | `/app/dashboard` | 🔄 Active |
| **Phase 6** | Pre-Deployment Audit Engine | `/app/audits` | 🔄 Active |
| **Phase 7** | BYOK AI Assistant & Diff Review | `/app/ai` | 🔄 Active |
| **Phase 8** | Server & Deployments Infrastructure | `/app/servers`, `/app/deployments` | 🔄 Scheduled |

