---
title: ES6 模块化规范
comments: true
tags:
  - ES6
  - export
  - import
  - .mjs
---

ES6 模块化规范是一个 **<span style="color:red">官方标准</span>** 的规范，它是在语言标准的层面上实现了模块化功能，是目前 **<span style="color:red">最流行的</span>** 模块化规范，且浏览器与服务器均支持该规范。

## 1. 初步体验

### 1.1. school.js

```js
// 通过在变量、函数前添加export的⽅式，分别导出数据
export const name = "北京大学";
export const predecessor = "京师大学堂";
export function getTel() {
  return "010-62751407";
}
function getCities() {
  return ["北京", "无锡", "深圳"];
}
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

// 用{}包裹起来，表示统一导出数据
export { name, motto, getTel };
```

### 1.3. index.js

```js
// 引⼊school模块暴露的所有内容
import * as school from "./school.js";
// 引⼊student模块暴露的所有内容
import * as student from "./student.js";

console.log(school);
console.log(student);
```

## 2. 浏览器端运行

在浏览器运行 ES6 模块时，需要对 `<script> ` 标签设置 `type="module"` 。

```html
<script type="module" src="./index.js"></script>
```

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/3/1.png')" alt="foo">

## 3. Node.js 中运行

如果直接通过右键『Run Code』运行 ES6 模块，会报错：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/3/2.png')" alt="foo">

::: tip 解决方案：

- **方式一**：在 package.json 中添加 `"type": "module"`。
- **方式二**：将 JavaScript 文件后缀从 `.js` 改为 `.mjs` ，Node 则会自动识别 ES6 模块。

:::

这里以方式二为例，添加 `package.json` 文件：

```json
{
  "type": "module"
}
```

右键 index.js ，选择 『Run Code』 ，该 ES6 模块在 `Node.js` 环境下成功运行。

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/3/3.png')" alt="foo">

## 4. 导出数据

`ES6` 模块化提供 3 种导出方式：**① 分别导出； ② 统一导出； ③ 默认导出。**

### 4.1 分别导出

```js
// 通过在变量、函数前添加export的⽅式，分别导出数据
export const name = "北京大学";
export const predecessor = "京师大学堂";
export function getTel() {
  return "010-62751407";
}
function getCities() {
  return ["北京", "无锡", "深圳"];
}
```

### 4.2. 统一导出 📌

```js
const name = "张三";
const motto = "宝剑锋从磨砺出，梅花香自苦寒来";
function getTel() {
  return "138xxxx9999";
}
function getHobby() {
  return ["阅读", "登山", "旅行"];
}

// 用{}包裹起来，统一导出数据(注意：这里不是对象简写形式！！！)
export { name, motto, getTel };
```

::: danger 注意：统一导出中的 {}

统一导出 `export { name, motto, getTel }` 中的 `{}` 用于指定导出的变量名。

- **这里的 `{}`<span style="color:red">不是</span> 对象！！！**
- 所以里面的变量 **<span style="color:red">不是</span> 对象简写形式！！！**

:::

### 4.3. 默认导出 🍃

```js
const name = "张三";
const motto = "宝剑锋从磨砺出，梅花香自苦寒来";
function getTel() {
  return "138xxxx9999";
}
function getHobby() {
  return ["阅读", "登山", "旅行"];
}

// 默认导出，导出一个对象，里面包含着数据（注意：这里是对象简写形式！！！）
export default { name, motto, getTel };
```

::: tip 注意：默认导出中的 {}

默认导出 `export default { name, motto, getTel }` 中 default 后面的数据就是要导出的值。

- **这里的 `{}`<span style="color:green">是</span> 对象！！！**
- 所以里面的变量 **<span style="color:green">是</span> 对象简写形式！！！**

:::

### 4.4. 多种导出方式同时使用

```js
// 导出name ———— 分别导出
export const name = "北京大学";
const predecessor = "京师大学堂";
function getTel() {
  return "010-62751407";
}
function getCities() {
  return ["北京", "无锡", "深圳"];
}

// 导出predecessor ———— 统一导出
export { predecessor };
// 导出getTel ———— 默认导出
export default getTel;
```

## 5. 导入数据

对于 `ES6` 模块化来说，使用何种 **<span style="color:red">导入方式</span>**，要根据 **<span style="color:green">导出方式</span>** 决定。

### 5.1. 导入全部 <Badge text="通用"/>

可以将模块中的所有导出内容整合到一个对象中。

```js
import * as school from "./school.js";
```

### 5.2. 命名导入 <Badge text="分别导出"/> <Badge text="统一导出"/> 📌

导出数据的模块：

```js
// 分别导出
export const name = "北京大学";
export const predecessor = "京师大学堂";
function getTel() {
  return "010-62751407";
}
function getCities() {
  return ["北京", "无锡", "深圳"];
}

// 统一导出
export { getTel };
```

