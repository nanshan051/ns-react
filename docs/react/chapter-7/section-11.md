---
title: 计算器 + 人员列表：最终版
comments: true
tags:
  - 案例
---

本小节在前面章节的基础上，进行以下完善（仅展示变更的代码）。

1. 单独用一个文件将多个 reducer 合并，方便管理。
2. 变量命名准确化，且 **尽量采用对象的简写形式。**

## 1. src 目录

在 `reducers` 文件夹下，新建一个 `index.js` 文件，用于合并多个 `reducer` 。

```sh
src
├── App.jsx
├── containers
|  ├── Count
|  |  └── index.jsx
|  └── Persons
|     └── index.jsx
├── index.js
└── redux
   ├── actionCreators
   |  ├── count.js
   |  └── persons.js
   ├── constant.js
   ├── reducers
   |  ├── count.js
   |  ├── index.js      # 总的reducer
   |  └── persons.js
   └── store.js
```

## 2. actionCreators

### 2.1. count.js

redux/actionCreators/count.js：

```js
import { INCREMENT, DECREMENT } from "../constant";

// 同步action，就是指action的值为Object类型的一般对象
export const increment = (data) => ({ type: INCREMENT, data });
export const decrement = (data) => ({ type: DECREMENT, data });

// 异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const incrementAsync = (data, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(data));
    }, time);
  };
};
```

### 2.2. persons.js

redux/actionCreators/persons.js：

```js
import { ADD_PERSON } from "../constant";

// 创建增加一个人的action动作对象
export const addPerson = (data) => ({ type: ADD_PERSON, data });
```

## 3. reducers

### 3.1. count.js

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

### 3.2. persons.js

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

### 3.3. index.js

redux/reducers/index.js：

```js
import { combineReducers } from "redux";
import count from "./count";
import persons from "./persons";

export default combineReducers(
  // 对象简写形式
  {
    count,
    persons,
  },
);
```

## 4. store.js

redux/store.js：

```js
// 引入createStore，专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware } from "redux";
// 引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
// 引入redux-devtools-extension，支持redux开发者工具
import { composeWithDevTools } from "redux-devtools-extension";
// 引入汇总后的reducer
import reducer from "./reducers";

// 暴露store
export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
```

## 5. Count 组件

containers/Count/index.jsx：

```jsx
import React, { Component } from "react";
//引入action creator
import {
  increment,
  decrement,
  incrementAsync,
} from "../../redux/actionCreators/count";
//引入connect用于连接UI组件与redux
import { connect } from "react-redux";

// 定义UI组件
class Count extends Component {
  // 加法
  increment = () => {
    const { value } = this.selectNumber;
    // 调用容器组件传递过来的操作状态的方法
    this.props.increment(value * 1);
  };
  // 减法
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value * 1);
  };
  // 奇数再加
  incrementIfOdd = () => {
    if (this.props.count % 2 !== 0) {
      const { value } = this.selectNumber;
      this.props.increment(value * 1);
    }
  };
  // 异步加
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.incrementAsync(value * 1, 500);
  };
  render() {
    return (
      <div>
        {/* 获取容器组件通过props传递过来的状态 */}
        <h2>我是Count组件，下方组件的『人数』为：{this.props.personsNum}</h2>
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
    count: state.count,
    personsNum: state.persons.length,
  }),
  // 对象简写形式
  {
    increment,
    decrement,
    incrementAsync,
  },
)(Count);
```

## 6. Persons 组件

containers/Persons/index.jsx：

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { addPerson } from "../../redux/actionCreators/persons";

class Person extends Component {
  addPerson = () => {
    const personObj = {
      id: nanoid(),
      name: this.nameNode.value,
      age: this.ageNode.value * 1,
    };
    this.props.addPerson(personObj);
    this.nameNode.value = "";
    this.ageNode.value = "";
  };
  render() {
    return (
      <div>
        <h2>我是Person组件，上方组件的『求和』为：{this.props.count}</h2>
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
          {this.props.persons.map((person) => {
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
    persons: state.persons,
    count: state.count,
  }), // 映射状态
  // 对象简写形式
  {
    addPerson,
  }, // 映射操作状态的方法
)(Person);
```
