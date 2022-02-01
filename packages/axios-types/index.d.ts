import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults } from 'axios'

export interface Fetcher<T = any, U = any> {
  (data: U, config: AxiosRequestConfig): T | Promise<T>
}

// TODO 支持 data 参数设置为空
export interface SendRequest<T = any, U = any> {
  (data: U, config?: AxiosRequestConfig): Promise<T>
}

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

export type PluginFunction = (instance: AxiosInstance, ...args: any[]) => void

export interface PluginObject {
  install: PluginFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
