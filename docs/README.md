---
# 首页可以自行选择哪种方式进行展示，比如：

# 首页1：只保留顶部导航栏
sidebar: false # 设置隐藏侧边栏无效，vuepress没有为当前页面添加no-sidebar类名，所以样式没有生效
pageClass: no-sidebar # 手动添加no-sidebar类名
title: Hello, NS!
author: NS
date: 2021-05-20

# 首页2：自定义布局
# 下面这行代码会访问 /.vuepress/components/Layout/Default.vue
# 并将当前文件内容插入到自定义布局的插槽<Content/>中
# 若想使用首页1，则将下面这行代码注释掉即可

layout: Layout-Default
---

<!-- 使用具名插槽 default -->

::: slot default

我们像只野马一样

在这城市里流淌

浪费了太阳

也从不会感到悲伤

:::
