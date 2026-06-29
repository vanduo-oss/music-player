# @vanduo-oss/music-player

[![npm](https://img.shields.io/npm/v/@vanduo-oss/music-player.svg)](https://www.npmjs.com/package/@vanduo-oss/music-player)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> Standalone HTML5 audio player for the [Vanduo](https://vanduo.dev) design system.

Transport controls, volume, optional shuffle and repeat, seek bar, playlist, frosted-glass surface, and a detachable floating mode. Framework-agnostic, with an optional Vue 3 component.

## Install

```sh
pnpm add @vanduo-oss/music-player
```

## Quick start

```js
import VanduoMusicPlayer from "@vanduo-oss/music-player";
import "@vanduo-oss/music-player/css";

VanduoMusicPlayer.initPlayer(document.getElementById("player"), {
  tracks: [
    { name: "Track 1", url: "/audio/track-1.mp3" },
    { name: "Track 2", url: "/audio/track-2.mp3" },
  ],
  showProgress: true,
  showPlaylist: true,
});
```

Auto-init: add `data-music-player` and call `Vanduo.init()`. Vue 3 (optional peer):

```vue
<VdMusicPlayer :tracks="tracks" :options="{ glass: true }" @trackchange="onTrack" />
```

## Documentation

- Docs & live demos — https://vanduo.dev
- Agent / LLM reference (full API, options, events) — [SKILL.md](./SKILL.md)
- Changelog — [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT](./LICENSE) © Vanduo
