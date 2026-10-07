# Linear — 深色产品开发系统 · 局部还原说明

参考URL：[https://linear.app/](https://linear.app/)

版本：2026-10-07公开营销页。implementation: reference-study。

## 观察依据

CUA实访linear.app当前首页，h1为The product development system for teams and agents、字号64px，左对齐；说明在左、New Loops在右。紧接着是实际DOM issue演示，含Pulse/Inbox侧栏、Faster app launch、活动评论及In Progress属性。下载官网Inter、头像和黑白氛围图。

## 局部还原范围

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 克制首屏 | 64px标题、灰色副文、New Loops入口 | 未复制原站全部动态呈现 |
| 实际任务界面 | 侧栏/正文/属性，官方头像和Inter | 四项本地任务，状态与收藏可操作 |
| 流程章节 | Triage与规划时间线 | 按官网工作流次序局部复现，非完整软件 |

## 交互对照

- 侧栏四项任务与上下箭头切换任务标题、说明和编号。
- 状态下拉、收藏、Run agent改变本地任务状态和活动反馈。
- Triage三项请求可接受/退回；顶部导航与注册按钮展示分类面板和本地弹窗。

所有账户/订阅/服务端操作均止于本地弹窗或示例反馈；官网入口由用户自行访问。原站机制的具体点击结果未逐一完成端到端验证，不能称整站功能克隆。

## 差异

官网应用截图的所有图标、评论和agent实时执行未全部复制。本地核心issue结构接近，后续收件与规划使用自建示例数据；官网完整AI/automations和发布章节未覆盖。Logo保持官方原样。

手机根据观察或合理响应式适配；所有页面自然滚动并包含prefers-reduced-motion，视频有暂停。浏览器最终像素QA由主任务统一执行，本文件不把静态检查称为完整视觉验收。

## 资产

详见[assets-manifest.json](assets-manifest.json)。图片、视频、字体、商标原样或按比例显示。素材归品牌与原作者，仅本地私人学习，不代表授权、合作或正式网站。


## 2026-10-07 动效复审（当前实现）

左侧Favorites点击立即切换整种工作视图：issue/detail、三列任务board、insights、project overview；保持硬切换，不编造全局浮入。Working徽标保留2秒局部shimmer；导航mouseenter展开。

证据：实访点击三个Favorites后AX呈现任务board/insights/project，各非同一详情；实访Product hover展开，滚动Intake聊天opacity状态0/1；Mmx1Wq和agentLabelSweep源CSS。

边界：Agent tasks和Agent Insights不能只更换同一issue标题；未观察到的视图切换方向/时序不得编造。下方Intake原站消息流程只观察，当前简化Triage非完整等价。

详情和实操记录见 [产品动效审计](../../research/MOTION-AUDIT-PRODUCTS.md)。本地增加 darkreader-lock meta 保护官方配色，这是本地适配，不作为原站观察。
