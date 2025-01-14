const notesSidebar = [
  {
    title: "杂记",
    path: "/notes/",
    collapsable: false,
  },
  {
    title: "鉴权",
    path: "/notes/chapter-1/section-1",
    collapsable: false,
    children: [
      {
        title: "Digest Auth",
        path: "/notes/chapter-1/section-1",
        collapsable: false,
      },
    ],
  },
];

module.exports = notesSidebar;
