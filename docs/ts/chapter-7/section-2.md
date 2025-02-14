---
title: unknown
comments: true
tags:
  - unknown
  - 断言
---

::: tip

`unknown` 的含义是：**<span style="color:red">未知类型</span>**。

:::

1. `unknown` 可以理解为一个类型安全的 `any`，适用于，不确定数据的具体类型。

```ts
// 设置a的类型为unknown
let a: unknown;

// 以下对a的赋值，均无警告
a = 99;
a = "hello";
a = false;

// 设置x的类型为string
let x: string;
x = a; // 警告：不能将类型“unknown”分配给类型“string”
```

2. `unknown` 会强制开发者在使用之前进行类型检查，从而提供更强的类型安全。

```ts
// 设置a的类型为unknown
let a: unknown;
a = "hello";

// 设置x的类型为string
let x: string;

// 第一种方式：加类型判断
if (typeof a === "string") {
  x = a;
}

// 第二种：加断言
x = a as string;

// 第三种：加断言
x = <string>a;

console.log(x); // 输出：hello
```

3. 读取 `any` 类型数据的任何属性都不会有警告，而 `unknown` 正好与之相反。

```ts
let str1: string;
str1 = "hello";
str1.toUpperCase(); // 无警告

let str2: any;
str2 = "hello";
str2.toUpperCase(); // 无警告

let str3: unknown;
str3 = "hello";
// str3.toUpperCase(); // 警告：“str3”的类型为“未知”

// 使用断言强制指定str3的类型为string
(str3 as string).toUpperCase(); // 无警告
```
