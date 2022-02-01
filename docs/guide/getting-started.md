---
title: 快速上手
---

# 快速上手

<a class="npm-badge" href="http://npmjs.com/package/@zhengxs/axios-http" title="@zhengxs/axios-http" target="_blank" rel="noopener noreferrer">
  <img src="https://badgen.net/npm/v/@zhengxs/axios-http/latest?label=@zhengxs/axios-http" alt="@zhengxs/axios-http@latest" />
</a>

对于大部分应用来说，获取网络数据都是必不可少的一个功能。而 axios-http 是基于 Axios 封装的，支持 Axios 的所有功能。

## 安装

在命令行中输入执行以下命令:

```sh:no-line-numbers
# With NPM
$ npm install @zhengxs/axios-http --save

# With Yarn
$ yarn add @zhengxs/axios-http

# With PNPM
$ pnpm add @zhengxs/axios-http
```

## 使用

使用此库的最简单方法是通过顶级函数。可以直接返回发起 HTTP 请求：

```js
import http from '@zhengxs/axios-http'

const url = 'https://example.com/api/users/create'
const result = await http.post(url, { name: '张三' })

console.log(result) // { "_id": "bpsunpkn4cf0iode3tceo", "name": "张三" }
```

### 请求重试

启用自动重试功能，可以为你的请求添加错误自动重试的能力，只需要调用 `enableAutoRetry()` 函数:

```js
import http from '@zhengxs/axios-http'

// 启用自动重试
http.enableAutoRetry({
  // 支持 axios-retry 的所有配置
})

// 发送请求
http.get('https://example.com/api/users')

// 发送请求
http.get('https://example.com/api/users', {
  'axios-retry': {
    retries: 9 // 允许单个请求重置
  }
})
```

有关自动重试的功能，点击 [这里](https://github.com/softonic/axios-retry#options) 查看所有配置。

### 添加 Authorization Headers

为了从后端获取数据，你需要提供相应的授权认证信息。当然了，解决这一问题的方法有很多，而最常见的方法或许就是使用 Authorization HTTP header 了。

```js
import http from '@zhengxs/axios-http'

// 默认设置的认证类型为 Bearer
http.setToken('ubpnpks....de3e1')
```

### 启用 JSONP 功能

:::warning
不要使用这项技术，有安全风险，它会使你暴露在 [脚本注入攻击](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting) 中. 然而，该方法可能是在没后端支持下的唯一选择。
:::

当调用第三方服务时存在跨域，以前都会推荐使用 [jsonp](https://zh.wikipedia.org/zh/JSONP)，但随着 Node.js 的普及，这种旧的方式反而越来越少。

```js
import http from '@zhengxs/axios-http'

// 启用 JSONP
http.enableJsonp()

// 发送请求
http.get('http://example.com/test')
```
