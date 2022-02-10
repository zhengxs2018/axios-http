import type {
  AxiosStatic,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'

import type { ClientExport } from '../types'

export type ClientInterceptors = {
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

export function setupInterceptors<T = ClientExport>(
  axiosInstance: AxiosStatic | AxiosInstance,
  clientExport: T
): T & ClientInterceptors {
  return Object.assign(clientExport, {
    onRequest(onFulfilled, onRejected) {
      return axiosInstance.interceptors.request.use(function (config) {
        return Promise.resolve(onFulfilled(config)).then(userConfig => {
          return userConfig || config
        })
      }, onRejected)
    },
    onResponse(onFulfilled, onRejected) {
      return axiosInstance.interceptors.response.use(function (response) {
        return Promise.resolve(onFulfilled(response.data, response)).then(
          function (data) {
            response.data = data
            return response
          }
        )
      }, onRejected)
    }
  })
}
