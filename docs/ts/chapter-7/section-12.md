---
title: 抽象类
comments: true
tags:
  - 抽象类
  - 派生类
  - 抽象方法
---

::: tip

- **概述**：抽象类是一种 <strong style="color:red">无法被实例化</strong>（ 不能 `new` ） 的类，专门用来定义类的 <strong style="color:red">结构和行为</strong>，类中可以写 <strong style="color:red">抽象方法</strong>，也可以写 <strong style="color:red">具体实现</strong>。抽象类主要用来为其派生类提供一个 <strong style="color:red">基础结构</strong>，要求其派生类 <strong style="color:red">必须实现</strong> 其中的抽象方法。
- **简记**：抽象类 <strong style="color:red">不能实例化</strong>，其意义是 <strong style="color:red">可以被继承</strong>，抽象类里可以有 <strong style="color:red">普通方法</strong>，也可以有 <strong style="color:red">抽象方法</strong>。

:::

## 1. 抽象类

通过以下场景，理解抽象类：

> 我们定义一个抽象类 `Package` ，表示所有包裹的基本结构，任何包裹都有重量属性 `weight` ，包裹都需要计算运费。但不同类型的包裹（如：标准速度、特快专递）都有不同的运费计算方式，因此用于计算运费的 `calculate` 方法是一个抽象方法，必须由具体的子类来实现。

::: danger

『抽象类』中的抽象方法不能有具体实现，即：不能有函数体。

:::

- 包裹：

```ts
abstract class Package {
  constructor(public weight: number) {}
  // 抽象方法：用来计算运费，不同类型包裹有不同的计算方式
  abstract calculate(): number;
  // 通用方法：打印包裹详情
  printPackage() {
    console.log(`包裹重量为：${this.weight}kg，运费为：${this.calculate()}元`);
  }
}
```

## 2. 派生类

::: danger

『派生类』中必须对抽象方法进行具体实现。

:::

- 标准速度包裹：

```ts
class StandardPackage extends Package {
  constructor(
    weight: number,
    public unitPrice: number, // 每公斤的费用
  ) {
    super(weight);
  }

  // 实现抽象方法：计算运费
  calculate(): number {
    return this.weight * this.unitPrice;
  }
}

const s1 = new StandardPackage(10, 5);
s1.printPackage(); // 输出：包裹重量为：10kg，运费为：50元
```

- 特快专递包裹：

```ts
class ExpressPackage extends Package {
  constructor(
    weight: number,
    private unitPrice: number, // 10kg以内，每kg的费用(特快包裹更高)
    private additional: number, // 超出10kg以后，每kg的费用
  ) {
    super(weight);
  }

  // 实现抽象方法：计算运费
  calculate(): number {
    if (this.weight <= 10) {
      return this.weight * this.unitPrice;
    } else {
      return 10 * this.unitPrice + (this.weight - 10) * this.additional;
    }
  }
}

const e1 = new ExpressPackage(15, 10, 8);
e1.printPackage(); // 输出：包裹重量为：15kg，运费为：140元
```

## 3. 总结

::: tip 何时使用抽象类？

1. **定义** <strong style="color:red">通用接口</strong>：为一组相关的类定义通用的行为（方法或属性）时。
2. **提供** <strong style="color:red">基础实现</strong>：在抽象类中提供某些方法或为其提供基础实现，这样派生类就可以继承这些实现。
3. **确保** <strong style="color:red">关键实现</strong>：强制派生类实现一些关键行为。
4. <strong style="color:red">共享</strong> **代码和逻辑** ：当多个类需要共享部分代码时，抽象类可以避免代码重复。

:::
