import type { UserConfigExport } from 'vite';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { defineConfig } from 'vite';
import viteMonkeyPlugin, { cdn as viteMonkeyCDNPlugin } from 'vite-plugin-monkey';
import { name as pkgName, productName as pkgProductName } from '../package.json';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const rootPath = cwd();
  const viteRoot = join(rootPath, 'src');
  const viteEntry = join(viteRoot, 'main.ts');
  const viteOutDirectory = join(rootPath, isDevelopment ? 'debug' : 'dist');
  const viteOutName = 'sak32009-get-data-from-steam-steamdb.user.js';
  const viteConfig: UserConfigExport = {
    root: viteRoot,
    plugins: [
      viteMonkeyPlugin({
        entry: viteEntry,
        userscript: {
          name: pkgProductName,
          namespace: pkgName,
          icon: 'https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/src/images/icon.png',
          updateURL: `https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/${viteOutName}`,
          downloadURL: `https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/${viteOutName}`,
          match: ['*://steamdb.info/app/*', '*://steamdb.info/depot/*', '*://store.steampowered.com/app/*'],
        },
        build: {
          fileName: viteOutName,
          externalGlobals: {
            jquery: viteMonkeyCDNPlugin.cdnjs('jquery', 'jquery.min.js'),
            bootstrap: viteMonkeyCDNPlugin.cdnjs('bootstrap', 'js/bootstrap.bundle.min.js'),
            'crypto-js': viteMonkeyCDNPlugin.cdnjs('crypto-js', 'crypto-js.min.js'),
          },
        },
      }),
    ],
    build: {
      outDir: viteOutDirectory,
      emptyOutDir: true,
      minify: true,
    },
  };

  if (isDevelopment) {
    viteConfig.build = {
      ...viteConfig.build,
      minify: false,
    };
  }

  return viteConfig;
});
