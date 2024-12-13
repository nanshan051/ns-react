---
title: redux 理解
comments: true
tags:
  - redux
---

## 1. 官方文档

- 英文文档：[https://redux.js.org/](https://redux.js.org/)
- 中文文档：[https://www.redux.org.cn/](https://www.redux.org.cn/)
- GitHub：[https://github.com/reduxjs/redux](https://github.com/reduxjs/redux)

## 2. redux 是什么？

1. `redux` 是一个专门用于做『**<font color="red">状态管理</font>**』的 JS 库（**不是 react 插件库**）。
2. 它可以用在 react、angular、vue 等项目中，但基本与 `react` 配合使用。
3. 作用：集中式管理 react 应用中多个组件 **<font color="red">共享</font>** 的状态。

## 3. 什么情况下需要使用 redux

1. 某个组件的状态，需要让其他组件可以随时拿到（**共享**）。
2. 一个组件需要改变另一个组件的状态（**通信**）。
3. 总体原则：能不用就不用，如果不用比较吃力才考虑使用。
