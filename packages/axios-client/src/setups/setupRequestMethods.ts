import type { AxiosStatic, AxiosInstance, AxiosRequestConfig } from 'axios'

import type { ClientExport } from '../types'

export const AXIOS_REQUEST_METHODS = [
  'request',
  'get',
  'delete',
  'head',
  'options',
  'post',
  'put',
  'patch'
] as const

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

/**
 * 安装请求方法
 *
 * @param axiosInstance -  Axios 或 Axios 实例
 * @param clientExport - 导出的对象
 * @returns 导出的对象
 */
export function setupRequestMethods<T = ClientExport>(
  axiosInstance: AxiosStatic | AxiosInstance,
  clientExport: T
): T & ClientRequestMethods {
  AXIOS_REQUEST_METHODS.forEach(function (method) {
    clientExport[method] = function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      return axiosInstance.apply(client, arguments).then(res => res.data)
    }
  })

  return clientExport as T & ClientRequestMethods
}
