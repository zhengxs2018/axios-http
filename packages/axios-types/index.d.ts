import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults } from 'axios'

export type Fetcher<U = any, T = any> = (
  data: U,
  config?: AxiosRequestConfig
) => Promise<T>

export type HeaderScope = keyof HeadersDefaults

export type AuthorizationType =
  | 'Basic'
  | 'Bearer'
  | 'Digest'
  | 'HOBA'
  | 'Mutual'
  | 'Negotiate / NTLM'
  | 'VAPID'
  | 'SCRAM'
  | 'AWS4-HMAC-SHA256'

export type PluginFunction<T = unknown> = (
  instance: AxiosInstance,
  options?: T
) => void

export interface PluginObject<T = unknown> {
  install: PluginFunction<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
