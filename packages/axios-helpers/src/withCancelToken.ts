import Axios from 'axios'
import type { AxiosRequestConfig, Canceler } from 'axios'

import type { Fetcher, SendRequest } from '@zhengxs/axios-types'

export const CancelToken = Axios.CancelToken

export const isCancel = Axios.isCancel

/**
 * 不管调用多少次，只会保留一个激活的请求
 *
 * 注意:
 *
 * 原理是内部维护了 CancelToken 的创建
 * 所以请求函数收到 config 之后，必须传递给 Axios 的请求方法，否者功能无效
 *
 * @param fetcher - 请求函数
 * @returns [请求函数, 取消函数]
 *
 * @example
 *
 * ```ts
 * import axios, { AxiosRequestConfig } from 'axios'
 *
 * // 自定义请求函数
 * // 第一个参数接收任意数据
 * // 第二个参数接收的只能是 axios 的 AxiosRequestConfig 对象
 * function getUser(id: string, config?: AxiosRequestConfig) {
 *   return axios.get(`/api/user/${id}`, config)
 * }
 *
 * // 包装请求函数
 * const [fetchUser, cancelRequest] = withCancelToken(getUser)
 *
 * // 第一个参数任意
 * // 第二个参数必须是 axios 的 AxiosRequestConfig 对象
 * // 不管调用多少次，只会保留一个激活的请求
 * fetchUser('1000')
 *
 * // 也支持在外部取消请求
 * cancelRequest()
 * ```
 */
export function withCancelToken<T = any, U = any>(
  fetcher: Fetcher<T, U>
): readonly [SendRequest<T, U>, Canceler] {
  let abort: Canceler | null

  /**
   * 发送请求
   *
   * @param data   - 数据
   * @param optionalConfig - Axios 请求配置
   * @returns 请求结果
   */
  function send(data: U, config: AxiosRequestConfig = {}) {
    // 每次请求都自动取消上一次
    cancel()

    const cancelToken = new CancelToken(function (cancel) {
      abort = cancel
    })
    const requestConfig = Object.assign({}, config, { cancelToken })

    // 防止使用者直接忘记返回 Promise 对象
    return Promise.resolve(fetcher(data as U, requestConfig))
  }

  /**
   * 取消请求
   *
   * @param message - 消息文本
   */
  function cancel(message = 'abort') {
    if (abort) {
      abort(message)
      abort = null
    }
  }

  return [send, cancel]
}
