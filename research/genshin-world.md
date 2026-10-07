# 原神 · 版本群像与角色舞台

观察日期：**2026-10-07**。对象为[对应官方页面](https://genshin.hoyoverse.com/en/)的指定地区与版本，国别字段用于参考机构或创作者来源检索，不推断国家有固定风格。

## 参考与证据

- [Genshin Impact · 当前国际官网根入口](https://genshin.hoyoverse.com/en/)（实例）：2026-10-07：国际根入口为7.1专题，深红群像、青绿角色舞台与活动日历。
- [W3C · Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)（规范）：持续自动动态应有暂停；本地背景视频可持续停止，减少动态初始停止。
- [W3C · Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)（规范）：本地原生dialog的键盘、关闭与焦点语义参考，不代表原站完整遵循此模式。
- [官方公开交互脚本 · 2026-10-07](https://act.hoyoverse.com/puzzle/hk4e/pz_5yRXZTt_wZ/setups.d850a780.js)（实例）：2026-10-07：垂直Swiper位移而document.scrollY为0；角色opacity有100ms过渡。本地scroll-snap为近似，第二角色姓名仍未核验。

[原站首屏](screenshots/genshin-world-source.jpg) · [本地桌面](../previews/genshin-world.jpg) · [本地手机](../previews/mobile/genshin-world.jpg)

## 构成与设计分析

**可观察事实：**2026-10-07国际根入口展示7.1版本专题：深红暗紫群像与大幅衬线主题图，之后换为青绿浅金角色舞台和活动日历。原站垂直Swiper移动舞台而不是改变document.scrollY；角色选择以100ms opacity变化切换立绘与简介。

**本库分析：**章节色调变化区分版本剧情、人物和活动时间；右侧巨立绘与左侧身份信息形成不同于首屏群像的视觉任务。装饰环、尖角按钮和星芒维持幻想主题，文案不应遮盖人物脸部。

| 维度 | 设计职责与约束 |
|---|---|
| 配色 | 深红暗紫群像与青绿、浅金角色舞台；衬线与星芒、圆环、尖角纹样呈现幻想冒险。 |
| 字体 | 官方大幅衬线主题图，角色名用Georgia；说明用系统无衬线 |
| 版式 | 全幅群像专题；青绿独立人物舞台；装饰框内活动日历 |
| 素材 | 当前官网3秒静音主视觉视频、官方标题/Logo、两张角色立绘、官方日历。 |
| 形状 | 红色播放圆环、金色菱角按钮、青绿圆轨与装饰分隔组成幻想语汇。 |
| 层级 | 版本剧情群像 → 下载与版本号 → 角色展示 → 活动日历。 |
| 动态 | 角色立绘100ms交叉淡化对应原站可见opacity时序；桌面原生scroll-snap近似垂直Swiper，手机自然滚动；首屏视频可暂停、离屏停止。 |
| 整体关系 | 色调随版本/角色章节转换，人物图与幻想纹样统一；信息和操作保留清晰的固定层级。 |

## 动态机制与本地映射

| 区域 | 原站依据 | 最终本地实现与差异 |
|---|---|---|
| 章节 | 垂直Swiper可见约-939px位移，document.scrollY为0。 | 桌面原生scroll-snap近似整屏节奏；手机自然长文档，不重建锁定滚轮的Swiper。 |
| 角色 | 前一角色opacity归0，100ms过渡后第二人物与Water Imp简介出现。 | 两张官方立绘100ms交叉淡化，名称/简介同步；第一人Vesna，第二姓名未核验，明确标为“官方第二角色”。 |
| 媒体与详情 | 官方版本影像、角色资料与日历组成不同模块。 | 3秒主视觉MP4无音轨，可持续暂停、离屏/后台停止，减少动态初始停止；角色详情及日历放大用原生dialog，Escape关闭。 |

没有完整Swiper锁屏、技能/武器、完整版本弹层及第二角色的确定姓名。第二人物简介仅保留已观察文本，不补写未核验技能；无声主视觉不冒称有声PV或BGM。

## 复用约束

- 以2026-10-07国际根入口7.1专题为准，仅复现版本群像、两角色与活动日历。
- 品牌美术版权归 HoYoverse/miHoYo，使用范围为用户授权私人研究。
- 本地主视觉mp4只有3秒且无音轨，不标作原站有声PV。
- 未完成第二角色文字资料核验时明确边界，不编造姓名或技能。
- 手机重新排人物和文字，不缩小整张桌面海报。
- 日历文字来自官方图片，替代文字明确用途并可放大。

规范来源用于本地交互约束；除明确标注的第一方自述外，设计理念解释均为本库对选定样本的分析，不冒充品牌作者声明或整站合规结论。

## 复用入口

完整可复用描述见[Prompt](../prompts/genshin-world.md)，结构化信息见[案例条目](../entries/genshin-world.json)。[独立Demo](../demos/genshin-world/index.html)、[对应范围](../demos/genshin-world/fidelity.md)与[资产来源清单](../demos/genshin-world/assets-manifest.json)保留实现、媒体来源和限制；正文不重复一份完整Prompt。
