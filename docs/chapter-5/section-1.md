---
title: 相关理解
comments: true
tags:
  - SPA
  - 路由
---

## 1. SPA

1. 单页 Web 应用（Single Page Web Application）。
2. 整个应用 **<font color="red">只有一个完整页面</font>**。
3. 点击页面中的链接 **<font color="red">不会刷新页面</font>** ，只会做页面的局部更新。
4. 数据都需要通过 `Ajax` 获取，并在前端异步展现。

## 2. 路由

1. 什么是路由？
   - 一个路由就是一个映射关系（key: value）
   - **key 为路由路径，value 可能是 `function` 或者 `component`**
2. 后台路由
   - 理解：`node` 服务器路由，value 是 `function`，用来处理客户端提交的请求并返回响应数据。
   - 注册路由：`router.get(path,function(req,res){...})`
   - 工作过程：**当 node 接收到一个请求时，根据请求路径找到匹配的路由。调用路由中的函数来处理请求，并返回响应数据。**
3. 前端路由
   - 理解：浏览器端路由，value 是 `component`，当请求的是路由 `path` 时，**浏览器端没有发生 http 请求**，但界面会更新显示对应的组件。
   - 注册路由：`<Route path="/test" component={Test}>`
   - 工作过程：**当浏览器的 path 变为 /test 时，当前路由组件就会变为 About 组件。**

## 3. 前端路由的实现

### 3.1. history 库

- 网址：[https://github.com/remix-run/history](https://github.com/remix-run/history)
- 管理浏览器会话历史（history）的工具库
- 包装的是原生 `BOM` 中 `window.history` 和 `window.location.hash`

### 3.2. history API

1. `History.createBrowserHistory()` ：得到封装 window.history 的管理对象
2. `History.createHashHistory()` ：得到封装 window.location.hash 的管理对象
3. `history.push()` ：添加一个新的历史记录
4. `history.replace()` ：用一个新的历史记录替换当前的历史记录
5. `history.goBack()` ：回退到上一个历史记录
6. `history.goForward()` ：前进到下一个历史记录
7. `history.go(n)` ：前进或后退 n 个历史记录（n > 0 前进，n < 0 回退）
8. `history.listen(function(location){})` ：监视历史记录的变化

### 3.3. 案例

编写一个演示页面：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>前端路由的基石_History</title>
  </head>
  <body>
    <a href="https://juejin.cn" onclick="return push('/test1')">push test1</a>
    <br /><br />
    <button onClick="push('test2')">push test2</button>
    <br /><br />
    <button onClick="replace('/test3')">replace test3</button>
    <br /><br />
    <button onClick="goBack()">goBack</button>
    <br /><br />
    <button onClick="goForward()">goForward</button>
    <br /><br />
    <!-- 引入history库 -->
    <script src="https://cdn.bootcdn.net/ajax/libs/history/4.7.2/history.js"></script>
    <script type="text/javascript">
      const history = History.createBrowserHistory(); // 方法一：使用H5推出的history身上的API
      // const history = History.createHashHistory() // 方法二：hash值（锚点）
      console.log("History", History);
      console.log("history", history);

      function push(path) {
        history.push(path);
        return false;
      }

      function replace(path) {
        history.replace(path);
      }

      function goBack() {
        history.goBack();
      }

      function goForward() {
        history.goForward();
      }

      history.listen(function (location) {
        console.log("请求路由路径变化了", location);
      });
    </script>
  </body>
</html>
```

在 vscode 中右键该页面文件，点击 `Open With Live Server` （使用 Live 服务器打开） 后，效果如下：

<img class="zoomable" :src="$withBase('/images/screenshot/5/1/1.gif')" alt="foo">
