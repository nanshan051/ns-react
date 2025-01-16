---
title: 模块化介绍
comments: true
tags:
  - 模块化
---

## 1. 模块化概述

### 1.1. 什么是模块化

- 将程序文件依据一定规则 **<font color="red">拆分</font>** 成多个文件，这种编码方式就是 **<font color="red">模块化</font>** 的编码方式。

- 拆分出来 **<font color="red">每个文件就是一个模块</font>** ，模块中的数据都是 **<font color="red">私有的</font>**，模块之间互相 **<font color="red">隔离</font>** 。

- 同时也能通过一些手段，可以把模块内的指定数据“**<font color="red">交出去</font>**”，供其他模块使用。

### 1.2. 为什么需要模块化

随着应用的复杂度越来越高，其代码量和文件数量都会急剧增加，会逐渐引发以下问题：

  **① 全局污染**

  **② 依赖混乱**

  **③ 数据安全**

## 2. 有哪些模块化规范？

> 历史背景（了解即可）：2009 年，随着 Node.js 的出现，JavaScript 在服务器端的应用逐渐增多，为了让 Node.js 的代码更好维护，就必须要定制一种 Node.js 环境下的模块化规范，来自 Mozilla 的工程师 Kevin Dangoor 提出来 CommonJS 规范（CommonJS 初期的名字叫 ServerJS），随后 Node.js 社区采纳了这一规范。

随着时间的推移，针对 JavaScript 的不同运行环境，相继出现了多种模块化规范，按时间排序，分别为：

::: tip 模块化规范种类：

1. **<font color="red">CommonIS</font> —— 服务端应用广泛**
2. AMD
3. CMD
4. **<font color="red">ES6 模块化</font> —— 浏览器端应用广泛**

:::

## 3. 导入与导出的概念

模块化的核心思想就是：模块之间是 **<font color="red">隔离的</font>**，通过 **导入** 和 **导出** 进行数据和功能的共享。

- **导出（暴露）**：模块公开其内部的一部分（如变量、函数等），使这些内容可以被其他模块使用。
- **导入（引入）**：模块引入和使用其他模块导出的内容，以重用代码和功能。

<img class="zoomable" :src="$withBase('/images/screenshot/notes/2/1/1.png')" alt="foo">
