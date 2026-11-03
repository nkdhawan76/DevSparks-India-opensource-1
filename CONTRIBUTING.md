# Contributing to DevSparks DeployCheck

Thank you for your interest in contributing to **DevSparks DeployCheck**! We are committed to building an open, secure, and approachable developer operations platform.

Please review this guide before submitting issues or pull requests.

---

## Code of Conduct

All contributors and participants are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Development Workflow

### 1. Branching Strategy

Always create a new branch from `main` using structured prefixes:

- `feat/<feature-name>`: New capabilities or enhancements.
- `fix/<bug-name>`: Bug fixes and patches.
- `docs/<doc-name>`: Documentation updates or additions.
- `test/<test-name>`: Test suites and test fixtures.
- `security/<issue-name>`: Vulnerability remediation.
- `chore/<task-name>`: Build tooling or maintenance.

### 2. Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <imperative description>
```

**Allowed Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `test`: Adding or correcting tests
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `build`: Changes that affect the build system or dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that do not modify src or test files
- `security`: Security patches and hardening

### 3. Pull Request Requirements

Before opening a Pull Request:
1. Ensure your branch is rebased on the latest `main`.
2. Verify all linting, type-checking, and tests pass locally.
3. Verify that all UI changes adhere to the **Light Theme Only** policy (`#F7F9FC` background, `#FFFFFF` cards, `#3563E9` accents).
4. Do not include sensitive credentials, local `.env` files, or unredacted secrets.
5. Link relevant issues using `Closes #<issue-number>`.

---

## Reporting Bugs and Suggesting Features

- **Bugs:** Submit a report using our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.yml).
- **Features:** Propose ideas using our [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.yml).
- **Security Vulnerabilities:** Do **NOT** file public issues for security vulnerabilities. Follow the reporting procedure in [SECURITY.md](SECURITY.md).

