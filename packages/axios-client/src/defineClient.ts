import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AxiosRetry from 'axios-retry'

import AxiosJsonp, { AxiosJsonpConfig } from '@zhengxs/axios-plugin-jsonp'
import AxiosVersioning, {
  VersioningOptions
} from '@zhengxs/axios-plugin-versioning'
import type {
  AuthorizationType,
  HeaderScope,
  PluginFunction,
  PluginObject
} from '@zhengxs/axios-types'

import type {
  AxiosRetryConfig,
  ClientInstance,
  ClientExport,
  ClientRequestMethods
} from './types'

export function defineClient(config?: AxiosRequestConfig): ClientInstance {
  const instance = Axios.create(config)

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

  function setAuthorization(
    value: string,
    scopes?: HeaderScope | HeaderScope[]
  ): void {
    return setHeader('Authorization', value, scopes)
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

  function getUri(config?: AxiosRequestConfig) {
    return instance.getUri(config)
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
  function enableVersioning(options?: VersioningOptions) {
    use(AxiosVersioning, options)
  }

  /**
   * 请求拦截器
   *
   * @param onFulfilled - 成功处理
   * @param onRejected - 失败处理
   * @returns 拦截器ID
   */
  function onRequest(
    onFulfilled: (
      config: AxiosRequestConfig
    ) =>
      | AxiosRequestConfig
      | undefined
      | null
      | Promise<AxiosRequestConfig | undefined | null>,
    onRejected?: (error: any) => any
  ): number {
    return instance.interceptors.request.use(function (config) {
      return Promise.resolve(onFulfilled(config)).then(userConfig => {
        return userConfig || config
      })
    }, onRejected)
  }

  /**
   * 响应拦截器
   *
   * @param onFulfilled - 成功处理
   * @param onRejected - 失败处理
   * @returns 拦截器ID
   */
  function onResponse<T = any, D = T>(
    onFulfilled: (data: T, res: AxiosResponse<T>) => D | Promise<D>,
    onRejected?: (error: any) => any
  ): number {
    return instance.interceptors.response.use(function (response) {
      return Promise.resolve(onFulfilled(response.data, response)).then(
        function (data) {
          response.data = data
          return response
        }
      )
    }, onRejected)
  }

  return addRequestMethodsToClient(instance, {
    // Headers
    setHeader,
    setToken,
    setAuthorization,
    // Plugins
    use,
    enableJsonp,
    enableAutoRetry,
    enableVersioning,
    // Helpers
    setBaseURL,
    getUri,
    // Interceptors
    onRequest,
    onResponse,
    // reference Axios
    instance: instance,
    defaults: instance.defaults,
    interceptors: instance.interceptors
  })
}

function addRequestMethodsToClient(
  instance: AxiosInstance,
  clientExport: ClientExport
): ClientExport & ClientRequestMethods {
  const REQUEST_METHODS = [
    'request',
    'get',
    'delete',
    'head',
    'options',
    'post',
    'put',
    'patch'
  ] as const

  REQUEST_METHODS.forEach(function (method) {
    clientExport[method] = function () {
      /* eslint-disable prefer-rest-params */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return instance.apply(instance, arguments).then(function (res) {
        return res.data
      })
    }
  })

  return clientExport as ClientExport & ClientRequestMethods
}
