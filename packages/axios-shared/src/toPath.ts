const URI_PARAMS_RE = /\{([^\\}]*(?:\\.[^\\}]*)*)\}/gm

/**
 * 解析路径并且填充数据
 *
 * @param path - 路径
 * @param params - 参数
 * @returns 拼接后的路径
 *
 * @example
 *
 * ```js
 * toPath('/api/{version}/users', { version: '1.0' }) // => "/api/1.0/users"
 * ```
 */
export function toPath(
  path: string,
  params: Record<string, string | number>
): string {
  return path.replace(URI_PARAMS_RE, function (_, key) {
    // eslint-disable-next-line no-param-reassign
    const name = key.trim()
    const value = params[name]

    if (value == null) {
      console.warn('Please set value for template key: ', key)
      return ''
    }

    delete params[key]
    return encodeURIComponent(value.toString())
  })
}
