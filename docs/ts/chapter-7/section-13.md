---
title: interface（接口）
comments: true
tags:
  - interface
  - 接口
  - implements
  - extends
---

::: tip

`interface` 是一种 <strong style="color:red">定义结构</strong> 的方式，主要作用是为：类、对象、函数等规定 <strong style="color:red">一种契约</strong> ，这样可以确保代码的一致性和类型安全，但要注意 `interface` <strong style="color:red">只能定义格式，不能包含任何实现。</strong>

:::

## 1. 定义类

通过 `interface` 接口来实现类时，需要用到 `implements` （实现） 关键字。

```ts
// IPerson接口，用于限制Person类的格式
interface IPerson {
  name: string;
  age: number;
  speak(n: number): void;
}

// 定义一个Person类，实现IPerson接口
class Person implements IPerson {
  constructor(public name: string, public age: number) {}
  // 实现Iperson接口中的speak方法
  speak(n: number): void {
    for (let i = 0; i < n; i++) {
      console.log(`你好，我叫${this.name}, 我的年龄是${this.age}`);
    }
  }
}

// 创建一个Person类的实例
const p1 = new Person("张三", 18);
p1.speak(3);
```

## 2. 定义对象

```ts
interface IUser {
  name: string;
  readonly gender: string; // 只读属性
  age?: number; // 可选属性
  run: (n: number) => void;
}

const user: IUser = {
  name: "张三",
  gender: "男",
  age: 18,
  run(n) {
    console.log(`奔跑了${n}米`);
  },
};
```

## 3. 定义函数

```ts
interface ICount {
  (a: number, b: number): number;
}

const count: ICount = (x, y) => {
  return x + y;
};
```

## 4. 接口之间的继承

一个 `interface` 可以通过 `extends` 关键字来继承另一个 `interface` 。

```ts
interface IPerson {
  name: string;
  age: number;
}

interface IStudent extends IPerson {
  grade: string;
}

const student: IStudent = {
  name: "张三",
  age: 18,
  grade: "高三",
};
```

## 5. 接口自动合并(重复)

重复定义接口时，接口会自动合并。

```ts
interface IPerson {
  name: string;
  age: number;
}

// 重复定义接口时，接口会自动合并
interface IPerson {
  speak(): void;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}
  speak(): void {
    console.log(`你好，我是${this.name}`);
  }
}
```

## 6. 总结

::: tip 何时使用接口？

1. **定义对象的格式**：描述数据模型、API 响应格式、配置对象......等等，是开发中用的最多的场景。
2. **类的契约**：规定一个类需要实现哪些属性和方法。
3. **扩展已有接口**：一般用于扩展第三方库的类型，这种特性在大型项目中可能会用到。

:::
