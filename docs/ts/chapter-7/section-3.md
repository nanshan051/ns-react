---
title: never
comments: true
tags:
  - never
---

::: tip

`never` 的含义是：

任何值都不是，简而言之就是不能有值，`undefined`、`null`、`''`、`0` 都不行！

:::

1. 几乎不用 `never` 去直接限制变量，因为没有意义，例如：

```ts
// 指定a的类型为never，那就意味着a以后不能存任何的数据了
let a: never;

// 以下对a的所有赋值都会有警告：
a = 1; // 不能将类型“boolean”分配给类型“never”
a = true;
a = "hello";
a = undefined;
a = null;
a = {};
```

2. `never` 一般是 `TypeScript` 主动推断出来的，例如：

```ts
// 指定a的类型为string
let a: string;
// 给a设置一个值
a = "hello";

if (typeof a === "string") {
  console.log(a.toUpperCase());
} else {
  // TS 会推断出来此处的a是never，因为没有任何一个值符合此处的逻辑
  console.log(a);
}
```

3. `never` 也可用于限制函数的返回值：

```ts
/*
 * 返回“never”的函数不能具有可访问的终结点
 * 即：不能有返回值，连默认的undefined都不行
 * 此时，函数只能有两种情况：
 *    1. 不能顺利结束
 *    2. 递归调用自身，形成死循环
 * 解决办法：只能通过抛出错误来结束函数
 */

// 限制throwError函数不需要存在任何返回值，任何值都不行，连undefined、null都不行
function throwError(str: string): never {
  throw new Error("程序异常退出：", str); // 只能通过抛出错误来结束函数
}
```
