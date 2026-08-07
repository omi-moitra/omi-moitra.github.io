# Feature Specification — Phoenix Codex Styling System

## Table of Contents

- [Goal](#goal)
- [Visual Hierarchy](#visual-hierarchy)
- [Color System](#color-system)
- [Typography](#typography)
- [Themes](#themes)
- [Shared Components](#shared-components)
- [Motion and Atmosphere](#motion-and-atmosphere)
- [Accessibility](#accessibility)
- [Acceptance Contract](#acceptance-contract)

## Goal

Create one coherent visual language in which cozy fantasy supplies the world, street-art
linework supplies energy, cyberpunk glow supplies restrained emphasis, and code supplies
the underlying magic system. Expressive decoration must support rather than obscure the
portfolio’s professional content and workflows.

## Visual Hierarchy

### Primary world — cozy fantasy

Warm paper, ivory panels, aged borders, illustrated journals, maps, books, soft light,
and hand-crafted containers control backgrounds and page structure.

### Secondary energy — street art

Brush strokes, ink splashes, hand-drawn arrows, oversized annotations, image framing,
and irregular linework create personality without replacing readable layout.

### Accent energy — cyberpunk

Portal blue, violet, cyan, coral, and gold appear in route currents, active controls,
timeline paths, focus effects, portals, and small interface indicators. Large surfaces
do not become uninterrupted neon fields.

## Color System

The JavaScript palette and CSS custom properties share these canonical values:

| Group | Token | Value |
| --- | --- | --- |
| Foundation | parchment | `#F5EBD8` |
| Foundation | softCream | `#FFF9ED` |
| Foundation | warmIvory | `#FFFDF6` |
| Foundation | agedPaper | `#E7D5B7` |
| Foundation | inkBlack | `#232126` |
| Foundation | charcoal | `#37323B` |
| Foundation | warmBrown | `#725E50` |
| Pastel | blushPink | `#F5B9C8` |
| Pastel | peachGlow | `#F6BE96` |
| Pastel | lavenderMist | `#C9B9F4` |
| Pastel | skyBlue | `#AFCFF2` |
| Pastel | mintLight | `#AEE3CE` |
| Pastel | butterGold | `#F4D889` |
| Magic | phoenixCoral | `#FF6559` |
| Magic | solarOrange | `#FF963D` |
| Magic | radiantGold | `#FFD34E` |
| Magic | plasmaPink | `#F34DA0` |
| Magic | arcaneViolet | `#8757E8` |
| Magic | portalBlue | `#428BFF` |
| Magic | spiritCyan | `#35D5DC` |
| Magic | renewalGreen | `#43C98A` |

Semantic tokens own page, surface, text, muted text, border, focus, success, warning,
error, disabled, and code roles. Page styles consume these roles and route-gradient
variables instead of introducing competing global palettes.

Public route currents are distinct: Home mixes cream, coral, blush, gold, and violet;
Journey emphasizes gold, coral, pink, and violet; Projects uses cyan, violet, pink, and
orange; Links uses mint, cyan, blue, and violet; Contact uses peach, blush, lavender, and
butter gold. Hidden administration routes use the quiet neutral current.

## Typography

- WindSong is reserved for decorative display accents.
- Playfair Display supplies literary/editorial headings.
- Nunito, Lato, and system sans-serif fallbacks supply body copy, navigation, forms, and
  controls.
- The system monospace stack supplies dates, tags, technology labels, and code-like
  annotations.

Body and form text remain legible at narrow widths. Long words and URLs wrap. Font
loading never blocks or hides content.

## Themes

Light, Dark, and System are first-class choices. Light uses parchment and ink roles;
Dark remaps those roles to dark atmospheric surfaces and high-contrast text; System
tracks the operating-system preference. The chosen mode persists locally and updates
browser color-scheme and theme metadata.

Theme controls appear in the desktop Header and mobile drawer. Their icons, selected
state, labels, and focus treatment remain understandable without relying on color alone.

## Shared Components

- The sticky Header uses a translucent warm surface, brand lockup, route current, public
  navigation, theme controls, and mobile drawer trigger.
- Cards use readable glass surfaces, ink text, restrained bevels, and route-specific
  detail without ornamental frames competing with their content.
- Buttons and links expose hover, active, disabled, and focus-visible states.
- Forms use persistent labels, solid input surfaces, associated hints/errors, and clear
  pending/feedback panels.
- Dialogs use strong surface separation, focus containment, safe dismissal, and bounded
  viewport overflow.
- The Footer uses a dark/light inverse surface, circular icon links, and centered
  copyright copy.

## Motion and Atmosphere

Three.js is concentrated in the Home vortex, its progressive scroll-linked card motion,
and the Journey phoenix scene. CSS owns the card-reveal fallback, route currents, the
lotus gate, feedback transitions, and other lightweight effects. Animation communicates
atmosphere and state but never contains required copy or the only path to a control.

The hidden lotus gate intentionally uses synthesized ambient sound and musical petal
notes after the visitor types its trigger. No other workflow depends on sound. Audio
ends when the gate closes, completes, or unmounts.

Reduced-motion mode settles or removes route-current movement, particle drift, smooth
travel, lotus bloom sequences, and entrance effects while preserving final states.

## Accessibility

- Normal and large text, controls, focus rings, state boundaries, and meaningful graphics
  meet WCAG 2.1 AA contrast.
- `:focus-visible` is consistent, obvious, and not clipped by sticky or overflow layers.
- Hover behavior is also exposed through focus, click, or persistent semantic content.
- Interactive targets approach or exceed 44 CSS pixels where practical.
- Forced-colors rules preserve control boundaries and selected states.
- Decorative images, canvas, particles, route currents, and icon flourishes are hidden
  from assistive technology.
- No global horizontal-overflow rule conceals layout defects.

## Acceptance Contract

- Palette values match between `phoenixCodexPalette.js` and global CSS.
- Light, Dark, and System remain readable across every route and state.
- Public routes retain distinct currents while Login and Back Office remain neutral.
- Readable HTML precedes optional scenes and generated decoration.
- WebGL, image, font, and audio failure leave all workflows usable.
- Layouts remain usable at 320px, tablet widths, desktop widths, and 200% zoom.
- Reduced motion, keyboard navigation, touch, and forced colors preserve all controls.
- Modified CSS files keep accurate comments-based tables of contents.
- Lint and production build pass.
