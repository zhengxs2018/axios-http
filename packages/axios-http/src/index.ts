export { defineClient } from '@zhengxs/axios-client'
export type { ClientInstance, AxiosRetryConfig } from '@zhengxs/axios-client'

export type {
  Fetcher,
  HeaderScope,
  AuthorizationType,
  PluginFunction,
  PluginObject
} from '@zhengxs/axios-types'

export { VersioningType } from '@zhengxs/axios-plugin-versioning'
export type {
  VersioningOptions,
  URIVersioningOptions,
  HeaderVersioningOptions
} from '@zhengxs/axios-plugin-versioning'

export type { AxiosJsonpConfig } from '@zhengxs/axios-plugin-jsonp'

export { withCancelToken, withPolling } from '@zhengxs/axios-helpers'
export type { WithPollingOptions } from '@zhengxs/axios-helpers'

export { isAxiosError, isPromise, createTimer } from '@zhengxs/axios-shared'
export type { TimerOptions } from '@zhengxs/axios-shared'
