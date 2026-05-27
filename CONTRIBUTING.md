# Contributing to @vanduo-oss/music-player

## Repository layout

This directory is a **nested git repository** inside the [Vanduo monorepo](https://github.com/vanduo-oss/framework) (`0_vanduo`). The canonical component source lives here:

- `src/index.js` — component logic
- `src/styles.css` — component styles
- `scripts/build.js` — esbuild outputs under `dist/`

The monorepo also vendors built artifacts for docs and framework consumers:

- `framework/js/vanduo-music-player.iife.js`, `framework/css/vanduo-music-player.css`
- `docs/js/vanduo-music-player.iife.js`, `docs/css/vanduo-music-player.css`

After changing source, run `pnpm build` in this package and copy `dist/` artifacts into those paths (or use your team’s sync script) before opening a monorepo PR.

## Development

```bash
cd music-player
pnpm install
pnpm build
pnpm test
```

Tests serve the package root on port **8793** and load `/dist/vanduo-music-player.iife.js` from the fixture at `tests/fixtures/music-player.html`.

## Publishing to npm

1. Work on `main` in **this** repo (`github.com/vanduo-oss/music-player`), not only the monorepo subtree.
2. Bump `version` in `package.json` and add a `CHANGELOG.md` entry.
3. Run `pnpm build` (also runs via `prepack`).
4. Tag and publish from the standalone repo: `pnpm publish --access public`.

Monorepo changes that touch the player should land here first (or in the same PR with both repos updated), then publish a new npm version and update docs CDN pins if applicable.

## Tests in the monorepo

`framework/tests/components/music-player.spec.ts` mirrors the package spec against the framework test server. Keep behavior in sync when adding API or fixture coverage.
