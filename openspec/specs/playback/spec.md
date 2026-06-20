# playback Specification

## Purpose

Define HTML5 audio playback behavior: track list handling, transport controls, volume, shuffle, and programmatic state for `@vanduo-oss/music-player`.

## Requirements

### Requirement: Track list validation

The player SHALL accept a `tracks` option as an array of `{ name, url }` objects and SHALL ignore entries without a non-empty string `url`.

#### Scenario: Valid tracks are loaded

- GIVEN `initPlayer` is called with tracks `[{ name: "A", url: "/a.mp3" }]`
- WHEN initialization completes
- THEN `getState(container).tracks` includes the valid track
- AND the displayed track name reflects the first valid track

#### Scenario: Invalid tracks are filtered

- GIVEN `initPlayer` is called with tracks containing empty or missing URLs
- WHEN initialization completes
- THEN only entries with non-empty string `url` values are retained in state

### Requirement: Transport controls

The player SHALL provide `play`, `pause`, `toggle`, `next`, and `previous` methods that operate on a initialized container element.

#### Scenario: Play starts playback state

- GIVEN a player with at least one valid track
- WHEN `play(container)` is called
- THEN `getState(container).isPlaying` is true
- AND the container receives class `is-playing` when audio reports play

#### Scenario: Pause stops playback state

- GIVEN a player that is playing
- WHEN `pause(container)` is called
- THEN `getState(container).isPlaying` is false

#### Scenario: Toggle switches play and pause

- GIVEN a player that is playing
- WHEN `toggle(container)` is called
- THEN playback is paused

### Requirement: Track navigation

The player SHALL support `setTrack(container, index)`, `next(container)`, and `previous(container)` with wrap-around at list boundaries.

#### Scenario: setTrack updates index and display

- GIVEN a player with multiple tracks
- WHEN `setTrack(container, 2)` is called
- THEN `getState(container).currentIndex` is 2
- AND the track name display shows the selected track name

#### Scenario: next wraps to first track

- GIVEN a player on the last track index
- WHEN `next(container)` is called
- THEN `getState(container).currentIndex` is 0

#### Scenario: previous wraps to last track

- GIVEN a player on the first track index
- WHEN `previous(container)` is called
- THEN `getState(container).currentIndex` is the last index

### Requirement: Volume control

The player SHALL clamp volume to the range 0–1 and expose `setVolume(container, value)` and a volume range input in the UI.

#### Scenario: Initial volume from options

- GIVEN `initPlayer` with `volume: 0.8`
- WHEN initialization completes
- THEN `getState(container).volume` is 0.8

#### Scenario: setVolume clamps and updates state

- GIVEN a initialized player
- WHEN `setVolume(container, 0.3)` is called
- THEN `getState(container).volume` is 0.3

#### Scenario: Default volume

- GIVEN `initPlayer` without a volume option
- WHEN initialization completes
- THEN `getState(container).volume` is 0.5

### Requirement: Shuffle

The player SHALL support `shuffle: true` on init and a `shuffle(container)` API that toggles shuffle mode.

#### Scenario: Shuffle on init

- GIVEN `initPlayer` with `shuffle: true`
- WHEN initialization completes
- THEN `getState(container).shuffle` is true
- AND the shuffle control has `aria-pressed="true"`

#### Scenario: shuffle API toggles state

- GIVEN a player with shuffle enabled
- WHEN `shuffle(container)` is called
- THEN `getState(container).shuffle` is false

### Requirement: Repeat

The player SHALL support tri-state repeat modes (`off`, `one`, `all`) via a control-bar button, init option `repeat`, and APIs `repeat(container)` (cycle) and `setRepeat(container, mode)`.

#### Scenario: Repeat on init

- GIVEN `initPlayer` with `repeat: 'one'`
- WHEN initialization completes
- THEN `getState(container).repeat` is `'one'`
- AND the repeat control has `aria-pressed="true"` and `aria-label="Repeat one"`
- AND a badge showing `1` is visible on the repeat button

#### Scenario: repeat API cycles modes

- GIVEN a player with `repeat: 'off'`
- WHEN `repeat(container)` is called three times
- THEN modes cycle `'one'` → `'all'` → `'off'`

#### Scenario: setRepeat API sets mode

- GIVEN an initialized player
- WHEN `setRepeat(container, 'all')` is called
- THEN `getState(container).repeat` is `'all'`

#### Scenario: Repeat one restarts track

- GIVEN `repeat: 'one'`
- WHEN the current track ends
- THEN the same track restarts from the beginning
- AND `musicplayer:ended` is not dispatched

#### Scenario: Repeat all advances playlist

- GIVEN `repeat: 'all'` and multiple tracks
- WHEN the current track ends
- THEN the player advances to the next track and wraps to the first after the last

#### Scenario: Repeat all overrides autoAdvance false

- GIVEN `repeat: 'all'` and `autoAdvance: false`
- WHEN the current track ends
- THEN the player still advances to the next track

### Requirement: Auto-advance on track end

When `repeat` is `'off'` and `autoAdvance` is true (default), the player SHALL advance to the next track when the current track ends. When `repeat` is `'off'` and `autoAdvance` is false, it SHALL dispatch `musicplayer:ended` instead of advancing.

#### Scenario: Auto-advance enabled

- GIVEN `autoAdvance: true` and multiple tracks
- WHEN the current track ends
- THEN the player advances to the next track

#### Scenario: Auto-advance disabled

- GIVEN `autoAdvance: false` on the last track
- WHEN the current track ends
- THEN `musicplayer:ended` is dispatched on the container
- AND the player does not advance

### Requirement: getState shape

`getState(container)` SHALL return a `MusicPlayerState` object or `null` for unknown elements.

#### Scenario: State shape for initialized player

- GIVEN an initialized player
- WHEN `getState(container)` is called
- THEN the result includes `isPlaying`, `currentIndex`, `currentTrack`, `volume`, `shuffle`, `repeat`, `tracks`, `isDetached`, and `isMinimized`

#### Scenario: Unknown element returns null

- GIVEN an element that was never initialized
- WHEN `getState(element)` is called
- THEN the result is `null`

### Requirement: Empty track list

The player SHALL initialize without throwing when `tracks` is empty and transport methods SHALL not throw.

#### Scenario: Empty tracks init

- GIVEN `initPlayer` with `tracks: []`
- WHEN initialization completes
- THEN `data-music-player-initialized` is set
- AND `getState(container).tracks` has length 0

#### Scenario: next on empty tracks

- GIVEN a player with no tracks
- WHEN `next(container)` is called
- THEN no error is thrown
