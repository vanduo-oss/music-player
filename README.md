# @vanduo-oss/music-player

version: 1.1.0

Standalone HTML5 audio player with transport controls, volume, optional shuffle and repeat modes, seek bar, playlist, glass surface, and detachable floating mode.

## Usage

```html
<link rel="stylesheet" href="/path/to/vanduo.min.css">
<link rel="stylesheet" href="/path/to/vanduo-music-player.css">

<div id="my-player" class="vd-music-player" data-music-player></div>

<script src="/path/to/vanduo.min.js"></script>
<script src="/path/to/vanduo-music-player.iife.js"></script>
<script>
  Vanduo.init();
  VanduoMusicPlayer.initPlayer(document.getElementById('my-player'), {
    tracks: [
      { name: 'Track 1', url: '/audio/track-1.mp3' },
      { name: 'Track 2', url: '/audio/track-2.mp3' }
    ],
    showProgress: true,
    showPlaylist: true,
    glass: true
  });
</script>
```

### ESM

```js
import VanduoMusicPlayer from '@vanduo-oss/music-player';
import '@vanduo-oss/music-player/css';

VanduoMusicPlayer.initPlayer(el, { tracks });
```

## Vanduo auto-init

When loaded after `vanduo.min.js`, the player registers as `musicPlayer` and initializes with `Vanduo.init()`:

```html
<div class="vd-music-player" data-music-player
  data-music-player-options='{"tracks":[{"name":"Song","url":"/song.mp3"}],"showProgress":true}'>
</div>
```

After dynamic DOM updates, re-run scoped init:

```js
import { reinit } from '@vanduo-oss/music-player';

reinit(document.getElementById('app'));
// or Vanduo.reinit('musicPlayer') when using the IIFE after Vanduo.init()
```

## Vue 3

Optional Vue 3 bindings ship at `@vanduo-oss/music-player/vue`. `vue` is an *optional* peer dependency — needed only when you import this subpath, so vanilla/CDN consumers are unaffected. The component is SSR-safe (the player is created on mount) and the bubbling `musicplayer:*` events are forwarded as Vue emits.

```vue
<script setup>
import { VdMusicPlayer } from '@vanduo-oss/music-player/vue';
import '@vanduo-oss/music-player/css';

const tracks = [
  { name: 'Track 1', url: '/audio/track-1.mp3' },
  { name: 'Track 2', url: '/audio/track-2.mp3' }
];
</script>

<template>
  <VdMusicPlayer
    :tracks="tracks"
    :options="{ showProgress: true, showPlaylist: true, glass: true }"
    @trackchange="onTrack"
  />
</template>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `tracks` | `{ name, url }[]` | `[]` | Playlist. |
| `options` | `object` | `{}` | Any player option (see **Options** below). |

Emits mirror the custom events without the `musicplayer:` prefix — `play`, `pause`, `trackchange`, `volumechange`, `repeatchange`, `ended`, `detach`, `attach`, `minimize`, `expand` — plus `ready` (fired with the container on mount). Changing `tracks` or `options` recreates the player. The component exposes `{ player, container() }` via template ref. Types ship with the subpath (`dist/vue.d.ts`).

## Version and registry

| Export | Description |
|--------|-------------|
| `VD_MUSIC_PLAYER_VERSION` | Package version string (also in ESM/CJS builds) |
| `VanduoMusicPlayer.version` | Same version on the runtime API object |
| `VanduoMusicPlayer.instances` | `Map<HTMLElement, instance>` of live players |
| `VanduoMusicPlayer.defaults` | Default option values merged at `initPlayer` |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tracks` | Array | `[]` | `{ name, url }` track list |
| `volume` | number | `0.5` | Initial volume 0–1 |
| `shuffle` | boolean | `false` | Shuffle on init |
| `repeat` | `'off' \| 'one' \| 'all'` | `'off'` | Repeat mode on init |
| `showProgress` | boolean | `false` | Seek bar + elapsed/duration |
| `showPlaylist` | boolean | `false` | Collapsible playlist |
| `autoAdvance` | boolean | `true` | Play next track on end |
| `glass` | boolean | `false` | Frosted glass surface |
| `detachable` | boolean | `false` | Float above page when detached |
| `floatingPosition` | string | `'bottom-right'` | `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `draggable` | boolean | `false` | Drag handle when detached |
| `minimizable` | boolean | `false` | Minimize/expand control |
| `startMinimized` | boolean | `false` | Start minimized on first detach |
| `persistPosition` | boolean | `false` | Save floating position |
| `persistKey` | string | `''` | Storage key suffix |

## API

`play`, `pause`, `toggle`, `next`, `previous`, `setVolume`, `setTrack`, `shuffle`, `repeat`, `setRepeat`, `detach`, `attach`, `minimize`, `expand`, `toggleMinimize`, `setPosition`, `getState`, `destroy`, `destroyAll`, `init`, `initPlayer`.

`setPosition(el, corner)` accepts any corner preset or `{ x, y }` viewport pixels while detached.

## Custom events

All events bubble on the player container:

| Event | `detail` |
|-------|----------|
| `musicplayer:play` | — |
| `musicplayer:pause` | — |
| `musicplayer:trackchange` | `{ index, name, url }` |
| `musicplayer:volumechange` | `{ volume }` |
| `musicplayer:repeatchange` | `{ repeat: 'off' \| 'one' \| 'all' }` |
| `musicplayer:ended` | — (when `repeat: 'off'` and `autoAdvance: false`) |
| `musicplayer:detach` | — |
| `musicplayer:attach` | — |
| `musicplayer:minimize` | — |
| `musicplayer:expand` | — |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the monorepo ↔ standalone repo workflow, npm publish steps, and the OpenSpec (`/opsx:propose` → `/opsx:apply` → `/opsx:archive`) workflow.

## License

MIT