命名导入：

```js
import { name, predecessor, getTel } from "./school.js";
```

通过 `as` 重命名：

```js
import { name as SchoolName, predecessor, getTel } from "./school.js";
```

::: danger 注意：命名导入中的 {}

命名导入 `import { name, predecessor, getTel }` 中的 `{}` 用于指定导入的变量名。

- **这里的 `{}`<span style="color:red">不是</span> 对象！！！**
- 所以里面的变量 **<span style="color:red">不是</span> 对象解构赋值！！！**

:::

### 5.3. 默认导入 <Badge text="默认导出"/>

导出数据的模块：

```js
const name = "北京大学";
const predecessor = "京师大学堂";
function getTel() {
  return "010-62751407";
}
function getCities() {
  return ["北京", "无锡", "深圳"];
}

// 默认导出，导出一个对象，里面包含着数据
export default { name, predecessor, getTel };
```

默认导入：

```js
// 默认导出的名字可以修改，不是必须为school
import mySchool from "./school.js";
```

### 5.4. 命名导入 + 默认导入

导出数据的模块：

```js
// 分别导出
export const name = "北京大学";
const predecessor = "京师大学堂";
function getTel() {
  return "010-62751407";
}
function getCities() {
  return ["北京", "无锡", "深圳"];
}

// 统一导出
export { predecessor };
// 默认导出
export default getTel;
```

『命名导入』与『默认导入』混合使用，且 **默认导入的内容必须放在前方：**

```js
import getTel, { name as SchoolName, predecessor } from "./school.js";
```

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/3/4.png')" alt="foo">

### 5.5. 动态导入 <Badge text="通用"/>

允许在运行时 **<span style="color:red">按需加载</span>** 模块，返回值是一个 `Promise` 。

```js
const school = await import("./school.js");
console.log(school);
```

### 5.6. import 可以不接收任何数据

例如：只是让 mock.js 参与运行：

```js
import "./mock.js";
```

::: tip

此时，我们感受到模块化确实解决了：① 全局污染问题； ② 依赖混乱问题； ③ 数据安全问题。

:::

## 6. 数据引用问题 📌

- 思考 1：如下代码的输出结果是什么？（不要想太多，不涉及模块化相关知识）

```js
function count() {
  let sum = 1;
  function increment() {
    sum += 1;
    console.log(sum);
  }
  return { sum, increment };
}
const { sum, increment } = count();
console.log(sum);
increment();
increment();
console.log(sum);
```

::: details 答案 1

<br/>

```js
// 打印结果：
1; // count外部sum
2; // count内部sum
3; // count内部sum
1; // count外部sum
```

count 函数存在闭包，每次 `increment()` 执行后，count 函数内的 `sum` 都会发生变化。但是为什么外部 `sum` 一直都是 1 呢？

这是因为，**count 外部 `sum` 是通过<span style="color:red">『对象解构赋值』</span>重新定义的一个变量，与 count 内部 `sum` 无关。**

:::

- 思考 2：使⽤ `CommonJS` 规范，编写如下代码，输出结果是什么？

```js
/* count.js */
let sum = 1;
function increment() {
  sum += 1;
  console.log(sum);
}
module.exports = { sum, increment };
```

```js
/* index.js */
const { sum, increment } = require("./count.js");
console.log(sum);
increment();
increment();
console.log(sum);
```

::: details 答案 2

<br/>

```js
// 打印结果：
1; // count外部sum
2; // count内部sum
3; // count内部sum
1; // count外部sum
```

运行结果与『思考 1』一样，为什么？

这是因为，index.js 通过 `CommonJS` 导入数据时，**count 外部（index.js） `sum` 也是通过<span style="color:red">『对象解构赋值』</span>重新定义的一个变量，与 count 内部 `sum` 无关。**

:::

- 思考 3：使⽤ `ES6` 模块化规范，编写如下代码，输出结果是什么？

```js
/* count.js */
let sum = 1;
function increment() {
  sum += 1;
  console.log(sum);
}
export { sum, increment };
```

```js
/* index.js */
import { sum, increment } from "./count.js";
console.log(sum);
increment();
increment();
console.log(sum);
```

::: details 答案 3

<br/>

```js
// 打印结果：
1; // count外部sum
2; // count内部sum
3; // count内部sum
3; // count外部sum（变了）
```

运行结果与『思考 1、2』不一样，为什么？

这是因为，index.js 通过 `ES6 模块化` 『命名导入』数据时，`{}` 用于指定导入的变量名，**<span style="color:red">并不是对象，没有解构赋值。</span> count 外部（index.js） `sum` 与 count 内部 `sum` <span style="color:red">是同一个变量。</span>**

:::

::: tip

使用原则：导出的常量，务必用 `const` 定义。

:::
