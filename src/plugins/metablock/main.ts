import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import {cwd} from 'process';
import type {ResolvedConfig} from 'vite';

const metablock = (comment: string) => {
  let config: ResolvedConfig;
  return {
    name: 'metablock',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    async writeBundle(_options: any, bundle: any) {
      for (const file of Object.entries(bundle)) {
        const root = config.root || cwd();
        const outDir = config.build.outDir || 'dist';
        const fileName = file[0];
        const filePath = resolve(root, outDir, fileName);
        if (fileName.endsWith('.js')) {
          try {
            const data = readFileSync(filePath, {
              encoding: 'utf8',
            });
            writeFileSync(filePath, `${comment}\n${data}`);
          } catch (error: unknown) {
            console.log(error);
          }
        }
      }
    },
  };
};

export default metablock;
