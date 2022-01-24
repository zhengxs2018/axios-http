import { ok, equal } from 'assert'

import { defineClient } from './defineClient'

describe('defineClient', () => {
  it('测试 defineClient 函数返回不同的实例', () => {
    ok(defineClient() !== defineClient())
  })

  it('测试 setBaseURL 函数是否正常', () => {
    const client = defineClient()

    client.setBaseURL('http://baidu.com')

    equal(client.defaults.baseURL, 'http://baidu.com')
  })

  it('测试 setHeader 函数是否正常', () => {
    const client = defineClient()

    client.setHeader('custom-a', 'application/json')
    equal(client.defaults.headers.common['custom-a'], 'application/json')

    client.setHeader('custom-b', 'application/html')
    equal(client.defaults.headers.common['custom-b'], 'application/html')

    client.setHeader('custom-a', null)
    equal(client.defaults.headers.common['custom-a'], undefined)

    client.setHeader('custom-c', 'application/json', 'get')
    equal(client.defaults.headers.get['custom-c'], 'application/json')

    client.setHeader('custom-d', 'application/json', ['post', 'put'])
    equal(client.defaults.headers.common['custom-a'], undefined)
    equal(client.defaults.headers.common['custom-b'], 'application/html')
    equal(client.defaults.headers.get['custom-c'], 'application/json')
    equal(client.defaults.headers.post['custom-d'], 'application/json')
    equal(client.defaults.headers.put['custom-d'], 'application/json')
  })

  it('测试 setToken 函数是否正常', () => {
    const client = defineClient()

    client.setToken('aaaaa')
    equal(client.defaults.headers.common['Authorization'], 'Bearer aaaaa')

    client.setToken('bbbbb', 'Basic')
    equal(client.defaults.headers.common['Authorization'], 'Basic bbbbb')

    client.setToken('cccc', 'Basic', 'get')
    equal(client.defaults.headers.get['Authorization'], 'Basic cccc')

    client.setToken('ddddd', 'Basic', ['post', 'put'])
    equal(client.defaults.headers.common['Authorization'], 'Basic bbbbb')
    equal(client.defaults.headers.get['Authorization'], 'Basic cccc')
    equal(client.defaults.headers.post['Authorization'], 'Basic ddddd')
    equal(client.defaults.headers.put['Authorization'], 'Basic ddddd')
  })
})
