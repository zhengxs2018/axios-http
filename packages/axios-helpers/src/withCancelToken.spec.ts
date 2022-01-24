import { ok, equal } from 'assert'
import { withCancelToken } from './withCancelToken'

describe('withCancelToken', () => {
  it('测试参数接口和返回结果是否正确', done => {
    const [fetchUser] = withCancelToken<
      Record<string, string>,
      Record<'code', number>
    >(async (params, config) => {
      equal(params['sortBy'], 'createAt', '参数与传入的不一致')

      ok(!!config!['headers'], '用户自定义的请求头没有合并')
      ok(!!config!['cancelToken'], 'cancelToken 没有传递进来')

      return { code: 0 }
    })

    fetchUser(
      { sortBy: 'createAt' },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(result => equal(result.code, 0, '响应结果返回异常'))
      .finally(done)
  })
})
