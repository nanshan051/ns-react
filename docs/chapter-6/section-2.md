---
title: 自定义主题
comments: true
tags:
  - 自定义主题
---

react 隐藏了 `webpack` 相关配置（避免开发者误修改），想要修改（覆盖）webpack 配置，可以借助 `craco` （一个对 create-react-app 进行自定义配置的社区解决方案）。

## 1. 安装 craco 并创建配置文件

安装 `craco`：

```sh
yarn add @craco/craco@7.1.0
```

在项目根目录创建 `craco.config.js` 文件：

```js
/* craco.config.js */
module.exports = {
  // ...
};
```

## 2. 修改执行命令

修改 `package.json` 中的执行命令：

```js
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```

## 3. 安装 craco-less 及 less 依赖

按照配置主题的要求，自定义主题需要用到类似 `less-loader` 提供的 **`less` 变量覆盖功能**。我们可以引入 `craco-less` 来帮助加载 less 样式和修改变量。

安装 `craco-less`、`less-loader`、`less`：

```sh
yarn add craco-less@^3.0.1
yarn add less-loader@7.1.0
yarn add less@3.13.0
```

## 4. 创建并引入 App.css

创建 less 样式文件 `src/App.less`：

```less
/* App.less */
@import "~antd/dist/antd.less";
```

在 `src/index.js` 引入：

```js
/* index.js */
import "./App.less";
```

## 5. 自定义主题

在 `craco.config.js` 中添加自定义主题配置：

```js
/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" }, // 全局主色
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

这里利用了 `less-loader` 的 `modifyVars` 来进行主题配置，变量和其他配置方式可以参考 [配置主题](https://4x-ant-design.antgroup.com/docs/react/customize-theme-cn) 文档。修改后重启 `yarn start`，如果看到页面为绿色主题就说明配置成功了。

<img class="zoomable" :src="$withBase('/images/screenshot/6/2/1.gif')" alt="foo">

## 6. 项目根目录

```sh
react_staging
├── craco.config.js       # 主题配置文件
├── package.json          # 项目配置文件
├── public
|  ├── css
|  |  └── bootstrap.css
|  ├── favicon.ico
|  └── index.html
├── README.md
├── src
|  ├── App.jsx
|  ├── App.less           # less样式
|  └── index.js
├── yarn.lock
```
