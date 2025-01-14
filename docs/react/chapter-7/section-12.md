---
title: 打包部署项目
comments: true
tags:
  - 打包
  - 部署
  - serve
---

本小节主要演示生产环境的打包部署流程。

## 1. 打包项目

执行打包命令 `yarn build` ：

```sh
yarn build
```

打包后的文件会生成在 `build` 目录下。

完整的项目目录如下：

```sh
E:\projects\react\demo\redux_test
├── build                                     # 打包后的文件（成果物）
|  ├── asset-manifest.json
|  ├── index.html
|  └── static
|     └── js
|        ├── main.e8a18d4b.js
|        ├── main.e8a18d4b.js.LICENSE.txt
|        └── main.e8a18d4b.js.map
├── package.json
├── public
|  └── index.html
├── README.md
├── src
|  ├── App.jsx
|  ├── containers
|  |  ├── Count
|  |  |  └── index.jsx
|  |  └── Persons
|  |     └── index.jsx
|  ├── index.js
|  └── redux
|     ├── actionCreators
|     |  ├── count.js
|     |  └── persons.js
|     ├── constant.js
|     ├── reducers
|     |  ├── count.js
|     |  ├── index.js
|     |  └── persons.js
|     └── store.js
└── yarn.lock
```

## 2. 安装 serve

安装 `serve` 工具，用于在本地启动一个简易的静态文件服务器。

```sh
yarn add global serve
```

`serve` 的用法：

```sh
serve folder-name/  # 启动静态文件服务器（其中，folder-name是成果物对应的文件夹名称）
```

## 3. 将项目部署到服务器

`serve build` 命令会将 `build` 目录下的文件作为静态文件服务器的根目录，并启动静态文件服务器。

```sh
# serve ./build 也行，因为默认会从当前目录开始查找文件
serve build
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/12/1.png')" alt="foo">

## 4. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/7/12/2.png')" alt="foo">
