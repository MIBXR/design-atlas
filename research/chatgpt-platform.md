# ChatGPT：巨字、飞入拼贴与滚动交接

观察日期：2026-10-07。参考：[公开页面](https://chatgpt.com/zh-Hans-CN/overview/)。原站内容以该日期与语言版本为准。

## 设计特点与分析

中文公开页用64px导航、约88.96px五行巨字和聊天/工作/编程词选择能力。官方OpenAI Sans SC、渐变下划线、独立拼贴和同一中央产品窗口持续串联标题、体验与说明。

用户先通过词选择能力，再由同一个产品窗口把注意转向工作结果；连续状态和空间交接让信息转换可追踪。这是页面分析。

## 交互机制与复现映射

| 触发与元素 | 原站观察／公开源码 | 本地实现与差异 |
|---|---|---|
| 指针经过模式词 | 标题渐变、界面与周边素材联动；Chat7层/Work7层/Codex6层独立图层。 | pointerenter、焦点、点击和触屏使用同一控制器；进入方向与22ms交错为近似，快速切换最多一组离场图层。 |
| 图层时序 | 公开图层720ms cubic-bezier(.22,1,.36,1)，36/42/48px视差。 | 720ms进入；500ms离场与中央交叉淡化、6500ms自动周期为近似。 |
| 向下浏览 | intro→handoff→accordion；2000px+100svh长段；中央窗口向右下移，左模式说明显现。 | 先使拼贴淡出并缩至.96，再交接同一窗口；连续插值按关键帧拟合，不接管滚轮。 |
| 模式说明 | 500/1000/1500px分段参考，聊天/工作/Codex随浏览切换。 | 点击与方向键/Home/End联动自然滚动，当前项和进度线同步。 |
| 用途浏览 | 七用途真实图片横向卡片架。 | 官方图片、前后按钮及原生横滑；正文缩写。 |

## 原站关键帧

![首屏：五行巨字与模式词](screenshots/chatgpt-official-initial.jpg)
![工作模式：周边素材独立围绕中央界面](screenshots/chatgpt-work-scroll.jpg)
![交接阶段：拼贴退场，中央窗口继续移动](screenshots/chatgpt-handoff.jpg)
![模式栏：窗口移向右侧，左侧说明显现](screenshots/chatgpt-mode-rail.jpg)

[源站几何与滚动证据](chatgpt-motion-evidence.json)记录图层坐标、比例、旋转、视差和阶段读值；与本地插值规则分别保存。

## 理论与约束

原站完整JS未取得，连续插值、进出方向与自动周期不能称同源实现。手机与减少动态采用顺序布局，取消自动、视差和长段，所有内容可访问；暂停控制装饰与自动切换。账户、价格、安全文章和完整故事未全量复现。图层参数见本地代码[motion-data.js](../demos/chatgpt-platform/motion-data.js)。

## 来源与材料

- [ChatGPT 中文公开介绍页](https://chatgpt.com/zh-Hans-CN/overview/)（实例）：2026-10-07中文页：指针模式切换、三组独立图层、窗口交接和左模式栏；DOM记录坐标、720ms曲线、视差与500px分段。
- [ChatGPT 英文介绍内容](https://chatgpt.com/overview/)（实例）：同日英文正文的Chat/Work/Codex能力架构。
- [OpenAI Design Guidelines](https://openai.com/brand/)（规范）：字标比例、留白和OpenAI Sans的几何与人文品牌语气。
- [WAI Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)（规范）：左侧说明的展开状态和原生button语义；方向键及Home/End为本地增强。

[原站对照](screenshots/chatgpt-official-initial.jpg) · [Demo](../demos/chatgpt-platform/index.html) · [完整Prompt与设计元素](../entries/chatgpt-platform.json) · [还原范围](../demos/chatgpt-platform/fidelity.md) · [资产来源](../demos/chatgpt-platform/assets-manifest.json)。品牌与媒体权利归原作者。
