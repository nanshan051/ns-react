---
title: 组件的生命周期
comments: true
tags:
  - 生命周期
  - 钩子
---

## 1. 引出生命周期

组件对象从创建到死亡，会经历特殊阶段。  
React 组件对象包含一系列 **钩子函数（生命周期回调函数）**，在特定的时刻调用。  
我们定义组件时，在特定的生命周期钩子函数中做特定的工作。

> 练习：
>
> 1. 标题的透明度从 1 逐渐降到 0（历时 2 秒），当降到 0 时立刻重置为 1。
> 2. 点击按钮销毁组件。

```jsx
class Life extends React.Component {
  state = { opacity: 1 };
  start = () => {
    // 卸载组件
    ReactDOM.unmountComponentAtNode(document.getElementById("test"));
  };

  // 组件挂载完毕（1次）
  componentDidMount() {
    console.log("componentDidMount");
    this.timer = setInterval(() => {
      let { opacity } = this.state;
      opacity -= 0.1;
      // js计算小数时存在精度丢失，所以这里的判断条件不能是==0
      if (opacity <= 0) {
        opacity = 1;
      }
      this.setState({ opacity });
    }, 200);
  }

  // 组件将要卸载（1次）
  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.timer);
  }

  // 初始化渲染（1次）、状态更新之后（n次）
  render() {
    console.log("render");
    return (
      <div>
        <h2 style={{ opacity: this.state.opacity }}>西游记第一回叫什么？</h2>
        <button onClick={this.start}>猿神，启动！</button>
      </div>
    );
  }
}
ReactDOM.render(<Life />, document.getElementById("test"));
```

::: warning 注意：

1. 组件中的 **定时器不能放在 `render()` 函数中**，因为状态更新时会重新调用 render() 函数，**如果频繁更新状态，则会不断的创建定时器**。
2. 组件的**生命周期钩子函数是被组件实例调用**，所以不会存在 this 指向问题，**而自定义函数可能作为回调函数来调用**，存在 `this` 指向问题，所以需要用箭头函数定义。
3. 生命周期钩子函数调用次数：
   - `render()`：`1`（初始化渲染） + **`n`（状态更新之后）**
   - `componentDidMount()`：`1`（组件挂载完毕）
   - `componentWillUnmount()`：`1`（组件将要卸载）

:::

示例如下：

<img class="zoomable" :src="$withBase('/images/screenshot/2/6/1.gif')" alt="screenshot">

## 2. react 生命周期（旧）

完整生命周期如下：绿色钩子是最常用的三个钩子。

<img class="zoomable" :src="$withBase('/images/screenshot/2/6/2.png')" alt="screenshot">

### 2.1. 组件自身主要流程

组件自身流程可以分为三条分支：

1. 挂载时
2. `setState()` 更新
3. `forceUpdate()` 强制更新

```jsx
class Count extends React.Component {
  // 构造器
  constructor(props) {
    console.log("Count---constructor");
    super(props);
    this.state = { count: 0 };
  }

  // 加1按钮的回调
  add = () => {
    console.log("加1");
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  // 卸载组件按钮的回调
  death = () => {
    console.log("卸载组件");
    ReactDOM.unmountComponentAtNode(document.getElementById("test"));
  };

  // 强制更新按钮的回调
  force = () => {
    console.log("强制更新");
    this.forceUpdate();
  };

  // 组件将要挂载的钩子
  componentWillMount() {
    console.log("Count---componentWillMount");
  }

  // 组件挂载完毕的钩子
  componentDidMount() {
    console.log("Count---componentDidMount");
  }

  // 组件将要卸载的钩子
  componentWillUnmount() {
    console.log("Count---componentWillUnmount");
  }

  // 组件是否应该被更新的钩子【控制组件更新的阀门】
  // 必须返回一个布尔值，true-更新，false-不更新
  // 如果不写该钩子，react会自动补上该钩子并默认返回true
  shouldComponentUpdate() {
    console.log("Count---shouldComponentUpdate");
    return true;
  }

  // 组件将要更新的钩子
  componentWillUpdate() {
    console.log("Count---componentWillUpdate");
  }

  // 组件更新完毕的钩子
  componentDidUpdate() {
    console.log("Count---componentDidUpdate");
  }

  // 挂载、更新的钩子
  render() {
    console.log("Count---render");
    return (
      <div>
        <h2>当前求和为：{this.state.count}</h2>
        <button onClick={this.add}>点我+1</button>&nbsp;
        <button onClick={this.death}>卸载组件</button>
        <button onClick={this.force}>
          不更改任何状态中的数据，强制更新一下
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Count />, document.getElementById("test"));
```

