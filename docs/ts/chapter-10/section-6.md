---
title: 方法装饰器
comments: true
tags:
  - 方法装饰器
  - call
  - apply
  - descriptor
---

## 1. 基本语法

```ts
/* 
  参数说明：
    ○ target: 对于『静态方法』来说值是类，对于『实例方法』来说值是原型对象。
    ○ propertyKey: 方法的名称。
    ○ descriptor: 方法的描述对象，其中value属性是被装饰的方法。
*/
function Demo(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log(target, propertyKey, descriptor);
}

class Person {
  constructor(public name: string, public age: number) {}
  // Demo装饰实例方法
  @Demo
  speak() {
    console.log(`你好，我的名字：${this.name}，我的年龄：${this.age}`);
  }
  // Demo装饰静态方法
  @Demo
  static isAdult(age: number) {
    return age >= 18;
  }
}

const p1 = new Person("张三", 20);
p1.speak();
```

## 2. 应用举例

::: tip

需求：

1. 定义一个 `Logger` 方法装饰器，用于在方法执行前和执行后，均追加一些额外逻辑。
2. 定义一个 `Validate` 方法装饰器，用于验证数据。

:::

```ts
// 装饰器
function Logger(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  // 保存原始方法
  const originnal = descriptor.value;
  // 替换原始方法
  descriptor.value = function (...args: any[]) {
    console.log(`${propertyKey}开始执行......`);
    // 注意：这里需要手动绑定this
    // 如果直接调用originnal()，会丢失this的指向
    const result = originnal.call(this, ...args); // call 传递函数参数时需要一个一个传入
    console.log(`${propertyKey}执行完毕......`);
    return result;
  };
}

// 装饰器工厂
function Validate(maxValue: number) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    // 保存原始方法
    const originnal = descriptor.value;
    // 替换原始方法
    descriptor.value = function (...args: any) {
      // 添加校验逻辑，若年龄大于阈值，则抛出错误
      if (args[0] > maxValue) {
        throw new Error("年龄非法");
      }
      return originnal.apply(this, args); // apply 传递函数参数时通过数组一次性传入
    };
  };
}

class Person {
  constructor(public name: string, public age: number) {}
  @Logger
  speak(str: string) {
    console.log(`你好，我的名字：${this.name}，我的年龄：${this.age}，${str}`);
  }
  @Validate(100)
  static isAdult(age: number) {
    return age >= 18;
  }
}

const p1 = new Person("张三", 20);
p1.speak("hello");
console.log(Person.isAdult(101));
```

::: warning 注意：

通过方法装饰器 **『重写』** 原始方法时，需要 <strong style="color:red">手动绑定 `this`</strong>  ，否则会导致 `this` 指向错误。

:::
