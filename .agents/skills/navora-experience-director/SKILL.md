---
name: navora-experience-director
description: Direct NAVORA public website design into a distinctive cinematic AI-automation experience while preserving approved areas. Use whenever work involves NAVORA public website design, public-page redesign, homepage or subpage motion, floating interfaces, interactive automation demonstrations, NAVORA typography, colour, layout or visual identity, public responsive design, public visual QA, or adding new NAVORA public pages. Exclude internal application work unless checking isolation from public changes.
---

# NAVORA Experience Director

Create a living system that visibly completes useful work. Treat the currently approved six-zone homepage as the primary visual reference; preserve its robot experience and all approved areas. A decorative futuristic skin is insufficient.

## Inspect and protect

1. Read repository `AGENTS.md` and establish the requested page scope. Record existing changes and a before-change source/hash baseline for protected files. Protect the homepage, its section/3D/motion dependencies, shared navigation/footer, and all internal applications, especially `/command-centre`, `/retailer` and `/discovery`. Homepage changes require explicit homepage scope; a subpage request does not authorize them.
2. Before changing another public page, inspect the running homepage with Playwright at desktop and mobile sizes and read its current source, routing, section components, public shell, styles, tokens, animation architecture and reduced-motion handling. Inspect the requested page too. Discover the actual server URL; never assume a port. If rendered inspection is unavailable, report that limitation and obtain evidence before claiming visual fidelity.
3. Extract the genuine typography, surface treatment, motion rhythm, depth, lighting and atmosphere from rendered evidence and source. Never guess the brand system or palette from memory. Read [homepage-visual-system.md](references/homepage-visual-system.md).
4. Keep the robot exclusive to the homepage. Never add robots, humanoid characters or copies of the homepage robot to public subpages. Use abstract functional technology there: orchestration maps, signal paths, changing interface windows, approval gates, processing states and connected-system visualisations.

## Direct and implement

1. Read [public-page-experiences.md](references/public-page-experiences.md) and [anti-saas-rules.md](references/anti-saas-rules.md). Give every major page one memorable interactive centrepiece with a concrete trigger, understandable decision, action, human control and outcome. Preserve honesty and purposeful negative space.
2. Read [motion-direction.md](references/motion-direction.md). Design useful panels that enter, receive information, update, connect, complete and minimise or exit. Motion represents information, decisions, actions or outcomes. Decorative motion alone is insufficient.
3. Use installed skills selectively through the links below; do not duplicate their complete instructions. Apply this project's brand and protection rules when generic advice conflicts. Keep changes local to the authorized public page and its dedicated assets/styles; trace shared imports and selectors before editing them.
4. Use Playwright throughout implementation: inspect an early composition, complete state cycles, responsive behaviour and the final result. Visually inspect desktop and mobile screenshots, correct defects, then capture again. Follow [visual-qa-checklist.md](references/visual-qa-checklist.md).

## Installed skill references

| Need | Read |
| --- | --- |
| Distinctive composition and critique | [frontend-design](../frontend-design/SKILL.md) |
| Meaningful abstract spatial objects and HTML resilience | [3d-web-experience](../3d-web-experience/SKILL.md) |
| GSAP tweens, easing and media queries | [gsap-core](../gsap-core/SKILL.md) |
| Coordinated sequences | [gsap-timeline](../gsap-timeline/SKILL.md) |
| Meaningful scroll storytelling | [gsap-scrolltrigger](../gsap-scrolltrigger/SKILL.md) |
| React scope and lifecycle cleanup | [gsap-react](../gsap-react/SKILL.md) |
| Animation cost and transient updates | [gsap-performance](../gsap-performance/SKILL.md) |
| Accessibility and interface review | [web-design-guidelines](../web-design-guidelines/SKILL.md) |
| Applicable React performance rules | [vercel-react-best-practices](../vercel-react-best-practices/SKILL.md) |
| Playwright reconnaissance and visual feedback | [webapp-testing](../webapp-testing/SKILL.md) |

## Completion gate

Run `powershell -NoProfile -File .agents/skills/navora-experience-director/scripts/verify-navora-public.ps1`. It requires lint, typecheck and production build in that order and prints the public visual-inspection routes; it does not perform browser approval. Use the actual environment's PowerShell executable if different.

Confirm the homepage and `/command-centre`, `/retailer` and `/discovery` remain unchanged using source/hash comparison plus regression inspection when shared dependencies could affect them. Do not overwrite pre-existing user changes. Report changed files, centrepiece behaviour, desktop/mobile screenshot evidence, checks, protection evidence and remaining issues. HTTP 200, lint and build success are not visual approval. Never report unavailable checks as passed.
