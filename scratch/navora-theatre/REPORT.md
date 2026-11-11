# NAVORA Automation Theatre

Preview: http://127.0.0.1:51970/solutions

Replaced the previous solutions presentation with a scenario-driven simulation. Six selectable workflows change inputs, extracted context, rules, systems, actions, approval requirements, communications and outcomes. The theatre exposes Trigger → Understand → Decide → Act → Human control → Outcome, with automatic playback, manual steps, pause, reset and replay.

Sales enquiries, payment reminders and delivery recovery require approval. Orders, bookings and verified support can complete automatically. Introducing an exception holds the original action and requires approval for a named team handover. Holding work never releases the action. Every example is explicitly simulated; no external action is performed.

The composition uses the homepage/public shell's verified Inter font stack, warm-white important text, black/charcoal surfaces and silver borders. Functional SVG signals carry the selected record identifier. Operational panels enter, update, minimise or exit. Desktop pointer motion adds restrained depth. A scroll-directed permission map explains automatic and human pathways; it cannot bypass the approval gate. The outcome record reports system updates, permission and customer communication.

Mobile uses six readable selectors, controls above the active decision, a single central operational surface and compact endpoints. It removes desktop floating panels and sprawling paths. Reduced motion provides manual steps without animated travel or pointer depth, including preference changes during use. Playback pauses when the theatre leaves view or the document becomes hidden. No WebGL or new bitmap assets were needed.

## Source changes

- `src/public/pages/SolutionsPage.tsx`: entry for the replacement page.
- `src/public/pages/AutomationTheatre.tsx`: scenario data, state transitions, functional choreography and page content.
- `src/public/styles/automation-theatre.css`: page-scoped visual system and responsive layouts.

## Visual evidence

The running homepage and old solutions page were captured and visually inspected before editing at desktop 1440×1000 and mobile 390×844. `before-*` images and `before-styles.json` record that reconnaissance. The representative first viewport was implemented and both `first-*` screenshots were visually inspected before the remaining sections were added.

Final screenshots were opened and visually inspected, including:

- [Desktop first viewport](final-desktop-ready.png)
- [Mobile first viewport](final-mobile-initial.png)
- [Desktop approval gate](final-desktop-approval.png)
- [Mobile approval gate](final-mobile-approval.png)
- [Desktop completion](final-desktop-complete.png)
- [Desktop exception signal](final-exception-signal.png)
- [Mobile exception completion](final-mobile-exception.png)
- [Desktop permission map](final-desktop-boundary.png)
- [Mobile complete page](final-mobile-full-completed.png)
- [Desktop completed record](final-desktop-completed-receipt.png)
- [Mobile completed record](final-mobile-completed-receipt.png)
- [Mobile navigation and keyboard focus](final-mobile-menu.png)

Viewport screenshots verify active layers and readable states; full-page screenshots also contain scroll-directed sections at their offscreen transition states. Both scroll directions were exercised. Defects corrected during inspection included mobile controls below the first viewport, small scenario text, signal labels behind the central surface and exceptions travelling down the automatic completion path.

## Checks

- NAVORA verifier passed lint → typecheck → production build after the final source changes.
- `acceptance.json`: 24 successful desktop/mobile scenario cycles, covering normal and exception branches for every scenario; approval, hold, pause, reset, keyboard selection, mobile menu focus/return focus, scrolling and reduced-motion switching passed.
- `final-review.json`: touch selection, desktop pointer depth, changing signal coordinates, offscreen pause and reduced motion at page load passed.
- `exception-signal.json`: exception completion stayed on the human handover signal path.
- No horizontal overflow at 1440 or 390 pixels. No page exceptions were recorded on solutions.
- Protected internal routes and public navigation destinations were loaded; `/services`, `/work` and `/process` preserved their redirects.

## Protection and limitations

`baseline.json` captured SHA-256 hashes for 171 existing source/public files before editing. `protection-comparison.json` confirms 170 remain unchanged; the only changed existing file is `SolutionsPage.tsx`. The homepage, section/3D/motion dependencies, shared shell/navigation/footer, routing, tokens, internal applications and public assets are unchanged. The protected routes `/command-centre`, `/retailer` and `/discovery` were also loaded and captured. Git metadata was unavailable, so protection evidence uses file hashes rather than Git diffs.

The environment blocked the project's existing Google Fonts stylesheet. The configured font fallback remained usable; no new external font dependency was introduced. Production build retained existing large shared/Three.js chunk warnings. The theatre itself does not use Three.js. Initial verifier/server attempts hit Windows execution-policy/filesystem sandbox restrictions; the verifier passed using process-scoped execution-policy bypass and approved escalation. Python Playwright was unavailable, so inspection used the available cached Playwright installation with headless Chrome.
