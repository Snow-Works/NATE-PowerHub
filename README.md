# KELVINATE Power Hub

A power bank **rental** service for Uyo, Akwa Ibom, Nigeria, starting with stations on the
University of Uyo campus. Customers rent a power bank at a station, pay by bank transfer, and
return it at any station.

## Repository layout

| Folder        | What lives there                                           |
| ------------- | ---------------------------------------------------------- |
| `client/`     | React app (Vite). Runs in the browser.                     |
| `server/`     | Express 5 API (Node.js, ES modules). All business rules.   |
| `supabase/`   | SQL migrations and seed data (applied via the SQL Editor). |
| `tools/`      | Python dev tools (never deployed).                         |
| `docs/`       | Runbooks and project documents.                            |

## Requirements

- Node.js 24 and npm 11
- Git
- macOS or any Unix shell (commands in this repo are written for zsh)

## First-time setup

```zsh
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Then edit the two `.env` files. Real `.env` files are git-ignored and must never be committed.

## Everyday commands

Run these in two separate terminals:

```zsh
npm run dev:server   # API on http://localhost:4000 (default PORT)
npm run dev:client   # React app on http://localhost:5173
```

Quality gates (run before every commit):

```zsh
npm run lint
npm run format:check
npm run test
```

## Project state

See `PROJECT_STATE.md` for what is built, what is next, and open decisions.
