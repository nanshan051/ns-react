module.exports = {
  title: "NS-React",
  description: "Record a wonderful life",
  base: "/ns-react/",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  markdown: {
    lineNumbers: true,
  },
  theme: "reco",
  themeConfig: {
    nav: [
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
    ],
    subSidebar: "auto",
    sidebar: [],
  },
};
