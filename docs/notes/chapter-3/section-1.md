---
title: 首页白屏时间优化
comments: true
tags:
  - 白屏
  - webpack
  - loader
  - file-loader
  - url-loader
  - base64
---

## 1. 背景

::: warning

将门户自定义部件成果物上传到 “运行管理中心” 平台后，在系统管理中创建 8T 主题并发布。  
进入主题，**页面白屏时间接近 `6 秒` ，在此期间用户需要等待页面加载，这极大地影响用户使用体验**。

:::

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/1.png')" alt="foo">

## 2. 问题定位

### 2.1 概念

::: tip

**『白屏时间』** 是指从用户输入 URL 地址或点击链接，到浏览器开始显示内容的时间。白屏时间的长短将直接影响用户对产品的第一印象。

:::

### 2.2 性能分析

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/2.png')" alt="foo">

- 从上图中的 overview 总览图可以看出，首页的白屏时间为 `5.6 秒`，其中，`/gait-widget/index.js` **这个 js 资源就占用了近 `4 秒`**。

- 从底部摘要可以看出，请求该 js 资源耗时 `2.55 秒`，加载该资源耗时 `1.40 秒`，解码前的体积为 `32.8 M`，解码后的体积为 `43.8 M`。

👉 该 js 资源为打包后的部件成果物，<strong style="color:green">初步推测应该是由于体积过大，导致请求和加载耗时较长</strong> 。

### 2.3 项目结构

项目是采用部件脚手架 `@wdg/widget-cli` 进行搭建的，下面是项目的 src 文件夹下的目录：

```sh
# src 目录
├─scaffold
│  ├─assets
│  │  └─img
│  ├─components
│  │  └─configTemplates
│  ├─sourcePkgTemplate
│  │  ├─META-INF
│  │  └─resource
│  │     └─widgets
│  └─utils
├─widget-components
│  └─gait-widget-children
│     └─ # 多个子组件
├─widget-tools
│  ├─api
│  │  └─section
│  │     └─gaitWidget.js # 请求接口
│  ├─css
│  │  └─font
│  ├─img
│  ├─mixin
│  └─utils
└─widgets
   └─gait-widget
      ├─index.vue
      ├─package.json
      └─public
         ├─img
            └─ # 多张图片
         └─css
            └─font
               └─ # 两种字体
```

### 2.4 图片字体

项目中用到的 **图片** 如下：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/3.png')" alt="foo">

项目中用到的 **字体** 如下：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/4.png')" alt="foo">

由于在开发过程中，没有单独编写 `css|scss|less` 等样式文件，主要是引入了一些图片和两种字体，所以，下面主要分析项目中对图片和字体的打包处理。

### 2.5 loader 原理

我们知道，对图片和字体，webpack 无法直接处理，需要相应的 loader 进行预处理后，webpack 才能进行下一步处理。图片和字体都可以采用 `file-loader` 或 `url-loader` 来进行预处理。

::: tip file-loader 与 url-loader 在打包时的区别：

1. `file-loader`： 最终会输出对应的图片。

2. `url-loader`： 内置了 `file-loader` ，分为两种情况：

（1）图片体积 **<** 阈值时，**将图片转为 `base64` ，直接写入到 html 中。**

（2）图片体积 **>** 阈值时，**将图片交由 `file-loader` 处理，输出对应的图片。**

**注意：** <strong style="color:red"> `url-loader` 没有设置阈值时，默认将图片转为 `base64` 。</strong>

:::

### 2.6 base64 特点

这里补充一下，`base64` 的优缺点：

::: tip

<strong style="color:green">优点</strong> ：`base64` 不会生成单独的图片文件，最终会直接嵌入到 `html` 中，获取时走的是『内存缓存』，因此 <strong style="color:green">可以减少请求，减轻服务器压力</strong> 。

<strong style="color:red">缺点</strong> ：`base64` 相较源文件 <strong style="color:red">体积更大</strong> ，且源文件越大，体积增加的越多，这会导致 <strong style="color:red">请求时间更长</strong> 。

:::

### 2.7 当前 webpack 配置

回过头来再看一下项目中的 webpack 配置：

```js
/* webpack.common.js */
module.exports = {
  module: {
    rules: [
      {
        // 图片
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        loader: "url-loader",
      },
      {
        // 字体
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
      },
    ],
  },
};
```

从配置文件中可以看出，项目对图片和字体都采用 `url-loader` 来进行预处理，且都没有设置阈值( `limit` )，因此 **图片和字体全都被转为 `base64` 写入到成果物（ `index.js` ）中，没有生成对应的图片和字体文件。**

```sh
# 生成的资源包目录
─META-INF
└─resource
    └─widgets
        └─gait-widget
           ├─index.js(# base64在内)
           └─package.json
```

图片全都转为 `base64`，包括体积非常大的几个 webp 图片，走的是内存缓存：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/5.png')" alt="foo">

字体也全都转为 `base64`，走的是内存缓存：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/6.png')" alt="foo">

可以看出：

::: danger

1. <strong style="color:red">请求时间长</strong> ：有一些体积非常大的图片和字体不适合转为 `base64` ，因为会使得 `index.js` 的体积极大地增加，请求时间很长，导致渲染阻塞。

