# Linear：局部还原范围

参考：[Linear首页](https://linear.app/)，2026-10-07。

| 区域 | 本地保留 | 近似／未覆盖 |
|---|---|---|
| 首屏 | 64px左标题、灰色副文、New Loops、官方Inter与头像 | 后续氛围图为精选范围 |
| Favorites | issue详情、三列11任务、insights统计/六行表、project overview四种结构 | 直接切换；图形分布局部近似，任务/资源反馈为本地扩展 |
| 状态与菜单 | issue收藏/状态/Run agent；指针展开导航；Working局部扫光 | 扫光2秒来自源CSS，160ms菜单入场近似；不执行真实agent |
| 工作流 | Triage与规划时间线 | 原Intake分阶段消息、浮动agent、完整AI/automations和发布未移植 |

手机收束侧栏和属性，核心任务仍可阅读；减少动态关闭扫光与过渡。真实注册和工作空间不接入。

[设计与交互依据](../../research/linear-workflow.md) · [资产来源](assets-manifest.json)。品牌与媒体权利归原作者。
