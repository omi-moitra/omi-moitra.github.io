# Feature Specification — Setup and Deployment

## Table of Contents

- [Goal](#goal)
- [Toolchain](#toolchain)
- [Application Boundary](#application-boundary)
- [Route Contract](#route-contract)
- [Environment Contract](#environment-contract)
- [Build and Deployment](#build-and-deployment)
- [Progressive Loading](#progressive-loading)
- [Verification](#verification)

## Goal

Provide a reproducible React single-page application that runs locally, builds from a
locked dependency graph, and deploys every route reliably to the root GitHub Pages site.
The foundation includes routing, shared theme state, code splitting, environment-safe
Supabase configuration, linting, and automated Pages publication.

## Toolchain

- React 19 renders the component application.
- Vite 8 owns development, production builds, static assets, and environment variables.
- React Router supplies `HashRouter`, nested routes, redirects, and route parameters.
- Three.js is a route-scoped progressive enhancement.
- Supabase JS is the only backend client.
- ESLint validates JavaScript and JSX.
- npm uses the committed `package-lock.json`; CI installs with `npm ci`.

Supported commands:

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

## Application Boundary

`src/main.jsx` creates one React root, wraps the application in `StrictMode`, places one
`HashRouter` around the tree, and provides Light/Dark/System theme state. `App.jsx` owns
the route table. `Main.jsx` owns route metadata, the skip link, sticky Header, main
landmark, route outlet, and Footer.

Route components other than Home load lazily. A shared route fallback presents semantic
status text while chunks load. Home’s Three.js vortex is independently lazy so identity
and navigation render first.

## Route Contract

| Path | Access | Component behavior |
| --- | --- | --- |
| `/` | Public | Home |
| `/journey` | Public | Journey timeline and résumé |
| `/projects` | Public | Project collection |
| `/projects/:projectSlug` | Public | Project case study |
| `/links` | Public | GitHub and LinkedIn professional portals |
| `/contact` | Public | Supabase message form |
| `/login` | Hidden public | Administrator authentication |
| `/back-office` | Authenticated | Nested below `RequireSession` |
| `*` | Public | Not Found |

Redirects use `replace`: `/portfolio` and `/about` → `/journey`, `/work` → `/projects`,
`/playground` → `/links`, and `/admin` or `/backoffice` → `/back-office`.

Hash routing is an intentional GitHub Pages constraint. No public route requires a
server rewrite, copied `404.html`, or duplicated HTML entry point.

## Environment Contract

The client reads only:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The URL is normalized to the Supabase project base URL. The key is a low-privilege
publishable/anonymous browser key. When either value is absent, the exported client is
`null` and Contact, Login, and Back Office render controlled unavailable states without
issuing requests.

`persistSession: true` and `autoRefreshToken: true` preserve valid administrator
sessions. Client code never receives a service-role key or stores credentials manually.

## Build and Deployment

Vite uses `/` as its base because the repository publishes to the root
`omi-moitra.github.io` domain. The production command emits `dist/`. Static public assets
such as the logo, portraits, favicon, résumé, robots file, and sitemap retain stable
root-relative URLs.

Pushes to `main` run the GitHub Pages workflow with Node 20. The workflow checks out the
repository, installs locked dependencies, builds the site, uploads `dist`, and deploys
through the official Pages actions. Secrets used by local or production environments
are configured outside Git and are never copied into workflow logs or build artifacts.

## Progressive Loading

- Home HTML and the static scene fallback render before Three.js.
- Journey, Projects, project detail, Links, Contact, Login, Back Office, and Not Found
  are route-split.
- Home and Journey canvases are decorative and disposable.
- Responsive images include dimensions, `srcSet`, and route-appropriate loading hints.
- A missing route chunk, image, font, WebGL context, audio context, or Supabase client
  cannot remove shared navigation or readable route content.

## Verification

- Run `npm ci`, `npm run lint`, and `npm run build` from a clean checkout.
- Load and refresh every canonical hash route in local preview and GitHub Pages.
- Confirm redirect aliases replace history and resolve to canonical routes.
- Confirm `/back-office` does not mount private UI before server-backed user validation.
- Inspect built output for secrets and unexpectedly eager scene code.
- Test with JavaScript console errors monitored, WebGL disabled, audio blocked, and
  Supabase variables absent.
- Confirm the signed-out public site and 404 experience remain complete.
