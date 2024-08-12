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
  theme: "reco",
  themeConfig: {
    nav,
    sidebar,
    subSidebar: "auto",
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoomable',
      options: {
        background: '#333'
      }
    }
  },
};
