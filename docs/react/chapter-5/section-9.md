---
title: 向路由组件传递params参数
comments: true
tags:
  - 路由传参
  - params
---

在上一小节《嵌套路由》案例的基础上，增加消息详情组件，实现点击消息列表项后跳转到详情页并传递参数。(此节只展示修改和新增的代码)

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
      |  |  └── index.jsx   # 3级路由组件(新增)
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
            const { id, title } = item;
            return (
              <li key={id}>
                {/* 1.路由链接（携带params参数） */}
                <Link to={`/home/message/detail/${id}/${title}`}>{title}</Link>
              </li>
            );
          })}
        </ul>
        <Switch>
          {/* 2.注册路由（声明接收params参数） */}
          <Route path="/home/message/detail/:id/:title" component={Detail} />
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
    // 3.路由组件（接收params参数）
    const { id, title } = this.props.match.params;
    const detail = details.find((item) => item.id === id);
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

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/9/1.gif')" alt="foo">

## 3. 总结

::: tip 向路由组件传递 params 参数：

1. 路由链接（**携带参数**）：`` <Link to={`/home/message/detail/${id}/${title}`}>{title}</Link> ``
2. 注册路由（**声明接收**）：`<Route path="/home/message/detail/:id/:title" component={Detail} />`
3. 路由组件（**接收参数**）：`const { id, title } = this.props.match.params;`

:::
