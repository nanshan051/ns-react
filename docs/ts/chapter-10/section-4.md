---
title: 装饰器组合
comments: true
tags:
  - 装饰器组合
---

::: tip

装饰器可以组合使用，执行顺序为：

1. 先 **『由上到下』** 执行所有的 **『装饰器工厂』**，依次获取到装饰器。
2. 然后再 **『由下到上』** 执行所有的 **『装饰器』**。

:::

```ts
// 装饰器
function test1(target: Function) {
  console.log("test1");
}
// 装饰器工厂
function test2() {
  console.log("test2工厂");
  return function (target: Function) {
    console.log("test2");
  };
}
// 装饰器工厂
function test3() {
  console.log("test3工厂");
  return function (target: Function) {
    console.log("test3");
  };
}
// 装饰器
function test4(target: Function) {
  console.log("test4");
}

// 使用多个装饰器
@test1
@test2()
@test3()
@test4
class Person {}

/* 
  控制台打印：
    test2工厂
    test3工厂
    test4
    test3
    test2
    test1
 */
```

将前面讲到的多个装饰器组合使用：

```ts
// 自定义构造类型
type Constructor = new (...args: any[]) => {};

// 定义一个装饰器，用于：重写类的toString方法 + 封闭其原型对象
function CustomString(target: Constructor) {
  // 向被装饰类的原型上添加自定义的toString方法
  target.prototype.toString = function () {
    return JSON.stringify(this);
  };
  // 封闭其原型对象，禁止随意操作其原型对象
  Object.seal(target.prototype);
}

// 定义一个装饰器，用于：给类添加 创建时间 + 日志功能
function LogTime<T extends Constructor>(target: T) {
  return class extends target {
    createdTime: Date;
    constructor(...args: any[]) {
      super(...args);
      this.createdTime = new Date();
    }
    getCreatedTime() {
      return `该对象的创建时间是：${this.createdTime}`;
    }
  };
}

// 定义一个装饰器工厂，它接收一个参数n，返回一个类装饰器
function LogInfo(n: number) {
  // 返回一个装饰器，用于打印介绍信息n次
  return function (target: Constructor) {
    target.prototype.introduce = function () {
      for (let i = 0; i < n; i++) {
        console.log(`我叫${this.name}, 年龄是${this.age}`);
      }
    };
  };
}

@CustomString
@LogTime
@LogInfo(3)
class Person {
  constructor(public name: string, public age: number) {}
  speak() {
    console.log("你好呀！");
  }
}

// 扩展接口（添加上面各个装饰器新增的属性和方法）
interface Person {
  createdTime: Date;
  getCreatedTime(): string;
  introduce(): void;
}

const p1 = new Person("张三", 18);
console.log(p1.toString());
console.log(p1.getCreatedTime());
p1.introduce();
```
