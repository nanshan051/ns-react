---
title: 组件优化
comments: true
tags:
  - 优化
  - setState({})
  - shouldComponentUpdate
  - PureComponent
---

React 的 `Component` 存在两大问题：（1）`setState({})` 触发重新渲染；（2）子组件自动重新渲染。

## 1. setState({})触发重新渲染

只要执行了 `setState()` 方法，即使不改变状态数据，组件也会重新` render()` ，这就导致『效率低』。

### 1.1. Demo 组件

src/components/6\_组件优化/index.jsx：

```jsx
import React, { Component } from "react";
import "./index.css";

export default class Parent extends Component {
  state = { carName: "比亚迪" };
  feint = () => {
    this.setState({});
  };
  render() {
    console.log("Parent---render");
    const { carName } = this.state;
    return (
      <div className="component-Parent">
        <h2>我是A组件</h2>
        <p>汽车是：{carName}</p>
        <button onClick={this.feint}>点我虚晃一下</button>
      </div>
    );
  }
}
```

### 1.2. 问题

<img class="zoomable" :src="$withBase('/images/screenshot/8/6/1.gif')" alt="foo">

从上图可以看出，`setState({})` 没有改变状态数据，仍然触发了组件 `render()` 。

### 1.3. 优化

::: tip

在类组件中，可以重写 `shouldComponentUpdate()` 方法，根据新状态和旧状态进行比较，只有当状态有变化时才返回 `true`。

:::

在 src/components/6\_组件优化/index.jsx 中添加：

```jsx
shouldComponentUpdate(nextProps, nextState) {
  console.log(nextProps, nextState);
  return nextState.carName !== this.state.carName;
}
```

<img class="zoomable" :src="$withBase('/images/screenshot/8/6/2.gif')" alt="foo">

从上图可以看出，`shouldComponentUpdate` 相当于控制组件更新的阀门，只有当状态 `carName` 发生变化时才会触发组件 `render()`。

## 2. 子组件自动重新渲染

只要当前组件 `render()` ，就会自动重新 `render` 子组件，即使子组件的 `props` 和 `state` 都没有变化。

### 2.1. Demo 组件

src/components/6\_组件优化/index.jsx：

```jsx
import React, { Component } from "react";
import "./index.css";

export default class Parent extends Component {
  state = { carName: "比亚迪" };
  changeCar = () => {
    this.setState({ carName: "特斯拉" });
  };
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.carName !== this.state.carName;
  }
  render() {
    console.log("Parent---render");
    const { carName } = this.state;
    return (
      <div className="component-Parent">
        <h2>我是A组件</h2>
        <p>汽车是：{carName}</p>
        <button onClick={this.changeCar}>点我换车</button>
        {/* 这里给Child传的carName为固定值，与Parent的状态无关 */}
        <Child carName="小米" />
      </div>
    );
  }
}

class Child extends Component {
  render() {
    console.log("Child---render");
    return (
      <div className="component-Child">
        <h2>我是B组件</h2>
        <p>我接收到的汽车是：{this.props.carName}</p>
      </div>
    );
  }
}
```

### 2.2. 问题

<img class="zoomable" :src="$withBase('/images/screenshot/8/6/3.gif')" alt="foo">

从上图可以看出，子组件接收的 carName 为固定值，与父组件的状态无关，当父组件 `render()` 时，自动重新 `render` 子组件。

### 2.3. 优化

::: tip

在子组件中，可以重写 `shouldComponentUpdate()` 方法，根据新属性进行比较，只有当属性有变化时才返回 `true`。

:::

在 src/components/6\_组件优化/index.jsx 中添加：

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.carName !== this.props.carName;
}
```

<img class="zoomable" :src="$withBase('/images/screenshot/8/6/4.gif')" alt="foo">

从上图可以看出，只有当子组件接收到的 `carName` 发生变化时才会重新渲染。

## 3. PureComponent

### 3.1. PureComponent

::: tip

在类组件中，可以使用 `PureComponent` 代替 `Component`，**它会自动对 `props` 和 `state` 进行浅层对比，只有当它们不同时才会重新渲染组件。**

- 相当于 `PureComponent` 帮我们实现了 `shouldComponentUpdate` 的功能。

:::

对前述两个问题采用 `PureComponent` 进行优化（**<font color="red">推荐</font>**）：

src/components/6\_组件优化/index.jsx：

```jsx
import React, { PureComponent } from "react";
import "./index.css";

