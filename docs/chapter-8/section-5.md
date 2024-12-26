---
title: Context
comments: true
tags:
  - Context
---

## 1. Context

`Context` 是一种组件间通信方式，常用于 **『祖组件』** 与 **『后代组件』** 间通信。

::: tip 用法：

1. 创建 `Context` 容器对象：

   ```js
   const xxxContext = React.createContext();
   ```

2. 渲染子组件时，外面要包裹一个 `<xxxContext.Provider>` 组件，通过 `value` 属性给后代组件传递数据。

   ```jsx
   /* 一般写法 */
   <xxxContext.Provider value={数据}>子组件</xxxContext.Provider>;

   /* 简写（推荐） */
   const { Provider } = xxxContext;
   <Provider value={数据}>子组件</Provider>;
   ```

3. 后代组件读取数据：

   - 第一种方式：**仅适用于 『类式组件』。**

   ```jsx
   static contextType = xxxContext  // 声明接收context
   this.context // 读取context中的value数据
   ```

   - 第二种方式：函数式组件和类式组件都可以。

   ```jsx
   /* 一般写法 */
   <xxxContext.ConSumer>
     {(value) => {
       // 要显示的内容
     }}
   </xxxContext.ConSumer>;

   /* 简写（推荐） */
   const { ConSumer } = xxxContext;
   <ConSumer>
     {(value) => {
       // 要显示的内容
     }}
   </ConSumer>;
   ```

:::

> 注意：在应用开发中，一般不用 `context`，一般都用它的封装 react 插件，如 `react-redux` 。

## 2. 案例

### 2.1 src 目录

```sh
src
├── App.jsx
├── components
|  └── 5_context
|     ├── index.css
|     └── index.jsx
└── index.js
```

### 2.2 入口文件

index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default root;
```

### 2.3. 根组件

App.jsx：

```jsx
import React, { Component } from "react";
import Demo from "./components/5_context";

export default class App extends Component {
  render() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
}
```

### 2.4. Demo 组件

components/5_context/index.jsx：

```jsx
import React, { Component } from "react";
import "./index.css";

const MyContext = React.createContext();
const { Provider, Consumer } = MyContext;

export default class A extends Component {
  state = { carName: "比亚迪" };
  changeCar = () => {
    this.setState({ carName: "特斯拉" });
  };
  render() {
    const { carName } = this.state;
    return (
      <div className="component-A">
        <h2>我是A组件</h2>
        <p>汽车是：{carName}</p>
        <button onClick={this.changeCar}>点我换车</button>
        {/* 给B组件及其所有后代组件传递数据 */}
        <Provider value={{ carName }}>
          {/* A给B传参最简单的方式是props */}
          <B carName={carName} />
        </Provider>
      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div className="component-B">
        <h2>我是B组件</h2>
        {/* 子组件通过props读取数据 */}
        <p>我接收到的汽车是：{this.props.carName}</p>
        <C />
      </div>
    );
  }
}

/* 类式组件 */
class C extends Component {
  // 后代组件声明接收数据
  static contextType = MyContext;
  render() {
    return (
      <div className="component-C">
        <h2>我是C组件</h2>
        <p>
          我接收到的汽车是：
          {/* 后代组件从context中读取数据 */}
          {this.context.carName}
        </p>
        <D />
      </div>
    );
  }
}

/* 函数式组件 */
function D() {
  return (
    <div className="component-D">
      <h2>我是D组件</h2>
      <p>
        我接收到的汽车是：
        {/* 后代组件从context中读取数据 */}
        <Consumer>{(context) => context.carName}</Consumer>
      </p>
    </div>
  );
}
```

components/5_context/index.css：

```css
.component-A {
  background-color: skyblue;
  padding: 16px;
}
.component-B {
  background-color: lightcoral;
  padding: 16px;
  margin-top: 16px;
}
.component-C {
  background-color: lightgreen;
  padding: 16px;
}
.component-D {
  background-color: mediumpurple;
  padding: 16px;
}
```

### 2.5. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/8/5/1.gif')" alt="foo">
