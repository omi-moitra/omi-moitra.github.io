# Optional Splash — Bird and Paint Trail

This is optional polish. Implement it only after every required page, Supabase workflow, specification, and checkpoint in `.omi/PROJECT_TASKS.md` passes. The splash must not replace routing, delay essential work, or prevent visitors from reaching content.

## Experience

On the first visit in a browser session:

1. Show a near-white full-viewport overlay.
2. Animate a decorative bird upward through the center.
3. Grow a soft paint-like pastel trail behind it.
4. Expand the paint wash into the same gradient used by the site.
5. Fade the entire overlay away to reveal the already-rendered application.

Suggested duration is no more than 2.3 seconds. Do not replay it on React Router navigation. Skip it after the first display in the same browser session.

## Required safeguards

- Respect `prefers-reduced-motion` and finish immediately when reduced motion is requested.
- Keep the real application mounted beneath the overlay so routing and loading can begin normally.
- Prevent keyboard focus and screen-reader access to temporarily obscured application content until the overlay is removed.
- Treat the animation as decorative; it must not announce meaningless content.
- Remove all timers during cleanup.
- Avoid large textures, excessive particles, and expensive blur effects on mobile.
- Test initial load, refresh, React Router navigation, keyboard use, and reduced motion.
- If performance or accessibility remains poor, remove the splash rather than weakening required behavior.

## Dependency decision

Framer Motion is not currently part of the required stack. Try a small CSS animation first. If Framer Motion is justified in the completed feature specification, install `framer-motion` as a runtime dependency and commit the lockfile change on the splash feature branch.

Do not add a particle or Lottie library for this effect unless the specification documents a concrete need and mobile performance remains acceptable.

## Palette

```css
:root {
  --lavender-mist: #e8dcff;
  --peach-glow: #ffd6c0;
  --mint-whisper: #c5f0e0;
  --body-ink: #2a133f;
}

.site-background,
.splash__wash {
  background: linear-gradient(
    135deg,
    var(--lavender-mist),
    var(--peach-glow),
    var(--mint-whisper)
  );
}
```

The splash wash and final application background must match so the transition feels continuous.

## Corrected Framer Motion blueprint

This example fixes the earlier no-op fade by animating the opacity of the entire overlay. Use it only if Framer Motion is approved and installed.

```jsx
// SplashOverlay.jsx
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './SplashOverlay.css'

const REVEAL_TIME_MS = 1850
const COMPLETE_TIME_MS = 2300

export default function SplashOverlay({ onDone }) {
  const reduceMotion = useReducedMotion()
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      onDone()
      return undefined
    }

    const revealTimer = window.setTimeout(
      () => setIsExiting(true),
      REVEAL_TIME_MS,
    )
    const completeTimer = window.setTimeout(onDone, COMPLETE_TIME_MS)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onDone, reduceMotion])

  return (
    <motion.div
      aria-hidden="true"
      className="splash"
      initial={false}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="splash__base" />

      <motion.div
        className="splash__wash"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="splash__flight"
        initial={{ x: '-50%', y: 160 }}
        animate={{ x: '-50%', y: -260 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="splash__trail splash__trail--narrow" />
        <div className="splash__trail splash__trail--wide" />
        <img
          className="splash__bird"
          src="/assets/splash-bird.svg"
          alt=""
        />
      </motion.div>

      <div className="splash__grain" />
    </motion.div>
  )
}
```

The main application should own whether the splash is shown. Use a stable callback so the overlay effect does not restart on parent renders:

```jsx
// AppShell.jsx
import { useCallback, useState } from 'react'
import SplashOverlay from './SplashOverlay.jsx'

const SPLASH_SESSION_KEY = 'portfolio-splash-seen'

function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SPLASH_SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export default function AppShell() {
  const [showSplash, setShowSplash] = useState(
    () => !hasSeenSplash(),
  )

  const finishSplash = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, 'true')
    } catch {
      // Storage can be unavailable; the application should still continue.
    }
    setShowSplash(false)
  }, [])

  return (
    <>
      {showSplash && <SplashOverlay onDone={finishSplash} />}

      <div
        aria-hidden={showSplash ? 'true' : undefined}
        inert={showSplash ? '' : undefined}
      >
        {/* Render the React Router application here. */}
      </div>
    </>
  )
}
```

## CSS responsibilities

The implementation CSS should:

- position `.splash` fixed across the viewport with an appropriate high stacking level;
- set `pointer-events: none` because the overlay has no controls;
- place `.splash__base`, wash, flight, and grain in an explicit stacking order;
- set the wash transform origin to the bottom;
- keep decorative grain subtle;
- use responsive bird/trail sizes rather than fixed desktop-only dimensions; and
- disable nonessential animation inside `@media (prefers-reduced-motion: reduce)` as a CSS fallback.

## Acceptance checklist

- [ ] The splash runs only after required project work is complete.
- [ ] It appears at most once per browser session and never on ordinary React Router navigation.
- [ ] The whole overlay fades smoothly; no transparent no-op fade remains.
- [ ] Reduced-motion visitors reach the site immediately.
- [ ] Obscured site controls cannot receive keyboard focus.
- [ ] The deployed site remains usable when session storage is unavailable or blocked.
- [ ] The application still renders if the optional bird asset fails to load.
- [ ] Mobile performance remains acceptable.
- [ ] `npm run lint` and `npm run build` pass.
