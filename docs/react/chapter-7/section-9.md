---
title: 计算器 + 人员列表：数据共享
comments: true
tags:
  - 案例
  - 数据共享
  - combineReducers
  - 纯函数
  - 高阶函数
---

在前面的小结中，只有一个容器组件 Count（计算器），不能体现出 redux 的数据共享。本小节中，将新增一个容器组件 Persons（人员列表），实现组件之间的 **『数据共享』**。

## 1. src 目录

在 containers 文件夹下新建容器组件 `Persons` 。在 redux 文件夹下：

- 新建 actionCreators 文件夹，用于存放多个 `action creator` 。
- 新建 reducers 文件夹，用于存放多个 `reducer`。

```sh
src
├── App.jsx
├── containers          # 容器组件
|  ├── Count
|  |  └── index.jsx
|  └── Persons
|     └── index.jsx
├── index.js
└── redux
   ├── actionCreators   # 创建动作对象
   |  ├── count.js
   |  └── persons.js
   ├── constant.js      # 动作类型常量
   ├── reducers         # 初始化、加工状态
   |  ├── count.js
   |  └── persons.js
   └── store.js         # 仓库
```

备注：本节中，store 存储了 `he` 和 `rens` 两个状态， 分别对应『求和结果』和『人员数组』。

## 2. constant 常量

redux/constant.js：

```js
export const INCREMENT = "increment"; // 加法
export const DECREMENT = "decrement"; // 减法
export const ADD_PERSON = "add_person"; // 添加人员
```

## 3. actionCreators

::: tip

1. action creator 和 reducer 可能存在多个，而 store 是唯一的。

2. 准确地说，它们不是为某个（些）组件服务，而是为整个应用的 **『状态』** 服务！！！

3. 『容器组件』只与 redux 中的 `store` 和 `action creator` 打交道 （参考 7.2 流程图）：

   - 容器组件从 `store` 中获取状态。**（多对一）**

   - 容器组件将 `action creator` 封装成操作状态的方法。**（多对多）**

:::

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/2/1.png')" alt="foo">

### 3.1. count.js

准确地说，是为『操作 `he` 状态』的动作 生成 `action` 对象。

redux/actionCreators/count.js：

```js
import { INCREMENT, DECREMENT } from "../constant";

// 同步action，就是指action的值为Object类型的一般对象
export const createIncrementAction = (data) => ({ type: INCREMENT, data });
export const createDecrementAction = (data) => ({ type: DECREMENT, data });

// 异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const createIncrementAsyncAction = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data));
    }, time);
  };
};
```

### 3.2. persons.js

准确地说，是为『操作 `rens` 状态』的动作 生成 `action` 对象。

redux/actionCreators/persons.js：

```js
import { ADD_PERSON } from "../constant";

// 创建添加人员的action动作对象
export const createAddPersonAction = (data) => ({ type: ADD_PERSON, data });
```

## 4. reducers

::: tip

1. 一个 `reducer` 只负责处理一个状态。

2. 某个状态发生变化时，所有的 `reducer` 都会执行，**但只有与该状态相关的 reducer 会返回新 state。**

   - 因为 **不相关的 reducer 由于动作类型匹配不上，都返回原来的 state，** 所以不会影响其他状态。

:::

### 4.1. count.js

准确地说，是『操作 `he` 状态』。

redux/reducers/count.js：

```js
import { INCREMENT, DECREMENT } from "../constant";

const initState = 0; // 初始化状态
export default function countReducer(preState = initState, action) {
  const { type, data } = action;
  console.log("count reducer 接收：", preState, action);
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

### 4.2. persons.js

准确地说，是『操作 `rens` 状态』。

redux/reducers/persons.js：

```js
import { ADD_PERSON } from "../constant";

// 初始化人员列表
const initState = [{ id: "001", name: "张三", age: 18 }];
export default function createPersonReducer(preState = initState, action) {
  const { type, data } = action;
  console.log("persons reducer 接收：", preState, action);
  switch (type) {
    case ADD_PERSON: // 若是添加一个人
      return [data, ...preState];
    default:
      return preState;
  }
}
```

## 5. store

::: tip

一个应用只能有一个 store，但是可以有多个 reducer 为其服务。

`redux` 提供的 `combineReducers` 函数可以 **将多个 reducer 合并，返回一个总的 reducer。**

:::

本节中，store 存储了 `he` 和 `rens` 两个状态， 分别对应『求和结果』(Number) 和『人员数组』(Array)。

redux/store.js：

```js
// 引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware, combineReducers } from "redux";
// 引入为Count组件服务的reducer
import countReducer from "./reducers/count";
// 引入为Persons组件服务的reducer
import personsReducer from "./reducers/persons";
// 引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";

// 将所有的reducer合并为一个总的reducer
const allReducer = combineReducers({
  he: countReducer, // 求和结果
  rens: personsReducer, // 人员数组
});

