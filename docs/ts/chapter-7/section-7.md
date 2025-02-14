---
title: enum
comments: true
tags:
  - enum
  - 枚举
---

::: tip

枚举（enum）可以定义 **<span style="color:red">一组命名常量</span>** ，它能增强代码的 **可读性** ，也让代码 **更好维护**。

:::

如下代码的功能是：根据调用 `walk` 时传入的不同参数，执行不同的逻辑，存在的问题是调用 `walk` 时传参时没有任何提示，编码者很容易写错字符串内容，并且用于判断逻辑的 `up`、`down`、`left`、`right` 是 **<span style="color:red">连续且相关的一组值</span>**，那此时就特别适合使用 **<span style="color:red">枚举 （ `enum` ）</span>** 。

```ts
function walk(str: string) {
  if (str === "up") {
    console.log("向『上』走");
  } else if (str === "down") {
    console.log("向『下』走");
  } else if (str === "left") {
    console.log("向『左』走");
  } else if (str === "right") {
    console.log("向『右』走");
  } else {
    console.log("未知方向");
  }
}

walk("up");
walk("down");
walk("left");
walk("right");
```

## 1. 数字枚举

数字枚举是一种最常见的枚举类型，其成员的值会 **<span style="color:red">自动递增</span>** ，且数字枚举还具备 **<span style="color:red">反向映射</span>** 的特点，在下面代码的打印中，不难发现：可以通过 **<span style="color:red">值</span>** 来获取对应的枚举 **<span style="color:red">成员名称</span>** 。

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction);
/* 打印Direction:
  {
    "0": "Up",
    "1": "Down",
    "2": "Left",
    "3": "Right",
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
  }
*/

// 正向映射
console.log(Direction.Up); // 输出 0

// 反向映射
console.log(Direction[0]); // 输出 'Up'
```

枚举成员的值是 **<span style="color:red">只读的</span>** ，不能修改。

```ts
Direction.Up = "shang"; // 报错：无法为“Up”赋值，因为它是只读属性
```

也可以指定枚举成员的初始值，**<span style="color:red">其后的</span>** 成员值会自动递增，前面的成员值从 0 开始递增。

```ts
enum Direction {
  Up,
  Down,
  Left = 6,
  Right,
}

console.log(Direction);
/* 打印Direction:
  {
    "0": "Up",
    "1": "Down",
    "6": "Left",
    "7": "Right",
    Up: 0,
    Down: 1,
    Left: 6,
    Right: 7,
  }
*/
```

使用数字枚举完成刚才 `walk` 函数中的逻辑，此时我们发现：代码更加直观易读，而且类型安全，同时也更加易于维护。

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function walk(str: Direction) {
  console.log(str);
  if (str === Direction.Up) {
    console.log("向『上』走");
  } else if (str === Direction.Down) {
    console.log("向『下』走");
  } else if (str === Direction.Left) {
    console.log("向『左』走");
  } else if (str === Direction.Right) {
    console.log("向『右』走");
  } else {
    console.log("未知方向");
  }
}

walk(Direction.Up);
walk(Direction.Down);
walk(Direction.Left);
walk(Direction.Right);
```

## 2. 字符串枚举

枚举成员的值是字符串。

::: warning

字符串枚举 **<span style="color:red">没有</span>** 『自增长行为』， **<span style="color:red">也没有</span>** 『反向映射』，且每个成员都必须用字符串进行 **初始化** 。

:::

```ts
enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

console.log(Direction);
/* 打印Direction:
  {
    Up: "up",
    Down: "down",
    Left: "left",
    Right: "right",
  };
*/
```

## 3. 常量枚举

::: tip

官方描述：常量枚举是一种特殊枚举类型，它使用 `const` 关键字定义，在编译时会被 **<span style="color:red">内联</span>**，**<span style="color:red">避免</span>** 生成一些 **<span style="color:red">额外</span>** 的代码。

:::

::: details 何为 <strong style="color:red">编译时内联</strong> ？

所谓 『内联』 其实就是 `TypeScript` 在编译时，会将枚举 **成员引用** 替换为具体的 **实际值** ，而不是生成额外的枚举对象。这可以减少生成的 `JavaScript` 代码量，并提高运行时性能。

:::

- 使用 **『普通枚举』** 的 `TypeScript` 代码如下：

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let x = Direction.Up;
```

编译后生成的 `JavaScript` 代码量较大：

```js
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
  Direction[(Direction["Left"] = 2)] = "Left";
  Direction[(Direction["Right"] = 3)] = "Right";
})(Direction || (Direction = {}));
let x = Direction.Up;
```

- 使用 **『常量枚举』** 的 `TypeScript` 代码如下：

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let x = Direction.Up;
```

编译后生成的 `JavaScript` 代码量较小：

```js
"use strict";
let x = 0; /* Direction.Up */
```