::: tip shouldComponentUpdate() 钩子的特性

1. 用于确认“是否应该更新组件”的生命周期钩子，**是控制组件更新的阀门**。
2. 如果写了该钩子，则 **必须返回一个布尔值**（不返回会报错），`true-更新`，`false-不更新`。
3. 如果没有写该钩子，`react` 会自动补上，并返回 `true`。
4. 调用 `forceUpdate()` 进行强制更新时，会跳过 `shouldComponentUpdate` 钩子。

:::

示例如下：

<img class="zoomable" :src="$withBase('/images/screenshot/2/6/3.gif')" alt="screenshot">

### 2.2. 父子传参更新流程

对应生命周期图中的流程 ④，在父组件 `A` 中修改状态中的数据 `this.state.carName`，触发了 `A` 的 `render()`，从而更新传给 `B` 的属性 `carName`，触发 `componentWillReceiveProps()`（组件将要接收新的 `props` 的钩子）。

```jsx
class A extends React.Component {
  state = { carName: "奔驰" };
  changeCar = () => {
    this.setState({ carName: "宝马" });
  };
  render() {
    return (
      <div>
        <span>我是父组件A</span>
        <button onClick={this.changeCar}>点我换车</button>
        <B carName={this.state.carName} />
      </div>
    );
  }
}

class B extends React.Component {
  // 组件将要接收新的props的钩子
  componentWillReceiveProps(props) {
    console.log("B---componentWillReceiveProps", props);
  }

  // 组件是否应该被更新的钩子
  shouldComponentUpdate() {
    console.log("B---shouldComponentUpdate");
    return true;
  }

  // 组件将要更新的钩子
  componentWillUpdate() {
    console.log("B---componentWillUpdate");
  }

  // 组件更新完毕的钩子
  componentDidUpdate() {
    console.log("B---componentDidUpdate");
  }

  render() {
    console.log("B---render");
    return (
      <div>
        <span>
          我是子组件B，接收到的车是
          <span>{this.props.carName}</span>
        </span>
      </div>
    );
  }
}

ReactDOM.render(<A />, document.getElementById("test"));
```

::: danger componentWillReceiveProps() 钩子的坑
**首次接收 `props` 时，不会触发 `componentWillReceiveProps()` 钩子。** 只有更新 props 时，才会触发。
:::

示例如下：

<img class="zoomable" :src="$withBase('/images/screenshot/2/6/4.gif')" alt="screenshot">

## 3. react 生命周期（新）

新版生命周期主要变化如下：
::: tip

- **去掉了 `3` 个钩子**：`componentWillMount()`、`componentWillReceiveProps()`、`componentWillUpdate()`。
- **增加了 `2` 个钩子**：`getDerivedStateFromProps()`、`getSnapshotBeforeUpdate()`。

:::

完整的新版生命周期如下：

<img class="zoomable" :src="$withBase('/images/screenshot/2/6/6.png')" alt="screenshot">

### 3.1. getDerivedStateFromProps()

