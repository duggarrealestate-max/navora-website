---
name: 3D Web Experience Engineering
description: Guidelines for building premium, responsive, and robust 3D web experiences using React Three Fiber, Three.js, Drei, and GSAP in the AI Business Factory project.
---
# 3D Web Experience Engineering

## Purpose
Production-quality 3D web experiences using React Three Fiber, Three.js, Drei and GSAP.

## Rules

- **Inspect First**: Inspect the existing 3D architecture before changing it.
- **Scroll Architecture**: Reuse the existing `ScrollDirector` rather than creating competing scroll systems. Scroll-driven movement must be reversible.
- **Character Assets**: Use real rigged GLB/GLTF assets for important animated characters whenever suitable assets are available. Never present crude primitive geometry as a finished premium character.
- **Animations**: Use `useGLTF`/`useAnimations` safely. Inspect actual animation clip names before mapping states. Smoothly crossfade between character animations. Keep character world movement and character animation synchronized.
- **Camera Framing**: Camera movement must not visually cancel character movement. Use subtle parallax and depth rather than excessive movement.
- **Typography**: Important typography remains HTML/CSS rather than WebGL text.
- **Resilience & Accessibility**: Respect `prefers-reduced-motion`. Keep 3D lazy-loaded. Preserve `SceneErrorBoundary`. 3D/model failures must never blank the public HTML interface.
- **Isolation**: Keep `/command-centre` and Wholesale OS isolated from public 3D code.
- **Acceptance Testing**: Validate by running the actual page in the browser, not only build/lint checks. For visual requirements, browser rendering is the acceptance test.

## Workflow

1. INSPECT
2. PLAN MINIMUM CHANGE
3. IMPLEMENT
4. RUN PAGE
5. VISUALLY VERIFY
6. LINT
7. TYPECHECK
8. BUILD
9. REPORT
