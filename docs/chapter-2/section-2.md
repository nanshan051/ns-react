---
title: 组件实例三大属性1：state
comments: true
tags:
  - state
  - this
  - 箭头函数
---

## 1. 理解

`state` 是组件对象最重要的属性，值是对象（可以包含多个数据）。  
组件被称为“状态机”，通过更新组件的 `state` 来更新对应的页面显示（重新渲染组件）。

## 2. 复习：原生事件绑定

原生事件绑定一般分为以下三种方式：

```html
<body>
  <button id="btn1">按钮1</button>
  <button id="btn2">按钮2</button>
  <button onclick="demo()">按钮31</button>

  <script type="text/javascript">
    // 方式1
    const btn1 = document.getElementById("btn1");
    btn1.addEventListener("click", () => {
      alert("按钮1被点击了");
    });

    // 方式2
    const btn2 = document.getElementById("btn2");
    btn2.onclick = () => {
      alert("按钮2被点击了");
    };

    // 方式3
    function demo() {
      alert("按钮3被点击了");
    }
  </script>
</body>
```

由于方式 3 不需要获取元素，而是直接在 `html` 标签中指定事件回调，写法最简洁，**因此通常采用 `方式3`。**

## 3. 实例

### 3.1. 精炼代码

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHot: false };
    this.changeWeather = this.changeWeather.bind(this);
  }
  render() {
    const { isHot } = this.state;
    return (
      <h2 onClick={this.changeWeather}>今天天气很{isHot ? "炎热" : "凉爽"}</h2>
    );
  }
  changeWeather() {
    const { isHot } = this.state;
    this.setState({ isHot: !isHot });
  }
}

ReactDOM.render(<Weather />, document.getElementById("test"));
```

### 3.2. 详细讲解

```jsx{9-14,23-24,30-34}
// 1. 创建组件
class Weather extends React.Component {
  constructor(props) {
    // 调用1次，生成实例时
    console.log("constructor");
    super(props);
    // 初始化状态
    this.state = { isHot: false };
    // 解决changeWeather中this指向问题：
    // (1).先读右侧，此时实例对象上没有changeWeather，顺着原型链找，在Weather原型上找到changeWeather
    // (2).生成一个新的函数并将其this（调用者）指向实例对象
    // (3).将生成的函数赋给实例对象，并命名为changeWeather
    // (4).此时实例对象和Weather原型上都存在changeWeather方法，依据就近原则会调用实例对象的changeWeather方法
    this.changeWeather = this.changeWeather.bind(this);
    console.log(this);
  }
  render() {
    // 调用1+n次，1是初始化的那次，n是状态更新的次数
    console.log("render");
    // 读取状态
    const { isHot } = this.state;
    return (
      // 依据就近原则会调用实例对象的changeWeather方法
      <h2 onClick={this.changeWeather}>今天天气很{isHot ? "炎热" : "凉爽"}</h2>
    );
  }
  changeWeather() {
    // 点几次调几次
    console.log("changeWeather");
    // changeWeather中this指向问题:
    // (1).changeWeather放在原型对象上，供实例使用
    // (2).由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
    // (3).类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
    const { isHot } = this.state;
    // 注意：状态（state）不可直接更改，必须通过setState来更改，否则不是响应式的。
    // setState更改是合并，不是替换。
    this.setState({ isHot: !isHot });
  }
}
// 2. 渲染组件到页面
ReactDOM.render(<Weather />, document.getElementById("test"));
```

### 3.3. 注意事项

::: warning 注意事项：

1. `state` 是一个对象（默认为 `null`），用于存放数据，需要在构造器方法中进行初始化。
2. `React` 自己写了一套事件绑定机制，以`on`开头，**与原生不同，注意大小写：**
   - 原生事件绑定：`onclick`
   - `React` 事件绑定：`onClick`
3. **事件回调函数调用时，是直接调用，不是通过实例调用，因此默认情况下 `this` 本来是 `window` ，但是由于类中的方法默认开启了严格模式，因此 `this` 是`undefined` 。**
4. `bind()` 方法会生成一个新函数，**并将新函数的 `this` 指向传入的第一个参数。**
5. 函数调用时，会采用**就近原则**。
6. **`state` 不能直接修改，必须通过 `setState()` 来修改，否则不是响应式的。**
7. 组件内函数调用次数：
   - 构造器：`1` 次
   - render：`1 + n`次（n 为状态更新次数）
   - 事件回调：触发几次调几次

:::

### 3.4. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/2/2/1.png')" alt="foo">

## 4. 简写方式

ES2022 为类的实例属性规定了一种新写法。实例属性（**包括方法**）除了可以定义在 `constructor()`方法里面的 `this` 上面，也可以通过赋值语句定义在类内部的最顶层，此时不需要写 `this`：

```jsx{3-4,11-16}
// 1. 创建组件
class Weather extends React.Component {
  // 在类内部的最顶层，通过赋值语句为实例设置属性，赋值语句左侧不需要写this
  state = { isHot: false };
  render() {
    const { isHot } = this.state;
    return (
      <h2 onClick={this.changeWeather}>今天天气很{isHot ? "炎热" : "凉爽"}</h2>
    );
  }
  changeWeather = () => {
    // 箭头函数没有自己的this，由外层作用域决定。此时向外层查找时，this指向Weather实例对象
    console.log('此时箭头函数中的this：', this);
    const { isHot } = this.state;
    this.setState({ isHot: !isHot });
  };
}
// 2. 渲染组件到页面
ReactDOM.render(<Weather />, document.getElementById("test"));
```

::: warning 注意：

在类内部的最顶层，**通过赋值语句定义的属性（包括方法）最终是放在实例对象上的，而不是放在类的原型对象上。**

:::

<img class="zoomable" :src="$withBase('/images/screenshot/2/2/2.png')" alt="foo">

::: tip 简写优点：

1. 可以直接在类的最顶层，通过赋值语句为实例设置属性，**不需要在构造器里设置实例属性**。
2. 箭头函数解决了类中一般方法的 `this` 指向问题，**省去了 `bind()`绑定**。

:::

## 5. 解决【this 问题】

解决类中一般方法中的 this 问题，有以下两种方式：

1. 使用 `bind()` 方法绑定 `this`

```js
class Weather extends React.Component {
  constructor(props) {
    // bind()绑定
    this.changeWeather = this.changeWeather.bind(this);
  }
  changeWeather() {
    // this...
  }
}
```

2. 使用箭头函数 **（推荐）**

```jsx
class Weather extends React.Component {
  // 箭头函数
  changeWeather = () => {
    // this...
  };
}
```
