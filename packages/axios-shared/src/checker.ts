import Axios, { AxiosError } from 'axios'

export const isCancel = Axios.isCancel

export function isPromise(obj: unknown): obj is Promise<any> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return typeof obj === 'object' && typeof obj.then === 'function'
}

let isAxiosError: (error: unknown) => error is AxiosError

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore 兼容不同版本的 Axios
if (typeof Axios.isAxiosError === 'function') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  isAxiosError = Axios.isAxiosError
}

isAxiosError = function isAxiosError(error: unknown): error is AxiosError {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return error && error['isAxiosError'] === true
}

export { isAxiosError }
