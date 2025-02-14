---
title: 类型总览
comments: true
tags:
  - 类型总览
  - 原始类型
  - 对象类型
  - 基本数据类型
  - 引用数据类型
  - 包装对象
  - 自动装箱
  - es2020
---

## 1. JavaScript 中的数据类型

1. `string`
2. `number`
3. `boolean`
4. `null`
5. `undefined`
6. `symbol`
7. `bigint`
8. `object`

::: tip 对象类型（引用数据类型）

**`object` 是『对象类型』。**

`object` 包含：`Array`、`Function`、`Date`、`Error` 等......

:::

::: tip 原始类型（基本数据类型）

**除了 `object`， 其他都是『原始类型』。**

- `symbol` 是 `es2015(ES6)` 中引入的原始数据类型，表示独一无二的值。使用 Symbol 作为对象属性名可以避免与现有属性名冲突。可以通过 `String()` 或 `.toString()` 方法将其转换为字符串。通过 `Symbol()` 创建时可以传入一个参数，用于描述该 Symbol 值。

- `bigint` 是 `es2020` 中引入的原始数据类型，用于存储太大而无法用普通 JavaScript 数字表示的大整数值。如需创建 BigInt，可以在整数末尾添加 `n`，或调用 `BigInt()` 函数。（不用脚手架的情况下，需要在 `tsconfig.json` 中设置 `target: "es2020"` 才能在 TypeScript 中使用 BigInt 。）

:::

## 2. TypeScript 中的数据类型

1. 上述所有 `JavaScript` 类型
2. 六个新类型：

   1. `any`
   2. `unknown`
   3. `never`
   4. `void`
   5. `tuple`
   6. `enum`
      <br/><br/>

3. 两个用于自定义类型的方式：

   1. `type`
   2. `interface`

## 3. 注意点

::: danger

在 JavaScript 中的这些内置构造函数：`Number`、`String`、`Boolean`，它们用于创建对应的包装对象，在日常开发时 **<span style="color:red">很少使用</span>**，在 `TypeScript` 中也是同理，所以在 `TypeScript` 中进行类型声明时，通常都是用小写的 `number`、`string`、`boolean`。

:::

例如下面代码：

```ts
let str1: string; // TypeScript官方推荐的写法
str1 = "hello";
/*
 * 下面这行代码会提示警告：不能将类型“String”分配给类型“string”。
 * “string”是基元（基本数据类型），但“String”是包装器对象。如可能首选使用“string”。
 */
str1 = new String("hello");

let str2: String;
str2 = "hello";
str2 = new String("hello");

console.log(typeof str1); // 打印：string
console.log(typeof str2); // 打印：object
```

### 3.1. 原始类型 vs 包装对象

::: tip

- **原始类型**：`number`、`string`、`boolean` ，在 `JavaScript` 中是简单数据类型，它们在内存中占用空间少，处理速度快。
- **包装对象**：`Number`、`String`、`Boolean` 对象，是复杂类型，在内存中占用更多空间，在日常开发时很少由开发人员自己创建包装对象。

:::

### 3.2. 自动装箱

::: tip

**`JavaScript` 在必要时会自动将『原始类型』转换为『包装对象』，以便调用方法或访问属性。**

:::

```js
// 原始类型字符串
let str = "hello";

// 当访问str.length时，JavaScript引擎做了以下工作：

let size = (function () {
  // 1.自动装箱：创建一个临时的String对象包装原始字符串
  let tempStringObject = new String(str);

  // 2.访问String对象的length属性
  let lengthValue = tempStringObject.length;

  // 3.销毁临时对象，返回长度值
  // （JavaScript引擎自动处理对象销毁，开发者无感知）
  return lengthValue;
})();

console.log(size); // 输出：5
```
