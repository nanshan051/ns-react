---
title: BrowserRouter 与 HashRouter
comments: true
tags:
  - BrowserRouter
  - HashRouter
---

## 1. 不同点

::: tip

1. **底层原理不同：**
   - BrowserRouter 使用的是 **`H5 的 history API`**，不兼容 IE9 及以下版本。
   - HashRouter 使用的是 **`URL 的 hash 值`**。
2. **path 表现形式不同：**
   - BrowserRouter 的路径中没有 # : `http://localhost:3000/about`
   - HashRouter 的路径包含 `#` : `http://localhost:3000/#/about`
3. **刷新后对路由 state 参数的影响不同：**
   - BrowserRouter 没有任何影响，因为 state 保存在 history 对象中。
   - **<font color="red">HashRouter 刷新后会导致路由 state 参数的丢失！！！</font>**

:::

## 2. 刷新后对路由 state 参数影响

### 1. BrowserRouter

<img class="zoomable" :src="$withBase('/images/screenshot/5/15/1.gif')" alt="foo">

BrowserRouter 使用的是 **`H5 的 history API`**，history 会保存路由 state 参数，所以刷新后路由 state 参数不会丢失。

### 2. HashRouter

<img class="zoomable" :src="$withBase('/images/screenshot/5/15/2.gif')" alt="foo">

HashRouter 使用的是 **`URL 的 hash 值`**，所以 **刷新后路由 state 参数会丢失。**
