# Learner – Frontend

## Getting started
npm install
npm run dev

## Mock API
To run against the built-in mock API, leave `VITE_API_URL` unset. Mock endpoints simulate a real backend with localStorage-based auth.

To switch to a real backend, create a `.env` file:

# Feature modules

Each feature is a self-contained domain slice under `src/features/<name>/`.

## Structure

```text
features/<name>/
├── pages/          # Route-level components
├── components/     # Feature-only UI (optional)
├── hooks/          # Feature data/state hooks (optional)
├── routes.jsx      # Lazy route definitions for the app router
└── index.js        # Public API barrel (pages + hooks only)
```

## Import rules

- Import shared code via `@shared/...` (UI, hooks, contexts, layouts, api).
- Import within a feature using relative paths or `@features/<name>/...`.
- Do **not** import another feature's internals. Link across domains with React Router URLs.
- Export only pages and hooks from `index.js`. Keep components internal unless truly shared.

## Adding a new feature

1. Create the folder structure above.
2. Add `routes.jsx` with `{ path, Component }` entries using `lazy()`.
3. Export public API from `index.js`.
4. Register routes in `src/app/router/publicRoutes.jsx` or `protectedRoutes.jsx`.
