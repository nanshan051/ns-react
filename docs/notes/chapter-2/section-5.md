---
title: CMD 模块化规范（了解）
comments: true
tags:
  - CMD
  - sea.js
  - define
---

## 1. 环境准备

**第一步**：准备文件结构：

```sh
CMD
├── index.html
├── modules              # 业务逻辑代码
|  ├── main.js      # 汇总各个模块
|  ├── school.js
|  ├── student.js
|  └── welcome.js
└── libs            # 第三方库
   └── sea.js       # 可前往[BootCDN](https://www.bootcdn.cn/sea.js/)下载
```

**第二步**：在 `index.html` 中配置 `main.js` 与 `sea.js` 。

```html
<script type="text/javascript" src="./libs/sea.js"></script>
<script type="text/javascript">
  seajs.use("./modules/main.js");
</script>
```

## 2. 导出数据

CMD 规范中同样使用 `define` 函数来定义模块和导出数据。

```js
/* student.js */

/*
  收到的三个参数分别为：require、exports、module
  1. require⽤于引⼊其他模块
  2. exports、module⽤于导出数据
*/
define(function (require, exports, module) {
  const name = "张三";
  const motto = "宝剑锋从磨砺出，梅花香自苦寒来";
  function getTel() {
    return "138xxxx9999";
  }
  function getHobby() {
    return ["阅读", "登山", "旅行"];
  }
  // 导出数据
  exports.name = name;
  exports.motto = motto;
  exports.getTel = getTel;
});
```

```js
/* welcome.js */

define(function (require, exports, module) {
  exports.welcome = "欢迎来到这里！";
});
```

## 3. 导入数据

CMD 规范中使用收到的 `require` 参数进行模块导入。

```js
/* school.js */

define(function (require, exports, module) {
  // 引入welcome模块
  const welcome = require("./welcome.js");
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
  module.exports = { name, predecessor, getTel };
});
```

## 4. 使用模块

```js {15-18}
/* main.js */

define(function (require) {
  // 引入school、student模块
  const school = require("./school");
  const student = require("./student");
  console.log(school);
  console.log(student);
});
```

## 5. 浏览器端运行

右键 `index.html`，选择『Open with Live Server』，在浏览器中查看效果。

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/5/1.png')" alt="foo">
