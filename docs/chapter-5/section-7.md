---
title: Redirect 组件
comments: true
tags:
  - Redirect
  - 路由重定向
---

## 1. 简介

`<Redirect>` 也是 `react-router-dom` 的核心组件，用于路由重定向。用法：`<Redirect to="/xxx"/>` 。

一般写在所有路由的最下方，当所有路由都无法匹配时，跳转到 `<Redirect>` 组件指定的路由。

## 2. 案例

App.jsx：

```jsx
import { Switch, Route, Redirect } from "react-router-dom";

<Switch>
  <Route path="/about" component={About} />
  <Route path="/home" component={Home} />
  {/* 默认重定向到 /home */}
  <Redirect to="/home" />
</Switch>;
```

<img class="zoomable" :src="$withBase('/images/screenshot/5/7/1.gif')" alt="foo">

如图，访问 `http://localhost:3000` 时，路由从上往下依次匹配，其中，路由 `/about` 和 `/home` 都匹配不上。这时（所有路由都无法匹配时），路由会重定向到 `<Redirect>` 组件指定的 `/home`。
