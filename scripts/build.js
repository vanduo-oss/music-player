import * as esbuild from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');

function resetDistDirectory() {
  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });
}

async function buildEntry(format, outfile, extra = {}) {
  const { entry = 'index.js', ...rest } = extra;
  await esbuild.build({
    entryPoints: [resolve(rootDir, 'src', entry)],
    outfile: resolve(distDir, outfile),
    bundle: true,
    format,
    target: ['es2020'],
    sourcemap: true,
    minify: false,
    logLevel: 'warning',
    ...rest
  });
}

async function build() {
  resetDistDirectory();

  await buildEntry('esm', 'index.js');
  await buildEntry('cjs', 'index.cjs');
  await buildEntry('iife', 'vanduo-music-player.iife.js', {
    globalName: 'VanduoMusicPlayer',
    footer: {
      js: `
;(function () {
  var api = VanduoMusicPlayer.VanduoMusicPlayer || VanduoMusicPlayer.default;
  if (api) {
    VanduoMusicPlayer = api;
    if (typeof window !== 'undefined') {
      window.VanduoMusicPlayer = api;
    }
  }
})();`
    }
  });

  // Optional Vue 3 bindings — `vue` stays external (peer dependency).
  await buildEntry('esm', 'vue.js', { entry: 'vue.js', external: ['vue'] });
  await buildEntry('cjs', 'vue.cjs', { entry: 'vue.js', external: ['vue'] });
  copyFileSync(
    resolve(rootDir, 'src', 'vue.d.ts'),
    resolve(distDir, 'vue.d.ts')
  );

  copyFileSync(
    resolve(rootDir, 'src', 'styles.css'),
    resolve(distDir, 'vanduo-music-player.css')
  );

  const typesSource = resolve(rootDir, 'types', 'index.d.ts');
  if (existsSync(typesSource)) {
    copyFileSync(typesSource, resolve(distDir, 'index.d.ts'));
  } else {
    console.warn('Warning: types/index.d.ts missing — TypeScript consumers need dist/index.d.ts.');
  }

  console.log('Built @vanduo-oss/music-player dist artifacts.');
}

build();
