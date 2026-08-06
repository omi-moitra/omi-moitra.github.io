# Technical Architecture and Implementation Constraints

## Required Technology Stack

The implementation must use the existing project stack. Do not replace, upgrade, or introduce major architectural dependencies unless explicitly requested.

### Frontend

* React 19
* Vite 8
* JavaScript using ECMAScript modules
* Semantic HTML5
* Standard project CSS
* CSS custom properties for design tokens and theming
* `react-router-dom`
* `HashRouter` for client-side routing

Do not assume that any of the following are installed:

* Tailwind CSS
* Styled Components
* Sass
* Next.js
* Remix
* Gatsby
* Astro
* shadcn/ui
* Material UI
* Chakra UI
* Bootstrap
* Any other component framework

All components must be implemented using React, semantic HTML, JavaScript, and the project’s existing CSS architecture.

---

# Application Architecture

The website is a client-rendered single-page application.

The application must be built into static files and must not require a custom application server.

Use a structure similar to:

```text
src/
├── assets/
│   ├── images/
│   ├── illustrations/
│   ├── icons/
│   └── fonts/
├── components/
│   ├── common/
│   ├── navigation/
│   ├── projects/
│   ├── sections/
│   └── ui/
├── data/
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   ├── experiments.js
│   └── socialLinks.js
├── hooks/
├── layouts/
├── lib/
│   └── supabaseClient.js
├── pages/
│   ├── HomePage.jsx
│   ├── ProjectPage.jsx
│   ├── PlaygroundPage.jsx
│   ├── LoginPage.jsx
│   ├── AdminPage.jsx
│   └── NotFoundPage.jsx
├── styles/
│   ├── reset.css
│   ├── tokens.css
│   ├── global.css
│   ├── utilities.css
│   └── animations.css
├── App.jsx
└── main.jsx
```

This structure may be adapted to match the current repository, but the implementation should preserve clear separation between:

* Presentational components
* Page-level components
* Content and data
* Supabase operations
* Reusable hooks
* Global styling
* Feature-specific styling

Do not create unnecessary abstractions or deeply nested component folders.

---

# Routing

Use `HashRouter` from `react-router-dom`.

The application must work correctly when hosted on GitHub Pages without requiring server-side route rewrites.

Example production URLs may look like:

```text
https://username.github.io/#/
https://username.github.io/#/work
https://username.github.io/#/projects/rocket-food-delivery
https://username.github.io/#/playground
```

Recommended route structure:

```text
/
 /work
 /projects/:projectSlug
 /about
 /playground
 /contact
 /login
 /admin
 *
```

The primary homepage may contain all major portfolio sections, while project case studies and larger playground items may use dedicated routes.

Navigation links should use React Router’s `Link` or `NavLink` rather than raw internal anchor URLs, except when scrolling to a section on the current page.

Use standard anchor links for external URLs such as:

* GitHub
* LinkedIn
* Live project demos
* Resume files
* Email links

---

# Homepage Section Navigation

The homepage should remain a cohesive scrolling experience.

Primary section IDs:

```text
#home
#work
#about
#skills
#playground
#experience
#contact
```

Because the application uses `HashRouter`, avoid directly relying on URL hash fragments for both routing and section navigation at the same time.

Use one of these approaches:

1. Keep the homepage route as `#/` and scroll to sections programmatically.
2. Store the desired section in navigation state.
3. Use buttons that call `element.scrollIntoView()` after routing to the homepage.

Recommended behavior:

```js
navigate('/', {
  state: {
    scrollTo: 'work',
  },
});
```

The homepage should then detect the state and scroll to the requested section after rendering.

Do not create conflicting URLs such as:

```text
#/work#projects
```

unless the current router implementation is explicitly designed to support them.

---

# Backend Service

Supabase is the only backend service.

The application must not introduce:

* Express
* A custom Node server
* Java or Spring Boot
* Serverless API routes
* Next.js API routes
* Firebase
* MongoDB
* A second database
* A separate authentication service
* A custom application server

All dynamic data operations must use Supabase through the shared client:

```text
src/lib/supabaseClient.js
```

Use:

```js
import { supabase } from '../lib/supabaseClient';
```

Adjust relative paths according to the calling file.

Do not create multiple Supabase client instances throughout the project.

---

