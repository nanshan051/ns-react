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
    title: "1. React 入门",
    path: "/chapter-1/section-1",
    collapsable: false,
    children: [
      {
        title: "1.1. React 的基本认识",
        path: "/chapter-1/section-1",
      },
      {
        title: "1.2. React 的基本使用",
        path: "/chapter-1/section-2",
      },
      {
        title: " 1.3. React JSX",
        path: "/chapter-1/section-3",
      },
      {
        title: "1.4. 模块与组件和模块化与组件化的理解",
        path: "/chapter-1/section-4",
      },
    ],
  },
  {
    title: "2. React 面向组件编程",
    path: "/chapter-2/section-1",
    collapsable: false,
    children: [
      {
        title: "2.1. 基本理解和使用",
        path: "/chapter-2/section-1",
      },
      {
        title: "2.2. 组件实例三大属性1：state",
        path: "/chapter-2/section-2",
      },
      {
        title: "2.3. 组件实例三大属性2：props",
        path: "/chapter-2/section-3",
      },
      {
        title: "2.4. 组件实例三大属性3：refs与事件处理",
        path: "/chapter-2/section-4",
      },
      {
        title: "2.5. 收集表单数据",
        path: "/chapter-2/section-5",
      },
      {
        title: "2.6. 组件的生命周期",
        path: "/chapter-2/section-6",
      },
      {
        title: "2.7. 虚拟DOM与DOM Diffing算法",
        path: "/chapter-2/section-7",
      },
    ],
  },
];

module.exports = {
  nav,
  sidebar,
};
