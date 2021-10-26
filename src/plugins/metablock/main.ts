import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import type {Plugin} from 'vite';
import metablock from '../../metablock';

const plugin = (): Plugin => {
  let outDir: string;
  return {
    name: 'metablock',
    async configResolved(config) {
      outDir = config.build.outDir;
    },
    async writeBundle(_options, bundle) {
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
