# Frontend Architecture

This frontend is built with Vite + React + TypeScript following a Clean Architecture structure for maintainability and testability.

## Layers

- `src/app` — App composition, providers, routes, and simple DI container.
- `src/domain` — Pure business logic: entities, repository interfaces, use cases.
- `src/infrastructure` — Framework/IO implementations: HTTP client, repository implementations.
- `src/presentation` — UI components, layouts, and pages.
- `src/shared` — Cross-cutting concerns: config, utils, constants, and types.

## Key Files

- `src/app/providers/AppProviders.tsx` — Global providers (e.g., Router).
- `src/app/routes/AppRouter.tsx` — Route definitions.
- `src/infrastructure/http/client.ts` — Axios instance using `VITE_API_BASE_URL`.
- `src/shared/config/env.ts` — Zod-based environment parsing and defaults.

## Path Aliases

Configured in `tsconfig.app.json` and consumed via the `vite-tsconfig-paths` plugin.

Examples:

- `@app/*` → `src/app/*`
- `@domain/*` → `src/domain/*`
- `@infrastructure/*` → `src/infrastructure/*`
- `@presentation/*` → `src/presentation/*`
- `@shared/*` → `src/shared/*`

## Development

- Copy `.env.example` to `.env` and adjust values as needed.
- Install: `npm install`
- Start dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

