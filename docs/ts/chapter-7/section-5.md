---
title: object
comments: true
tags:
  - object
  - 索引签名
---


关于 `object` 与 `Object`，直接说结论，实际开发中用的相对较少，因为范围太大了。

## 1. object（小写）

`object`（小写）的含义是：**所有 『对象类型』。** 可存储：对象、数组、函数等。由于限制的范围比较宽泛，在实际开发中使用的相对较少。

```ts
let a: object; // a的值可以是任何【对象类型】，包括对象、数组、函数等

// 以下代码，是将【对象类型】赋给a，所以符合要求 ✅
a = {};
a = { name: "张三" };
a = [1, 3, 5, 7, 9];
a = function () {};
a = new String("hello");
class Person {}
a = new Person();

// 以下代码，是将【原始类型】赋给a，有警告 ❌
a = 1; // 警告：不能将类型“number”分配给类型“object”
a = true; // 警告：不能将类型“boolean”分配给类型“object”
a = "你好"; // 警告：不能将类型“string”分配给类型“object”
a = null; // 警告：不能将类型“null”分配给类型“object”
a = undefined; // 警告：不能将类型“undefined”分配给类型“object”
a = Symbol().toString(); // 警告：不能将类型“symbol”分配给类型“object”
a = BigInt(9999999999999999); // 警告：不能将类型“bigint”分配给类型“object”
```

## 2. Object（大写）

- 官方描述：**所有可以调用 `Object` 方法的类型。**
- 简单记忆：**除了 `undefined` 和 `null`**，其他所有类型都可以调用 Object 方法。
- 由于限制的范围实在 **<span style="color:red">太大了</span>**！所以实际开发中使用 **<span style="color:red">频率极低</span>**。

```ts
let b: Object; // b能存储的类型是可以调用到Object方法的类型

// 以下代码，是将【对象类型】赋给b，所以符合要求 ✅
b = {};
b = { name: "张三" };
b = [1, 3, 5, 7, 9];
b = function () {};
b = new String("hello");
class Person {}
b = new Person();

// 以下代码，是将【原始类型】赋给b，这些类型都有包装对象
// 由于自动装箱机制，可以调用到Object方法，所以符合要求 ✅
b = 1;
b = true;
b = "你好";
b = Symbol();
b = BigInt(9999999999999999);

// null 和 undefined 没有包装对象，无法调用到Object方法，所以会有警告 ❌
b = null; // 警告：不能将类型“null”分配给类型“Object”
b = undefined; // 警告：不能将类型“undefined”分配给类型“object”
```

## 3. 声明对象类型

1. 实际开发中，限制一般对象，通常使用以下形式：

```ts
// 限制person对象必须有name属性，可选age属性，可以用逗号做分隔
let person1: { name: string, age?: number };

// 含义同上，也能用分号做分隔
let person2: { name: string; age?: number };

// 含义同上，也能用换行做分隔
let person3: {
  name: string
  age?: number
};

// 以下赋值均可以
person1 = { name: "张三", age: 18 };
person2 = { name: "李四" };
person3 = { name: "王五" };

// 如下赋值不合法，因为person3的类型限制中，没有对gender属性的说明
person3 = { name: "王五", gender: "男" };
```

2. **『索引签名』**：允许定义对象可以具有 **<span style="color:red">任意数量的属性</span>**，这些属性的 **<span style="color:red">键</span>** 和 **<span style="color:red">类型</span>** 是 **<span style="color:red">可变的</span>**，常用于：描述类型不确定的属性（具有动态属性的对象）。

```ts
// 限制person对象必须有name属性，可选age属性但是必须是数字
// 同时可以有任意数量、任意类型的键值对
let person1: {
  name: string;
  age?: number;
  [key: string]: any; // 索引签名，完全可以不用key这个单词，换成其他的也可以
};

// 赋值合法
person1 = {
  name: "张三",
  age: 18,
  gender: "男",
};
```

## 4. 声明函数类型

```ts
let count: (a: number, b: number) => number;

count = function (x, y) {
  return x + y;
};
```

::: tip

- `TypeScript` 中的 `=>` 在函数类型声明时表示 **函数类型** ，描述其 **参数类型** 和 **返回值类型** 。
- `JavaScript` 中的 `=>` 是一种定义函数的语法，是具体的函数实现。
- 函数类型声明可以使用：接口、自定义类型等方式，下文中会详细讲解。

:::

## 5. 声明数组类型

```ts
let arr1: string[];
let arr2: Array<number>;

arr1 = ["a", "b"];
arr2 = [1, 2];
```

::: tip

备注：上述代码中，`Array<number>` 属于泛型，下文会详细讲解。

:::
