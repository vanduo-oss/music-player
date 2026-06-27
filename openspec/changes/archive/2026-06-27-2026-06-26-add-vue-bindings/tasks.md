## 1. OpenSpec

- [x] 1.1 Add `specs/vue-bindings/spec.md` baseline capability
- [x] 1.2 Extend `specs/package-integration/spec.md` with the `./vue` subpath
- [x] 1.3 Add this change (proposal, tasks, design, spec deltas)

## 2. Vue bindings

- [x] 2.1 `src/vue.js` — `VdMusicPlayer` component; SSR-safe; recreate on tracks/options change; forward `musicplayer:*` events; `destroy()` on unmount
- [x] 2.2 `src/vue.d.ts` — typed `VdMusicPlayerProps`; copied to `dist/vue.d.ts` by the build

## 3. Build & package

- [x] 3.1 `scripts/build.js` — esbuild esm + cjs vue entry with `vue` external
- [x] 3.2 `package.json` — `./vue` export, optional `vue` peer, `vue` devDep, version `1.1.0`
- [x] 3.3 `CHANGELOG.md` — 1.1.0 entry
- [x] 3.4 `pnpm build` produces `dist/vue.js`, `dist/vue.cjs`, `dist/vue.d.ts`

## 4. Verify & ship

- [x] 4.1 vd2 consumes `@vanduo-oss/music-player/vue`: `vue-tsc` clean, vitest + Playwright pass
- [ ] 4.2 Publish `@vanduo-oss/music-player@1.1.0`, then pin vd2 to `^1.1.0` (replace `file:../music-player`)
- [ ] 4.3 `openspec archive 2026-06-26-add-vue-bindings` after publish