2. <strong style="color:red">请求数量多</strong> ：而如果将所有的图片和字体全部输出对应文件，则大量的小文件（几 kb）又都会发起请求，请求数量增多，会造成一定的性能影响。

:::

## 3. 优化

### 3.1 方案

综合考虑 `base64` 的优缺点，对 `webpack` 配置进行优化：

::: tip

1. 对于体积 <strong style="color:green">较大</strong> 的图片（字体），<strong style="color:green">输出对应文件</strong> ，减少最终 `bundle` 的体积，防止渲染阻塞。

2. 对于体积 <strong style="color:green">较小</strong> 的图片（字体），<strong style="color:green">转化为 `base64`</strong> ，直接从内存缓存获取，减少请求数量。

:::

```js
/* webpack.common.js */
const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 设置阈值
              limit: 12 * 1024,
              // 输出文件命名
              name: "[name].[ext]",
              // 关闭 es6 模块化
              esModule: false,
              // 指定输出路径
              outputPath: (url, resourcePath, context) => {
                let pathArr = resourcePath.split(/\/|\\/);
                let widgetIndex = pathArr.findIndex((p) => p === "widgets");
                if (widgetIndex > 0) {
                  return `${pathArr[widgetIndex + 1]}/public/img/${url}`;
                }
              },
            },
          },
        ],
        include: path.resolve(__dirname, "../", "src/widgets"),
      },
      {
        test: /\.(woff2?|eot|ttf|TTF|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 12 * 1024,
              name: "[name].[ext]",
              outputPath: (url, resourcePath, context) => {
                let pathArr = resourcePath.split(/\/|\\/);
                let widgetIndex = pathArr.findIndex((p) => p === "widgets");
                if (widgetIndex > 0) {
                  return `${pathArr[widgetIndex + 1]}/public/css/font/${url}`;
                }
              },
            },
          },
        ],
        include: path.resolve(__dirname, "../", "src/widgets"),
      },
    ],
  },
};
```

上述代码中，对处理图片和字体的 `url-loader` 进行了具体的配置：

::: tip

- **设置阈值**：由于图片大部分都小于 `12kb`，且 12kb 以下的图片在转为 `base64` 后体积也不会很大，对 `index.js` 的体积没有太大影响，因此考虑将阈值( `limit` )设为 12kb。

- **文件命名**：对输出的文件进行命名，名称和扩展名与源文件保持一致。

- **关闭 ES6 模块化**：关闭 `ES6` 的模块化，采用 `Commonjs` 解析，防止解析出错。

- **指定输出路径**：将图片和字体按类别输出到对应的文件夹（ `/img` 和 `/css/font` ）下。

:::

### 3.2 效果

重新打包部署后，性能分析如下：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/7.png')" alt="foo">

从上图中可以看出，优化后：

::: tip

- 『白屏时间』减少至 `1.4 s` 。
- `index.js` 的体积减小至 `509 kb`，占用时长减少至 `222.29 ms`。
  :::

图片字体获取方式如下：

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/8.png')" alt="foo">

<img class="zoomable" :src="$withBase('/images/screenshot/notes/3/1/9.png')" alt="foo">

从上图可以看出，优化后，项目中：

- 12kb 以下的图片和字体 **（绿框内的）** 转为 `base64` ，直接从『内存缓存』中获取。
- 12kb 以上的图片和字体 **（红框内的）** 则需要通过『请求』获取。

## 4. 对比

比较优化前后的一些性能指标：

| 比较项 | index.js 体积 | index.js 请求时间 | index.js 加载时间 | 白屏时间    |
| ------ | ------------- | ----------------- | ----------------- | ----------- |
| 优化前 | **`32.8 MB`** | 2.5 s             | 1.40 s            | **`5.6 s`** |
| 优化后 | **`509 KB`**  | 88 ms             | 134 ms            | **`1.4 s`** |

对比可以发现，<strong style="color:green">优化前后，首页加载性能大幅提升，就白屏时间而言，性能提升了 `300%` ！</strong>

优化后的白屏时间完全在可接受范围内，<strong style="color:green">用户使用体验明显改善</strong> 。

## 5. 总结

从大方向来说，优化分为『开发环境优化』和『生产环境优化』，前者是为了方便开发人员更好地开发和调试，后者是为了提升产品质量和用户体验，对于开发人员来说，应该将优化重心放在后者。

::: tip

性能优化涉及方方面面，在采用 `webpack` 作为前端构建工具时，需要尽可能了解常见 `loader` 和 `plugin` 的原理和用法，针对性地对性能问题做出优化，包括但不限于以下方面：

- **`js` 的语法检查、兼容性处理、压缩**
- **`css` 的转化、兼容性处理、提取、压缩**
- **`html` 的压缩**
- **图片的模块化解析、base64 转化**

:::

本案例中，『首页白屏时间过长』的主要原因是因为图片和字体全都被转为 `base64` 写入到输出的 `index.js` 中，导致 `index.js` 体积非常大，请求和加载时间过长，页面渲染阻塞，因此针对性地对图片和字体的打包进行优化处理，最终大大缩减了首页白屏时间，达到了提升用户体验的目标。
