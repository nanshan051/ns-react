---
title: 消息订阅-发布机制
comments: true
tags:
  - 订阅
  - 发布
---

## 1. 前言

在上一小节《demo：查询 GitHub 用户》中， 组件 `<Search>` 和 `<List>` 是兄弟关系，它们之间的通信是通过 `props` 进行的。原理如下：

<img class="zoomable" :src="$withBase('/images/screenshot/4/3/1.png')" alt="foo">

这种方式需要通过它们共同的父组件作为“中间人”进行消息传递，无法直接进行通信。

## 2. 订阅-发布

『 订阅-发布』机制 **可以让任意两个组件直接进行通信，无需通过父组件传递。**

常用的订阅-发布库有：`PubSubJS` 、`EventEmitter`。这里介绍一下 `PubSubJS` 的用法：

安装和引用：

```js
yarn add pubsub-js

import PubSub from "pubsub-js";
```

订阅消息：

```js
// 回调函数接收两个参数：消息名称，数据
const callback = (msg, data) => {
  console.log(msg, data);
};

// 订阅消息函数接收两个参数：消息名称，回调函数
const token = PubSub.subscribe("myTopic", callback);
```

取消订阅：

```js
PubSub.unsubscribe(token);
```

发布消息：

```js
// 发布消息函数接收两个参数：消息名称，要传递的数据
PubSub.publish("myTopic", { name: "张三" });
```

## 3. 实现

在上一小节《demo：查询 GitHub 用户》的基础上，采用『订阅-发布』机制实现兄弟组件通信。

### 3.1. 修改 App 组件

App.jsx：

```jsx
import React, { Component } from "react";
import Search from "./Search";
import List from "./List";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Search />
        <List />
      </div>
    );
  }
}
```

### 3.2. 修改 List 组件

『订阅-发布』机制可以实现直接通信，所以可以将 List 用到的状态和操作状态的方法直接放在 List 组件中。

List/index.jsx：

```jsx
import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";

export default class List extends Component {
  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    err: "",
  };
  componentDidMount() {
    // 订阅消息
    this.token = PubSub.subscribe(
      "updateListState",
      // 这里回调函数没有用到第一个参数，可以用下划线_占位
      (_, data) => {
        console.log("List接收到数据", data);
        this.setState(data);
      },
    );
  }
  componentWillUnmount() {
    // 取消订阅
    PubSub.unsubscribe(this.token);
  }
  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div className="row">
        {isFirst ? (
          <h2>enter a keyword to search</h2>
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

::: tip 注意：

- 在组件的 `componentDidMount` （挂载完毕）钩子函数中进行订阅
- 在组件的 `componentWillUnmount`（卸载前）钩子函数中进行取消订阅

:::

### 3.3. 修改 Search 组件

Search/index.jsx：

```jsx
import React, { Component } from "react";
import axios from "axios";
import PubSub from "pubsub-js";

export default class Search extends Component {
  search = () => {
    const {
      keywordElement: { value: keyword },
    } = this;
    // 发布消息
    PubSub.publish("updateListState", {
      isFirst: false,
      isLoading: true,
    });
    axios.get(`https://api.github.com/search/users?q=${keyword}`).then(
      (res) => {
        console.log("成功了", res.data);
        // 发布消息
        PubSub.publish("updateListState", {
          isLoading: false,
          err: "",
          users: res.data.items,
        });
      },
      (err) => {
        console.log("失败了", err.message);
        // 发布消息
        PubSub.publish("updateListState", {
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

## 4. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/4/3/2.gif')" alt="foo">
