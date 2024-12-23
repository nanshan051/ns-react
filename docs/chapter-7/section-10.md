---
title: 计算器 + 人员列表：redux开发者工具
comments: true
tags:
  - 案例
  - 开发者工具
  - redux-devtools
---

本小节将展示如何通过开发者工具 `Redux Devtools` 来调试数据共享案例。

## 1. Redux Devtools 插件

安装 Chrome 浏览器的 `Redux Devtools` 插件并开启。

<img class="zoomable" :src="$withBase('/images/screenshot/7/10/1.png')" alt="foo">

## 2. redux-devtools-extension 库

浏览器的 `Redux Devtools` 插件需要配合`redux-devtools-extension` 库来使用。

安装 `redux-devtools-extension` 库：

```sh
yarn add redux-devtools-extension
```

在代码 redux/store.js 中引用并使用该库中的 `composeWithDevTools` 函数：

```js
// 引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware, combineReducers } from "redux";
// 引入为Count组件服务的reducer
import countReducer from "./reducers/count";
// 引入为Persons组件服务的reducer
import personsReducer from "./reducers/persons";
// 引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
// 引入redux-devtools-extension，支持redux开发者工具
import { composeWithDevTools } from "redux-devtools-extension";

// 将所有的reducer合并为一个总的reducer
const allReducer = combineReducers({
  he: countReducer,
  rens: personsReducer,
});

// 暴露store
export default createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
```

::: tip composeWithDevTools 的用法：

1. 若 createStore 没有第 2 个参数，则使用 redux-devtools-extension 库时，直接将`composeWithDevTools` 作为第 2 个参数：

- ```js
  export default createStore(allReducer, composeWithDevTools());
  ```

2. 若 createStore 有第 2 个参数，则使用 redux-devtools-extension 库时，**需要将第 2 个参数作为`composeWithDevTools` 的参数，然后将 `composeWithDevTools` 作为第 2 个参数：**

- ```js
  export default createStore(
    allReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  ```

:::

## 3. 效果

### 3.1. Action、State、Diff

<img class="zoomable" :src="$withBase('/images/screenshot/7/10/2.gif')" alt="foo">

### 3.2. Jump、Play

<img class="zoomable" :src="$withBase('/images/screenshot/7/10/3.gif')" alt="foo">

### 3.3. Dispatch

<img class="zoomable" :src="$withBase('/images/screenshot/7/10/4.gif')" alt="foo">
