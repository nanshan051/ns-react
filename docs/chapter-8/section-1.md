---
title: setState
comments: true
tags:
  - setState
---

本章我们将学习 react 的一些扩展知识，为了深入理解，新建一个项目 `react_extension`。

`setState` 是 React 中用于更新组件状态的方法，有两种写法：**『对象式』** 和 **『函数式』**。前面的案例中我们使用的是对象式，本节将补充函数式的使用，并对两种写法进行比较。

## 1. 项目目录

```sh
E:\projects\react\demo\react_extension
├── package.json
├── public
|  ├── favicon.ico
|  └── index.html
├── src
|  ├── App.jsx
|  ├── components
|  |  └── 1_setState
|  |     └── index.jsx
|  └── index.js
└── yarn.lock
```

## 2. 代码及效果

src 文件夹下的主要代码如下：

### 2.1. 入口文件

index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### 2.2. 根组件

App.jsx：

```jsx
import React, { Component } from "react";
import Demo from "./components/1_setState";

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

### 2.3. Demo 组件

components/1_setState/index.jsx：

```jsx
import React, { Component } from "react";

export default class Demo extends Component {
  state = { count: 0 };
  add = () => {
    // 方式一：对象式
    // const {count} = this.state
    // this.setState({ count: count + 1 });

    // 方式二：函数式
    this.setState((state, props) => ({ count: state.count + 1 }));
  };
  render() {
    return (
      <div>
        <h1>当前求和为：{this.state.count}</h1>
        <button onClick={this.add}>点我+1</button>
      </div>
    );
  }
}
```

### 2.4. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/8/1/1.gif')" alt="foo">

## 3. 对象式

`setState` 的对象式用法如下：

```js
setState(stateChange, [callback]);
```

::: tip

1. `stateChange` 是一个 **『对象』**，表示需要更新的状态。

2. `callback` 是可选的，它是一个回调函数，在状态更新完成、界面也更新后（ `render` 调用后）才执行。

:::

## 4. 函数式

`setState` 的函数式用法如下：

```js
setState(updater, [callback]);
```

::: tip

1. `updater` 是一个 **『函数』**，接收 `state` 和 `props` 作为参数，返回一个 `stateChange` 对象。

2. `callback` 是可选的，它是一个回调函数，在状态更新完成、界面也更新后（ `render` 调用后）才执行。

:::

## 5. callback 回调函数

`setState` 的第二个参数 `callback` 回调函数，作用与 `$nextTick` 类似，可以获取更新后的数据。

例如，在 Demo 组件的 add 函数中，可以这样使用：

```js
this.setState(
  (state, props) => ({ count: state.count + 1 }),
  // 回调函数，读取更新后的数据
  () => console.log(this.state.count),
);
```

## 6. 总结

1. 对象式的 `setState` 是函数式的 `setState` 的简写方式（语法糖）。
2. 使用原则：  
   （1）如果新状态不依赖于原状态，则使用对象式。  
   （2）如果新状态依赖于原状态，则使用函数式。  
   （3）如果需要在 `setState` 后立即获取更新后的数据，则使用第二个参数（ `callback` ）中读取。
