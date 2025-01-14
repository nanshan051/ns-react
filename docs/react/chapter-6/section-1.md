---
title: ant-design 的使用
comments: true
tags:
  - ant-design
  - antd
---

## 1. React UI 组件库

目前，最流行的开源 React UI 组件库有：

### 1.1. material-ui

国外常用。

- 官网：[material-ui](http://www.material-ui.com/#/)
- GitHub：[material-ui](https://github.com/mui/material-ui)

### 1.2. ant-design

国内蚂蚁金服团队开发。

- PC 官网：[ant-design](https://ant.design/)
- 移动官网：[ant-design-mobile](https://mobile.ant.design/index-cn)
- PC GitHub：[ant-design](https://github.com/ant-design/ant-design)
- 移动 GitHub：[ant-design-mobile](https://github.com/ant-design/ant-design-mobile/)

## 2. antd 的按需引入

### 2.1. 安装 antd

```sh
yarn add antd@4.24.12
```

### 2.2. 按需引入 UI 组件

```jsx
import React, { Component } from "react";
// 按需引入UI组件
import { Space, Button, DatePicker, Switch } from "antd";
// 引入样式
// import "antd/dist/antd.css"; // 按官方文档引入，会报错 ❌
import "antd/dist/antd.min.css"; // 正确引入 ✅ ✔

export default class App extends Component {
  render() {
    return (
      <>
        <p></p>
        &nbsp;&nbsp;
        <Space>
          <Button type="primary">Button</Button>
          <DatePicker></DatePicker>
          <Switch></Switch>
        </Space>
      </>
    );
  }
}
```

::: danger 注意：

按照官方文档引入样式： `import "antd/dist/antd.css";`， 会报错，跟 react-srcipt 版本有关。

<img class="zoomable" :src="$withBase('/images/screenshot/react/6/1/1.png')" alt="foo">

**正确引入方式时 ：`import "antd/dist/antd.min.css";`**

:::

### 2.3. 效果

<img class="zoomable" :src="$withBase('/images/screenshot/react/6/1/2.gif')" alt="foo">
