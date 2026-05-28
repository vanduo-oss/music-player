# lifecycle Specification

## Purpose

Define player initialization, instance registry, teardown, and version metadata for the public runtime API.

## Requirements

### Requirement: Scoped initialization

`init(root?)` SHALL find elements matching `[data-music-player]` within the normalized root (default `document`) and initialize each via `initPlayer`.

#### Scenario: Data attribute auto-init

- GIVEN a element with `data-music-player` and valid options
- WHEN `init()` runs
- THEN `data-music-player-initialized="true"` is set on the element

#### Scenario: reinit scoped root

- GIVEN dynamically inserted `[data-music-player]` nodes
- WHEN `reinit(root)` is called
- THEN only matching elements within `root` are initialized

### Requirement: initPlayer registration

`initPlayer(container, options?)` SHALL merge options with `VanduoMusicPlayer.defaults`, build the player DOM, and register the instance in `VanduoMusicPlayer.instances`.

#### Scenario: Instance map entry

- GIVEN a container element
- WHEN `initPlayer(container, options)` completes
- THEN `VanduoMusicPlayer.instances.has(container)` is true

#### Scenario: Defaults merge

- GIVEN partial options
- WHEN `initPlayer` runs
- THEN unspecified options use values from `VanduoMusicPlayer.defaults`

### Requirement: Destroy lifecycle

`destroy(container)` SHALL remove the instance, tear down DOM and audio, and clear initialization markers. `destroyAll()` SHALL destroy every registered instance.

#### Scenario: destroy removes instance

- GIVEN an initialized player
- WHEN `destroy(container)` is called
- THEN `VanduoMusicPlayer.instances.has(container)` is false
- AND `data-music-player-initialized` is removed

#### Scenario: destroyAll clears registry

- GIVEN multiple initialized players
- WHEN `destroyAll()` is called
- THEN `VanduoMusicPlayer.instances.size` is 0

### Requirement: Version constants

The package SHALL expose the release version via `VD_MUSIC_PLAYER_VERSION`, `VanduoMusicPlayer.version`, and built artifacts.

#### Scenario: Version matches package

- GIVEN package version `0.0.1`
- WHEN the module is loaded
- THEN `VD_MUSIC_PLAYER_VERSION` and `VanduoMusicPlayer.version` are `"0.0.1"`

### Requirement: Public defaults and instances

`VanduoMusicPlayer.defaults` SHALL expose default option values. `VanduoMusicPlayer.instances` SHALL be a `Map` from container elements to internal instance state.

#### Scenario: Defaults object shape

- GIVEN the runtime API
- WHEN `VanduoMusicPlayer.defaults` is read
- THEN it includes default values for `tracks`, `volume`, `shuffle`, `showProgress`, `showPlaylist`, `autoAdvance`, `glass`, `detachable`, `draggable`, `minimizable`, `startMinimized`, `persistPosition`, `persistKey`, and `floatingPosition`
