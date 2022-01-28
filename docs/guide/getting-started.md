---
title: 快速上手
---

# 快速上手

<a class="npm-badge" href="http://npmjs.com/package/@zhengxs/axios-http" title="@zhengxs/axios-http" target="_blank" rel="noopener noreferrer">
  <img src="https://badgen.net/npm/v/@zhengxs/axios-http/latest?label=@zhengxs/axios-http" alt="@zhengxs/axios-http@latest" />
</a>

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

```js
import { defineClient } from '@zhengxs/axios-http'

const http = defineClient()

// 设置基础地址
http.setBaseURL('https://example.com')

// 设置自定义请求头
http.setHeader('x-api-version', 'v1')

// 设置 Authorization 头
// 默认为 Bearer 类型
http.setToken('xxx')

// 启用 JSONP 功能
http.enableJsonp()

// 启用自动重试
http.enableAutoRetry()

// 启用 URI 版本控制
http.enableVersioning()

// 发送请求
http.request('http://example.com/test')

// 发送 jsonp 请求
http.request('http://example.com/test', {
  jsonp: true // 设置 jsonp=true 可以将普通请求变为 jsonp
})
```
