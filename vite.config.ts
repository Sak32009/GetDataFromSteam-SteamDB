import { join } from 'path';
import { defineConfig } from 'vite';
import viteMetablockPlugins from './src/plugins/metablock/main';
import metablock from './src/metablock';
import { name as packageName } from './package.json';

export default defineConfig(({ command, mode }) => {
  const isDev = mode === 'development';
  const rootPath = process.cwd();
  const viteRoot = join(rootPath, 'src');
  const viteEntry = join(viteRoot, 'index.ts');
  return {
    root: viteRoot,
    plugins: [viteMetablockPlugins(metablock)],
    build: {
      outDir: rootPath,
      minify: isDev ? false : 'terser',
      lib: {
        entry: viteEntry,
        name: packageName,
        formats: ['iife'],
        fileName: () => 'sak32009-get-dlc-info-from-steamdb.user.js',
      },
    },
  };
});
