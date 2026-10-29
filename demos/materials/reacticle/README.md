# Reacticle 文章样例

本目录包含 Reacticle 0.2.6 固定源码的 11 篇独立静态文章。用 `index.html?demo=<id>` 打开对应样文；未指定或未知参数时打开咖啡因样文。入口沿用素材样例的查询参数选择方式，再跳转到独立页面。

## 来源与组合

- 仓库：[ConardLi/reacticle](https://github.com/ConardLi/reacticle)。
- 固定提交：`dcfc4baf386bbc220cd1aa6274bed3b741108465`。
- 报告组件：`apps/site/src/reports/`，组件和主题 CSS 未修改。
- 画廊绑定：`apps/site/src/data/gallery.tsx`；所有文件与主题对应均与任务表一致，`RateLimiter.tsx` 的实际导出名为 `RateLimiterSpec`。
- 最小 Vite 入口逐篇导入原报告、公共 `ThemeProvider` 和原 `apps/site/src/site.css`；保留原画廊的 `gx-reader`、`gx-reader__stage`、`gx-reader__paper` 容器。每个入口仅渲染这一篇文章，未包含官网导航、浮动返回标签与上一篇／下一篇。
- 最小入口在加载模块前设置 `Prism.manual = true`，由原 React 组件逐行高亮代码，保留代码行容器与换行。
- Vite 使用 `base: './'`。各文章的编译 JS、CSS、KaTeX 字体位于自己的 `assets/`；Google Fonts 共用 `vendor/fonts/fonts.css`。使用 HTTP 静态服务器打开整个目录。

| 主题 | 文章 | 原始报告 |
| --- | --- | --- |
| Tufte（`tufte`） | [咖啡因与睡眠：一份关于半衰期的笔记](caffeine-half-life/index.html) | `CaffeineHalfLife.tsx` → `CaffeineHalfLife` |
| Press（`press`） | [活字之后](movable-type/index.html) | `MovableType.tsx` → `MovableType` |
| Shannon（`shannon`） | [连接池耗尽：一次结算级联故障复盘](pool-exhaustion/index.html) | `PoolExhaustion.tsx` → `PoolExhaustion` |
| Vignelli（`vignelli`） | [Orbit 设计系统 · 基础规范](orbit-spec/index.html) | `OrbitSpec.tsx` → `OrbitSpec` |
| Knuth（`knuth`） | [以核特征映射线性化自注意力：一个复杂度视角](linear-attention/index.html) | `LinearAttention.tsx` → `LinearAttention` |
| Freddie（`freddie`） | [第一封 Newsletter：一份不端着的上手指南](first-newsletter/index.html) | `FirstNewsletter.tsx` → `FirstNewsletter` |
| Andy（`andy`） | [把呼吸放慢：盒式呼吸与平静的神经科学](slow-breathing/index.html) | `SlowBreathing.tsx` → `SlowBreathing` |
| Bodoni（`bodoni`） | [头版的消亡](front-page/index.html) | `FrontPage.tsx` → `FrontPage` |
| Bayer（`bayer`） | [形、色、网格：看得懂的视觉语法](geometry-of-meaning/index.html) | `GeometryOfMeaning.tsx` → `GeometryOfMeaning` |
| Fuller（`fuller`） | [限流器设计规格](rate-limiter-spec/index.html) | `RateLimiter.tsx` → `RateLimiterSpec` |
| Sottsass（`sottsass`） | [撞色不翻车](color-clash/index.html) | `ColorClash.tsx` → `ColorClash` |

## 字体与许可

Reacticle 的原始 `package.json` 声明 MIT，作者为 ConardLi；**仓库内没有 LICENSE 文件**。声明原文保存在 `vendor/reacticle-package.json`，实际许可边界说明见 `vendor/reacticle-MIT-declaration.txt`。

官网原样引入的 13 个 Google Fonts 家族及全部 76 个 WOFF2 资源均已本地化，字体字节不变。原始 Google 字体 CSS 快照、逐家族 OFL 1.1 许可及本地样式保存在 `vendor/fonts/`。KaTeX 的公式字体随各静态页面打包；它们的嵌入版权与 OFL 声明保存在 `fonts/LICENSE-katex-fonts-OFL.txt`。React、React DOM、scheduler、KaTeX 和 Prism 的原始 MIT 许可分别保存在 `vendor/LICENSE-*.txt`。完整来源见 [第三方声明](vendor/NOTICE.md)。本库用于个人非商业学习。

## 交互与阅读

报告保留原文、公式、代码、滑块、按钮、展开内容、目录与可交互图形；呼吸样文保留开始／暂停练习。减少动态规则直接沿用原站 CSS，呼吸计时器仍按原实现运行；读屏器和真实触屏设备的表现须另外实测。
