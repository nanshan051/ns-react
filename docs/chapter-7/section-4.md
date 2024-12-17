---
title: 计算器：redux精简版
comments: true
tags:
  - 案例
---

在上一小节《计算器：纯 react 版》的基础上，本小节采用 `redux` 进行状态管理，实现计算器。

本小节没有用到 `action` ，所以是精简版，仅展示修改、新增的代码，后续同理。

## 1. src 目录

```sh
src
├── App.jsx
├── components
|  └── Count
|     └── index.jsx
├── index.js
└── redux                     # redux 相关文件
   ├── count_reducer.js       # reducer（初始化、加工状态）
   └── store.js               # store （存储状态）
```

## 2. 代码

### 2.1. store

redux/store.js：

::: tip

该文件专门用于暴露一个 store 对象，**整个应用只有一个 store 对象。**

:::

```js
// 引入createStore，专门用于创建redux中最为核心的store对象
import { createStore } from "redux";
// 引入为Count组件服务的reducer
import countReducer from "./count_reducer";
// 暴露store
export default createStore(countReducer);
```

### 2.2. reducer

redux/count_reducer.js：

::: tip

1. 该文件是用于创建一个为 Count 组件服务的 reducer，reducer 的本质就是一个函数。

2. `reducer` 函数会接到两个参数，分别为：**之前的状态 ( `preState` )，动作对象 ( `action` )。**

3. 初始化时：
   - `preState` 若不设默认值，则值为 `undefind`。
   - `action` 默认值是 `{type: "@@redux/INIT1.8.c.b.2"}`，其中 1.8.c.b.2 部分在每次初始化时的值都不同，这么做是为了与 switch 中各个 case 值区分，这样就能在初始化时执行 `default` 。

:::

```js
const initState = 0; // 初始化状态
export default function countReducer(preState = initState, action) {
  console.log("preState：", preState, "  ", "action：", action);
  const { type, data } = action;
  // 根据type决定如何加工数据
  switch (type) {
    case "increment": // 如果是加
      return preState + data;
    case "decrement": // 若果是减
      return preState - data;
    default:
      return preState;
  }
}
```

### 2.3. Count 组件

components/Count/index.jsx：

::: tip 注意：

1. **`redxu` 只负责状态管理，不关心页面重新渲染。** 所以要想实现『状态响应式』，**需要手动监听 redux 中状态的变化，重新渲染 Count 组件。**

2. 由于 **react 中直接调用 this.render() 不会触发组件的重新渲染**，可以采用 `this.setState({})` 触发重新渲染，不管给 setState( ) 传什么值，只要 setState( ) 调用了，就一定会触发重新渲染。

3. `action` 的作用是将动作类型和数据封装成一个对象，我们可以自己拼接动作对象，所以 action 不是必须的。

4. 可以通过 `store.getState()` 获取到 redux 中的状态。

:::

```jsx
import React, { Component } from "react";
// 引入store，用于获取redux中的状态
import store from "../../redux/store";

export default class Count extends Component {
  /*
    componentDidMount() {
      // 监听redux中状态的变化，重新渲染Count组件
      // react中直接调用this.render()不会触发组件的重新渲染
      // 可以采用this.setState({})触发重新渲染
      // 不管传什么值，只要setState调用了，就一定会触发重新渲染
      store.subscribe(() => {
        this.setState({});
      });
    }
  */

  // 加法
  increament = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: "increment", data: value * 1 });
  };
  // 减法
  decreament = () => {
    const { value } = this.selectNumber;
    store.dispatch({ type: "decrement", data: value * 1 });
  };
  // 奇数再加
  increamentIfOdd = () => {
    const count = store.getState();
    if (count % 2 !== 0) {
      const { value } = this.selectNumber;
      store.dispatch({ type: "increment", data: value * 1 });
    }
  };
  // 异步加
  increamentAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch({ type: "increment", data: value * 1 });
    }, 500);
  };
  render() {
    // 获取store中的状态
    const count = store.getState();
    console.log("state：", count);
    return (
      <div>
        <h1>当前求和为：{count}</h1>
        <select ref={(e) => (this.selectNumber = e)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increament}>+</button>&nbsp;&nbsp;
        <button onClick={this.decreament}>-</button>&nbsp;&nbsp;
        <button onClick={this.increamentIfOdd}>当前求和为奇数再加</button>
        &nbsp;&nbsp;
        <button onClick={this.increamentAsync}>异步加</button>&nbsp;&nbsp;
      </div>
    );
  }
}
```

### 2.4. 入口文件

index.jsx：

::: tip

当同一个状态被多个组件使用时，为了避免在每个组件中都编写状态监听和回调函数，可以改为 **在入口文件中编写状态监听和回调函数，每当状态发生变化时，重新渲染 App 组件，此时所有组件都会更新。**

:::

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// 监听redux中状态的变化，重新渲染App
store.subscribe(() => {
  root.render(<App />);
});
```

## 3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/7/4/1.gif')" alt="foo">
