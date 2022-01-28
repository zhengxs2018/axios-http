# 介绍

> 模块尚未发布，计划2月中旬发布，正在积极开发中

大多数前端应用都需要通过 HTTP 协议与后端服务器通讯，为约定和规范从 UI 交互到请求服务端数据的完整方案，进一步简化了应用的数据请求流程，基于 [Axios][axios] 提供了 HTTP 模块。

**框架集成**

> 规划中

- 为 vue 提供独立插件，支持 `2 & 3`，由 [vue-demi](https://github.com/vueuse/vue-demi) 提供技术支持
- 为 react 提供独立插件，引入 [swr][swr] 功能。

**依赖关系图**

![Dependency tree](/axios-http/images/dependency-tree.png)

- **@zhengxs/axios-http** 统一出口
- **@zhengxs/axios-client** Axios 的封装
- **@zhengxs/axios-helpers** 助手函数
- **@zhengxs/axios-plugin-\*** 功能插件 (`ps: 兼容 Axios 的实例`)
- **@zhengxs/axios-types** 提供给其他模块使用的 TS 类型
- **@zhengxs/axios-vue** 提供给 `Vue 2 & 3` 使用的插件
- **@zhengxs/axios-react** 提供给 `React` 使用的插件

可以从 [这里](https://juejin.cn/post/7053471988752318472) 了解此模块的理念。

## 常见问题

敬请期待

[axios]: https://axios-http.com/
[swr]: https://swr.vercel.app/
