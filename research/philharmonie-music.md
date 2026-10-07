# 巴黎爱乐厅 · 音乐展与音乐会详情

观察：**2026-10-07**。[真实页面](https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music)。国家／地区指参考机构来源，不概括一个国家的所有设计。

## 观察范围与来源

展览页入口到页尾及反向、实际Horaires展开和主菜单；音乐会真实390px全程、暂停／Next与500ms轨道检查。

- [Video Games & Music exhibition — official detail](https://philharmoniedeparis.fr/fr/activite/exposition/28822-video-games-music)（实例）：2026-10-07：展览日期2026.04.02–11.01、蓝色主图、顺序现场照片、票务时间/价格折叠。
- [Philharmonie saison 26/27](https://philharmoniedeparis.fr/fr/programmation/saison-26-27)（实例）：2026-10-07官方26/27季节目，用于定位具体音乐会，不将所有场次视为未结束事件。
- [Carte blanche à George Benjamin — official detail](https://philharmoniedeparis.fr/fr/activite/concert/29485-carte-blanche-george-benjamin)（实例）：2026-10-07：George Benjamin场次2026.10.23 20h00，四部节目、阵容与三名人物摄影；500ms横轨可观察，自动周期未取得。
- [W3C WAI Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)（规范）：原生details与展开状态的实现参考，不证明场馆遵循整个APG或已全面合规。

## 构成与设计逻辑

法语活动详情以蓝色主视觉、中轴品牌和上浮票务侧栏呈现音乐展；顺序现场摄影与George Benjamin音乐会人物滑轨承担不同内容。

以下构成职责是本库对观察的分析，时序和动作分别在下一表注明。

| 元素 | 职责与约束 |
|---|---|
| 配色 | 官方CSS核验海军蓝#001b3b、白色面板、#be244f票务和#fdafe3支持入口。 |
| 字体 | 官方Philharmonique标题大写，正文保持分段；原站部分正文Source Sans Pro，本地该部分有字体差异。 |
| 排版 | 主视觉左下活动名，右侧票务面板上浮；长正文与侧栏分工，手机票务回到文档流。 |
| 图像 | 官方游戏手柄字母CG、Joachim Bertrand两张展览现场图，以及Matthew Lloyd、Capucine DeChocqueuse、Franck Ferville署名的三位音乐会艺术家摄影。 |
| 形状 | 品牌标识下垂矩形、16px圆角内容/票务块、长胶囊按钮；非所有内容统一卡片。 |
| 层级 | 大活动名和日期识别主题，预约按钮和折叠时间/价格解决到访问题，照片和节目单提供内容深度。 |
| 整体协调 | 统一中轴品牌与蓝色基础，展览用互动现场图、音乐会用阵容/节目单，跨内容类型保持不同表达。 |

## 交互巧思与本地对应

| 触发 | 原站行为与本地对应 | 设计作用 | 范围与差异 |
|---|---|---|---|
| 浏览展览／音乐会详情 | 原生长页与桌面sticky票务，小屏票务回文档流。 | 活动内容与来访决定并行，小屏避免固定面板遮挡正文。 | 无额外迎宾加载或全页转场。 |
| 打开主菜单和类别 | 浅灰全宽导航立即出现，类别切换为目的地列表；小屏菜单在页面流中展开。 | 机构多种活动保留层级，交互保持直接。 | 本地缩减类别与链接，保留内容切换和返回；无伪造淡入动画。 |
| 切换音乐会摄影 | 三幅署名摄影500ms横向轨道，克隆边界无缝循环；前后与暂停／触摸可操作。 | 用演出者肖像讲述阵容，邻接图像的运动维持观看连续。 | 500ms及循环来自实际Slick观察，ease和6秒周期为本地近似。 |
| 展开Horaires／Tarifs／Programme | 信息即时展开，声乐／乐器阵容以文字分段。 | 不离开当前详情即可完成到访和节目判断。 | 保留实际展开逻辑；预约链接回官方，未实现交易。 |
| 打开Playlist | 转到官方fanlink，选择个人音乐平台。 | 音乐是展览主题的延伸与回看媒介。 | 不复制cookie受控的第三方播放器，不新增自动BGM。 |

## 主题与声音

**主题（fixed）：**深蓝文字、浅灰正文和白色票务面板固定，无深浅模式开关。 音乐厅品牌、票务酒红和展览图像协调，反色可能削弱实际CG视觉。

**声音（external）：**Playlist按钮链接真实官方音乐平台合集，用户主动聆听；首页没有独立BGM。 曲目把展览中的游戏音乐延续到网站外的听觉体验；不将图片轮播说成音频播放。

## 边界与练习

展览与音乐会合并为局部学习区域，原独立详情长度不同；第三方视频、账号与售票后端不复制。Ayano Kamei仍是官网图轨素材，但当前节目单钢琴为Chisato Taniguchi，两者不可混为当前阵容。

再选择一场经过官方核验的音乐会，对照节目/阵容结构，保留展览与音乐会信息表达差异。

[Demo](../demos/philharmonie-music/index.html) · [桌面预览](../previews/philharmonie-music.jpg) · [手机预览](../previews/mobile/philharmonie-music.jpg) · [Prompt](../prompts/philharmonie-music.md) · [素材归属与hash](../demos/philharmonie-music/assets-manifest.json)
