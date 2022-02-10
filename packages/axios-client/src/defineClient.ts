import Axios, { AxiosRequestConfig } from 'axios'

import { setupHelpers, ClientHelpers } from './setups/setupHelpers'
import { setupPluginManager, PluginManager } from './setups/setupPluginManager'
import {
  setupRequestMethods,
  ClientRequestMethods
} from './setups/setupRequestMethods'
import {
  setupInterceptors,
  ClientInterceptors
} from './setups/setupInterceptors'

import type { ClientExport } from './types'

export type ClientInstance = ClientExport &
  ClientHelpers &
  PluginManager &
  ClientRequestMethods &
  ClientInterceptors

export function defineClient(config?: AxiosRequestConfig): ClientInstance {
  const instance = Axios.create(config)

  const clientExport = {
    // reference Axios
    // TODO defaults 的属性新版本和旧版本的定义不一样
    defaults: instance.defaults,
    interceptors: instance.interceptors
  } as ClientInstance

  setupHelpers(instance, clientExport)
  setupPluginManager(instance, clientExport)
  setupRequestMethods(instance, clientExport)
  setupInterceptors(instance, clientExport)

  return clientExport
}
