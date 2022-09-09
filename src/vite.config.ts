import type { UserConfigExport } from 'vite';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { defineConfig } from 'vite';
import viteMonkeyPlugin, { cdn as viteMonkeyCDNPlugin } from 'vite-plugin-monkey';
import { name as pkgName, productName as pkgProductName } from '../package.json';

export default defineConfig(() => {
  const rootPath = cwd();
  const viteRoot = join(rootPath, 'src');
  const viteEntry = join(viteRoot, 'main.ts');
  const viteOutDirectory = join(rootPath, 'dist');
  const usFileName = 'sak32009-get-data-from-steam-steamdb.user.js';
  const usFileMetaName = usFileName.replace('.user.js', '.meta.js');
  const viteConfig: UserConfigExport = {
    root: viteRoot,
    resolve: {
      alias: {
        $: '../node_modules/vite-plugin-monkey/dist/client',
      },
    },
    plugins: [
      viteMonkeyPlugin({
        entry: viteEntry,
        userscript: {
          name: pkgProductName,
          namespace: pkgName,
          icon: 'https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/src/images/icon.png',
          updateURL: `https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/${usFileName}`,
          downloadURL: `https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/${usFileMetaName}`,
          match: ['*://steamdb.info/app/*', '*://steamdb.info/depot/*', '*://store.steampowered.com/app/*'],
          grant: ['unsafeWindow'],
          require: ['https://cdnjs.cloudflare.com/ajax/libs/core-js/3.25.1/minified.min.js'],
        },
        build: {
          fileName: usFileName,
          metaFileName: true,
          externalGlobals: {
            jquery: viteMonkeyCDNPlugin.cdnjs('$', 'jquery.min.js'),
            bootstrap: viteMonkeyCDNPlugin.cdnjs('bootstrap', 'js/bootstrap.bundle.min.js'),
            'crypto-js': viteMonkeyCDNPlugin.cdnjs('CryptoJS', 'crypto-js.min.js'),
          },
          autoGrant: false,
        },
      }),
    ],
    build: {
      outDir: viteOutDirectory,
      emptyOutDir: true,
    },
  };
  return viteConfig;
});
