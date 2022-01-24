import mri from 'mri'
import { defaults } from 'lodash'

import { compile } from './compile'
import { getMergedConfig } from './config'
import { findPackages } from './findPackages'

const argv = defaults(mri(process.argv.slice(2)), {
  mode: 'development'
})

async function run() {
  const packages = await findPackages({
    include: argv._,
    exclude: argv.exclude,
    showPrivate: argv.showPrivate
  })

  for (const pkg of packages) {
    const { configs } = await getMergedConfig(pkg, argv)

    console.groupCollapsed(`[${pkg.name}] Compiling...`)
    await Promise.all(configs.map(compile))
    console.groupEnd()
  }
}

run()
