# Feature Specification — Responsive and Mobile Experience

## Table of Contents

- [Goal](#goal)
- [Responsive Foundation](#responsive-foundation)
- [Header and Navigation](#header-and-navigation)
- [Route Adaptation](#route-adaptation)
- [Interaction and Input](#interaction-and-input)
- [Motion and Media](#motion-and-media)
- [Accessibility](#accessibility)
- [Verification Matrix](#verification-matrix)

## Goal

Deliver one mobile-first application that preserves the complete content and workflow at
small widths while progressively adding space, imagery, and atmosphere on larger
screens. Mobile is not a reduced-information product; it is a simplified composition
with the same routes, labels, forms, authentication, résumé, projects, resources, and
administrative capability.

## Responsive Foundation

- Global width uses `--page-gutter` and `--content-max-width`.
- Components default to one-column flow and introduce multi-column layout only when
  content has enough room.
- Media reserves intrinsic dimensions and stays within its container.
- Text, URLs, status messages, tables, and tags wrap without creating page-level
  horizontal scrolling.
- `100svh`/`100dvh` are used where viewport chrome affects shells and dialogs.
- Safe-area insets protect full-screen overlays and bottom edges.
- The application does not hide genuine overflow defects with a global
  `overflow-x: hidden` rule.

The primary shared navigation breakpoint is `64rem`: below it the Menu drawer is used;
at and above it desktop navigation and its theme control are visible. Individual route
styles may add narrower content breakpoints where their specific cards or media require
them.

## Header and Navigation

The sticky Header keeps the logo, name, role where space permits, theme access, and
navigation available without covering focused content.

Below `64rem`:

- desktop navigation is removed from layout and focus order;
- a labeled Menu button exposes `aria-expanded` and `aria-controls`;
- the drawer enters from the right over a dim backdrop;
- opening focus moves to Close, Tab remains inside, Escape/backdrop closes it, and focus
  returns to Menu;
- the page background becomes inert and body scroll is locked;
- public route links include icons and close the drawer after navigation; and
- Light, Dark, and System controls remain available in the drawer.

At `64rem` and wider, links appear horizontally, the desktop theme control is present,
and mobile drawer controls are removed from layout.

## Route Adaptation

### Home

The portrait, hero copy, calls to action, skill cards, project preview, journey spine,
and contact callout stack in reading order. The vortex uses a simplified compact scene
and lower particle budget. Decorative creatures and path geometry resize or settle so
they never cover text or controls. The keyboard-scroll hint may remain visible where it
does not compete with touch interaction.

### Journey

The curved résumé trail becomes a narrow-screen path with milestone controls and detail
content in one readable column. Selecting a point moves the lotus a short distance and
brings its associated content into view. The generated phoenix background and optional
canvas remain decorative. The résumé download stays a normal link.

### Projects and Links

Cards stack at narrow widths and expand to stable grids as space permits. Images use
responsive variants. Project actions and external resource/profile links retain visible
labels and full-width touch targets where appropriate.

### Contact and Login

Forms remain one column with labels above controls. Feedback stays adjacent to the
relevant form and does not overlap the keyboard or mobile browser chrome. Inputs use
appropriate autocomplete and types. Submit controls remain reachable at 320px and 200%
zoom.

### Lotus Gate and Dialogs

The flower scales with `vmin`, preserves all eight petal targets, and keeps the close
control inside safe-area bounds. Message and confirmation dialogs constrain height,
allow internal scrolling, and never place required controls outside the viewport.

### Back Office

Private message data remains understandable on small screens through the route’s
responsive table/container treatment. Opening, deleting, retrying, and signing out do
not require hover or a desktop pointer.

## Interaction and Input

- Native buttons and links are used for actions and navigation.
- Touch targets are approximately 44 CSS pixels or larger where practical.
- Keyboard focus order follows document order.
- Arrow-key Home/Journey navigation ignores editable controls and modified shortcuts.
- Secret phrase listeners ignore composing, modified, repeated, non-character, and
  editable-control events.
- Hover is enhancement only; focus and tap expose the same meaningful interaction.
- Modal behavior never leaves hidden controls focusable.

## Motion and Media

Compact Home and Journey scenes use no more than half the desktop particle budget.
Continuous animation pauses when the document is hidden and resources are disposed on
unmount. Images load at route-appropriate priority and use smaller source variants where
available.

`prefers-reduced-motion: reduce` disables smooth scrolling, path travel, indefinite
gradient movement, particle animation, and staged bloom/reveal timing. Final selected,
open, success, and authenticated states remain immediately understandable.

Audio in the hidden lotus gate is optional. Browsers that block Web Audio or visitors
who cannot hear it can complete the gate through petal order, illumination, accessible
names, and live progress.

## Accessibility

- A skip link appears on focus and moves to the main landmark without altering the hash
  route.
- Sticky content does not cover focused elements or anchor destinations.
- Visual reordering never changes semantic reading order.
- Status, error, pending, selected, and expanded states do not rely on color or motion.
- Decorative scene art is silent; meaningful images retain concise alternative text.
- At 200% zoom the application reflows rather than requiring two-dimensional scrolling,
  except within a deliberately bounded data region where necessary.
- Screen orientation is not locked.

## Verification Matrix

Verify every canonical route at:

| View | Required checks |
| --- | --- |
| 320px | No clipped copy or controls; drawer, forms, cards, lotus, dialogs usable |
| 768px | Tablet reflow, touch targets, generated media sizing, no hidden actions |
| 1023px | Mobile drawer remains the only primary navigation presentation |
| 1024px+ | Desktop navigation appears; drawer is absent from layout/focus order |
| Desktop | Maximum widths, multi-column layouts, hover/focus parity, scene performance |
| 200% zoom | Reflow, focus visibility, dialog access, no lost final content |

Also verify keyboard-only use, touch emulation, reduced motion, forced colors, system
dark/light changes, WebGL disabled, sound blocked, and mobile browser viewport changes.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Responsive and Mobile Experience
- **Related Area:** Frontend / Cross-Route Responsive Behavior

## Feature Goal

Preserve every route, workflow, label, and control at small widths while progressively
adding space, grids, media, and atmosphere when larger viewports permit.

## Feature Scope

### In Scope (Included)

- Shared breakpoints, mobile navigation, responsive route layouts, reflow, touch and
  keyboard input, safe-area/dialog behavior, responsive images/scenes, zoom, reduced
  motion, and the verification matrix.

### Out of Scope (Excluded)

- Mobile-only content removal, separate mobile routes, locked orientation, hover-only
  actions, global overflow masking, and desktop assumptions in required workflows.

## Sub-Requirements (Feature Breakdown)

- Default to readable one-column flow and add columns only when space supports them.
- Switch between modal mobile navigation and desktop navigation at `64rem`.
- Adapt every public, hidden, and protected route without changing semantic order.
- Keep media, motion, dialogs, tables, forms, and touch targets within safe bounds.
- Verify target widths, zoom, keyboard, touch, reduced motion, and forced colors.

## User Flow / Logic (High Level)

1. The layout resolves from viewport, zoom, input, theme, and motion preferences.
2. Navigation and route composition adapt without removing functionality.
3. Content reflows and bounded regions scroll only where deliberately required.
4. Preference or viewport changes preserve focus, state, and active workflows.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

Global/shared CSS, Header and mobile drawer, every route stylesheet, dialogs, forms,
Home/Journey scenes, tables, and responsive image sources.

### Backend / API

None directly. Responsive UI must preserve Contact/Auth/Data API state while layout
changes occur.

## Data Used or Modified

Viewport/media-query state, safe-area dimensions, input modality, motion preference,
responsive image choice, and transient drawer/dialog/scene state.

## Tech Constraints (Feature-Level)

Use mobile-first CSS, semantic DOM order, the `64rem` shared breakpoint, native controls,
bounded overflow only, responsive assets, and compact scene budgets.

## Acceptance Criteria

- [ ] Every canonical route works at 320px, 768px, 1023px, 1024px+, and desktop.
- [ ] The application reflows at 200% zoom without losing controls or final content.
- [ ] Drawer, forms, dialogs, tables, scenes, and hidden gate remain usable by touch and keyboard.
- [ ] Reduced motion, forced colors, WebGL/audio failure, and live theme changes are safe.
- [ ] No global overflow rule conceals a layout defect.

## Notes for the AI

Do not create separate mobile content, visually reorder semantic meaning, remove required
controls, shrink targets below practical size, or hide overflow instead of fixing it.
