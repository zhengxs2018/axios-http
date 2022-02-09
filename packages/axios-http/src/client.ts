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

export function request(url: string, config?: AxiosRequestConfig) {
  return client.request({ ...config, url })
}
