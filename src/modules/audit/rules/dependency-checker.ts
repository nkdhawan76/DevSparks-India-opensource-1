import { AuditFinding, AuditRule, ProjectContext } from "../types";

export const DependencyCheckerRule: AuditRule = {
  id: "DEP-001",
  category: "DEPENDENCY",
  defaultSeverity: "HIGH",
  async execute(context: ProjectContext): Promise<AuditFinding[]> {
    const findings: AuditFinding[] = [];
    const pkgJsonStr = context.files.get("package.json");

    if (!pkgJsonStr) {
      findings.push({
        id: "missing-package-json",
        ruleId: "DEP-001",
        severity: "CRITICAL",
        category: "DEPENDENCY",
        title: "Missing package.json Manifest",
        description: "No package.json file was found at the repository root. Node.js projects require a manifest to resolve dependencies and build scripts.",
        filePath: "package.json",
        remediation: "Create a package.json file declaring project dependencies and scripts.",
        aiFixAvailable: true,
      });
      return findings;
    }

    try {
      const pkg = JSON.parse(pkgJsonStr);

      // Check lockfile presence
      const hasLockfile =
        context.files.has("package-lock.json") ||
        context.files.has("pnpm-lock.yaml") ||
        context.files.has("yarn.lock");

      if (!hasLockfile) {
        findings.push({
          id: "missing-lockfile",
          ruleId: "DEP-002",
          severity: "HIGH",
          category: "DEPENDENCY",
          title: "Missing Dependency Lockfile",
          description: "No lockfile (package-lock.json, pnpm-lock.yaml, or yarn.lock) was detected. Deploying without an immutable lockfile risks non-reproducible builds.",
          remediation: "Run your package manager install command locally and commit the generated lockfile to version control.",
          aiFixAvailable: false,
        });
      }

      // Check for build script
      if (!pkg.scripts || !pkg.scripts.build) {
        findings.push({
          id: "missing-build-script",
          ruleId: "DEP-003",
          severity: "MEDIUM",
          category: "BUILD",
          title: "No Production Build Script",
          description: "The package.json scripts block does not contain a 'build' script. Production deployments require a standardized build step.",
          filePath: "package.json",
          remediation: "Add a 'build' script to package.json (e.g., 'next build' or 'tsc').",
          aiFixAvailable: true,
        });
      }
    } catch {
      findings.push({
        id: "invalid-package-json",
        ruleId: "DEP-004",
        severity: "CRITICAL",
        category: "DEPENDENCY",
        title: "Malformed package.json Syntax",
        description: "Failed to parse package.json as valid JSON. Syntax errors in the manifest will crash automated package installation and CI builds.",
        filePath: "package.json",
        remediation: "Correct JSON syntax errors in package.json.",
        aiFixAvailable: true,
      });
    }

    return findings;
  },
};

