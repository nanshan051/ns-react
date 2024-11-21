---
title: 使用create-react-app创建react应用
comments: true
tags:
  - create-react-app
  - yarn
  - 环境变量
  - tree
---

## 1. react 脚手架

1. xxx 脚手架：用来帮助程序员快速创建一个基于 xxx 库的模板项目：  
   （1）包含了所需要的配置（语法检查、jsx 编译、devServer...）  
   （2）下载好了所有相关的依赖  
   （3）可以直接运行一个简单效果
2. react 提供了一个用于创建 react 项目的脚手架库 `create-react-app`
3. 项目的整体技术架构为：react + webpack + es6 + eslint
4. 使用脚手架开发的项目的特点：模块化、组件化、工程化。

## 2. npm 创建项目并启动

1. 全局安装：`npm i -g create-react-app`
2. 切换到想创建项目的目录，执行 `create-react-app my-app`，其中 my-app 为项目名称。
3. 进入项目文件夹： `cd my-app`
4. 启动项目：`npm run start`

## 3. yarn 创建项目并启动

1. 全局安装：`yarn add global create-react-app`
2. 切换到想创建项目的目录，执行 `yarn create react-app my-app`，其中 my-app 为项目名称。
3. 进入项目文件夹： `cd my-app`
4. 启动项目：`yarn start`

### 3.1. 问题

当全局安装 yarn 和 create-react-app 后，执行第二步时报错如下：

<img class="zoomable" :src="$withBase('/images/screenshot/3/1/1.png')" alt="foo">

此时，create-react-app 的 执行文件路径为：`D:\Program Files\yarn\bin\create-react-app.cmd`

### 3.2. 原因

原因是 yarn 无法识别 `Program Files` 路径中的空格，导致无法执行命令。

### 3.3. 为 yarn 设置路径

全局卸载 create-react-app ，然后为 yarn 安装的依赖包设置新的 **全局安装路径、缓存路径、执行文件路径**，新的路径不能包含空格。  
::: warning
注意：这里的路径不是指 yarn，而是指通过 yarn 安装的各种依赖包。
:::

```sh
yarn config set global-folder "D:\software\yarn\global"  # 设置全局安装路径
yarn config set cache-folder "D:\software\yarn\cache"  # 设置缓存路径
yarn config set prefix "D:\software\yarn"  # 设置执行文件路径，该目录下会生成一个bin文件夹，用于存放执行文件（脚本）

yarn global dir # 查看全局安装路径
yarn cache dir # 查看缓存路径
yarn global bin # 查看执行文件路径
```

<img class="zoomable" :src="$withBase('/images/screenshot/3/1/2.png')" alt="foo">

### 3.4. 为 yarn 配置环境变量

将 yarn 的执行文件路径添加到环境变量的 **系统变量** 中：

<img class="zoomable" :src="$withBase('/images/screenshot/3/1/3.png')" alt="foo">

### 3.5. 采用 yarn 创建 create-react-app 项目

重新安装脚手架：`yarn add global create-react-app`
<img class="zoomable" :src="$withBase('/images/screenshot/3/1/4.png')" alt="foo">

创建项目： `yarn create react-app react_staging`
<img class="zoomable" :src="$withBase('/images/screenshot/3/1/5.png')" alt="foo">

启动项目：`cd my-app` 并 `yarn start`
<img class="zoomable" :src="$withBase('/images/screenshot/3/1/6.png')" alt="foo">

效果：
<img class="zoomable" :src="$withBase('/images/screenshot/3/1/7.png')" alt="foo">

## 4. 结构目录

### 4.1. 完整目录

安装 `tree-node-cli` 并生成树状目录：

```sh
# 1. 安装 tree-node-cli
npm i -g tree-node-cli

# 2. 生成树状目录（-L 显示层级，-I 忽略的文件夹），
# 注意这里的指令是treee，不是tree，这样设计的目的是与系统字段的目录指令tree相区分
treee -L 3 -I node_modules
```

完整目录如下：

```sh
react_staging
├── README.md                   # 说明文档
├── package.json                # 项目配置文件
├── public                      # 静态资源目录
│   ├── favicon.ico             # 网站图标（小）
│   ├── index.html              # 入口文件
│   ├── logo192.png             # 网站图标（中）
│   ├── logo512.png             # 网站图标（大）
│   ├── manifest.json           # 应用缓存信息文件（应用加壳时的配置文件）
│   └── robots.txt              # 搜索引擎爬虫配置文件
├── src                         # 业务相关代码目录
│   ├── App.css                 # 全局样式文件
│   ├── App.js                  # 应用入口文件
│   ├── App.test.js             # 测试文件
│   ├── index.css               # 全局样式文件
│   ├── index.js                # 应用入口文件
│   ├── logo.svg                # 应用图标
│   ├── reportWebVitals.js      # 性能测试文件
│   └── setupTests.js           # 测试文件
└── yarn.lock                   # 依赖包锁定文件
```

<img class="zoomable" :src="$withBase('/images/screenshot/3/1/8.png')" alt="foo">

### 4.2. index.html

入口文件 `index.html` 如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!-- 用于指定网页添加到手机主屏幕后的图标 -->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!-- 应用加壳时的配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <!-- 若浏览器不支持js则显示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### 4.3. index.js

应用入口文件 `index.js` 如下：

::: warning
从 React 18 开始，`ReactDOM.render` 方法 **已被废弃** 。  
推荐使用 `ReactDOM.createRoot` 来创建一个“根” `root`，通过这个根的 `render` 方法来挂载组件。
:::

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
```

上面为渲染组件的最新写法，旧版写法如下：

```js
import ReactDOM from "react-dom";

// 已被废弃
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
```

### 4.4. App.js

应用入口文件 `App.js` 如下：

```js
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```
