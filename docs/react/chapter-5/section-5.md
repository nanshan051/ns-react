---
title: 解决样式丢失问题
comments: true
tags:
  - 样式丢失
---

## 1. 前置准备

主页面 index.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="stylesheet" href="./css/bootstrap.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

将路由 `/about` 改为 `/page/about`。

App.jsx：

```jsx
<MyNavLink to="/page/about">About</MyNavLink>  // 路由链接
<Route path="/page/about" component={About} /> // 路由组件
```

## 2. 样式丢失问题

### 2.1. 加载页面（正常）

首次访问 http://localhost:3000 时，样式生效：

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/5/1.gif')" alt="foo">

过程分析：

1. 页面请求 `http://localhost:3000` 时，也就是访问项目的根目录 `/public` ，默认返回 `index.html` 文件。

   ::: tip

   **此时，index.html 的相对路径是 `http://localhost:3000` 。**

   :::

2. 由于 index.html 中采用 **<font color="red">相对路径</font>** `./css/bootstrap.css` 引入了样式表，所以最终请求路径为 `http://localhost:3000/css/bootstrap.css`，也就是访问项目的 `/public/css/css/bootstrap.css` 目录，能找到对应的文件，所以正常返回该样式表。

3. 而 index.html 中采用 **绝对路径** `%PUBLIC_URL%/favicon.ico` 引入了图标，**`%PUBLIC_URL%` 指的就是项目根目录 `/public` 。** 所以最终请求路径为 `http://localhost:3000/favicon.ico` ，也就是访问项目的 `/public/favicon.ico` 目录，能找到对应的文件，所以正常返回该图标。

### 2.2. 刷新/page/about 页面（异常）

刷新 http://localhost:3000/page/about 页面后，样式丢失：

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/5/2.gif')" alt="foo">

过程分析：

1. 点击路由链接 About 时，路由器会修改路径，但浏览器 **不会发送请求。**

2. 刷新页面，页面请求 `http://localhost:3000/page/about` ，也就是访问项目的根目录 `/public/page/about` ，**<font color="red">查不到对应文件，React 会做兜底，返回 `index.html` 文件。</font>**

   ::: danger

   **此时，index.html 是“作为” `/public/page` 目录下的 about 文件返回的，所以 index.html 的相对路径是 `http://localhost:3000/page` 。**

   :::

3. 由于 index.html 中采用 **<font color="red">相对路径</font>** `./css/bootstrap.css` 引入了样式表，所以最终请求路径为 `http://localhost:3000/page/css/bootstrap.css`，也就是访问项目的 `/public/page/css/bootstrap.css` 目录，找不到对应的文件，React 会做兜底，返回 `index.html` 文件。没有样式表，即 **样式丢失。**

4. 图标引入原理同本小节 2.1。

## 3. 解决方案

::: tip 解决样式丢失问题

- 方法一：通过 link 标签引入文件时，路径不写 `./`，而是写 `/` 。**（绝对路径）**
- 方法二：通过 link 标签引入文件时，路径不写 `./`，而是写 `%PUBLIC_URL%/` 。**（绝对路径）**
- 方法三：使用哈希路由器 `HashRouter` 替代浏览器路由器 `BrowserRouter` 。**（哈希路由）**

:::

前两种方法都是采用绝对路径，即访问的是项目的 `/public` 目录，所以能找到对应的样式文件。

这里主要分析一下第三种方法：**哈希路由** 。

index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 哈希路由
  <HashRouter>
    <App />
  </HashRouter>,
);
```

### 3.1. 加载页面（正常）

首次访问 http://localhost:3000 时，样式生效：

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/5/3.gif')" alt="foo">

过程分析：原理同本小节 2.1

### 3.2. 刷新/#/page/about 页面（正常）

刷新 http://localhost:3000/#/page/about 页面后，样式仍然生效：

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/5/4.gif')" alt="foo">

过程分析：

1. 点击路由链接 About 时，路由器会修改路径，但浏览器 **不会发送请求。**

2. 刷新页面，虽然地址栏的网址是`http://localhost:3000/#/page/about`，但是实际上请求的是 `http://localhost:3000/` ，也就是访问项目的根目录 `/public` ，默认返回 `index.html` 文件。

   ::: danger

   **『哈希路由』** 的特点：**<font color="red">`#` 及其后面的内容不会作为浏览器的请求内容。</font>**

   :::

3. 后续原理同本小节 2.1
