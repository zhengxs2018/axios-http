import { AxiosStatic, AxiosInstance } from 'axios'

import type { PluginFunction, PluginObject } from '@zhengxs/axios-types'

import type { ClientExport } from '../types'

export interface PluginManager {
  installedPlugins: (PluginFunction | PluginObject)[]
  use(plugin: PluginFunction | PluginObject, ...args: any[]): void
}

export function setupPluginManager<T = ClientExport>(
  axiosInstance: AxiosStatic | AxiosInstance,
  clientExport: T
): T & PluginManager {
  const installedPlugins: (PluginFunction | PluginObject)[] = []

  return Object.assign(clientExport, {
    installedPlugins,
    use(plugin, ...args) {
      if (installedPlugins.indexOf(plugin) > -1) return
      installedPlugins.push(plugin)

      if (typeof plugin === 'function') {
        plugin(axiosInstance, ...args)
      } else {
        plugin.install(axiosInstance, ...args)
      }
    }
  })
}
