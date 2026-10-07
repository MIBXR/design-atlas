# 原神：版本舞台、人物换色与声线

单一来源：[Genshin Impact 英文官网](https://genshin.hoyoverse.com/en/)，采集日期 **2026-10-07**。归档对象为 7.1「A Rekviem for the Underworld」，不维护后续变更。

## 真实浏览与公开代码

首屏进入后依次向下到角色/武器、登录福利、活动日历、Xbox/Paimon、footer，再反向返回。文档滚动位置保持 0，垂直 Swiper wrapper 发生位移；1440×1000 中主要画布高度为 810，外侧留出上下空白。末尾的 footer 使用不足一个整屏的最终位移。

选择 Vesna 与 Vodyanitsa 时，立绘和姓名以 100ms opacity 变化，完整人物背景也从青绿变为蓝色，肖像与麦克风随人改变。麦克风实际加载官方音频；公开配置明确 `playMode: random`、`clickOnPlaying: pause`，英文语言包为每位角色列出 3 条 MP3。源首页只有静音循环主视觉视频，没有发现独立背景音乐。

代码依据：[公开 setups](https://act.hoyoverse.com/puzzle/hk4e/pz_5yRXZTt_wZ/setups.d850a780.js)、[公开配置](https://act.hoyoverse.com/puzzle/hk4e/pz_5yRXZTt_wZ/config.73224177.js)。这些是本次快照的佐证，不作为另一个设计版本。

## 触发 → 响应 → 目的

| 触发 | 页面响应 | 设计目的 |
| --- | --- | --- |
| 向下/向上滚轮 | 整块舞台正反位移，末尾有限位移 | 每节有完整构图与节奏，保留前后章节关系 |
| 选择人物肖像 | 100ms 立绘交叉淡化；人物与整个背景同步 | 人物拥有自己的色彩身份，而不是共用模板 |
| 点击人物麦克风 | 对应角色随机台词，再点暂停 | 用声音补充人物性格，操作和声线有明确归属 |
| 离开人物/换人 | 本地停止原台词 | 避免旧人物声音跨场景干扰 |
| 放大日历 | 本地原图 dialog | 保留官方细节，同时让小字可查询 |

## 理论与主题

群像和巨标题负责情绪，下载区域负责行动；章节换色属于信息分组和视觉层级。人物、肖像、字体、金色边饰与完整背景协同维持幻想游戏语言。此快照为固定 IP 主题，未见深浅切换；角色背景变化是人物状态，不是系统主题。

[W3C Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) 支持本地持续动画暂停，[Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) 支持本地焦点和关闭流程。这些是本地可访问性依据，不是源站已完整满足规范的结论。

## 本地范围

保留首屏、两角色、日历与 footer；其余内容章节缩减。整屏精确时长未确认，本地 600ms ease、650ms 输入锁为近似；人物 100ms 有来源依据。详情仅摘要，手机排布为适配。首屏只有 3 秒无声片段；人物 6 条真语音独立保存，未伪造 BGM。参数、Prompt、资产记录与终态预览见案例条目和 [fidelity](../demos/genshin-world/fidelity.md)。
