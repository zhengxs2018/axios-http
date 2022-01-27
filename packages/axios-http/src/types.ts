import type {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'

import type { AxiosJsonpConfig } from '@zhengxs/axios-plugin-jsonp'
import type { VersioningOptions } from '@zhengxs/axios-plugin-versioning'
import type {
  AuthorizationType,
  HeaderScope,
  PluginFunction,
  PluginObject
} from '@zhengxs/axios-types'

// TODO
// hack 解决 IAxiosRetryConfig 使用会报 ts4058 的问题
export type AxiosRetryConfig = {
  /**
   * The number of times to retry before failing
   * default: 3
   */
  retries?: number
  /**
   * Defines if the timeout should be reset between retries
   * default: false
   */
  shouldResetTimeout?: boolean
  /**
   * A callback to further control if a request should be retried. By default, it retries if the result did not have a response.
   */
  retryCondition?: (error: AxiosError) => boolean | Promise<boolean>
  /**
   * A callback to further control the delay between retry requests. By default there is no delay.
   */
  retryDelay?: (retryCount: number, error: AxiosError) => number
}

export type AxiosInstanceReference = {
  instance: AxiosInstance
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
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
  use<U>(plugin: PluginFunction<U> | PluginObject<U>, options?: U): void
  getUri(config?: AxiosRequestConfig): string
  enableAutoRetry(options?: AxiosRetryConfig): void
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
