# Changelog

All notable changes to this project will be documented in this file.

## [2026-05-20]

### Added

- Added [`.data/question-import-template.json`](/home/palma/Projects/Freepardy/.data/question-import-template.json) as a ready-to-use question import template for the admin import flow.
- Added [`lib/game-data.ts`](/home/palma/Projects/Freepardy/lib/game-data.ts) to centralize shared game types, default game data, default teams, storage keys, and normalization helpers.
- Added import-template guidance to [`components/import-export.tsx`](/home/palma/Projects/Freepardy/components/import-export.tsx) so users can discover the template directly from the admin UI.

### Changed

- Updated npm dependencies and refreshed `package-lock.json` using `npm install` and `npm update` to pull the latest compatible in-range package versions.
- Updated [`package.json`](/home/palma/Projects/Freepardy/package.json) scripts for the current Next.js toolchain:
  - Replaced `next lint` with `eslint .` because the old lint command is no longer valid for this setup.
  - Switched the production build script to `next build --webpack` so builds succeed reliably in this environment.
- Updated [`eslint.config.mjs`](/home/palma/Projects/Freepardy/eslint.config.mjs) to use the flat-config exports from `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Updated [`tailwind.config.ts`](/home/palma/Projects/Freepardy/tailwind.config.ts) to use an ESM import for `tailwindcss-animate` instead of `require(...)`.
- Updated [`README.md`](/home/palma/Projects/Freepardy/README.md) to reflect the actual implemented feature set and document the new import template.

### Fixed

- Fixed imported game data handling in [`hooks/use-game-data.tsx`](/home/palma/Projects/Freepardy/hooks/use-game-data.tsx) by normalizing saved and imported data before it is stored in app state.
- Fixed a class of import-related issues where pasted or uploaded JSON could omit IDs, settings, `used` flags, or other optional fields and leave the app in a partially broken state.
- Fixed local persistence behavior for team scoring in [`components/team-scoring.tsx`](/home/palma/Projects/Freepardy/components/team-scoring.tsx) so teams are loaded from and saved to local storage consistently.
- Fixed Final Jeopardy team handling in [`components/final-jeopardy.tsx`](/home/palma/Projects/Freepardy/components/final-jeopardy.tsx) so it reads the same persisted team data as the score panel instead of relying on a disconnected local-only structure.
- Fixed Final Jeopardy wager handling to clamp values to valid ranges and preserve cleaner numeric state.
- Fixed the empty-team Final Jeopardy edge case by showing a safe fallback state instead of proceeding into a broken round.
- Fixed board rendering in [`components/game-board.tsx`](/home/palma/Projects/Freepardy/components/game-board.tsx) so it no longer assumes exactly five categories and five questions.
- Fixed board interaction logic so missing questions cannot be opened and empty board slots render as disabled cells instead of clickable ones.
- Fixed settings dialog synchronization in [`components/game-settings.tsx`](/home/palma/Projects/Freepardy/components/game-settings.tsx) so opening the dialog rehydrates the form from the latest saved settings.
- Fixed state update patterns across the app to satisfy the current React/ESLint rules by moving storage-backed initialization into lazy `useState(...)` initializers where appropriate.
- Fixed [`hooks/use-mobile.tsx`](/home/palma/Projects/Freepardy/hooks/use-mobile.tsx) to avoid a synchronous state update inside `useEffect`, resolving the post-update lint failure.
- Fixed immutable update behavior in question usage tracking so marking a question as used does not mutate nested state directly.

### Improved

- Improved the overall resilience of the game data model by giving imports and saved state a single normalization path in [`lib/game-data.ts`](/home/palma/Projects/Freepardy/lib/game-data.ts).
- Improved admin import UX by keeping validation, normalization, and success messaging aligned with the actual accepted JSON format.
- Improved offline and restricted-environment compatibility in [`app/layout.tsx`](/home/palma/Projects/Freepardy/app/layout.tsx) by removing the runtime dependency on fetching `Inter` from Google Fonts during builds.
- Improved lint stability by ignoring generated output and aligning the config with the installed Next.js ESLint presets.
- Improved README accuracy by removing undocumented claims that were not backed by the current codebase, including offline PWA support and URL-sharing configuration support.

### Verification

- Verified `npm run lint` passes.
- Verified `npm run build` passes.
- Verified TypeScript succeeds during the production build flow.
