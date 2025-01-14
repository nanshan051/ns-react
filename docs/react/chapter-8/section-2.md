---
title: lazyLoad
comments: true
tags:
  - lazyLoad
---

本小节主要讲解 React 的 `lazyLoad` （懒加载）功能。为了方便演示，引入 5.2 节中的路由组件及样式文件。

## 1. 普通加载

### 1.1. 项目目录

```sh
E:\projects\react\demo\react_extension
├── package.json
├── public
|  ├── css
|  |  └── bootstrap.css
|  ├── favicon.ico
|  └── index.html
├── src
|  ├── App.jsx
|  ├── components
|  |  └── 2_lazyLoad
|  |     ├── About
|  |     |  └── index.jsx
|  |     ├── Home
|  |     |  └── index.jsx
|  |     └── index.jsx
|  └── index.js
└── yarn.lock
```

### 1.2. 入口文件

src/index.jsx：

```js
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

src/App.jsx：

```jsx
import React, { Component } from "react";
import Demo from "./components/2_lazyLoad";

export default class App extends Component {
  render() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
}
```

### 1.4. Demo 组件

src/components/2_lazyLoad/index.jsx：

```jsx
import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/* 在React中靠路由链接实现切换组件--编写路由链接 */}
              <NavLink className="list-group-item" to="/about">
                About
              </NavLink>
              <NavLink className="list-group-item" to="/home">
                Home
              </NavLink>
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

### 1.5. 路由组件

#### Home 组件

src/components/2_lazyLoad/Home/index.jsx：

```jsx
import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return <h3>我是Home的内容</h3>;
  }
}
```

#### About 组件

src/components/2_lazyLoad/About/index.jsx：

```jsx
import React, { Component } from "react";

export default class About extends Component {
  render() {
    return <h3>我是About的内容</h3>;
  }
}
```

### 1.6. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/2/1.gif')" alt="foo">

从图中可以看出，用户第一次访问页面时，就将 `Home` 组件和 `About` 组件加载了（都包含在 `boundle.js` 文件中）。**访问 `/about` 或 `/home` 时，不会再发起请求。**

## 2. 按需加载

react 提供了 `lazy` 函数和 `Suspense` 组件，用于实现组件的按需加载。

### 2.1. lazy 函数

::: tip

- `lazy` 函数用于动态加载组件。
- 接收一个函数作为参数，该函数返回一个 Promise，Promise 解析时返回组件。

:::

src/components/2_lazyLoad/index.jsx：

```jsx
import React, { Component, lazy, Suspense } from "react";

// 普通加载
/* 
  import Home from "./Home";
  import About from "./About"; 
*/

// 按需加载
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
```

### 2.2. Suspense 组件

::: tip

- `Suspense` 组件用于处理动态加载的组件。
- 当动态加载的组件还没有加载完成时，可以显示一个备用的 UI（ `fallback` UI）。

:::

#### Demo 组件

src/components/2_lazyLoad/index.jsx：

```jsx
import React, { Component, lazy, Suspense } from "react";

// SusPense的fallback指定动态加载时的备用UI
<Suspense fallback={<h1>Loading......</h1>}>
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} />
</Suspense>;
```

fallback 指定的备用 UI 可以是组件，**备用 UI 组件需要直接引入，不能按需加载。**

src/components/2_lazyLoad/index.jsx：

```jsx
import React, { Component, lazy, Suspense } from "react";
import Loading from "./Loading";

// 备用UI可以是组件
<Suspense fallback={<Loading>}>
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} />
</Suspense>;
```

#### Loading 组件

src/components/2_lazyLoad/Loading/index.jsx：

```jsx
import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return <h1 style={{ color: "pink" }}>Loading......</h1>;
  }
}
```

### 2.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/2/2.gif')" alt="foo">

- 当用户第一次访问 `/about` 或 `/home` 时，React 会动态加载对应的组件。
- 在控制台中可以看到，**只有当用户点击导航链接时才会加载对应的组件，从而实现懒加载。**
