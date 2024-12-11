---
title: withRouter() 方法
comments: true
tags:
  - withRouter()
---

## 1. 一般组件

上一小节《编程式路由导航》中，通过调用 **路由组件** 的 `props.history` 对象上的方法，实现了编程式导航。

但是，如果组件不是路由组件，那么 `props.history` 对象是不存在的，比如 `<Header>` 。

```jsx
import React, { Component } from "react";

export default class Header extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
  goForward = () => {
    this.props.history.goForward();
  };
  render() {
    return (
      <div>
        <h2>React Router Demo</h2>&nbsp;&nbsp;
        <button onClick={this.goBack}>后退</button>&nbsp;&nbsp;
        <button onClick={this.goForward}>前进</button>
      </div>
    );
  }
}
```

<img class="zoomable" :src="$withBase('/images/screenshot/5/14/1.gif')" alt="foo">

从图中可以看出，**一般组件**（ `<Header>` ）的 props 是空的，没有 `history` 属性，故进行编程式导航时报错。

## 2. withRouter() 方法

如何使一般组件也能进行编程式导航呢？

可以借助 `react-router-dom` 中的 `withRouter()` 方法。

```jsx
import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // 引入 withRouter() 方法

class Header extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
  goForward = () => {
    this.props.history.goForward();
  };
  render() {
    return (
      <div>
        <h2>React Router Demo</h2>&nbsp;&nbsp;
        <button onClick={this.goBack}>后退</button>&nbsp;&nbsp;
        <button onClick={this.goForward}>前进</button>
      </div>
    );
  }
}

// 导出组件时调用 withRouter() 方法
export default withRouter(Header);
```

<img class="zoomable" :src="$withBase('/images/screenshot/5/14/2.gif')" alt="foo">

::: tip withRouter() 方法

- **可以加工一般组件，让一般组件具备路由组件所特有的 API**（如 history 对象）
- 返回一个新组件，这个新组件是包装后的组件

:::
