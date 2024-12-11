---
title: 向路由组件传递state参数
comments: true
tags:
  - 路由传参
  - state
---

在上一小节《向路由组件传递 search 参数》案例的基础上，改为向路由组件传递 state 参数。(此节只展示修改和新增的代码)

## 1. 项目代码

### 1.1. src 目录

```sh
src
├── App.jsx
├── components
|  ├── Header
|  |  └── index.jsx
|  └── MyNavLink
|     ├── index.css
|     └── index.jsx
├── index.js
└── pages
   ├── About
   |  └── index.jsx
   └── Home
      ├── index.jsx
      ├── Message
      |  ├── Detial
      |  |  └── index.jsx
      |  └── index.jsx
      └── News
         └── index.jsx
```

### 1.2. Message 组件

pages/Home/Message/index.jsx：

```jsx
import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Detail from "./Detial";

export default class Message extends Component {
  state = {
    messageArr: [
      { id: "1", title: "message001" },
      { id: "2", title: "message002" },
      { id: "3", title: "message003" },
    ],
  };
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map((item) => {
            return (
              <li key={item.id}>
                {/* 1.路由链接（携带state参数） */}
                <Link
                  to={{
                    pathname: "/home/message/detail",
                    state: { id: item.id, title: item.title },
                  }}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <Switch>
          {/* 2.注册路由（不需要声明接收state参数） */}
          <Route path="/home/message/detail" component={Detail} />
        </Switch>
      </div>
    );
  }
}
```

### 1.3. Detail 组件

pages/Home/Message/Detial/index.jsx：

```jsx
import React, { Component } from "react";

// 模拟数据库
const details = [
  { id: "1", content: "后海有树的院子" },
  { id: "2", content: "夏代有工的玉" },
  { id: "3", content: "此时此刻的云" },
];

export default class Detail extends Component {
  render() {
    console.log("Detail接收的props", this.props);
    // 3.路由组件（接收state参数）
    const { id, title } = this.props.location.state || {};
    const detail = details.find((item) => item.id === id) || {};
    return (
      <ul>
        <li>ID：{id}</li>
        <li>TITLE：{title}</li>
        <li>CONTENT：{detail.content}</li>
      </ul>
    );
  }
}
```

## 2. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/5/11/1.gif')" alt="foo">

::: tip

虽然地址栏中没有参数，但是刷新页面，仍然能够正常显示消息详情，这是因为 `history` 会将路由信息存储在内存中。

:::

## 3. 总结

::: tip 向路由组件传递 state 参数：

1. 路由链接（**携带参数**）：
   ```jsx
   <Link
     to={{
       pathname: "/home/message/detail", // 路由名称
       state: { id: item.id, title: item.title }, // state 参数
     }}
   >
     {item.title}
   </Link>
   ```
2. 注册路由（**不需要声明接收**）：`<Route path="/home/message/detail" component={Detail} />`
3. 路由组件（**接收参数**）：`const { id, title } = this.props.location.state;`
4. 备注：刷新也可以保留住参数。
:::
