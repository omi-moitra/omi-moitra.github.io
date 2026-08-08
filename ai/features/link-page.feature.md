# Feature Specification — Developer Codex

## Goal

Turn `/links` into a useful, searchable reference library for web development. The
collection prioritizes official documentation, standards bodies, and primary references
while identifying community tutorials as learning resources. LinkedIn and GitHub remain
available as a secondary “My portals” section.

## Route and Structure

`/links` is a public lazy route represented as Links / Developer Codex in both navigation
presentations. The page contains:

1. a “Developer Codex” introduction;
2. a native search field and category filter controls;
3. categorized shelves of compact external-resource cards;
4. an accessible no-results state with a reset action; and
5. the verified professional portals below the library.

The five shelves are Web Foundations, JavaScript & TypeScript, UI Frameworks, 3D &
Graphics, and Tooling, Backend & Security.

## Resource Entries

Each entry has a stable ID, source, title, short description, HTTPS URL, resource type,
authority label, topic tags, and compact text mark. Official docs and standards guidance
are labeled distinctly from third-party learning resources such as W3Schools and
JavaScript.info.

The initial collection includes primary or official sources for MDN, WHATWG, W3C WAI,
TypeScript, Node.js, React, Bootstrap, React Router, Three.js, Vite, npm, Git, GitHub,
Supabase, PostgreSQL, Express, and OWASP.

## Search and Filtering

- Search matches titles, publishers, descriptions, resource types, authority labels,
  and tags without regard to letter case.
- Category buttons use native `button` elements and expose their state with
  `aria-pressed`.
- The result count updates in a polite live region.
- Search and category filters combine; categories with no matches are omitted.
- A complete no-results message and reset button appear when nothing matches.

## Link Safety and Accessibility

- Every destination is a normal anchor usable without custom pointer handling.
- External links open in a new tab with `target="_blank"` and
  `rel="noopener noreferrer"`.
- Each card names its publisher, destination, classification, and subject matter.
- New-tab context is available to assistive technology without duplicating visible copy.
- Search, filter, card, reset, and portal controls have visible focus states.
- Page and shelf headings form a logical hierarchy.

## Professional Portals

The final section contains exactly the verified LinkedIn and GitHub records from the
shared profile data. No Login, Back Office, invented social network, or placeholder link
appears in the public collection.

## Responsive Behavior

Resource cards render in one column at narrow widths, two at medium widths, and three
where space permits. Filter controls wrap naturally. The route remains usable at 320px,
tablet, desktop, 200% zoom, keyboard-only input, touch, reduced motion, and forced colors
without clipped content or page-level horizontal overflow.

## Acceptance Contract

- `/#/links` loads and refreshes locally and on GitHub Pages.
- Search and category filters return correct matching resources.
- Authority labels distinguish official/primary material from learning resources.
- Every external resource and professional portal uses safe new-tab attributes.
- LinkedIn and GitHub remain visible below the codex.
- No hidden action, hover-only information, clipped text, or horizontal overflow appears
  at supported widths and zoom.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Developer Codex
- **Related Area:** Frontend / Public Resources

## Feature Goal

Present a searchable, trustworthy library of web-development resources while keeping
verified professional profiles available as a clearly separate destination group.

## Feature Scope

### In Scope (Included)

- Links route, categorized resource cards, text search, category filters, result count,
  no-results recovery, safe external links, and LinkedIn/GitHub portals.

### Out of Scope (Excluded)

- Remote search APIs, user submissions, bookmarks, accounts, analytics, hidden routes,
  placeholder resources, and unverified professional profiles.

## Sub-Requirements (Feature Breakdown)

- Render every approved resource with source, title, description, classification, tags,
  and HTTPS destination.
- Combine case-insensitive search with one category filter.
- Announce result count and provide a complete resettable empty state.
- Keep professional portals distinct and all new-tab links safe.

## User Flow / Logic (High Level)

1. The visitor opens the complete categorized library.
2. Search text and category selection derive the visible shelves.
3. The result count updates or the page offers a reset action.
4. Selecting a resource or portal opens the verified destination safely.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

`LinksPage`, `ResourceCard`, shared resource/profile data, search field, filters, result
status, no-results state, and professional portal list.

### Backend / API

None. Resources are approved static records and the feature performs no data request.

## Data Used or Modified

Resource collections, category IDs, authority labels, tags, professional portals, and
transient search/category state. Shared records are filtered without mutation.

## Tech Constraints (Feature-Level)

Use native inputs/buttons/anchors, derived React state, safe HTTPS destinations,
`noopener noreferrer`, visible focus, and existing data modules.

## Acceptance Criteria

- [ ] Search and category filters return the correct records together.
- [ ] Result count and empty-state recovery are accessible.
- [ ] Every resource is classified and opens safely.
- [ ] Only verified LinkedIn and GitHub portals appear below the library.
- [ ] Layout reflows without clipped content or hidden actions.

## Notes for the AI

Do not invent resources, fetch remote catalogs, mutate shared data, expose private
routes, or replace normal anchors and form controls with custom click handlers.
