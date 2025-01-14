---
title: React Router 6 概述
comments: true
tags:
  - React Router 6
---

## 1. React Router 构成

React Router 以三个不同的包发布到 npm 上，它们分别为：

1. `react-router`：路由的核心库，提供了很多的：组件、钩子。

2. `react-router-dom` ：包含 react-router 所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>` 等 。

3. `react-router-native`：包括 react-router 所有内容，并添加一些专门用于 ReactNative 的 API，例如：`<NativeRouter>` 等。

## 2. 与 React Router 5.x 版本相比，改变了什么？

1. 内置组件的变化：移除 `<Switch/>` ，新增 `<Routes/>` 等。

2. 语法的变化：`component={About}` 变为 `element={<About/>}` 等。

3. 新增多个 hook：`useParams`、`useNavigate`、`useMatch` 等。

4. **官方明确推荐函数式组件了！！！**

   ......
