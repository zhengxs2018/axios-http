# 介绍

> 模块尚未发布，计划 2 月中旬发布，正在积极开发中

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯，为约定和规范从 UI 交互到请求服务端数据的完整方案，进一步简化了应用的数据请求流程，基于 [Axios][axios] 提供了 HTTP 模块。

可以从 [这里](https://juejin.cn/post/7053471988752318472) 了解此模块的理念。

## 依赖关系图

![Dependency tree](/images/dependency-tree.png)

- **@zhengxs/axios-vue** 提供给 `Vue 2 & 3` 使用的插件，由 [vue-demi][vue-demi] 提供技术支持
- **@zhengxs/axios-http** 统一出口
- **@zhengxs/axios-client** Axios 的封装
- **@zhengxs/axios-helpers** 助手函数
- **@zhengxs/axios-plugin-jsonp** jsonp 插件，兼容 Axios
- **@zhengxs/axios-plugin-versioning** URL 版本管理插件，兼容 Axios
- **@zhengxs/axios-types** 提供给其他模块使用的 TS 类型

框架集成中

- **@zhengxs/axios-vue** 提供给 `Vue 2 & 3` 使用的插件，由 [vue-demi](https://github.com/vueuse/vue-demi) 提供技术支持
- **@zhengxs/axios-react** 提供给 `React` 使用的插件

## 为什么会存在这个库？

在现代 WEB 开发中，数据与视图是分离的，同时随着 单页应用 与 服务端渲染 的普及，异步数据获取被越来越多的人所接受，而使用 HTTP 获取数据是最常用的一种数据获取方式。

在浏览器中我们使用 [XHR (XMLHttpRequest)](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 发送网络请求，而在服务端(通常指[Node.js](https://nodejs.org/)) 使用 [http](https://nodejs.org/api/http.html) 或 [https](https://nodejs.org/api/https.html) 模块发送网络请求。

但底层 API 使用非常不友好，我们很少直接使用底层 API 进行发送网络请求，[Axios][axios] 就是其中封装的最好，也是当下最流行的 HTTP 请求库。

Axios 虽然写的很好，但也存在诸多不足:

- HTTP 方法返回的不是数据而是 AxiosResponse 包裹对象
- 缺乏自动重试的功能
- 不支持 [jsonp][jsonp] 请求
- 其他

Axios 也有毕竟只是个公共库，同时需要兼容 Node 和 浏览器的环境，所以很多功能并不会全部实现，不过开源社区会帮助我们解决这些特定的需求，所以 axios-http 的目的就在于整合社区资源与最佳实践。

### 与 Axios 的关系

[Axios][axios] 是前端一款非常优秀且流行的的支持 Node 和 浏览器 的网络请求库，但对项目而言，它还比较基础。

而 axios-http 是在 Axios 的功能基础上，进一步对它进行了一些增强，同时整合社区优秀资源，让请求更可控。

[axios]: https://axios-http.com/
[axios-http]: https://github.com/zhengxs2018/axios-http
[swr]: https://swr.vercel.app/
[vue-demi]: https://github.com/vueuse/vue-demi
[jsonp]: https://en.wikipedia.org/wiki/JSONP
