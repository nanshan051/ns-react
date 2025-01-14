---
title: 计算器：react-redux的基本使用
comments: true
tags:
  - 案例
  - react-redux
  - connect
---

在上小节《计算器：redux 异步 action 版》的基础上，本节将增加 `react-redux` 的使用，只展示变更的代码。

## 1. react-redux 简介

`react-redux` 是 `React` 和 `Redux` 的官方结合库，**用于简化 React 应用中的 Redux 使用。**

::: tip

主要功能：

- 提供 `Provider` 组件，将 Redux 的 store 传递给每一个子组件。
- 提供 `connect` 函数，用于连接 UI 组件与 Redux store。

:::

react-redux 的工作流程如下：

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/7/1.png')" alt="foo">

::: tip react-redux 理解

1. 所有的 **『UI 组件』** 都应该在外层再包裹一个 **『容器组件』**，它们是父子关系。

2. 明确两个概念：
   - **『UI 组件』**：只负责页面的呈现、交互等。**不能使用 redux 的 api，只能通过容器组件间接调用。**
   - **『容器组件』**：**负责和 `redux` 通信，并通过 `props` 给 UI 组件传递：**
     - （1）redux 中保存的 **状态**，
     - （2）**用于操作状态的方法**。

:::

安装 react-redux ：

```sh
yarn add react-redux@7.2.2
```

## 2. 代码

### 2.1. src 目录

在 src 目录下，新增 `containers` 文件夹，用于存放容器组件。

```sh
src
├── App.jsx
├── components            # UI 组件
|  └── Count
|     └── index.jsx
├── containers            # 容器组件（新增）
|  └── Count
|     └── index.jsx
├── index.js
└── redux
   ├── constant.js
   ├── count_action.js
   ├── count_reducer.js
   └── store.js
```

### 2.2. Count 容器组件

借助 `connect` 函数，生成 **『容器组件』，将 『UI 组件』与 『Redux store』 连接起来。**

::: tip

1.  `connect()` 有两个主要参数：**mapStateToProps** 和 **mapDispatchToProps**，都是可选的。\*\*

    - （1）**`mapStateToProps`** 函数
      - 返回一个对象，对象中的 key、value 会作为 `props` 传递给 UI 组件。
      - 用于 **<font color="red">传递状态</font>**。

    <p/>

    - （2）**`mapDispatchToProps`** 函数
      - 返回一个对象，对象中的 key、value 会作为 `props` 传递给 UI 组件。（对 `dispatch` 进行封装，**自定义** 操作状态的方法。）
      - 用于 **<font color="red">传递操作状态的方法</font>**。

     <p/>

2.  `connect()` 返回一个 **『包装函数』**。包装函数接受一个 UI 组件，并返回一个 **『容器组件』。**

3.  `connect(mapStateToProps, mapDispatchToProps)(Component)` 可以分为两步（对照流程图理解）：

    - **第 1 步**：从 **『Redux store』** 中获取状态并封装操作状态的方法：

      - **`connect()` 接收两个参数（状态映射和方法映射），将状态和操作状态的方法，映射为额外的 `props`，返回一个 包装函数。**

    <p/>

    - **第 2 步**：将状态和操作状态的方法传递给 **『UI 组件』**:

      - **包装函数接收一个 UI 组件，返回一个容器组件，将 UI 组件包裹其中，并将额外的 `props` 注入到 UI 组件中。**

:::

[参考：剖析 Redux 提供的 connect 函数的原理](https://juejin.cn/post/7252584767594217531)

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

/*
    mapStateToProps函数：
    1.返回一个对象，对象中的 key、value 会作为 `props` 传递给 UI 组件。
    2.用于传递状态。
*/
function mapStateToProps(state) {
  return { count: state };
}

/*
    mapDispatchToProps函数：
    1.返回一个对象，对象中的 key、value 会作为 `props` 传递给 UI 组件。
    （对 `dispatch` 进行封装，自定义操作状态的方法。）
    2.用于传递操作状态的方法。
*/
function mapDispatchToProps(dispatch) {
  return {
    jia: (number) => dispatch(createIncrementAction(number)),
    jian: (number) => dispatch(createDecrementAction(number)),
    jiaAsync: (number, time) =>
      dispatch(createIncrementAsyncAction(number, time)),
  };
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
```

### 2.3. App 组件

::: tip

使用组件时，用的是 **『容器组件』**， 而不是 『UI 组件』。

- **容器组件中的 `store` 是靠 `props` 传进去的，而不是在容器组件中直接引入。**

:::

App.jsx：

```jsx
import React, { Component } from "react";
import Count from "./containers/Count"; // 引入容器组件
import store from "./redux/store";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 给容器组件传递store */}
        <Count store={store} />
      </div>
    );
  }
}
```

### 2.4. Count UI 组件

::: tip

『UI 组件』中无需编写 Redux 相关操作，可以直接通过 `props` 获取『容器组件』传递过来的状态和操作状态的方法。

:::

components/Count/index.jsx：

```jsx
import React, { Component } from "react";

export default class Count extends Component {
  // 加法
  increment = () => {
    const { value } = this.selectNumber;
    // 调用容器组件通过props传递过来的操作状态的方法
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
    return {
      /* 省略原有固定结构 */
    };
  }
}
```

## 3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/7/2.gif')" alt="foo">

## 4. 总结

::: tip

1. 简单来说，`connect()()` 就是在 UI 组件外面再包裹一层容器组件，所有与 redux 相关的操作都在这个容器组件中完成，而容器组件会将 redux 的状态和操作状态的方法作为 props 传递给 UI 组件。

2. **这样做的目的是：将 UI 组件与 redux 解耦，UI 组件就正常编写就行，不用关心 redux 相关操作。**

:::
