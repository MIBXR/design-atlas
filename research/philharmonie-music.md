# 巴黎爱乐厅 · 音乐展与音乐会详情

观察日期：**2026-10-07**。对象为[对应官方页面](https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music)的指定地区与版本，国别字段用于参考机构或创作者来源检索，不推断国家有固定风格。

## 参考与证据

- [Video Games & Music exhibition — official detail](https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music)（实例）：2026-10-07：展览日期2026.04.02–11.01、蓝色主图、顺序现场照片、票务时间/价格折叠。
- [Philharmonie saison 26/27](https://philharmoniedeparis.fr/fr/programmation/saison-26-27)（实例）：2026-10-07官方26/27季节目，用于定位具体音乐会，不将所有场次视为未结束事件。
- [Carte blanche à George Benjamin — official detail](https://philharmoniedeparis.fr/fr/activite/concert/29485-carte-blanche-george-benjamin)（实例）：2026-10-07：George Benjamin场次2026.10.23 20h00，四部节目、阵容与三名人物摄影；500ms横轨可观察，自动周期未取得。
- [W3C WAI Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)（规范）：原生details与展开状态的实现参考，不证明场馆遵循整个APG或已全面合规。

[原站首屏](screenshots/philharmonie-music-source.jpg) · [本地桌面](../previews/philharmonie-music.jpg) · [本地手机](../previews/mobile/philharmonie-music.jpg)

## 构成与设计分析

**可观察事实：**参考法语Video Games & Music展览详情及独立George Benjamin音乐会详情。双层导航中轴悬挂官方字标，展览蓝色宽幅主视觉下缘是活动名与日期，右侧白色票务面板上浮并在桌面sticky。两张Joachim Bertrand展览照片顺序穿插正文；Horaires/Tarifs/Infos Accessibilité可折叠。音乐会三名人物摄影才使用前后/暂停水平滑轨。

**本库分析：**展览用现场图解释互动体验，音乐会用人物、阵容及节目单表达演出；相同机构层稳定身份，内容结构保持差别。配色以第一方CSS的海军蓝#001b3b、白、票务#be244f和支持#fdafe3为依据，参考截图的显示条件不作为原始配色证据。

| 维度 | 设计职责与约束 |
|---|---|
| 配色 | 官方CSS核验海军蓝#001b3b、白色面板、#be244f票务和#fdafe3支持入口。 |
| 字体 | 官方Philharmonique标题大写，正文保持分段；原站部分正文Source Sans Pro，本地该部分有字体差异。 |
| 版式 | 主视觉左下活动名，右侧票务面板上浮；长正文与侧栏分工，手机票务回到文档流。 |
| 素材 | 官方游戏手柄字母CG、Joachim Bertrand两张展览现场图，以及Matthew Lloyd、Capucine DeChocqueuse、Franck Ferville署名的三位音乐会艺术家摄影。 |
| 形状 | 品牌标识下垂矩形、16px圆角内容/票务块、长胶囊按钮；非所有内容统一卡片。 |
| 层级 | 大活动名和日期识别主题，预约按钮和折叠时间/价格解决到访问题，照片和节目单提供内容深度。 |
| 动态 | 展览摄影为顺序静图；音乐会三人摄影500ms横轨对应观察时长，ease/6秒周期为本地近似。侧栏native details、自然滚动，减少动态仅手动即时切换。 |
| 整体关系 | 统一中轴品牌与蓝色基础，展览用互动现场图、音乐会用阵容/节目单，跨内容类型保持不同表达。 |

## 动态机制与本地映射

| 区域 | 原站依据 | 最终本地实现与差异 |
|---|---|---|
| 展览摄影与票务 | 2026.04.02–11.01；两张展览照片按顺序阅读，侧栏Horaires/Tarifs等可展开。 | 保留两个静态摄影块与原生details；15/11/9/6欧价格为快照，预订按钮指向官方。手机票务进入正常流，不盖住正文。 |
| 音乐会滑轨 | 2026.10.23 20h00，约2小时含一次中场；人物摄影水平过渡500ms，Next/Previous/Pause可操作。自动间隔和精确ease未取得。 | George Benjamin/Ayano Kamei/John Stulz三图500ms ease横轨，6秒自动周期为本地近似；指针/焦点/离屏/后台暂停，触摸和手动按钮可切换。 |
| 节目与声音 | 音乐会四部节目与阵容可展开；原站视频受第三方cookie控制，有官方Playlist入口。 | Programme & distribution原生details，相关音乐会作为内联小组件，不冒称独立详情整页；Playlist官方外链，不加载追踪或伪造音轨。 |

没有全部长文、合作方、账户/订阅与售票后台，未内嵌第三方视频。标题用官方Philharmonique大写字形，因其缺普通小写不用于正文；本地Arial近似原站Source Sans Pro。展览摄影无轮播，音乐会6秒/ease和缩小的相关区域均为局部适配。

## 复用约束

- 使用官方Video Games & Music主图、展览摄影、George Benjamin摄影与sprite品牌标识。
- 桌面主图625px高，左正文约2/3，右侧白色16px圆角票务面板跨越主图和内容边界。
- 手机导航精简，票务面板进入正常流优先显示，不粘在窄屏覆盖正文。
- 音乐会为2026.10.23 20h00的George Benjamin场次，日期/阵容/节目按2026-10-07官方快照。
- 原站视频受第三方cookie控制，本地不嵌入YouTube或追踪脚本。
- 自然滚动；展览摄影静态顺序阅读，音乐会滑轨可暂停，减少动态仅手动即时切换。

规范来源用于本地交互约束；除明确标注的第一方自述外，设计理念解释均为本库对选定样本的分析，不冒充品牌作者声明或整站合规结论。

## 复用入口

完整可复用描述见[Prompt](../prompts/philharmonie-music.md)，结构化信息见[案例条目](../entries/philharmonie-music.json)。[独立Demo](../demos/philharmonie-music/index.html)、[对应范围](../demos/philharmonie-music/fidelity.md)与[资产来源清单](../demos/philharmonie-music/assets-manifest.json)保留实现、媒体来源和限制；正文不重复一份完整Prompt。
