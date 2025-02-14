---
title: 一个特殊情况
comments: true
tags:
  - void
  - 箭头函数
  - 简写
---


## 1. 正常情况

在函数定义时，限制函数返回值为 `void` ，那么函数的返回值就必须为空。

```ts
function demo(): void {
  // 返回undefined合法
  return undefined;

  // 以下返回均不合法
  // return 100;
  // return false;
  // return null;
  // return {};
}
demo();
```

## 2. 特殊情况

使用 <strong style="color:red">类型声明（type）</strong> 限制返回值为 `void` 时， <strong style="color:red">TypeScript 并不会严格要求函数返回为空。</strong>

```ts
type LogFunc = () => void;

const f1: LogFunc = () => {
  // 允许返回非空值
  return 100;
};

// 但是不允许对返回值进行操作，否则报错：
let x = f1();

// 下方if报错：无法测试 "void" 类型的表达式的真实性
if (x) {
}
```

## 3. 为什么会这样？

是为了确保如下代码成立， `Array.prototype.push` 返回的是 `number` ，而 `Array.prototype.forEach` 方法期望其回调函数的返回类型是 `void` ，如果进行严格限制的话，则箭头函数无法简写（函数体只有一行时，可以去掉 `{}` ）。

```ts
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
```

::: tip

因此，<strong style="color:red">为了箭头函数能正常简写</strong> ，对于通过 `type` 声明的限制返回值为 `void` 的函数类型，`TypeScript` 并不会严格要求该类型的函数返回为空。

:::

官方文档的说明：[Assignability of Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#assignability-of-functions)
