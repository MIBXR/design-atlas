# Google Material：从真实文档首页学习表现力与系统秩序

观察日期：2026-10-07。实例为 [Material Design 3 首页](https://m3.material.io/)，英文国际版，Google／美国。当前页面已有 I/O 2026 区域，不将 2025 Expressive 发布页当作当前首页。此例是官方页面局部复现，而不是自创 Google 风格仪表盘。

## 实访与来源的边界

用独立 Edge 研究标签实访首页宽屏、390px 手机、向下滚动、手机目录、Styles 目录、主题开关、视频控制及全局动效开关。另实访 [Motion physics system](https://m3.material.io/styles/motion/overview/how-it-works)，读取两种 motion scheme 与 spatial/effects 的说明，操作首段演示视频的暂停按钮。

研究浏览器现有 Dark Reader 会改写原站色彩，未更改浏览器设置。原站截图记录的是该环境下的真实画面，不能用于取色；本地配色从公开原始 CSS 中的 `mio-root` 与 `mio-root.dark-mode` 变量核验。官网偏好操作已恢复为研究开始时的深色／动效开启。本地示例以官网的浅色 token 集起步，提供同源深色 token 切换，不声称浅色是所有用户的官网初始偏好。

原站证据：

- [干净原色首屏](screenshots/google-material-clean-source.jpg)：根节点用独立 IAB 实访同一首页并保存，默认浏览器视口，未强行缩放；作为库中的主要原站对照。下列 Edge 证据保留用于尺寸、手机及交互研究，并不替代这张原色截图。

- [宽屏首屏](screenshots/google-material-source.jpg)、[滚动区域](screenshots/google-material-scroll-source.jpg)。研究 CSS 视口 1440×1000；Edge 图片像素与视口不完全相同，原字节保存。
- [手机首屏](screenshots/google-material-mobile-source.jpg)、[手机目录](screenshots/google-material-menu-source.jpg)。CSS 视口 390×844，未把宽屏截图缩小冒充手机版。
- [官方动效规范演示](screenshots/google-material-motion-source.jpg)，首段视频已暂停。

公开源码只作为证据检查，不作为本地应用运行时：

- 原始样式：`https://m3.material.io/static/angular/styles.4c2805e602edc472.css`。
- 原始脚本：`https://m3.material.io/static/angular/main.7906d9e8e8cae962.js`。
- 首页内容资源：`https://m3.material.io/_dsm/content/m3/2026-09-23_06-10-05/a513b32c-174e-4b85-8553-60701c021797.json`，由原站公开版本与文件 ID 定位；该内容记录更新于 2026-07-08。版本目录和更新时间各自保留，不能把目录日期当内容创作日期。

## 可观测事实与本地映射

| 元素 | 实际观察／公开样式证据 | 本地对应 |
|---|---|---|
| 导航 | 宽屏左侧固定 88px rail；图标加短标签；底部两个圆开关。手机改为 64px 顶栏及左侧目录 | 官方 Symbols 字体绘制相同语义图标；主目录、主题及动效控件可用 |
| 首屏 | ≥1295px 两个大圆角区域相邻，间距 8px；≤1294px 上下排列。宽屏左区域 x96、y8、656.4×544，内边距 56px、圆角 24px；右侧真实视频 | 保留这些尺度和并列比例；手机上下堆叠，32px 内边距 |
| 排版 | 标题使用 Google Sans 475；宽屏 96/96px，手机 45/52px；段落为 Google Sans Text；手机 H2 36/44px | 5 个官网实际字体文件已本地保存。正文改写导致个别行数和文字位置不同 |
| 配色 | 浅色背景 #fefbff，首屏表面 #f8f1f6／#1c1b1d，主按钮 #6442d6／白；深色背景 #141314，首屏表面 #1c1b1d／#e6e1e3 | 使用角色变量配对切换；没有把浏览器改色结果当品牌色 |
| 内容结构 | I/O 2026：先一个横向图文资源，随后两个；Expressive 与组件区域为 2＋3 分组；随后应用、资讯、入门资源 | 6 个内容节、20 张原配图，保留分组及区域顺序；并非每节共用同一种卡片行数 |
| 视频 | 首页真实 9 秒 MP4，实际 4000×2000、静音、循环，浏览中时间推进；点击后暂停且按钮变为播放 | 本地同一原始 MP4，状态从 play/pause 事件读取；减少动态时初始停播 |
| 按钮形状 | CTA 静态圆角 48px，按压变 16px；公开样式为 .2s cubic-bezier(.2,0,0,1) | 同样按压变形、抬起恢复；触摸使用原生 pointer 与 button/link 状态 |
| 资源卡状态 | 静态圆角 24px，键盘聚焦／按压变 48px；背景变为 secondary container；公开样式 .3s 同曲线 | 有可见焦点、背景及圆角转换；点击实际官方外链 |
| 涟漪 | 官网脚本绑定 `mioRipple`，实访互动后 DOM 可见 `.ripple` 元素 | 独立实现按点击位置扩散的 300ms 涟漪，键盘从中心触发；此持续时间是近似，未声称逐帧相同 |
| 动效开关 | 原站全局开关由暂停切为播放状态，同时首页视频停止 | 本地开关暂停视频、CSS 过渡与涟漪；独立视频播放按钮仍允许用户明确播放 |

干净原色对照补充后，再次核验公开组件样式：名为 primary-container 的首屏实际使用 surface-1，中性表面而非紫色 primary-container token。本地已按应用位置修正配色和 1294px 断点；类名不能替代计算样式／组件规则证据。

已保存的动效并不只有截图：官方 MP4 保留完整循环；按钮／卡片形状变换由本地 CSS 状态产生，主题由 token 切换产生，涟漪由 pointer/keyboard 事件产生。没有给静态图添加任意视差，也没有把首页 CSS easing 冒称为全部使用 M3 Expressive 弹簧。

## 第一方理论与推断

[Google Design 的 Expressive 研究](https://design.google/library/expressive-material-design-google-research) 把颜色、形状、大小、动效和 containment 作为有机组合，用它们引导注意力和组织相关内容；也明确表示情境与既有可用性模式仍重要。这里的应用推断是：首屏中性面板和大标题先建立身份，紫色按钮明确主动作，较中性的资源面板维持阅读秩序，颜色与形状在交互时进一步确认状态。不能据该研究声称任何换成紫色或大按钮的页面都会提高效率。

[官方 motion 规范](https://m3.material.io/styles/motion/overview/how-it-works) 标注 May 2025 引入物理系统，提供 expressive 和 standard 两种方案，并区分空间运动与颜色／透明度等 effects。弹簧由 stiffness、damping 和 initial velocity 描述；大多动效宜保持同一方案，小控件、局部页面、全屏变化有不同速度层级。这解释体系的一致性，**不构成本次首页所有控件均为弹簧的证据**。当前首页公开 CSS 的按钮和卡片仍有时间／贝塞尔曲线，复现以实际页面为准。

[Google 的品牌与 Material 指南](https://design.google/library/staying-true-to-your-identity-material-branding) 支持品牌字体、图像与配色，在一致层级和使用方式下协调；这是一篇历史品牌文章，其 500／700 色阶示例不是当前 M3 的通用配色规则。本例读到的紫色 token 只属于 Material 文档网站，不能宣称所有 Google 产品都如此配色或所有 Material 品牌都必须用 Google Sans。

[W3C 的交互动效说明](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 区分用户触发动效与自动动效，并解释允许关闭非必要运动的目的。这里只将其用于可控媒体、全局暂停和减少动态策略，不声称整页已完成 WCAG 合规认证。

## 可迁移的约束

1. 先定义背景、容器、on-color 的配对关系，再放图像；图片色彩活跃时，正文容器仍保持稳定。
2. 大标题、大主按钮与较小目录标签有明确尺度差；不要把导航、标题、正文都做同一大小。
3. 小间隙聚合首屏和资源行，大节距区分主题；圆角仅在有意义的状态中变化。
4. 图像示范具体产品状态，动画应该让人看懂组件的变化，而不是仅作为无目的装饰。
5. 同一套主题 token 和状态层贯穿导航、按钮、卡片；减少动态后仍有立即的颜色与焦点反馈。

本地复现范围和未实现内容见 [fidelity.md](../demos/google-material/fidelity.md)，实际浏览器检查见 [google-material-qa.json](google-material-qa.json)，所有素材出处与 SHA256 见 [assets-manifest.json](../demos/google-material/assets-manifest.json)。
