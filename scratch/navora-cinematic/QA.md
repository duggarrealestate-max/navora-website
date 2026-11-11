# NAVORA Solutions — implementation and visual QA

Preview: http://127.0.0.1:51970/solutions

The former static Solutions presentation has been replaced by one automatically operating spatial theatre. Six deterministic illustrative journeys rotate without Run, Next, Approve or scenario controls. Scrolling reveals signal, understanding, orchestration, execution, exception handling and outcome.

## Scope and protection

Only the existing `src/public/pages/SolutionsPage.tsx` entry changed. Three page-specific files were added:

- `src/public/pages/CinematicSolutions.tsx`
- `src/public/components/system/CinematicWorld.tsx`
- `src/public/styles/cinematic-solutions.css`

SHA256 was recorded before editing for 173 existing source/brand/model files. The comparison confirms 172 are unchanged, including the six-zone homepage, its scroll and 3D files, other public pages, internal routes, Wholesale OS and business logic. The robot GLB and logo are unchanged. See `baseline.json` and `protected-check.json`.

## Homepage mapping and opening review

Homepage and old Solutions screenshots were captured at 1440×1000 and 390×844 before changes. Homepage source and its operating 3D world were inspected. Exact source colours, glass values, typography, lighting, motion and parallax are mapped in [visual-mapping.md](visual-mapping.md).

The first viewport was implemented and inspected separately before the remaining scenes. That review caught an invisible robot caused by skinned-model bounds and material handling. The corrected scale, independent cloned materials, lighting and mobile framing were inspected before extending the page. Evidence: `before-*`, `first-*`, `robot-*`, `lit-*` captures.

The latest user brief explicitly permits a meaningful page-specific robot. The implementation clones the existing rig and materials, without changing or mutating the homepage robot component or asset.

## Operating experience

- Sales enquiry, trade order, appointment booking, customer support, payment reminder and delivery exception rotate automatically.
- Every scenario changes its incoming record, customer, intent, priority, decision rules, systems, actions, exception owner and outcome.
- The robot receives, scans, walks through orchestration, routes work, detects an exception and confirms the outcome using whole-body clips and bounded movement.
- Envelope, calendar, parcel, database, payment token and customer-profile objects participate in the relevant scenarios. Data packets travel along their connections.
- Routine connections use homepage cyan. A separate violet branch delivers exception context. Completed work uses homepage emerald.
- One operational window enters, receives information, updates, fills its progress line, confirms a result and exits. No permanent dashboard or feature-card grid remains.
- Exceptions preserve human control. Disputes hold reminders; bespoke pricing and stock/access issues route to an owner; booking alternatives await customer confirmation. The theatre does not invent an approval or claim a disputed task succeeded.
- The ending uses the requested headline and `/contact` CTA.

## Motion and mobile

GSAP timelines and ScrollTrigger are scoped to this page and reverted on unmount. Six normal document sections share a sticky visual stage; no ScrollTrigger pin is used. Scroll reveals are reversible and the architectural layer uses the homepage's 1.2 scrub rhythm. Desktop camera parallax uses the homepage's .15/.08 values.

Mobile uses DPR 1, disables pointer parallax, reduces business objects to three, and shows one operational window. The parcel minimises during exception handover to give its owner clear space. Navigation remains above the visual scene.

Reduced motion disables continuous rendering, moving packets, object bobbing, scroll reveals and pointer depth. Robot animation is paused and its pose and camera are fixed. Workflow information still updates. An isolated 3D-layer screenshot comparison passes across an automatic phase change; HTML windows are excluded from that comparison because their intended content updates and shadows otherwise enter the canvas screenshot area.

## Verification evidence

- `full.json`: desktop automatic cycle — all six scenarios, all seven phases, all six exception routes and all six distinct outcomes.
- `mobile-cycle.json`: mobile automatic cycle and complete scroll layouts.
- `final-source.json`: fresh final-source desktop/mobile scroll, width, panel count, collision, keyboard, asset and console checks.
- `interaction.json`: mobile menu above the scene, Escape close and restored focus; reduced-motion geometry stability; panel entry/exit/replacement.
- `keyboard.json`: actual Tab reachability and Enter navigation to `/contact`, zero workflow buttons/tabs and no console errors.
- `regression.json`: read-only captures of every route in the NAVORA public verification inventory, including redirects and 404, at both target sizes.
- `home-after-*`: protected homepage and its third scroll zone after the opening animation.
- `verification.txt`: NAVORA verification script output for lint, typecheck and production build.

All source checks passed. A final production build also passed after the desktop calendar-label clearance. Latest opening/outcome captures wait for the lazy-loaded 3D layer to finish preparing; earlier captures remain as iteration evidence. Fresh final-source browser checks report no console errors or failed assets, one operational panel and no panel–copy overlap or horizontal overflow at either target size.

Playwright uses the installed cached JavaScript package with Chrome and SwiftShader, because Python Playwright is unavailable in this environment. Screenshots were opened and visually inspected, rather than treating HTTP or source-check success as visual approval.

Review the story sheets and individual `final-source-*`, `automatic-*`, and `exception-*` captures in this folder. Browser captures show operating objects, moving poses, travelling colour, handovers and recorded work; this is an illustrative experience, not a connection to live business systems.
