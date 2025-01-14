---
title: Hooks
comments: true
tags:
  - Hooks
  - Hook
  - useState
  - useEffect
  - useRef
---

## 1. React Hooks 是什么？

`React Hooks` 是 React 16.8.0 版本引入的新特性，它可以让你在函数组件中使用 `state`、`effects` 等。

## 2. 常用的三个 Hook

1. State Hook：`React.useState()`

2. Effect Hook：`React.useEffect()`

3. Ref Hook：`React.useRef()`

## 3. State Hook

### 3.1. 总结

::: tip State Hook

1. `State Hook` 让函数组件也可以有 `state` 状态，并进行状态的读写操作。

2. 语法：`const [xxx, setXxx] = React.useState(initialValue)` 。

3. `useState()` 说明：

   - 参数：第一次 **初始化** 指定的值（在内部做缓存）。
   - 返回值：一个数组，第一个元素是 **状态 xxx**，第二个元素是 **更新状态 xxx 的函数 setXxx**。
   <p/>

4. `setXxx()` 的两种写法：
   - 直接赋值：`setXxx(newValue)` 。
   - 函数形式：`setXxx(value => newValue)` 。（**推荐**：可以保证每次更新都是基于最新的状态）

:::

### 3.2. 入口文件

src/index.jsx：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### 3.3. 根组件

src/App.jsx：

```jsx
import React, { Component } from "react";
import Demo from "./components/3_Hooks";

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

### 3.4. Demo 组件

#### 3.4.1 类式组件

类式组件有 `this` 和组件实例，还有 `state`、`props` 等。

```jsx
import React from "react";

// 类式组件
class Demo extends React.Component {
  state = { count: 0 };
  add = () => {
    this.setState((state, props) => ({ count: state.count + 1 }));
  };
  render() {
    return (
      <div>
        <h1>当前求和为：{this.state.count}</h1>
        <button onClick={this.add}>点我+1</button>
      </div>
    );
  }
}

export default Demo;
```

#### 3.4.2. 函数式组件

函数式组件没有 `this` 和组件实例，但是借助 `useState` Hook 可以模拟类式组件的 `state`。

```jsx
import React from "react";

// 函数式组件
function Demo() {
  const [count, setCount] = React.useState(0);
  function add() {
    setCount(count + 1); // 直接赋值
    // setCount((count) => count + 1); // 函数形式
  }
  return (
    <div>
      <h1>当前求和为：{count}</h1>
      <button onClick={add}>点我+1</button>
    </div>
  );
}

export default Demo;
```

### 3.5. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/3/1.gif')" alt="foo">

## 4. Effect Hook

### 4.1. 总结

::: tip Effect Hook

1. `Effect Hook` 可以让你在函数式组件中执行副作用操作（类似于类式组件中的 **『生命周期』**）。

2. React 中的副作用操作：

   - 发送 `ajax` 请求数据获取
   - 设置订阅 / 启动定时器
   - 手动更改真实 DOM
   <p/>

3. `useEffect()` 语法和说明：

   ```js
   useEffect(() => {
     // 在此可以执行任何带副作用操作
     return () => {
       // 在组件卸载前执行，在此做一些收尾工作，比如清除定时器、取消订阅
     };
   }, [stateValue]); // 参数2若传空数组，回调函数则仅在首次挂载时执行一次回调函数
   ```

4. `useEffect()` 的第二个参数：（效果见本节 4.4）

   - 1. **不传：** 回调函数会在 **首次挂载和更新『任何』状态时** 执行。

     - 即 `componentDidMount + componentDidUpdate * n`
     <p/>

   - 2. **传空数组：** 回调函数仅在 **首次挂载时** 执行一次。(**<font color="red">常用</font>**)

     - 即 `componentDidMount`
     <p/>

   - 3. **传有状态的数组：** 回调函数会在 **首次挂载和更新『指定』状态时** 执行。

     - 即 `componentDidUpdate + componentDidUpdate * n`
     <p/>

   - [👉 点击查看不同效果](./section-3.html#_4-6-补充-useeffect-参数-2-的不同效果)

   <p/>

5. 可以把 `useEffect` Hook 看做是三个函数的组合：
   - `ComponentDidMount`
   - `ComponentDidUpdate`
   - `ComponentWillUnmount` （需要在回调函数中设置返回函数，返回的函数就是 **『卸载钩子』**）

:::

### 4.2. 入口文件

react 18 用 `root.unmount()` 替换了 `ReactDOM.unmountComponentAtNode()` ，react 19 中已删除该方法。

所以，要想卸载组件，需要在入口文件 `index.jsx` 中将 `root` 暴露出去：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default root; // 暴露root
```

### 4.3. 根组件

src/App.jsx：

```jsx
import React, { Component } from "react";
import Demo from "./components/3_Hooks";

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

### 4.4. Demo 组件

#### 4.4.1. 类式组件

类式组件有完整的 **『生命周期』**，可以执行各种操作。

```jsx
import React from "react";
import root from "../../index";

// 类式组件
class Demo extends React.Component {
  state = { count: 0 };
  add = () => {
    this.setState((state, props) => ({ count: state.count + 1 }));
  };

  unmount = () => {
    root.unmount();
    // ReactDOM.unmountComponentAtNode(document.getElementById("root")); // 已废弃
  };

