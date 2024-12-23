---
title: 计算器：react-redux优化
comments: true
tags:
  - 案例
  - Provider
---

在上一小节《计算器：react-redux 的使用》的基础上，本小节进行一些优化，只展示变更的代码。

## 1. mapDispatchToProps 对象

`mapDispatchToProps` 可以是一个函数，也可以是一个 **对象**。推荐使用对象形式，这样更直观简洁。

### 1.1. Count 容器组件

containers/Count/index.jsx：

```jsx
//引入Count的UI组件
import CountUI from "../../components/Count";

//引入action creator
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";

//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
  // mapStateToProps函数
  (state) => ({ count: state }),

  // mapDispatchToProps的一般写法（函数形式：需手动dispatch）
  /*
    dispatch => ({
      jia:number => dispatch(createIncrementAction(number)),
      jian:number => dispatch(createDecrementAction(number)),
      jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
    })
  */

  // mapDispatchToProps的简写（对象形式：react-redux帮我们dispatch）
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    jiaAsync: createIncrementAsyncAction,
  },
)(CountUI);
```

::: tip mapDispatchToProps

- 函数形式：需要手动 `dispatch` 。

- **对象形式：不需要手动 `dispatch` ，react-redux 帮我们 `dispatch` 。**

:::

### 1.2. react-redux 源码

<img class="zoomable" :src="$withBase('/images/screenshot/7/8/1.png')" alt="foo">

### 1.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/7/8/2.gif')" alt="foo">

由 react-redux 源码和效果可以看出，当 `mapDispatchToProps` 写成对象时，虽然映射的方法是 `action creator` ，但是当我们调用方法时，react-redux 会帮我们将 action 对象 `dispatch` 。

## 2. 无需编写『状态响应式』

::: tip

**`connect` 函数已经帮我们实现了『状态响应式』，内部监听状态的变化，重新渲染『容器组件』。**

:::

### 2.1. 入口文件

所以，可以去掉入口文件中自己手动实现的『状态响应式』。

index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// // 监听redux中状态的变化，重新渲染App
// store.subscribe(() => {
//   root.render(<App />);
// });
```

### 2.2. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/7/8/3.gif')" alt="foo">

## 3. Provider 组件传递 store

::: tip

**react-redux 提供 `Provider` 组件，将 Redux 的 store 传递给每一个子组件。** 这样就无需给每个容器组件传递 store 了。

:::

### 3.1. 入口文件

在入口文件中使用 `Provider` 包裹 App 组件，并将 `store` 传给 Provider。

index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  {/* Provider统一传递store */}
  <Provider store={store}>
    <App />
  </Provider>,
);
```

### 3.2. App 组件

所以，在 App 组件中，可以取消给容器传递 store。

App.jsx：

```jsx
import React, { Component } from "react";
import Count from "./containers/Count";

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

### 3.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/7/8/4.gif')" alt="foo">

## 4. UI 组件与容器组件整合

::: tip

将 UI 组件和容器组件整合到一个文件中，这样更符合 react 的代码组织规范。

:::

### 4.1. src 目录

将 UI 组件与容器组件整合成一个文件，即： UI 组件虽然定义了，但是暴露出去的还是容器组件。

```sh
src
├── App.jsx
├── containers
|  └── Count
|     └── index.jsx        # 整合后的容器组件(内部定义了UI组件)
├── index.js
└── redux
   ├── constant.js
   ├── count_action.js
   ├── count_reducer.js
   └── store.js
```

### 4.2. 整合后的容器组件

containers/Count/index.jsx：

```jsx
import React, { Component } from "react";
//引入action creator
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

// 定义UI组件
class Count extends Component {
  // 加法
  increment = () => {
    const { value } = this.selectNumber;
    // 调用容器组件传递过来的操作状态的方法
    this.props.jia(value * 1);
  };
  // 减法
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.jian(value * 1);
  };
  // 奇数再加
  incrementIfOdd = () => {
    if (this.props.count % 2 !== 0) {
      const { value } = this.selectNumber;
      this.props.jia(value * 1);
    }
  };
  // 异步加
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.jiaAsync(value * 1, 500);
  };
  render() {
    // 获取容器组件通过props传递过来的状态
    const { count } = this.props;
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
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>
        &nbsp;&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>&nbsp;&nbsp;
      </div>
    );
  }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
  // mapStateToProps函数
  (state) => ({ count: state }),

  // mapDispatchToProps的一般写法（函数形式：需手动dispatch）
  /*
    dispatch => ({
      jia:number => dispatch(createIncrementAction(number)),
      jian:number => dispatch(createDecrementAction(number)),
      jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
    })
  */

  // mapDispatchToProps的简写（对象形式：react-redux帮我们dispatch）
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    jiaAsync: createIncrementAsyncAction,
  },
)(Count);
```

### 4.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/7/8/5.gif')" alt="foo">
