import { defineClient } from '@zhengxs/axios-client'
import type { AxiosRequestConfig } from '@zhengxs/axios-client'

export const client = defineClient({
  baseURL: '/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

/**
 * 发送 GET 请求
 *
 * @param url - 目标地址
 * @param config - 请求配置
 * @returns
 */
export function request(url: string, config?: AxiosRequestConfig) {
  return client.request(Object.assign({ url }, config))
}
