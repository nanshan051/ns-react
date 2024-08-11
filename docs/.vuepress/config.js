const { nav, sidebar } = require("./utils/navbar.js");

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
    nav,
    sidebar,
    subSidebar: "auto",
  },
};
