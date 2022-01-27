import Axios from 'axios'

export const CancelToken = Axios.CancelToken

export const isCancel = Axios.isCancel

export type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Canceler
} from 'axios'

export {
  isNetworkError,
  isRetryableError,
  isSafeRequestError,
  isIdempotentRequestError,
  isNetworkOrIdempotentRequestError,
  exponentialDelay
} from 'axios-retry'

export { withCancelToken } from '@zhengxs/axios-helpers'

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

export { defineClient } from './defineClient'
export type { ClientInstance, AxiosRetryConfig } from './types'
