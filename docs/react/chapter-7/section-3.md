---
title: 计算器：纯react版
comments: true
tags:
  - 案例
---

为了更好的理解 redux，新创建一个项目 `redux_test` （参考 3.1 小节），实现一个计算器。

本小节先采用纯 `react` 实现，以便后续与 redux 版进行比较。

## 1. 项目目录

```sh
redux_test
├── package.json
├── public
|  └── index.html
├── README.md
├── src
|  ├── App.jsx
|  ├── components
|  |  └── Count
|  |     └── index.jsx   # 计算器
|  └── index.js
└── yarn.lock
```

## 2. 代码

### 2.1. 主页面

public/index.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 2.2. 入口文件

src/index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### 2.3. App 组件

src/App.jsx：

```jsx
import React, { Component } from "react";
import Count from "./components/Count";

export default class App extends Component {
  render() {
    return (
      <div>
        <Count />
      </div>
    );
  }
}
```

### 2.4. Count 组件

src/components/Count/index.jsx：

```jsx
import React, { Component } from "react";

export default class Count extends Component {
  state = { count: 0 };
  // 加法
  increment = () => {
    const { count } = this.state;
    const { value } = this.selectNumber;
    this.setState({ count: count + value * 1 });
  };
  // 减法
  decrement = () => {
    const { count } = this.state;
    const { value } = this.selectNumber;
    this.setState({ count: count - value * 1 });
  };
  // 奇数再加
  incrementIfOdd = () => {
    const { count } = this.state;
    if (count % 2 !== 0) {
      const { value } = this.selectNumber;
      this.setState({ count: count + value * 1 });
    }
  };
  // 异步加
  incrementAsync = () => {
    const { count } = this.state;
    const { value } = this.selectNumber;
    setTimeout(() => {
      this.setState({ count: count + value * 1 });
    }, 500);
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>当前求和为：{count}</h1>
        <select ref={(e) => (this.selectNumber = e)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>
        &nbsp;&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;&nbsp;
      </div>
    );
  }
}
```

## 3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/3/1.gif')" alt="foo">