export default class Parent extends PureComponent {
  state = { carName: "比亚迪" };
  feint = () => {
    this.setState({});
  };
  changeCar = () => {
    this.setState({ carName: "特斯拉" });
  };
  /* shouldComponentUpdate(nextProps, nextState) {
    return nextState.carName !== this.state.carName;
  } */
  render() {
    console.log("Parent---render");
    const { carName } = this.state;
    return (
      <div className="component-Parent">
        <h2>我是A组件</h2>
        <p>汽车是：{carName}</p>
        <button onClick={this.feint}>点我虚晃一下</button>&nbsp;
        <button onClick={this.changeCar}>点我换车</button>
        {/* 这里给Child传的carName为固定值，与Parent的状态无关 */}
        <Child carName="小米" />
      </div>
    );
  }
}

class Child extends PureComponent {
  /* shouldComponentUpdate(nextProps, nextState) {
    return nextProps.carName !== this.props.carName;
  } */
  render() {
    console.log("Child---render");
    return (
      <div className="component-Child">
        <h2>我是B组件</h2>
        <p>我接收到的汽车是：{this.props.carName}</p>
      </div>
    );
  }
}
```

<img class="zoomable" :src="$withBase('/images/screenshot/8/6/5.gif')" alt="foo">

### 3.2. 问题

::: warning

当 `props` 或 `state` 是 **『复杂数据结构』**（对象、数组等）时，`PureComponent` 浅层对比会有问题。  
当 **直接修改原对象或数组时**，由于新变量与原变量指向同一地址，**浅层对比时无法触发组件重新渲染。**

:::

新建 Class 组件，存储复杂数据（对象、数组），进行演示：  
src/components/6\_组件优化/index.jsx：

```jsx{16-18,23-26}
import React, { PureComponent } from "react";
import "./index.css";

export default class Class extends PureComponent {
  state = {
    // 复杂数据结构：对象（teacher）和数组（students）
    teacher: { name: "托尼" },
    students: [
      { id: "001", name: "张三", age: 18 },
      { id: "002", name: "李四", age: 19 },
    ],
  };
  changeTeacher = () => {
    // 对象赋值拷贝属于浅拷贝，新变量与原变量指向同一地址
    // 浅层对比认为地址相同，不更新
    const obj = this.state.teacher;
    obj.name = "杰克";
    this.setState({ teacher: obj });
  };
  addStudent = () => {
    // 数组赋值拷贝属于浅拷贝，新变量与原变量指向同一地址
    // 浅层对比认为地址相同，不更新
    const list = this.state.students;
    const newStudent = { id: "003", name: "王五", age: 20 };
    list.push(newStudent);
    this.setState({ students: list });
  };
  render() {
    const { teacher, students } = this.state;
    return (
      <div className="component-Parent">
        <h2>我是Class组件</h2>
        <p>老师是：{teacher.name}</p>
        <p>学生有：</p>
        <ul>
          {students.map((item) => {
            return (
              <li key={item.id}>
                {item.name}--{item.age}
              </li>
            );
          })}
        </ul>
        <button onClick={this.changeTeacher}>点我更换老师</button>&nbsp;
        <button onClick={this.addStudent}>点我添加学生</button>
      </div>
    );
  }
}
```

<img class="zoomable" :src="$withBase('/images/screenshot/8/6/6.gif')" alt="foo">

### 3.3. 优化

::: tip

当 `props` 或 `state` 是复杂数据结构时，更新状态 **应该采用扩展运算符 `...` 生成新的数组或对象，避免直接修改原数据。** 这样，在浅层比较时，新变量与原变量指向不同地址，会触发组件重新渲染。

:::

修改 Class 组件中的更新复杂数据的方法：

```jsx{10-13,25-28}
changeTeacher = () => {
  // 对象赋值拷贝属于浅拷贝，新变量与原变量指向同一地址
  // 浅层对比认为地址相同，不更新
  /* const obj = this.state.teacher;
    obj.name = "杰克";
    this.setState({ teacher: obj }); */

  // 新生成一个对象属于深拷贝，新对象与原对象指向不同地址
  // 浅层对比认为地址不同，更新
  const { teacher } = this.state;
  this.setState({
    teacher: { ...teacher, name: "杰克" },
  });
};
addStudent = () => {
  // 数组赋值拷贝属于浅拷贝，新变量与原变量指向同一地址
  // 浅层对比认为地址相同，不更新
  /*  const list = this.state.students;
    const newStudent = { id: "003", name: "王五", age: 20 };
    list.push(newStudent);
    this.setState({ students: list }); */

  // 新生成一个数组属于深拷贝，新数组与原数组指向不同地址
  // 浅层对比认为地址不同，更新
  const { students } = this.state;
  const newStudent = { id: "003", name: "王五", age: 20 };
  this.setState({
    students: [...students, newStudent],
  });
};
```

<img class="zoomable" :src="$withBase('/images/screenshot/8/6/7.gif')" alt="foo">
