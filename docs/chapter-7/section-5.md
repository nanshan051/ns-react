---
title: 计算器：redux完整版
comments: true
tags:
  - 案例
---

在上一小节《计算器：redux 精简版》中我们自己拼接了动作对象，在本节中我们使用 `action` 生成动作对象。

## 1. src 目录

```sh
src
├── App.jsx
├── components
|  └── Count
|     └── index.jsx
├── index.js
└── redux
   ├── constant.js       # 定义常量
   ├── count_action.js   # action（封装动作对象）
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

### 2.2. action

redux/count_action.js：

::: tip

该文件专门为 Count 组件生成动作对象（ `action` ）。

- **箭头函数体内若直接返回一个对象，则可以简写为用小括号 `()` 包裹该对象：`() => ({...})` 。**

:::

```js
import { INCREMENT, DECREMENT } from "./constant";

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

通过 `action` 生成动作对象，并派发给 `reducer`。(代码仅展示变化部分)

```jsx
import React, { Component } from "react";
import store from "../../redux/store";
import {
  createIncrementAction,
  createDecrementAction,
} from "../../redux/count_action";

export default class Count extends Component {
  // 加法
  increament = () => {
    const { value } = this.selectNumber;
    store.dispatch(createIncrementAction(value * 1));
  };
  // 减法
  decreament = () => {
    const { value } = this.selectNumber;
    store.dispatch(createDecrementAction(value * 1));
  };
  // 奇数再加
  increamentIfOdd = () => {
    const count = store.getState();
    if (count % 2 !== 0) {
      const { value } = this.selectNumber;
      store.dispatch(createIncrementAction(value * 1));
    }
  };
  // 异步加
  increamentAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch(createIncrementAction(value * 1));
    }, 500);
  };
}
```

## 3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/7/5/1.gif')" alt="foo">
