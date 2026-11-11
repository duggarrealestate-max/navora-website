# Frontend Design — AI Business Factory

## Purpose

This skill governs all public-facing website design and frontend development work in the AI Business Factory project. It defines the visual direction, 3D architecture, motion principles, business communication style, and engineering standards that every frontend change must follow.

The public marketing website and the internal Wholesale OS share this repository. Public website work must never break the internal application.

## Project Architecture Reference

### Directory Layout
```
src/
├── app/        — Composition root (providers, stores, routing)
├── design/     — Design system (tokens, primitives, charts)
├── platform/   — Shared vertical-agnostic modules
├── verticals/  — Industry-specific implementations (Wholesale OS lives here)
├── integrations/ — Adapter interfaces + future implementations
├── demo/       — Deterministic demo data + demo adapters
├── features/   — Feature modules (e.g. retailer engine)
├── public/     — Public marketing website (pages, layouts, components)  ← THIS SKILL APPLIES HERE
└── shared/     — Truly shared utilities
```

### Public Website Structure
```
src/public/
├── layouts/PublicShell.tsx      — Nav wrapper for public routes
├── pages/                        — Route pages: LandingPage, ServicesPage, WorkPage, ProcessPage, ContactPage
├── components/
│   ├── ScrollDirector.tsx        — GSAP ScrollTrigger scroll progress driver
│   ├── SceneErrorBoundary.tsx    — 3D error boundary with dark fallback
│   ├── sections/                 — Zone sections (HeroSection, AIZone, AutomationZone, etc.)
│   ├── three/                    — 3D scene components (World3D, CameraRig, Avatar3D, HeroScene3D)
│   └── ui/                       — Floating UI overlays (FloatingText, FloatingInterface, FloatingBrowserMockups)
└── hooks/
    └── useCapabilities.ts        — WebGL and reduced-motion detection
```

### Path Aliases
- `@/*` → `src/*`
- `@design/*` → `src/design/*`
- `@public/*` → `src/public/*`
- `@shared/*` → `src/shared/*`

### Key Dependencies
| Category | Libraries |
|----------|-----------|
| 3D | `@react-three/fiber`, `@react-three/drei`, `three` |
| Motion | `framer-motion` (component animation), `gsap` + `ScrollTrigger` (scroll-driven) |
| Styling | `tailwindcss`, `postcss`, `autoprefixer` |
| Routing | `react-router-dom` v7 |
| Utilities | `seedrandom`, `clsx` (via `@shared/utils/format`) |

### Validation Commands
Always run after meaningful changes:
```bash
npm run lint      # eslint src
npm run typecheck # tsc --noEmit
npm run build     # tsc --noEmit && vite build
```

---

## 1. PRESERVE APPROVED DESIGN

- Never redesign an approved interface unless explicitly requested.
- Modify only the components required for the specific task.
- Do not replace custom interfaces with generic SaaS templates.
- Inspect the existing implementation thoroughly before editing:
  - Read the target component and all directly-related siblings.
  - Check how props flow between components (e.g. `scrollProgress`, `mouse`, `reducedMotion`).
  - Match existing className conventions, spacing scales, and motion patterns.
- If an approved component is working, do not rebuild it unnecessarily.

## 2. VISUAL DIRECTION

- **Premium futuristic technology aesthetic.** Dark immersive environments as the foundation.
- **Dark immersive environments.** Base background: `#0a0a0d`. Surfaces: `#121216` to `#16161a`.
- **Cyan/violet used primarily as accents.** Accent colors drawn from the design system:
  - Violet: `#6366f1` (indigo-500)
  - Cyan: `#06b6d4` (cyan-500)
  - Purple: `#8b5cf6` (purple-500)
  - Soft cyan: `#06b6d1` (in lighter contexts)
- **Strong typography.** `Inter` font family. High font-weight contrast (300–800). Letter-tracked headings. Use `clamp()` for responsive headline sizing.
- **Intentional whitespace.** Generous padding, deliberate vertical rhythm between sections (`min-h-screen` zones).
- **Sophisticated motion.** Subtle, purposeful. No gratuitous bounce or overshoot.
- **Avoid** generic blue/gold corporate styling. Avoid unnecessary gradients everywhere. Avoid repetitive generic feature-card layouts — prefer asymmetric, floating, narrative-driven compositions.

