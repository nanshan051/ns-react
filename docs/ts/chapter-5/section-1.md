---
title: 类型推断
comments: true
tags:
  - 类型推断
---

TypeScript 会根据我们的代码，进行类型推导，例如下面代码中的变量 `d` ，只能存储数字。

```ts
let d = -99; // TypeScript会推断出变量d的类型是数字
d = false; // 警告：不能将类型“boolean”分配给类型“number”
```

::: warning 注意：

类型推断不是万能的，面对复杂类型时推断容易出问题，所以尽量还是明确的编写类型声明。

:::
