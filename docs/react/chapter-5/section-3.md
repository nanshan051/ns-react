---
title: NavLink 组件
comments: true
tags:
  - NavLink
---

## 1. NavLink 组件的使用

`NavLink` 也是 `react-router-dom` 的核心组件，用于实现导航链接。

在上一小节案例的基础上，用 `NavLink` 替换 `Link` ：（这一小节只展示关键代码，省略其他部分。）

```jsx
import { NavLink } from "react-router-dom";

<NavLink className="list-group-item" to="/about"> About </NavLink>
<NavLink className="list-group-item" to="/home"> Home </NavLink>
```

与 `Link` 不同的是，`NavLink` 在当前路径和给定的路径匹配时会添加一个标签类名，默认为 `active`。

而 `bootstrap` 的样式中，`.active` 类会设置背景色，因此切换路由时，对应路由链接会显示蓝色背景：

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/3/1.gif')" alt="foo">

## 2. 自定义激活类名

`NavLink` 的这个激活类名可以自定义，通过 `activeClassName` 属性设置，这里设为 my-active，并指定样式：

App.jsx：

```jsx
import { NavLink } from "react-router-dom";
import "./App.css";

<NavLink className="list-group-item" activeClassName="my-active" to="/about"> About </NavLink>
<NavLink className="list-group-item" activeClassName="my-active" to="/home"> Home </NavLink>
```

App.css：

```css
.my-active {
  background-color: lightpink;
}
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/3/2.gif')" alt="foo">

## 3. 封装 NavLink

多个导航链接的样式相同，为避免重复书写 className 和 activeClassName， 可以封装成 `MyNavLink` 组件。

### 3.1. src 目录：

```sh
src
├── App.jsx
├── components
|  ├── Header
|  |  └── index.jsx
|  └── MyNavLink
|     ├── index.css
|     └── index.jsx
├── index.js
└── pages
   ├── About
   |  └── index.jsx
   └── Home
      └── index.jsx
```

### 3.2. 根组件

App.jsx：

```jsx
import MyNavLink from "./components/MyNavLink";

// 第1步：MyNavLink的标签体内容，会作为children属性，保存在自身的props中
<MyNavLink to="/about">About</MyNavLink>
<MyNavLink to="/home">Home</MyNavLink>
```

### 3.3. MyNavLink 组件

components/MyNavLink/index.jsx：

```jsx
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default class MyNavLink extends Component {
  render() {
    console.log("MyNavLink 的 props", this.props);
    return (
      // 第2步：MyNavLink将自身的props全部传给 NavLink，包括children属性
      <NavLink
        className="list-group-item"
        activeClassName="my-active"
        {...this.props}
      ></NavLink>
      // 第3步：NavLink接收到的children属性，会被转换为自身的标签体内容，进行渲染
    );
  }
}
```

components/MyNavLink/index.css：

```css
.my-active {
  background-color: lightpink;
}
```

### 3.4. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/3/3.gif')" alt="foo">

### 3.5. 标签体传递的过程

::: tip 标签体传递的过程：

- 第 1 步：MyNavLink 的标签体内容，会 **转换** 为 children 属性，保存在自身的 props 中。
  - `父标签体 => 父props(children)`
  - <img class="zoomable" :src="$withBase('/images/screenshot/react/5/3/4.png')" alt="foo">
- 第 2 步：MyNavLink 将自身的 props 全部 **传递** 给 NavLink，包括 children 属性。
  - `父props(children) => 子props(children)`
  - （见 MyNavLink 组件代码）
- 第 3 步：NavLink 接收到的 children 属性，会被 **转换** 为自身的标签体内容，进行渲染。
  - `子props(children) => 子标签体`
  - <img class="zoomable" :src="$withBase('/images/screenshot/react/5/3/5.png')" alt="foo">

确实很妙！ 👍👍👍👍👍👍

:::
