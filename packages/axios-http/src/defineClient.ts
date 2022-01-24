import Axios, { AxiosRequestConfig, AxiosError } from 'axios'

import AxiosRetry from 'axios-retry'

import AxiosJsonp, { AxiosJsonpConfig } from '@zhengxs/axios-plugin-jsonp'
import AxiosVersion, {
  VersioningOptions
} from '@zhengxs/axios-plugin-versioning'
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

export function defineClient(config?: AxiosRequestConfig) {
  const instance = Axios.create(config)

  /**
   * 发送 request 请求
   *
   * @param url  - 请求地址
   * @param config - Axios 配置
   * @returns 你的业务数据
   */
  function request<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return instance.request({ ...config, url }).then(res => res.data)
  }

  /**
   * 设置基础地址
   *
   * @param baseURL - 基础地址
   *
   * @example
   *
   * ```ts
   * client.setBaseURL('https://example.com')
   * ```
   */
  function setBaseURL(baseURL: string): void {
    instance.defaults.baseURL = baseURL
  }

  /**
   * 设置请求头
   *
   * @param name  - 名称
   * @param value - 值
   * @param scopes - 作用域，可以决定应用什么类型的请求
   *
   * @example
   *
   * ```ts
   * // 设置请求头
   * client.setHeader('Content-Type', 'application/json')
   *
   * // 支持单独设置
   * client.setHeader('Content-Type', 'application/json', ['get', 'post'])
   * ```
   */
  function setHeader(
    name: string,
    value?: string | null,
    scopes?: HeaderScope | HeaderScope[]
  ): void {
    const headers = instance.defaults.headers

    function update(scope: HeaderScope) {
      if (value) {
        headers[scope][name] = value
      } else {
        delete headers[scope][name]
      }
    }

    if (Array.isArray(scopes)) {
      scopes.forEach(update)
    } else {
      update(scopes || 'common')
    }
  }

  /**
   * 设置授权令牌
   *
   * @param credentials - 凭证
   * @param type - 认证类型，默认: Bearer
   * @param scopes - 作用域，默认: common
   *
   * @example
   *
   *
   * ```ts
   * // 默认为 Bearer
   * client.setToken('<credentials>')
   *
   * // 可以切换为其他认证方式
   * client.setToken('<credentials>', 'Basic')
   *
   * // 可以分开设置认证
   * client.setToken('<credentials>', 'Basic', ['get', 'post'])
   * ```
   */
  function setToken(
    credentials: string,
    type: AuthorizationType = 'Bearer',
    scopes?: HeaderScope | HeaderScope[]
  ): void {
    setHeader('Authorization', type + ' ' + credentials, scopes)
  }

  /**
   * 添加 axios 插件
   *
   * @param plugin - 插件对象
   * @param options - 插件配置
   *
   * @example
   *
   * ```ts
   * import AxiosRetry from 'axios-retry'
   *
   * // 添加重试插件
   * client.use(AxiosRetry, { retries: 3 })
   * ```
   */
  function use<U>(
    plugin: PluginFunction<U> | PluginObject<U>,
    options?: U
  ): void {
    if (typeof plugin === 'function') {
      plugin(instance, options)
    } else {
      plugin.install(instance, options)
    }
  }

  /**
   * 启用自动重试
   *
   * @param options - axios-retry 插件配置
   */
  function enableAutoRetry(options?: AxiosRetryConfig): void {
    use(AxiosRetry, options)
  }

  /**
   * 启用 Jsonp
   *
   * @param options - jsonp 插件配置
   */
  function enableJsonp(options?: AxiosJsonpConfig) {
    use(AxiosJsonp, options)
  }

  /**
   * 启用 URI 版本控制
   *
   * @param options - 版本控制插件配置
   */
  function enableVersioning(options: VersioningOptions) {
    use(AxiosVersion, options)
  }

  return {
    instance: instance,
    defaults: instance.defaults,
    use,
    setBaseURL,
    setHeader,
    setToken,
    request,
    enableJsonp,
    enableAutoRetry,
    enableVersioning
  }
}
