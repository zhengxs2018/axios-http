import type { AxiosInstance } from 'axios'

/**
 * 版本控制类型
 */
export enum VersioningType {
  URI,
  HEADER
  // MEDIA_TYPE // TODO 计划中
}

export interface DefaultVersioningOptions {
  /**
   * 版本前缀，如: v
   */
  prefix?: string | false
  /**
   * 默认版本，默认: 1
   */
  defaultVersion?: string
}

export interface URIVersioningOptions extends DefaultVersioningOptions {
  type: VersioningType
}

export interface HeaderVersioningOptions extends DefaultVersioningOptions {
  type: VersioningType.HEADER
  header?: string
}

export type VersioningOptions = URIVersioningOptions | HeaderVersioningOptions

/**
 * 启用 URI 版本控制
 *
 * @param options - 插件配置
 * @returns Axios 请求拦截器 ID
 */
export default function versioning(
  client: AxiosInstance,
  options: VersioningOptions = { type: VersioningType.URI }
): void {
  const { prefix = 'v', defaultVersion = '1' } = options

  // 设置到默认配置上，这样可以允许单个请求覆盖
  client.defaults.enableVersion = true
  client.defaults.version = `${prefix === false ? '' : prefix}${defaultVersion}`

  if (isHeaderVersioningOptions(options)) {
    const header = options['header'] || 'X-Api-Version'

    client.interceptors.request.use(function (config) {
      if (config.enableVersion) {
        config.headers![header] = config.version!
      }
      return config
    })
  } else {
    client.interceptors.request.use(function (config) {
      if (config.enableVersion) {
        config.url = config.url!.replace('{version}', config.version!)
      }
      return config
    })
  }
}

function isHeaderVersioningOptions(
  options: VersioningOptions
): options is HeaderVersioningOptions {
  return VersioningType.HEADER === options.type
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 是否启用
     */
    enableVersion?: boolean

    /**
     * 默认版本
     */
    version?: string
  }
}
