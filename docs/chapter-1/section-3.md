---
title: React JSX
comments: true
tags:
  - JSX
  - 虚拟DOM
---

## 1. 虚拟 DOM

- 虚拟 DOM 对象最终都会被 React 转换为真实的 DOM。

- 我们编码时基本只需要操作虚拟 DOM 的相关数据，React 会转换为真实 DOM 变化从而更新界面。

- **虚拟 DOM 比较“轻”，真实 DOM 比较“重”**，因为虚拟 DOM 是 `React` 内部在用，无需真实 DOM 上那么多的属性。

<img class="zoomable" :src="$withBase('/images/screenshot/1/3/1.png')" alt="foo">

## 2. 创建虚拟 DOM 的两种方式

1. 纯 JS **（一般不用）**:

```js
// 用法：React.createElement(type, props, ...children)
var VDOM = React.createElement('h1',{id:'test'},'hello');
```

2. JSX **<font color="red">（推荐）</font>**:

```jsx
var VDOM = <h1 id="test">hello</h1>;
```

## 3. 渲染虚拟 DOM

将虚拟 DOM 元素渲染到页面中的真实容器 DOM 中显示：

```js
ReactDOM.render(virtualDOM, containerDOM);
```

- 参数 1：纯 `js` 或 `jsx` 创建的 **虚拟DOM** 对象。
- 参数 2：用来包含虚拟 DOM 元素的 **真实DOM** 元素对象（一般是一个 `div`）。

## 4. JSX

### 4.1 定义

- 全称： `JavaScript XML`。
- `React` 定义的一种类似于 `XML` 的 `JS` 扩展语法：`XML` + `JS`。
- 作用：**用来创建 React 虚拟 DOM（元素）对象。**

```jsx
// JSX 创建虚拟DOM
var VDOM = (
  <h1 className="title" id="test" style={{ color: "red", fontSize: "30px" }}>
    hello
  </h1>
);
```

::: warning 注意：

- 它不是字符串，也不是 `HTML` / `XML` 标签。
- 它最终产生的就是一个 `JS` 对象。

:::

### 4.2. 基本语法规则

::: tip

1. **定义虚拟 DOM 时，不要加引号。**
2. **标签中混入 `JS` <font color="red"> 表达式 </font> 时要用 `{}` 。**
3. 样式的 **类名不要用 `class`，要用 `className` 。**
4. **内联样式，要用 `style = { { key: value } }` 的形式去写。**
   - **<font color="red">外层花括号表明是 `JS` 表达式，内层花括号表明是一个对象。</font>**
5. **只能有一个根标签。**
6. **标签必须闭合。**
7. 标签首字母：
   - 若 **小写字母开头**，则将该标签转为 `html` 中 **同名元素**，若 `html` 中无该标签对应的同名元素，则报错。
   - 若 **大写字母开头**，则 `React` 就去渲染对应的 **组件**，若该组件没有定义，则报错。

:::

### 4.3. JSX 练习

```js{9,10,11,12}
// 准备数据
const data = ["Angular", "React", "Vue"];
// 创建虚拟DOM
const VDOM = (
  <div>
    <h1>前端js框架列表</h1>
    <ul>
      {
         // 必须是js表达式，不能是js语句
         data.map((item, index) => {
            return <li key={index}>{item}</li>;
         })
      }
    </ul>
  </div>
);
// 渲染虚拟DOM到页面
ReactDOM.render(VDOM, document.getElementById("test"));
```

上述练习中，通过 js 表达式 `data.map()` 返回了一个数组（元素都是虚拟 DOM），**`React` 会自动对数组进行遍历**。

### 4.4. 表达式与语句的区别

::: tip

- **表达式**：**一个表达式会产生一个值**，这个值可以放在任何一个需要值的地方。
  - `a`
  - `a + b`
  - `demo(1)`
  - `arr.map()`
  - `function test() {}`
- **语句**：**主要起控制作用**，比如，满足什么条件才会执行、什么时候退出循环等。
  - `if(){}`
  - `for(){}`
  - `switch(){case:xxx}`

:::

### 4.5. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/1/3/2.png')" alt="foo">
