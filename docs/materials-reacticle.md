# Reacticle · 长文排版组件库

Reacticle 是用于文章、报告和交互长文的 React 语义化组件库，提供 11 套有独立排版契约的主题。内容通过同一套组件表达，主题决定文字层级、网格、留白、图表与代码的视觉语言。

## 安装与取材

上游 README 指向的开始使用页给出 `npm install reacticle`，React 18.3 是 peer 依赖。本库样例直接使用 Reacticle 0.2.6 固定提交 `dcfc4baf386bbc220cd1aa6274bed3b741108465` 的 `src/` 与 `apps/site`，未修改报告组件或主题 CSS。公共入口 `ThemeProvider` 包裹文章，再组合 `Article`、`Hero`、`Section`、公式、代码、决策和媒体组件；自定义 `Raw` 内容继续使用 `--ra-*` 主题变量。

11 个独立入口复用原画廊的文章容器及原站 CSS，仅渲染对应文章。入口在模块加载前设置 `Prism.manual = true`，由原 React 组件逐行高亮，保留代码行容器与换行。样例索引按 `?demo=<id>` 选择后直接打开对应静态页；每篇的 JS、CSS 与公式字体由 Vite 以相对路径构建，Google Fonts 使用共享本地文件。

## 11 套主题样文

| 主题 | 文章 | 风格 |
| --- | --- | --- |
| Tufte | [咖啡因与睡眠：一份关于半衰期的笔记](../material-demos/reacticle/index.html?demo=caffeine-half-life) | 数据墨水风格：克制衬线、充裕页边、发丝参考线与低装饰图表，让论点和证据承载视觉层级。 |
| Press | [活字之后](../material-demos/reacticle/index.html?demo=movable-type) | 出版书卷风格：暖纸与从容衬线，以线代框，保留数据墨水纪律，用更外放的字号和版式组织叙事。 |
| Shannon | [连接池耗尽：一次结算级联故障复盘](../material-demos/reacticle/index.html?demo=pool-exhaustion) | 暗色工程风格：温暖石墨底、暖白墨与琥珀信号色，围绕日志、代码、事件与决策组织可核查证据。 |
| Vignelli | [Orbit 设计系统 · 基础规范](../material-demos/reacticle/index.html?demo=orbit-spec) | 瑞士国际主义风格：冷中性纸面、无衬线字号层级、严密网格与一抹结构红，适合系统规范。 |
| Knuth | [以核特征映射线性化自注意力：一个复杂度视角](../material-demos/reacticle/index.html?demo=linear-attention) | 学术预印本风格：正式衬线、编号章节和图表、公式优先与密集引用，强调推导和可核查性。 |
| Freddie | [第一封 Newsletter：一份不端着的上手指南](../material-demos/reacticle/index.html?demo=first-newsletter) | 温暖人文风格：白纸黑墨与明黄荧光色块，俏皮衬线标题配干净无衬线正文，亲切且专业。 |
| Andy | [把呼吸放慢：盒式呼吸与平静的神经科学](../material-demos/reacticle/index.html?demo=slow-breathing) | 静谧人文风格：暖奶油纸、南瓜橙、暖灰墨与圆润字体，大圆角、柔和阴影和留白帮助放慢节奏。 |
| Bodoni | [头版的消亡](../material-demos/reacticle/index.html?demo=front-page) | 黑白报刊风格：纯白纸、真黑墨与发丝栏线，大字刊头、首字下沉和粗细双线建立印刷层级。 |
| Bayer | [形、色、网格：看得懂的视觉语法](../material-demos/reacticle/index.html?demo=geometry-of-meaning) | 包豪斯构成风格：暖纸黑墨，以红蓝黄三原色、几何无衬线、硬边与圆形数字组织清晰结构。 |
| Fuller | [限流器设计规格](../material-demos/reacticle/index.html?demo=rate-limiter-spec) | 工程蓝图风格：深蓝底、青白墨、制图青与淡方格网，搭配等宽标注、虚线分节和发丝拓扑。 |
| Sottsass | [撞色不翻车](../material-demos/reacticle/index.html?demo=color-clash) | 孟菲斯风格：奶油纸、黑墨与粉青黄蓝撞色，以硬投影、轻旋转、彩色药丸和几何彩屑制造节奏。 |

主题绑定与上游 `gallery.tsx` 完全一致。限流器文件名为 `RateLimiter.tsx`，实际组件导出为 `RateLimiterSpec`。样文保留原文、图形、公式、代码和交互；图库外壳中的官网导航、浮动返回信息和上一篇／下一篇不属于独立文章页面。

## 适合与不适合

适合数据笔记、研究分析、技术解释、故障复盘、设计规范、出版随笔和教学文章。先按内容任务选主题，再读主题 profile 与相应样例，避免将主题理解为简单换色。它不负责后台应用、复杂表单或完整网站的信息架构；样文的事实、数据与建议也应在实际发布前独立核验。

## 关联工作流

[beautiful-article](../materials.html#material/beautiful-article) 提供来源整理、计划、写作、审阅、修复和交付流程，Reacticle 是它的组件与主题实现。11 套风格说明概括自 garden-skills 固定提交 `2b9a89340b70f632d31c0f1c69fce94a7912423e` 的 `theme-profiles/`，每套主题的样文在本条目的样例中。

## 本地资源与可访问性

原站引入的 Newsreader、IBM Plex Sans、IBM Plex Mono、Source Serif 4、JetBrains Mono、Fraunces、Hanken Grotesk、Quicksand、Nunito、Playfair Display、Josefin Sans、Poppins 和 Space Grotesk 共 13 个字体家族、76 个 WOFF2 文件已本地化。保留原字重、样式与子集范围；中文继续使用原主题声明的系统字体回退。

文章内目录、按钮、滑块与展开内容沿用原实现。减少动态使用原站 CSS；呼吸练习保留原始开始／暂停和计时逻辑。源码及依赖完整保留并不等于读屏器、真实触屏和所有浏览器的行为均已实测。

## 来源与许可

- [Reacticle 固定源码](https://github.com/ConardLi/reacticle/tree/dcfc4baf386bbc220cd1aa6274bed3b741108465)：0.2.6，作者 ConardLi。原始 `package.json` 声明 MIT，**仓库内没有 LICENSE 文件**。原始声明保存在 `material-demos/reacticle/vendor/reacticle-package.json`。
- React、React DOM、scheduler、KaTeX 与 Prism：保留各自原始 MIT 许可。
- 13 个 Google Fonts 家族：逐家族附 SIL Open Font License 1.1；KaTeX 公式字体的嵌入 OFL 声明与全文单独保留。
- 字体、软件版本与文件说明见 [第三方声明](../material-demos/reacticle/vendor/NOTICE.md)；[样例说明](../material-demos/reacticle/README.md) 记录每篇与原始报告文件的对应。

本库用于个人非商业学习，保留原文与署名，软件许可声明与字体许可分别记录。