# Supabase Client Configuration

The shared Supabase client should read public configuration values from Vite environment variables.

Expected variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Example:

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
```

Never expose:

* The Supabase service-role key
* Database passwords
* Private administrative credentials
* Secrets that bypass Row Level Security

The Supabase anonymous key may be included in the frontend build because authorization must be enforced through Row Level Security.

---

# Database Responsibilities

Supabase Postgres may be used for editable portfolio content and authenticated administrative features.

Potential tables include:

```text
profiles
projects
project_media
skills
experience
experiments
contact_messages
site_settings
```

The implementation should not create all tables unless they are actually required.

The first version may use local JavaScript data files for public portfolio content and reserve Supabase for:

* Authentication
* Contact form submissions
* Admin-managed content
* Future content editing
* Draft and publication status

Choose the simplest architecture that satisfies the current feature requirements.

Do not migrate static content into the database merely to make the application appear more complex.

---

# Recommended Content Strategy

Use a hybrid content model.

## Local Content

Store stable, version-controlled content in JavaScript data files:

```text
src/data/projects.js
src/data/skills.js
src/data/experience.js
src/data/experiments.js
src/data/socialLinks.js
```

This content may include:

* Project names
* Project slugs
* Descriptions
* Technologies
* Local image paths
* Case-study sections
* Experience history
* Skills
* Social links

Example:

```js
export const projects = [
  {
    id: 'rocket-food-delivery',
    slug: 'rocket-food-delivery',
    title: 'Rocket Food Delivery',
    summary:
      'A full-stack restaurant ordering experience designed around fast, clear mobile interactions.',
    featured: true,
    technologies: [
      'React',
      'JavaScript',
      'Spring Boot',
      'MySQL',
    ],
    links: {
      repository: '',
      demo: '',
    },
    coverImage: '/images/projects/rocket-food-delivery/cover.webp',
  },
];
```

Although the portfolio application itself has no custom backend, project descriptions may reference backend technologies used in the showcased projects.

## Supabase Content

Use Supabase only for content that benefits from being remotely editable or user-generated.

Examples:

* Contact form submissions
* Published versus draft content
* Site announcements
* Admin-managed project records
* Visitor messages

---

# Row Level Security

Row Level Security must be enabled on every exposed Supabase table.

Do not rely on hiding UI controls as a security mechanism.

Expected policy behavior:

## Public Read Access

Public visitors may read only content intended to be published.

Example rule:

```text
Public users may select project records where published = true.
```

## Authenticated Administrative Access

Only approved authenticated users may:

* Create projects
* Edit projects
* Delete projects
* View drafts
* Manage site settings
* Read private contact submissions

Do not assume that every authenticated Supabase user is automatically an administrator.

Use a profile record or allowlist mechanism to determine administrative access.

Possible profile fields:

```text
id
email
role
created_at
```

Possible role values:

```text
admin
editor
```

The database policies must enforce the role checks.

---

# Authentication

Use Supabase email/password authentication.

Authentication is only required for private administrative functionality.

Public visitors must not need an account to:

* Browse the portfolio
* View project case studies
* View the playground
* Open external project links
* Download the public resume
* Submit a contact form

Authentication features may include:

* Admin login
* Logout
* Session restoration
* Protected admin routes
* Unauthorized-route redirection
* Authentication error messages

Do not add public registration unless explicitly requested.

---

# Authentication State

Create a centralized authentication provider or hook.

Recommended responsibilities:

* Read the initial Supabase session
* Subscribe to authentication state changes
* Expose the current user
* Expose loading state
* Expose login and logout operations
* Avoid duplicate session listeners

Example shape:

```js
const {
  user,
  session,
  isLoading,
  signIn,
  signOut,
} = useAuth();
```

During the initial session check, protected routes should show an accessible loading state rather than briefly rendering private content.

---

# Protected Routes

The following routes may be private:

```text
/admin
/admin/projects
/admin/projects/new
/admin/projects/:projectId/edit
/admin/messages
```

A protected route must verify:

1. A valid Supabase session exists.
2. The authenticated user has the required profile role.

If either requirement fails:

* Redirect unauthenticated users to `/login`.
* Show an unauthorized state or redirect non-admin users to the public homepage.

Route protection in React is for user experience only. Actual data protection must still be enforced by Supabase Row Level Security.

---

# Contact Form

The contact form may submit directly to a Supabase table.

Suggested fields:

```text
id
name
email
subject
message
created_at
status
```

Possible status values:

```text
new
read
archived
```

Validation requirements:

* Name is required.
* Email is required.
* Email must have a valid format.
* Message is required.
* Message must have a reasonable minimum and maximum length.
* Whitespace-only values are invalid.
* Submission controls must be disabled while submitting.
* Success and failure feedback must be accessible.

Security requirements:

* Public users may insert contact messages.
* Public users may not read contact messages.
* Only approved administrators may read or update messages.
* Do not return private records after a public insert.
* Add a hidden honeypot field to discourage simple bots.
* Prevent repeated submissions while one request is pending.

Do not store sensitive personal information beyond what is required for contact.

---

# Styling Architecture

Use standard CSS and CSS custom properties.

Do not convert the project to Tailwind or CSS-in-JS.

Recommended global files:

```text
src/styles/reset.css
src/styles/tokens.css
src/styles/global.css
src/styles/utilities.css
src/styles/animations.css
```

Component-specific styles may use:

```text
ComponentName.css
```

or an equivalent feature-level CSS structure.

Do not create one massive stylesheet containing the entire application.

---

# CSS Design Tokens

Define the visual system using CSS custom properties.

Example:

```css
:root {
  --color-background: #f8f5ef;
  --color-surface: #ffffff;
  --color-surface-muted: #f2efe7;

  --color-text: #24201d;
  --color-text-muted: #716a63;

  --color-phoenix: #ff7043;
  --color-amber: #f4b942;
  --color-coral: #f15f79;
  --color-rose: #db5a8c;
  --color-emerald: #3c8d70;
  --color-royal: #4568d4;

  --gradient-phoenix:
    linear-gradient(
      135deg,
      var(--color-phoenix),
      var(--color-amber),
      var(--color-coral)
    );

  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --radius-small: 0.5rem;
  --radius-medium: 1rem;
  --radius-large: 1.75rem;
  --radius-pill: 999px;

  --shadow-soft:
    0 1rem 3rem rgb(48 36 27 / 10%);

  --duration-fast: 160ms;
  --duration-medium: 320ms;
  --duration-slow: 600ms;

  --ease-standard:
    cubic-bezier(0.22, 1, 0.36, 1);

  --page-max-width: 90rem;
  --content-max-width: 72rem;
  --text-max-width: 70ch;
}
```

Dark theme values should override tokens through an attribute:

```css
:root[data-theme='dark'] {
  --color-background: #16181d;
  --color-surface: #1d2127;
  --color-surface-muted: #292e36;
  --color-text: #f8f5ef;
  --color-text-muted: #b7b4ae;
}
```

Components should consume tokens rather than repeating literal values.

---

# Theme Management

Support:

* Light theme
* Dark theme
* System preference

Persist the user’s choice in `localStorage`.

Recommended stored values:

```text
light
dark
system
```

Apply the resolved theme to the root element:

```js
document.documentElement.dataset.theme = resolvedTheme;
```

Avoid flashes of the incorrect theme during initial rendering where reasonably possible.

The theme system must not depend on a component library.

---

# Responsive Design

The site must be mobile-first.

Base CSS should target small screens.

Add larger layouts using `min-width` media queries.

Suggested breakpoints:

```css
@media (min-width: 40rem) {
  /* Small tablet */
}

