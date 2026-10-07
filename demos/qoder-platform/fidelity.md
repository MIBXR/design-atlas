# Qoder — 绿色工作台与多形态平台 · 局部还原说明

参考URL：[https://qoder.cn/](https://qoder.cn/)

版本：2026-10-07公开营销页。implementation: reference-study。

## 观察依据

初次观察国际版后，经 Root 在 IAB 点击官网 “Visit China Site” 实访 https://qoder.cn/，已统一以中国站为本案例参考版本。清洁官网截图1280×720保存于 research/screenshots/qoder-platform-source.jpg：Qoder CN黑色字标、约66px导航、36px双行左标题与右说明，首屏无促销条或Qwen标签；工作台强绿背景从约y332开始满幅铺开，无外层圆角。品牌CN字标来自当前官网公开1632×344 PNG。以下产品平台SVG与移动端图来自官方公开素材库，后续章节只局部研究交互，不声称逐项复制CN首页。

## 局部还原范围

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 左右首屏与大面UI | 36px标题、浅绿背景内桌面工作区 | UI本地HTML结构复建，数据为示例 |
| 五形态入口 | 平台tab和官方SVG/移动截图 | IDE/CLI局部框架用HTML绘制 |
| 智能体工作循环 | 本地任务回执、协作展开 | 不执行在线AI任务 |

## 交互对照

- 编码/通用模式切换改变标题、提示与任务语境。
- 输入任务并提交给出本地执行预览，侧栏入口和新工作区有反馈。
- 五种平台tabs同步切换说明、官方图与预览；协作流程可展开；下载弹窗可选择OS。

所有账户/订阅/服务端操作均止于本地弹窗或示例反馈；官网入口由用户自行访问。原站机制的具体点击结果未逐一完成端到端验证，不能称整站功能克隆。

## 差异

未取得Instrument Sans字体文件，明确使用系统字体回退。官方平台SVG是背景插画，产品窗口是本地DOM局部复建；未覆盖原站完整Agent SDK、QoderWake、全部案例和企业条款。country仅为中文参考归类。

手机根据观察或合理响应式适配；所有页面自然滚动并包含prefers-reduced-motion，视频有暂停。浏览器最终像素QA由主任务统一执行，本文件不把静态检查称为完整视觉验收。

## 资产

详见[assets-manifest.json](assets-manifest.json)。图片、视频、字体、商标原样或按比例显示。素材归品牌与原作者，仅本地私人学习，不代表授权、合作或正式网站。


## 版本统一与2026-10-07补正

Root通过国际站可见Visit China Site入口实访[中国站](https://qoder.cn/)并保存无遮挡原站截图。首屏最终统一CN版：移除国际版促销/Qwen标签，使用官网Qoder CN黑色PNG字标（1632×344）、约66px导航、110px起左侧双行标题/右侧说明，工作台背景为无圆角满幅强绿。之前调研国际版的信息不能作为CN版所有后续区域的完整观察证据。五形态图像来源、平台切换和协作步骤仅是本地局部机制研究，不宣称后续内容/布局逐区等同CN原站。


## 2026-10-07 动效复审（当前实现）

公开五平台showcase源码为400ms水平carousel、20秒auto、mouseenter暂停；本地切换方向/点控/手机滑动对应这一个组件。公开hero dash-flow/breathe时间迁移为局部SVG近似；模式动作原站未完成验证。

证据：首屏公开实访后Edge显示账号/项目内容，下一步按钮操作自动审批拒绝，未重试。匿名无cookie SSR/2071脚本200验证public ProductShowcase speed400/auto20000/onClick/tab/mobile；root干净IAB只读取得HeroMotionEmbed时间。

边界：五平台ProductShowcase是400ms/20秒Swiper，不能误套四项FeatureSection的150ms纵向出入/10秒hover循环；源演示按钮操作被自动审批拒绝，本次不宣称click结果实访。

详情和实操记录见 [产品动效审计](../../research/MOTION-AUDIT-PRODUCTS.md)。本地增加 darkreader-lock meta 保护官方配色，这是本地适配，不作为原站观察。
