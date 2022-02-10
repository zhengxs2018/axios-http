import type { AxiosStatic, AxiosInstance, AxiosRequestConfig } from 'axios'

import type { AuthorizationType, HeaderScope } from '@zhengxs/axios-types'

import type { ClientExport } from '../types'

export type ClientHelpers = {
  getUri(config?: AxiosRequestConfig): string
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
}

export function setupHelpers<T = ClientExport>(
  axiosInstance: AxiosStatic | AxiosInstance,
  clientExport: T
): T & ClientHelpers {
  function getUri(config?: AxiosRequestConfig) {
    return axiosInstance.getUri(config)
  }

  function setBaseURL(baseURL: string): void {
    axiosInstance.defaults.baseURL = baseURL
  }

  function setHeader(
    name: string,
    value?: string | null,
    scopes?: HeaderScope | HeaderScope[]
  ): void {
    const headers = axiosInstance.defaults.headers

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

  return Object.assign(clientExport, {
    getUri,
    setBaseURL,
    setHeader,
    setToken,
    setAuthorization
  })
}
