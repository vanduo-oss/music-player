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

## OpenSpec workflow

This repo uses [OpenSpec](https://openspec.dev/) for spec-driven development. Behavioral requirements live in `openspec/specs/`; proposed work lives in `openspec/changes/` until archived.

### Setup

OpenSpec is a dev dependency—no global install required:

```bash
pnpm install
```

After upgrading `@fission-ai/openspec`, refresh Cursor slash commands:

```bash
pnpm openspec:update
```

Restart Cursor if new `/opsx:*` commands do not appear.

### Day-to-day flow

1. **Propose** — In Cursor, run `/opsx:propose <short-name>` (e.g. add keyboard shortcuts). This creates `openspec/changes/<name>/` with proposal, design, tasks, and spec deltas.
2. **Implement** — Run `/opsx:apply` to work through `tasks.md` and keep code in sync.
3. **Archive** — When shipped, run `/opsx:archive` to merge spec deltas into `openspec/specs/` and move the change to `archive/`.

Validate specs anytime:

```bash
pnpm openspec:validate
pnpm openspec:list
```

### What to update when behavior changes

| Artifact | Role |
|----------|------|
| `openspec/specs/` | Source of truth for requirements (via archive) |
| `README.md` | User-facing API and options reference |
| `types/index.d.ts` | TypeScript public contract |
| `tests/components/music-player.spec.ts` | Playwright coverage |
| `CHANGELOG.md` | Release notes per version |

Specs capture *what* and *why*; README stays concise for npm consumers. Do not add `openspec/` to the npm `files` field.
