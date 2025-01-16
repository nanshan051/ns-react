---
title: AMD 模块化规范（了解）
comments: true
tags:
  - AMD
  - require.js
  - define
  - data-main
  - document.currentScript
---

## 1. 环境准备

### 1.1. 步骤

**第一步**：准备文件结构：

```sh
AMD
├── index.html
├── modules         # 业务逻辑代码
|  ├── main.js      # 汇总各个模块
|  ├── school.js
|  ├── student.js
|  └── welcome.js
└── libs            # 第三方库
   └── require.js   # 可前往[BootCDN](https://www.bootcdn.cn/require.js/)下载
```

**第二步**：在 `index.html` 中配置 `main.js` 与 `require.js` 。

```html
<script data-main="./modules/main.js" src="./libs/require.js"></script>
```

::: tip

**`data-main` 告诉 RequireJS（模块加载器）在 `./modules/main.js` 文件中查找入口点。**

:::

**第三步**：在 `main.js` 中编写模块配置对象，注册所有模块。

```js
/*AMD_require.js模块化的⼊⼝⽂件，要编写配置对象，并且有固定的写法*/
requirejs.config({
  //基本路径
  baseUrl: "./modules",
  //模块标识名与模块路径映射
  paths: {
    school: "school",
    student: "student",
    welcome: "welcome",
  },
});
```

### 1.2. 扩展知识点 🍃

从上述第二步可以扩展以下知识点：

#### 1.2.1. `data-*` 属性

::: tip 扩展 1

`data-*` 是 `HTML5` 新增的规范，用于自定义数据，存放在当前标签对应 DOM 的 `dataset` 中。获取数据的方式有两种，以 data-main 为例：

```js
// 方式一：
element.dataset.main;
```

```js
// 方式二
element.getAttribute("data-main");
```

上述代码中，element 表示 script 标签 DOM。
:::

#### 1.2. document.currentScript

::: tip 扩展 2

js 文件作为 script 标签加载时，如何在 `js` 文件中获取到当前 `script` 标签？  
👉 **可以通过 `document.currentScript` 获取到当前 script 标签。**

**演示一下：**

由于 require.js 是第三方库，不好直接修改，这里新建一个 demo.js 文件并在 html 中使用。

```js
/* libs_demo.js */
const element = document.currentScript;
console.log("document.currentScript:", element);
console.log("dataset:", element.dataset);
```

```html
<script data-main="./modules/main.js" src="./libs/demo.js"></script>
```

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/4/1.png')" alt="foo">

:::

## 2. 导出数据

AMD 规范使用 `define` 函数来定义模块和导出数据。

```js
/* student.js */

define(function () {
  const name = "张三";
  const motto = "宝剑锋从磨砺出，梅花香自苦寒来";
  function getTel() {
    return "138xxxx9999";
  }
  function getHobby() {
    return ["阅读", "登山", "旅行"];
  }
  // 导出数据
  return { name, motto, getTel };
});
```

```js
/* welcome.js */

define(function () {
  const welcome = "欢迎来到这里！";
  return welcome;
});
```

## 3. 导入数据

如需导入数据，则需要 `define` 传入两个参数，分别为：『依赖项数组』、『回调函数』。

```js
/* school.js */

// ['welcome']表示当前模块要依赖的模块名字
// 回调接收到的welcome是模块导出的数据
define(["welcome"], function (welcome) {
  console.log(welcome);
  const name = "北京大学";
  const predecessor = "京师大学堂";
  function getTel() {
    return "010-56253825";
  }
  function getCities() {
    return ["北京", "无锡", "深圳"];
  }
  // 导出数据
  return { name, predecessor, getTel };
});
```

## 4. 使用模块

```js {15-18}
/* main.js */

/*AMD_require.js模块化的⼊⼝⽂件，要编写配置对象，并且有固定的写法*/
requirejs.config({
  //基本路径
  baseUrl: "./modules",
  //模块标识名与模块路径映射
  paths: {
    school: "school",
    student: "student",
    welcome: "welcome",
  },
});

requirejs(["school", "student"], function (school, student) {
  console.log("main", school);
  console.log("main", student);
});
```

## 5. 浏览器端运行

右键 `index.html`，选择『Open with Live Server』，在浏览器中查看效果。

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/4/2.png')" alt="foo">
