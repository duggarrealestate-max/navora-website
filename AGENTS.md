# AI Business Factory — Agent Guide

## Project Overview
A reusable platform for industry-specific operating systems. First vertical: Wholesale OS.

## Architecture Layers
```
src/
├── app/        — Composition root (providers, stores, routing)
├── design/     — Design system (tokens, primitives, charts)
├── platform/   — Shared vertical-agnostic modules
├── verticals/  — Industry-specific implementations
├── integrations/ — Adapter interfaces + future implementations
├── demo/       — Deterministic demo data + demo adapters
└── shared/     — Truly shared utilities
```

## Key Principles
- No `Math.random()` in render — use `seedrandom` via `demo/data/seed.ts`.
- Every external capability behind an interface (see `integrations/`).
- Platform modules import only interfaces, not provider implementations.
- All components must have loading, empty, and error states.

## Commands
- `npm run dev` — start Vite dev server (port 3000)
- `npm run build` — type-check + build
- `npm run lint` — eslint
- `npm run typecheck` — tsc --noEmit

## Adding a New Vertical
1. Create `verticals/<name>/` with `catalogue/`, `rules/`, `pages/`, `components/`.
2. Extend `IndustryConfig` in `src/shared/types/industry.ts`.
3. Wire into `app/providers/VerticalRegistry.ts`.
4. Reuse all `platform/*`, `design/*`, and `integrations/*`.
