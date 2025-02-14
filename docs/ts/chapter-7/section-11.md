---
title: 属性修饰符
comments: true
tags:
  - public
  - protected
  - private
  - readonly
---


| 修饰符     | 含义     | 具体规则                                                               |
| ---------- | -------- | ---------------------------------------------------------------------- |
| `public`   | 公开的   | 可以被：<strong style="color:red">类内部、子类、类外部</strong> 访问。 |
| `protected`  | 受保护的 | 可以被：<strong style="color:red">类内部、子类</strong> 访问。         |
| `private`  | 私有的   | 可以被：<strong style="color:red">类内部</strong> 访问。               |
| `readonly` | 只读属性 | 属性无法修改                                                           |

## 1. public 修饰符

::: tip

`public` 属性可以被：<strong style="color:red">类内部、子类、类外部</strong> 访问。

:::

```ts
class Person {
  // name写了public修饰符，age没有写修饰符，最终都为public
  public name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  speak() {
    //『类内部』可以访问public属性 ✅
    console.log(`我叫：${this.name}，年龄是：${this.age}`);
  }
}

const p1 = new Person("张三", 20);
//『类外部』可以访问public属性 ✅
console.log(p1.name);

class Student extends Person {
  study() {
    //『子类』可以访问public属性 ✅
    console.log(`${this.name}正在学习中......`);
  }
}
```

## 2. 属性的简写形式

- 完整形式：

```ts
class Person {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

- 简写形式：

```ts
class Person {
  // 修饰符写到构造器参数中
  constructor(public name: string, public age: number) {}
}
```

## 3. protected 修饰符

::: tip

`protected` 属性可以被：<strong style="color:red">类内部、子类</strong> 访问。

:::

```ts
class Person {
  constructor(protected name: string, protected age: number) {
    this.name = name;
    this.age = age;
  }

  // 受保护方法，不能在类外部访问，但可以在类内部、子类中访问
  protected getDetails(): string {
    //『类内部』可以访问protected属性 ✅
    return `我叫：${this.name}，年龄是：${this.age}`;
  }

  // 公开方法，类内部、子类、类外部都可以访问
  introduce() {
    console.log(this.getDetails());
  }
}

const p1 = new Person("张三", 20);
//『类外部』不可以访问protected属性 ❌
console.log(p1.name); // 报错：属性“name”受保护，只能在类“Person”及其子类中访问

class Student extends Person {
  study() {
    //『子类』可以访问protected属性 ✅
    console.log(`${this.name}正在学习中......`);
  }
}
```

## 4. private 修饰符

::: tip

`private` 属性只能被：<strong style="color:red">类内部</strong> 访问。

:::

```ts
class Person {
  constructor(
    public name: string,
    public age: number,
    private IDCard: string, // 私有属性，只能在类内部访问
  ) {}

  // 私有方法，只能在类内部访问
  private getPrivateInfo(): string {
    //『类内部』可以访问private属性 ✅
    return `身份证号码为：${this.IDCard}`;
  }

  getInfo() {
    return `我叫：${this.name}，年龄是：${this.age}`;
  }

  getFullInfo() {
    return this.getInfo + "，" + this.getPrivateInfo();
  }
}

const p1 = new Person("张三", 20, "123456789012345678");
//『类外部』不可以访问private属性 ❌
p1.getPrivateInfo(); // 报错：属性“getPrivateInfo”为私有属性，只能在类“Person”中访问

class Student extends Person {
  logIDCard() {
    //『子类』不可以访问private属性 ❌
    console.log(this.IDCard); // 报错：属性“IDCard”为私有属性，只能在类“Person”中访问
  }
}
```

## 5. readonly 修饰符

::: tip

`readonly` 属性无法修改。

:::

```ts
class Car {
  constructor(
    public readonly vin: string, // 车辆识别码，为只读属性
    public readonly year: number, // 出厂年份，为只读属性
    public color: string,
    public sound: string,
  ) {}

  displayInfo() {
    console.log(`
      识别码: ${this.vin},
      出厂年份: ${this.year}, 
      颜色: ${this.color}, 
      音响: ${this.sound}
    `);
  }
}

const car = new Car("H3VE57", 2020, "黑色", "Bose音响");
car.displayInfo();

// 以下代码均错误，不能修改readonly属性 ❌
car.vin = "K9D36F"; // 报错：无法为“vin”赋值，因为它是只读属性
car.year = 2021; // 报错：无法为“year”赋值，因为它是只读属性
```
