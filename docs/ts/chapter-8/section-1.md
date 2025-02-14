---
title: 泛型
comments: true
tags:
  - 泛型
  - T
  - 约束
---

::: tip

泛型允许我们在定义函数、类或接口时，使用类型参数来表示 <strong style="color:red">未指定的类型</strong> ，这些参数在具体 <strong style="color:red">使用时</strong> ，才被指定 <strong style="color:red">具体的类型</strong> ，泛型能让同一段代码适用于多种类型，同时仍然保持类型的安全性。

:::

## 1. 泛型函数

如下代码中的 `<T>` 就是泛型，（不一定非叫 `T` ），设置泛型后即可在函数中使用 `T` 来表示该类型。

```ts
function logData<T>(data: T): T {
  console.log(data);
  return data;
}

logData<number>(100);
logData<string>("hello");
```

## 2. 泛型可以有多个

```ts
function logData<T, U>(data1: T, data2: U): T | U {
  console.log(data1, data2);
  return Date.now() % 2 ? data1 : data2;
}

logData<number, string>(100, "hello");
logData<string, boolean>("ok", false);
```

## 3. 泛型接口

```ts
interface PersonInterface<T> {
  name: string;
  age: number;
  extraInfo: T;
}

let p1: PersonInterface<string>;
let p2: PersonInterface<number>;

p1 = {
  name: "张三",
  age: 18,
  extraInfo: "hello",
};
p2 = {
  name: "李四",
  age: 19,
  extraInfo: 100,
};
```

## 4. 泛型约束

```ts
interface LengthInterface {
  length: number;
}

// 约束规则：传入的类型T必须具有LengthInterface中的所有属性
function logPerson<T extends LengthInterface>(data: T): void {
  console.log(data.length);
}

logPerson<string>("hello");
logPerson<Array<number>>([1, 2, 3]);
// logPerson<number>(123); // 报错：因为number类型没有length属性
```

## 5. 泛型类

```ts
class Person<T> {
  constructor(public name: string, public age: number, public extraInfo: T) {}
  speak() {
    console.log(`我叫${this.name}，年龄是${this.age}`);
    console.log(this.extraInfo);
  }
}

// 泛型T可以是基本类型
const p1 = new Person<number>("张三", 18, 100);
p1.speak();

type JobInfo = {
  job: string;
  company: string;
};

// 泛型T也可以是自定义类型
const p2 = new Person<JobInfo>("李四", 19, {
  job: "研发",
  company: "xxx公司",
});
```
