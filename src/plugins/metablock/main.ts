import type { Plugin } from 'vite'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import metablock from '../../metablock'

const plugin = (): Plugin => {
  let outDirectory = ''
  return {
    name: 'metablock',
    configResolved(config) {
      outDirectory = config.build.outDir
    },
    writeBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.endsWith('.js')) {
          const filePath = join(outDirectory, fileName)
          const data = readFileSync(filePath, { encoding: 'utf8' })
          const code = `${metablock}\n${data}`
          writeFileSync(filePath, code)
        }
      }
    }
  }
}

export default plugin
