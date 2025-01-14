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

<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/1.png')" alt="foo">

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

<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/2.png')" alt="foo">

### 3.4. 为 yarn 配置环境变量

将 yarn 的执行文件路径添加到环境变量的 **系统变量** 中：

<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/3.png')" alt="foo">

### 3.5. 采用 yarn 创建 create-react-app 项目

重新安装脚手架：`yarn add global create-react-app`
<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/4.png')" alt="foo">

创建项目： `yarn create react-app react_staging`
<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/5.png')" alt="foo">

启动项目：`cd my-app` 并 `yarn start`
<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/6.png')" alt="foo">

效果：
<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/7.png')" alt="foo">

## 4. 结构目录

### 4.1. 完整目录

安装 `tree-node-cli` （ 或 `tree-cli` ）并生成树状目录：

```sh
# 1. 安装 tree-node-cli
npm i -g tree-node-cli

# 2. 生成树状目录（-L 显示层级，-I 忽略的文件夹），
# 注意这里的指令是treee，不是tree，这样设计的目的是与系统自带的目录指令tree相区分
treee -L 3 -I node_modules
```

完整目录如下：

```sh
react_staging
├── README.md                   # 说明文档
├── package.json                # 项目配置文件
├── public                      # 静态资源目录
│   ├── favicon.ico             # 网站图标（小）
│   ├── index.html              # 主页面
│   ├── logo192.png             # 网站图标（中）
│   ├── logo512.png             # 网站图标（大）
│   ├── manifest.json           # 应用缓存信息文件（应用加壳时的配置文件）
│   └── robots.txt              # 搜索引擎爬虫配置文件
├── src                         # 业务相关代码目录
│   ├── App.css                 # 全局样式文件
│   ├── App.js                  # 根组件
│   ├── App.test.js             # 测试文件
│   ├── index.css               # 全局样式文件
│   ├── index.js                # 入口文件
│   ├── logo.svg                # 应用图标
│   ├── reportWebVitals.js      # 性能测试文件
│   └── setupTests.js           # 测试文件
└── yarn.lock                   # 依赖包锁定文件
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/8.png')" alt="foo">

### 4.2. index.html

主页面 `index.html` 如下：

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

入口文件 `index.js` 如下：

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
  // <React.StrictMode> 与 es5 里面的严格模式无关
  // 是React为了检查<App>及其子组件的代码规范而设计的
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// 用于记录页面性能
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

根组件 `App.js` 如下：

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

## 5. 简单案例

### 5.1. 原始代码

src 目录如下：

```sh
src
├── App.jsx                  # 根组件
├── components
|  ├── Hello                 # Hello 组件
|  |  ├── index.jsx
|  |  └── index.css
|  └── Welcome               # Welcome 组件
|     ├── index.css
|     └── index.jsx
└── index.js                 # 入口文件
```

::: tip 组件命名

1. react 中组件是用 js 写的，但为了与普通的 js 文件进行区分（不同类型的文件会有不同的图标），一般采用 `.jsx` 来作为组件名的后缀。
2. react 中引用文件时，如果仅指定了文件夹，react 会默认查找该文件夹下的 `index.js` 或 `index.jsx`。

**所以组件最好命名为 `index.jsx`，不仅可以在引用时少写一级目录，还可以和普通 js 文件区分开。**

:::

#### 5.1.1. 入口文件 index.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

#### 5.1.2. 根组件 App.jsx

```jsx
import React, { Component } from "react";
import Hello from "./components/Hello";
import Welcome from "./components/Welcome";

export default class App extends Component {
  render() {
    return (
      <div>
        <Hello />
        <Welcome />
      </div>
    );
  }
}
```

#### 5.1.3. Hello 组件

Hello/index.css :

```css
.title {
  color: lightcoral;
}
```

Hello/index.jsx :

```jsx
import React, { Component } from "react";
import "./index.css";

export default class Hello extends Component {
  render() {
    return <h2 className="title">hello, react</h2>;
  }
}
```

#### 5.1.4. Welcome 组件

Welcome/index.css :

```css
.title {
  color: skyblue;
}
```

Welcome/index.jsx :

```jsx
import React, { Component } from "react";
import "./index.css";

export default class Welcome extends Component {
  render() {
    return <h2 className="title">welcome</h2>;
  }
}
```

### 5.2. 原始效果（样式污染）

::: danger 样式污染
直接引入 CSS 文件的一个显著问题就是：**<font color="red">全局生效，样式污染。</font>** 无法进行样式隔离，会对组件之外的内容产生不可预知的影响。
:::

<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/9.png')" alt="foo">

从上图中可以看出，由于 App 组件中引入了两个子组件 Hello 和 Welcome，两个子组件中都含有 `title` 类选择器的样式，而 `Welcome` 组件是后引入的，所以 `Welcome/index.css` 中的样式 **覆盖** 了 `Hello/index.css` 中的样式，最终导致 Hello 组件中的文字颜色也为天蓝色。

### 5.3. CSS Modules

使用 `CSS Modules` （CSS 模块化），可以防止不同组件之间的样式冲突。

::: tip CSS Modules 用法

1. 组件样式文件名以 `.module.css` 结尾。
2. 引入组件样式文件时，需用变量接收，例如 `xxxStyle`。
3. 在标签中使用 `className` 属性引用样式，值为样式文件中的选择器类名，例如 `xxxStyle.yyy`。

:::

对 Hello 和 Welcome 组件进行 `CSS Modules` 后的 src 目录如下：

```sh
src
├── App.jsx
├── components
|  ├── Hello
|  |  ├── index.jsx
|  |  └── index.module.css  # CSS模块化
|  └── Welcome
|     ├── index.module.css  # CSS模块化
|     └── index.jsx
└── index.js
```

#### 5.3.1. Hello 组件 CSS Modules

Hello/index.module.css :

```css
.title {
  color: lightcoral;
}
```

Hello/index.jsx :

```jsx {2,6}
import React, { Component } from "react";
import HelloStyle from "./index.module.css";

export default class Hello extends Component {
  render() {
    return <h2 className={HelloStyle.title}>hello, react</h2>;
  }
}
```

#### 5.3.2. Welcome 组件 CSS Modules

Welcome/index.module.css :

```css
.title {
  color: skyblue;
}
```

Welcome/index.jsx :

```jsx {2,6}
import React, { Component } from "react";
import WelcomeStyle from "./index.module.css";

export default class Welcome extends Component {
  render() {
    return <h2 className={WelcomeStyle.title}>welcome</h2>;
  }
}
```

### 5.4. CSS Modules 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/3/1/10.png')" alt="foo">

从上图中可以看出，`CSS Modules` 为 Welcome 组件和 Hello 组件中的 `title` 类名 **重新生成了新的类名**，形式为 `[组件名]_[原有类名]__[哈希值]` 。

> 同一组件内，同一选择器生成的新类名是相同的，包括哈希值。
