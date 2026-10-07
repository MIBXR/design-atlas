# Google Material：表现力与系统秩序

观察日期：2026-10-07。参考：[公开页面](https://m3.material.io/)。原站内容以该日期与语言版本为准。

## 设计特点与分析

英文M3首页包含I/O 2026。桌面88px固定图标侧栏与宽内容分离，手机为64px顶栏；首屏相邻24px圆角面板间距8px，≥1295px并列、≤1294px纵排。Google Sans 475标题96/96px，手机45/52px，Google Sans Text正文；桌面首屏内边距56px，手机32px。I/O资源为1+2、Expressive与组件为2+3分组，正文上限1200px。

中性容器、大标题和紫色主动作维持身份与行动层级，鲜活的组件图像由稳定网格承托。颜色、形状、大小、动效与容器共同表达状态；这是结合Google Design研究的页面分析。

## 交互机制与复现映射

| 触发与元素 | 原站观察／公开源码 | 本地实现与差异 |
|---|---|---|
| 浅/深主题 | 原CSS浅色#fefbff背景、#f8f1f6表面/#1c1b1d文字、#6442d6主动作；深色#141314背景、#1c1b1d表面/#e6e1e3文字。 | 按背景/surface/on-color成对切换；本地默认浅色，原用户偏好不作假设。primary-container类在首屏实际使用surface-1。 |
| 产品视频 | 9秒、4000×2000 MP4，静音循环，按钮暂停/播放。 | 同一原始MP4、元数据poster；真实media状态反馈，独立播放和全局暂停。 |
| CTA按压 | 圆角48→16px，.2s cubic-bezier(.2,0,0,1)。 | 同样变形和恢复，pointer/keyboard可操作。 |
| 资源卡聚焦/按压 | 圆角24→48px、secondary container背景，.3s同曲线。 | 保留状态、焦点与官方外链。 |
| 涟漪与全局开关 | mioRipple形成ripple元素；全局关闭动效使视频停止。 | 点击位置或键盘中心扩散，300ms为本地近似；全局暂停停止视频、过渡与涟漪。 |
| 目录 | 官网进入完整文档路由。 | 本地dialog目录与二级链接，Escape返回，真实目的地保留。 |

## 理论与约束

M3 May2025物理规范区分expressive/standard、spatial/effects，弹簧参数为stiffness/damping/initial velocity；当前首页CTA与卡片仍使用时间曲线。历史品牌指南的500/700色阶不是现M3通用规则，文档站紫色和Google Sans也不代表所有Google产品。减少动态保留所有内容与即时状态；正文改写、完整Angular路由、页尾招募/Feedback/RSS未复现。原CSS、JS和内容资源链接如下。

## 来源与材料

- [Material Design 3 当前官方首页](https://m3.material.io/)（实例）：2026-10-07英文首页：88px侧栏/64px手机顶栏、主题与暂停、真实视频、CTA与卡片圆角状态、1294px首屏断点。
- [Material：Motion physics system](https://m3.material.io/styles/motion/overview/how-it-works)（规范）：May2025物理系统：expressive/standard、spatial/effects和速度层级，与首页时间曲线区分。
- [Google Design：Expressive研究](https://design.google/library/expressive-material-design-google-research)（理论）：颜色、形状、大小、动效与容器共同引导注意和分组，并保留情境与基础可用性。
- [Google Design：品牌与Material](https://design.google/library/staying-true-to-your-identity-material-branding)（理论）：历史品牌指南的字体、图像和颜色一致性；旧色阶例子不是当前M3通用token。
- [W3C：Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)（规范）：非必要用户触发动效可关闭，自动媒体提供独立暂停。
- [官网原始CSS](https://m3.material.io/static/angular/styles.4c2805e602edc472.css) · [公开脚本](https://m3.material.io/static/angular/main.7906d9e8e8cae962.js)
- [首页内容资源](https://m3.material.io/_dsm/content/m3/2026-09-23_06-10-05/a513b32c-174e-4b85-8553-60701c021797.json)：内容更新2026-07-08，版本目录日期不作为内容创作日。

[原站对照](screenshots/google-material-clean-source.jpg) · [Demo](../demos/google-material/index.html) · [完整Prompt与设计元素](../entries/google-material.json) · [还原范围](../demos/google-material/fidelity.md) · [资产来源](../demos/google-material/assets-manifest.json)。品牌与媒体权利归原作者。
