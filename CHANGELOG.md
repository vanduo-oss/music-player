# Changelog

All notable changes to `@vanduo-oss/music-player` are documented here.

## [1.0.0] — 2026-05-27

### Added

- Standalone npm package extracted from `@vanduo-oss/framework` (see v0.0.1 notes below).
- ESM, CJS, and IIFE builds plus `vanduo-music-player.css`.
- TypeScript declarations (`dist/index.d.ts`) and `"types"` export.
- Playwright component tests in `tests/` (fixture + spec against package `dist/`).
- `CHANGELOG.md`, expanded `README.md`, and `CONTRIBUTING.md` for dual-repo publish flow.

### Changed

- **Breaking for framework consumers:** the player is no longer bundled in the core framework; install `@vanduo-oss/music-player` separately.
- Floating corner presets now document and support all four corners: `bottom-left`, `bottom-right`, `top-left`, `top-right` (via `floatingPosition`, `detach(el, position)`, and `setPosition(el, corner)`).
- Docs on vanduo.dev: separate install, ESM import example, accessibility notes, nav under **Carousel & Media**.

## [0.0.1] — 2026-05-27

### Added

- Initial standalone extraction from the Vanduo monorepo.
- HTML5 audio player with transport controls, volume, optional shuffle, seek bar, and playlist.
- Glass surface, detachable floating mode, drag handle, minimize/expand, and optional `persistPosition`.
- Programmatic API: `init`, `initPlayer`, `play`, `pause`, `toggle`, `next`, `previous`, `setVolume`, `setTrack`, `shuffle`, `detach`, `attach`, `minimize`, `expand`, `toggleMinimize`, `setPosition`, `getState`, `destroy`, `destroyAll`.
- Custom events: `musicplayer:play`, `musicplayer:pause`, `musicplayer:trackchange`, `musicplayer:volumechange`, `musicplayer:ended`, `musicplayer:detach`, `musicplayer:attach`, `musicplayer:minimize`, `musicplayer:expand`.
- `reinit(root)` export and `Vanduo.register('musicPlayer', …)` when loaded after core Vanduo.
- Constants: `VD_MUSIC_PLAYER_VERSION`, `VanduoMusicPlayer.version`, `VanduoMusicPlayer.instances`, `VanduoMusicPlayer.defaults`.