@media (min-width: 64rem) {
  /* Desktop */
}

@media (min-width: 80rem) {
  /* Large desktop */
}
```

Do not design the entire desktop layout first and then attempt to compress it.

Use:

* CSS Grid
* Flexbox
* `clamp()`
* `min()`
* `max()`
* `minmax()`
* Container-relative thinking where practical

Example:

```css
.hero__title {
  font-size: clamp(3rem, 10vw, 8rem);
}
```

---

# Animation and Motion

Do not assume Framer Motion or GSAP is installed.

Implement baseline motion using CSS transitions, CSS keyframes, and browser APIs.

Permitted tools include:

* CSS transitions
* CSS keyframes
* `IntersectionObserver`
* `requestAnimationFrame`
* Web Animations API

A lightweight animation package may be proposed only when a requirement cannot be implemented cleanly with the existing stack.

Do not install a large animation dependency for simple fade and transform effects.

Centralize reusable classes and timing values.

Example:

```css
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  transition:
    opacity var(--duration-slow) var(--ease-standard),
    transform var(--duration-slow) var(--ease-standard);
}

.reveal[data-visible='true'] {
  opacity: 1;
  transform: translateY(0);
}
```

Create a reusable hook for intersection-based reveals.

Example:

```js
const {
  ref,
  isVisible,
} = useInView({
  threshold: 0.2,
  once: true,
});
```

---

# Reduced Motion

All nonessential animation must respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

* Disable parallax.
* Disable smooth scrolling.
* Disable continuous particle movement.
* Disable cursor-following effects.
* Remove large transforms.
* Show content immediately.
* Preserve useful state transitions without animation.

Do not hide content until JavaScript runs unless the no-JavaScript or reduced-motion state remains readable.

---

# Hero Artwork

The animated phoenix should be implemented in a way that is compatible with the static Vite build.

Preferred options:

1. Inline SVG with CSS animation
2. SVG assembled from React components
3. Optimized local illustration with lightweight layered effects
4. Canvas only if necessary
5. WebGL only as an optional enhancement

Do not require a server-rendered image pipeline.

The hero must remain usable if:

* Animation fails
* JavaScript is delayed
* Reduced motion is enabled
* The device has limited processing power

Provide a static fallback illustration.

---

# Images and Media

Vite does not provide the same automatic image pipeline as Next.js.

Therefore:

* Store optimized local images in `src/assets` or `public`.
* Use WebP or AVIF where practical.
* Include width and height attributes.
* Use responsive `srcset` and `sizes` where appropriate.
* Use `loading="lazy"` for below-the-fold images.
* Do not lazy-load the primary above-the-fold hero visual if it is necessary for the initial composition.
* Use descriptive alternative text.
* Use empty alternative text for purely decorative images.
* Avoid shipping extremely large original source files.

Example:

```html
<img
  src="/images/projects/example-960.webp"
  srcset="
    /images/projects/example-480.webp 480w,
    /images/projects/example-960.webp 960w,
    /images/projects/example-1440.webp 1440w
  "
  sizes="
    (min-width: 64rem) 50vw,
    100vw
  "
  width="1440"
  height="900"
  loading="lazy"
  alt="Mobile ordering interface for Rocket Food Delivery"
