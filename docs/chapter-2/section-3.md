---
title: 组件实例三大属性2：props
comments: true
tags:
  - props
  - 扩展运算符
---

## 1. 理解

每个组件实例对象都会有 `props` 属性。  
组件标签的所有属性都保存在 `props` 属性中。

## 2. 作用

通过标签属性从组件外向组件内传递变化的数据。  
注意：组件内部不要修改 `props` 数据。

## 3. 基本使用

```jsx{3-4,,15-16}
class Person extends React.Component {
  render() {
    // 组件内通过实例对象的 props 获取外部传入的值
    const { name, sex, age } = this.props;
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    );
  }
}
ReactDOM.render(
  // 通过标签属性向组件内传值
  <Person name="tom" sex="男" age={18} />,
  document.getElementById("test"),
);
```

## 4. 复习：扩展运算符

扩展运算符 `...` 可以用于数组、函数、对象中。用法如下：

1. 在数组中：

```js
let arr1 = [1, 3, 5, 7, 9];
let arr2 = [2, 4, 6, 8, 10];
console.log(...arr1); // 展开一个数组
let arr3 = [...arr1, ...arr2]; // 连接数组
```

2. 在函数中

```js
// 函数传参
function sum(...numbers) {
  console.log(numbers); // [1,2,3]
  return numbers.reduce((preValue, currentValue) => {
    return preValue + currentValue;
  });
}
console.log(sum(1, 2, 3)); // 6
```

3. 在对象中：

```js
let person = { name: "mary", age: 20 };
console.log(...person); // 报错，展开运算符不能展开一个对象
let person2 = { ...person }; // ES6中的新语法：展开运算符外面包裹一层花括号后，可以展开对象
let person3 = { ...person, name: "jack", address: "地球" }; // 拷贝对象的同时修改、新增属性
```

::: warning 注意：

- **展开运算符不能展开一个对象，直接使用 `...obj` 会报错！！！**
- 但是，如果扩展运算符外面包了一层花括号，则是 ES6 中的新语法，**使用 `{...obj}` 可以正确展开对象**，一般用于拷贝对象 **（只有第一层是深拷贝）**。

:::

## 5. 批量传递标签属性

React 支持通过在组件标签中使用 `{...p}` 的形式批量传递标签属性，其中，`p` 是包含多个键值对的对象。

```jsx
const p = { name: "jack", sex: "女", age: 18 };
// 批量传递标签属性
ReactDOM.render(<Person {...p} />, document.getElementById("test1"));
```

::: warning 注意：

上述代码中 `<Person {...p} />` 的 `{...p}` 与上小节中讲到的扩展运算符拷贝对象不是一个概念。

**<font color="red">这里的 `{}` 的含义不是对象，而是表明括号内是 js 语法！</font>**

因此，**组件标签内 `{...p}` 实际执行的是 js 语句 `...p`**。

而上小节我们已经知道，扩展运算符不能直接展开一个对象，直接使用 `...p`会报错。

那么为什么这里没有报错呢？

这是因为，**<font color="red">在 `React + babel` 的作用下，允许在标签内使用 `...p` 来展开一个对象，用于标签属性的传递。</font>（只允许在标签内使用！）**

:::

## 6. 对 props 进行限制

### 6.1. 限制类型、必要性

- 对 `props` 进行类型、必要性的限制，需要用到 `PropTypes` （prop-types）库。
- 设置组件的 `propTypes` 属性，可以让限制生效。

::: warning 注意：

1. `PropTypes 库` 和 `组件的 propTypes 属性`，是两个不同的概念，**首字母大小写也不一样**。
2. 如果需要 **指定某个属性类型为函数**，对应 PropTypes 库中的类型为 `func`。
   :::

```html
<!-- 引入PropTypes，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>
<script type="text/babel">
  class Person extends React.Component {
    // ...
   }
  Person.propTypes = {
    name: PropTypes.string.isRequired, // 必传
    sex: PropTypes.string,
    age: PropTypes.number
    speak: PropTypes.func // 由于 function 是关键字，为了避免冲突，函数类型为func
  }
</script>
```

### 6.2. 指定标签属性默认值

设置组件的 `defaultProps` 属性，可以让默认值生效。

```html
<script type="text/babel">
  class Person extends React.Component {
    // ...
  }
  Person.defaultProps = {
    sex: "男",
    age: 18,
  };
</script>
```

## 7. 简写方式

**静态属性** 指的是 `Class` 本身的属性，即 `Class.propName`，而不是定义在实例对象（`this`）上的属性。  
直接在类内部最顶层的赋值语句前加上关键字 `static` ，属性（包括方法）就会添加到类本身上。

```html
<script type="text/javascript" src="../js/prop-types.js"></script>
<script type="text/babel">
  class Person extends React.Component {
    // 静态属性，添加到类本身上
    static propTypes = {
      name: PropTypes.string.isRequired,
      sex: PropTypes.string,
      age: PropTypes.number
      speak: PropTypes.func
    }
    // 静态属性，添加到类本身上
    static defaultProps = {
      sex: "男",
      age: 18,
    }
  }
</script>
```

## 8. 函数式组件中使用 props

函数没有实例，也没有 `this`，所有 **不能** 通过 `this.props` 访问传入的属性。  
但是函数可以接收参数，可以通过参数访问传入的属性。

::: warning 
**注意**：函数组件只能使用组件三大属性中的 `props` 。
:::

```jsx{4-5,15}
// 1.创建函数组件
function Person(props) {
  console.log(props);
  // 可以通过参数访问传入的属性
  const { name, sex, age } = props;
  return (
    <ul>
      <li>姓名：{name}</li>
      <li>性别：{sex}</li>
      <li>年龄：{age}</li>
    </ul>
  );
}

// 函数组件对标签属性的限制只能写在组件外部
Person.propTypes = {
  name: PropTypes.string.isRequired,
  sex: PropTypes.string,
  age: PropTypes.number,
  speak: PropTypes.func,
};
Person.defaultProps = {
  sex: "不男不女",
  age: 18,
};

// 2.渲染组件到页面
ReactDOM.render(
  <Person name="tom" sex="男" age={18} />,
  document.getElementById("test"),
);
```

<img class="zoomable" :src="$withBase('/images/screenshot/2/3/1.png')" alt="screenshot">