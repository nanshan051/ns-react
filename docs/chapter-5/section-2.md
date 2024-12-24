---
title: 路由的基本使用
comments: true
tags:
  - Router
  - Route
---

## 1. react-router-dom

1. react 的一个插件库
2. 专门用来实现一个 SPA 应用
3. 基于 react 的项目基本都会用到此库

```sh
# 安装
yarn add react-router-dom@5
```

## 2. 路由的基本使用

1. 明确好界面中的导航区、展示区
2. **导航区的 a 标签改为 Link 标签**，这样点击链接时不会刷新页面
   - 示例：`<Link to="/demo">Demo</Link>`
3. **展示区写 Route 标签**，进行路径的匹配
   - 示例：`<Route path="/demo" component={Demo} />`
4. `<App>` 的最外层需要包裹一个 `<BrowserRouter>` 或 `<HashRouter>`，对路由进行统一管理

::: tip 注意：

1. 路由工作流程：  
   （1）**点击路由链接 `<Link>` 会根据 `to` 值修改浏览器地址中的 `path`。**  
   （2）路由器监听 path 变化，**根据 `path` 渲染对应的路由组件 `<Route>`。**
2. Link、Route、BrowserRouter、HashRouter 都是 **`react-router-dom` 自带的核心组件**，采用 **分别暴露** 的方式对外暴露。

:::

## 3. 案例

### 3.1. src 目录

```sh
src
├── App.jsx
├── components         # 一般组件放在这里
|  └── Header
|     └── index.jsx
├── index.js
└── pages              # 页面组件放在这里
   ├── About
   |  └── index.jsx
   └── Home
      └── index.jsx
```

### 3.2. 入口文件

index.js：

```js{8-11}
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    {/* <App> 的最外层需包裹一个 <BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
```

::: warning

react 严格模式 `<React.StrictMode>` 会导致组件 `render()` 函数执行两次，这里为了避免重复打印，关闭了严格模式。

:::

### 3.3. 根组件

App.jsx：

```jsx{2,27-30,36-38}
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <Header />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 原生html中，靠<a>标签跳转不同的页面 */}
              {/*
                  <a className="list-group-item" href="./about.html">About</a>
                  <a className="list-group-item active" href="./home.html">Home</a>
              */}

              {/* 在React中靠路由链接实现切换组件 */}
              {/* 编写路由链接 */}
              <Link className="list-group-item" to="/about">About</Link>
              <Link className="list-group-item" to="/home">Home</Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Route path="/about" component={About} />
                <Route path="/home" component={Home} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

### 3.4. 一般组件

#### Header

components/Header/index.jsx：

```jsx
import React, { Component } from "react";

export default class Header extends Component {
  render() {
    console.log("Header接收到的props是", this.props);
    return <h2>React Router Demo</h2>;
  }
}
```

### 3.5. 路由组件

#### About

pages/About/index.jsx：

```jsx
import React, { Component } from "react";

export default class About extends Component {
  render() {
    console.log("About接收到的props是", this.props);
    return <h3>我是About的内容</h3>;
  }
}
```

#### Home

pages/Home/index.jsx：

```jsx
import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return <h3>我是Home的内容</h3>;
  }
}
```

### 3.6 效果

<img class="zoomable" :src="$withBase('/images/screenshot/5/2/1.gif')" alt="foo">

## 4. 一般组件 vs 路由组件

1. **写法不同：**

   - 一般组件：`<Demo/>`
   - 路由组件：`<Route path="/demo" component={Demo} />`
   <p></p>

2. **存放位置不同：**

   - 一般组件：`components`
   - 路由组件：`pages`
   <p></p>

3. **<font color="red">接收到的 props 不同：</font>**
   - 一般组件：写组件标签时传递了什么，就能接收到什么
   - 路由组件：接收到以下固定属性（仅展示常用的）：
   <p></p>

```js
"history": {
    "push": push(path, state) {},
    "replace": replace(path, state) {},
    "goBack": goBack() {},
    "goForward": goForward() {},
    "go": go(n) {},
},
"location": {
    "pathname": "/about",
    "search": "",  // 路由传参 search
    "state": undefined  // 路由传参 state
},
"match": {
    "path": "/about",
    "url": "/about",
    "isExact": true, // 当前路由组件是否是精确匹配到的
    "params": {}  // 路由传参 params
}
```

一般组件 Header 的 props：

<img class="zoomable" :src="$withBase('/images/screenshot/5/2/2.png')" alt="foo">

路由组件 About 组件的 props：

<img class="zoomable" :src="$withBase('/images/screenshot/5/2/3.png')" alt="foo">
````
