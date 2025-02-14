---
title: 类装饰器
comments: true
tags:
  - 类装饰器
  - seal 封闭
---

## 1.基本语法

::: tip

类装饰器是一个应用在 <strong style="color:red">类声明</strong> 上的 <strong style="color:red">函数</strong> ，可以为类添加额外的功能，或添加额外的逻辑。

:::

```ts
/*
 * Demo 函数会在 Person 类定义时被执行
 * 参数说明：target 参数是被装饰的类，即：Person
 */
function Demo(target: Function) {
  console.log(target);
}

// 使用装饰器
@Demo
class Person {
  constructor(public name: string, public age: number) {}
}
```

## 2. 应用举例

::: tip

需求：定义一个装饰器，实现：`Person` 实例调用 `toString` 时返回 `JSON.stringify` 的执行结果。

:::

```ts
/* 使用装饰器重写toString方法 + 并封闭其原型对象 */
function CustomString(target: Function) {
  // 向被装饰类的原型上添加自定义的toString方法
  target.prototype.toString = function () {
    return JSON.stringify(this);
  };
  // 封闭其原型对象，禁止随意操作其原型对象
  Object.seal(target.prototype);
}

// 使用装饰器
// @CustomString
class Person {
  constructor(public name: string, public age: number) {}
}

const p1 = new Person("张三", 18);
console.log(p1.toString()); // 输出： {"name":"张三","age":18}

interface Person {
  x: number;
}

// Person.prototype.x = 90; // 报错：Cannot add property x, object is not extensible
// console.log(p1.x);
```

## 3. 关于返回值

::: tip

- **类装饰器 <strong style="color:green">有</strong> 返回值**：若类装饰器返回一个新的类，那这个新类将 <strong style="color:green">替换</strong> 掉被装饰的类。
- **类装饰器 <strong style="color:red">无</strong> 返回值**：若类装饰器没有返回值或返回 `undefined` ，那被装饰的类将 <strong style="color:red">不会</strong> 被替换。

:::

```ts
function Demo(target: Function) {
  // 装饰器有返回值时，该返回值会替换掉被装饰的的类
  return class {
    test() {
      console.log(200);
      console.log(300);
      console.log(400);
    }
  };
}

@Demo
class Person {
  test() {
    console.log(100);
  }
}

console.log(Person);
```

## 4. 关于构造类型

::: tip

在 `TypeScript` 中，`Function` 类型所表示的范围时分广泛，包括：普通函数、箭头函数、方法等等。但并非所有 `Function` 类型的函数都可以被 `new` 关键字实例化，例如箭头函数是不能被实例化的，那么 `TypeScript` 中该如何声明一个构造函数呢？有以下两种方式：

:::

1. 仅声明构造类型

```ts
/*
  ○ new     表示：该类型是可以用new操作符调用。
  ○ ...args 表示：构造器可以接受【任意数量】的参数。
  ○ any[]   表示：构造器可以接受【任意类型】的参数。
  ○ {}      表示：返回类型是对象(非null、非undefined的对象)。
*/

// 定义Constructor类型，其含义是构造类型
type Constructor = new (...args: any[]) => {};

function test(fn: Constructor) {}
class Person {}
test(Person);
```

2. 声明构造类型 + 指定静态属性

```ts
// 定义一个构造类型，且包含一个静态属性wife（静态属性是类本身的属性，不是实例上的属性）
type Constructor = {
  new (...args: any[]): {}; // 构造签名
  wife: string; // wife属性
};

function test(fn: Constructor) {}
class Person {
  static wife = "wife";
}
test(Person);
```

## 5. 替换被装饰的类 🍃

对于高级一些的装饰器，不仅仅是覆盖一个原型上的方法，还要有更多功能，例如添加新的方法和状态。

::: tip

需求：设计一个 `LogTime` 装饰器，可以给实例添加一个属性，用于记录实例对象的创建时间，再添加一个方法用于读取创建时间。

:::

```ts
// 自定义构造类型
type Constructor = new (...args: any[]) => {};

// 创建一个装饰器，为类添加日志功能和创建时间
function LogTime<T extends Constructor>(target: T) {
  return class extends target {
    createdTime: Date;
    constructor(...args: any[]) {
      super(...args);
      this.createdTime = new Date(); // 记录对象创建时间
    }
    getCreatedTime() {
      return `该对象的创建时间是：${this.createdTime}`;
    }
  };
}

// Person接口，会自动与Person类合并
interface Person {
  getCreatedTime(): void;
}

// 使用装饰器
@LogTime
class Person {
  constructor(public name: string, public age: number) {}
  speak() {
    console.log("你好呀！");
  }
}

const p1 = new Person("张三", 18);
console.log(p1.getCreatedTime());
```
