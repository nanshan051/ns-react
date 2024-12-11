---
title: 嵌套路由
comments: true
tags:
  - 嵌套路由
---

## 1. 项目代码

### 1.1. src 目录

```sh
src
├── App.jsx
├── components
|  ├── Header
|  |  └── index.jsx
|  └── MyNavLink
|     ├── index.css
|     └── index.jsx
├── index.js
└── pages
   ├── About
   |  └── index.jsx     # 1级路由组件
   └── Home
      ├── index.jsx     # 1级路由组件
      ├── Message
      |  └── index.jsx      # 2级路由组件
      └── News
         └── index.jsx      # 2级路由组件
```

### 1.2. 入口文件

index.js：

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

### 1.3. 根组件

App.jsx：

```jsx
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import MyNavLink from "./components/MyNavLink";
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
              {/* 编写路由链接 */}
              <MyNavLink to="/about">About</MyNavLink>
              <MyNavLink to="/home">Home</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Switch>
                  <Route path="/about" component={About} />
                  <Route path="/home" component={Home} />
                  {/* 默认重定向到 /about */}
                  <Redirect to="/about" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

### 1.4. 一级路由组件

#### About 组件

```jsx
import React, { Component } from "react";

export default class About extends Component {
  render() {
    return <h3>我是About的内容</h3>;
  }
}
```

#### Home 组件

```jsx
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MyNavLink from "../../components/MyNavLink";
import Message from "./Message";
import News from "./News";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home的内容</h3>
        <div>
          <ul className="nav nav-tabs">
            <li>
              <MyNavLink to="/home/news">News</MyNavLink>
            </li>
            <li>
              <MyNavLink to="/home/message">Message</MyNavLink>
            </li>
          </ul>
          {/* 注册路由 */}
          <Switch>
            <Route path="/home/news" component={News} />
            <Route path="/home/message" component={Message} />
            {/* 默认重定向到 /home/news */}
            <Redirect to="/home/news" />
          </Switch>
        </div>
      </div>
    );
  }
}
```

### 1.5. 二级路由组件

#### News 组件

```jsx
import React, { Component } from "react";

export default class News extends Component {
  render() {
    return (
      <ul>
        <li>news001</li>
        <li>news002</li>
        <li>news003</li>
      </ul>
    );
  }
}
```

#### Message 组件

```jsx
import React, { Component } from "react";

export default class Message extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <a href="/message1">message001</a>&nbsp;&nbsp;
          </li>
          <li>
            <a href="/message2">message002</a>&nbsp;&nbsp;
          </li>
          <li>
            <a href="/message/3">message003</a>&nbsp;&nbsp;
          </li>
        </ul>
      </div>
    );
  }
}
```

## 2. 效果与分析

### 2.1. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/5/8/1.gif')" alt="foo">

### 2.2. 分析

1. 访问 `http://localhost:3000` 时，此时注册了两个路由：`/about` 和 `/home`，且两个路由都没有匹配上，所以路由重定向到 `Redirect` 指定的路由 `/about`，组件 `<About>` 挂载。

2. 点击路由链接 `'Home'` （to 值为 `/home`），路由 `/home` 匹配上了，所以组件 `<Home>` 挂载。

3. 组件 `<Home>` 挂载时，会注册两个新的子路由：`/home/news` 和 `/home/message`，并进行路由匹配。此时当前 path 为`/home`，两个子路由没有匹配上，所以路由会重定向到 `Redirect` 指定的路由 `/home/news` ，子组件 `<Message>` 挂载。

## 3. 总结

::: tip 嵌套路由：

1. 注册子路由时 **要写上父路由的 path 值。**
2. 路由的匹配是 **按照注册路由顺序进行的。**

:::