  componentDidMount = () => {
    setInterval(() => {
      this.timer = this.setState({ count: this.state.count + 1 });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  render() {
    return (
      <div>
        <h1>当前求和为：{this.state.count}</h1>
        <button onClick={this.add}>点我+1</button>
        <button onClick={this.unmount}>点我卸载</button>
      </div>
    );
  }
}
```

#### 4.4.2. 函数式组件

函数式组件没有 **『生命周期』**，但可以通过 `useEffect` Hook 模拟类式组件中的 `componentDidMount`（挂载）、`componentDidUpdate`（更新）、`componentWillUnmount`（卸载） 生命周期。

```jsx
import React from "react";
import root from "../../index";

function Demo() {
  const [count, setCount] = React.useState(0);

  // useEffect第二个参数指定空数组，则代表回调函数仅在第一次render()后执行一次
  React.useEffect(() => {
    console.log("@");

    const timer = setInterval(() => {
      // 这里需要使用函数式更新
      // 因为函数式更新可以保证每次的state都是最新的，而赋值式更新无法保证
      setCount((count) => count + 1);
    }, 1000);

    // 在返回函数中进行收尾工作
    return () => {
      clearInterval(timer);
    };
  }, []);

  function add() {
    setCount(count + 1);
  }
  function unmount() {
    root.unmount();
  }

  return (
    <div>
      <h1>当前求和为：{count}</h1>
      <button onClick={add}>点我+1</button>
      <button onClick={unmount}>点我卸载</button>
    </div>
  );
}
```

### 4.5. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/3/2.gif')" alt="foo">

### 4.6. 补充：useEffect() 参数 2 的不同效果

为了演示 `useEffect` Hook 的参数 2 的不同效果，我们对 `Demo` 组件进行修改：

src/components/3_Hooks/index.jsx：

```jsx
import React from "react";

function Demo() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("张三");

  function add() {
    setCount(count + 1);
  }
  function change() {
    setName("李四");
  }

  return (
    <div>
      <h1>当前求和为：{count}</h1>
      <h1>当前姓名为：{name}</h1>
      <button onClick={add}>点我+1</button>&nbsp;
      <button onClick={change}>点我改名</button>
    </div>
  );
}

export default Demo;
```

#### 1. 不传

src/components/3_Hooks/index.jsx：

```jsx
React.useEffect(() => {
  console.log("@");
});
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/3/3.gif')" alt="foo">

从上图可以看出，参数 2 **不传** 时，回调函数在 **『首次挂载和更新任何状态时』** 都会执行。  
挂载组件（`componentDidMount` **1 次**）和更新 **任何状态**（`componentDidUpdate` **n 次**）都会触发回调函数。

#### 2. 传空数组

src/components/3_Hooks/index.jsx：

```jsx
React.useEffect(() => {
  console.log("@");
}, []);
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/3/4.gif')" alt="foo">

从上图可以看出，参数 2 **传空数组** 时，回调函数在 **『仅在首次挂载时』** 执行一次。  
仅挂载组件（`componentDidMount` **1 次**）会触发回调函数。

#### 3. 传有状态的数组

src/components/3_Hooks/index.jsx：

```jsx
React.useEffect(() => {
  console.log("@");
}, [count]);
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/3/5.gif')" alt="foo">

从上图可以看出，参数 2 **传有状态的数组** 时，回调函数在 **『首次挂载和更新指定状态时』** 都会执行。  
挂载组件（`componentDidMount` **1 次**）和更新 **指定状态**（`componentDidUpdate` **n 次**）都会触发回调函数。  
这里，指定了 count 状态，所以更新 name 状态时，不会触发回调函数。

## 5. Ref Hook

### 5.1. 总结

::: tip Ref Hook

1. `Ref Hook` 可以在函数式组件中存储、查询组件内的标签或任意其他数据。

2. 语法：`const refContainer = React.useRef()` 。

3. 作用：保存标签对象，功能与 `React.createRef()` 一样。

:::

### 5.2. 入口文件

src/index.jsx：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### 5.3. 根组件

src/App.jsx：

```jsx
import React, { Component } from "react";
import Demo from "./components/3_Hooks";

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

### 5.4. Demo 组件

#### 5.4.1. 类式组件

类式组件有实例对象，可以通过 `React.createRef()`函数创建 ref 对象，存储于实例上。

src/components/3_Hooks/index.jsx：

```jsx
import React from "react";

// 类式组件
class Demo extends React.Component {
  // createRef()创建ref对象
  myRef = React.createRef();
  show = () => {
    alert(`我是函数式组件，数据为：${this.myRef.current.value}`);
  };

  render() {
    return (
      <div>
        <input type="text" ref={this.myRef} />
        <p />
        <button onClick={this.show}>点我显示数据</button>
      </div>
    );
  }
}

export default Demo;
```

#### 5.4.2. 函数式组件

函数式组件没有实例对象，可以通过 `useRef` Hook 或 `React.createRef()`函数创建 ref 对象，存储于组件上。

src/components/3_Hooks/index.jsx：

```jsx
import React from "react";

// 函数式组件
function Demo() {
  // useRef()创建ref对象
  const myRef = React.useRef();
  function show() {
    alert(`我是函数式组件，数据为：${myRef.current.value}`);
  }

  return (
    <div>
      <input type="text" ref={myRef} />
      <p />
      <button onClick={show}>点我显示数据</button>
    </div>
  );
}

export default Demo;
```

### 5.5. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/3/6.gif')" alt="foo">
