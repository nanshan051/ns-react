---
title: 访问器装饰器
comments: true
tags:
  - 访问器装饰器
  - get
  - set
  - getter
  - setter
---

## 1. 基本语法

```ts
/* 
  参数说明：
    ○ target: 
        1. 对于实例访问器来说值是【所属类的原型对象】。
        2. 对于静态访问器来说值是【所属类】。
    ○ propertyKey:访问器的名称。
    ○ descriptor: 描述对象，存放get、set。
*/
function Demo(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

class Person {
  @Demo
  get address() {
    return "北京路";
  }
  @Demo
  static get country() {
    return "中国";
  }
}
```

## 2. 应用举例

::: tip

需求：

对 `weather` 类的 `temp` 属性的 `set` 访问器进行限制，设置的最低温度 `-50` ，最高温度 `50` 。

:::

```ts
function RangeValidate(min: number, max: number) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    // 保存原始的setter方法（注意，访问器存放在descriptor.set中）
    const originnalSetter = descriptor.set;
    // 重写setter方法，加入范围验证逻辑
    descriptor.set = function (value: number) {
      // 如果传入的值不在范围内，抛出错误
      if (value < min || value > max) {
        throw new Error(`${propertyKey}的值应该在${min}到${max}之间`);
      }
      // 如果值在范围内，且原始setter方法存在，则调用原始setter方法
      if (originnalSetter) {
        originnalSetter.call(this, value);
      }
    };
  };
}

class Weather {
  private _temp: number;
  constructor(temp: number) {
    this._temp = temp;
  }

  // 类外部无法访问私有属性_temp，但是可以通过公开的temp属性的get、set访问器来访问_temp
  get temp() {
    return this._temp;
  }
  // 通过装饰器设置温度范围在-50到50之间
  @RangeValidate(-50, 50)
  set temp(value) {
    this._temp = value;
  }
}

const w1 = new Weather(25);
console.log(w1);
w1.temp = 99;
console.log(w1);
```

::: warning
注意：在装饰器参数 `descriptor` 中，方法和访问器存放的位置不同：

- **方法**：存放在 `descriptor.value` 中。
- **访问器**：存在在 `descriptor.get` 和 `descriptor.set` 中。
  :::
