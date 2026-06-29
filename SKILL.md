---
name: vanduo-music-player
description: Use when embedding an audio player with @vanduo-oss/music-player — a standalone HTML5 player (transport, volume, shuffle, repeat, seek, playlist, glass, detachable floating) with data-* auto-init and an optional Vue 3 component. Covers install, the JS API, options, events, security, and caveats.
---

# @vanduo-oss/music-player

Standalone **HTML5 audio player** for the Vanduo design system: transport controls, volume, optional shuffle, tri-state repeat, seek bar, playlist, frosted-glass surface, and a detachable floating mode. Framework-agnostic; consumed vanilla (IIFE / ESM / CJS) or via the optional Vue 3 component at `./vue`.

## Install

```sh
pnpm add @vanduo-oss/music-player
```

```js
import VanduoMusicPlayer from "@vanduo-oss/music-player";
import "@vanduo-oss/music-player/css";

VanduoMusicPlayer.initPlayer(el, { tracks: [{ name: "Song", url: "/song.mp3" }] });
```

Auto-init: add `data-music-player` (+ optional `data-music-player-options='{...}'`) and call `Vanduo.init()`. Vue 3 (optional peer `vue >=3.3`): `import { VdMusicPlayer } from "@vanduo-oss/music-player/vue"`.

## Architecture

- Plain JS/DOM core over an HTML5 `Audio` element; tracks are `{ name, url }`.
- Three consume paths: IIFE (`window.VanduoMusicPlayer`, self-registers as Vanduo `musicPlayer`), ESM/CJS, or the Vue component.
- One player per element; live instances tracked in `VanduoMusicPlayer.instances` (`Map<HTMLElement, instance>`).

## API

- **Init:** `initPlayer(container, options)`, `init(root?)` (auto-init), `reinit(root)` (ESM; or `Vanduo.reinit('musicPlayer')` for IIFE).
- **Playback:** `play`, `pause`, `toggle`, `next`, `previous` (all take `container`).
- **Track/volume:** `setTrack(container, index)`, `setVolume(container, 0..1)`.
- **Modes:** `shuffle(container)`, `repeat(container)` (cycles off→one→all), `setRepeat(container, mode)`.
- **Floating:** `detach`, `attach`, `setPosition(container, corner|{x,y})`; `minimize`, `expand`, `toggleMinimize`.
- **State/cleanup:** `getState(container)`, `destroy(container)`, `destroyAll()`.
- **Options:** `tracks` (req), `volume` (0.5), `shuffle`, `repeat` ('off'), `showProgress`, `showPlaylist`, `autoAdvance` (true), `glass`, `detachable`, `floatingPosition`, `draggable`, `minimizable`, `startMinimized`, `persistPosition`, `persistKey`.
- **Events** (bubble on container): `musicplayer:play|pause|ended`, `:trackchange` `{index,name,url}`, `:volumechange` `{volume}`, `:repeatchange` `{repeat}`, `:detach|attach|minimize|expand`.
- **Vue:** `<VdMusicPlayer :tracks :options @trackchange … @ready>` (emits drop the `musicplayer:` prefix); ref exposes `{ player, container() }`.
- **Exports:** default `VanduoMusicPlayer`, `reinit`, `VD_MUSIC_PLAYER_VERSION`; subpaths `./css`, `./vue`, `./iife`.

## Security

- `tracks` (incl. `url`) are caller-supplied and used as-is to create `Audio` elements — **no input sanitization**; treat untrusted track data as an injection risk and sanitize upstream.
- Floating position persists to `localStorage` (or `safeStorageGet/Set` if present), keyed by element id / `persistKey`.

## Caveats

- `vue` is an optional peer; vanilla/CDN consumers unaffected.
- SSR-safe Vue component renders on client mount; changing `tracks`/`options` recreates the player.
- Browser autoplay policy may block `play()` (wrapped in `.catch`). Requires `vanduo-music-player.css`. One player per element.

## Docs

Full documentation and live demos: https://vanduo.dev
