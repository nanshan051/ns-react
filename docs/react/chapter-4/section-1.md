---
title: 跨域与代理
comments: true
tags:
  - 跨域
  - 代理
---

## 1. 前置说明

1. React 本身只关注于页面，并不包含发送 ajax 请求的代码。
2. 前端应用需要通过 `ajax` 请求与后台进行交互（ json 数据）。
3. react 应用中需要集成第三方 ajax 库（或自己封装）。

## 2. 常用的 ajax 请求库

1. `jQuery` : 比较重，如果需要另外引入不建议使用。
2. `axios` : 轻量级，建议使用。
   - 封装 `XMLHttpRequest` 对象的 ajax
   - `promise` 风格
   - 可以用在浏览器端和 `node` 服务器端
3. `fetch` : 原生函数，但老版本浏览器不支持。
   - **不再使用 XMLHttpRequest 对象提交 ajax 请求**
   - 为了兼容低版本的浏览器，可以引入兼容库 `fetch.js`
   - `promise` 风格

::: tip 注意

- `jQuery` 和 `axios` 都是对 `XMLHttpRequest` 对象的封装。

- 而 `fetch` 是浏览器内置的 API ，与`XMLHttpRequest`同级。

- 文档：

  - [jQuery](https://www.jquery123.com/)
  - [axios](https://github.com/axios/axios)
  - [fetch](https://github.com/github/fetch) ( [博客](https://segmentfault.com/a/1190000003810652))

- 教程：
  - [www.w3ccoo.com](https://www.w3ccoo.com/)
  - [www.w3school.com.cn](https://www.w3school.com.cn/)

:::

## 3. 服务器代码

使用 node.js 创建并启动服务器：

服务 1：学生信息。运行在 `http://localhost:5000` 。

```js
/* server1.js */
const express = require("express");
const app = express();

app.use((request, response, next) => {
  console.log("有人请求了服务器1了");
  console.log("请求来自于", request.get("Host"));
  console.log("请求的地址是", request.url);
  next();
});

app.get("/students", (request, response) => {
  const students = [
    { id: "001", name: "张三", age: 18 },
    { id: "002", name: "李四", age: 19 },
    { id: "003", name: "王五", age: 20 },
  ];
  response.send(students);
});

app.listen(5000, (err) => {
  if (!err) {
    console.log(
      "服务器1启动成功了，请求学生信息地址为：http://localhost:5000/students",
    );
  }
});
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/1.png')" alt="foo">

服务 2：汽车信息。运行在 `http://localhost:5001` 。

```js
/* server2.js */
const express = require("express");
const app = express();

app.use((request, response, next) => {
  console.log("有人请求了服务器2了");
  console.log("请求来自于", request.get("Host"));
  console.log("请求的地址是", request.url);
  next();
});

app.get("/cars", (request, response) => {
  const cars = [
    { id: "001", name: "蔚来", price: 199 },
    { id: "002", name: "小鹏", price: 299 },
    { id: "003", name: "理想", price: 399 },
  ];
  response.send(cars);
});

app.listen(5001, (err) => {
  if (!err) {
    console.log(
      "服务器2启动成功了，请求汽车信息地址为：http://localhost:5001/cars",
    );
  }
});
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/2.png')" alt="foo">

## 4. 前端代码

安装 axios：

```sh
yarn add axios@0.21.1
```

### 4.1. 入口文件

index.js:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 4.2. 根组件

App.js:

```js
import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  getStudentData = () => {
    // 请求url里加入了前缀 /api1
    axios.get("http://localhost:3000/api1/students").then(
      (response) => {
        console.log("成功了", response.data);
      },
      (error) => {
        console.log("失败了", error);
      },
    );
  };

  getCarData = () => {
    // 请求url里加入了前缀 /api2
    axios.get("http://localhost:3000/api2/cars").then(
      (response) => {
        console.log("成功了", response.data);
      },
      (error) => {
        console.log("失败了", error);
      },
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.getStudentData}>点我获取学生数据</button>
        <button onClick={this.getCarData}>点我获取汽车数据</button>
      </div>
    );
  }
}
```

启动项目：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/3.png')" alt="foo">

## 5. 跨域问题

### 5.1. 浏览器同源策略

**『 同源策略（Same-Origin Policy）』** 是浏览器为了安全而实施的规则，**<font color="red">仅适用于浏览器，服务器无此限制。</font>**

同源是指：`协议`、`域名`、`端口号` 都相同。

::: danger 限制

不满足 **『 同源策略 』** 会导致：

1. `LocalStorage` 、 `SessionStorage` 、`Cookie` 等浏览器内存无法跨域访问。
2. `DOM` 节点无法跨域操作。
3. `Ajax` 请求无法跨域请求。

:::

::: tip 特殊情况

以下三种标签允许跨域加载资源：

1. `<img src="xxx">`：图片
2. `<link href="xxx">`：样式
3. `<script src="xxx">`：脚本

:::

### 5.2. 什么是跨域？

**『 跨域（Cross-Origin）』** 是指：一个网页请求另一个网页的资源时，不满足同源策略，无法访问该资源。

> <br/>
> 把访问资源的过程简单分为三步：
>
> 1. 浏览器向服务器发送 `Ajax` 请求。
> 2. 服务器处理请求并返回响应数据。
> 3. 浏览器接收服务器的响应数据。

对于以上过程，浏览器的同源策略限制的是最后一步：接收数据。

**浏览器接收服务器的响应数据时，检查是否同源，如果不满足同源策略，则将响应数据拦截下来。**

即 **<font color="red">跨域发生时，请求已经发送，服务器也已经处理了请求并返回响应数据，只是浏览器在接收数据时被拦截。</font>**

### 5.3. 如何解决跨域？

常见的解决方案主要有以下几种：

1. **JSONP**：

   - 利用了 `<script>` 标签的 `src` 加载不受束缚，从而可以跨域访问。
   - 服务器需要返回一个回调函数，浏览器接收到响应后自动调用该回调函数。
   - 只支持 `GET` 请求。

2. **CORS**：

   - 允许服务器设置特定的 HTTP 头来告诉浏览器允许跨域访问：`'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'` 。

3. **WebSocket**：

   - 对 `WebSocket` 的跨域检测由服务器来完成。

4. **代理服务器**：

   - 通过在同源的服务器上设置代理，让代理服务器转发请求和响应 。
   - 代理服务器可以是同源服务器，也可以是开启了 `CORS` 的不同源服务器，前端本地开发时一般是前者。

    <img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/4.png')" alt="foo">

5. **Nginx**

   - 也是代理的一种，通过 `nginx` 软件来配置和启动代理服务器。

6. **postMessage**
   - 页面中通过 `iframe` 嵌入其他页面，二者可以通过 `postMessage` 方法进行跨域通信。

参考：[https://juejin.cn/post/7017614708832206878#heading-8](https://juejin.cn/post/7017614708832206878#heading-8)

## 5. 配置代理

前端工程运行在 `http://localhost:3000` ，而服务 1 运行在 `http://localhost:5000`，服务 2 运行在 `http://localhost:5001` 。

由于前端工程与服务的 **端口号不同**，受限于浏览器的 **同源策略** ，无法接收到服务器响应的数据。

需要通过 **配置代理** 来完成通信。（注意：每次修改代理配置后，都需要 **重新启动项目** 才能生效。）

### 5.1. 方式一

在 `package.json` 中添加如下配置：

```json
"proxy": "http://localhost:5000"
```

::: tip 优缺点

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：**不能配置多个代理**。
3. 工作方式：上述方式配置代理，**当请求了 3000 不存在的资源时，那么该请求会转发给 5000 （优先匹配前端资源）**

:::

### 5.2. 方式二

在 `src` 目录下创建代理配置文件 `setupProxy.js` ：

```js
// http 代理中间件
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    // 遇见/api1前缀的请求，就会触发该代理配置
    createProxyMiddleware("/api1", {
      target: "http://localhost:5000", // 请求转发给谁
      changeOrigin: true, // 控制服务器收到的请求头中Host的值
      pathRewrite: { "^/api1": "" }, // 重写请求路径(必须)
    }),
    createProxyMiddleware("/api2", {
      target: "http://localhost:5001",
      changeOrigin: true,
      pathRewrite: { "^/api2": "" },
    }),
  );
};
```

原理图如下：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/5.png')" alt="foo">

::: tip 注意

1. 代理配置文件 `setupProxy.js` 必须放在 `src` 目录下。
2. react 脚手架会自动识别并使用这个代理配置文件（将其加入到 `webpack` 中）。
3. 代理配置文件需要采用 `Common JS` 语法编写。

:::

::: tip 优缺点

1. 优点：**可以配置多个代理，可以灵活的控制请求是否走代理。**
2. 缺点：配置繁琐，前端请求资源时 **必须加前缀**。

:::

## 6. 效果

服务 1 监听：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/6.png')" alt="foo">

服务 2 监听：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/7.png')" alt="foo">

页面效果：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/1/8.gif')" alt="foo">
