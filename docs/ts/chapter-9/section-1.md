---
title: 类型声明文件
comments: true
tags:
  - 类型声明文件
  - .d.ts
---

::: tip

类型声明文件是 `TypeScript` 中的一种特殊文件，通常以 `.d.ts` 作为扩展名， 它的主要作用是 <strong style="color:red">为现有的 `JavaScript` 代码提供类型信息</strong>，使得 `TypeScript` 能够在使用这些 `JavaScript` 库或模块时进行 <strong style="color:red">类型检查和提示</strong>。

:::

## 1. JavaScript 代码

`demo.js` ：

```js
export default function add(a,b) {
    return a + b;
}
export default function mul(a,b) {
    return a * b;
}
```

## 2. 类型声明文件

`demo.d.ts` ：

```ts
declare function add(a: number, b: number): number {};
declare function mul(a: number, b: number): number {};

export { add, mul };
```

## 3. TypeScript 代码

`index.ts` ：

```ts
import { add, mul } from "./demo.js";

const x = add(2, 3); // x的类型为number
const y = mul(4, 5); // y的类型为number

console.log(x, y);
```
