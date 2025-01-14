---
title: 计算器：redux完整版
comments: true
tags:
  - 案例
  - action creator
---

在上一小节《计算器：redux 精简版》中我们自己拼接了动作对象，在本小节中我们使用 `action creator` 创建动作对象。

## 1. src 目录

在 src\redux 目录下，新建 `constant.js` 和 `count_action.js` 文件。

```sh
src
├── App.jsx
├── components
|  └── Count
|     └── index.jsx
├── index.js
└── redux
   ├── constant.js       # 定义常量
   ├── count_action.js   # action creator（动作创建者：创建动作对象）
   ├── count_reducer.js
   └── store.js
```

## 2. 代码

### 2.1. 定义常量

redux/constant.js：

::: tip

该文件是用于定义 action 对象中 type 类型的常量值，目的：便于管理的同时防止程序员单词写错。

:::

```js
export const INCREMENT = "increment";
export const DECREMENT = "decrement";
```

### 2.2. action creator

redux/count_action.js：

::: tip

**暴露的每个函数都是一个 `action creator` （动作创建者），返回值是一个 `action` （动作对象）。**

- **箭头函数体内若直接返回一个对象，则可以简写为用小括号 `()` 包裹该对象：`() => ({...})` 。**

:::

```js
import { INCREMENT, DECREMENT } from "./constant";

// 函数是action creator（动作创建者），返回值是action（动作对象）。
export const createIncrementAction = (data) => ({ type: INCREMENT, data });
export const createDecrementAction = (data) => ({ type: DECREMENT, data });
```

### 2.3. reducer

redux/count_reducer.js：

该文件中的动作类型常量也从 constant.js 中引入。

```js
import { INCREMENT, DECREMENT } from "./constant";

const initState = 0; // 初始化状态
export default function countReducer(preState = initState, action) {
  console.log("preState：", preState, "  ", "action：", action);
  const { type, data } = action;
  // 根据type决定如何加工数据
  switch (type) {
    case INCREMENT: // 如果是加
      return preState + data;
    case DECREMENT: // 若果是减
      return preState - data;
    default:
      return preState;
  }
}
```

### 2.4. Count 组件

components/Count/index.jsx：

通过 `action creator` 创建 `action` 对象，然后派发给 `reducer`。(代码仅展示变化部分)

```jsx
import React, { Component } from "react";
import store from "../../redux/store";
import {
  createIncrementAction,
  createDecrementAction,
} from "../../redux/count_action";

export default class Count extends Component {
  // 加法
  increment = () => {
    const { value } = this.selectNumber;
    store.dispatch(createIncrementAction(value * 1));
  };
  // 减法
  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch(createDecrementAction(value * 1));
  };
  // 奇数再加
  incrementIfOdd = () => {
    const count = store.getState();
    if (count % 2 !== 0) {
      const { value } = this.selectNumber;
      store.dispatch(createIncrementAction(value * 1));
    }
  };
  // 异步加
  incrementAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch(createIncrementAction(value * 1));
    }, 500);
  };
}
```

## 3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/5/1.gif')" alt="foo">
