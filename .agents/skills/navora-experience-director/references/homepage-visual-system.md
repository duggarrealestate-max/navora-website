# Homepage visual system

## Primary reference and source map

The approved homepage is the reference, not a remembered brand concept. Reinspect its running rendering and source before public design work. This source inventory was captured during skill creation; it is not a permanent palette approval or browser QA result.

- `src/app/App.tsx`: lazy public routes under `PublicShell`, separate internal routes and redirect aliases.
- `src/public/pages/LandingPage.tsx`: fixed Canvas behind HTML, `SceneErrorBoundary`, capability checks, `ScrollDirector`, hero and six service zones.
- `src/public/components/sections/HeroSection.tsx` and `ServiceZone.tsx`: headline composition, viewport reveals, floating UI and spacious full-height storytelling.
- Six zones in order: `WebDesignZone` = ATTRACT; `AIZone` = ENGAGE; `AutomationZone` = CONVERT; `CRMZone` = DELIVER; `CommunicationZone` = RETAIN; `DashboardZone` = GROW. The hero also has `data-scroll-zone`; do not interpret selector count as exactly six sections or change scroll mapping while styling a subpage.
- `src/public/components/three/World3D.tsx`, `Avatar3D.tsx`, `CameraRig.tsx`: homepage robot, spatial atmosphere and scroll/camera relationships. Keep these homepage-only.
- `src/public/layouts/PublicShell.tsx`: shared logo/navigation, modal mobile menu, skip link, route scroll reset, footer and `MotionConfig reducedMotion="user"`.
- `src/public/styles/navora.css`, `solutions.css`, `system-experience.css`, `tailwind.config.js`, `src/design/tokens/index.ts` and `theme.css`: overlapping style/token sources. Trace actual use and computed style rather than selecting tokens solely by name.

## Observed values, not unrestricted permissions

Public-shell CSS currently declares background `#090909`, warm important text `--nv-text: #f1f0e9`, body text `--nv-muted: #b8b8b8`, and `Inter, system-ui, sans-serif`. Its headings use controlled clamp sizes and tight tracking. Homepage HTML additionally uses Tailwind `soft-white`, `silver`, `charcoal` and `graphite`; those map respectively to `#f0f4ff`, `#94a3b8`, `#0f1117` and `#374151` in the inspected configuration. A token named graphite is therefore not proof of a neutral charcoal colour.

The homepage also contains cyan/violet gradients and other inline status colours. Shared application tokens include still more accents. Their presence is not permission to introduce new blue, violet, purple, yellow or gold. Preserve approved homepage rendering and extract a page-specific approved token set from current evidence. Do not carry legacy accent defaults, gradient headlines or shared application colours into redesigned subpages. Use the verified solid warm-white treatment for important new public text.

## Transfer the visual grammar

- Make black and graphite the foundation, with restrained directional lighting.
- Reuse genuine typography and readable scale; keep headings controlled rather than oversized.
- Avoid extremely faded body text. Inspect actual contrast over every underlying surface and animation state.
- Give glass surfaces depth and hierarchy through distinct information roles, opacity, borders, occlusion and measured lighting; do not clone identical glass cards.
- Preserve purposeful negative space. Let floating interfaces occupy available space without covering copy, controls or one another.
- Transfer the homepage's measured motion rhythm and atmosphere to functional abstract subpage systems; never transfer its robot or humanoid character.
- Simplify mobile deliberately: fewer simultaneous surfaces, shorter paths, readable content and explicit controls.

Record computed fonts, colours, widths, line breaks, surfaces, lighting, timing and screenshots before selecting new-page values. If source and approved screenshots disagree, resolve that discrepancy rather than silently revising protected homepage files.
