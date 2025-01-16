---
title: CommonJS 模块化规范
comments: true
tags:
  - CommonJS
  - exports
  - module.exports
  - browserify
---

## 1. 初步体验

### 1.1. school.js

```js
const name = "北京大学";
const predecessor = "京师大学堂";
function getTel() {
  return "010-62751407";
}
function getCities() {
  return ["北京", "无锡", "深圳"];
}

// 通过给exports对象添加属性的⽅式，来导出数据
exports.name = name;
exports.predecessor = predecessor;
exports.getTel = getTel;
```

### 1.2. student.js

```js
const name = "张三";
const motto = "宝剑锋从磨砺出，梅花香自苦寒来";
function getTel() {
  return "138xxxx9999";
}
function getHobby() {
  return ["阅读", "登山", "旅行"];
}
// 通过给module.exports赋值的方式，来导出数据
module.exports = {
  name,
  motto,
  getHobby,
};
```

### 1.3. index.js

```js
const school = require("./school.js");
const student = require("./student.js");
console.log(school);
console.log(student);
```

## 2. Node.js 中运行

`Node.js` 默认是支持 `CommonJS` 规范的。

右键 index.js ，选择 『Run Code』 ，该模块将在 `Node.js` 环境下运行。

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/2/1.png')" alt="foo">

## 3. 导出数据

在 CommonJS 标准中，导出数据有 **<span style="color:red">两种方式</span>**：

- 方式一：`module.exports=value`
- 方式二：`exports.key=value`

::: tip 注意：

1. 每个模块内部的：`this`、`exports`、`module.exports` 在初始时，都指向 **同一个** 空对象，该空对象就是当前模块导出的数据，如下图：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/2/2.png')" alt="foo">

2. **无论如何修改导出对象，<span style="color:red">最终导出的都是 `module.exports` 的值。</span>**

3. `exports` 是对 `module.exports` 的初始引用，仅为了方便给导出对象添加属性，所以 **不能使用 `exports = value` 的形式导出数据**，但是可以使用 `module.exports = value` 导出数据。

:::

::: details 错误示范（exports = value）

<br/>

```js
/* a.js */
exports = {
  name: "张三",
  age: 18,
};
```

```js
/* b.js */
const a = require("./a.js");
console.log(a);
```

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/2/3.png')" alt="foo">

导出数据失败的原因：`exports` 是 `module.exports` 的初始引用，**直接对 exports 赋值，会导致 `exports` 指向一个新的地址，而 `module.exports` 还是指向原来的地址**（此处为初始的空对象），所以最终导出的 `module.exports` 值是 `{}`。

:::

## 4. 导入数据

在 `CJS` 模块化标准中，使用内置的 `require` 函数来导入数据。

```js
// 直接引入模块
const school = require("./school.js");

// 引入同时解构出要用的数据
cosnt { name, predecessor, getTel } = require('./school.js')

// 引入同时解构+重命名
cosnt { name: stuName, motto, getTel: getStuTel } = require('./student.js')
```

## 5. 扩展理解

一个 JS 模块在执行时，是被包裹在一个 **『内置函数』** 中执行的，所以每个模块都有自己的作用域，可以通过如下方式验证这一说法：

```js
console.log(arguments);
console.log(arguments.callee.toString());
```

内置函数的大致形式如下：

```js
function (exports, require, module, __filename, __dirname) {
  // 模块代码
}
```

这也是为什么模块内能使用 `exports` 和 `module` 的原因。

例如，在 `school.js` 模块中，添加一行代码 `console.log(arguments.callee.toString())` 并通过右键选择『Run Code』执行该模块（ `Node.js` 环境），输出如下：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/2/4.png')" alt="foo">

## 6. 浏览器端运行

`Node.js` 默认是支持 `CommonJS` 规范的，但浏览器端不支持。所以需要经过编译，步骤如下：

- **第一步**：全局安装 `browserify` ：

  ```sh
    npm i browserify -g
  ```

- **第二步**：编译：

  ```sh
    browserify index.js -o build.js
  ```

  ::: tip
  备注：index.js 是源文件，build.js 是输出的目标文件
  :::

- **第三步**：在页面中使用

  ```html
  <script type="text/javascript" src="./build.js"></script>
  ```

  <img class="zoomable" :src="$withBase('/images/screenshot/notes/2/2/5.png')" alt="foo">
