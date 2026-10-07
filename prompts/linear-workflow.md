# Linear — 深色产品开发系统 · 复用 Prompt

由 [结构化案例](../entries/linear-workflow.json) 自动生成。参考观察与具体边界见 [调研](../research/linear-workflow.md)。

## 正向 Prompt

基于【官网URL】在【观察日期】的Linear首页制作局部学习页。保留接近黑的背景、64px左对齐标题、灰色副文、New Loops入口与细分隔线，使用官方Inter、品牌SVG、头像和氛围图。标题下重建侧栏、任务正文、活动评论、属性三栏，颜色仅标识项目和状态。Favorites必须切换四种独立结构：Faster app launch的issue详情；Offline Mode/Core Performance/UI Refresh三列11项任务看板；3389/1128/729统计、柱图与六行项目表；项目overview及Properties/Resources。采用直接切换，保留任务上下箭头、收藏、状态和Run agent本地反馈；任务及项目资源不能伪装成远程执行。Working标签保留源CSS证实的2秒linear局部文字扫光。Product指针进入展开，点击与键盘可操作，Escape和外部点击关闭且同步aria-expanded；160ms缩放淡入是本地近似。后续Triage与规划时间线使用不同结构，说明原Intake消息分阶段显现和浮动agent面板未完整复现。手机收束侧栏与次级属性，正文仍可读；保留自然滚动、可见焦点、可关闭弹窗和prefers-reduced-motion。资产本地化并记录来源、尺寸与权利；应用UI设计文章的层级原则与当前营销页事实分开。用于【目标开发工具】时重新组织其真实任务流程。

## 负向约束

不要虚构品牌或素材；不要复制通用Hero+三卡片模板；不要用抽象blob替代真实产品界面；不要接管滚轮；不要把历史文章说成当前观察；不要伪装真实账户、支付或AI执行。

## 制作约束

- 当前首页与2024/2026应用UI设计文章区分来源范围。
- 暗色层次依靠亮度和边框；项目/状态色承担信息功能。
- 四类工作视图保持各自结构，任务内容与状态联动。
- Intake完整消息编排、agent浮窗和实时执行未覆盖。
- 手机收束侧栏与次级属性；减少动态关闭局部扫光。
- 资源、任务执行与注册使用本地反馈，真实服务以官网为准。

## 检查方法

以同一来源截图为基准，改变一个局部信息层级并记录对比：标题/图片比例、主按钮或状态反馈。保持品牌素材比例和移动端可读性。

[查看 Demo](../demos/linear-workflow/index.html) · [返回参考库](../index.html#style/linear-workflow)
