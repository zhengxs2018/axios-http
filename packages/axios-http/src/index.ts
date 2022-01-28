import {
  defineClient,
  VersioningType,
  isNetworkError,
  isRetryableError,
  isSafeRequestError,
  isIdempotentRequestError,
  isNetworkOrIdempotentRequestError,
  exponentialDelay,
  isCancel,
  CancelToken
} from '@zhengxs/axios-client'
import type {
  ClientInstance,
  AxiosRetryConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Canceler,
  Fetcher,
  HeaderScope,
  AuthorizationType,
  PluginFunction,
  PluginObject,
  AxiosJsonpConfig,
  VersioningOptions,
  URIVersioningOptions,
  HeaderVersioningOptions
} from '@zhengxs/axios-client'

import { withCancelToken } from '@zhengxs/axios-helpers'

export {
  withCancelToken,
  defineClient,
  VersioningType,
  isNetworkError,
  isRetryableError,
  isSafeRequestError,
  isIdempotentRequestError,
  isNetworkOrIdempotentRequestError,
  exponentialDelay,
  isCancel,
  CancelToken
}
export type {
  ClientInstance,
  AxiosRetryConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Canceler,
  Fetcher,
  HeaderScope,
  AuthorizationType,
  PluginFunction,
  PluginObject,
  AxiosJsonpConfig,
  VersioningOptions,
  URIVersioningOptions,
  HeaderVersioningOptions
}
