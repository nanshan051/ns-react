---
title: redux 的三个核心概念
comments: true
tags:
  - action
  - reducer
  - store
---

## 1. redux 工作流程

<img class="zoomable" :src="$withBase('/images/screenshot/7/2/1.png')" alt="foo">

## 2. action

1. 描述 **『动作』** 的对象。
2. 包含两个属性：
   - `type`：标识属性，值为字符串，唯一，必要属性。
   - `data`：数据属性，值为任意类型，可选属性。
3. 例子：`{type:'ADD_STUDENT', data: {name: 'Tom', age: 18}}` 。

## 3. reducer

1. 用于 **初始化状态、加工状态。**
2. 加工时，根据旧的 state 和 action 生成新的 state。

## 4. store

1. 将 state、action、reducer **联系在一起** 的对象。
2. 如何得到此对象？
   ```js
   import { createStore } from "redux";
   import reducer from "./reducer";
   const store = createStore(reducer);
   ```
3. 此对象的功能？  
   (1) `getState()`：获取 state。  
   (2) `dispatch(action)`：分发 action，触发 reducer 调用，产生新的 state。  
   (3) `subscribe(listener)`：注册监听器，当 state 更新时，自动调用此监听器函数。
