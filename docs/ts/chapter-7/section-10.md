---
title: 复习类相关知识
comments: true
tags:
  - 类
  - 继承
  - constructor 构造器
  - override 重写
---


## 1. 类

```ts
class Person {
  // 属性声明
  name: string;
  age: number;

  // 构造器
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  speak() {
    console.log(`我叫：${this.name}，年龄是：${this.age}`);
  }
}

// 实例
const p1 = new Person("张三", 20);
```

## 2. 继承

```ts
class Student extends Person {
  grade: string;

  // 若Student类不需要额外的属性，则Student的构造器可以省略
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }
  // 加上override关键字，可以避免方法名重写时出现错误
  // 重写从父类继承的方法
  override speak() {
    console.log(`我是学生，我叫：${this.name}，年龄是：${this.age}`);
  }
  // 子类自己的方法
  study() {
    console.log(`${this.name}正在学习中......`);
  }
}

// 实例
const s1 = new Student("李四", 22, "高三");
```
