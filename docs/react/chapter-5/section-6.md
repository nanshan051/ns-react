---
title: 路由的模糊匹配和精确匹配
comments: true
tags:
  - 模糊匹配
  - 精确匹配
---

## 1. 模糊匹配

将路由链接的 to 属性值设置为 `/home/a/b` ，然后路由组件的 path 属性值设置为 `/home`。

路由默认采用模糊匹配，所以 `/home` 可以匹配到 `/home/a/b`。

App.jsx：

```jsx
<MyNavLink to="/home/a/b">About</MyNavLink>
<Route path="/home" component={About} /> // 模糊匹配（默认）
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/6/1.gif')" alt="foo">

## 2. 精确匹配

通过对路由组件 `<Route>` 设置 `exact` 或 `exact={true}`，可以让该路由组件只匹配到精确的路径。所以 `/home` 不能匹配到 `/home/a/b`。

App.jsx：

```jsx
<MyNavLink to="/home/a/b">About</MyNavLink>
<Route exact path="/home" component={About} /> // 精确匹配
// <Route exact={true} path="/home" component={About} /> // 这种写法也可以
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/6/2.gif')" alt="foo">

## 3. 总结

::: tip 路由的模糊匹配和精确匹配：

1. **默认采用模糊匹配：『输入的路径』必须包含『匹配的路径』，且顺序要一致。（最左前缀原则）**
2. 开启精确匹配，需要设置 `exact` 属性。
3. **精确匹配不要随便开启**，需要时再开，有些时候开启会导致无法继续匹配二级路由。

:::
