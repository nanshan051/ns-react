---
title: 基本理解和使用
comments: true
tags:
  - 函数式组件
  - 类式组件
  - 类
---

## 1. 开发者调试工具

在 Chrome 扩展程序中安装 React 开发者调试工具：`React Developer Tools`。

<img class="zoomable" :src="$withBase('/images/screenshot/react/2/1/1.png')" alt="foo">

固定到浏览器工具栏后，查看 [Ant Design](https://ant-design.antgroup.com/docs/react/introduce-cn) 官网（是用 React 编写的），可以看到工具生效了：

<img class="zoomable" :src="$withBase('/images/screenshot/react/2/1/2.png')" alt="foo">

## 2. 函数式组件

### 2.1. 实现

```jsx{2,4}
// 1.创建函数式组件
function MyComponent() {
  console.log(this);
  return <h2>我是用函数定义的组件（适用于【简单组件】的定义）</h2>;
}
// 2.渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById("test"));
```

::: warning 注意：

1. **组件名首字母必须大写**，因为首字母小写的话，会将其转为 `html` 中的同名元素。
2. **虚拟 DOM 必须有结束标签**，自结束也行。
3. **`this` 指向的是 `undefined`**，因为 [babel](https://www.babeljs.cn/) 编译后开启了 **严格模式** ，禁止自定义函数中的 `this` 指向 `window` 。

:::

### 2.2. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/2/1/3.png')" alt="foo">

### 2.3. 思考

函数式组件在执行了 `ReactDOM.render(<MyCOmponent/>...)` 之后，发生了什么？

::: tip 回答：

1. React 解析组件标签，找到了 `MyComponent` 组件。
2. **发现组件是通过函数定义的，随后调用该函数**。
3. 将返回的虚拟 DOM 转为真实 DOM，随后呈现在页面中。

:::

## 3. 类式组件

### 3.1. 实现

```jsx{2,3,7}
// 1. 创建类式组件
class MyComponent extends React.Component {
  render() {
    // render放在MyComponent的原型对象上，供实例使用
    // render中的this指向MyComponent组件实例对象
    console.log("render中的this:", this);
    return <h2>我是用类定义的组件（适用于【复杂组件】的定义）</h2>;
  }
}
// 2. 渲染组件到页面
ReactDOM.render(<MyComponent />, document.getElementById("test"));
```

### 3.2. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/2/1/4.png')" alt="foo">

### 3.3. 思考

类式组件在执行了 `ReactDOM.render(<MyCOmponent/>...)` 之后，发生了什么？

::: tip 回答：

1. React 解析组件标签，找到了 `MyComponent` 组件。
2. **发现组件是通过类定义的，随后 `new` 出来该类的实例，并通过该实例调用原型上的 `render()` 方法。**
3. 将上一步返回的虚拟 DOM 转为真实 DOM，随后呈现在页面中。

:::

## 4. 复习：类的基本知识

> 详细介绍见 [ES6-class](https://es6.ruanyifeng.com/#docs/class)

创建 Person 类：

```jsx
class Person {
  // 构造器方法
  constructor(name, age) {
    // this指向类的实例对象
    this.name = name;
    this.age = age;
  }
  // 一般方法
  speak() {
    // speak方法放在类的原型对象上，供实例使用
    // 通过Person实例调用speak方法时，speak中的this就是Person实例
    console.log(`我叫${this.name}，年龄是${this.age}岁`);
  }
}
// 创建一个Person的实例对象
const person = new Person("张三", 18);
console.log(person);
person.speak();
```

创建 Student 类，继承于 Person 类:

```jsx{3,7}
class Student extends Person {
  constructor(name, age, grade) {
    // 子类构造器中所有this相关的指令都要放在super后面，否则会报错
    super(name, age);
    this.grade = grade;
  }
  // 重写从父类继承过来的方法
  speak() {
    console.log(
      `我叫${this.name}，年龄是${this.age}岁，我读的是${this.grade}年级`,
    );
  }
  study() {
    // study方法放在类的原型对象上，供实例使用
    // 通过Student实例调用study方法时，study中的this就是Student实例
    console.log("我很努力地学习");
  }
}
// 创建一个Student的实例对象
const student = new Student("李四", 20, "高三");
console.log(student);
student.speak();
student.study();
```

::: tip 总结：

1. **类中的构造器不是必须写**，要对实例进行一些初始化的操作，如添加指定属性时，才写。
2. 如果 B 类继承自 A 类，且 B 类中写了构造器，那么 **B 类构造器中的 `super` 是必须要调用的。**
3. 类中定义的方法，都是放在了**类的原型对象上**，供实例去使用。

:::