### Existing Color Palette Reference
```css
/* Core backgrounds */
--color-bg:        #0a0a0d   /* page background */
--color-bg-secondary: #0f0f12
--color-surface:   #121216   /* elevated surfaces */

/* Text */
--color-text-primary:   #f8fafc
--color-text-secondary: #94a3b8
--color-text-tertiary:  #64748b

/* Accents */
--color-primary:        #6366f1  /* violet */
--color-secondary:      #06b6d4  /* cyan */
--color-accent:         #06b6d4  /* cyan */
```

## 3. 3D

- **React Three Fiber / Three.js** for all spatial 3D experiences. Components live in `src/public/components/three/`.
- **Prefer production-quality GLB/GLTF assets** for important characters. The `Avatar3D` component already supports an external GLB path (`/models/avatar.glb`) — set `USE_EXTERNAL_AVATAR = true` when a real asset is available.
- **Never present crude spheres/capsules/primitives as a finished premium character.** The current `ProceduralAvatar` is an internal fallback only. When real assets are missing, the procedural fallback is acceptable as a *temporary* stand-in, but never as the shipped premium face of the brand.
- **Maintain safe procedural fallbacks where appropriate.** `SceneErrorBoundary` must always wrap the `<Canvas>` (see `LandingPage.tsx:59`). Never remove this protection.
- **Missing 3D assets must never crash the HTML website.** The `SceneErrorBoundary` fallback renders a solid dark background. Always keep this boundary in place.
- **Optimise 3D assets and lazy-load expensive content.** Use `<Suspense fallback={null}>` around heavy 3D subtrees (see `LandingPage.tsx:71`). Reduce geometry detail in `Environment` and use `dpr={[1, Math.min(window.devicePixelRatio, 2)]}` on the Canvas.
- Keep the existing `World3D` → `CameraRig` → `Avatar3D` architecture intact.

## 4. MOTION

- **Motion must have a storytelling purpose.** Every animation should reinforce the user's journey or draw attention to meaningful content.
- **Scroll-driven 3D objects must physically change position when movement is requested.** The `World3D` component already computes physical `getAvatarPosition()` and `CameraRig` interpolates camera position/look-at between zone waypoints. Do not replace physical movement with cosmetic-only limb animation.
- **Do not claim a character moves merely because limb animation exists.** If the character's position in world space does not change, the motion is idle/breathing, not a journey.
- **Scroll-driven journeys should be reversible.** Use `scrub` in GSAP ScrollTrigger so the scene unwinds when scrolling back up.
- **Avoid conflicting/duplicate scroll systems.** The project uses a single scroll architecture:
  - `ScrollDirector` (GSAP `ScrollTrigger`) drives `scrollProgress` → `World3D` (camera + avatar position) + `currentZone` (zone indicator).
  - `framer-motion` `whileInView` is used for per-section HTML element entrances only.
  - Do not introduce a second scroll library or a second scroll-progress source.
- **Reuse the project's existing scroll-progress architecture.** The `scrollProgress` value (0–1) is the single source of truth for scroll-driven 3D state.
- **Respect reduced-motion preferences.** The `checkReducedMotion()` hook in `useCapabilities.ts` and the `prefers-reduced-motion` media query must gate all non-essential motion. When `reducedMotion` is true, zero out parallax, freeze camera movement, and disable idle animations.

## 5. BUSINESS COMMUNICATION

- **Design primarily for normal business owners, not AI engineers.** Avoid jargon.
- **Sell business outcomes rather than technical terminology.** Lead with what the business achieves.
- **Avoid overusing terms** such as "AI agents," "LLMs," "agentic AI," and "AI workforce." Use simpler language.
- **Explain technology in simple language.** If a technical concept is needed, explain it in one plain sentence.
- **Make visitors understand what work can be automated.** Show concrete, relatable business scenarios (e.g., "New enquiries captured and followed up automatically").
- **Encourage visitors to imagine what repetitive work could be automated** in their own business.

