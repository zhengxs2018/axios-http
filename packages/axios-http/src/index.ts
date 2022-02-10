export { client as default } from './client'

/// reference
export { defineClient } from '@zhengxs/axios-client'
export type { ClientInstance } from '@zhengxs/axios-client'

export { withCancelToken, withPolling } from '@zhengxs/axios-helpers'
export type { WithPollingOptions } from '@zhengxs/axios-helpers'

export type {
  Fetcher,
  HeaderScope,
  AuthorizationType,
  PluginFunction,
  PluginObject
} from '@zhengxs/axios-types'

export {
  isAxiosError,
  isCancel,
  isPromise,
  createTimer,
  toPath
} from '@zhengxs/axios-shared'
export type { TimerOptions } from '@zhengxs/axios-shared'
