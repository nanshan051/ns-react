---
title: 向路由组件传递search参数
comments: true
tags:
  - 路由传参
  - search
---

在上一小节《向路由组件传递 params 参数》案例的基础上，改为向路由组件传递 search 参数。(此节只展示修改和新增的代码)

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
            const { id, title } = item;
            return (
              <li key={id}>
                {/* 1.路由链接（携带search参数） */}
                <Link to={`/home/message/detail/?id=${id}&title=${title}`}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
        <Switch>
          {/* 2.注册路由（不需要声明接收search参数） */}
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
import qs from "qs"; // 新版
// import qs from "querystring"; // 旧版（已弃用）

// 模拟数据库
const details = [
  { id: "1", content: "后海有树的院子" },
  { id: "2", content: "夏代有工的玉" },
  { id: "3", content: "此时此刻的云" },
];

export default class Detail extends Component {
  render() {
    console.log("Detail接收的props", this.props);
    // 3.路由组件（接收search参数）
    const { id, title } = qs.parse(this.props.location.search.slice(1));
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

### 1.4. 查询字符串 与 qs 库

url 中的 `?id=1&title=message001` 即『查询字符串』，是 `urlencoded` 编码格式，可以使用 `qs` 库来解析。

::: tip qs 库：

qs（querystring）库用于 **解析** 和 **字符串化**『查询字符串』，react 脚手架已经帮我们安装好了这个库。

主要用到两个方法：

- `qs.parse(str, [options])`：将查询字符串解析为对象。
- `qs.stringify(obj, [options])`：将对象转化为查询字符串。

:::

注意： `props.location.search` 中的 **查询字符串首字符是 `?`，需要去掉后，再调用 qs.parse() 进行解析。**

## 2. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/5/10/1.gif')" alt="foo">

## 3. 总结

::: tip 向路由组件传递 search 参数：

1. 路由链接（**携带参数**）：`` <Link to={`/home/message/detail/?id=${id}&title=${title}`}>{title}</Link> ``
2. 注册路由（**不需要声明接收**）：`<Route path="/home/message/detail" component={Detail} />`
3. 路由组件（**接收参数**）：`const { id, title } = qs.parse(this.props.location.search.slice(1));`
4. 备注：获取到的 search 是 `urlencoded` 编码格式，需要借助 `qs` 库进行解析。

:::
