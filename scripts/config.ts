import { resolve } from 'path'
import { existsSync } from 'fs'

import { builtinModules } from 'module'

import { cosmiconfig } from 'cosmiconfig'
import TsLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'

import type { BuildOptions, Format } from 'esbuild'

import { pick } from 'lodash'

const moduleName = 'build'
const explorer = cosmiconfig(moduleName, {
  searchPlaces: [
    'package.json',
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.yaml`,
    `.${moduleName}rc.yml`,
    `.${moduleName}rc.ts`,
    `.${moduleName}rc.js`,
    `${moduleName}.config.ts`,
    `${moduleName}.config.js`
  ],
  loaders: {
    '.ts': TsLoader
  }
})

export async function getUserConfig(cwd, options) {
  const result = await explorer.search(cwd)
  const userConfig = result ? result.config : {}

  if (typeof userConfig === 'function') {
    return userConfig(cwd, options)
  }

  return userConfig
}

export async function getMergedConfig(pkg, opts = {}) {
  const cwd = pkg['location']

  const userConfig = await getUserConfig(cwd, {
    mode: opts['mode'] || 'development'
  })

  // tsconfig.json 文件路径
  const tsconfigFilePath = resolve(
    cwd,
    opts['tsconfig'] || userConfig['tsconfig'] || 'tsconfig.json'
  )

  const isTs = existsSync(tsconfigFilePath)

  const root = userConfig['root'] || cwd
  const mode = opts['mode'] || userConfig['mode'] || 'development'

  const charset = opts['charset'] || userConfig['charset']
  const outdir = opts['outdir'] || userConfig['outdir'] || 'dist'

  const extraOptions = pick(userConfig, [
    'globalName',
    'entryNames',
    'define',
    'outExtension',
    'minify'
  ])

  const commonPlugins = userConfig['plugins'] || []

  const entryPoints = opts['entryPoints'] ||
    userConfig['entryPoints'] || [`src/index.${isTs ? 'ts' : 'js'}`]

  const defaultsOptions: BuildOptions = {
    ...userConfig['esbuild'],
    ...extraOptions,
    absWorkingDir: root,
    charset: charset ?? 'utf8',
    target: opts['target'] || userConfig['target'],
    entryPoints: entryPoints.map(p => resolve(cwd, p)),
    outdir: outdir,
    sourcemap: opts['sourcemap'] || userConfig['sourcemap'],
    tsconfig: tsconfigFilePath,
    write: true,
    bundle: true,
    watch: mode === 'development' || opts['watch'] || userConfig['watch'],
    external: userConfig['external'] || getPackagesDeps(pkg)
  }

  const configs: BuildOptions[] = []

  const formats: (Format | (Partial<BuildOptions> & { type: Format }))[] = opts[
    'formats'
  ] ||
    userConfig['formats'] || ['esm', 'cjs']

  // TODO Merged plugins
  for (const format of formats) {
    if (typeof format === 'string') {
      configs.push({ ...defaultsOptions, format, plugins: commonPlugins })
    } else {
      const { type, plugins = [], ...otherOptions } = format
      configs.push({
        ...defaultsOptions,
        ...otherOptions,
        format: type,
        plugins: commonPlugins.concat(plugins)
      })
    }
  }

  return {
    root,
    mode,
    configs
  }
}

function getPackagesDeps(pkg) {
  const deps = Array.from(
    new Set(
      [
        Object.keys(pkg.dependencies || {}),
        Object.keys(pkg.peerDependencies || {}),
        Object.keys(pkg.optionalDependencies || {}),
        Object.keys(pkg.devDependencies || {})
      ].flat()
    )
  )
  return deps.concat(builtinModules)
}
