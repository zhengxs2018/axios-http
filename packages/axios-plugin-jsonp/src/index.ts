import type { AxiosInstance } from 'axios'

import jsonpAdapter from 'axios-jsonp'

export type AxiosJsonpConfig = {
  /**
   * jsonp 回调函数名称，默认: callback
   */
  callbackParamName?: string
}

export default function jsonpPlugin(
  client: AxiosInstance,
  config: AxiosJsonpConfig = {}
) {
  const { callbackParamName = 'callback' } = config

  client.interceptors.request.use(function (config) {
    if (config.enableJsonp) {
      config['adapter'] = jsonpAdapter
      config['callbackParamName'] =
        config['callbackParamName'] || callbackParamName
    }
    return config
  })
}

declare module 'axios' {
  export interface AxiosRequestConfig extends AxiosJsonpConfig {
    /**
     * 是否以 jsonp 的形式发送请求
     */
    enableJsonp?: boolean
  }
}