静态 `getDerivedStateFromProps()` 钩子在组件实例化之后以及重新渲染之前调用。  
它接收两个参数 `(props, state)`，可以返回一个 **对象（用于更新 state**），或者返回 **`null`（不需要更新 state**）。

::: warning
使用场景及其罕见：  
若 `state` 的值在任何时候都取决于 `props`，那么可以使用 `getDerivedStateFromProps()` 钩子。
:::

```jsx
class Count extends React.Component {
  // 构造器
  constructor(props) {
    console.log("Count---constructor");
    super(props);
    this.state = { count: 0 };
  }

  // 加1按钮的回调
  add = () => {
    console.log("加1");
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  // 卸载组件按钮的回调
  death = () => {
    console.log("卸载组件");
    ReactDOM.unmountComponentAtNode(document.getElementById("test"));
  };

  // 强制更新按钮的回调
  force = () => {
    console.log("强制更新");
    this.forceUpdate();
  };

  // 若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
  static getDerivedStateFromProps(props, state) {
    console.log("Count---getDerivedStateFromProps", props, state);
    return props;
  }

  // 快照，用于保存更新前的参数
  getSnapshotBeforeUpdate() {
    console.log("Count---getSnapshotBeforeUpdate");
    return "保存一下";
  }

  // 组件挂载完毕的钩子
  componentDidMount() {
    console.log("Count---componentDidMount");
  }

  // 组件将要卸载的钩子
  componentWillUnmount() {
    console.log("Count---componentWillUnmount");
  }

  // 组件是否应该被更新的钩子【控制组件更新的阀门】
  shouldComponentUpdate() {
    console.log("Count---shouldComponentUpdate");
    return true;
  }

  // 组件更新完毕的钩子
  componentDidUpdate(preProps, preState, snapValue) {
    console.log("Count---componentDidUpdate", snapValue);
  }

  // 挂载、更新的钩子
  render() {
    console.log("Count---render");
    return (
      <div>
        <h2>当前求和为：{this.state.count}</h2>
        <button onClick={this.add}>点我+1</button>
        <button onClick={this.death}>卸载组件</button>
        <button onClick={this.force}>
          不更改任何状态中的数据，强制更新一下
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Count count={99} />, document.getElementById("test"));
```

<img class="zoomable" :src="$withBase('/images/screenshot/2/6/7.gif')" alt="screenshot">

### 3.2. getSnapshotBeforeUpdate()

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。  
**它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。**  
此生命周期方法的任何返回值将作为第三个参数传递给 `componentDidUpdate()`。

> 练习：
>
> 1. 每 1 秒新增一条新闻，最新的新闻放在顶部。
> 2. 滚动条出现后，新增新闻时希望当前所看新闻不发生滚动，仍然停留在原有位置。

```jsx
class NewsList extends React.Component {
  state = { newsArr: [] };

  componentDidMount() {
    setInterval(() => {
      const { newsArr } = this.state;
      const news = "新闻" + (newsArr.length + 1);
      this.setState({ newsArr: [news, ...newsArr] });
    }, 1000);
  }

  // 返回值作为componentDidUpdate的第三个参数
  getSnapshotBeforeUpdate() {
    return this.refs.list.scrollHeight;
  }

  // 在提交DOM节点之前，重新设置滚动条位置
  componentDidUpdate(preProps, preState, snapValue) {
    this.refs.list.scrollTop += this.refs.list.scrollHeight - snapValue;
  }

  render() {
    return (
      <div className="list" ref="list">
        {this.state.newsArr.map((item, index) => {
          return (
            <div className="news" key={index}>
              {item}
            </div>
          );
        })}
      </div>
    );
  }
}
ReactDOM.render(<NewsList />, document.getElementById("test"));
```

```css
.list {
  width: 200px;
  height: 150px;
  background-color: skyblue;
  overflow: auto;
}
.news {
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
}
```

<img class="zoomable" :src="$withBase('/images/screenshot/2/6/8.gif')" alt="screenshot">
