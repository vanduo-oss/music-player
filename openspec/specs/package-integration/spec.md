# package-integration Specification

## Purpose

Define npm package exports, build artifacts, TypeScript declarations, Vanduo framework integration, and declarative HTML initialization.

## Requirements

### Requirement: ESM and CJS exports

The package SHALL publish ESM (`dist/index.js`) and CJS (`dist/index.cjs`) entry points with TypeScript types at `dist/index.d.ts`.

#### Scenario: Default ESM import

- GIVEN a bundler resolving `@vanduo-oss/music-player`
- WHEN importing the default export
- THEN `VanduoMusicPlayer` API object is available with full programmatic methods

#### Scenario: Named reinit export

- GIVEN an ESM consumer
- WHEN importing `{ reinit }` from the package
- THEN `reinit(root?)` re-scans for `[data-music-player]` within `root`

### Requirement: CSS export

The package SHALL expose styles via `@vanduo-oss/music-player/css` mapping to `dist/vanduo-music-player.css`.

#### Scenario: CSS side effect import

- GIVEN an ESM application
- WHEN `import '@vanduo-oss/music-player/css'` is used
- THEN player styles are available for `.vd-music-player` markup

### Requirement: Optional Vue subpath

The package SHALL expose `@vanduo-oss/music-player/vue` (`dist/vue.js`, `dist/vue.cjs`, types `dist/vue.d.ts`) with `vue` declared as an OPTIONAL peer dependency, so vanilla consumers are unaffected. Behaviour is defined by the `vue-bindings` capability.

#### Scenario: Vue consumer

- GIVEN a Vue 3 application
- WHEN importing `{ VdMusicPlayer }` from `@vanduo-oss/music-player/vue`
- THEN the component is available and `vue` resolves from the host application

#### Scenario: Vanilla consumer unaffected

- GIVEN a non-Vue consumer importing only `@vanduo-oss/music-player`
- THEN `vue` is NOT required to install or build the package

### Requirement: IIFE global build

The package SHALL publish `dist/vanduo-music-player.iife.js` exposing `window.VanduoMusicPlayer`.

#### Scenario: Script tag global

- GIVEN the IIFE loaded in a browser page
- WHEN the script executes
- THEN `window.VanduoMusicPlayer` provides the same API as the ESM default export

### Requirement: TypeScript declarations parity

`types/index.d.ts` (copied to `dist/index.d.ts` on build) SHALL describe the public API including options, state, events-related types, and method signatures.

#### Scenario: Options type coverage

- GIVEN TypeScript consumers
- WHEN using `MusicPlayerOptions`
- THEN all documented init options are typed including corner presets for `floatingPosition`

### Requirement: Declarative HTML initialization

Elements with `data-music-player` SHALL initialize from `data-music-player-options` JSON when `init()` or Vanduo auto-init runs.

#### Scenario: JSON options attribute

- GIVEN `<div data-music-player data-music-player-options='{"tracks":[...]}'>`
- WHEN `init()` runs
- THEN the player initializes with parsed options

#### Scenario: Required markup class

- GIVEN declarative usage
- WHEN integrating in HTML
- THEN the container uses class `vd-music-player` for styling

### Requirement: Vanduo framework registration

When `window.Vanduo` exists at load time, the IIFE SHALL register the component as `musicPlayer` for `Vanduo.init()` and `Vanduo.reinit('musicPlayer')`.

#### Scenario: Vanduo init discovers players

- GIVEN `vanduo.min.js` loaded before the player IIFE
- WHEN `Vanduo.init()` runs
- THEN `[data-music-player]` elements are initialized

### Requirement: Published npm files

The npm package `files` field SHALL include only `dist/`, `README.md`, `CHANGELOG.md`, and `LICENSE` — not `openspec/` or source.

#### Scenario: Consumer install contents

- GIVEN `pnpm pack` or npm publish
- WHEN the tarball is inspected
- THEN built artifacts and user docs are included
- AND `openspec/` is excluded
