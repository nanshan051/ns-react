---
title: 编译 TypeScript
comments: true
tags:
  - TypeScript
  - tsc
  - 编译
  - 版本
---

::: warning

浏览器不能直接运行 `TypeScript` 代码，需要编译为 `JavaScript` 再交由浏览器解析器执行。

:::

## 1. 命令行编译

要把 `.ts` 文件编译成 `.js` 文件，需要配置 `TypeScript` 的编译环境，步骤如下：

- **第一步**：创建一个 `index.ts` 文件，例如：

```js
const person = {
  name: "张三",
  age: 18,
};

console.log(`我叫${person.name}，我今年${person.age}岁`);
```

- **第二步**：全局安装 `TypeScript` ：

```sh
# 全局安装
npm i typescript -g
```

- **第三步**：使用命令编译 `index.ts` 文件：

```js
tsc index.ts
```

::: tip

`tsc` 是 `TypeScript Compiler` （TypeScript 编译器） 的缩写。编写本文时 TypeScript 为 5.7.3 版本。

```sh
# 查看 TypeScript 版本
tsc -V
# 或
tsc --version
```

:::

编译后生成的 `index.js` 文件：

```js
var person = {
  name: "张三",
  age: 18,
};
console.log(
  "\u6211\u53EB"
    .concat(person.name, "\uFF0C\u6211\u4ECA\u5E74")
    .concat(person.age, "\u5C81"),
);
```

这里，对中文字符进行了转义，是为了让中文能在任何平台下都能正确输出。

## 2. 自动化编译

- **第一步**：创建 `TypeScript` 编译控制文件：

```sh
tsc --init
```

::: tip

1. 工程中会生成一个 `tsconfig.json` 配置文件，其中包含着很多编译时的配置项。
2. 观察发现，默认编译的 JS 版本是 `es2016` (即 `ES7` )，可以手动调整为其他版本。

:::

- **第二步**：监视目录中的 `.ts` 文件变化：

```sh
tsc --watch  # watch后面可以指定文件或目录，不指定则监视整个项目
```

- **第三步**：小优化，当编译出错时不生成 `.js` 文件：

```sh
tsc --noEmitOnError --watch
```

::: tip

当然也可以修改 `tsconfig.json` 文件中的 `noEmitOnError` 配置项。（**<span style="color:green">推荐</span>**）
:::

> 无论是 vue 还是 react，只要是通过脚手架搭建的项目，都无需进行上述的 『命令行编译』和『自动化编译』，脚手架会帮助我们进行编译。
