---
title: 虚拟DOM与DOM Diffing算法
comments: true
tags:
  - 虚拟DOM
  - diff
---

## 1. 验证 diff 算法

状态发生变化时，`diff` 算法会尽量减少真实 DOM 的更新，做到局部更新，而不是重新渲染整个页面。

<img class="zoomable" :src="$withBase('/images/screenshot/2/7/1.gif')" alt="screenshot">

代码：

```jsx
class Time extends React.Component {
  state = { date: new Date() };
  componentDidMount() {
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }
  render() {
    return (
      <div>
        <h2>hello</h2>
        <span>
          现在是：{this.state.date.toTimeString()}
          <br />
          <br />
          <input type="text" />
        </span>
      </div>
    );
  }
}
ReactDOM.render(<Time />, document.getElementById("test"));
```

## 2. 虚拟 DOM 中 key 的作用

- 简单的说：`key` 是 `虚拟 DOM 对象`的标识，在更新显示时 key 起着极其重要的作用。

- 详细的说：当状态中的数据发生变化时，react 会根据【新数据】生成【新的虚拟 DOM】，随后 react 进行 【新虚拟 DOM】 与【旧虚拟 DOM】 的 `diff` 比较。

::: tip 比较规则：

注意：`diff` 比较是分层比较的，**只进行同层节点的比较，基本上不进行跨层级操作。**  
两棵树进行比较时，若父节点不同，则直接销毁该节点及其子树，并新建节点及其子树，不会尝试复用；若相同，则进行子节点的比较:

1. 旧虚拟 DOM 中 **找到了** 与新虚拟 DOM 有相同的 `key` 和 `type` 的节点 ：

   （1）若虚拟 DOM 中 **内容没变，直接使用之前的真实 DOM**  
   （2）若虚拟 DOM 中内容变了，则生成新的真实 DOM，随后替换掉页面中旧的真实 DOM。

2. 旧虚拟 DOM 中 **未找到** 与新虚拟 DOM 有相同的 `key` 和 `type` 的节点：

   根据数据创建新的真实 DOM，随后渲染到页面

:::

## 3. 用 index 作为 key 会引发的问题：

::: warning index 作为 key 的问题：

1. 若对数据进行：逆序添加、逆序删除等 **破坏顺序的操作**：  
   会产生没有必要的真实 DOM 更新 ==> 界面效果没问题，但 **<font color="red">效率低</font>**
2. 如果结构中还包含 **输入类的 DOM** ：  
   会产生错误的 DOM 更新 ==> **<font color="red">界面有问题</font>**  
   因为 **输入类的真实 DOM 有`value`属性，而虚拟 DOM 没有`value`属性**，`diff` 算法不会比较该值，会认为是相同节点，会复用之前的 DOM，所以之前输入的内容会保存。
3. 注意：**如果不存在对数据的逆序操作**：  
   仅用于渲染列表用于展示，使用 index 作为 key **是没有问题的**

:::

### 3.1. 代码

```jsx
class Person extends React.Component {
  state = {
    persons: [
      { id: 1, name: "小张", age: 18 },
      { id: 2, name: "小李", age: 19 },
    ],
  };
  add = () => {
    const { persons } = this.state;
    const person = {
      id: persons.length + 1,
      name: "小王",
      age: 20,
    };
    this.setState({
      persons: [person, ...persons],
    });
  };
  render() {
    console.log(this);
    return (
      <div>
        <button onClick={this.add}>添加一个小王</button>
        <h3>使用index索引值作为key</h3>
        <ul>
          {this.state.persons.map((person, index) => {
            return (
              <li key={index}>
                {person.name}---{person.age}
                <input type="text" />
              </li>
            );
          })}
        </ul>
        <hr />
        <h3>使用id（数据的唯一标识）作为key</h3>
        <ul>
          {this.state.persons.map((person) => {
            return (
              <li key={person.id}>
                {person.name}---{person.age}
                <input type="text" />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const p = new Person();
console.log("虚拟DOM", p.render());
ReactDOM.render(<Person />, document.getElementById("test"));
```

### 3.2. 演示

<img class="zoomable" :src="$withBase('/images/screenshot/2/7/2.gif')" alt="screenshot">

### 3.3. 虚拟 DOM 对象

<img class="zoomable" :src="$withBase('/images/screenshot/2/7/3.png')" alt="screenshot">
 
 虚拟DOM对象属性：

| 属性          | 类型                 | 描述                                                           |
| ------------- | -------------------- | -------------------------------------------------------------- |
| _$$typeof_    | Symbol               | 标志该对象是否是 React Element                                 |
| **_`key`_**   | string/null          | 虚拟 DOM 的 **唯一标识**                                       |
| _ref_         | string/function/null | 真实 DOM 节点或 React 元素的索引                               |
| **_`type`_**  | string/function      | 虚拟 DOM 元素类型（包括 `DOM Element` 和 `Component Element`） |
| **_`props`_** | object               | 虚拟 DOM 元素属性，**包含 `children`**                         |
| _\_owner_     | object               | 指明虚拟 DOM 的父元素                                          |
| _\_store_     | object               | 未知                                                           |

参考：[https://juejin.cn/post/6844904122974470151](https://juejin.cn/post/6844904122974470151)

### 3.4. diff 对比

<img class="zoomable" :src="$withBase('/images/screenshot/2/7/4.png')" alt="screenshot">

旧数据及真实 DOM：
<img class="zoomable" :src="$withBase('/images/screenshot/2/7/5.png')" alt="screenshot">

新数据及真实 DOM：
<img class="zoomable" :src="$withBase('/images/screenshot/2/7/6.png')" alt="screenshot">

参考：[https://juejin.cn/post/6919302952486174733](https://juejin.cn/post/6919302952486174733)

## 4. 开发中如何选择 key？

1. 最好使用每条数据的唯一标识作为 key，比如 `id` 、手机号、身份证号、学号等唯一值。
2. 如果确定只是简单的展示数据，用 index 也是可以的。
