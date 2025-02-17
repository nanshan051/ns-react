const notesSidebar = [
  {
    title: "随想录",
    path: "/notes/",
    collapsable: false,
  },
  {
    title: "1. 鉴权",
    path: "/notes/chapter-1/section-1",
    collapsable: false,
    children: [
      {
        title: "1.1. Digest Auth",
        path: "/notes/chapter-1/section-1",
        collapsable: false,
      },
    ],
  },
  {
    title: "2. 模块化",
    path: "/notes/chapter-2/section-1",
    collapsable: false,
    children: [
      {
        title: "2.1. 模块化介绍",
        path: "/notes/chapter-2/section-1",
        collapsable: false,
      },
      {
        title: "2.2. CommonJS 模块化规范",
        path: "/notes/chapter-2/section-2",
        collapsable: false,
      },
      {
        title: "2.3. ES6 模块化规范",
        path: "/notes/chapter-2/section-3",
        collapsable: false,
      },
      {
        title: "2.4. AMD 模块化规范（了解）",
        path: "/notes/chapter-2/section-4",
        collapsable: false,
      },
      {
        title: "2.5. CMD 模块化规范（了解）",
        path: "/notes/chapter-2/section-5",
        collapsable: false,
      },
    ],
  },
  {
    title: "3. 优化",
    path: "/notes/chapter-3/section-1",
    collapsable: false,
    children: [
      {
        title: "3.1. 首页白屏时间优化",
        path: "/notes/chapter-3/section-1",
        collapsable: false,
      },
    ],
  },
  {
    title: "4. HTML",
    path: "/notes/chapter-4/section-1",
    collapsable: false,
    children: [],
  },
  {
    title: "5. CSS",
    path: "/notes/chapter-5/section-1",
    collapsable: false,
    children: [
      {
        title: "5.1. vertical-align 原理及相关问题",
        path: "/notes/chapter-5/section-1",
        collapsable: false,
      },
      {
        title: "5.2. 图片填充文字+颜色渐变文字",
        path: "/notes/chapter-5/section-2",
        collapsable: false,
      },
      {
        title: "5.3. 背景图片透明+文字不透明",
        path: "/notes/chapter-5/section-3",
        collapsable: false,
      },
    ],
  },
];

module.exports = notesSidebar;
