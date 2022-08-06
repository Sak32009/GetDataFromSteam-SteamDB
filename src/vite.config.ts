import type { UserConfigExport } from 'vite'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vite'
import viteMetablockPlugin from './plugins/metablock/main'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'
  const rootPath = cwd()
  const viteRoot = join(rootPath, 'src')
  const viteEntry = join(viteRoot, 'index.ts')
  const viteOutDirectory = join(rootPath, isDevelopment ? 'debug' : 'dist')
  const viteConfig: UserConfigExport = {
    root: viteRoot,
    plugins: [viteMetablockPlugin()],
    build: {
      outDir: viteOutDirectory,
      emptyOutDir: true,
      lib: {
        entry: viteEntry,
        fileName: () => 'sak32009-get-data-from-steam-steamdb.user.js',
        formats: ['es']
      }
    }
  }

  if (isDevelopment) {
    viteConfig.build = {
      ...viteConfig.build,
      minify: false
    }
  }

  return viteConfig
})
