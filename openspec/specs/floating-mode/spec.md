# floating-mode Specification

## Purpose

Define detachable floating player behavior: corner positioning, drag, minimize/expand, and optional position persistence.

## Requirements

### Requirement: Detach and attach lifecycle

When `detachable` is true, the player SHALL support `detach(container, position?)` and `attach(container)` to move the UI between document flow and a floating overlay.

#### Scenario: Detach moves to body

- GIVEN a detachable player in document flow
- WHEN `detach(container, 'bottom-right')` is called
- THEN the container parent is `document.body`
- AND `getState(container).isDetached` is true

#### Scenario: Attach restores original parent

- GIVEN a detached player
- WHEN `attach(container)` is called
- THEN the container returns to its original parent in the document
- AND `getState(container).isDetached` is false

### Requirement: Corner position presets

Floating position SHALL support presets `bottom-left`, `bottom-right`, `top-left`, and `top-right` via `floatingPosition`, `detach`, and `setPosition`.

#### Scenario: Detach applies corner class

- GIVEN a detachable player
- WHEN `detach(container, 'top-right')` is called
- THEN the container has class `vd-music-player-floating-top-right`

#### Scenario: Invalid preset falls back

- GIVEN an invalid corner string
- WHEN normalized for positioning
- THEN the effective preset is `bottom-right`

### Requirement: Custom pixel position

While detached, `setPosition(container, { x, y })` SHALL set viewport pixel offsets via CSS custom properties.

#### Scenario: Custom coordinates

- GIVEN a detached player
- WHEN `setPosition(container, { x: 42, y: 64 })` is called
- THEN `--vd-music-player-floating-left` is `42px`
- AND `--vd-music-player-floating-top` is `64px`

### Requirement: Draggable floating player

When `draggable` is true and `detachable` is true, the player SHALL provide a drag handle while detached.

#### Scenario: Draggable requires detachable

- GIVEN `draggable: true` and `detachable: false`
- WHEN initialized
- THEN dragging is not enabled

### Requirement: Minimize and expand

When `minimizable` is true, the player SHALL support `minimize`, `expand`, and `toggleMinimize` with class `vd-music-player-minimized`.

#### Scenario: Minimize collapses UI

- GIVEN a minimizable player
- WHEN `minimize(container)` is called
- THEN the container has class `vd-music-player-minimized`

#### Scenario: Expand restores UI

- GIVEN a minimized player
- WHEN `expand(container)` is called
- THEN the container does not have class `vd-music-player-minimized`

#### Scenario: toggleMinimize toggles state

- GIVEN a minimizable player
- WHEN `toggleMinimize(container)` is called twice
- THEN minimized state toggles off then on

### Requirement: Start minimized on detach

When `startMinimized` is true, the player SHALL apply minimized state on the first detach.

#### Scenario: First detach starts minimized

- GIVEN `startMinimized: true` and `minimizable: true`
- WHEN the player is detached for the first time
- THEN the container is minimized after detach

### Requirement: Persist floating position

When `persistPosition` is true, the player SHALL save and restore floating coordinates in `localStorage` using a key derived from `persistKey` or the element id.

#### Scenario: Position saved on drag end

- GIVEN `persistPosition: true` and a detached draggable player
- WHEN the user finishes dragging
- THEN coordinates are written to `localStorage`

#### Scenario: Position restored on detach

- GIVEN stored coordinates for the persist key
- WHEN the player is detached
- THEN floating position is restored from storage when valid
