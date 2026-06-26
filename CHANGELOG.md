# Changelog

All notable changes to `@vanduo-oss/music-player` are documented here.

## [1.1.0] — Unreleased

### Added

- **Optional Vue 3 bindings** at `@vanduo-oss/music-player/vue` — a `VdMusicPlayer` component (props `tracks`, `options`) wrapping the player. `vue` is an *optional* peer dependency, marked external in the build, so vanilla consumers are unaffected. SSR-safe (the player is created on mount); the bubbling `musicplayer:*` events are forwarded as Vue emits.
- First OpenSpec `vue-bindings` capability; `package-integration` extended with the `./vue` subpath.

## [1.0.0] — Unreleased

### Added

- Tri-state **repeat** control on the transport bar: click cycles **off → one → all → off**.
- Repeat-one shows a tiny **1** badge on the button; repeat-all uses active styling.
- Init option `repeat: 'off' | 'one' | 'all'` (default `'off'`).
- APIs `repeat(container)` (cycle) and `setRepeat(container, mode)`.
- `getState().repeat` and `musicplayer:repeatchange` event with `{ repeat }` detail.
- Repeat modes override end-of-track behavior: one restarts the current track; all wraps the playlist (even when `autoAdvance: false`).

### Changed

- Opened `dev-v100` development branch for the v1.0.0 release cycle.

## [0.0.1] — 2026-05-27

### Added

- Initial standalone npm package extracted from `@vanduo-oss/framework`.
- ESM, CJS, and IIFE builds plus `vanduo-music-player.css`.
- TypeScript declarations (`dist/index.d.ts`) and `"types"` export.
- HTML5 audio player with transport controls, volume, optional shuffle, seek bar, and playlist.
- Glass surface, detachable floating mode, drag handle, minimize/expand, and optional `persistPosition`.
- Programmatic API: `init`, `initPlayer`, `play`, `pause`, `toggle`, `next`, `previous`, `setVolume`, `setTrack`, `shuffle`, `detach`, `attach`, `minimize`, `expand`, `toggleMinimize`, `setPosition`, `getState`, `destroy`, `destroyAll`.
- Custom events: `musicplayer:play`, `musicplayer:pause`, `musicplayer:trackchange`, `musicplayer:volumechange`, `musicplayer:ended`, `musicplayer:detach`, `musicplayer:attach`, `musicplayer:minimize`, `musicplayer:expand`.
- `reinit(root)` export and `Vanduo.register('musicPlayer', …)` when loaded after core Vanduo.
- Constants: `VD_MUSIC_PLAYER_VERSION`, `VanduoMusicPlayer.version`, `VanduoMusicPlayer.instances`, `VanduoMusicPlayer.defaults`.
- Playwright component tests in `tests/` (fixture + spec against package `dist/`).
- `CHANGELOG.md`, expanded `README.md`, and `CONTRIBUTING.md` for dual-repo publish flow.
- OpenSpec baseline specs under `openspec/specs/` for spec-driven development.

### Changed

- **Breaking for framework consumers:** the player is no longer bundled in the core framework; install `@vanduo-oss/music-player` separately.
- Floating corner presets document and support all four corners: `bottom-left`, `bottom-right`, `top-left`, `top-right` (via `floatingPosition`, `detach(el, position)`, and `setPosition(el, corner)`).
- Docs on vanduo.dev: separate install, ESM import example, accessibility notes, nav under **Carousel & Media**.
