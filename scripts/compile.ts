import { build } from 'esbuild'
import type { BuildOptions } from 'esbuild'

export async function compile(options: BuildOptions) {
  const { warnings, errors } = await build(options)

  if (warnings.length > 0) {
    console.warn(warnings)
  }

  if (errors.length > 0) {
    console.error(errors)
  }

  if (options['watch']) {
    console.log('监听文件变化', options['format'])
  }
}
