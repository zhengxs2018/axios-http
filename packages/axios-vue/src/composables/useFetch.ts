import type { AxiosRequestConfig } from 'axios'
import { computed, ref, shallowRef, unref, watch } from 'vue-demi'
import type { Ref, ComputedRef } from 'vue-demi'

import httpClient, {
  withCancelToken,
  isCancel,
  isAxiosError
} from '@zhengxs/axios-http'
import type { Fetcher } from '@zhengxs/axios-http'

import type { MaybeRef } from '../types'

const defaultFetcher = <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => httpClient.get(url, config)

export interface UseFetchOptions<T = any> {
  /**
   * 初始化数据
   *
   * @defaultValue null
   */
  initialData?: T

  /**
   * 将在以下场景中自动发送请求:
   *
   * - 如果传递的 URL 是一个 ref 对象并且值被改变
   * - 如果 payload 是一个 ref 对象并且值被改变
   *
   * @defaultValue false
   */
  refetch?: boolean | Ref<boolean>

  /**
   * 失败时抛出错误
   *
   * @defaultValue false
   */
  throwOnFailed?: boolean
}

export type UseFetchOptionsWithFetcher<T = any> = UseFetchOptions<T> & {
  fetcher?: Fetcher<T, string>
}

export interface UseFetchReturn<T> {
  /**
   * Indicates if the fetch request has finished
   */
  isFinished: Ref<boolean>

  /**
   * Any fetch errors that may have occurred
   */
  error: Ref<any>

  /**
   * The fetch response body, may either be JSON or text
   */
  data: Ref<T | null>

  /**
   * Indicates if the request is currently being fetched.
   */
  isFetching: Ref<boolean>

  /**
   * Indicates if the fetch request is able to be aborted
   */
  canAbort: ComputedRef<boolean>

  /**
   * Indicates if the fetch request was aborted
   */
  aborted: Ref<boolean>

  /**
   * Abort the fetch request
   */
  abort: (msg?: string) => void

  /**
   * Manually call the fetch
   * (default not throwing error)
   */
  execute: (throwOnFailed?: boolean) => Promise<any>
}

export function useFetch<T = any>(
  url: MaybeRef<string>,
  options: UseFetchOptionsWithFetcher<T>
): UseFetchReturn<T>

export function useFetch<T = any>(
  url: MaybeRef<string>,
  fetcher: Fetcher<T, string>,
  options?: UseFetchOptions<T>
): UseFetchReturn<T>

export function useFetch<T = any>(url: MaybeRef<string>): UseFetchReturn<T> {
  // eslint-disable-next-line prefer-rest-params
  const [fetcher, settings] = normalizeOptions(arguments[1], arguments[2])
  const {
    initialData = null,
    refetch = false,
    throwOnFailed = false
  } = settings

  const [send, abort] = withCancelToken<T, string>(fetcher)

  const isFetching = ref(false)
  const isFinished = ref(false)
  const aborted = ref(false)
  const error = ref<string | null>(null)
  const data = shallowRef<T | null>(initialData)

  const canAbort = computed(() => isFetching.value)

  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading
    isFinished.value = !isLoading
  }

  const execute = async () => {
    loading(true)

    error.value = null
    aborted.value = false

    try {
      data.value = await send(unref(url))
    } catch (fetchError) {
      if (isCancel(fetcher)) {
        aborted.value = true
        return
      }

      if (isAxiosError(fetchError)) {
        error.value = fetchError.message
      } else {
        data.value = null
        error.value = (fetchError as Error).message
      }

      if (throwOnFailed) return Promise.reject(fetchError)
    } finally {
      loading(false)
    }
  }

  watch(
    () => [unref(refetch), unref(url)],
    ([refetch]) => refetch && execute()
  )

  return {
    isFinished,
    error,
    data,
    isFetching,
    canAbort,
    aborted,
    abort,
    execute
  }
}

function normalizeOptions(
  arg0: UseFetchOptionsWithFetcher,
  arg1: UseFetchOptions = {}
): readonly [Fetcher, UseFetchOptions] {
  if (typeof arg0 === 'function') return [arg0, arg1]

  return [arg0.fetcher || defaultFetcher, arg0]
}
