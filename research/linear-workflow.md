# Linear — 深色产品开发系统

观察日期：2026-10-07。公开参考页：[https://linear.app/](https://linear.app/)。

## 直接观察与证据

CUA实访linear.app当前首页，h1为The product development system for teams and agents、字号64px，左对齐；说明在左、New Loops在右。紧接着是实际DOM issue演示，含Pulse/Inbox侧栏、Faster app launch、活动评论及In Progress属性。下载官网Inter、头像和黑白氛围图。

同日原站截图：[research/screenshots/linear-workflow-source.png](../research/screenshots/linear-workflow-source.png)。

## 第一方资料及交互规范

- [Linear 首页](https://linear.app/)（实例）：2026-10-07 CUA核验当前64px主标题与Faster app launch真实DOM演示。
- [Linear 2026 design refresh](https://linear.app/now/behind-the-latest-design-refresh)（理论）：2026-03-12第一方UI设计更新：导航退后、低饱和视觉、内容优先；这是应用UI叙述。
- [Linear UI redesign](https://linear.app/now/how-we-redesigned-the-linear-ui)（理论）：2024第一方应用界面改版文章，辅助理解信息层级，不作为首页组件逐项出处。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：任务与分类选择的键盘/状态参考。

2026设计更新把导航和视觉装饰退到次级，让任务内容成为焦点；该来源描述应用UI，本地仅把它用于三栏任务界面与页面信息层级。

## 分析推断

- 标题先讲产品开发系统，真实工作界面紧接着提供证据。
- 导航与边框退到次级，任务内容获得更高对比。
- 局部彩色只用于状态、标签和项目，避免全屏霓虹。
- 章节按工作流程推进，产品结构与传播叙事一致。

以上是对已观察页面的分析，除明确标注的来源内容外，不冒充官方作者意图。

## 复现映射

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 克制首屏 | 64px标题、灰色副文、New Loops入口 | 未复制原站全部动态呈现 |
| 实际任务界面 | 侧栏/正文/属性，官方头像和Inter | 四项本地任务，状态与收藏可操作 |
| 流程章节 | Triage与规划时间线 | 按官网工作流次序局部复现，非完整软件 |

## 约束与差异

- 当前首页实访与2024/2026应用UI文章分开记载。
- 黑色层次靠边框和亮度差，不靠蓝紫光晕覆盖所有内容。
- Issue界面文字保持可读；手机折叠侧栏和属性次级信息。
- 活动、状态与任务内容必须联动，不能只有按钮变色。
- 官方氛围图与Inter本地化，注册不连接账户。

官网应用截图的所有图标、评论和agent实时执行未全部复制。本地核心issue结构接近，后续收件与规划使用自建示例数据；官网完整AI/automations和发布章节未覆盖。Logo保持官方原样。

## 本地材料

- [Demo](../demos/linear-workflow/index.html)
- [完整Prompt与设计约束](../entries/linear-workflow.json)
- [素材清单](../demos/linear-workflow/assets-manifest.json)
- [还原说明](../demos/linear-workflow/fidelity.md)

私人学习记录；品牌与媒体版权保留给品牌及原作者。


## 2026-10-07 动效复审补正

实访点击三个Favorites后AX呈现任务board/insights/project，各非同一详情；实访Product hover展开，滚动Intake聊天opacity状态0/1；Mmx1Wq和agentLabelSweep源CSS。

左侧Favorites点击立即切换整种工作视图：issue/detail、三列任务board、insights、project overview；保持硬切换，不编造全局浮入。Working徽标保留2秒局部shimmer；导航mouseenter展开。

Agent tasks和Agent Insights不能只更换同一issue标题；未观察到的视图切换方向/时序不得编造。下方Intake原站消息流程只观察，当前简化Triage非完整等价。

本次原站操作、源码证据、observed/approximation/unavailable与本地实操详情见 [产品动效审计](MOTION-AUDIT-PRODUCTS.md)。旧观察的失联说明仅指早一轮，不覆盖本次成功实访；Claude和Qoder具体限制以上述复审为准。
