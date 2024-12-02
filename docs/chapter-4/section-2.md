---
title: demo：查询GitHub用户
comments: true
tags:
  -
---

## 1. 需求

- 输入关键字，发送 `ajax` 请求，查询 GitHub 用户
- 展示查询结果，包括用户名、头像
- 点击头像，跳转到用户主页
- 首次加载页面时，显示占位文字
- 请求正在被处理时，显示 Loading
- 请求失败时，显示错误信息

## 2. 实现

项目目录：

```sh
react_staging
├── package.json
├── public
|  ├── css
|  |  └── bootstrap.css
|  ├── favicon.ico
|  └── index.html
├── README.md
├── src
|  ├── App.jsx
|  ├── index.js
|  ├── List
|  |  ├── index.css
|  |  └── index.jsx
|  └── Search
|     └── index.jsx
└── yarn.lock
```

### 2.1. 公共样式

在 public/css 目录下添加 `bootstrap.css` 文件，并在主页面 index.html 中引入：

```html
<link rel="stylesheet" href="./css/bootstrap.css" />
```

### 2.2. 入口文件

index.js：

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 2.3. 根组件

App.jsx：

```jsx
import React, { Component } from "react";
import Search from "./Search";
import List from "./List";

export default class App extends Component {
  state = {
    users: [],
    isFirst: true, // 是否首次加载
    isLoading: false, // 是否处于加载中
    err: "", // 存储请求相关的错误信息
  };
  updateAppState = (stateObj) => {
    this.setState(stateObj);
  };
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState} />
        <List {...this.state} />
      </div>
    );
  }
}
```

::: tip 注意：

1. 若同一状态（ `users` 等）被多个组件（ `Search` 和 `List` ）用到，则将状态放在他们共同的父组件（ `App` ） 中。
2. 状态（ `users` 等）在哪里，操作状态的方法（ `updateAppState` ）就放在哪里。

:::

### 2.4. Search 组件

Search/index.jsx：

```jsx
import React, { Component } from "react";
import axios from "axios";

export default class Search extends Component {
  search = () => {
    // 多层解构赋值+重命名，这里只定义了keyword
    const {
      keywordElement: { value: keyword },
    } = this;
    this.props.updateAppState({
      isFirst: false,
      isLoading: true,
    });
    axios.get(`https://api.github.com/search/users?q=${keyword}`).then(
      (res) => {
        console.log("成功了", res.data);
        this.props.updateAppState({
          isLoading: false,
          err: "",
          users: res.data.items,
        });
      },
      (err) => {
        console.log("失败了", err.message);
        this.props.updateAppState({
          isLoading: false,
          err: err.message,
        });
      },
    );
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            ref={(e) => (this.keywordElement = e)}
            type="text"
            placeholder="enter the name you search"
          />
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    );
  }
}
```

### 2.5. Search 组件

List/index.jsx：

```jsx
import React, { Component } from "react";
import "./index.css";

export default class List extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props;
    return (
      <div className="row">
        {/* 动态加载 */}
        {isFirst ? (
          <h2>enter keyword to search</h2>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : err ? (
          <h2>{err}</h2>
        ) : (
          users.map((user) => (
            <div className="card" key={user.id}>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                <img
                  src={user.avatar_url}
                  style={{ width: "100px" }}
                  alt="head_photo"
                />
              </a>
              <p className="card-text">{user.login}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}
```

List/index.css：

```css
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
```

## 3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/4/2/1.gif')" alt="foo">
