# Linear — 深色产品开发系统 · 复用 Prompt

由 [结构化案例](../entries/linear-workflow.json) 自动生成。参考观察与具体边界见 [调研](../research/linear-workflow.md)。

## 正向 Prompt

基于【官网URL】在【观察日期】的Linear首页制作局部学习页面。先核验主标题、issue演示和工作流章节，保持官网64px左对齐标题、接近黑的背景、灰色副文和细分隔线，不加入泛用大渐变球。使用本地官方Inter、品牌SVG、人物头像和实际氛围图。首屏下方重建侧栏、任务正文、活动评论、属性三栏，所有字体与边框保持克制，状态颜色只承担信息功能。侧栏任务和上下箭头改变标题说明编号；状态、收藏、agent示例有可见反馈。后续至少展示收件Triage和规划时间线，各自结构不同。手机折叠侧栏与次级属性，核心任务仍可阅读操作；导航可展开、Esc关闭弹窗、焦点可见、自然滚动、reduced motion。记录从原站观察到的事实与自建数据的边界，列出未复现的服务器功能。复用于【目标开发工具】时先依据真实工作流重组任务内容。

动效补正：Favorites的Faster app launch/Agent tasks/Agent Insights/UI Refresh必须切为四种不同DOM视图，分别issue详情、Offline/Core Performance/UI Refresh三列任务看板、统计与项目表、项目overview；source视图切换未测得额外动画，采用直接替换。Working徽标可使用原CSS证实的2秒linear shimmer，减弱动画关闭。Product和Resourcesmouseenter展开导航，保持160ms局部缩放淡入；所有关闭路径同步aria-expanded。任务选择和项目资源提供本地回执，不能伪称真实后端。原站Intake Slack消息分阶段显现的完整编排、Agent浮窗和全部图表未覆盖时写入fidelity，不以统一reveal替代。

## 负向约束

不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。

## 制作约束

- 当前首页实访与2024/2026应用UI文章分开记载。
- 黑色层次靠边框和亮度差，不靠蓝紫光晕覆盖所有内容。
- Issue界面文字保持可读；手机折叠侧栏和属性次级信息。
- 活动、状态与任务内容必须联动，不能只有按钮变色。
- 官方氛围图与Inter本地化，注册不连接账户。
- Agent tasks和Agent Insights不能只更换同一issue标题；未观察到的视图切换方向/时序不得编造。下方Intake原站消息流程只观察，当前简化Triage非完整等价。

## 检查方法

以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。

[查看 Demo](../demos/linear-workflow/index.html) · [返回参考库](../index.html#style/linear-workflow)
