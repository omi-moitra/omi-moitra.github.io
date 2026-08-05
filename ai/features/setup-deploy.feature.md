# Feature Specification — Setup & Deploy

## Table of Contents

- [Feature Identity](#feature-identity)
- [Feature Goal](#feature-goal)
- [Feature Scope](#feature-scope)
- [Requirements Breakdown](#requirements-breakdown)
- [User Flow and Expected Behavior](#user-flow-and-expected-behavior)
- [Interfaces](#interfaces)
- [Data and Validation](#data-and-validation)
- [Technical Constraints](#technical-constraints)
- [Implementation Decisions](#implementation-decisions)
- [Acceptance Criteria](#acceptance-criteria)
- [Verification Plan](#verification-plan)
- [Warnings and Known Limitations](#warnings-and-known-limitations)
- [Notes for AI and Contributors](#notes-for-ai-and-contributors)

## Feature Identity

- **Feature name:** Setup & Deploy
- **Related area:** Application foundation, client-side routing, continuous deployment, and static hosting
- **Specification path:** `ai/features/setup-deploy.feature.md`
- **Required branch:** `feature/setup-deploy`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Primary users:** Developers, reviewers, coaches, and public site visitors

## Feature Goal

Provide a reproducible root-level React/Vite application that uses React Router safely on GitHub Pages and deploys the production `dist/` artifact automatically when reviewed code reaches `main`.

After this feature is complete:

- a developer can install, run, lint, and build the project with documented npm commands;
- the public and hidden route URLs can be loaded through `HashRouter` without requiring server rewrites;
- a push to `main` runs the GitHub Actions build-and-deploy pipeline;
- GitHub Pages serves the application from the repository’s root user-site URL; and
- a build or deployment failure stops the release rather than presenting it as successful.

## Feature Scope

### In Scope — Included

- Maintain one React application scaffolded with Vite and JavaScript at the repository root.
- Keep the Vite entry files, npm scripts, lockfile, and root build configuration working.
- Add `react-router-dom` as a runtime dependency and update the lockfile.
- Keep the approved `three` runtime dependency available for route-scoped progressive
  scenes while ensuring non-scene routes do not eagerly execute renderer code.
- Configure React Router with `HashRouter`.
- Register route paths for Home, Portfolio, Links, Contact, Login, and Back Office.
- Keep the browser pathname at `/` while route state is represented after the hash.
- Keep `vite.config.js` configured with `base: '/'` for the root `username.github.io` repository.
- Maintain `.github/workflows/deploy.yml` as the GitHub Pages workflow.
- Trigger deployment on pushes to `main` only.
- Install with `npm ci`, build with `npm run build`, and deploy the generated `dist/` directory.
- Use GitHub Pages’ Actions deployment source.
- Preserve least-privilege workflow permissions required to read repository contents and deploy Pages.
- Verify local development, lint, production build, preview, defined hash routes, workflow structure, and the deployed public URL.
- Inspect the production chunk graph and public assets so the readable shell is not
  blocked by Home/Portfolio scene code or oversized visual assets.

### Out of Scope — Excluded

The grading rubric explicitly excludes Supabase Setup from this feature specification. Do not add Supabase implementation requirements or acceptance criteria here.

The following belong to the global architecture and the Contact, Login, and Back Office feature work:

- creating or configuring a Supabase project;
- configuring the shared Supabase client;
- defining the `messages` table or any database schema;
- creating Row Level Security policies;
- enabling authentication or creating an administrator account;
- defining credentials, secrets, or local/deployment environment setup;
- implementing missing-service fallback behavior;
- inserting, selecting, viewing, or deleting messages; and
- signing in, persisting an authenticated session, protecting Back Office data, or signing out.

The following UI and content work is also excluded:

- final Header, Footer, desktop navigation, and mobile bottom-navigation styling;
- final Home, Portfolio, Links, Contact, Login, or Back Office content and behavior;
- the Back Office authentication guard and redirect behavior;
- final fantasy styling, AI-created images, responsive page layouts, and page-specific accessibility behavior;
- the optional splash, dark mode, language switcher, and any résumé-selection widget
  beyond the separately labeled standard/creative links owned by Portfolio; and
- README, video, interview, and submission deliverables beyond any minimal setup instructions needed to verify this feature.

## Requirements Breakdown

### Requirement 1 — Root-Level React/Vite Application

- The repository contains one root-level Vite application.
- React and React DOM remain runtime dependencies.
- JavaScript and JSX remain the implementation language; do not convert the project to TypeScript.
- `package.json` provides working `dev`, `build`, `lint`, and `preview` scripts.
- `package-lock.json` remains synchronized with `package.json`.
- Application source stays under `src/`; do not create `client/` or `server/` application roots.
- Vite starter content must be removed by the relevant page features before final submission, but removing all page content is not a prerequisite for the setup pipeline itself.

### Requirement 2 — React Router Foundation

- Install `react-router-dom` as a runtime dependency.
- Wrap the application in `HashRouter` at one clear top-level boundary.
- Define these React Router paths:

  | Route path | Deployed URL | Route role |
  | --- | --- | --- |
  | `/` | `/#/` | Public Home |
  | `/portfolio` | `/#/portfolio` | Public Portfolio |
  | `/links` | `/#/links` | Public Links |
  | `/contact` | `/#/contact` | Public Contact |
  | `/login` | `/#/login` | Hidden Login |
  | `/back-office` | `/#/back-office` | Protected Back Office destination |

- Home is the default route.
- Login and Back Office are registered as routes but are not added to public navigation.
- Feature-specific page behavior remains owned by the corresponding feature specification.
- Back Office must not render private data until its authentication guard is implemented and verified in the Back Office feature.
- Navigating among defined pages changes the hash portion of the URL without creating a server pathname such as `/portfolio`.

### Requirement 3 — Vite Root Base Path

- `vite.config.js` contains `base: '/'`.
- The project is treated as a root user-site repository, not a project subdirectory deployment.
- Root-relative public assets resolve from the deployed domain root.
- Do not change the base to the repository name or add a custom path prefix.

### Requirement 4 — Reproducible Local Build

- `npm ci` succeeds using the committed lockfile.
- `npm run dev` starts the Vite development server.
- `npm run lint` succeeds without ignored feature errors.
- `npm run build` creates a production `dist/` directory.
- `npm run preview` can serve the production bundle for local smoke testing.
- The Node version used locally and in CI must satisfy the installed Vite, React Router, and other package engine requirements.

### Requirement 5 — GitHub Actions Workflow

- A workflow exists at `.github/workflows/deploy.yml`.
- The workflow triggers on pushes to `main`.
- It does not deploy pushes to `dev` or `feature/*` branches.
- It checks out the repository.
- It configures a supported Node version and npm cache.
- It installs dependencies with `npm ci`.
- It runs `npm run build`.
- It configures GitHub Pages.
- It uploads `./dist` as the Pages artifact.
- It deploys the uploaded artifact to GitHub Pages.
- The deploy job declares the `github-pages` environment and exposes the deployment URL.
- Workflow permissions remain limited to the access needed for checkout and Pages deployment.
- A concurrency group prevents overlapping Pages releases from racing.

### Requirement 6 — GitHub Pages Repository Configuration

- The repository is public if required by the assigned GitHub plan and rubric.
- Required coaches are added as collaborators.
- Repository Settings → Pages uses **GitHub Actions** as its source.
- The public URL follows the root user-site form `https://username.github.io`.
- Loading the root URL serves the React application.
- Loading or refreshing a defined hash URL serves the same application and restores the correct client-side route.

### Requirement 7 — Failure Behavior

- A dependency-install failure stops the workflow before build or deployment.
- A build failure stops the workflow before artifact upload and deployment.
- A Pages configuration, upload, or deploy failure is visible as a failed workflow job.
- The implementation handoff must not describe deployment as successful until the GitHub Actions run and public URL are verified.
- Workflow logs must not print private credentials or sensitive configuration values.

### Requirement 8 — File Documentation and Handoff

- Every created or modified Markdown file contains an appropriate linked Table of Contents.
- Every created or modified JavaScript, JSX, or CSS file starts with the comments-based TOC required by `ai/ai-spec.md`.
- Why-comments explain non-obvious routing and deployment constraints.
- `:warning:` comments flag material invariants where removing or changing a line could break GitHub Pages routing or deployment.
- The final implementation response reports verification results and provides precise staging commands and truthful commit messages for only the relevant files.

### Requirement 9 — Progressive Scene Delivery

- Keep `three` in the single root package manifest and synchronized lockfile.
- Load Home and Portfolio scene modules through route/component-level dynamic imports.
- Render the application shell and semantic page content without waiting for renderer,
  model, texture, or particle code.
- Keep static poster/fallback assets in build-managed paths with stable dimensions.
- Inspect `npm run build` output for unexpected eager scene code and disclose any
  unusually large chunk or asset before the release checkpoint.
- A browser without WebGL must still load, navigate, and use every required workflow.

## User Flow and Expected Behavior

### Developer Setup Flow

1. The developer checks out the feature branch created from `dev`.
2. The developer runs `npm ci` at the repository root.
3. npm installs the exact dependency versions represented by `package-lock.json`.
4. The developer runs `npm run dev` and opens the local Vite URL.
5. The React application renders through `HashRouter`.
6. The developer opens each defined hash route and confirms the correct route component is selected without a server request for a nested path.
7. The developer runs lint and production build checks before requesting review.

### Public Routing Flow

1. A visitor loads `https://username.github.io`.
2. GitHub Pages returns the root `index.html` generated by Vite.
3. React mounts and `HashRouter` selects Home for `/#/`.
4. When the visitor opens a public route, only the hash route changes.
5. If the visitor refreshes a defined hash URL, GitHub Pages still requests `/`, returns the application, and React Router restores the selected page from the hash.

### Deployment Flow

1. Reviewed feature work is merged into `dev` according to the project workflow.
2. Stable `dev` is reviewed and merged into `main`.
3. The push to `main` starts `.github/workflows/deploy.yml`.
4. GitHub Actions checks out the exact commit and installs locked dependencies with `npm ci`.
5. The workflow runs the Vite production build.
6. GitHub Actions uploads only the generated `dist/` site artifact.
7. The Pages deploy action publishes the artifact.
8. The workflow records the public Pages URL.
9. A reviewer smoke-tests the root URL and every defined hash route while signed out.

### Failure Flow

1. If install, build, artifact upload, or deployment fails, the workflow reports a failed step.
2. Later release steps do not run after a required earlier step fails.
3. The developer inspects the first failing step, fixes the scoped cause on an appropriate feature branch, and reruns local lint/build checks.
4. The developer does not bypass the failure by committing generated `dist/`, removing required checks, or deploying through a second hosting service.

## Interfaces

### Frontend and Routing

- `index.html` — Vite application document and root mount point.
- `src/main.jsx` — React application bootstrap and single top-level router boundary if routing is mounted here.
- `src/App.jsx` — route registration and application-level composition if routing is defined here.
- `src/pages/` — route-level page components created by their owning features.
- `package.json` — npm scripts and runtime/development dependencies.
- `package-lock.json` — reproducible dependency resolution.

Use one `HashRouter` boundary. Do not nest routers or mix `BrowserRouter` and `HashRouter`.

### Build and Deployment

- `vite.config.js` — Vite React plugin and required root `base` value.
- `.github/workflows/deploy.yml` — automated Pages build and deployment workflow.
- `dist/` — generated production artifact; do not hand-edit or commit it.
- GitHub repository Settings → Pages — external configuration selecting GitHub Actions as the deployment source.
- GitHub Actions run summary — build/deploy status and deployed environment URL.

### Backend and API

There are no custom backend endpoints or server processes in this feature. GitHub Pages serves static files only.

Supabase setup and all Supabase-backed behavior are intentionally excluded from this feature specification.

## Data and Validation

### Data Used or Modified

This feature does not create or modify business, portfolio, authentication, or message data.

It uses configuration and build metadata only:

- npm package metadata and locked dependency versions;
- the fixed React Router path inventory;
- the fixed Vite root base path `/`;
- the deployment branch name `main`;
- the generated artifact directory `dist/`; and
- GitHub Actions job status and Pages deployment URL.

### Configuration Validation

- Reject a routing implementation that uses `BrowserRouter`, manual pathname routing, or server rewrite assumptions.
- Reject a Vite base value other than `/` for this root user-site repository.
- Reject route links that create server paths such as `/portfolio` outside the URL hash.
- Reject a deployment workflow that builds from a branch other than `main`.
- Reject `npm install` in CI; use `npm ci` with the committed lockfile.
- Reject artifact paths other than the Vite-generated `dist/` directory.
- Reject workflows that upload the repository root, source tree, local environment files, or dependencies as the Pages artifact.
- Reject a setup that requires a custom server to load or refresh a defined route.

### Expected Output

- Local development renders the React application.
- The production build generates `dist/index.html` and its referenced assets.
- Defined route state is stored after `#` in the browser URL.
- The root pathname remains `/` on public navigation.
- The main-branch workflow finishes with a Pages deployment URL when all steps succeed.

## Technical Constraints

- Use React, Vite, JavaScript, and ECMAScript modules already established in the repository.
- Use `react-router-dom` with `HashRouter`.
- Keep `base: '/'` in `vite.config.js`.
- Use one root-level application and one package manifest.
- GitHub Pages is the only hosting target.
- GitHub Actions is the only deployment mechanism.
- `main` is the only deployment branch.
- Do not commit `dist/`, `node_modules/`, local environment files, secrets, or generated caches.
- Do not add a custom backend, server fallback, redirect service, or duplicate HTML file per route.
- Do not introduce a framework, router, monorepo tool, or deployment dependency not required by this specification.
- Keep `three` limited to the approved signature scenes and lazy route chunks; do not
  add a second 3D, particle, or general animation framework.
- Preserve the code-quality, accessibility, security, branching, and handoff rules from `ai/ai-spec.md`.

## Implementation Decisions

### HashRouter Instead of BrowserRouter

GitHub Pages does not provide application-controlled rewrite rules. `HashRouter` keeps the server request pointed at `/` while allowing React Router to interpret the portion after `#`. This makes direct loading and refreshing defined client routes compatible with static hosting.

### Root Base Path

The repository is a root `username.github.io` site, so Vite uses `base: '/'`. A repository-name prefix is appropriate for a project Pages site but would be incorrect here.

### Locked Installation in CI

The workflow uses `npm ci` because deployment must reproduce the committed lockfile exactly and fail when the manifest and lockfile disagree. It must not update dependency resolution during deployment.

### Build Artifact Deployment

Only `dist/` is deployed because Vite compiles and fingerprints the production application there. Source files, dependencies, local settings, and ignored content are not part of the public artifact.

### Deployment From Main Only

Feature work is reviewed through `feature/*` and `dev`; only stable work merged to `main` is graded and deployed. Limiting the workflow trigger prevents unfinished branches from replacing the public portfolio.

### Static-First Scene Loading

The Phoenix Codex experience is progressively enhanced on static hosting. Dynamic scene
imports keep WebGL code out of the critical content path, while posters and semantic
HTML guarantee that a renderer or asset failure does not turn into an application or
deployment failure.

## Acceptance Criteria

### Application Foundation

- [x] The repository contains one root-level React/Vite JavaScript application.
- [x] `package.json` exposes working `dev`, `build`, `lint`, and `preview` scripts.
- [x] `package-lock.json` matches `package.json`.
- [x] No `client/`, `server/`, Express, MongoDB, or second frontend application is introduced.

### React Router

- [x] `react-router-dom` is a runtime dependency.
- [x] The application has exactly one top-level `HashRouter` boundary.
- [x] `/`, `/portfolio`, `/links`, `/contact`, `/login`, and `/back-office` are registered.
- [x] Home is selected for `/#/`.
- [x] Defined page navigation changes the hash while the pathname remains `/`.
- [ ] Refreshing each defined hash URL loads the application without a GitHub Pages 404.
- [x] Login and Back Office are absent from public navigation.
- [x] No private Back Office data is rendered by setup-only route scaffolding.

### Vite Build

- [x] `vite.config.js` sets `base: '/'`.
- [x] `npm ci` completes from the committed lockfile.
- [x] `npm run lint` passes.
- [x] `npm run build` passes and creates `dist/`.
- [x] `npm run preview` serves the production bundle for smoke testing.
- [ ] Home and Portfolio scene code is lazy-loaded and does not block the shared shell or semantic content.
- [ ] A WebGL-disabled smoke test preserves all routes and required workflows.
- [ ] Production build output has been inspected for unexpectedly eager or oversized scene assets.
- [x] The root and defined hash routes render from the preview build.

### GitHub Actions and Pages

- [x] `.github/workflows/deploy.yml` exists and parses as a valid GitHub Actions workflow.
- [x] The workflow triggers on pushes to `main` and does not deploy other branches.
- [x] The workflow checks out code, configures a supported Node version, runs `npm ci`, and runs `npm run build`.
- [x] The workflow configures Pages, uploads `./dist`, and deploys it with the required Pages permissions.
- [x] The deploy job uses the `github-pages` environment and exposes its deployment URL.
- [x] Workflow concurrency prevents overlapping Pages deployments.
- [ ] GitHub Pages is configured to use GitHub Actions as its source.
- [ ] A successful `main` workflow is green.
- [ ] The public root URL loads while signed out.
- [ ] Every defined public hash route loads and refreshes while signed out.

### Failure, Security, and Documentation

- [x] Install or build failure prevents artifact deployment.
- [x] Workflow failure is visible and is not reported as a successful release.
- [x] No custom backend or alternate host is required.
- [x] No private credential, local environment file, dependency directory, or source-only artifact is deployed.
- [x] Modified Markdown, JavaScript, JSX, and CSS files meet the TOC/comment requirements in `ai/ai-spec.md`.
- [x] The implementation handoff reports checks performed and gives safe exact-file staging commands and truthful commit messages.

## Verification Plan

### Local Commands

Run from the repository root:

```bash
npm ci
npm run lint
npm run build
npm run preview
```

### Local Route Matrix

With the development server and then the preview server, verify:

| URL | Expected result |
| --- | --- |
| `/#/` | Home route renders |
| `/#/portfolio` | Portfolio route renders |
| `/#/links` | Links route renders |
| `/#/contact` | Contact route renders |
| `/#/login` | Login route is reachable directly but not publicly linked |
| `/#/back-office` | Route exists without exposing private data |

For every URL, confirm the pathname remains `/` and refresh does not require a server rewrite.

### Workflow Inspection

Confirm `.github/workflows/deploy.yml` includes:

- a push trigger limited to `main`;
- checkout and supported Node setup;
- npm caching where appropriate;
- `npm ci`;
- `npm run build`;
- Pages configuration;
- upload of `./dist`;
- Pages deployment;
- least-privilege permissions; and
- deployment concurrency control.

### Production Smoke Test

After a reviewed `dev` → `main` merge:

1. Confirm the GitHub Actions deployment run is green.
2. Open the recorded Pages URL in a signed-out browser session.
3. Confirm the root page loads over HTTPS.
4. Open and refresh every defined public hash route.
5. Confirm no route creates a nested server pathname.
6. Confirm Login and Back Office do not appear in public navigation.
7. Record any production-only failure before declaring the checkpoint complete.

## Warnings and Known Limitations

> :warning: `HashRouter` is a required static-hosting decision. Replacing it with `BrowserRouter` without server rewrite support will make direct route loads or refreshes fail on GitHub Pages.

> :warning: `base: '/'` is correct only because this repository deploys as the root `username.github.io` site. Do not copy a project-repository base-path example into this configuration.

> :warning: A route being hidden from navigation does not make it secure. Setup may register Back Office, but its feature must add an authentication guard before any private data exists in the UI.

> :warning: A local build does not prove deployment succeeded. Do not mark production acceptance criteria complete until the `main` workflow and signed-out public URL are verified.

> :warning: This feature specification intentionally excludes Supabase Setup because the grading rubric labels it “NOT INCLUDE IN FEATURE SPECIFICATION.” Do not expand this spec with database, client, RLS, authentication, credential, or environment requirements.

## Notes for AI and Contributors

- Read `ai/ai-spec.md` before implementing this feature.
- Keep changes limited to setup, routing foundation, build configuration, and GitHub Pages deployment.
- Do not implement page-specific content or behavior merely to fill registered routes.
- Do not implement or document Supabase Setup in this feature.
- Preserve existing correct workflow, Vite, and package configuration instead of recreating it without reason.
- Inspect the working tree before editing and preserve unrelated user changes.
- Add the required TOC banner to every modified JavaScript, JSX, and CSS file, and maintain linked TOCs in Markdown.
- Use why-comments for the `HashRouter`, root base, and other non-obvious static-hosting decisions.
- Run local verification before describing the feature as complete.
- Do not mark external GitHub settings, workflow success, or public deployment complete without direct evidence.
- End the implementation handoff with exact staging commands and a truthful commit message for only the relevant files.
