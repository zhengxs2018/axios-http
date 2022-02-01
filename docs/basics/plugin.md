# 使用插件

插件机制是目前前端比较流行的一种功能拓展方式，插件的优势在于可以保证核心的足够精简、稳定、高效，还可以复用现有的业务逻辑，形成特定的生态圈。

## 安装依赖

插件可以使用 NPM 模块的方式进行复用

::: tip
支持 Axios 的生态插件，你可以在 [这里](https://www.npmjs.com/search?q=axios%20plugin) 查看社区开发的 Axios 插件。
:::

```sh:no-line-numbers
# 添加自动重试功能
$ npm install axios-retry --save
```

## 安装插件

如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Axios 实例作为参数传入。

::: tip
当 install 方法被同一个插件多次调用，插件将只会被安装一次。
:::

```js:no-line-numbers
import http from '@zhengxs/axios-http'
import axiosRetry from 'axios-retry'

http.use(axiosRetry, {
  retries: 3
})
```

也可以传入一个可选的选项对象

```js:no-line-numbers
http.use(axiosRetry, {
  retries: 3
})
```

`http.use` 会自动阻止多次注册相同插件，即使多次调用也只会注册一次该插件。

## 如何开发一个插件

参见文档：[插件开发](../advanced/plugin)。
