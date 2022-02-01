# 插件开发

如果一个功能没有第三方依赖，或普通请求不需要，我们都推荐优先考虑函数，而不是插件。

开发一个插件的约定:

- 如果需要添加拦截器，应该使用前置条件限制，并且支持 `AxiosRequestConfig` 启用和禁用
- 如果拓展的是 Headers，应该设置到 `AxiosInstance.defaults.headers.common`
- 如果写的是适配器，应该通过拦截器封一层

## 开发插件

插件应该暴露一个 install 方法。这个方法的第一个参数是 Axios 实例，第二个参数是一个可选的选项对象：

```ts
import type { AxiosInstance } from 'axios'

export interface MyPluginOptions {
  // pass
}

export default {
  install(client: AxiosInstance, options: MyPluginOptions = {}) {
    // 1. 拓展全局配置
    client.defaults.enableMyPlugin = true

    // 2. 添加全局拦截器
    client.interceptors.request.use(function (config) {
      // 只有启用才能修改配置
      if (config.enableMyPlugin) {
        // 注意修改 common 作用域
        config.headers.common['xxx'] = 'xxx'
      }

      return config
    })
  }
}

// 拓展 Axios 的请求配置
declare module 'axios' {
  export interface AxiosRequestConfig {
    // 添加配置
    enableMyPlugin?: boolean
  }
}
```

也支持直接导出一个函数

```ts
import type { AxiosInstance } from 'axios'

export interface MyPluginOptions {
  // pass
}

export default  function install(client: AxiosInstance, options: MyPluginOptions = {}) {
  // 1. 拓展全局配置
  client.defaults.enableMyPlugin = true

  // 2. 添加全局拦截器
  client.interceptors.request.use(function (config) {
    // 只有启用才能修改配置
    if (config.enableMyPlugin) {
      // 注意修改 common 作用域
      config.headers.common['xxx'] = 'xxx'
    }

    return config
  })
}

// 拓展 Axios 的请求配置
declare module 'axios' {
  export interface AxiosRequestConfig {
    // 添加配置
    enableMyPlugin?: boolean
  }
}
```

使用插件

```ts
import http from '@zhengxs/axios-http'
import MyPlugin from 'my-plugin'

http.use(MyPlugin)
```
