# DevSparks DeployCheck — Development Guide

> Local setup, verification, and code quality workflows for **DevSparks DeployCheck**.  
> Maintained by **DevSparks India**.

---

## 1. Prerequisites

Before setting up DevSparks DeployCheck locally, ensure your environment meets the following requirements:

- **Node.js:** `>= 20.0.0 LTS`
- **npm:** `>= 10.0.0`
- **Git:** `>= 2.30.0`
- **PostgreSQL (Optional):** `>= 14.0` (Local development uses deterministic in-memory storage fallbacks if no database is connected).

---

## 2. Quick Start Setup

```bash
# 1. Clone the repository
git clone https://github.com/nkdhawan76/DevSparks-India-opensource-1.git
cd DevSparks-India-opensource-1

# 2. Configure environment variables
cp .env.example .env.local

# 3. Install dependencies
npm install

# 4. Run the core verification test suite
npm test

# 5. Execute pre-deployment auditor
npm run audit

# 6. Start the local Next.js development server
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 3. Available NPM Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Starts local Next.js dev server with hot reload |
| `npm run build` | `next build` | Compiles optimized production bundle |
| `npm start` | `next start` | Runs the compiled Next.js production server |
| `npm run typecheck` | `tsc --noEmit` | Validates TypeScript types across the codebase |
| `npm run lint` | `eslint . --ext .ts,.tsx` | Executes ESLint analysis with strict type rules |
| `npm test` | `node scripts/verify-mvp.mjs` | Executes 15 deterministic MVP invariant tests |
| `npm run audit` | `node scripts/run-audit.mjs` | Runs the pre-deployment static analysis scanner |

---

## 4. Architectural & Quality Standards

When authoring or modifying code in DevSparks DeployCheck:

1. **Strict Light Theme Only:**  
   **NEVER implement dark mode, dark theme tokens, or theme toggles.** All UI components must use the light palette defined in PRD Section 7 (`#F7F9FC` background, `#FFFFFF` cards, `#172033` primary text, `#3563E9` brand blue).
2. **Policy-Controlled AI Invariant:**  
   The platform is **never** an unrestricted shell runner. AI models must only propose structured diff plans. Sensitive operations require explicit human approval via the visual diff review modal.
3. **No Fabricated Data or Artificial Work:**  
   Never generate fake operational metrics, simulated CI results, or empty commits to inflate contribution graphs.
4. **Credential Isolation:**  
   Never commit `.env` files, API keys, private SSH keys, or secrets. Raw keys must never appear in application logs or API responses.
5. **Zero-Failure CI Rule:**  
   All local tests, typechecks, and audits must pass cleanly before any code is pushed to remote branches.

---

## 5. Pre-Commit Verification Checklist

Before opening a pull request or pushing changes, execute:

```bash
# 1. Run deterministic invariant test suite
npm test

# 2. Run static pre-deployment auditor
npm run audit

# 3. Verify TypeScript types
npm run typecheck

# 4. Check code linting
npm run lint

# 5. Build application
npm run build
```

---

## 6. Conventional Commits Standard

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat(scope): add new capability`
- `fix(scope): resolve bug or defect`
- `docs(scope): update documentation`
- `test(scope): add or improve tests`
- `chore(scope): repository maintenance`

