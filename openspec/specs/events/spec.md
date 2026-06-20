# events Specification

## Purpose

Define bubbling custom events dispatched on the player container for playback, UI, and floating-mode changes.

## Requirements

### Requirement: Event bubbling

All music player custom events SHALL bubble from the player container element.

#### Scenario: Track change bubbles

- GIVEN an initialized player with multiple tracks
- WHEN the next control advances the track
- THEN a `musicplayer:trackchange` event reaches listeners on the container

### Requirement: Playback events

The player SHALL dispatch `musicplayer:play` and `musicplayer:pause` when playback starts and stops.

#### Scenario: Play event on audio play

- GIVEN an initialized player
- WHEN the underlying audio element fires `play`
- THEN `musicplayer:play` is dispatched on the container
- AND `getState(container).isPlaying` is true

#### Scenario: Pause event on audio pause

- GIVEN a playing player
- WHEN the underlying audio element fires `pause`
- THEN `musicplayer:pause` is dispatched on the container
- AND `getState(container).isPlaying` is false

### Requirement: Track change event

The player SHALL dispatch `musicplayer:trackchange` with detail `{ index, name, url }` when the active track changes.

#### Scenario: Track change detail

- GIVEN a player with multiple tracks
- WHEN the track advances via next control
- THEN `musicplayer:trackchange` detail matches `{ index, name, url }` for the new track

### Requirement: Volume change event

The player SHALL dispatch `musicplayer:volumechange` with detail `{ volume }` when volume changes.

#### Scenario: setVolume dispatches event

- GIVEN an initialized player
- WHEN `setVolume(container, 0.7)` is called
- THEN `musicplayer:volumechange` detail has `volume` approximately 0.7

### Requirement: Ended event

When `repeat` is `'off'` and `autoAdvance` is false, the player SHALL dispatch `musicplayer:ended` when playback stops at track end without advancing.

#### Scenario: Ended without auto-advance

- GIVEN `repeat: 'off'` and `autoAdvance: false` on the final track
- WHEN playback ends
- THEN `musicplayer:ended` is dispatched on the container

#### Scenario: Ended not fired in repeat modes

- GIVEN `repeat` is `'one'` or `'all'`
- WHEN the current track ends naturally
- THEN `musicplayer:ended` is not dispatched

### Requirement: Repeat change event

The player SHALL dispatch `musicplayer:repeatchange` with detail `{ repeat }` when repeat mode changes via the UI or API.

#### Scenario: Repeat change detail

- GIVEN an initialized player
- WHEN repeat mode changes to `'all'`
- THEN `musicplayer:repeatchange` detail has `repeat: 'all'`

### Requirement: Floating mode events

The player SHALL dispatch `musicplayer:detach`, `musicplayer:attach`, `musicplayer:minimize`, and `musicplayer:expand` for floating UI transitions.

#### Scenario: Detach event

- GIVEN a detachable player
- WHEN `detach(container)` completes
- THEN `musicplayer:detach` is dispatched

#### Scenario: Attach event

- GIVEN a detached player
- WHEN `attach(container)` completes
- THEN `musicplayer:attach` is dispatched

#### Scenario: Minimize event

- GIVEN a minimizable player
- WHEN `minimize(container)` is called
- THEN `musicplayer:minimize` is dispatched

#### Scenario: Expand event

- GIVEN a minimized player
- WHEN `expand(container)` is called
- THEN `musicplayer:expand` is dispatched
