import {join} from 'node:path';
import {cwd} from 'node:process';
import {defineConfig, UserConfigExport} from 'vite';
import viteMetablockPlugin from './src/plugins/metablock/main.js';
import {name as packageName} from './package.json';

export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  const rootPath = cwd();
  const viteRoot = join(rootPath, 'src');
  const viteEntry = join(viteRoot, 'index.ts');
  const viteConfig: UserConfigExport = {
    root: viteRoot,
    plugins: [viteMetablockPlugin()],
    build: {
      target: 'esnext',
      outDir: rootPath,
      lib: {
        entry: viteEntry,
        name: packageName.replace(/-/gm, '_'),
        formats: ['umd'],
        fileName: () => 'sak32009-get-dlc-info-from-steamdb.user.js',
      },
      // Doesn't create a separate stylesheet file
      cssCodeSplit: true,
    },
  };

  if (isDev) {
    viteConfig.build!.minify = false;
  }

  return viteConfig;
});