/>
```

---

# Icons

Do not assume Lucide or another icon package is installed.

Preferred icon strategy:

* Use a small local SVG icon set.
* Use inline SVG React components.
* Use text labels alongside icons where meaning is important.

Do not use emoji as primary interface icons.

If an icon package is already installed, use it consistently rather than mixing multiple icon systems.

---

# Accessibility

Use semantic HTML as the default.

Required landmarks:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

Each major section must have an accessible heading.

Requirements:

* Include a skip link.
* Use logical heading order.
* Ensure keyboard accessibility.
* Provide visible focus styles.
* Use native buttons for actions.
* Use anchors for navigation.
* Label all form fields.
* Associate validation messages with their fields.
* Use accessible dialog behavior for the mobile menu.
* Prevent keyboard focus from moving behind an open modal or menu.
* Restore focus when overlays close.
* Meet WCAG 2.2 AA color contrast.
* Do not rely solely on color to communicate state.
* Support zoom to at least 200%.
* Use at least 44-by-44-pixel touch targets where practical.

Do not add ARIA roles when native HTML already provides the correct semantics.

---

# Mobile Navigation

The mobile navigation must be implemented as an accessible overlay or drawer.

Requirements:

* A semantic button opens the menu.
* The button has an accessible name.
* The menu has a clearly labeled close button.
* Focus moves into the menu when opened.
* Focus is trapped while the menu is open.
* Escape closes the menu.
* Selecting an item closes the menu.
* Focus returns to the trigger when closed.
* Background scrolling is disabled while open.
* The menu works without hover interactions.

Do not implement the menu as a nonsemantic clickable `<div>`.

---

# Desktop Navigation

Desktop navigation should:

* Remain visually restrained.
* Indicate the active page or section.
* Use `NavLink` for page routes.
* Become subtly elevated or translucent after scrolling.
* Preserve sufficient contrast over the hero background.
* Avoid relying solely on a glass effect for readability.

The navigation may become sticky after the top of the page.

---

# Project Data Model

Each project object should support the following shape:

```js
{
  id: 'rocket-food-delivery',
  slug: 'rocket-food-delivery',
  title: 'Rocket Food Delivery',
  subtitle: 'A mobile-first restaurant ordering experience.',
  summary: '',
  featured: true,
  status: 'published',
  year: 2026,
  role: [
    'Frontend Developer',
    'UI Designer',
  ],
  technologies: [],
  categories: [],
  coverImage: {
    src: '',
    alt: '',
    width: 1440,
    height: 900,
  },
  links: {
    live: '',
    repository: '',
  },
  overview: '',
  challenge: '',
  solution: '',
  outcome: '',
  metrics: [],
  gallery: [],
  process: [],
  lessons: [],
}
```

Components must tolerate optional fields.

Do not render:

* Empty buttons
* Empty link containers
* Blank metric sections
* Missing-image placeholders unless intentionally designed
* Labels with no corresponding content

---

# Project Detail Routes

Use a route such as:

```text
/projects/:projectSlug
```

The page should locate the project by slug.

If no matching project exists:

* Render the project-specific not-found state.
* Provide a link back to the work section.
* Do not throw an uncaught runtime error.

The project page should support direct loading through a GitHub Pages hash URL.

Example:

```text
https://username.github.io/#/projects/rocket-food-delivery
```

---

# Error Handling

All Supabase operations must include explicit error handling.

Do not silently fail.

For each operation:

* Show an understandable message to the user.
* Log sufficient development information without exposing secrets.
* Re-enable disabled controls.
* Preserve user-entered form values where appropriate.
* Avoid displaying raw database or network error objects in the UI.

Create reusable status components for:

* Loading
* Empty state
* Error state
* Success state
* Unauthorized state

---

# Loading States

Loading states should be proportional to the task.

Use:

* Button text changes for form submissions
* Inline loading indicators for small operations
* Skeleton layouts for larger content blocks
* Full-page loading only for initial authentication checks or critical route data

Do not use a full-screen spinner for every data request.

---

# Empty States

Provide purposeful empty states.

Examples:

* No published experiments yet
* No project matches the selected filter
* No contact messages
* No project media uploaded
* No related projects available

Each empty state should explain what happened and, where appropriate, offer the next action.

---

# Performance

The site should target strong Lighthouse and Core Web Vitals scores within the limits of GitHub Pages and client-side rendering.

Requirements:

* Avoid unnecessary dependencies.
* Avoid importing large libraries for one small feature.
* Lazy-load route-level components where useful.
* Lazy-load below-the-fold media.
* Use passive listeners where appropriate.
* Avoid layout thrashing.
* Animate only transform and opacity when possible.
* Keep continuous animations lightweight.
* Stop off-screen animations.
* Avoid unnecessary React state.
* Memoize only where it has a measured benefit.
* Split large admin functionality from the public portfolio bundle.

Example route-level lazy loading:

```js
const ProjectPage = lazy(
  () => import('./pages/ProjectPage')
);
```

Use `Suspense` with an accessible fallback.

---

# Search Engine Optimization

Because this is a static client-rendered Vite application, SEO capabilities are more limited than those of a server-rendered framework.

Still implement:

* Meaningful document title
* Meta description
* Open Graph metadata
* Social preview image
* Canonical homepage URL
* `robots.txt`
* `sitemap.xml`
* Semantic content
* Descriptive link text
* Descriptive image alternatives

For project routes, update the document title and relevant meta tags client-side where practical.

Do not claim that the site has server-rendered metadata.

A static `404.html` may be included for GitHub Pages behavior, but `HashRouter` should prevent normal internal routes from depending on server fallback handling.

---

# GitHub Pages Hosting

The application is hosted as static files through GitHub Pages.

Required configuration:

```text
Vite base path: /
Build output: dist/
Production branch trigger: main
```

The implementation must not assume deployment beneath a repository subdirectory unless the existing repository configuration indicates otherwise.

Do not change the Vite `base` value without confirming the actual GitHub Pages URL strategy.

The production build command should produce:

```text
dist/
```

No runtime server should be required after deployment.

---

# GitHub Actions Deployment

Deployment is triggered by pushes to `main`.

The workflow should:

1. Check out the repository.
2. Set up the required Node version.
3. Install dependencies using the repository lockfile.
4. Build the Vite application.
5. Upload the `dist/` artifact.
6. Deploy the artifact to GitHub Pages.

Use `npm ci` when a valid `package-lock.json` exists.

Supabase public environment values should be supplied through GitHub repository variables or secrets.

Example build environment names:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Remember that values beginning with `VITE_` are embedded into the public frontend bundle.

Never store a service-role key in the GitHub Pages build.

---

# Environment Validation

The application should fail clearly during development when required environment variables are missing.

For features that do not require Supabase, consider rendering the public static portfolio even if Supabase configuration is absent.

For example:

* Public local project data can still render.
* Contact submission may display a configuration error.
* Admin login may be disabled.
* The entire website should not necessarily crash because one optional service is unavailable.

Choose behavior according to which features are currently required.

---

# Testing Strategy

Do not assume a testing framework is installed.

Before adding tests, inspect the existing dependencies.

Preferred testing layers:

## Unit Tests

Suitable for:

* Data helpers
* Validation functions
* Slug lookup
* Theme resolution
* Formatting utilities

## Component Tests

Suitable for:

* Mobile navigation
* Contact form validation
* Protected-route behavior
* Project-card rendering
* Theme controls

## End-to-End Tests

Suitable for:

* Public navigation
* Project route loading
* Contact submission
* Admin authentication
* Responsive menu behavior

Do not add multiple overlapping testing frameworks without need.

---

# Browser Support

Target current versions of:

* Chrome
* Edge
* Firefox
* Safari
* Mobile Safari
* Chrome for Android

Use feature detection where required.

Avoid browser APIs that are unsupported on Safari unless a fallback exists.

---

# Dependency Policy

Before installing any package, determine whether the feature can be implemented reasonably with:

* React
* Existing project dependencies
* Browser APIs
* CSS

A new package should only be added when it provides clear value.

For every proposed dependency:

* Explain its purpose.
* Confirm compatibility with React 19 and Vite 8.
* Avoid packages that require server rendering.
* Avoid abandoned or unmaintained packages.
* Avoid introducing a component framework.

Do not automatically install:

* Tailwind CSS
* Framer Motion
* GSAP
* Three.js
* A form library
* A schema-validation library
* An icon library

These may only be added when explicitly approved or already present.

---

# Codex Working Rules

Before making changes, Codex must inspect:

```text
package.json
vite.config.js
src/main.jsx
src/App.jsx
src/lib/supabaseClient.js
the existing router configuration
the current CSS structure
the GitHub Actions workflow
```

Codex must not assume that files or dependencies exist.

Codex should:

1. Preserve the existing stack.
2. Reuse the existing Supabase client.
3. Use JavaScript rather than converting the project to TypeScript.
4. Use `HashRouter`.
5. Use standard CSS and CSS custom properties.
6. Preserve the Vite `base` setting unless deployment requirements prove it incorrect.
7. Keep the application compatible with GitHub Pages.
8. Avoid introducing any custom server.
9. Avoid placing secrets in frontend code.
10. Implement features incrementally.
11. Keep public functionality independent from admin functionality where practical.
12. Run the existing lint, test, and build commands after changes.
13. Report any failed command and its actual error.
14. Avoid rewriting unrelated files.
15. Do not replace existing working architecture merely for stylistic preference.

---

# Revised Definition of Done

The project is complete when:

* It runs as a React 19 and Vite 8 application.
* It uses JavaScript ECMAScript modules.
* It uses semantic HTML and standard CSS.
* Its visual design is controlled through CSS custom properties.
* It uses `HashRouter` successfully on GitHub Pages.
* It builds into `dist/`.
* It requires no custom server.
* Supabase is the only backend service.
* Supabase authentication uses email and password.
* All database access is protected by Row Level Security.
* No private Supabase credentials are included in the frontend.
* Public portfolio pages work without authentication.
* Protected admin functionality verifies both session and authorization.
* The site is fully usable on mobile.
* Keyboard and reduced-motion users receive a complete experience.
* Route-level links work after production deployment.
* The GitHub Actions workflow deploys pushes from `main`.
* The visual experience remains premium without depending on Tailwind, Next.js, or a component framework.
