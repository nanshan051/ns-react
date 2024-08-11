const nav = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "常用网站",
    items: [
      {
        text: "GitHub",
        link: "https://github.com",
      },
      {
        text: "掘金",
        link: "https://juejin.cn",
      },
    ],
  },
];

const sidebar = [
  {
    title: "React 入门",
    path: "/chapter-1/section-1",
    collapsable: false,
    children: [
      {
        title: "React 的基本认识",
        path: "/chapter-1/section-1",
      },
      {
        title: "React 的基本使用",
        path: "/chapter-1/section-2",
      },
      {
        title: "React JSX",
        path: "/chapter-1/section-3",
      },
      {
        title: "模块与组件和模块化与组件化的理解",
        path: "/chapter-1/section-4",
      },
    ],
  },
];

module.exports = {
  nav,
  sidebar,
};
