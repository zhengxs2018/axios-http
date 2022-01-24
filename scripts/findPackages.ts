import path from 'path'

import { getPackages } from '@lerna/project'
import { filterPackages } from '@lerna/filter-packages'

export type Package = {
  name: string
  location: string
}

export type FindPackagesOptions = {
  include?: string[]
  exclude?: string[]
  showPrivate?: boolean
  continueIfNoMatch?: boolean
}

export async function findPackages(
  options: FindPackagesOptions = {}
): Promise<Package[]> {
  const packages = await getPackages(path.dirname(__dirname))
  const { include, exclude, showPrivate = false, continueIfNoMatch } = options
  return filterPackages(
    packages,
    include,
    ['@zhengxs/axios-types'].concat(exclude || []),
    showPrivate,
    continueIfNoMatch
  )
}
