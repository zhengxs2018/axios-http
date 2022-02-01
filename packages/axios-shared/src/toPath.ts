const URI_PARAMS_RE = /\{([^\\}]*(?:\\.[^\\}]*)*)\}/gm

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
