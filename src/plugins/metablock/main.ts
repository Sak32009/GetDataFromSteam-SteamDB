import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {Plugin} from 'vite';
import metablock from '../../metablock.js';

const plugin = (): Plugin => {
  let outDir: string;
  return {
    name: 'metablock',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    writeBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.endsWith('.js')) {
          const filePath = join(outDir, fileName);
          const data = readFileSync(filePath, {
            encoding: 'utf8',
          });
          const code = `${metablock}\n${data}`;
          writeFileSync(filePath, code);
        }
      }
    },
  };
};

export default plugin;
