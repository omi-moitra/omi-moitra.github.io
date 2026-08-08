# Feature Specification — Shared Header and Footer

## Table of Contents

- [Goal](#goal)
- [Shared Layout](#shared-layout)
- [Header](#header)
- [Public Navigation](#public-navigation)
- [Mobile Drawer](#mobile-drawer)
- [Theme Controls](#theme-controls)
- [Gradient Current](#gradient-current)
- [Footer](#footer)
- [Accessibility](#accessibility)
- [Acceptance Contract](#acceptance-contract)

## Goal

Frame every route with consistent brand identity, public navigation, theme access,
contact destinations, and focus behavior without exposing hidden administration routes.

## Shared Layout

`Main` renders, in order:

1. route metadata;
2. a focus-revealed skip link;
3. the sticky Header;
4. a focusable main landmark containing the active route outlet; and
5. the Footer.

The shell fills at least the small viewport height and allows main content to grow. The
skip link prevents its default fragment action because replacing the hash would corrupt
`HashRouter`; it focuses and scrolls the main landmark programmatically instead.

## Header

The Header contains a Home link with the approved personal logo, “Oishieka Moitra,” and
“Full Stack Developer.” The image is decorative within the fully named link. The Header
becomes visually elevated after the page scrolls more than a small threshold while
remaining readable over every route.

It is sticky at the top and uses a warm translucent surface, stable height, bottom route
current, and a layer below modal dialogs but above route content.

## Public Navigation

The canonical destinations are:

| Label | Subtitle | Route |
| --- | --- | --- |
| Home | Enter the Codex | `/` |
| Journey | The Phoenix Path | `/journey` |
| Projects | Crafted Worlds | `/projects` |
| Links | Developer Codex | `/links` |
| Contact | Send a Message | `/contact` |

Active links use `aria-current="page"` and a visual treatment beyond color alone. Login
and Back Office never appear in either navigation presentation. The logo always returns
Home and does not expose the hidden gate.

## Mobile Drawer

Below `64rem`, a labeled Menu button replaces desktop navigation. It opens a right-side
modal drawer containing a Close button, icon-enhanced public links, and theme controls.

The drawer:

- reports its expanded and controlled state;
- focuses Close after opening;
- traps Tab and Shift+Tab;
- closes with Close, Escape, backdrop click, or route selection;
- restores focus to Menu;
- locks body scrolling;
- marks the brand link, main content, and Footer inert while open; and
- removes all listeners, inert state, and scroll locks during cleanup.

At `64rem` and above, the drawer and trigger are removed from layout and the horizontal
desktop navigation is available.

## Theme Controls

Light, Dark, and System choices appear beside desktop navigation and at the bottom of the
mobile drawer. Each native button has an icon, accessible label, tooltip, and pressed
state. Compact desktop labels may be visually hidden but remain accessible.

## Gradient Current

A four-pixel animated current runs beneath the Header. Route families select Home,
Journey, Projects, Links, Contact, or neutral gradients. Project-detail URLs inherit
Projects. Login, Back Office, aliases, and unknown routes use neutral styling.

The current is decorative, never delays navigation, and becomes static under reduced
motion. Active navigation state remains available without it.

## Footer

The Footer uses an inverse ink/ivory surface with a thin Home-gradient top edge. Its
content is centered and contains:

- an email icon linking to `mailto:omoitra@gmail.com`;
- a GitHub icon linking to `https://github.com/omi-moitra`;
- a LinkedIn icon linking to
  `https://www.linkedin.com/in/oishieka-moitra-6300181b7`; and
- `© [current year] Oishieka Moitra. All rights reserved.`

Only icons are visually rendered for contact destinations. Each link has an accessible
name and tooltip. GitHub and LinkedIn open in new tabs with `noopener noreferrer`; email
uses the platform mail client with the recipient prefilled.

## Accessibility

- Header, navigation, main, and Footer use semantic landmarks.
- Hidden navigation is removed from the tab order.
- Every icon-only control or link has a meaningful accessible name.
- Focus rings remain visible over warm and inverse surfaces.
- The sticky Header does not obscure focused main content.
- Drawer dismissal and restoration work with keyboard and pointer input.
- Theme, current route, menu expansion, and active links never rely on color alone.

## Acceptance Contract

- Every canonical public route is reachable from both navigation presentations.
- Login and Back Office are absent from all public navigation and Footer destinations.
- Desktop navigation appears at `64rem`; the modal drawer appears below it.
- Drawer background inertness, focus trapping, Escape, backdrop, and focus restoration
  behave consistently.
- Theme selection persists and System tracks operating-system changes.
- Footer icon order is email, GitHub, LinkedIn, followed by copyright.
- The email link opens a composed message addressed to `omoitra@gmail.com`.
- External profile URLs are correct and safe.
- Shared chrome remains readable at 320px, desktop widths, and 200% zoom.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Shared Header and Footer
- **Related Area:** Frontend / Shared Layout

## Feature Goal

Give every route consistent branding, public navigation, theme access, contact links,
and keyboard-safe landmark behavior.

## Feature Scope

### In Scope (Included)

- Main layout, skip link, sticky Header, desktop navigation, mobile drawer, theme
  controls, route current, Footer links, and focus management.

### Out of Scope (Excluded)

- Route body content, hidden administrator links, authentication, message data, and
  route-specific business logic.

## Sub-Requirements (Feature Breakdown)

- Render shared semantic landmarks around the active route.
- Expose the five public destinations on desktop and mobile.
- Keep the drawer modal, inertness, dismissal, and focus restoration accessible.
- Provide persistent theme choices and safe icon-only Footer destinations.

## User Flow / Logic (High Level)

1. The visitor loads any route inside the shared shell.
2. Desktop links or the mobile drawer expose the same public destinations.
3. Navigation updates the active route and closes transient mobile UI.
4. Theme choice persists; Footer links open the intended contact destination safely.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

`Main`, `Header`, `NavigationLinks`, `MobileNavigation`, `ThemeControl`, `Footer`, and
`RouteMetadata` across every route.

### Backend / API

None. This feature performs no network request and handles no private data.

## Data Used or Modified

Shared navigation records, public profile destinations, current pathname, current year,
scroll state, and locally persisted theme preference.

## Tech Constraints (Feature-Level)

Use React Router links, native controls, semantic landmarks, existing route/theme data,
and the `64rem` navigation breakpoint.

## Acceptance Criteria

- [ ] Every public destination is reachable in both navigation presentations.
- [ ] Login and Back Office remain absent from public chrome.
- [ ] Drawer focus, inertness, dismissal, and restoration work reliably.
- [ ] Theme choice and active-route state are accessible without color alone.
- [ ] Footer destinations are correct, labeled, and safe.

## Notes for the AI

Do not duplicate navigation data, expose hidden routes, replace native controls, or
change modal focus behavior without updating and testing the complete shared shell.
