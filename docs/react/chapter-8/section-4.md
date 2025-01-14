---
title: Fragment
comments: true
tags:
  - Fragment
---

## 1. Fragment

::: tip Fragment

`<Fragment>` 标签是 React 中用于包裹一组子元素的容器，它不会在 DOM 中生成任何额外的元素。

- 作用：**可以不用必须有一个真实的 DOM 根标签了。**

- 与 **『空标签 `<></>` 』** 不同： `<Fragment>` 在循环遍历时，可以指定 `key` 属性，而空标签不行。

:::

## 2. 组件有根标签

### 2.1. App 组件

src/App.jsx：

```jsx
import React, { Component, Fragment } from "react";
import Demo from "./components/4_Fragment";

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Demo />
      </div>
    );
  }
}
```

### 2.2. Demo 组件

src/components/4_Fragment/index.jsx：

```jsx
import React, { Component, Fragment } from "react";

export default class Demo extends Component {
  render() {
    return (
      <div id="demo">
        <input type="text" />
        <p />
        <input type="text" />
      </div>
    );
  }
}
```

### 2.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/4/1.png')" alt="foo">

由上图可以看出，App 组件和 Demo 组件由于必须要有一个根标签，所有在实际内容外各包裹了一层 `<div>` 标签，显得很鸡肋。

## 3. 组件无根标签

### 3.1. App 组件

src/App.jsx：

```jsx
import React, { Component, Fragment } from "react";
import Demo from "./components/4_Fragment";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Demo />
      </Fragment>
    );
  }
}
```

### 3.2. Demo 组件

src/components/4_Fragment/index.jsx：

```jsx
import React, { Component, Fragment } from "react";

export default class Demo extends Component {
  render() {
    return (
      <Fragment>
        <input type="text" />
        <p />
        <input type="text" />
      </Fragment>
    );
  }
}
```

### 3.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/8/4/2.png')" alt="foo">

由上图可以看出，App 组件和 Demo 组件由于使用了 `<Fragment>`，所以不会生成多余的 DOM 元素，实际内容直接加载到 root 节点下。
