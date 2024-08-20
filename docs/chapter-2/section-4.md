---
title: 组件实例三大属性3：refs与事件处理
comments: true
tags:
  - ref
  - refs
  - 注释
---

组件内的标签都可以定义 ref 属性来标识自己。

## 1. 字符串式 ref

标签的 `ref` 属性是 **字符串** 时，可以通过组件实例的属性 `refs` 来访问其真实 DOM。  
不推荐这种写法，因为已经不更新了，后面可能会取消。

::: warning
`jsx` 中不能直接使用 js 中的注释方式。  
但是可以**在 js 注释外部包裹一层花括号**，标识内部是 js 语法，如 `{/*这是注释*/}` 。
:::

```jsx{4-5,11-12}
class Demo extends React.Component {
  showData = () => {
    console.log(this);
    // 通过组件实例属性refs访问真实DOM
    const { myInput } = this.refs;
    console.log(myInput.value);
  };
  render() {
    return (
      <div>
        {/*字符串式ref*/}
        <input ref="myInput" type="text" palceholder="点击按钮打印内容" />
        <button onClick={this.showData}>点我打印输入内容</button>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("test"));
```

<img class="zoomable" :src="$withBase('/images/screenshot/2/4/1.png')" alt="screenshot">

## 2. 回调函数式 ref

标签 `ref` 属性是一个 **回调函数** 时，可以在回调函数中标识对应标签。

::: warning 注意：

- `字符串式` ：会将 ref 标签放在组件 **组件实例的 `refs` 属性** 中。
- `回调函数` ：此例将 ref 标签放直接放在 **组件实例身上** 。

:::

回调函数分为两种：内联函数和 class 绑定函数。

### 2.1 内联函数

直接定义在组件内标签上的函数，称为 **内联函数** 。

```jsx{4-5,14-17}
class Demo extends React.Component {
  showData = () => {
    console.log(this);
    // 通过组件实例访问真实DOM
    const { myInput } = this;
    console.log(myInput.value);
  };
  render() {
    return (
      <div>
        {/*内联函数*/}
        {/*回调函数将ref标签放在组件实例上*/}
        <input
          ref={(e) => {
            console.log('回调参数：', e);
            this.myInput = e;
          }}
          type="text"
          placeholder="点击按钮打印内容"
        />
        <button onClick={this.showData}>点我打印输入内容</button>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("test"));
```

<img class="zoomable" :src="$withBase('/images/screenshot/2/4/2.png')" alt="screenshot">

### 2.2 class 绑定函数

定义在组件实例身上的函数，称为 **class 绑定函数** 。

```jsx{4,9,17}
class Demo extends React.Component {
  setMyInput = (e) => {
    console.log("回调参数：", e);
    this.myInput = e;
  };
  showData = () => {
    console.log(this);
    // 通过组件实例访问真实DOM
    const { myInput } = this;
    console.log(myInput.value);
  };
  render() {
    return (
      <div>
        {/*自定义函数*/}
        <input
          ref={this.setMyInput}
          type="text"
          placeholder="点击按钮打印内容"
        />
        <button onClick={this.showData}>点我打印输入内容</button>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("test"));
```

### 2.3 两种回调函数的区别

::: warning

- `内联函数`：**每次更新数据时都会重新执行**（与组件的 render() 函数的执行次数相同）。
- `class 绑定函数`：**只会在挂载和卸载时执行一次**。

:::

## 3. 使用 createRef

`React.createRef()` 函数（16.3 版本引入），返回一个容器，容器只有一个属性 `current`（默认为 null ），用于存放被 `ref` 所标识的节点。

::: tip 用法：

1. 通过 `React.createRef()` 生成一个容器。
2. 将容器作为组件内标签的 `ref` 属性值，React 会将该节点放入到容器中。
3. 通过 `current` 属性访问容器中的节点。

:::

```jsx{2-3,7-8,13-15}
class Demo extends React.Component {
  // 1.生成一个容器
  myRef = React.createRef();

  showData = () => {
    console.log(this);
    // 3.通过current属性访问容器中的节点
    console.log(this.myRef.current.value);
  };
  render() {
    return (
      <div>
        {/* 2.将这个input放入到容器myRef中 */}
        <input
          ref={this.myRef}
          type="text"
          placeholder="点击按钮打印内容"
        />
        <button onClick={this.showData}>点我打印输入内容</button>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("test"));
```

<img class="zoomable" :src="$withBase('/images/screenshot/2/4/3.png')" alt="screenshot">

## 4. 事件处理

- 通过 `onXxx` 属性指定事件处理函数（注意大小写）。
  - React 使用的是自定义（合成）事件，而不是使用的原生 DOM 事件。 ———— 为了更好的兼容性
  - React 中的事件是通过事件委托方式处理的（委托给组件最外层的元素）。
- 通过 `event.target` 得到发生事件的 DOM 元素对象。

> 发生事件的元素正好是要操作的元素时，可以省略 ref，通过 `event.target` 获取当前元素。

```jsx{4-5}
class Demo extends React.Component {
  showData = (event) => {
    console.log("event.target:", event.target);
    // 通过event.target获取发生事件的元素
    console.log(event.target.value);
  };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="失去焦点时打印内容"
          onBlur={this.showData}
        />
      </div>
    );
  }
}
ReactDOM.render(<Demo />, document.getElementById("test"));
```

<img class="zoomable" :src="$withBase('/images/screenshot/2/4/4.png')" alt="screenshot">
