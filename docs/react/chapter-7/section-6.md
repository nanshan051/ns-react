---
title: 计算器：redux异步action版
comments: true
tags:
  - 案例
  - 异步action
  - redux-thunk
  - applyMiddleware
---

在上一小节《计算器：redux 完整版》中，我们通过 action creator 创建了 『 同步 action 』。在本小节中，我们补充一下 **『 异步 action 』** 的使用。

## 1. 异步 action

异步 action 是 Redux 中一种常见的操作，用于处理需要等待的异步任务。例如：网络请求、定时器等。

::: tip

1. 明确：延迟的动作不想交给组件自身，想交给 `action` 。

2. 何时需要异步 action：想要对状态进行操作，但是具体的数据靠异步任务返回。

3. `action creator` **不再返回一般对象，而是返回一个函数，** 在该函数中编写异步任务。这个函数就是 **『异步 action』**。
   `store` 会帮我们调用这个函数，并把 `dispatch` 作为参数传递给它。

4. **异步任务有结果后，分发一个同步的 action 去真正操作数据。**

:::

redux/count_action.js：

```js
import { INCREMENT, DECREMENT } from "./constant";

// 同步action：就是指创建的action为Object类型的一般对象
export const createIncrementAction = (data) => ({ type: INCREMENT, data });
export const createDecrementAction = (data) => ({ type: DECREMENT, data });

// 异步action：就是指创建的action为函数，异步action中一般都会调用同步action，异步action非必须。
export const createIncrementAsyncAction = (data, time) => {
  // 返回一个函数，这个函数就是异步action
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data));
    }, time);
  };
};
```

## 2. 去掉 Count 组件中的异步任务

将 Count 组件的异步任务（setTimeout）注释掉，改为创建异步 action 并分发。

```jsx
import store from "../../redux/store";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";

// 异步加
incrementAsync = () => {
  const { value } = this.selectNumber;
  /* setTimeout(() => {
      store.dispatch(createIncrementAction(value * 1));
    }, 500); */
  store.dispatch(createIncrementAsyncAction(value * 1, 500));
};
```

此时，刷新页面进行 “异步加” 操作时，会报错：

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/6/1.png')" alt="foo">

由图中错误提示可知，需要借助中间件帮助 redux 处理异步 action。

## 3. redux-thunk 中间件

安装 `redux-thunk` 中间件：

```sh
yarn add redux-thunk@2.3.0
```

在 `store` 中引入并使用中间件：

redux/store.js：

```js
// 引入createStore，用于创建redux中最为核心的store对象
// 引入applyMiddleware，用于支持中间件
import { createStore, applyMiddleware } from "redux";

// 引入为Count组件服务的reducer
import countReducer from "./count_reducer";

// 引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";

// 创建store并执行中间件redux-thunk，然后暴露store
export default createStore(countReducer, applyMiddleware(thunk));
```

## 4. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/6/2.gif')" alt="foo">
