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
