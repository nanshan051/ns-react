---
title: any
comments: true
tags:
  - any
---

::: tip

`any` 的含义是：任意类型。一旦将变量类型限制为 `any`，那就意味着 **<span style="color:red">放弃了</span>** 对该变量的类型检查。

:::

```ts
// 明确的表示a的类型是any ———— 【显式any】
let a: any;

// 以下对a的赋值，均无警告
a = 99;
a = "hello";
a = false;

// 没有明确的表示b的类型是any，但TS主动推断出来b的类型是any ———— 【隐式any】
let b;

// 以下对b的赋值，均无警告
b = 99;
b = "hello";
b = false;
```

**注意：`any` 类型的变量，可以赋值给任意类型的变量。**

```ts
// any类型的变量，可以赋值给任意类型的变量。
let c: any;
c = 9;

let x: string;
x = c; // 无警告
console.log(x); // 输出：9
```
