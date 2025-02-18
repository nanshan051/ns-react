---
title: 背景图片透明 + 文字不透明
comments: true
tags:
  - 背景图片透明处理
---

## 1. 常见问题

如果直接为元素设置透明度，则不仅背景图片会变透明，文字也会跟着变透明。

```vue
<template>
  <div class="demo">
    <span>背景图片透明</span>
    <span>文字也透明</span>
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
    font-size: 10px;
    font-weight: bold;
    color: #000; // 文字颜色
    background: url("./001.png") no-repeat center / 100% 100%; // 背景图片
    opacity: 0.5; // 透明度
  }
</style>
```

<img class="zoomable" :src="$withBase('/images/screenshot/notes/5/3/1.png')" alt="foo">

## 2. 背景图片透明 + 文字不透明

要想只让背景图片透明，而文字不透明，可以使用 <strong style="color:red">『伪元素』</strong> ，在伪元素中设置背景图片和透明度。

```vue
<template>
  <div class="demo">
    <span>背景图片透明</span>
    <span>文字不透明</span>
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
    font-size: 100px;
    font-weight: bold;
    color: #000;
    position: relative; // 相对定位
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute; // 绝对定位
      top: 0;
      left: 0;
      background: url("./001.png") no-repeat center / 100% 100%; // 背景图片
      opacity: 0.5; // 透明度
      z-index: -1; // 层级设为-1（背景在文字下方）
    }
  }
</style>
```

<img class="zoomable" :src="$withBase('/images/screenshot/notes/5/3/2.png')" alt="foo">
