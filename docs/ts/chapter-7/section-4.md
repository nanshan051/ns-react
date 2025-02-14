---
title: void
comments: true
tags:
  - void
  - undefined
---

::: tip

`void` 通常用于 **<span style="color:red">函数返回值</span>** 声明，含义：

**『函数不返回任何值，调用者也不应该依赖其返回值进行任何操作』。**

:::

1. 用例：

```ts
// 声明函数返回值为void类型
function logMessage(msg: string): void {
  console.log(msg);
}
logMessage("hello");
```

::: danger 注意：

编码者没有编写 `return` 去指定函数的返回值，所以 `logMessage` 函数是没有 **<span style="color:red">显式返回值</span>** 的，但会有一个 **<span style="color:red">隐式返回值</span>**，就是 `undefined` 。即：虽然函数返回类型为 `void`，但是也可以接受 `undefined` ，简单记：**『 undefined 是 void 可以接受的一种“空”。』**

:::

1. 以下写法均符合规范

```ts
// 无警告
function logMessage1(msg: string): void {
  console.log(msg);
}

// 无警告
function logMessage2(msg: string): void {
  console.log(msg);
  return;
}

// 无警告
function logMessage3(msg: string): void {
  console.log(msg);
  return undefined;
}
```

3. 那限制函数返回值时，是不是 `undefined` 和 `void` 就没有区别了呢？

   - 有区别，因为还有这句话：**『返回值类型为 `void` 的函数，调用者不应该依赖其返回值进行任何操作！』** 对比下面这段代码：

```ts
// 声明函数返回值类型为void
function demo1(): void {}

let result1 = demo1();

// 警告：无法测试 "void" 类型的表达式的真实性。
if (result1) {
}
```

```ts
// 声明函数返回值类型为undefined
function demo2(): undefined {}

let result2 = demo2();

// 无警告
if (result2) {
}
```

::: tip 理解 void 和 undefined

- `void` 是一个广泛的概念，用来表达 “空”，而 `undefined` 则是这种 “空” 的具体实现之一。
- 因此可以说 `undefined` 是 `void` 能接受的 “空” 状态的一种具体形式。
- 换句话说，`void` 包含 `undefined`，但 `void` 表达的语义超越了单纯的 `undefined`，它是一种意图上的约定，而不仅仅是特定值的限制。

:::

::: tip 总结

若函数返回类型为 `void`，那么：

1. 从 **『语法』** 上讲，函数是可以返回 `undefined` 的，至于显式返回，还是隐式返回，这无所谓！
2. 从 **『语义』** 上讲，函数调用者不应该关心函数返回的值，也不应该依赖函数值进行任何操作！即使返回了 `undefined` 值。

:::
