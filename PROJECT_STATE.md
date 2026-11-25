# PROJECT STATE

Last updated: Step 0a (in progress)

## Current step

Step 0: Foundations (branch `step-0-foundations`)

## Done

- [x] Step 0a: root files (.gitignore, .editorconfig, .prettierrc, package.json, README, this file)

## In progress

- [ ] Step 0b: Express 5 server skeleton
- [ ] Step 0c: Vite client, lint and format gates

## Decisions

- Monorepo with `client/` and `server/` as independent npm packages; root has no dependencies.
- JavaScript (ES modules) only, no TypeScript.
- Server dev: `node --watch --env-file=.env` (no nodemon, no dotenv).
- Prettier config lives once at the repo root.

## Owner to supply (before pilot)

- Station names, prices, bank details, support WhatsApp, contact email, social links.
- Privacy policy and terms text (get a lawyer to review; Nigeria Data Protection Act applies).

## Next

Step 1: Design system, after Step 0 "Done when" is confirmed by the owner.



# PROJECT STATE

Last updated: end of Step 0

## Current step

Step 0: Foundations. Complete once merged to main. Next: Step 1 (Design system).

## Done

- [x] Step 0a: root files (.gitignore, .editorconfig, .prettierrc, package.json, README, this file)
- [x] Step 0b: Express 5 server skeleton (app.js/server.js split, Zod-validated env, /api/health, JSON 404)
- [x] Step 0c: Vite client (React 19), TanStack Query provider, ApiStatus component (loading, error, "API OK")
- [x] Step 0d: ESLint (flat config) and Prettier in both packages, GET /api/time

## In progress

- [ ] Nothing. Waiting for "Begin Step 1".

## Decisions

- Monorepo with `client/` and `server/` as independent npm packages; root has no dependencies.
- JavaScript (ES modules) only, no TypeScript.
- Server dev: `node --watch --env-file=.env` (no nodemon, no dotenv).
- Prettier config lives once at the repo root; each package has its own .prettierignore.
- API dev port is 4100 (4000 is used by another local project; macOS AirPlay uses 5000 and 7000).
- Client dev port is fixed to 5173 with strictPort so it always matches CLIENT_ORIGIN.
- CORS allows exactly one origin for now (CLIENT_ORIGIN); the allow-list arrives in Step 6.
- No eslint-config-prettier: ESLint recommended rules contain no formatting rules.
- npm audit shows moderate dev-tool vulnerabilities; review in Step 13, never use `audit fix --force`.

## Owner to supply (before pilot)

- Station names, prices, bank details, support WhatsApp, contact email, social links.
- Privacy policy and terms text (get a lawyer to review; Nigeria Data Protection Act applies).

## Next

Step 1: Design system (tokens, fonts, theme, base components, /styleguide).
