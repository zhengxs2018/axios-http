# @zhengxs/axios-http

> 模块尚未发布，正在积极开发中

基于 [Axios][axios] 拓展的 HTTP 模块。

## 使用

### 安装依赖

```sh
# With NPM
$ npm install @zhengxs/axios-http --save

# With Yarn
$ yarn add @zhengxs/axios-http

# With PNPM
$ pnpm add @zhengxs/axios-http
```

### 示例

```js
import { defineClient } from '@zhengxs/axios-http'

const http = defineClient()

// 设置自定义请求头
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
http.request('http://example.com/test', {
  jsonp: true // 这是一个 jsonp 请求
})
```

## 文档

您可以点击 [这里]() 查看文档。

## License

MIT

[axios]: http://axios-http.com/