// 暴露store
export default createStore(allReducer, applyMiddleware(thunk));
```

## 6. App 组件

App.jsx：

```jsx
import React, { Component } from "react";
import Count from "./containers/Count";
import Persons from "./containers/Persons";

export default class App extends Component {
  render() {
    return (
      <div>
        <Count />
        <hr />
        <Persons />
      </div>
    );
  }
}
```

## 7. Count 组件

::: tip

- 若 store 中只有一个状态，则取值时直接使用 `state`。

- 若 store 中有多个状态，则取值时需要使用 `state.he`。

:::

计算器 containers/Count/index.jsx：

```jsx
import React, { Component } from "react";
//引入action creator
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/actionCreators/count";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

// 定义UI组件
class Count extends Component {
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
    return (
      <div>
        {/* 获取容器组件通过props传递过来的状态 */}
        <h2>我是Count组件，下方组件的『人数』为：{this.props.renshu}</h2>
        <h4>当前求和为：{this.props.count}</h4>
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
  (state) => ({
    count: state.he,
    renshu: state.rens.length,
  }),
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    jiaAsync: createIncrementAsyncAction,
  },
)(Count);
```

## 8. Persons 组件

人员列表 containers/Persons/index.jsx：

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { createAddPersonAction } from "../../redux/actionCreators/persons";

class Person extends Component {
  addPerson = () => {
    const personObj = {
      id: nanoid(),
      name: this.nameNode.value,
      age: this.ageNode.value * 1,
    };
    this.props.jiaYiRen(personObj);
    this.nameNode.value = "";
    this.ageNode.value = "";
  };
  render() {
    return (
      <div>
        <h2>我是Person组件，上方组件的『求和』为：{this.props.he}</h2>
        <input
          ref={(e) => (this.nameNode = e)}
          type="text"
          placeholder="请输入姓名"
        />
        <input
          ref={(e) => (this.ageNode = e)}
          type="text"
          placeholder="请输入年龄"
        />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.personArr.map((person) => {
            return (
              <li key={person.id}>
                {person.name}---{person.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    personArr: state.rens,
    he: state.he,
  }), // 映射状态
  {
    jiaYiRen: createAddPersonAction,
  }, // 映射操作状态的方法
)(Person);
```

## 9. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/9/1.gif')" alt="foo">

## 10. 纯函数和高阶函数

### 10.1. 纯函数

::: tip 纯函数

1. 一类特别的函数：**只要是同样的输入（实参），必定得到同样的输出（返回）。**

2. 必须遵以下约束：

（1）**不得改写参数数据。**

（2）不会产生任何副作用，例如网络请求，输入和输出设备。

（3）不能调用 `Date.now()` 或者 `Math.random()` 等不纯的方法。

3. **<font color="red">`redux` 的 `reducer` 必须是一个纯函数。</font>**

:::

在 redux/reducers/persons.js 中，当动作类型为 `ADD_PERSON` 时（即新增人员时），会返回一个新的数组。此时 reducer 函数符合纯函数的三条约束，所以是一个纯函数。

```js
import { ADD_PERSON } from "../constant";

const initState = [{ id: "001", name: "张三", age: 18 }];
export default function createPersonReducer(preState = initState, action) {
  const { type, data } = action;
  console.log("persons reducer 接收：", preState, action);
  switch (type) {
    case ADD_PERSON:
      // 错误：直接修改了原数组，违反纯函数约束
      /*
        preState.unshift(data);
        return preState;
      */
      // 正确：返回一个新的数组，不修改原数组，符合纯函数约束
      return [data, ...preState];
    default:
      return preState;
  }
}
```

如果新增人员时我们采用上述代码中的错误方式处理 `rens` 数组，那么就会存在问题：  
`unshift` 方法修改了 `reducer` 函数的参数 `preState` ，违背了第一条约束，所有不是纯函数。

::: tip react-redux 的『浅校验』：

`react-redux` 会对 `state` 进行『浅校验』，**对于引用类型的数据，只校验引用地址，不进行深度校验。** 当检测到 `state` 发生变化时，才会更新页面。

在上述代码错误的处理方式中，**`unshift` 方法虽然修改了 `rens` 数组的内容，但是并没有改变 `rens` 数组的地址。** 所以 react-redux 不会检测到 rens 数组 的变化，导致无法正确更新页面。

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/9/2.gif')" alt="foo">

**<font color="red">因此 react 中一般很少使用 `push`、`unshift` 等方法修改原数组，而是返回一个新数组。</font>**

而 **`vue` 内部重写了数组方法（如 push、unshift）** ，所以 vue 可以检测到通过这些方法改变数组内容时数组的变化，从而正确更新页面。

:::

### 10.2. 高阶函数

::: tip 高阶函数

1. 理解：一类特别的函数：
   - 情况 1：参数是函数。
   - 情况 2：返回值是函数。
2. 常见的高阶函数：
   - 定时器：`setTimeout`、`setInterval` 。
   - 数组方法：`map`、`filter`、`reduce`、`forEach`、`find`、`bind` 。
   - `promise` 。

:::
