# Motion direction

## Choose the smallest appropriate medium

| Medium | Role |
| --- | --- |
| Framer Motion | Component states and micro-interactions. |
| GSAP timelines | Coordinated multi-element sequences. |
| ScrollTrigger | Meaningful scroll storytelling. |
| SVG | Connection paths and travelling signals. |
| CSS | Lightweight ambient movement. |
| React Three Fiber | Only meaningful abstract spatial objects on subpages. |

Motion must communicate information, decisions, actions or outcomes. Ambient movement supports the experience but cannot constitute the centrepiece. Do not mount a heavy WebGL environment on every page. No robots or humanoid characters outside the homepage.

## Repository integration

The existing homepage combines Framer Motion HTML with GSAP `ScrollDirector` and React Three Fiber `World3D`. Reuse the existing scroll architecture when working in its authorized scope rather than creating competing page-wide scroll systems. Keep subpage sequences scoped to their own roots; do not alter the homepage director to support a subpage. Avoid multiple libraries controlling the same element/property; use separate wrappers where responsibilities differ.

Read installed [gsap-core](../../gsap-core/SKILL.md), [gsap-timeline](../../gsap-timeline/SKILL.md), [gsap-scrolltrigger](../../gsap-scrolltrigger/SKILL.md), [gsap-react](../../gsap-react/SKILL.md) and [gsap-performance](../../gsap-performance/SKILL.md) for implementation details instead of reproducing them here. `@gsap/react` was not listed in the inspected package dependencies; use the installed skill's scoped `gsap.context()` lifecycle fallback unless dependency changes are separately authorized. Read [3d-web-experience](../../3d-web-experience/SKILL.md) for spatial resilience; its character guidance does not authorize subpage characters.

## Functional choreography

Design each sequence around input, processing, decision, action and outcome. Tie SVG travelling signals to actual stage changes, not arbitrary loops. Show approval gates and exceptions honestly. Give panels enough dwell time to read. Permit interrupt, replay and reset without stale statuses. Scroll stories should reverse coherently and leave normal scrolling/navigation usable.

Clean up every GSAP timeline, ScrollTrigger, media-query subscription, timer and event listener on unmount or relevant changes. Kill only instances owned by the current component; avoid global trigger cleanup that can break other areas. Prefer transforms and opacity; pause inactive work and limit expensive blur, lighting and simultaneous surfaces.

Never generate random values during rendering. Follow `AGENTS.md`: use deterministic seeded data through `demo/data/seed.ts` when variation is required, and stable scenario data otherwise.

## Floating panels

- Contain useful information and show enter → receive/update → connect/action → complete → minimise/exit where appropriate.
- Use empty space without overlapping headings, buttons, body content or other panels, including maximum travel bounds and intermediate states.
- Stay below mobile navigation in the stacking order; avoid trapping the modal menu in a transformed stacking context.
- Make decorative panels `pointer-events: none` and non-focusable. Give functional controls explicit pointer access, real semantics and visible keyboard focus.
- Never cause page overflow. Confine travel to measured safe bounds; clipping overflow alone is not a fix for hidden required information.
- On small mobile screens, show no more than two floating panels simultaneously. Prefer one active panel and one outcome/next-stage panel; sequence the remainder. Reduce depth/parallax and replace sprawling maps with a readable pathway.

## Reduced motion and failure

Respect `prefers-reduced-motion`, including preference changes during use. The shell already uses `MotionConfig reducedMotion="user"`; CSS disables animations/transitions and the homepage director checks the preference. These mechanisms do not prove every JS/WebGL loop is stopped: inspect and test each new sequence explicitly.

Remove parallax, continuous travel and ambient loops in reduced motion. Preserve information and interactions through immediate state updates or a stable textual pathway. Keep meaningful HTML, navigation, controls and status usable if animation, asset loading or WebGL fails. Preserve existing error boundaries and capability fallbacks; essential typography stays HTML/CSS.
