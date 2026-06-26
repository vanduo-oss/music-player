## Context

Vanduo ecosystem packages are intentionally framework-agnostic. Adding Vue support must not compromise that for vanilla/CDN users.

## Decision

Ship Vue bindings as a separate `./vue` subpath:

- `vue` is an OPTIONAL peer (`peerDependenciesMeta.vue.optional`) and `external` in esbuild, so installing or building the core never pulls Vue.
- The component is a thin wrapper around the existing API object: it renders a `<div class="vd-music-player">` the server can pre-render, then calls `MusicPlayer.initPlayer(el, { tracks, ...options })` in `onMounted`. The player's bubbling `musicplayer:*` CustomEvents are translated to Vue emits via container listeners; `tracks`/`options` changes recreate the player; `MusicPlayer.destroy(el)` runs on unmount.

## Build output impact

esbuild gains two entries — `dist/vue.js` (ESM) and `dist/vue.cjs` (CJS) — both with `external: ['vue']`; `src/vue.d.ts` is copied to `dist/vue.d.ts`. The existing `index.*`, IIFE, CSS, and `dist/index.d.ts` outputs are unchanged.

## Alternatives considered

- **vd2-only wrapper (no package change):** rejected — every Vue consumer would reinvent the wiring, and the docs would not demonstrate real installation.
- **Vue as a hard dependency:** rejected — would couple the framework-agnostic core to Vue.
