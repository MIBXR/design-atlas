# Linear：克制的工作流精度

核验日期：2026-10-07。

## 直接观察

[Linear官网](https://linear.app/) 首屏见 screenshots/linear-workflow-source.png：接近黑色背景、左对齐标题和宽幅真实工作UI。截图拍摄时界面处于低亮度氛围状态，因此demo不将其暗度应用到可操作文字。正文按接收需求、规划、构建等工作阶段组织信息。

## 第一方设计依据

[2024 UI redesign](https://linear.app/now/how-we-redesigned-the-linear-ui) 将减少视觉噪音、维持对齐和增加层级列为目标。[2026 calmer refresh](https://linear.app/now/behind-the-latest-design-refresh) 进一步解释辅助导航降低权重、弱化分隔线、降低饱和度的暖灰方案。两篇谈的是产品UI，不直接规定营销页。

设计推断：把真实任务对象嵌入营销场景，比只写“高效”更容易让人理解产品承诺；辅助元素退后使密集信息仍能聚焦。

## 实现映射

|依据|本地实现|检验方式|
|---|---|---|
|导航退后|低权重侧栏+高对比任务内容|选中任务清晰|
|真实工作对象|任务编号、状态、验收条件、负责人|点击任务详情同步|
|动作为工作服务|推进状态并同步进度|待办→进行中→完成可重复|
|层级与密度|稳定行高、轻分隔线、明确标题|手机上正文仍可读|

## 约束与边界

品牌VECTOR与任务均为原创虚构。官网截图用来观察结构，不能当作本demo完成图。未复刻官网动画或应用所有能力。可操作工作区优先足够对比与明确状态文字，不能为了“安静”牺牲可读性。筛选后的空列表有说明。

代码：../demos/linear-workflow/index.html；Prompt：../entries/linear-workflow.json。
