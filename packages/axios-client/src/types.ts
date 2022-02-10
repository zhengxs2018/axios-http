import type { AxiosStatic } from 'axios'

export interface ClientExport {
  defaults: AxiosStatic['defaults']
  interceptors: AxiosStatic['interceptors']
  [key: string]: unknown
}
