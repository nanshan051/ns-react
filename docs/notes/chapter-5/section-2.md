---
title: 图片填充文字+颜色渐变文字
comments: true
tags:
  - 图片填充文字
  - 颜色渐变文字
  - background-clip
  - linear-gradient
---

## 1. 需求

::: tip

1. 用 **『图片填充文字』** ，使得文字部分显示为图片内容。

:::

<img class="zoomable" :src="$withBase('/images/screenshot/notes/5/2/1.png')" alt="foo">

::: tip

2. **『颜色渐变』** 地展示文字。

:::

<img class="zoomable" :src="$withBase('/images/screenshot/notes/5/2/2.png')" alt="foo">

## 2. 实现

::: tip

主要用到以下 `CSS` 属性：

- `color: transparent;` ： 文字颜色设为透明
- `background: 图片或颜色;` ：设置背景图片或背景颜色
- `background-clip: text;` ：裁剪背景到文字

:::

其中， `background-clip` 属性用于裁减背景，主要有以下值：

| 值            | 描述                                                     |
| ------------- | -------------------------------------------------------- |
| `border-box`  | 背景延伸至 **边框** 外沿（但是在边框下层）。             |
| `padding-box` | 背景延伸至 **内边距**（padding）外沿。不会绘制到边框处。 |
| `content-box` | 背景被裁剪至 **内容区**（content box）外沿。             |
| `text`        | 背景被裁剪成 **文字** 的前景色。                         |

参考：[MDN: background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)

代码如下：

```vue
<template>
  <div class="demo">
    <p>hello, world!</p>
    <!-- <p>图片填充文字</p> -->
    <p>颜色渐变文字</p>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .demo {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 200px;
    font-weight: bold;
    color: transparent; // 文字颜色设为透明
    // background: url('./001.png') no-repeat center / 100% 100%; // 背景图片
    background: linear-gradient(
      to bottom right,
      rgb(250, 70, 57),
      rgb(36, 105, 233)
    ); // 背景颜色（渐变）
    background-clip: text; // 裁剪背景到文字
    -webkit-background-clip: text; // 兼容webkit内核浏览器
  }
</style>
```

附：背景图片

<img class="zoomable" :src="$withBase('/images/screenshot/notes/5/2/3.png')" alt="foo">