### Writing Patterns (from existing sections)
- Headlines are split: a short verb-driven phrase + a benefit-driven subheadline.
- Sections use `ServiceZone` with `data-scroll-zone` attribute.
- Use visual business journeys (e.g., the AutomationZone step flow: `NEW LEAD → AI → CRM → FOLLOW-UP → APPOINTMENT → CUSTOMER`).
- Keep interface copy concise — short labels, brief subheadlines, minimal body text.

## 6. CONTENT

- **Never invent performance statistics, customer numbers, or ROI claims.** Do not fabricate KPIs, growth percentages, or "X customers served." Any data shown must be real and documented.
- **Use real-world business scenarios.** Ground every example in an actual business workflow.
- **Prefer visual business journeys over long feature lists.** Show the flow, don't enumerate features.
- **Keep interface copy concise.** Short labels and brief explanations only.

## 7. RESPONSIVE DESIGN

- **Validate desktop, tablet, and mobile layouts.** Check at breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `xl2` (1536px).
- **Prevent clipping and horizontal overflow.** The root CSS sets `overflow-x: hidden` on `body` (see `theme.css:29`). Do not introduce elements that escape the viewport horizontally.
- **Important headlines should use deliberate responsive layouts** rather than accidental wrapping. Use `whitespace-nowrap lg:whitespace-normal` patterns (see `HeroSection.tsx:22`). Use `clamp()` for fluid responsive typography.
- **Simplify expensive 3D/motion on smaller devices** where necessary. The 3D `<Canvas>` and particle systems are already gated behind `checkWebGL()` and `prefers-reduced-motion`. Consider conditionally skipping 3D on low-end/mobile devices when performance is at risk.

## 8. ENGINEERING

- **Important text remains semantic HTML/CSS.** Headlines as `<h1>`–`<h6>`, labels as `<p>`/`<span>`, buttons as `<a>`/`<button>`. 3D is decorative, not structural for content.
- **Maintain accessibility.** Use `aria-hidden="true"` on decorative 3D canvases. Ensure color contrast meets WCAG AA. Provide visible focus states.
- **Maintain TypeScript quality.** All components use explicit return types and `interface` for props (not `type`). No `any` — use generics or `unknown`.
- **Do not install unnecessary libraries.** Reuse existing dependencies: `@react-three/fiber`, `@react-three/drei`, `three`, `framer-motion`, `gsap`, `tailwindcss`, `react-router-dom`, `seedrandom`.
- **Reuse existing project dependencies and patterns where appropriate.** Import via the path aliases (`@design/`, `@public/`, `@shared/`).
- **Do not duplicate architecture unnecessarily.** Reuse `ServiceZone`, `cn()`, `clsx`, and the scroll/motion conventions already established.

## 9. PROTECTED INTERNAL APPLICATION

The public marketing website (`/public`) and the internal Worsestale OS (`/command-centre`, `src/verticals/wholesale`) share this repository.

**Unless explicitly requested, DO NOT modify:**
- `/command-centre`
- Wholesale OS
- `AppShell` (`src/design/layout/AppShell.tsx`)
- Internal business logic
- Internal routes
- Internal database/API functionality

Public website work must not break the internal application. Always verify the build succeeds and the internal app still compiles.

## 10. VALIDATION

After meaningful frontend changes, run:
```bash
npm run lint
npm run typecheck
npm run build
```

Compilation does NOT equal visual approval. After building:
- Inspect the actual rendered component structure and implementation (DOM + 3D scene graph).
- Verify the 3D scene loads within `SceneErrorBoundary` and does not crash on missing assets.
- Verify scroll progress drives physical camera/avatar movement.
- Verify responsive behavior at all breakpoints.
- Verify reduced-motion preference is respected.

## 11. WORKING METHOD

For every significant frontend task:

1. **INSPECT** — Read the existing implementation, trace data flow, identify patterns.
2. **UNDERSTAND EXISTING DESIGN** — Match color, typography, spacing, motion conventions.
3. **IDENTIFY MINIMUM CHANGES** — Modify only what the task requires. Preserve approved work.
4. **IMPLEMENT** — Follow the architecture and conventions above.
5. **VALIDATE** — Run lint, typecheck, build. Inspect rendered output.
6. **REPORT** — Summarize changes, note any architectural decisions.

Summary: INSPECT → UNDERSTAND → MINIMIZE → IMPLEMENT → VALIDATE → REPORT
