import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import type { ResolvedConfig } from 'vite';

const metablock = (comment: string): any => {
  let config: ResolvedConfig;
  return {
    name: 'metablock',
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    async writeBundle(options: any, bundle: any) {
      for (const file of Object.entries(bundle)) {
        const root = config.root || process.cwd();
        const outDir = config.build.outDir || 'dist';
        const fileName = file[0];
        const filePath = resolve(root, outDir, fileName);
        try {
          let data = readFileSync(filePath, {
            encoding: 'utf8',
          });
          writeFileSync(filePath, `${comment}\n${data}`);
        } catch (e) {
          console.log(e);
        }
      }
    },
  };
};

export default metablock;
