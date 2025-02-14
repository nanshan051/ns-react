---
title: 一些相似概念的区别
comments: true
tags:
  - interface
  - type
---

## 1. interface 与 type 的区别

::: tip 相同点：

`interface` 和 `type` 都可以用于定义 <strong style="color:red">对象结构</strong> ，在定义对象结构时两者可以互换。

:::

```ts
// 通过接口interface定义对象结构
interface PersonInterface {
  name: string;
  age: number;
  speak(): void;
}

// 通过类型type定义对象结构
type PersonType = {
  name: string;
  age: number;
  speak(): void;
};

let p1: PersonInterface = {
  name: "张三",
  age: 18,
  speak() {
    console.log("Hello");
  },
};

let p2: PersonType = {
  name: "李四",
  age: 19,
  speak() {
    console.log("Hi");
  },
};
```

::: warning 不同点：

- `interface` ：更专注于定义 <strong style="color:red">对象</strong> 和 <strong style="color:red">类</strong> 的结构，支持 <strong style="color:red">继承</strong> 、<strong style="color:red">合并</strong> 。
- `type` ：可以定义 <strong style="color:red">类型别名</strong> 、<strong style="color:red">联合类型</strong> 、<strong style="color:red">交叉类型</strong> ，但不支持继承和自动合并。

:::

`interface` （接口）支持继承、合并。

```ts
// 通过interface定义Person接口
interface PersonInterface {
  name: string;
  age: number;
}

// 重复定义Person接口，接口会自动合并
interface PersonInterface {
  speak(): void;
}

// Student接口继承Person接口的所有属性和方法
interface StudentInterface extends PersonInterface {
  grade: string;
}

const student: StudentInterface = {
  name: "张三",
  age: 18,
  grade: "高三",
  speak() {
    console.log(this.name, this.age, this.grade);
  },
};
```

`type` 支持类型别名、联合类型、交叉类型。

```ts
// 通过type定义Person类型，并通过『交叉类型』实现属性的合并
type PersonType = {
  name: string;
  age: number;
} & {
  speak: () => void;
};

// 通过type定义Student类型，并通过『交叉类型』来继承Person类型
type StudentType = PersonType & {
  grade: string;
};

const student: StudentType = {
  name: "张三",
  age: 18,
  grade: "高三",
  speak() {
    console.log(this.name, this.age, this.grade);
  },
};
```

## 2. interface 与抽象类的区别

::: tip

**相同点**：都能定义一个类的格式（定义类应遵循的契约）。

**不同点**：

- `interface` ：<strong style="color:red">只能</strong> 描述 <strong style="color:red">结构</strong> ，<strong style="color:red">不能</strong> 有任何 <strong style="color:red">具体实现</strong> ，一个类可以实现多个接口。
- 抽象类：既可以包含 <strong style="color:red">抽象方法</strong> ，也可以包含 <strong style="color:red">具体方法</strong> ，一个类只能继承一个抽象类。

  :::

```ts
// FlyInterface接口
interface FlyInterface {
  fly: () => void;
}

// SwimInterface接口
interface SwimInterface {
  swim: () => void;
}

// Duck 类实现了 FlyInterface 和 SwimInterface 两个接口
class Duck implements FlyInterface, SwimInterface {
  fly() {
    console.log("鸭子可以飞");
  }
  swim() {
    console.log("鸭子可以游泳");
  }
}

// 创建一个 Duck 实例
const duck = new Duck();
duck.fly();
duck.swim();
```
