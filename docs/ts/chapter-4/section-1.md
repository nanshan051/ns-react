---
title: 类型声明
comments: true
tags:
  - 类型声明
---

## 1. 具体类型

使用 `:` 来对变量或函数形参，进行类型声明。

```ts
let a: string; // 声明变量a，类型为string
let b: number; // 声明变量b，类型为number
let c: boolean; // 声明变量c，类型为boolean

a = "hello";
a = 100; // 警告：不能将类型“number”分配给类型“string”

b = 666;
b = "你好"; // 警告：不能将类型“string”分配给类型“number”

c = true;
c = 999; // 警告：不能将类型“number”分配给类型“boolean”

// 参数x必须是数字，参数y必须也是数字，函数返回值也必须是数字
function demo(x: number, y: number): number {
  return x + y;
}

demo(100, 200);
demo(100, "200"); // 警告：类型“string”的参数不能赋给类型“number”的参数
demo(100, 200, 300); // 警告：应有 2 个参数，但获得 3 个
demo(100); // 警告：应有 2 个参数，但获得 1 个
```

## 2. 字面量类型

在 `:` 后面可以写 **『字面量类型』** ，不过，实际开发中用的不多。

```ts
let a: "你好"; // a的值只能为字符串'你好'
let b: 100; // b的值只能为数字100

a = "helo"; // 警告：不能将类型“"helo"”分配给类型“"你好"”
b = 200; // 警告：不能将类型“200”分配给类型“100”
```
