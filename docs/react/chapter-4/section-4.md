---
title: fetch
comments: true
tags:
  - fetch
---

以 4.2 节《案例：查询 GitHub 用户》的请求为例，对比 `axios`（ `XMLHttpRequest` ）和 `fetch` 的实现。

## 1. axios 请求

```jsx
axios.get(`https://api.github.com/search/users?q=${keyword}`).then(
  (res) => {
    console.log("axios请求成功", res);
  },
  (err) => {
    console.log("axios请求出错", err);
  },
);
```

axios 请求成功：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/4/1.png')" alt="foo">

axios 请求出错：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/4/2.png')" alt="foo">

## 2. fetch 请求

::: tip 注意：

`fetch` 遵循 **<font color="red">『关注分离』</font>** 的设计思想，实现上 **分为两步**：

1. **联系服务器是否成功。** 返回一个 `promise` ：
   - resolve：返回一个对象 res 。可以 **通过 `res` 调用其原型上的 `json()` 方法来解析数据，返回一个 `promise` 。**
   - reject：返回一个错误
2. **响应数据是否正确解析。**
   - resolve：返回响应数据（在这里处理正常逻辑）
   - reject：返回一个错误

:::

```js
fetch(`https://api.github.com/search/users?q=${keyword}`)
  // 第一步：联系服务器
  .then(
    (res) => {
      console.log("fetch联系服务器成功", res);
      // 若联系服务器成功，则调用json()方法解析数据，返回一个promise
      return res.json();
    },
    (err) => {
      console.log("fetch联系服务器出错", err.message);
      return new Promise(() => {});
    },
  )
  // 第二步：解析数据（fetch支持多个then的链式调用）
  .then(
    (res) => {
      console.log("fetch请求成功", res);
    },
    (err) => {
      console.log("fetch请求出错", err.message);
    },
  );
```

fetch 请求成功：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/4/3.png')" alt="foo">

fetch 请求出错（可以 **设置网络离线** 来模拟出错）：

<img class="zoomable" :src="$withBase('/images/screenshot/react/4/4/4.png')" alt="foo">

## 3.fetch 请求优化

### 3.1. 优化一：错误穿透

在 `then` 的链式调用中，可以对错误进行统一处理，称为 **『错误穿透』。**

```js
fetch(`https://api.github.com/search/users?q=${keyword}`)
  .then((res) => {
    console.log("fetch联系服务器成功", res);
    return res.json();
  })
  .then((res) => {
    console.log("fetch请求成功", res);
  })
  //对错误进行统一处理
  .catch((err) => {
    console.log("fetch请求出错", err.message);
  });
```

### 3.2. 优化二：async/await

`async/await` 语法可以让代码看起来更像同步代码，并且更容易理解。

```js
// 下面这段代码需要在外面包裹一层 async 函数
try {
  const res = await fetch(`https://api.github.com/search/users?q=${keyword}`);
  const data = await res.json();
  console.log("fetch请求成功", data);
} catch (err) {
  console.log("fetch请求出错", err.message);
}
```
