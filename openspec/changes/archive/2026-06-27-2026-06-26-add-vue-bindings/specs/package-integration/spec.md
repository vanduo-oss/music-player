# package-integration

## ADDED Requirements

### Requirement: Optional Vue subpath

The package SHALL expose `@vanduo-oss/music-player/vue` (`dist/vue.js`, `dist/vue.cjs`, types `dist/vue.d.ts`) with `vue` declared as an OPTIONAL peer dependency, so vanilla consumers are unaffected. Behaviour is defined by the `vue-bindings` capability.

#### Scenario: Vue consumer

- GIVEN a Vue 3 application
- WHEN importing `{ VdMusicPlayer }` from `@vanduo-oss/music-player/vue`
- THEN the component is available and `vue` resolves from the host application

#### Scenario: Vanilla consumer unaffected

- GIVEN a non-Vue consumer importing only `@vanduo-oss/music-player`
- THEN `vue` is NOT required to install or build the package
