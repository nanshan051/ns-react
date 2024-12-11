---
title: 编程式路由导航
comments: true
tags:
  - 编程式
---

编程式导航可以不借助 Link 组件，直接使用 history 对象进行路由跳转。

## 1. 跳转方法

路由组件的 `props` 中的 `history` 对象提供了编程式导航的方法。

```js
"history": {
    "push": push(path, state) {},
    "replace": replace(path, state) {},
    "goBack": goBack() {},
    "goForward": goForward() {},
    "go": go(n) {},
}
```

### 1.1. push

- 跳转到指定路由，并将该路由推入到历史记录栈。
- 可以携带 `params`、`search` 和 `state` 参数。

```jsx
pushShow = (id, title) => {
  // push跳转 + 携带params参数
  this.props.history.push(`/home/message/detail/${id}/${title}`);

  // push跳转 + 携带search参数
  // this.props.history.push(`/home/message/detail/?id=${id}&title=${title}`);

  // push跳转 + 携带state参数
  // this.props.history.push(`/home/message/detail`, { id, title });
};

<button
  onClick={() => {
    this.pushShow(id, title);
  }}
>
  push
</button>;
```

### 1.2. replace

- 跳转到指定路由，并用该路由替换历史记录栈顶的那条记录。
- 可以携带 `params`、`search` 和 `state` 参数。

```jsx
replaceShow = (id, title) => {
  // replace跳转 + 携带params参数
  this.props.history.replace(`/home/message/detail/${id}/${title}`);

  // replace跳转 + 携带search参数
  // this.props.history.replace(`/home/message/detail/?id=${id}&title=${title}`);

  // replace跳转 + 携带state参数
  // this.props.history.replace(`/home/message/detail`, { id, title });
};

<button
  onClick={() => {
    this.replaceShow(id, title);
  }}
>
  replace
</button>;
```

### 1.3. goBack

- 后退 1 个路由，等价于浏览器的“后退”按钮。
- 等价于 `window.history.back()`、`window.history.go(-1)`。

```jsx
goBack = () => {
  this.props.history.goBack(); // 后退1个路由
};

<button onClick={this.goBack}>后退</button>;
```

### 1.4. goForward

- 前进 1 个路由，等价于浏览器的“前进”按钮。
- 等价于 `window.history.forward()`、`window.history.go(1)`。

```jsx
goForward = () => {
  this.props.history.goForward(); // 前进1个路由
};

<button onClick={this.goForward}>前进</button>;
```

### 1.5. go

- 前进或后退指定的路由数量，n>0 前进，n<0 后退。

```jsx
go = () => {
  this.props.history.go(2); // 前进2个路由
};

<button onClick={this.go}>go2</button>;
```

## 2. 总览

### 2.1. 代码

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

  pushShow = (id, title) => {
    // push跳转 + 携带params参数
    this.props.history.push(`/home/message/detail/${id}/${title}`);

    // push跳转 + 携带search参数
    // this.props.history.push(`/home/message/detail/?id=${id}&title=${title}`);

    // push跳转 + 携带state参数
    // this.props.history.push(`/home/message/detail`, { id, title });
  };

  replaceShow = (id, title) => {
    // replace跳转 + 携带params参数
    this.props.history.replace(`/home/message/detail/${id}/${title}`);

    // replace跳转 + 携带search参数
    // this.props.history.replace(`/home/message/detail/?id=${id}&title=${title}`);

    // replace跳转 + 携带state参数
    // this.props.history.replace(`/home/message/detail`, { id, title });
  };

  goBack = () => {
    this.props.history.goBack(); // 后退1个路由
  };

  goForward = () => {
    this.props.history.goForward(); // 前进1个路由
  };

  go = () => {
    this.props.history.go(2); // 前进2个路由
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
                <p>
                  {/* 路由链接 传递params参数 */}
                  <Link to={`/home/message/detail/${id}/${title}`}>
                    {title}
                  </Link>
                  {/* 路由链接 传递search参数 */}
                  {/* <Link to={`/home/message/detail/?id=${id}&title=${title}`}>{title}</Link> */}
                  {/* 路由链接 传递state参数 */}
                  {/* <Link to={{pathname: `/home/message/detail`,state: { id, title }}}>{title}</Link> */}
                  &nbsp;&nbsp;
                  {/* 编程式导航 push */}
                  <button
                    onClick={() => {
                      this.pushShow(id, title);
                    }}
                  >
                    push
                  </button>
                  &nbsp;&nbsp;
                  {/* 编程式导航 replace */}
                  <button
                    onClick={() => {
                      this.replaceShow(id, title);
                    }}
                  >
                    replace
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
        <Switch>
          {/* 声明接收params参数 */}
          <Route path="/home/message/detail/:id/:title" component={Detail} />

          {/* 无需声明接收search参数 */}
          {/* <Route path="/home/message/detail" component={Detail} /> */}

          {/* 无需声明接收state参数 */}
          {/* <Route path="/home/message/detail" component={Detail} /> */}
        </Switch>
        <button onClick={this.goBack}>后退</button>&nbsp;&nbsp;
        <button onClick={this.goForward}>前进</button>&nbsp;&nbsp;
        <button onClick={this.go}>go2</button>&nbsp;&nbsp;
      </div>
    );
  }
}
```

### 2.2. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/5/13/1.gif')" alt="foo">
