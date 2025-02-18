(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{573:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"_1-javascript-中的数据类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-javascript-中的数据类型"}},[t._v("#")]),t._v(" 1. JavaScript 中的数据类型")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("string")])]),t._v(" "),s("li",[s("code",[t._v("number")])]),t._v(" "),s("li",[s("code",[t._v("boolean")])]),t._v(" "),s("li",[s("code",[t._v("null")])]),t._v(" "),s("li",[s("code",[t._v("undefined")])]),t._v(" "),s("li",[s("code",[t._v("symbol")])]),t._v(" "),s("li",[s("code",[t._v("bigint")])]),t._v(" "),s("li",[s("code",[t._v("object")])])]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"},[t._v("对象类型（引用数据类型）")]),s("p",[s("strong",[s("code",[t._v("object")]),t._v(" 是『对象类型』。")])]),t._v(" "),s("p",[s("code",[t._v("object")]),t._v(" 包含："),s("code",[t._v("Array")]),t._v("、"),s("code",[t._v("Function")]),t._v("、"),s("code",[t._v("Date")]),t._v("、"),s("code",[t._v("Error")]),t._v(" 等......")])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"},[t._v("原始类型（基本数据类型）")]),s("p",[s("strong",[t._v("除了 "),s("code",[t._v("object")]),t._v("， 其他都是『原始类型』。")])]),t._v(" "),s("ul",[s("li",[s("p",[s("code",[t._v("symbol")]),t._v(" 是 "),s("code",[t._v("es2015(ES6)")]),t._v(" 中引入的原始数据类型，表示独一无二的值。使用 Symbol 作为对象属性名可以避免与现有属性名冲突。可以通过 "),s("code",[t._v("String()")]),t._v(" 或 "),s("code",[t._v(".toString()")]),t._v(" 方法将其转换为字符串。通过 "),s("code",[t._v("Symbol()")]),t._v(" 创建时可以传入一个参数，用于描述该 Symbol 值。")])]),t._v(" "),s("li",[s("p",[s("code",[t._v("bigint")]),t._v(" 是 "),s("code",[t._v("es2020")]),t._v(" 中引入的原始数据类型，用于存储太大而无法用普通 JavaScript 数字表示的大整数值。如需创建 BigInt，可以在整数末尾添加 "),s("code",[t._v("n")]),t._v("，或调用 "),s("code",[t._v("BigInt()")]),t._v(" 函数。（不用脚手架的情况下，需要在 "),s("code",[t._v("tsconfig.json")]),t._v(" 中设置 "),s("code",[t._v('target: "es2020"')]),t._v(" 才能在 TypeScript 中使用 BigInt 。）")])])])]),s("h2",{attrs:{id:"_2-typescript-中的数据类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-typescript-中的数据类型"}},[t._v("#")]),t._v(" 2. TypeScript 中的数据类型")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("上述所有 "),s("code",[t._v("JavaScript")]),t._v(" 类型")])]),t._v(" "),s("li",[s("p",[t._v("六个新类型：")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("any")])]),t._v(" "),s("li",[s("code",[t._v("unknown")])]),t._v(" "),s("li",[s("code",[t._v("never")])]),t._v(" "),s("li",[s("code",[t._v("void")])]),t._v(" "),s("li",[s("code",[t._v("tuple")])]),t._v(" "),s("li",[s("code",[t._v("enum")]),t._v(" "),s("br"),s("br")])])]),t._v(" "),s("li",[s("p",[t._v("两个用于自定义类型的方式：")]),t._v(" "),s("ol",[s("li",[s("code",[t._v("type")])]),t._v(" "),s("li",[s("code",[t._v("interface")])])])])]),t._v(" "),s("h2",{attrs:{id:"_3-注意点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-注意点"}},[t._v("#")]),t._v(" 3. 注意点")]),t._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"title"}),s("p",[t._v("在 JavaScript 中的这些内置构造函数："),s("code",[t._v("Number")]),t._v("、"),s("code",[t._v("String")]),t._v("、"),s("code",[t._v("Boolean")]),t._v("，它们用于创建对应的包装对象，在日常开发时 "),s("strong",[s("span",{staticStyle:{color:"red"}},[t._v("很少使用")])]),t._v("，在 "),s("code",[t._v("TypeScript")]),t._v(" 中也是同理，所以在 "),s("code",[t._v("TypeScript")]),t._v(" 中进行类型声明时，通常都是用小写的 "),s("code",[t._v("number")]),t._v("、"),s("code",[t._v("string")]),t._v("、"),s("code",[t._v("boolean")]),t._v("。")])]),s("p",[t._v("例如下面代码：")]),t._v(" "),s("div",{staticClass:"language-ts line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str1"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// TypeScript官方推荐的写法")]),t._v("\nstr1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n * 下面这行代码会提示警告：不能将类型“String”分配给类型“string”。\n * “string”是基元（基本数据类型），但“String”是包装器对象。如可能首选使用“string”。\n */")]),t._v("\nstr1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str2"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" String"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nstr2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nstr2 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" str1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 打印：string")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" str2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 打印：object")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br")])]),s("h3",{attrs:{id:"_3-1-原始类型-vs-包装对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-原始类型-vs-包装对象"}},[t._v("#")]),t._v(" 3.1. 原始类型 vs 包装对象")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"}),s("ul",[s("li",[s("strong",[t._v("原始类型")]),t._v("："),s("code",[t._v("number")]),t._v("、"),s("code",[t._v("string")]),t._v("、"),s("code",[t._v("boolean")]),t._v(" ，在 "),s("code",[t._v("JavaScript")]),t._v(" 中是简单数据类型，它们在内存中占用空间少，处理速度快。")]),t._v(" "),s("li",[s("strong",[t._v("包装对象")]),t._v("："),s("code",[t._v("Number")]),t._v("、"),s("code",[t._v("String")]),t._v("、"),s("code",[t._v("Boolean")]),t._v(" 对象，是复杂类型，在内存中占用更多空间，在日常开发时很少由开发人员自己创建包装对象。")])])]),s("h3",{attrs:{id:"_3-2-自动装箱"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-自动装箱"}},[t._v("#")]),t._v(" 3.2. 自动装箱")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"}),s("p",[s("strong",[s("code",[t._v("JavaScript")]),t._v(" 在必要时会自动将『原始类型』转换为『包装对象』，以便调用方法或访问属性。")])])]),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 原始类型字符串")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 当访问str.length时，JavaScript引擎做了以下工作：")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" size "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1.自动装箱：创建一个临时的String对象包装原始字符串")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" tempStringObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2.访问String对象的length属性")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" lengthValue "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tempStringObject"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3.销毁临时对象，返回长度值")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// （JavaScript引擎自动处理对象销毁，开发者无感知）")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" lengthValue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("size"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出：5")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);