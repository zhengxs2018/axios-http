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

export function createTimer(executer: () => any, options?: TimerOptions) {
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
      const returnValue = executer()
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
    timerId = window.setTimeout(handler, interval)
  }

  function cleanup(): void {
    error = null
    status = 'initial'

    if (timerId) {
      window.clearInterval(timerId)
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
