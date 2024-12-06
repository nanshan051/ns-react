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
      {
        text: "思否",
        link: "https://segmentfault.com",
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
  {
    title: "3. react 应用（基于react脚手架）",
    path: "/chapter-3/section-1",
    collapsable: false,
    children: [
      {
        title: "3.1. 使用create-react-app创建react应用",
        path: "/chapter-3/section-1",
      },
      {
        title: "3.2. 组件的组合使用-TodoList",
        path: "/chapter-3/section-2",
      },
    ],
  },
  {
    title: "4. react ajax",
    path: "/chapter-4/section-1",
    collapsable: false,
    children: [
      {
        title: "4.1. 跨域与代理",
        path: "/chapter-4/section-1",
      },
      {
        title: "4.2. 案例：查询GitHub用户",
        path: "/chapter-4/section-2",
      },
      {
        title: "4.3. 消息订阅-发布机制",
        path: "/chapter-4/section-3",
      },
      {
        title: "4.4. fetch",
        path: "/chapter-4/section-4",
      },
    ],
  },
  {
    title: "5. React 路由",
    path: "/chapter-5/section-1",
    collapsable: false,
    children: [
      {
        title: "5.1. 相关理解",
        path: "/chapter-5/section-1",
      },
      {
        title: "5.2. 路由的基本使用",
        path: "/chapter-5/section-2",
      },
      {
        title: "5.3. NavLink 组件",
        path: "/chapter-5/section-3",
      },
      {
        title: "5.4. Switch 组件",
        path: "/chapter-5/section-4",
      },
    ],
  },
];

module.exports = {
  nav,
  sidebar,
};
