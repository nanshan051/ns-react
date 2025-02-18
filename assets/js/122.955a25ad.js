(window.webpackJsonp=window.webpackJsonp||[]).push([[122],{569:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"title"}),t("p",[s._v("浏览器不能直接运行 "),t("code",[s._v("TypeScript")]),s._v(" 代码，需要编译为 "),t("code",[s._v("JavaScript")]),s._v(" 再交由浏览器解析器执行。")])]),t("h2",{attrs:{id:"_1-命令行编译"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-命令行编译"}},[s._v("#")]),s._v(" 1. 命令行编译")]),s._v(" "),t("p",[s._v("要把 "),t("code",[s._v(".ts")]),s._v(" 文件编译成 "),t("code",[s._v(".js")]),s._v(" 文件，需要配置 "),t("code",[s._v("TypeScript")]),s._v(" 的编译环境，步骤如下：")]),s._v(" "),t("ul",[t("li",[t("strong",[s._v("第一步")]),s._v("：创建一个 "),t("code",[s._v("index.ts")]),s._v(" 文件，例如：")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" person "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"张三"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("age")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token template-string"}},[t("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("我叫")]),t("span",{pre:!0,attrs:{class:"token interpolation"}},[t("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("${")]),s._v("person"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("}")])]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("，我今年")]),t("span",{pre:!0,attrs:{class:"token interpolation"}},[t("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("${")]),s._v("person"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("age"),t("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[s._v("}")])]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("岁")]),t("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[s._v("`")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("ul",[t("li",[t("strong",[s._v("第二步")]),s._v("：全局安装 "),t("code",[s._v("TypeScript")]),s._v(" ：")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 全局安装")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" i typescript "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-g")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("ul",[t("li",[t("strong",[s._v("第三步")]),s._v("：使用命令编译 "),t("code",[s._v("index.ts")]),s._v(" 文件：")])]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[s._v("tsc index"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ts\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[t("code",[s._v("tsc")]),s._v(" 是 "),t("code",[s._v("TypeScript Compiler")]),s._v(" （TypeScript 编译器） 的缩写。编写本文时 TypeScript 为 5.7.3 版本。")]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看 TypeScript 版本")]),s._v("\ntsc "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-V")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 或")]),s._v("\ntsc "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--version")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])])]),t("p",[s._v("编译后生成的 "),t("code",[s._v("index.js")]),s._v(" 文件：")]),s._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" person "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"张三"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[s._v("age")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\u6211\\u53EB"')]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("concat")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("person"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\uFF0C\\u6211\\u4ECA\\u5E74"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("concat")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("person"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("age"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\u5C81"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("p",[s._v("这里，对中文字符进行了转义，是为了让中文能在任何平台下都能正确输出。")]),s._v(" "),t("h2",{attrs:{id:"_2-自动化编译"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-自动化编译"}},[s._v("#")]),s._v(" 2. 自动化编译")]),s._v(" "),t("ul",[t("li",[t("strong",[s._v("第一步")]),s._v("：创建 "),t("code",[s._v("TypeScript")]),s._v(" 编译控制文件：")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("tsc "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--init")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("ol",[t("li",[s._v("工程中会生成一个 "),t("code",[s._v("tsconfig.json")]),s._v(" 配置文件，其中包含着很多编译时的配置项。")]),s._v(" "),t("li",[s._v("观察发现，默认编译的 JS 版本是 "),t("code",[s._v("es2016")]),s._v(" (即 "),t("code",[s._v("ES7")]),s._v(" )，可以手动调整为其他版本。")])])]),t("ul",[t("li",[t("strong",[s._v("第二步")]),s._v("：监视目录中的 "),t("code",[s._v(".ts")]),s._v(" 文件变化：")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("tsc "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--watch")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# watch后面可以指定文件或目录，不指定则监视整个项目")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ul",[t("li",[t("strong",[s._v("第三步")]),s._v("：小优化，当编译出错时不生成 "),t("code",[s._v(".js")]),s._v(" 文件：")])]),s._v(" "),t("div",{staticClass:"language-sh line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("tsc "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--noEmitOnError")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--watch")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[s._v("当然也可以修改 "),t("code",[s._v("tsconfig.json")]),s._v(" 文件中的 "),t("code",[s._v("noEmitOnError")]),s._v(" 配置项。（"),t("strong",[t("span",{staticStyle:{color:"green"}},[s._v("推荐")])]),s._v("）")])]),t("blockquote",[t("p",[s._v("无论是 vue 还是 react，只要是通过脚手架搭建的项目，都无需进行上述的 『命令行编译』和『自动化编译』，脚手架会帮助我们进行编译。")])])])}),[],!1,null,null,null);t.default=e.exports}}]);