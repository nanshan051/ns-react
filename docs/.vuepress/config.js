const nav = require("./utils/navSidebar/nav.js");
const sidebar = require("./utils/navSidebar/sidebar.js");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  title: "NS-Blog",
  description: "Record a wonderful life",
  base: "/ns-blog/",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  theme: "reco",
  themeConfig: {
    // logo: "/images/picture/1.png",
    nav,
    sidebar,
    sidebarDepth: 3,
    subSidebar: "auto",
    lastUpdated: "Last Updated",
    smoothScroll: true,
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: {
    "@vuepress/medium-zoom": {
      selector: "img.zoomable",
      options: {
        background: "#333",
      },
    },
  },
  configureWebpack: (config, isServer) => {
    return {
      devtool: isDev ? "source-map" : "nosources-source-map", // 避免源码泄露
      resolve: {
        extensions: [".js", ".vue", ".json", ".scss", ".ts", ".tsx"], // 可不写的扩展名
      },
      // module: {
      //   rules: [
      //     {
      //       test: /\.s[ac]ss$/i,
      //       exclude: /node_modules/,
      //       use: ["style-loader", "css-loader", "sass-loader"],
      //     },
      //   ],
      // },
    };
  },
};
