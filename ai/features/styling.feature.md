# Feature Specification — Phoenix Codex Styling System

## Table of Contents

- [Feature Identity](#feature-identity)
- [Feature Goal](#feature-goal)
- [Authority and Plan Adaptation](#authority-and-plan-adaptation)
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

- **Feature name:** Phoenix Codex Styling System
- **Related area:** Shared visual language, design tokens, typography, responsive layout, motion, accessibility, and progressive enhancement
- **Specification path:** `ai/features/styling.feature.md`
- **Required branch:** `feature/styling`, created from `dev`
- **Global specification:** `ai/ai-spec.md`
- **Creative source:** `.omi/plan/PLAN.md`
- **Depends on:** Setup & Deploy foundation from `ai/features/setup-deploy.feature.md`
- **Consumed by:** Header & Footer, Home, Journey, Projects, Links, Contact, Login, and Back Office features
- **Primary users:** Public visitors, recruiters, hiring managers, keyboard and screen-reader users, motion-sensitive visitors, and developers maintaining the interface

## Feature Goal

Create a coherent, reusable styling foundation that expresses the Phoenix Codex concept while keeping professional content immediate, readable, responsive, and accessible.

After this feature is complete:

- cozy fantasy defines the persistent surfaces, typography, spacing, and emotional tone;
- street-art marks add controlled energy around content without reducing legibility;
- cyberpunk light appears only as a restrained accent for active states, route currents, code motifs, and signature scenes;
- every route uses the same canonical tokens and component-state vocabulary;
- route identity is recognizable without requiring color or animation to understand navigation;
- the readable interface works before textures, artwork, web fonts, or Three.js load;
- motion reduces safely in response to user preference and mobile constraints; and
- the default theme can support a future theme system without shipping a theme selector now.

## Authority and Plan Adaptation

Use sources in the authority order defined by `ai/ai-spec.md`. This feature translates `.omi/plan/PLAN.md` and the approved decision to keep Journey and Projects separate into an implementation contract; it does not override the grading checklist, accessibility rules, or page feature specifications.

Any older feature document that still combines Journey and Projects under `/portfolio` must be reconciled with this approved route model before that page work is implemented. Older combined-route wording is not permission to collapse the two experiences again.

The plan's visual hierarchy is mandatory:

1. **Cozy fantasy is the world.** Warm paper, ink, illustrated manuscripts, maps, soft light, cards, and decorative borders define the persistent interface.
2. **Street art is secondary energy.** Brush strokes, splashes, hand-drawn arrows, energetic linework, and occasional annotations frame or direct attention.
3. **Cyberpunk is an accent.** Glow belongs on route currents, focus/active support, timeline paths, code motifs, particles, and small interface indicators; it must not become the dominant surface treatment.
4. **The phoenix is the guide and code is the magic system.** Phoenix, path, vortex, codex, rune/code, and restrained dragon motifs support the story without replacing plain language.

The plan's five conceptual destinations remain five separate public routes:

| Plan concept | Styling destination |
| --- | --- |
| Home / Enter the Codex | `/` and `--gradient-home` |
| Journey / The Phoenix Path | `/journey` and `--gradient-journey` |
| Projects / Crafted Worlds | `/projects` and `--gradient-projects` |
| Links / Portals | `/links` and `--gradient-links` |
| Contact / Send a Message | `/contact` and `--gradient-contact` |

Journey and Projects receive independent top-level route themes, navigation entries, page shells, and gradient currents. Journey owns education, professional experience, and résumé actions; Projects owns the project grid and case-study experiences.

## Feature Scope

### In Scope — Included

- Canonical Phoenix Codex foundation, pastel, and magical color tokens.
- Semantic color tokens for page, surface, text, border, focus, code, success, warning, and error roles.
- Route-specific gradient-current tokens for Home, Journey, Projects, Links, and Contact.
- A neutral, non-discoverable visual treatment for Login and Back Office.
- Typography roles for decorative display text, headings, interface/body text, and technical labels.
- Shared spacing, content-width, radius, shadow, layer, target-size, and motion tokens.
- A mobile-first global baseline for sizing, media, text wrapping, focus, and viewport behavior.
- Shared styling contracts for surfaces, cards, buttons, links, tags, forms, feedback, dialogs, and section headings.
- Parchment texture, ink linework, brush marks, code/rune motifs, magical glow, and illustration placement rules.
- Responsive rules at 320px, 768px, 769px, and desktop widths.
- Reduced-motion behavior and progressive loading order for decorative enhancements.
- CSS architecture and ownership rules that prevent page styles from redefining the global theme.
- Theme-ready custom properties for the single `cozyFantasy` default theme.
- Visual, accessibility, responsive, performance, and cross-browser verification criteria.

### Out of Scope — Excluded

- Creating or changing route structure, navigation destinations, page content, or personal data.
- Implementing Header, Footer, page components, authentication, contact submission, message administration, or Supabase behavior.
- Implementing route registration, navigation behavior, Journey content, or Projects content; those concerns belong to their owning feature specifications.
- Selecting or generating final page-specific images, logos, models, videos, or résumé files; those assets remain owned by their page feature specifications.
- Building the Home vortex, Journey phoenix trail, Projects media-wall behavior, or Three.js scenes.
- Requiring Three.js, JavaScript, web fonts, textures, or generated imagery for content comprehension.
- A theme selector, dark mode, multiple themes, saved theme preference, or alternate theme assets.
- Sound, device tilt, autoplay video, a full-screen splash, elaborate route transitions, or several simultaneous dragons.
- Tailwind CSS, Sass, CSS-in-JS, Styled Components, a component framework, an icon package, or a new motion library.
- Graffiti fonts for paragraphs, navigation, form labels, instructions, or feedback.
- Redesigning every route as a different visual system.

## Requirements Breakdown

### Requirement 1 — Single Canonical Token System

- Define global CSS custom properties once at the highest practical stylesheet boundary.
- Keep the programmatic palette in `src/data/phoenixCodexPalette.js` only for JavaScript consumers such as visualizations or progressively enhanced scenes.
- Keep raw palette names synchronized exactly between JavaScript camelCase and CSS kebab-case names.
- Do not maintain a second palette, silently alias retired names, or redefine canonical raw colors inside page stylesheets.
- Separate raw palette tokens from semantic role tokens so components consume intent such as `--color-text` rather than repeatedly selecting raw hex values.
- Define reusable tokens for:

  - colors and route currents;
  - font roles and weights;
  - spacing and page gutters;
  - content width;
  - radii and shadows;
  - focus appearance;
  - minimum control size;
  - stacking layers; and
  - motion duration and easing.

- Update the CSS token source, JavaScript palette, imports, documentation, and relevant tests together when a canonical value changes.
- Do not introduce a new global token for a one-off page detail unless at least two consumers or a genuine theme-level role justify it.

### Requirement 2 — Color Hierarchy and Palette

Use these canonical raw colors:

| Group | Token | Value | Primary role |
| --- | --- | --- | --- |
| Foundation | `parchment` | `#F5EBD8` | Page background |
| Foundation | `softCream` | `#FFF9ED` | Warm surface |
| Foundation | `warmIvory` | `#FFFDF6` | Highest-emphasis surface |
| Foundation | `agedPaper` | `#E7D5B7` | Borders and layered paper |
| Foundation | `inkBlack` | `#232126` | Primary text and ink |
| Foundation | `charcoal` | `#37323B` | Secondary dark text |
| Foundation | `warmBrown` | `#725E50` | Quiet text and linework |
| Pastel | `blushPink` | `#F5B9C8` | Gentle emphasis |
| Pastel | `peachGlow` | `#F6BE96` | Warm Contact accent |
| Pastel | `lavenderMist` | `#C9B9F4` | Quiet magical depth |
| Pastel | `skyBlue` | `#AFCFF2` | Cool supporting accent |
| Pastel | `mintLight` | `#AEE3CE` | Links/resource identity |
| Pastel | `butterGold` | `#F4D889` | Warm highlight |
| Magic | `phoenixCoral` | `#FF6559` | Phoenix energy |
| Magic | `solarOrange` | `#FF963D` | Fire accent |
| Magic | `radiantGold` | `#FFD34E` | Path and selected-state accent |
| Magic | `plasmaPink` | `#F34DA0` | Restrained neon accent |
| Magic | `arcaneViolet` | `#8757E8` | Focus and magical accent |
| Magic | `portalBlue` | `#428BFF` | Link/portal accent |
| Magic | `spiritCyan` | `#35D5DC` | Code/portal glow |
| Magic | `renewalGreen` | `#43C98A` | Positive accent |

- Aim visually for approximately 65% cream/parchment/ivory, 20% ink/charcoal/brown, 10% pastel, and 5% bright magical accent.
- Treat the percentages as a composition guardrail, not a requirement to calculate pixel coverage.
- Use foundation colors for all large surfaces and normal reading relationships.
- Use pastels for section identity, framing, subtle washes, and illustration support.
- Reserve magic colors for small emphasis areas, decorative currents, selected markers, and controlled glow.
- Never place small text directly on a bright magical color or gradient without verifying contrast across the complete rendered background.
- Do not change a canonical raw hex value only to solve a component-state contrast issue. Add or document a derived semantic state color instead.
- Success, warning, and error feedback must have independent semantic tokens and must not be represented only by phoenix, gold, or glow colors.

### Requirement 3 — Route Gradient Currents

Define these shared decorative gradients in this exact stop order:

| Route | CSS token | Color sequence |
| --- | --- | --- |
| Home | `--gradient-home` | `softCream` → `phoenixCoral` → `blushPink` → `radiantGold` → `arcaneViolet` |
| Journey | `--gradient-journey` | `radiantGold` → `phoenixCoral` → `plasmaPink` → `arcaneViolet` |
| Projects | `--gradient-projects` | `spiritCyan` → `arcaneViolet` → `plasmaPink` → `solarOrange` |
| Links | `--gradient-links` | `mintLight` → `spiritCyan` → `portalBlue` → `arcaneViolet` |
| Contact | `--gradient-contact` | `peachGlow` → `blushPink` → `lavenderMist` → `butterGold` |

- Expose the active route current through one semantic property such as `--route-current` on the route shell or Header.
- Keep Header navigation and text on a stable solid surface above the route current.
- Use the gradient current as a page identifier and magical energy line, not as the sole current-page indicator.
- The active navigation state must also use text weight, underline, border, marker, or `aria-current`-supported styling.
- Animation may shift background position slowly; it must not flash, pulse rapidly, or simulate an indeterminate loading state after the route is ready.
- Reduced-motion mode keeps the destination gradient visible and static.
- Login and Back Office use a quiet foundation/pastel current or static border and must not appear as extra public route identities.
- A gradient used behind content must be paired with a solid inner surface when consistent foreground contrast cannot be guaranteed.

### Requirement 4 — Typography Roles

- Use no more than four functional type roles:

  1. a decorative script/display face for a name, short signature, or rare atmospheric phrase;
  2. a readable literary serif for page and section headings;
  3. a modern sans serif for body copy, navigation, buttons, forms, and feedback; and
  4. a monospace face for dates, technologies, tags, and short code/rune annotations.

- `WindSong` may fill the decorative display role, but it must not be used for long text, instructions, navigation, form labels, or the only rendering of important information.
- Use Playfair Display or another approved readable literary serif for headings.
- Use Nunito or Lato with robust system fallbacks for the interface/body role.
- Use a system monospace stack unless a separately approved technical font is already available.
- Keep normal body and form text at least `1rem` at narrow widths.
- Use fluid heading sizes with bounded `clamp()` values so text does not overflow at 320px or dominate large screens.
- Maintain comfortable line height and readable line length; long prose should generally remain near 45–75 characters per line.
- Do not render essential words as image text, canvas text, pseudo-element-only content, or decorative lettering.
- Load only required remote font families and weights, include resilient fallbacks, and keep text visible while fonts load.
- A font failure must change only appearance, never layout usability or content availability.

### Requirement 5 — Global Document and Layout Baseline

- Apply `box-sizing: border-box` consistently.
- Preserve a minimum supported viewport width of 320px without horizontal page scrolling.
- Set a warm page background and readable ink foreground at the root.
- Remove default body margin and maintain a full-height application shell using modern viewport units with safe fallback behavior.
- Make images, SVGs, video, and other media responsive by default.
- Preserve intrinsic dimensions or aspect ratios for prominent media to avoid layout shift.
- Allow long URLs, email addresses, tags, project names, and user-provided text to wrap rather than escape their containers.
- Use a shared content-width token and fluid page gutter rather than page-specific arbitrary maximum widths.
- Keep important controls and HTML text outside Three.js canvases and decorative media layers.
- Ensure background art and pseudo-elements use stacking contexts that cannot cover links, focus rings, dialogs, or form controls.
- Account for the sticky Header and mobile bottom navigation so focused elements, anchors, and final-page content are not obscured.

### Requirement 6 — Shared Surface and Component Styling

- Build recurring visual treatments from tokens rather than copying complete declarations into every page stylesheet.
- Shared parchment surfaces should support cards, panels, forms, dialogs, and tooltips with clear edges against the page background.
- Borders may resemble ink lines, map paths, book edges, or paper layers, but their shape must not make a control ambiguous.
- Shadows and glow must remain soft enough that text edges stay crisp.
- Buttons and action links require normal, hover, focus-visible, active, disabled, pending, success, and error-appropriate states where applicable.
- Primary actions may use a restrained phoenix accent; secondary actions remain quieter and visually distinct.
- A button state must never depend only on a color change or animation.
- Cards may vary slightly in frame, paper/photo treatment, or initial angle when a page specification allows it, but repeated content must settle into a scannable grid.
- Tags and code labels use the monospace role sparingly and wrap safely.
- Form controls keep visible labels, borders, adequate text contrast, predictable focus treatment, and a minimum touch target near 44px.
- Feedback states combine readable text with an optional icon, border, or heading; color alone is insufficient.
- Dialog and tooltip surfaces must remain readable over the most detailed permitted background and preserve visible keyboard focus.

### Requirement 7 — Decorative Motifs and Visual Restraint

- Use phoenix imagery to represent growth, guidance, and reinvention.
- Use the glowing path for professional and learning progress.
- Use the vortex for curiosity and entry into the portfolio world.
- Use dragons only as restrained symbols of ambition or challenge; they must not compete with the phoenix or professional content.
- Mix runes with code only as clearly decorative fragments, never as instructions or functional labels.
- Street-art marks may underline headings, frame project media, or point toward content; they must not cross body copy or controls.
- Parchment grain, paper fibers, splashes, clouds, sparks, and particles remain background decoration with empty alternative text when represented as images.
- Avoid full-page neon surfaces, dense graffiti fields, repeated heavy glows, and unrelated fantasy props.
- Do not use decoration to conceal missing content or make an unfinished section appear complete.
- A recruiter must be able to identify Oishieka's name, role, technical stack, projects, résumé, GitHub, LinkedIn, and Contact path within the relevant page flows without interpreting a motif.

### Requirement 8 — Motion and Interaction

- Prefer CSS transitions and keyframes for small interface effects.
- Reserve Three.js for approved signature scenes and keep it outside this feature's required foundation.
- Define a small motion vocabulary such as quick state feedback, standard component transition, and slow ambient decoration.
- Hover and focus transitions should be brief and must not delay activation.
- Ambient gradient or glow motion should be slow, low-amplitude, and nonessential.
- Content must not continually float, rotate, drift, blur, or move after its entrance settles.
- Do not animate large layout properties when transform or opacity can provide the same nonessential effect more efficiently.
- Anything revealed on hover must also be available through focus, tap, click, or a visible control.
- Pointer tracking may influence decoration only; it cannot be required to reveal or operate content.
- Do not request device-tilt permission in the styling foundation.
- Pause continuous scene work when it is offscreen and fully clean up animation resources when a scene unmounts.
- Do not add sound or autoplay media.

### Requirement 9 — Reduced Motion

- Respect `prefers-reduced-motion: reduce` globally and within every page stylesheet.
- In reduced-motion mode:

  - disable smooth scrolling;
  - stop route-current movement while preserving its static color identity;
  - remove nonessential entrance, parallax, particle, trail, and pointer-following motion;
  - show cards, timeline details, and content in their settled state;
  - replace signature scenes with a static poster or lightly changing fallback; and
  - preserve immediate state changes, focus movement, validation, navigation, and dialog behavior.

- Do not hide an element by default and depend on an animation to make it visible; reduced-motion overrides and load failures must leave final content visible.
- Reduced motion is an operating-system preference contract, not a separate theme.

### Requirement 10 — Responsive and Mobile-First Behavior

- Start with the 320px layout and add complexity only when space permits.
- Verify layouts explicitly at 320px, 768px, 769px, and at least one desktop width.
- At 768px and below, preserve the Header/logo area and use the bottom-navigation contract from the Header & Footer feature.
- At 769px and above, use the horizontal Header navigation contract.
- Keep interactive targets approximately 44px or larger when practical and provide adequate separation between adjacent actions.
- Stack multi-column cards, form regions, timeline details, and action groups before they become cramped.
- Avoid fixed content heights that clip zoomed, translated, or user-generated text.
- Keep mobile particles at no more than half the desktop count when a page feature introduces them.
- Use lower-resolution mobile assets and no multiple transparent full-screen canvases.
- Keep essential buttons outside canvases and ensure horizontal decorative motion cannot create overflow.
- Support browser zoom to 200% without loss of content or functionality and reflow narrow content where practical.

### Requirement 11 — Accessibility and State Communication

- Meet WCAG 2.1 AA contrast targets for normal text, large text, meaningful graphical objects, control boundaries, and focus indicators.
- Check contrast against the actual composited result, including translucent surfaces, textures, images, gradients, hover states, and disabled states.
- Provide a consistent, highly visible `:focus-visible` treatment that is not clipped by overflow.
- Do not remove outlines unless an equally visible replacement is present.
- Keep active, hover, focus, pending, disabled, success, warning, and error states distinguishable without color alone.
- Do not use motion, spatial position, glow, icon shape, or fantasy vocabulary as the only way to communicate meaning.
- Preserve semantic HTML and logical heading order; CSS must not visually reorder content into a confusing keyboard or screen-reader sequence.
- Informative images require useful alt text from their owning feature; decorative visual assets use empty alt text or CSS backgrounds.
- Generated content in `::before` or `::after` remains decorative and must not contain essential labels.
- Forced-colors and high-contrast modes must retain recognizable links, controls, focus, and selected states.

### Requirement 12 — Progressive Loading and Performance

- Render semantic HTML and the stable warm-color baseline before optional enhancement layers.
- Load visual layers in this order when present:

  1. readable interface and solid-color baseline;
  2. lightweight background texture;
  3. static scene poster;
  4. route-scoped canvas;
  5. models; and
  6. particles or advanced effects.

- Do not block navigation, content, forms, résumé actions, external links, Login, or Back Office workflows on imagery, fonts, texture, or scene code.
- Keep route-specific visual assets and scene code out of unrelated eager bundles.
- Optimize raster images to their rendered use, provide stable dimensions, and avoid loading desktop-resolution decorative imagery on narrow screens when a smaller source is available.
- Avoid excessive `backdrop-filter`, blur, large fixed backgrounds, and stacked translucent layers on mobile.
- A missing image, failed font request, unsupported WebGL context, or disabled JavaScript enhancement must leave a clear, usable presentation.
- Inspect the production build for unexpectedly large CSS, font, image, or scene assets and disclose material regressions at the feature checkpoint.

### Requirement 13 — Theme-Ready Default Architecture

- Ship one theme only: `cozyFantasy`.
- Express theme-sensitive colors, typography, gradients, textures, and scene-facing values through tokens rather than hard-coded component values.
- A root theme hook such as `data-theme="cozy-fantasy"` may be used if it simplifies future substitution, but the default must also work without client-side preference code.
- Future themes may change colors, textures, gradients, decorative assets, models, and particles.
- Future themes must not change navigation, page hierarchy, content, accessibility, or core component layout.
- Do not add a visible theme control, local-storage preference, theme-flash prevention script, alternate palette, or unfinished switcher under this feature.

### Requirement 14 — CSS Architecture and Ownership

- Keep global tokens and the document baseline in the established global stylesheet unless a separately approved refactor moves them into dedicated style modules.
- Keep shared shell styling with the shared layout implementation and page-specific composition in each page's stylesheet.
- Component selectors should be locally recognizable and avoid broad selectors that unintentionally restyle unrelated routes.
- Use custom properties and classes instead of large inline style objects for reusable presentation.
- Use inline styles only for genuinely data-driven values such as a calculated position, with a safe token-based fallback.
- Do not use `!important` except for a narrowly documented accessibility override such as a global reduced-motion safeguard.
- Every created or modified CSS file begins with the comments-based Table of Contents required by `ai/ai-spec.md`.
- Non-obvious CSS invariants receive nearby why-comments; material focus, overflow, route-current, and stacking risks use the `:warning:` marker sparingly.
- The proposed `src/styles/` tree in `.omi/plan/PLAN.md` is architectural guidance, not permission for a broad file migration. Preserve the working repository structure unless the styling branch explicitly scopes and verifies that refactor.

## User Flow and Expected Behavior

### First Visit

1. The visitor receives a warm parchment/cream page with readable ink text immediately.
2. The shared Header, page identity, navigation, and primary content appear without waiting for decorative assets.
3. The active route displays a slim destination-specific gradient current and a non-color active-navigation marker.
4. Web fonts, textures, artwork, and approved scene enhancements may load progressively without moving or obscuring the primary content.
5. The visitor can identify the professional purpose and next action before interpreting any fantasy decoration.

### Route Change

1. The visitor activates a public navigation link.
2. React Router changes the hash route and moves focus according to the shared routing accessibility behavior.
3. The solid Header and navigation remain readable.
4. The route current changes to the destination token sequence.
5. Any current sweep is brief and decorative; reduced-motion users receive an immediate static change.
6. The destination page uses the same spacing, typography, focus, and surface vocabulary with route-specific accents.

### Keyboard and High-Zoom Use

1. The visitor can reveal the skip link and see every focus indicator clearly.
2. Focus is not hidden beneath the sticky Header, bottom navigation, decoration, or clipped container.
3. At narrow widths or high zoom, multi-column layouts stack and long text wraps.
4. Hover-only decoration does not conceal an action or explanation from keyboard users.
5. Active, selected, error, and success states remain understandable without relying on color.

### Reduced-Motion or Low-Capability Use

1. The operating-system preference is honored automatically.
2. Gradient currents and content appear in a static settled state.
3. Optional canvases, models, particles, and parallax are absent or replaced by posters.
4. Every route, form, résumé action, link, authentication flow, and message-administration action remains available.
5. Failure of an optional enhancement does not present an error unless the failed item is informative content.

## Interfaces

### Raw Palette Contract

```javascript
export const phoenixCodexPalette = {
  foundation: {
    parchment: '#F5EBD8',
    softCream: '#FFF9ED',
    warmIvory: '#FFFDF6',
    agedPaper: '#E7D5B7',
    inkBlack: '#232126',
    charcoal: '#37323B',
    warmBrown: '#725E50',
  },
  pastels: {
    blushPink: '#F5B9C8',
    peachGlow: '#F6BE96',
    lavenderMist: '#C9B9F4',
    skyBlue: '#AFCFF2',
    mintLight: '#AEE3CE',
    butterGold: '#F4D889',
  },
  magic: {
    phoenixCoral: '#FF6559',
    solarOrange: '#FF963D',
    radiantGold: '#FFD34E',
    plasmaPink: '#F34DA0',
    arcaneViolet: '#8757E8',
    portalBlue: '#428BFF',
    spiritCyan: '#35D5DC',
    renewalGreen: '#43C98A',
  },
}
```

### CSS Token Contract

The implementation must expose the raw palette in kebab case and semantic roles similar to:

```css
:root {
  --parchment: #f5ebd8;
  --soft-cream: #fff9ed;
  --warm-ivory: #fffdf6;
  --aged-paper: #e7d5b7;
  --ink-black: #232126;
  --charcoal: #37323b;
  --warm-brown: #725e50;

  --color-page: var(--parchment);
  --color-surface: var(--warm-ivory);
  --color-text: var(--ink-black);
  --color-text-muted: var(--charcoal);
  --color-border: var(--aged-paper);
  --color-focus: var(--arcane-violet);

  --font-display: 'WindSong', 'Brush Script MT', cursive;
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: Nunito, Lato, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Consolas, monospace;

  --page-gutter: clamp(1rem, 4vw, 2rem);
  --content-max-width: 75rem;
  --target-min-size: 2.75rem;
}
```

The example identifies required roles, not a demand to duplicate properties that already exist. Additional semantic tokens must follow the naming and ownership rules in this specification.

### Route Theme Contract

The route shell or Header exposes one of these modifier/state mappings:

| Route state | Current token |
| --- | --- |
| Home | `var(--gradient-home)` |
| Journey | `var(--gradient-journey)` |
| Projects | `var(--gradient-projects)` |
| Links | `var(--gradient-links)` |
| Contact | `var(--gradient-contact)` |
| Login / Back Office / fallback | Quiet static foundation treatment |

The styling feature consumes route state supplied by React; it does not parse URLs independently or perform navigation.

### Shared State Contract

Reusable controls and surfaces should expose clear class, attribute, or pseudo-class states for:

- hover;
- `:focus-visible`;
- active/current;
- selected/expanded;
- disabled;
- pending/loading;
- success;
- warning; and
- error.

Native attributes such as `disabled`, `aria-current`, `aria-expanded`, `aria-selected`, and `aria-invalid` are preferred over styling-only state classes when the semantic attribute applies.

## Data and Validation

This feature does not create user or Supabase data. Its configuration data is limited to design tokens and route-to-current mappings.

Validation rules:

- every raw palette value is a valid six-digit hexadecimal color;
- JavaScript and CSS raw palette values match case-insensitively;
- every required public route maps to one approved gradient;
- every semantic color token resolves to a defined raw or derived value;
- every font role has at least one local/system fallback;
- every spacing, size, radius, layer, and motion token resolves to a valid CSS value;
- component styles do not reference undefined custom properties without a safe fallback;
- focus, text, control, and state combinations meet the accessibility contrast contract; and
- decorative assets and effects are not required inputs for component rendering.

## Technical Constraints

- Use the existing React 19, Vite 8, JavaScript, semantic HTML, and project CSS stack.
- Use CSS custom properties as the public styling API.
- Do not introduce a CSS preprocessor, runtime styling system, theme framework, UI kit, or animation package.
- Prefer CSS Grid, Flexbox, logical properties, `clamp()`, `min()`, `max()`, and modern media queries with reasonable fallbacks.
- Use the exact Header navigation breakpoint contract: mobile/tablet at 768px and below; desktop at 769px and above.
- Treat 320px as the narrowest supported viewport for acceptance testing.
- Keep Three.js route-scoped, optional, and progressively loaded where page specifications approve it.
- Preserve `HashRouter`, Vite base `/`, and GitHub Pages compatibility; styles and assets must not assume nested server paths.
- Do not reference private `.omi` assets from production CSS or markup.
- Do not publish or encode credentials, personal data, private résumé content, or unapproved contact information in CSS, generated content, or asset URLs.
- Keep all modified CSS files compliant with the file-overview and comment requirements in `ai/ai-spec.md`.
- Run lint and production build checks at the styling checkpoint even when the changes are CSS-only.

## Implementation Decisions

### Styling Layers

Implement the visual system in this order:

1. raw and semantic tokens;
2. document baseline and typography;
3. shared shell, surfaces, controls, and focus;
4. responsive page composition;
5. route accents and quiet decoration;
6. reduced-motion and fallback behavior; and
7. approved signature-scene polish.

Each layer must leave the site usable before the next is added.

### Component Ownership

- The styling feature owns token definitions, global baseline rules, and shared visual-state contracts.
- Header & Footer owns its markup, navigation behavior, route detection, and final shared-shell selectors.
- Each page feature owns its content-specific layout and local decorative composition.
- Home, Journey, and Projects own their respective progressive Three.js scenes and fallbacks.
- Form-owning features control validation semantics and status text; the styling system only provides consistent visual roles.
- Login and Back Office reuse the same default world and control vocabulary without receiving public thematic labels.

### Restraint Rules

- Use one dominant fantasy idea per major composition and at most one strong glowing focal point in the same viewport region.
- Prefer whitespace, warm surfaces, and ink hierarchy before adding another texture or effect.
- Apply street-art and cyberpunk layers only after the semantic layout is clear in grayscale and without backgrounds.
- If decoration conflicts with readability, focus, performance, or responsive behavior, remove or simplify the decoration.

### No Broad Refactor Requirement

The plan illustrates a possible `src/styles/` architecture. The current repository may continue using `src/index.css`, `src/App.css`, component styles, and page styles when ownership remains clear. A file reorganization is optional and must not be combined with unrelated feature work merely to mirror the plan diagram.

## Acceptance Criteria

### Tokens and Visual Hierarchy

- [ ] One canonical Phoenix Codex palette supplies all global raw colors.
- [ ] CSS raw palette values match `src/data/phoenixCodexPalette.js` exactly.
- [ ] Shared components consume semantic tokens rather than repeating raw hex values.
- [ ] Warm foundation colors dominate large surfaces.
- [ ] Pastels support section identity without becoming primary body-text backgrounds.
- [ ] Bright magical accents remain limited and do not dominate the page.
- [ ] No page stylesheet introduces a competing global palette.

### Typography and Layout

- [ ] Decorative, heading, body/interface, and monospace roles are visibly distinct and used only for their approved purposes.
- [ ] Essential content remains readable when remote fonts fail.
- [ ] Body and form text remain at least 1rem at narrow widths.
- [ ] Long text and URLs wrap without horizontal page overflow.
- [ ] Major media reserves stable space before loading.
- [ ] Content uses the shared gutter and maximum-width vocabulary.
- [ ] The application has no horizontal page scroll at 320px, 768px, 769px, or the selected desktop width.

### Routes and Components

- [ ] Home, Journey, Projects, Links, and Contact use their approved route-current sequences.
- [ ] The gradient current is decorative and not the only current-page indicator.
- [ ] Login and Back Office use a quiet shared treatment without entering public navigation.
- [ ] Cards, buttons, links, tags, forms, feedback, dialogs, and headings share a coherent token-based vocabulary.
- [ ] Every interactive state remains distinguishable from its surrounding states without color alone.
- [ ] Journey and Projects remain separate pages with distinct route currents and no combined Portfolio presentation.

### Accessibility and Responsiveness

- [ ] Normal text, large text, controls, meaningful graphics, and focus indicators meet WCAG 2.1 AA contrast requirements in every relevant state.
- [ ] Focus-visible treatment is obvious, consistent, and not clipped or covered.
- [ ] Keyboard focus order follows the semantic document order.
- [ ] Hover-revealed behavior is also available by keyboard and touch.
- [ ] Interactive targets are approximately 44px or larger where practical.
- [ ] Layouts work at 320px, 768px, 769px, desktop, and 200% zoom.
- [ ] Sticky Header and bottom navigation do not obscure anchors, focus, controls, or final content.
- [ ] Forced-colors mode retains recognizable links, controls, current state, and focus.

### Motion and Progressive Enhancement

- [ ] The complete readable interface renders before optional texture, poster, canvas, models, and particles.
- [ ] Reduced-motion mode presents static route identity and settled content.
- [ ] No essential information or control depends on animation, pointer tracking, canvas, or hover.
- [ ] Continuous optional animation pauses offscreen and cleans up on unmount where applicable.
- [ ] Mobile scene effects use at most half the desktop particle count and avoid multiple transparent full-screen canvases.
- [ ] A font, image, texture, or WebGL failure leaves all required workflows usable.
- [ ] Project cards and other entrance effects settle into stable readable positions.

### Scope and Quality

- [ ] Only the `cozyFantasy` default theme ships.
- [ ] No theme selector, dark mode, sound, device tilt, splash, or unapproved dependency is added.
- [ ] Every modified CSS file has an accurate comments-based Table of Contents.
- [ ] Non-obvious styling invariants have concise why-comments.
- [ ] Lint and production build pass.
- [ ] Build output has been reviewed for material CSS, font, image, and scene regressions.

## Verification Plan

### Automated Checks

Run from the repository root:

```bash
npm run lint
npm run build
```

Where practical, add focused tests or a small validation script for:

- required palette keys and exact values;
- JavaScript-to-CSS palette parity;
- required route-current declarations;
- absence of undefined custom-property references in shared styles; and
- component state attributes that own semantic meaning.

Do not use brittle snapshot tests as the only styling verification.

### Manual Route Matrix

Inspect all defined routes at 320px, 768px, 769px, and at least one desktop width:

| Route | Primary visual check | Required fallback check |
| --- | --- | --- |
| Home | Warm world, Home current, clear introduction/actions | Vortex absent or static |
| Journey | Gold/coral path identity supports education, experience, and résumé actions | Timeline and résumé content remain fully readable without motion |
| Projects | Cyan/violet/pink/orange identity supports the settled media grid | Projects and case studies remain fully readable without motion |
| Links | Cool portal accents remain restrained | Resource links remain obvious without imagery |
| Contact | Calm warm accents support form hierarchy | Validation and submission states work without animation |
| Login | Neutral, focused authentication surface | No public discovery styling |
| Back Office | Dense private data remains readable | Table/cards/dialog usable on narrow screens |

### Accessibility Checks

- Navigate every route using keyboard only.
- Confirm skip-link, active-navigation, control, dialog, and form focus visibility.
- Test hover-only candidates with focus and touch-equivalent interaction.
- Check contrast for normal, hover, focus, active, disabled, pending, success, warning, and error states using the actual composited backgrounds.
- Enable `prefers-reduced-motion: reduce` and confirm all content appears in its settled state.
- Test browser forced-colors/high-contrast mode.
- Zoom to 200% and inspect reflow, sticky regions, dialogs, forms, tables, and long content.
- Review landmarks, heading order, accessible names, status announcements, and image alternatives with a screen reader or accessibility tree.

### Resilience and Performance Checks

- Disable or block web fonts and verify readable fallback typography.
- Block representative decorative images and confirm stable layout and understandable content.
- Test with WebGL unavailable and verify every required action.
- Use network throttling to confirm the HTML interface precedes optional visual layers.
- Scroll scenes offscreen and navigate away while monitoring for continued animation work or leaked listeners.
- Inspect production asset sizes and route chunks after `npm run build`.
- Smoke-test the deployed GitHub Pages hash URLs after the styling work reaches `main`.

## Warnings and Known Limitations

- The 65/20/10/5 color ratio is a visual-composition target, not a mechanically testable pixel quota.
- Canonical palette values do not guarantee accessible pairings. Every rendered foreground/background combination still requires contrast verification.
- `color-mix()`, `backdrop-filter`, and newer viewport units need graceful fallbacks when they affect legibility or layout.
- Remote Google Fonts can fail, be blocked, or load slowly; system fallbacks are part of the required design, not an error state.
- A static `prefers-reduced-motion` media query covers CSS motion but does not automatically stop JavaScript animation loops; scene-owning features must observe and clean up their own motion.
- Journey and Projects are intentionally separate routes. Do not collapse them into one Portfolio route or reuse one route current for both pages.
- Login and Back Office share the Phoenix Codex foundation but must not receive labels or links that reveal hidden administration routes.
- Theme-ready tokens do not authorize a second theme or a visible theme control.
- The styling feature cannot be declared complete from screenshots alone; keyboard, reduced-motion, contrast, overflow, fallback, lint, and build checks are required.

## Notes for AI and Contributors

- Read `ai/ai-spec.md`, this file, and the owning page feature before changing styles.
- Preserve user-authored working-tree changes and keep styling edits scoped to the active branch.
- Treat the existing route architecture and rubric requirements as stronger than alternate route suggestions in the creative plan.
- Start with tokens, semantic HTML, focus, and reflow; add decoration only after the foundation passes.
- Reuse existing custom properties and selectors before inventing near-duplicate values.
- Do not silently alter raw palette values, break JavaScript/CSS token parity, or introduce a second canonical source.
- Never use a decorative script or graffiti treatment for essential content.
- Keep bright gradient and glow areas away from small text unless a stable solid surface guarantees contrast.
- Do not solve responsive issues by hiding required content or actions.
- Do not add a dependency for an effect CSS or a browser API can provide within the approved scope.
- Keep route-specific artwork and scene code lazy and owned by its page feature.
- Document material visual decisions, fallbacks, derived state tokens, and unavoidable limitations near the owning code.
- End implementation handoffs with exact verification results, narrowly scoped `git add` commands, and a truthful Conventional Commit-style command as required by `ai/ai-spec.md`.
