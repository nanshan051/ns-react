---
title: 属性装饰器
comments: true
tags:
  - 属性装饰器
  - 属性遮蔽
  - 属性监听
---

## 1. 基本语法

```ts
/* 
  参数说明：
    ○ target: 对于『静态属性』来说，它是类；对于『实例属性』来说，它是类的原型对象。
    ○ propertyKey: 属性名。
*/
function Demo(target: object, propertyKey: string) {
  console.log(target, propertyKey);
}

class Person {
  @Demo name: string; // 实例属性
  @Demo age: number; // 实例属性
  @Demo static school: string; // 静态属性
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p1 = new Person("张三", 18);
```

## 2. 关于属性遮蔽

如下代码中：当构造器中的 `this.age = age` 试图在实例上赋值时，实际上是调用了原型上的 `age` 属性的 `set` 方法。

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    // 顺着实例、原型链查找age属性，
    // 原型上存在age属性，触发其setter，将value的值修改为18
    this.age = age;
  }
  speak() {
    console.log("你好呀！");
  }
}

let value = 99;
// 使用defineProperty给Person原型添加age属性，并配置对应的get和set
Object.defineProperty(Person.prototype, "age", {
  get() {
    return value;
  },
  set(val) {
    value = val;
  },
});

const p1 = new Person("张三", 18);
console.log(p1.age); // 18
console.log(Person.prototype.age); // 18
```

打印实例如下图：

<img class="zoomable" :src="$withBase('/images/screenshot/ts/10/5/1.png')" alt="foo">

上图右侧，在原型上添加 `age` 属性后，实例上的 `age` 属性是动态访问的（颜色较浅，本来其值显示的是省略号 `(...)` ，点击省略号时才进行真正的访问），什么时候用，就什么时候通过 `getter` 访问，所以得到的是最新的 `value` ，即 18。

## 3. 应用举例

::: tip

需求：定义一个 `State` 属性装饰器，来监视属性的修改。

:::

```ts
// 声明一个装饰器函数State，用于捕获数据的修改
function State(target: object, propertyKey: string) {
  // 存储属性的内部值
  let key = `__${propertyKey}`;

  // 使用Object.defineProperty替换类的原有属性
  // 重新定义属性，使用自定义的getter和setter
  Object.defineProperty(target, propertyKey, {
    get() {
      return this[key];
    },
    set(newValue) {
      console.log(`${propertyKey} 属性的最新值为 ${newValue}`);
      this[key] = newValue;
    },
    enumerable: true,
    configurable: true,
  });
}

class Person {
  name: string;
  // 使用State装饰器
  @State age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const p1 = new Person("张三", 18);
const p2 = new Person("李四", 28);

p1.age = 30;
p2.age = 40;

console.log(p1.age); // 30
console.log(p2.age); // 40
```
