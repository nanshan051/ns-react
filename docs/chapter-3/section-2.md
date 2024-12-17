---
title: 组件的组合使用-TodoList
comments: true
tags:
  - 案例
---

## 1. 组件化编码流程

1. **拆分** 组件，抽取组件
2. 实现 **静态组件**：使用组件实现静态页面效果
3. 实现 **动态组件**：
   - 3.1. 动态显示初始化数据
     - (1) 数据类型
     - (2) 数据名称
     - (3) 保存在哪个组件？
   * 3.2. 交互（从绑定事件监听开始）

## 2. TodoList 案例

### 2.1. 需求说明

> 1. 显示任务（展示全部任务及其状态）
> 2. 添加任务（输入任务名称，按回车键添加任务）
> 3. 删除任务（鼠标悬浮在任务上显示删除按钮，点击删除按钮删除任务）
> 4. 更新任务（勾选表示已完成，不勾选表示未完成）
> 5. 统计数量（已完成和全部）
> 6. 清除已完成的任务

### 2.2. src 目录

```sh
src
├── App.css
├── App.jsx            # App组件(根组件)
├── components
|  ├── Footer          # Footer组件(底部)
|  |  ├── index.css
|  |  └── index.jsx
|  ├── Header          # Header组件(头部)
|  |  ├── index.css
|  |  └── index.jsx
|  ├── Item            # Item组件(列表项)
|  |  ├── index.css
|  |  └── index.jsx
|  └── List            # List组件(列表)
|     ├── index.css
|     └── index.jsx
└── index.js           # 入口文件
```

### 2.3. 效果展示

<img class="zoomable" :src="$withBase('/images/screenshot/3/2/1.gif')" alt="foo">

## 3. 入口文件

index.js :

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## 4. 根组件

App.jsx :

```jsx
import React, { Component } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
import "./App.css";

export default class App extends Component {
  // 状态在哪里，操作状态的方法就在哪里
  state = {
    todos: [
      { id: "001", name: "吃饭", done: true },
      { id: "002", name: "睡觉", done: true },
      { id: "003", name: "搬砖", done: false },
      { id: "004", name: "逛街", done: false },
    ],
  };
  // 添加任务
  addTodo = (todo) => {
    const { todos } = this.state;
    const newTodos = [todo, ...todos];
    this.setState({ todos: newTodos });
  };
  // 更新任务
  updateTodo = (id, done) => {
    const newTodos = this.state.todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, done };
      }
      return todo;
    });
    this.setState({ todos: newTodos });
  };
  // 删除任务
  deleteTodo = (id) => {
    const newTodos = this.state.todos.filter((todo) => id !== todo.id);
    this.setState({ todos: newTodos });
  };
  // 全选/全不选
  checkAllTodo = (done) => {
    const newTodos = this.state.todos.map((todo) => {
      return { ...todo, done };
    });
    this.setState({ todos: newTodos });
  };
  // 清除已完成的任务
  clearAllDone = () => {
    const newTodos = this.state.todos.filter((todo) => !todo.done);
    this.setState({ todos: newTodos });
  };
  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List
            todos={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
          <Footer
            todos={todos}
            checkAllTodo={this.checkAllTodo}
            clearAllDone={this.clearAllDone}
          />
        </div>
      </div>
    );
  }
}
```

App.css :

```css
/*App*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
```

## 5. Header 组件

Hello/index.jsx :

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid"; // 4.0.2 版本
import "./index.css";

export default class Header extends Component {
  // 对接收的props进行：类型、必要性的限制
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };
  handleKeyUp = (event) => {
    const { target, keyCode } = event;
    if (keyCode !== 13) {
      return;
    }
    if (target.value.trim() === "") {
      alert("输入不能为空");
      return;
    }
    const todo = {
      id: nanoid(),
      name: target.value,
      done: false,
    };
    this.props.addTodo(todo);
    target.value = "";
  };
  render() {
    return (
      <div className="todo-header">
        <input
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}
```

Hello/index.css :

```css
/*Header*/
.todo-header input {
  width: 540px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
```

## 6. List 组件

List/index.jsx :

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
import Item from "../Item";
import "./index.css";

export default class List extends Component {
  // 对接收的props进行：类型、必要性的限制
  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };
  render() {
    const { todos, updateTodo, deleteTodo } = this.props;
    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          return (
            <Item
              key={todo.id}
              {...todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    );
  }
}
```

List/index.css :

```css
/*List*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
```

## 7. Item 组件

Item/index.jsx :

```jsx
import React, { Component } from "react";
import "./index.css";

export default class Item extends Component {
  state = {
    mouse: false,
  };
  handleMouse = (flag) => {
    return () => {
      this.setState({
        mouse: flag,
      });
    };
  };
  // 高阶函数
  handleCheck = (id) => {
    return (event) => {
      this.props.updateTodo(id, event.target.checked);
    };
  };
  // 普通函数
  handleDelete = (id) => {
    if (window.confirm("确定删除？")) {
      this.props.deleteTodo(id);
    }
  };
  render() {
    const { id, name, done } = this.props;
    const { mouse } = this.state;
    return (
      <li
        style={{ backgroundColor: mouse ? "#ddd" : "white" }}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleCheck(id)}
          />
          <span>{name}</span>
        </label>
        <button
          className="btn btn-danger"
          style={{ display: mouse ? "block" : "none" }}
          onClick={() => {
            this.handleDelete(id);
          }}
        >
          删除
        </button>
      </li>
    );
  }
}
```

Item/index.css :

```css
/*Item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
```

## 8. Footer 组件

Footer/index.jsx :

```jsx
import React, { Component } from "react";
import "./index.css";

export default class Footer extends Component {
  handleCheckAll = (event) => {
    console.log("checkAll", event);
    this.props.checkAllTodo(event.target.checked);
  };
  handleClearAllDone = () => {
    this.props.clearAllDone();
  };
  render() {
    const { todos } = this.props;
    const doneCount = todos.reduce((pre, cur) => pre + (cur.done ? 1 : 0), 0);
    const total = todos.length;
    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            checked={doneCount === total && total !== 0}
            onChange={this.handleCheckAll}
          />
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={this.handleClearAllDone}>
          清除已完成任务
        </button>
      </div>
    );
  }
}
```

Footer/index.css :

```css
/*Footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
```

## 9. 总结

::: tip

1. 拆分组件、实现静态组件，注意 `className` 和 `style` 的写法。
2. 动态初始化列表，如何确定将数据放在哪个组件的 `state` 中？
   - 若只有某个组件使用：则放在该组件自身的 state 中。
   - **若有多个组件使用：则放在他们共同的父组件 state 中（官方称此操作为：<font color="red">状态提升</font>）。**
3. **<font color="red">状态在哪里，操作状态的方法就放在哪里。</font>**
4. 关于父子之间通信：
   - 【父==>子】：通过 `props` 传递。
   - 【子==>父】：通过 props 传递，**<font color="red">要求父组件提前给子组件传递一个函数。</font>**
5. 注意 `defaultChecked` 和 `checked` 的区别：
   - defaultChecked：在组件挂载时生效，只触发一次。
   - checked：每次渲染时都重新计算，可以动态变化，需要配合 `onChange` 事件绑定一起使用。
   - 类似的还有 `defualtValue` 和 `value`。

:::
