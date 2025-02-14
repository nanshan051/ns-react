---
title: tuple
comments: true
tags:
  - tuple
  - 元组
---

::: tip

元组（tuple）是一种特殊的 **数组类型** ，可以存储 **固定数量** 的元素，并且每个元素的类型是 **已知的** 且 **可以不同**，元祖用于精确描述一组值的类型，`?` 表示可选元素。

:::

```ts
// 第一个元素必须是string类型，第二个元素必须是number类型
let arr1: [string, number];
// 第一个元素必须是number类型，第二个元素是可选的，如果存在，必须是boolean
let arr2: [number, boolean?];
// 第一个元素必须是number类型，后面的元素可以是任意数量的string类型
let arr3: [number, ...string[]];

// 可以赋值
arr1 = ["hello", 123];
arr2 = [100, false];
arr2 = [100];
arr3 = [100, "hello", "world"];
arr3 = [100];

// 不可以赋值，arr1声明时是两个元素，赋值的是三个
arr1 = ["hello", 123, false];
```
