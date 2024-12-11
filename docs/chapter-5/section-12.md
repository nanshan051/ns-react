---
title: push 和 replace
comments: true
tags:
  - push
  - replace
---

push 和 replace 是路由跳转时的两种方式：

- `push` ：要跳转的路由会被 **推入** 到历史记录栈中。
- `replace` ：要跳转的路由会 **替换** 历史记录栈顶的那条记录。

本小节为了更直观的演示 push 和 replace 的区别，基于 5.9 小节《向路由组件传递 params 参数》修改。（本小节只展示修改的代码）

## 1. push

路由跳转时，默认采用 push 方式。

pages/Home/Message/index.jsx：

```jsx
// 默认 push
<Link to={`/home/message/detail/${id}/${title}`}>{title}</Link>
```

<img class="zoomable" :src="$withBase('/images/screenshot/5/12/1.gif')" alt="foo">

## 2. replace

通过给路由链接 `<Link>` 组件设置 `replace` 或 `replace={true}`，即可开启 replace 方式。

pages/Home/Message/index.jsx：

```jsx
// 开启 replace
<Link replace to={`/home/message/detail/${id}/${title}`}>
  {title}
</Link>
```

<img class="zoomable" :src="$withBase('/images/screenshot/5/12/2.gif')" alt="foo">

由于开启了 replace，历史记录栈顶 `/home/message/detail` 会替换 `/home/message`。所以点击返回时，上一条记录是 `/home/news`。
