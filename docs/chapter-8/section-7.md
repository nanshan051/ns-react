---
title: render Props
comments: true
tags:
  - children Props
  - render Props
---

## 1. 如何向组件内部动态传入带内容的结构（标签）？

::: tip 实现方式：

- **Vue** 中：
  使用 `slot` 技术，也就是 **『插槽』**。

  1. 组件模板内预留插槽 `<slot name="xxx" :yyy="插槽向外传递的数据"></slot>` 。
  2. 使用组件时在标签体中通过 `<template v-slot:xxx>内容结构</template>` 标签，将内容插入到预留的插槽中。
  <p/>

- **React** 中，有两种方式实现：
  - 方式一：使用 `children props` ，通过组件 **『标签体』** 传入内容结构。
  - 方式二：使用 `render props` 通过组件 **『标签属性』** 传入内容结构，一般用 `render` 函数属性。

:::

## 2. children props

### 2.1. 用法

用法如下，src/component/7_renderProps/index.jsx：

```jsx{9-13,26-27}
import React, { PureComponent } from "react";
import "./index.css";

export default class Parent extends PureComponent {
  render() {
    return (
      <div className="component-Parent">
        <h2>我是Parent组件</h2>
        <A>
          {/* 2.使用组件A时在『标签体』中插入子组件B */}
          {/* 问题：组件A无法将自身状态传递给子组件B */}
          <B />
        </A>
      </div>
    );
  }
}

class A extends PureComponent {
  state = { carName: "比亚迪" };
  render() {
    return (
      <div className="component-A">
        <h2>我是A组件</h2>
        <p>汽车是：{this.state.carName}</p>
        {/* 1.组件A模板中预留插槽 */}
        {this.props.children}
      </div>
    );
  }
}

class B extends PureComponent {
  render() {
    return (
      <div className="component-B">
        <h2>我是B组件</h2>
        <p>我接收到的汽车是：{this.props.carName}</p>
      </div>
    );
  }
}
```

### 2.2. 问题

::: warning

这种方式存在一个问题：若 B 组件需要 A 组件中的数据，没有办法做到。  
即： **`children props` 插槽无法向外传递数据。**

:::

## 3. render props

### 3.1. 用法

用法如下，src/component/7_renderProps/index.jsx：

```jsx{10-15,32-35}
import React, { PureComponent } from "react";
import "./index.css";

export default class Parent extends PureComponent {
  render() {
    console.log("Parent---render");
    return (
      <div className="component-Parent">
        <h2>我是Parent组件</h2>
        {/* 2.将B组件插入到renderB插槽中，并接收数据carName */}
        {/* 2.将C组件插入到renderC插槽中，并接收数据phone */}
        <A
          renderB={(carName) => <B carName={carName} />}
          renderC={(phone) => <C phone={phone} />}
        />
      </div>
    );
  }
}

class A extends PureComponent {
  state = { carName: "比亚迪", phone: "小米" };
  render() {
    console.log("A---render");
    const { carName, phone } = this.state;
    return (
      <div className="component-A">
        <h2>我是A组件</h2>
        <p>
          汽车是：{carName}，手机是：{phone}
        </p>
        {/* 1.预留插槽renderB，并传递数据carName */}
        {this.props.renderB(carName)}
        {/* 1.预留插槽renderC，并传递数据phone */}
        {this.props.renderC(phone)}
      </div>
    );
  }
}

class B extends PureComponent {
  render() {
    console.log("B---render");
    return (
      <div className="component-B">
        <h2>我是B组件</h2>
        <p>我接收到的汽车是：{this.props.carName}</p>
      </div>
    );
  }
}

class C extends PureComponent {
  render() {
    console.log("C---render");
    return (
      <div className="component-C">
        <h2>我是C组件</h2>
        <p>我接收到的手机是：{this.props.phone}</p>
      </div>
    );
  }
}

```

### 3.2. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/8/7/1.gif')" alt="foo">
