# player-ui Specification

## Purpose

Define optional UI surfaces (progress, playlist, glass styling) and accessibility requirements for the music player container and controls.

## Requirements

### Requirement: Container accessibility

Every initialized player container SHALL expose landmark and live-region semantics for assistive technology.

#### Scenario: Region role and label

- GIVEN a player initialized via `init` or `initPlayer`
- WHEN the container is inspected
- THEN it has `role="region"`
- AND `aria-label` is `"Music Player"`

#### Scenario: Track name live region

- GIVEN an initialized player
- WHEN the track name element is inspected
- THEN it has `aria-live="polite"`

#### Scenario: Transport button labels

- GIVEN an initialized player
- WHEN the play button is inspected
- THEN it has an `aria-label` matching play/pause intent

### Requirement: Optional progress bar

When `showProgress` is true, the player SHALL render a seekable progress control with elapsed and duration display.

#### Scenario: Progress visible when enabled

- GIVEN `showProgress: true`
- WHEN initialization completes
- THEN `.vd-music-player-progress` is present in the container

#### Scenario: Progress hidden when disabled

- GIVEN `showProgress: false` (default)
- WHEN initialization completes
- THEN `.vd-music-player-progress` is not attached

#### Scenario: Progress input accessibility

- GIVEN `showProgress: true`
- WHEN the progress range input is inspected
- THEN it has `type="range"`
- AND an `aria-label` describing seek or progress

### Requirement: Optional playlist panel

When `showPlaylist` is true, the player SHALL render a collapsible playlist with one item per track.

#### Scenario: Playlist panel rendered

- GIVEN `showPlaylist: true`
- WHEN initialization completes
- THEN `.vd-music-player-playlist` is attached
- AND a playlist toggle button is visible

#### Scenario: Playlist closed by default

- GIVEN `showPlaylist: true`
- WHEN initialization completes
- THEN the playlist panel does not have class `is-open`

#### Scenario: Toggle opens and closes playlist

- GIVEN `showPlaylist: true`
- WHEN the playlist toggle is clicked twice
- THEN the panel has class `is-open` after the first click
- AND does not have class `is-open` after the second click

#### Scenario: Playlist item selects track

- GIVEN an open playlist with multiple tracks
- WHEN a playlist item is clicked
- THEN the active track name updates to the selected track

#### Scenario: Playlist hidden when disabled

- GIVEN `showPlaylist: false`
- WHEN initialization completes
- THEN `.vd-music-player-playlist` is not attached

### Requirement: Glass surface styling

When `glass` is true, the player container SHALL include the glass surface class.

#### Scenario: Glass class applied

- GIVEN `glass: true`
- WHEN initialization completes
- THEN the container has class `vd-music-player-glass`

### Requirement: Volume slider UI

The player SHALL render a volume range input for user adjustment.

#### Scenario: Volume slider present

- GIVEN an initialized player
- WHEN the volume control is inspected
- THEN `.vd-music-player-volume-slider` is visible with `type="range"`
