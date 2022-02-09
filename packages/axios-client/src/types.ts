import type { AxiosStatic, AxiosRequestConfig, AxiosResponse } from 'axios'

import type { AxiosJsonpConfig } from '@zhengxs/axios-plugin-jsonp'
import type { VersioningOptions } from '@zhengxs/axios-plugin-versioning'
import type {
  AuthorizationType,
  RetryConfig,
  HeaderScope,
  PluginFunction,
  PluginObject
} from '@zhengxs/axios-types'

export type AxiosInstanceReference = {
  defaults: AxiosStatic['defaults']
  interceptors: AxiosStatic['interceptors']
}

export type ClientRequestMethods = {
  request<T = any>(config: AxiosRequestConfig): Promise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
}

export interface ClientExport extends AxiosInstanceReference {
  setBaseURL(baseURL: string): void
  setHeader(
    name: string,
    value?: string | null,
    scopes?: HeaderScope | HeaderScope[]
  ): void
  setToken(
    credentials: string,
    type?: AuthorizationType,
    scopes?: HeaderScope | HeaderScope[]
  ): void
  setAuthorization(value: string, scopes?: HeaderScope | HeaderScope[]): void
  use(plugin: PluginFunction | PluginObject, ...args: any[]): void
  getUri(config?: AxiosRequestConfig): string
  enableAutoRetry(options?: RetryConfig): void
  enableJsonp(options?: AxiosJsonpConfig): void
  enableVersioning(options: VersioningOptions): void
  onRequest(
    onFulfilled: (
      config: AxiosRequestConfig
    ) =>
      | AxiosRequestConfig
      | undefined
      | null
      | Promise<AxiosRequestConfig | undefined | null>,
    onRejected?: (error: any) => any
  ): number
  onResponse<T = any, D = T>(
    onFulfilled: (data: T, res: AxiosResponse<T>) => D | Promise<D>,
    onRejected?: (error: any) => any
  ): number
}

export type ClientInstance = ClientExport & ClientRequestMethods
