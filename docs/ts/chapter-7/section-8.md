---
title: type
comments: true
tags:
  - type
---

::: tip

`type` 可以为任意类型创建别名，让代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展。

:::

## 1. 基本用法

类型别名使用 `type` 关键字定义，`type` 后跟类型名称，例如下面代码中 `num` 是类型别名。

```ts
type num = number;

let price: num;
price = 100;
```

## 2. 联合类型

联合类型是一种高级类型，它表示一个值可以是 **几种不同类型之一**。

```ts
type Status = number | string;
type Gender = "男" | "女";

function printStatus(status: Status) {
  console.log(status);
}

function logGender(gender: Gender) {
  console.log(gender);
}

printStatus(200);
printStatus("ok");
printStatus(true); // 报错：类型“boolean”的参数不能赋给类型“Status”的参数。

logGender("男");
logGender("女");
logGender(""); // 报错：类型“""”的参数不能赋给类型“Gender”的参数。
```

## 3. 交叉类型

交叉类型（Intersection Types）允许将多个类型合并成一个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常用于对象类型。

```ts
// 面积
type Area = {
  width: number; // 宽
  height: number; // 高
};

// 地址
type Address = {
  num: number; // 楼号
  cell: number; // 单元号
  room: string; // 房间号
};

type House = Area & Address;

const house: House = {
  width: 100,
  height: 200,
  num: 5,
  cell: 2,
  room: "301",
};
```
