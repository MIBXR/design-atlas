# Notion — 插画与真实工作空间

观察日期：2026-10-07。公开参考页：[https://www.notion.com/](https://www.notion.com/)。

## 直接观察与证据

现有2026-10-07官方首屏截图显示居中94px左右巨字、Think浅蓝胶囊、蓝色行动和围绕Ramp HQ的手绘人物。匿名官网HTML核验产品视频、移动端图片、capture/find/automate三组真实素材及NotionInter字体。新一轮Edge导航出现ERR_CONNECTION_CLOSED，因此不把失败页称为实访完成；布局依据同日已有官方截图、HTML和第一方正文。

同日原站截图：[research/screenshots/notion-editorial-source.png](../research/screenshots/notion-editorial-source.png)。

## 第一方资料及交互规范

- [Notion 当前首页](https://www.notion.com/)（实例）：官方web正文、匿名HTML与早先保存的干净首屏截图核验；本轮Edge连接关闭，未当作新视觉观察。
- [Notion brand campaign](https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign)（理论）：2024第一方文章解释插画驱动、手势感和故事性；不等同于2026首页的全部设计说明。
- [Notion page design update](https://www.notion.com/blog/updating-the-design-of-notion-pages)（理论）：2026-03-18应用页面的阅读间距、列表分组；仅迁移至本地工作空间示例。

2024品牌活动文章解释插画的叙事情境；2026页面排版更新解释文档阅读节奏。两篇来源分别属于品牌传播和应用编辑界面，本地记录其局部映射，不推断全部首页作者意图。

## 分析推断

- 居中巨字先建立团队与AI的共同工作主题。
- 手绘人物与产品界面一起出现，情境与工具互相解释。
- 浅蓝动词与蓝色行动建立有限、清楚的视觉重点。
- 功能说明使用真实文档界面，避免插画替代功能证据。

以上是对已观察页面的分析，除明确标注的来源内容外，不冒充官方作者意图。

## 复现映射

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 巨字与动词高亮 | 94px标题、浅蓝胶囊、官网字体 | 动词采用点击切换，未重建全部自动动画 |
| 人文产品展示 | 官方hero视频/poster和mobile图 | 视频静音，可暂停 |
| 三种工作能力 | 官网capture/find/automate图片 + 本地示例弹窗 | 真实功能图片、模拟文档数据分开 |

## 约束与差异

- 首屏必须采用真实官方插画/产品素材，不画一个泛用纸片人物代替。
- 品牌活动文章和Notion应用排版更新的适用范围注明。
- 使用NotionInter本地字体，字标与插画不拉伸。
- 视频默认静音；reduced motion默认暂停。
- 手机用官网移动端图，功能区纵向重排，操作不依赖hover。

首屏核心构图和素材保持真实。后续功能文案为概述，部分功能背景与文档示例为局部迁移，不称整站像素级复制；未还原所有客户墙、真实搜索和agent执行。

## 本地材料

- [Demo](../demos/notion-editorial/index.html)
- [完整Prompt与设计约束](../entries/notion-editorial.json)
- [素材清单](../demos/notion-editorial/assets-manifest.json)
- [还原说明](../demos/notion-editorial/fidelity.md)

私人学习记录；品牌与媒体版权保留给品牌及原作者。


## 2026-10-07 动效复审补正

Edge实访首屏、Product点击、滚动两列bento及Pause→Play；公开脚本取得6词2500ms、源CSS宽度300ms与ease-in-out-quint。

动作词按官方脚本Think/Ship/Create/Build/Jam/Scale每2500ms轮换；胶囊label宽度300ms cubic-bezier(.86,0,.07,1)。官方10.967秒视频自然循环，滚出视口仍播放，按钮真实暂停。无通用reveal。

原站动作胶囊是自动label轮换而非只点击的三词选择；视频不是scroll-scrub，也不应因下滚任意暂停。动态标题不持续aria-live广播。

本次原站操作、源码证据、observed/approximation/unavailable与本地实操详情见 [产品动效审计](MOTION-AUDIT-PRODUCTS.md)。旧观察的失联说明仅指早一轮，不覆盖本次成功实访；Claude和Qoder具体限制以上述复审为准。
