import { isPromise } from './checker'

export interface TimerOptions {
  /**
   * 执行间隔，默认: 1000ms
   */
  interval?: number
  /**
   * 是否立即调用
   */
  immutable?: boolean
  /**
   * 发生错误时是否重试
   */
  shouldRetryOnError?: (error: any) => boolean
}

/**
 * 将定时器与 Promise 结合并且控制运行和重启
 *
 * @param callback - 执行回调
 * @param options - 可选配置
 * @returns 控制函数
 */
export function createTimer(callback: () => any, options?: TimerOptions) {
  const {
    interval = 1000,
    immutable = false,
    shouldRetryOnError = () => false
  } = options || {}

  let status: 'initial' | 'running' | 'error' = 'initial'
  let error: Error | null = null
  let timerId: number | null = null

  function handler() {
    try {
      const returnValue = callback()
      if (returnValue != null && isPromise(returnValue)) {
        returnValue.then(restart, handlerError)
      } else {
        restart()
      }
    } catch (err) {
      handlerError(err)
    }
  }

  function handlerError(err) {
    if (shouldRetryOnError(error)) {
      restart()
    } else {
      status = 'error'
      error = err
    }
  }

  function start(): void {
    if (status === 'running') return
    if (immutable) handler()

    error = null
    status = 'running'
    // eslint-disable-next-line
    // @ts-ignore 临时解决 typedoc 创建错误
    timerId = window.setTimeout(handler, interval)
  }

  function cleanup(): void {
    error = null
    status = 'initial'

    if (timerId) {
      // eslint-disable-next-line
      // @ts-ignore 临时解决 typedoc 创建错误
      window.clearTimeout(timerId)
      timerId = null
    }
  }

  function restart() {
    status = 'initial'
    start()
  }

  function isRunning() {
    return status === 'running'
  }

  function hasError() {
    return status === 'error'
  }

  function getError() {
    return error
  }

  return {
    start,
    cleanup,
    restart,
    isRunning,
    hasError,
    getError
  }
}
