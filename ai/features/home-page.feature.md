# Feature Specification — Home Page

## Table of Contents

- [Goal](#goal)
- [Content Contract](#content-contract)
- [Page Composition](#page-composition)
- [Vortex Scene](#vortex-scene)
- [Journey Spine](#journey-spine)
- [Generated Images](#generated-images)
- [Hidden Gate Integration](#hidden-gate-integration)
- [Responsive and Accessible Behavior](#responsive-and-accessible-behavior)
- [Acceptance Contract](#acceptance-contract)

## Goal

Give visitors a memorable first impression while answering four questions immediately:
who Oishieka is, what she builds, which strengths she brings, and where to go next. The
page presents a readable professional narrative first and treats the fantasy vortex,
creatures, glowing path, and movement as progressive atmosphere.

## Content Contract

The hero contains:

- **Name:** Oishieka Moitra
- **Role:** Full Stack Developer
- **Tagline:** Creating maintainable web applications with careful attention to
  requirements, edge cases, and the people who use them.
- **Primary action:** View My Work → `/projects`
- **Secondary action:** Contact Me → `/contact`

Technical skill cards are React & JavaScript, Node.js & Express, and Databases.
Professional-strength cards are Problem Solving & Risk Assessment, Documentation &
Attention to Detail, and Cross-Functional Communication.

The section introductions and card descriptions connect interactive interfaces,
server-side behavior, RESTful APIs, authentication, testing, MongoDB/SQL data work, risk
analysis, documentation, and communication. Copy does not claim unsupported metrics,
seniority, clients, or production scale.

The featured-project area reads from the verified shared inventory and renders the
published fantasy portfolio without inventing additional projects. Journey and Contact
previews route to `/journey` and `/contact`.

## Page Composition

Home renders one semantic `<article>` with:

1. the route-scoped hidden lotus gate controller;
2. a fixed decorative creature/vortex scene;
3. the decorative journey spine;
4. a framed portrait and hero card;
5. technical skill cards;
6. professional strengths with supporting artwork;
7. verified project preview;
8. Journey preview; and
9. Contact callout.

Each major content block carries a stable journey-spine section marker. Content remains
in normal document flow and is complete before scene enhancement.

## Vortex Scene

The Home scene combines:

- responsive phoenix/dragon artwork;
- an SVG fallback with paired ribbon paths, colored bands, and code-like text;
- a lazy `HomeVortex` Three.js canvas; and
- pointer/scroll-aware atmosphere and progressive card motion that never own text or
  navigation.

The canvas uses a compact particle budget on smaller screens, respects reduced motion,
responds only as enhancement, pauses when appropriate, and releases rendering resources
on unmount. Its Three.js loop also gives Home cards scroll-linked opacity, depth, tilt,
and restrained parallax while keeping those cards as semantic HTML. CSS supplies the
card-reveal fallback. If JavaScript chunk loading, WebGL, or images fail, the hero and
all later content remain readable.

## Journey Spine

A decorative glowing line visually connects Home sections. Its lotus markers track the
section nearest a viewport focus line. Arrow Up and Arrow Down move between registered
sections when focus is outside editable controls and no modifier key is active. The
selected section scrolls to the center using smooth behavior unless reduced motion is
requested.

A visible keyboard-scroll hint communicates the arrow-key affordance without becoming a
required navigation path. Native scrolling and all explicit links remain available.

## Generated Images

Home uses two route-specific generated assets:

| Asset | Purpose | Accessibility |
| --- | --- | --- |
| Vortex creatures | One phoenix and restrained dragon around the scene | Decorative empty alt |
| Skills bridge | Feather connecting systems, research, and communication | Meaningful descriptive alt |

Both provide responsive sources and intrinsic dimensions. The portrait and decorative
frame are separate identity assets and do not count as the two generated illustrations.

## Hidden Gate Integration

Typing `lotus` directly on Home opens the musical lotus threshold. No visible trigger,
form field, menu link, clue, or progress indicator appears before activation. The
listener is scoped to Home and excludes editable/control targets, composition, modifier
shortcuts, repeat events, and non-character keys.

The gate’s complete petal, audio, reset, portal, focus, and routing behavior is defined in
the Login feature specification. Knowledge of the gesture never authorizes private data.

## Responsive and Accessible Behavior

- The framed portrait has a meaningful name alt; its frame is decorative.
- Skill lists remain semantic lists and icons are decorative.
- Calls to action have clear text and visible focus.
- Decorative scene layers are `aria-hidden` and do not intercept required interaction.
- One-column mobile flow preserves hero → skills → strengths → project → journey →
  contact reading order.
- Desktop composition increases atmosphere and spacing without moving semantic content
  out of order.
- The page supports 320px, tablet, desktop, 200% zoom, keyboard, touch, reduced motion,
  forced colors, and WebGL-disabled browsing.

## Acceptance Contract

- `/#/` loads and refreshes under `HashRouter`.
- Identity, three technical skills, and three professional strengths match the approved
  content contract.
- All explicit calls to action resolve to canonical public routes.
- Readable HTML and the SVG/image fallback appear independently of Three.js.
- Home shows only verified project records.
- Arrow-key section navigation never captures typing in editable controls.
- Typing `lotus` opens the hidden gate only while Home is mounted.
- No Login or Back Office link appears in Home content.
- No content, control, focus ring, or final section is clipped at target widths or zoom.

---

<!-- Template-aligned summary; headings mirror feature-name.feature.md. -->

## Feature Identity

- **Feature Name:** Home Page
- **Related Area:** Frontend / Public Portfolio

## Feature Goal

Introduce Oishieka’s professional identity, capabilities, strengths, and next actions in
a memorable page whose essential content never depends on decorative effects.

## Feature Scope

### In Scope (Included)

- Hero, framed portrait, technical skills, professional strengths, verified project
  preview, Journey/Contact actions, decorative spine, vortex, generated art, and hidden
  gate integration.

### Out of Scope (Excluded)

- Unverified claims or projects, private administration, route-level authentication,
  required WebGL/audio interaction, and content that exists only inside a canvas.

## Sub-Requirements (Feature Breakdown)

- Render the approved identity and six skill/strength cards in semantic HTML.
- Preserve the intended content order and canonical calls to action.
- Load the vortex progressively with a static fallback and complete cleanup.
- Support the decorative journey spine and route-scoped hidden lotus trigger safely.

## User Flow / Logic (High Level)

1. The visitor lands on Home and reads identity plus primary actions immediately.
2. Scrolling reveals technical skills, professional strengths, and verified previews.
3. Explicit links continue to Projects, Journey, or Contact.
4. Optional keyboard navigation and the hidden gate enhance—but never replace—the flow.

## Interfaces (Pages, Endpoints, Screens)

### Frontend

`HomePage`, `HomeVortex`, `HomeJourneySpine`, `SkillCard`, `KeyboardScrollHint`,
`LotusGate`, and shared Home data modules.

### Backend / API

None. Home renders approved static data and does not request private or mutable records.

## Data Used or Modified

Identity, skills, strengths, images, and the verified featured-project record are read
from shared modules. Only transient scene, scroll, pointer, and gate state changes.

## Tech Constraints (Feature-Level)

Keep meaningful content in HTML, lazy-load Three.js, honor reduced motion, use responsive
assets, reuse theme tokens, and dispose every scene/listener resource on unmount.

## Acceptance Criteria

- [ ] Root route shows approved identity, three technical skills, and three strengths.
- [ ] Calls to action resolve to canonical routes.
- [ ] Static content remains complete without WebGL, images, audio, or motion.
- [ ] Mobile, keyboard, zoom, and reduced-motion states preserve the reading order.
- [ ] The hidden gate never acts as an authorization boundary.

## Notes for the AI

Do not move semantic copy into Three.js, invent portfolio content, make animation
required, or weaken the Login/Back Office security boundaries when changing Home.
