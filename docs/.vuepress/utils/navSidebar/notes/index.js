const notesSidebar = [
  {
    title: "杂记",
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
        title: "2.1. 介绍",
        path: "/notes/chapter-2/section-1",
        collapsable: false,
      },
    ],
  },
];

module.exports = notesSidebar;
