---
title: 简介
comments: true
tags:
  - 装饰器
  - experimentalDecorators
---

1. 装饰器本质是一种特殊的 <strong style="color:red">函数</strong>，它可以对：类、属性、方法、参数进行扩展，同时能让代码更简简洁。
2. 装饰器自 `2015` 年在 `ECMAScript-6` 中被提出到现在，已将近 10 年。
3. 截止目前，装饰器依然是实验性特性，需要开发者手动调整配置，来开启装饰器支持。
4. 装饰器有 5 种：  
   （1）类装饰器  
   （2）属性装饰器  
   （3）方法装饰器  
   （4）访问器装饰器  
   （5）参数装饰器

> 备注：虽然 `TypeScript5.0` 中可以直接使用 **类装饰器** ，但为了确保其他装饰器可用，现阶段使用时，仍建议使用 `experimentalDecorators` 配置来开启装饰器支持，而且不排除在未来的版本中，官方会 <strong style="color:red">进一步调整</strong> 装饰器的相关语法！
>
> 参考：[《TypeScript5.0 发版公告》](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-rc/)
