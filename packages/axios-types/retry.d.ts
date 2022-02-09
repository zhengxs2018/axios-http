import type { AxiosError } from 'axios'

// TODO
// hack 解决 IAxiosRetryConfig 使用会报 ts4058 的问题
export type RetryConfig = {
  /**
   * The number of times to retry before failing
   * default: 3
   */
  retries?: number
  /**
   * Defines if the timeout should be reset between retries
   * default: false
   */
  shouldResetTimeout?: boolean
  /**
   * A callback to further control if a request should be retried. By default, it retries if the result did not have a response.
   */
  retryCondition?: (error: AxiosError) => boolean | Promise<boolean>
  /**
   * A callback to further control the delay between retry requests. By default there is no delay.
   */
  retryDelay?: (retryCount: number, error: AxiosError) => number
}
