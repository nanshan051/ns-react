---
title: Switch 组件
comments: true
tags:
  - Switch
---

## 1. 路由匹配规则

React 在进行路由匹配时，会从上到下依次进行匹配。通常情况下：

- 不管是否匹配上，都会遍历所有路由。
- 如果匹配上了多个路由，就加载多个路由组件。

通过示例更容易理解：

App.jsx：

```jsx
import About from "./pages/About";
import Home from "./pages/Home";
import Test from "./pages/Test";

// 这里配置了两个相同的路由/about，分别对应不同的组件
<Route path="/about" component={About} />
<Route path="/home" component={Home} />
<Route path="/about" component={Test} />
```

pages/Test/index.jsx：

```jsx
import React, { Component } from "react";

export default class Test extends Component {
  render() {
    return <h3>我是Test的内容</h3>;
  }
}
```

效果：

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/4/1.png')" alt="foo">

从图中可以看出，当访问 `/about` 时，会同时匹配到两个路由，因此会加载两个组件：About 和 Test。

说明 **路由匹配时，会遍历所有路由，且加载所有匹配的组件。**

## 2. Switch 组件

为了解决上述问题，可以使用 `Switch` 组件：**一旦匹配上某个路由，后续路由将不再遍历。**

用法：在所有路由外层，包裹一个 `Switch` 组件。

App.jsx：

```jsx
import { Switch, Route } from "react-router-dom";

<Switch>
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} />
  <Route path="/about" component={Test} />
</Switch>;
```

效果：

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/4/2.png')" alt="foo">
