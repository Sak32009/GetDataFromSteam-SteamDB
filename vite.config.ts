import {
  join,
} from 'node:path';
import {
  cwd,
} from 'node:process';
import type {
  UserConfigExport,
} from 'vite';
import {
  defineConfig,
} from 'vite';
import viteMetablockPlugin from './src/plugins/metablock/main';

export default defineConfig(({
  mode,
}) => {
  const isDevelopment = mode === 'development';
  const rootPath = cwd();
  const viteRoot = join(rootPath, 'src');
  const viteEntry = join(viteRoot, 'index.ts');
  const viteConfig: UserConfigExport = {
    build: {
      lib: {
        entry: viteEntry,
        fileName: () => {
          return 'sak32009-get-dlc-info-from-steamdb.user.js';
        },
        formats: [
          'cjs',
        ],
      },
      outDir: rootPath,
    },
    plugins: [
      viteMetablockPlugin(),
    ],
    root: viteRoot,
  };

  if (isDevelopment) {
    viteConfig.build!.minify = false;
  }

  return viteConfig;
});
