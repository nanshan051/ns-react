---
title: 错误边界
comments: true
tags:
  - 错误边界
  - Error Boundary
  - getDerivedStateFromError
  - componentDidCatch
---

## 1. 理解

**『错误边界』**（Error Boundary）是 React 提供的一种机制，用于捕获后代组件的渲染错误，从而避免整个应用崩溃。

## 2. 特点

::: tip

**只能捕获『后代组件』生命周期产生的错误**，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误。

:::

## 3. 用法

错误边界的用法：`getDerivedStateFromError` 配合 `componentDidCatch` 。

```jsx
// 生命周期钩子，一旦后代组件报错，就会触发
static getDerivedStateFromError(error) {
  console.log(error);
  // 在render之前触发，返回新的state
  return { hasError: error };
}

// 生命周期钩子
componentDidCatch(error, info) {
  // 统计页面的错误，发送请求到后台
  console.log(error, info);
}
```

## 4. 正常情况

### 4.1. src 目录

```sh
src
├── App.jsx
├── components
|  └── 8_错误边界
|     ├── Child.jsx
|     └── Parent.jsx
└── index.js
```

### 4.2. 入口文件

index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default root;
```

### 4.3. 根组件

App.jsx：

```jsx
import React, { Component } from "react";
import Demo from "./components/8_错误边界/Parent";

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

### 4.4. Parent 组件

components/8\_错误边界/Parent.jsx：

```jsx
import React, { Component } from "react";
import Child from "./Child";

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h2>我是Parent组件</h2>
        <Child />
      </div>
    );
  }
}
```

### 4.5. Child 组件

components/8\_错误边界/Child.jsx：

```jsx
import React, { Component } from "react";

export default class Child extends Component {
  state = {
    // 正常情况：后台返回数组
    persons: [
      { id: "001", name: "张三", age: 18 },
      { id: "002", name: "李四", age: 19 },
      { id: "003", name: "王五", age: 20 },
    ],
  };
  render() {
    return (
      <div>
        <h2>我是Child组件</h2>
        <ul>
          {this.state.persons.map((person) => {
            return (
              <li key={person.id}>
                {person.name}--{person.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
```

效果如下：

<img class="zoomable" :src="$withBase('/images/screenshot/8/8/1.png')" alt="foo">

## 5. 异常情况

当后台返回数据类型异常时，如将数组 `persons` 的值设为字符串：

```jsx
import React, { Component } from "react";

export default class Child extends Component {
  state = {
    // 异常情况：后台返回的不是数组，而是字符串
    persons: "",
  };
  render() {
    return (
      <div>
        <h2>我是Child组件</h2>
        <ul>
          {this.state.persons.map((person) => {
            return (
              <li key={person.id}>
                {person.name}--{person.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
```

整个页面会崩溃报错：

<img class="zoomable" :src="$withBase('/images/screenshot/8/8/2.png')" alt="foo">

### 5.1. 设置错误边界

在 `Parent` 组件中，通过 `getDerivedStateFromError` 生命周期钩子设置错误边界。

```jsx
import React, { Component } from "react";
import Child from "./Child";
import "./index.css";

export default class Parent extends Component {
  state = { hasError: "" }; // 用于标识子组件是否产生错误
  // 当Parent的子组件出现报错时，会触发getDerivedStateFromError调用，并携带错误信息
  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError", error);
    return { hasError: error };
  }
  render() {
    return (
      <div className="component-Parent">
        <h2>我是Parent组件</h2>
        {/* 设置错误边界（若后代组件发生错误，则显示设置的默认内容） */}
        {this.state.hasError ? <h2>网络不稳定，请稍后再试</h2> : <Child />}
      </div>
    );
  }
}
```

### 5.2. 捕获错误

在 `Parent` 组件中，通过 `componentDidCatch` 生命周期钩子捕获错误。

```jsx
// 用于统计错误，反馈给服务器，用于通知编码人员进行bug的解决
componentDidCatch(error, info) {
  console.log("componentDidCatch", error, info);
}
```

### 5.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/8/8/3.png')" alt="foo">

从上图可以看出，子组件发生错误后，父组件通过 `getDerivedStateFromError` 和 `componentDidCatch` 方法捕获到错误，并显示了默认内容。
