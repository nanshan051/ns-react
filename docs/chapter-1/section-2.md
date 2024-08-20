---
title: React 的基本使用
comments: true
tags:
  - 使用
  - babel
---

## 1. 相关 js 库

1. [react.js](https://unpkg.com/react@16.3.0/umd/react.development.js)： `React` 的核心库
2. [react-dom.js](https://unpkg.com/react-dom@16.3.0/umd/react-dom.development.js)： 提供操作 `DOM` 的 `React` 扩展库
3. [babel.min.js](https://unpkg.com/@babel/standalone@7.25.3/babel.min.js)： 解析 `JSX` 语法代码转为纯 `js` 语法代码的库

## 2. 使用

1. 准备好一个容器
2. 导入相关 `js` 库
3. 创建好虚拟 `DOM`
4. 渲染虚拟 `DOM` 到页面

```html {22,23,24,25,26,27,28}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>hello_react</title>
  </head>
  <body>
    <!-- 容器 -->
    <div id="test"></div>

    <!-- 引入react核心库 -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM -->
    <script
      type="text/javascript"
      src="../js/react-dom.development.js"
    ></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <!-- 此处一定要写babel！表明代码需要通过babel转为js -->
    <script type="text/babel">
      // 1.创建虚拟DOM
      const VDOM = <h1>Hello,React</h1>; // 此处一定不要加引号，因为不是字符串
      // 2.渲染虚拟DOM到页面
      ReactDOM.render(VDOM, document.getElementById("test"));
    </script>
  </body>
</html>
```

::: warning 注意事项：

1. React **核心库一定要在扩展库之前引用**。
2. 浏览器不能直接解析 `JSX` 代码，需要 `babel` 转译为纯 `JS` 的代码才能运行。**只要用了 `JSX`，都要加上 `type="text/babel"`**，声明需要 `babel` 来处理。
3. **创建虚拟 DOM 时，一定不要加引号**，因为不是字符串。

:::
