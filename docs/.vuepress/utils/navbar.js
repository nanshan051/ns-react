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
        title: "1.4. 模块与组件和模块化与组件化",
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
        title: "2.4. 组件实例三大属性3：refs(事件处理)",
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
      {
        title: "5.5. 解决样式丢失问题",
        path: "/chapter-5/section-5",
      },
      {
        title: "5.6. 路由的模糊匹配和精确匹配",
        path: "/chapter-5/section-6",
      },
      {
        title: "5.7. Redirect 组件",
        path: "/chapter-5/section-7",
      },
      {
        title: "5.8. 嵌套路由",
        path: "/chapter-5/section-8",
      },
      {
        title: "5.9. 向路由组件传递params参数",
        path: "/chapter-5/section-9",
      },
      {
        title: "5.10. 向路由组件传递search参数",
        path: "/chapter-5/section-10",
      },
      {
        title: "5.11. 向路由组件传递state参数",
        path: "/chapter-5/section-11",
      },
      {
        title: "5.12. push 与 replace",
        path: "/chapter-5/section-12",
      },
      {
        title: "5.13. 编程式路由导航",
        path: "/chapter-5/section-13",
      },
      {
        title: "5.14. withRouter() 方法",
        path: "/chapter-5/section-14",
      },
      {
        title: "5.15. BrowserRouter 与 HashRouter",
        path: "/chapter-5/section-15",
      },
    ],
  },
  {
    title: "6. react-ui",
    path: "/chapter-6/section-1",
    collapsable: false,
    children: [
      {
        title: "6.1. ant-design 的使用",
        path: "/chapter-6/section-1",
      },
      {
        title: "6.2. 自定义主题",
        path: "/chapter-6/section-2",
      },
    ],
  },
  {
    title: "7. redux",
    path: "/chapter-7/section-1",
    collapsable: false,
    children: [
      {
        title: "7.1. redux 理解",
        path: "/chapter-7/section-1",
      },
      {
        title: "7.2. redux 的三个核心概念",
        path: "/chapter-7/section-2",
      },
      {
        title: "7.3. 计算器：纯react版",
        path: "/chapter-7/section-3",
      },
      {
        title: "7.4. 计算器：redux精简版",
        path: "/chapter-7/section-4",
      },
      {
        title: "7.5. 计算器：redux完整版",
        path: "/chapter-7/section-5",
      },
      {
        title: "7.6. 计算器：redux异步action版",
        path: "/chapter-7/section-6",
      },
      {
        title: "7.7. 计算器：react-redux的基本使用",
        path: "/chapter-7/section-7",
      },
      {
        title: "7.8. 计算器：react-redux优化",
        path: "/chapter-7/section-8",
      },
      {
        title: "7.9. 计算器+人员列表：数据共享",
        path: "/chapter-7/section-9",
      },
      {
        title: "7.10. 计算器+人员列表：开发者工具",
        path: "/chapter-7/section-10",
      },
      {
        title: "7.11. 计算器+人员列表：最终版",
        path: "/chapter-7/section-11",
      },
      {
        title: "7.12. 打包部署项目",
        path: "/chapter-7/section-12",
      },
    ],
  },
  {
    title: "8. react 扩展",
    path: "/chapter-8/section-1",
    collapsable: false,
    children: [
      {
        title: "8.1. setState",
        path: "/chapter-8/section-1",
      },
    ],
  },
];

module.exports = {
  nav,
  sidebar,
};
