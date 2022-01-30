import { isAxiosError, isCancel, createTimer } from '@zhengxs/axios-shared'
import type { TimerOptions } from '@zhengxs/axios-shared'
import type { Fetcher } from '@zhengxs/axios-types'

export interface WithPollingOptions extends TimerOptions {
  /**
   * 当发生错误时请求的最大次数，默认: 9
   *
   * 注意: 需要 axios-retry 支持
   */
  maxRedirects?: number
}

export function withPolling(
  fetcher: Fetcher<null>,
  options?: WithPollingOptions
) {
  const { maxRedirects = 9 } = options || {}

  return createTimer(function () {
    return Promise.resolve(
      fetcher(null, {
        maxRedirects
      })
    ).catch(function (err) {
      // 忽略 Axios 错误 和 取消请求
      if (isAxiosError(err) || isCancel(err)) return
      return Promise.reject(err)
    })
  }, options)
}
