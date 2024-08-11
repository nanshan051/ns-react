---
title: React 的基本认识
comments: true
tags:
  - React
  - 官网
  - 特点
---

## 官网

- 英文官网：[https://reactjs.org](https://reactjs.org)
- 中文官网：[https:doc.react-china.org](https:doc.react-china.org)

## 介绍描述

- 用于构建用户界面的 `JavaScript` 库（只关注于 `view` ）
- 由 `Facebook` 开源

## React 的特点

1. `Declarative`（声明式编码）
2. `Component-Based`（组件化编码）
3. `Learn Once, Write Anywhere`（支持客户端与服务器端渲染）
4. 高效
5. 单向数据流

## React 高效的原因

1. 虚拟（`virture`） `DOM`，不总是直接操作 `DOM`
2. `DOM diff` 算法，最小化页面重绘

:::tip

高效之处不在页面初始化，而是在 **数据发生变化时** 。

:::

```html
<!-- 原生 JavaScript 实现 -->

<!-- 存放人员列表的容器 -->
<ul id="list"></ul>

<script>
  // 人员列表数据
  let personArr = [
    {
      id: "001",
      name: "小明",
      age: 18,
    },
    {
      id: "002",
      name: "小红",
      age: 16,
    },
  ];

  // 人员列表的 html 字符串
  let htmlStr = "";
  personArr.forEach((person) => {
    html += `<li>${person.name}-${person.age}</li>`;
  });

  // 操作 DOM 呈现人员列表
  document.getElementById("list").innerHTML = htmlStr;
</script>
```

数据发生变化时，如新增人员小亮：  
- 原生 `JavaScript` 会根据新的 `personArr` 生成对应的 `DOM`，替换掉原有的人员列表。  
- 而 `React` 会重新计算虚拟 `DOM` 并通过 `diff` 算法比较差异，**只更新变化的部分**，即在原有列表上，新增小亮。
