# Reacticle：11 篇样文的对照与接入

基线为 ConardLi/reacticle `dcfc4baf386bbc220cd1aa6274bed3b741108465`。对照对象是原画廊中各报告及其固定主题；上游报告 TSX、组件、主题 CSS、gallery.tsx 和原 site.css 已归档于 `source/`。

| 本地入口 | 上游报告与主题 | 现有对照结论 |
| --- | --- | --- |
| caffeine-half-life | CaffeineHalfLife.tsx／tufte | 全文、标题字体声明／字号与尺寸一致；纸面 1162 × 6547.078125 CSS px。字形边缘存在栅格差异。 |
| movable-type | MovableType.tsx／press | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| pool-exhaustion | PoolExhaustion.tsx／shannon | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| orbit-spec | OrbitSpec.tsx／vignelli | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| linear-attention | LinearAttention.tsx／knuth | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| first-newsletter | FirstNewsletter.tsx／freddie | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| slow-breathing | SlowBreathing.tsx／andy | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| front-page | FrontPage.tsx／bodoni | 全文、标题字体声明／字号与尺寸一致；纸面 1122 × 5147.890625 CSS px。字形边缘存在栅格差异。 |
| geometry-of-meaning | GeometryOfMeaning.tsx／bayer | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| rate-limiter-spec | RateLimiter.tsx 的 RateLimiterSpec／fuller | 报告与主题绑定相符；原作/本地同视口画面对照未记录。 |
| color-clash | ColorClash.tsx／sottsass | 全文、标题字体声明／字号与尺寸一致；纸面 1122 × 4918.375 CSS px。字形边缘存在栅格差异。 |

上述三篇在 1440×1000 CSS 视口、DPR 1、相同语言、主题与减少动态设置下对照完整文章纸面。字体来源对应原站 76 个 Google Fonts URL；浏览器平台字体接口确认抽查字形实际使用相同字体。内容、图形构成、字形与排版尺寸一致，整篇截图仍存在字形边缘的栅格差异。关闭 LCD 文本与导航 backdrop 后差异仍在，精确原因尚未证实。

其余八篇的结论依据构建记录与固定上游 gallery.tsx；同视口视觉与交互成对结果未记录。

## 差异、删减与原因

| 范围 | 当前实现与原因 |
| --- | --- |
| 已决定删减画廊外壳 | 官网导航、浮动返回信息及上一篇／下一篇省略，独立入口只展示一篇文章。 |
| 代码高亮入口 | 加载前设置 Prism.manual，由原 React 组件逐行高亮，保留行容器与换行。 |
| 字体路径 | Google Fonts 的 13 家族／76 个 WOFF2 改为本地相对路径，用于离线静态页面；原主题中文系统回退保留。 |
| 应用接入 | 原站画廊路由改为各篇静态入口；本库实现选择页、最小 React 入口和 Vite 构建，沿用原 gx-reader／stage／paper 容器。 |
| 文章内部 | 原报告、公共组件、主题与 site.css 直接编译；三篇的同视口视觉结论见上表，其余八篇未记录视觉偏移及原因。 |

## 制作源码与重建

[source/README.md](source/README.md) 给出固定提交、归档范围和命令。`source/build-samples.mjs` 在单独工作目录生成 11 个最小入口并调用 Vite，依赖由原 package-lock.json 安装；当前运行 bundle 保持原文件。
