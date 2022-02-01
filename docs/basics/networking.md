# 发起 HTTP 网络请求

在现代 WEB 开发中，数据与视图是分离的，同时随着 单页应用 与 服务端渲染 的普及，异步数据获取被越来越多的人所接受，而使用 HTTP 获取数据是最常用的一种数据获取方式。

在浏览器中我们使用 [XHR (XMLHttpRequest)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 发送网络请求，而在服务端(通常指[Node.js](https://nodejs.org/)) 使用 [http](https://nodejs.org/api/http.html) 或 [https](https://nodejs.org/api/https.html) 模块发送网络请求。

但底层 API 使用非常不友好，我们很少直接使用底层 API 进行发送网络请求，[axios][axios] 就是其中封装的最好，也是当下最流行的 HTTP 请求库。


## 创建 HTTP Client

http 支持需要引入 [axios-http][axios-http] 模块，使用前需要创建一个 HTTP Client

```js:no-line-numbers
import { defineClient } from '@zhengxs/axios-http'

const httpClient = defineClient()
```

该 client 支持常用的 HTTP 操作, 比如 GET, POST, PUT, DELETE。

## 处理异步

注意，HTTP API 在返回值中使用了 es6 的 Promise。 我们建议 [使用 async 函数重写 promise 链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function#%E4%BD%BF%E7%94%A8async%E5%87%BD%E6%95%B0%E9%87%8D%E5%86%99_promise_%E9%93%BE) 来调用 API。


[axios]: https://github.com/axios/axios
[axios-http]: https://github.com/zhengxs2018/axios-http
