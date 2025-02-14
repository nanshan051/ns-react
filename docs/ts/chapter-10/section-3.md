---
title: 装饰器工厂
comments: true
tags:
  - 装饰器工厂
---

**装饰器工厂是一个返回装饰器函数的函数，可以为装饰器添加参数** ，可以更灵活地控制装饰器的行为。

::: tip

需求：定义一个 `LogInfo` 类装饰器工厂，实现：`Person` 实例可以调用 `introduce` 方法，且 `introduce` 方法中输出内容的次数，由 `LogInfo` 接收的参数决定。

:::

```ts
// Person 类实现 introduce 方法
interface Person {
  introduce(): void;
}

// 定义一个装饰器工厂 LogInfo，它接收一个参数 n，返回一个类装饰器
function LogInfo(n: number) {
  // 装饰器函数，target 是被装饰的类
  return function (target: Function) {
    target.prototype.introduce = function () {
      for (let i = 0; i < n; i++) {
        console.log(`我的名字：${this.name}，我的年龄：${this.age}`);
      }
    };
  };
}

// 等价于：执行 LogInfo(3)(Person)
@LogInfo(3)
class Person {
  constructor(public name: string, public age: number) {}
  speak() {
    console.log("你好呀！");
  }
}

const p1 = new Person("张三", 18);
console.log(p1);
p1.introduce();
```
