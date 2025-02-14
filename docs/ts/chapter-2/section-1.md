---
title: 为何需要 TypeScript
comments: true
tags:
  - TypeScript
---

## 1. 今非昔比的 JavaScript <Badge text="了解"/>

> - `JavaScript` 当年诞生的定位是浏览器 **<span style="color:red">脚本语言</span>** ，用于在网页中嵌入一些 **<span style="color:red">简单的逻辑</span>** ，而且代码量很少。
> - 随着时间的推移，JavaScript 变得越来越流行，如今的 `JavaScript` 已经可以 **<span style="color:red">全栈编程</span>** 了。
> - 现如今的 `JavaScript` **<span style="color:red">应用场景</span>** 比当年 **<span style="color:red">丰富</span>** 的多， **<span style="color:red">代码量</span>** 也比当年 **<span style="color:red">大</span>** 很多，随便一个 JavaScript 项目的代码量，可以轻松的达到几万行，甚至几十万行！
> - 然而 `JavaScript` 当年“ **<span style="color:red">出生简陋</span>** ”，没有考虑到如今的应用场景和代码量，逐渐的就出现了 **<span style="color:red">很多困扰</span>** 。

## 2. JavaScript 中的困扰

### 2.1. 不清不楚的数据类型

```js
const welcome = "hello";
welcome(); // 运行时报错，TypeError: welcome is not a function
```

### 2.2. 有漏洞的逻辑

```js
const str = Date.now() % 2 ? "奇数" : "偶数";

// if逻辑有漏洞，但是js不会给任何提示，所以很难发现
if (str !== "奇数") {
  alert("hello");
} else if (str === "偶数") {
  alert("world");
}
```

### 2.3. 访问不存在的属性

```js
const obj = { width: 10, height: 20 };
const area = obj.width * obj.high; // 访问不存在的属性high，js不会报错
```

### 2.4. 低级的拼写错误

```js
const message = "hello,world";
message.toUperCase(); // 运行时报错，TypeError: message.toUperCase is not a function
```

## 3. 静态类型检查

- 在代码运行前进行检查，发现代码的错误或不合理之处，减小运行时异常的出现的几率，此种检查叫 『**<span style="color:red">静态类型检查</span>**』，`TypeScript` 的核心就是『静态类型检查』，简而言之就是 **<span style="color:red">把运行时的错误前置</span>** 。
- 同样的功能，TypeScript 的代码量要 **<span style="color:red">大于</span>** JavaScript，但由于 TypeScript 的代码结构更加清晰，在后期代码的维护中 `TypeScript` **<span style="color:red">远胜于</span>** `JavaScript` 。


