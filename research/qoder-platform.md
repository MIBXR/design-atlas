# Qoder — 绿色工作台与多形态平台

观察日期：2026-10-07。公开参考页：[https://qoder.cn/](https://qoder.cn/)。

## 直接观察与证据

初次 Edge 观察国际版后，Root 在 IAB 经 “Visit China Site” 实访并核验 https://qoder.cn/。本案例最终使用中国站版本与清洁1280×720截图：约66px导航、Qoder CN黑字标、36px左标题和右说明；无国际版促销/Qwen条，首屏工作台满幅强绿且无外层圆角。原始国际版资产仅作为官方产品界面素材来源，后续平台/协作节是局部交互研究，不能视为整个CN站逐像素观察。

## 第一方资料及交互规范

- [Qoder 中国站](https://qoder.cn/)（实例）：Root IAB 实访并保存清洁桌面截图，当前首屏按CN版统一；本地390px适配经CUA测试，后续平台章节是官方素材与局部机制研究。
- [Qoder 产品族官方定义](https://docs.qoder.com/product-series/what-is-qoder)（理论）：第一方文档说明理解/计划/执行/验证/迭代与多形态产品族；属于产品理论，不是假称官网视觉作者意图。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：模式与平台切换的语义、选择状态和键盘方向键参考。

Qoder第一方产品族文档给出从理解任务到计划、执行、验证和迭代的循环，并明确各形态职责；本地把此循环用于任务预览与多平台信息架构。视觉舒适/绿色语气为观察推断，不冒充官方设计哲学。

## 分析推断

- 主标题与说明分居两侧，产品工作台成为最主要的视觉证据。
- 绿色大面承托真实桌面界面，品牌色与代码任务保持区分。
- 桌面/移动/IDE/插件/CLI并列呈现不同使用入口。
- 智能体协作以分工和流程说明，不能只用抽象节点图。

以上是对已观察页面的分析，除明确标注的来源内容外，不冒充官方作者意图。

## 复现映射

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 左右首屏与大面UI | 36px标题、满幅强绿背景内桌面工作区 | UI本地HTML结构复建，数据为示例 |
| 五形态入口 | 平台tab和官方SVG/移动截图 | IDE/CLI局部框架用HTML绘制 |
| 智能体工作循环 | 本地任务回执、协作展开 | 不执行在线AI任务 |

## 约束与差异

- country用于中文/中国参考分组，不作为司法注册地断言。
- 真实Qoder标识与平台图本地保存，不自行画替代logo。
- 任务与智能体只做固定本地预览，不声称调用模型。
- 手机核心界面重新排版，隐藏原桌面次级侧栏。
- 首屏观察是2026-10-07中文版本；活动和平台能力为日期快照。

未取得Instrument Sans字体文件，明确使用系统字体回退。官方平台SVG是背景插画，产品窗口是本地DOM局部复建；未覆盖原站完整Agent SDK、QoderWake、全部案例和企业条款。country仅为中文参考归类。

## 本地材料

- [Demo](../demos/qoder-platform/index.html)
- [完整Prompt与设计约束](../entries/qoder-platform.json)
- [素材清单](../demos/qoder-platform/assets-manifest.json)
- [还原说明](../demos/qoder-platform/fidelity.md)

私人学习记录；品牌与媒体版权保留给品牌及原作者。


## 版本统一与2026-10-07补正

Root通过国际站可见Visit China Site入口实访[中国站](https://qoder.cn/)并保存无遮挡原站截图。首屏最终统一CN版：移除国际版促销/Qwen标签，使用官网Qoder CN黑色PNG字标（1632×344）、约66px导航、110px起左侧双行标题/右侧说明，工作台背景为无圆角满幅强绿。之前调研国际版的信息不能作为CN版所有后续区域的完整观察证据。五形态图像来源、平台切换和协作步骤仅是本地局部机制研究，不宣称后续内容/布局逐区等同CN原站。


## 2026-10-07 动效复审补正

首屏公开实访后Edge显示账号/项目内容，下一步按钮操作自动审批拒绝，未重试。匿名无cookie SSR/2071脚本200验证public ProductShowcase speed400/auto20000/onClick/tab/mobile；root干净IAB只读取得HeroMotionEmbed时间。

公开五平台showcase源码为400ms水平carousel、20秒auto、mouseenter暂停；本地切换方向/点控/手机滑动对应这一个组件。公开hero dash-flow/breathe时间迁移为局部SVG近似；模式动作原站未完成验证。

五平台ProductShowcase是400ms/20秒Swiper，不能误套四项FeatureSection的150ms纵向出入/10秒hover循环；源演示按钮操作被自动审批拒绝，本次不宣称click结果实访。

本次原站操作、源码证据、observed/approximation/unavailable与本地实操详情见 [产品动效审计](MOTION-AUDIT-PRODUCTS.md)。旧观察的失联说明仅指早一轮，不覆盖本次成功实访；Claude和Qoder具体限制以上述复审为准。
