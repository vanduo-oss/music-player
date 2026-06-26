# vue-bindings

## ADDED Requirements

### Requirement: VdMusicPlayer component

`@vanduo-oss/music-player/vue` SHALL export a `VdMusicPlayer` component with props `tracks` (`[{ name, url }]`) and `options` (player options).

#### Scenario: Render a player

- GIVEN `<VdMusicPlayer :tracks="tracks" />`
- WHEN mounted in a Vue 3 application
- THEN a player SHALL initialize into the component's `.vd-music-player` container

### Requirement: Forwarded events

The component SHALL forward the player's bubbling `musicplayer:*` events as Vue events: `play`, `pause`, `trackchange`, `volumechange`, `repeatchange`, `ended`, `detach`, `attach`, `minimize`, `expand`. It SHALL also emit `ready` with the container element.

#### Scenario: Track change

- GIVEN `<VdMusicPlayer @trackchange="onTrack" />`
- WHEN the active track changes
- THEN `onTrack` SHALL receive the event detail `{ index, name, url }`

### Requirement: Reactive recreation

When `tracks` or `options` change, the component SHALL destroy and recreate the player.

#### Scenario: New playlist

- GIVEN a mounted player
- WHEN the `tracks` prop changes
- THEN the player SHALL reinitialize with the new playlist

### Requirement: SSR safety

The component SHALL render a plain `.vd-music-player` container during SSR and create the player only after mount on the client; it SHALL destroy the player on unmount.

#### Scenario: Server render

- GIVEN server-side rendering with no DOM
- WHEN `VdMusicPlayer` renders
- THEN it SHALL output an empty `<div class="vd-music-player">` without creating a player or an `Audio` element

#### Scenario: Unmount cleanup

- GIVEN a mounted player
- WHEN the component unmounts
- THEN the player SHALL be destroyed and its event listeners removed

### Requirement: Vue is an optional peer

`vue` SHALL be declared as an optional peer dependency (`peerDependenciesMeta.vue.optional`) and marked external in the build, never bundled into the package.

#### Scenario: Build externalizes vue

- GIVEN the built `dist/vue.js`
- THEN it SHALL import `vue` at runtime rather than bundle it
