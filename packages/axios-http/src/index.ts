import Axios from 'axios'

export const CancelToken = Axios.CancelToken

export const isCancel = Axios.isCancel
// export const isAxiosError = Axios.isAxiosError

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

export type { IAxiosRetryConfig } from 'axios-retry'

export { withCancelToken } from '@zhengxs/axios-helpers'

export type {
  Fetcher,
  HeaderScope,
  AuthorizationType,
  PluginFunction,
  PluginObject
} from '@zhengxs/axios-types'

export type {
  VersioningType,
  VersioningOptions,
  URIVersioningOptions,
  HeaderVersioningOptions
} from '@zhengxs/axios-plugin-versioning'

export type { AxiosJsonpConfig } from '@zhengxs/axios-plugin-jsonp'

export { defineClient } from './defineClient'
export type { AxiosRetryConfig } from './defineClient'
