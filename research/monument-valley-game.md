# 纪念碑谷：电影首入、奖项进入与中心画廊

唯一页面基线：[Monument Valley一代国际英文页](https://www.monumentvalleygame.com/mv1)；采集于 **2026-10-07**。国别用于机构来源检索，不推断国家存在固定风格。

## 参考与证据

- [Monument Valley 一代官方宣传页](https://www.monumentvalleygame.com/mv1)（实例）：2026-10-07：一代宣传页的白导航、影像、粉蓝奖项、奶油媒体区、画廊及社区。
- [ustwo games：Monument Valley作品页](https://ustwogames.co.uk/our-games/monument-valley/)（实例）：开发者介绍Ida、不可思议建筑和视觉幻象，支撑产品重点；本地使用实际游戏画面。
- [ustwo games：联系信息](https://ustwogames.co.uk/contact-us/)（实例）：官方伦敦工作室地址是国家分类的依据，不代表英国页面有固定风格。
- [W3C WAI：Carousels Tutorial](https://www.w3.org/WAI/tutorials/carousels/)（规范）：画廊用户控制、键盘和当前状态的规范参考。
- [W3C：Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)（规范）：本地减少动态分支约束：停止自动推进与背景，取消非必要位移；不声称原站合规。
- [MV1 官方公开交互脚本](https://www.monumentvalleygame.com/js/main.js)（实例）：同一页面1000ms loader、450ms章节定位、中心活动区、手机奖项分组、Slick14图及媒体播放器机制。
- [MV1 官方公开样式](https://www.monumentvalleygame.com/style.css)（实例）：同一归档页Humanist字体、350ms奖项/高度/标签过渡及画廊0.5侧图透明度；MV2专属动画不作为MV1证据。

[原站首屏](screenshots/monument-valley-game-source.jpg) · [本地桌面](../previews/monument-valley-game.jpg) · [本地手机](../previews/mobile/monument-valley-game.jpg)

## 构成与设计分析

**可观察事实：**MV1从一秒加载和静音影片进入，按下载、预告、奖项、社交、媒体、十四图画廊、社区、页尾展开。当前活动区由视口中心决定；奖项350ms双向出现，画廊500ms轨道与3000ms自动、悬停/焦点暂停。真实Humanist字体与品牌资产维持作品比例。

**本库分析：**影片与竖屏游戏图承担细节；几何字标、小索引、月桂与整幅色带只建立秩序。奖项在阅读中心出现强调事实，中心画廊让当前作品突出而侧图提示探索。此分析不冒充品牌作者声明。

| 维度 | 设计职责与约束 |
|---|---|
| 配色 | 固定白导航、#221f20影像/下载/画廊、粉蓝奖项、奶油媒体、粉社区与紫页尾，以整幅色带改变观看节奏。 |
| 字体 | 官方细线几何字标与真实Humanist521 BT Roman/Bold，小号导航和28px奖项标题保持作品秩序。 |
| 版式 | 真实影像先行，内容按下载/预告/奖项/社交/媒体/十四图画廊/社区/页尾展开，左侧索引按视口中心更新。 |
| 素材 | 官方MP4、字标SVG、月亮/月桂、十四张游戏截图和社区图均本地保存，不以自行绘制替代作品。 |
| 形状 | 微小六边形索引、成对月桂与直边色带；手机圆形菜单和保留游戏原纵横比的画廊。 |
| 层级 | 影像建立体验，商店徽章提供行动，十项奖项建立信任，中心画廊展示细节并预告侧图。 |
| 动态 | 加载1000ms；章节450ms swing；奖项与手机展开350ms ease-in-out；画廊500ms ease/3000ms自动，暂停及减少动态明确可控。 |
| 协调关系 | 建筑与字标共享几何秩序，克制的控件与固定色带形成放映节奏；进入、展开与轨道分别服务内容职责。 |

## 触发、响应与体验位置

- 首次进入：白色LOADING遮罩1000ms后直接移除，真实背景视频静音循环；可持续暂停。
- 桌面左侧章节索引：点击以450ms swing将章节中心对齐视口中心；悬停或键盘进入索引时，标签350ms出现、内容降至0.2透明度。
- 奖项：视口中心进入/离开时，350ms opacity 0↔1、translateY 20px↔0，双向有效；手机Show All/Hide通过350ms高度变化展开/收回六项。
- 十四图画廊：500ms整条水平轨道、3秒自动推进、无限首尾衔接；桌面三张、手机一张加20%侧图，箭头/14个索引/方向键与点击侧图有效。悬停、焦点、离屏和后台暂停。
- 前景预告：主动Play播放同一67.988秒官方MP4及原声轨；原生进度/暂停和实际声音开关有效，播放时暂停背景。
- 手机圆形菜单：350ms全屏白色面板进入/退出，Escape可关闭；本地明确增加暂停、键盘、后台节流和减少动态分支。

## 主题与声音

当前MV1页面没有全局主题选择；固定白导航、深色影像/画廊及各章节品牌色，不随系统深浅切换。 页面是作品世界的固定放映顺序，完整色带与原始媒体建立统一氛围。

背景MP4静音循环；主动Play前景影片才有真实原声，原生媒体控件及Sound on/off控制实际muted。原站本次播放触发React #185，声音现场未通过；本地播放通过。 影片声轨与空间/解谜画面共同营造作品气氛；没有独立BGM，用户开始观看才进入有声体验。

## 对应边界与复用约束

- 唯一页面基线为2026-10-07国际英文 https://www.monumentvalleygame.com/mv1；不混入MV2的字标描边或MV3区域。
- 当次原站MV1 hero实际随普通滚动离屏，未观察到滚动缩放/视差；公开函数存在不等于效果发生，因此本地不添加无依据视差。
- 当前原站桌面前景播放操作触发React #185，未验证其实际声音播放；公开播放器与MP4声轨提供机制依据，本地主动播放已验证。
- 官方十四张图片、字标、月亮/月桂、Humanist字体和预告本地保存，来源/尺寸/hash见资产清单；权利仍归ustwo games及相应权利人。
- 保留十项奖项和交互机制；媒体区以明确标注的学习观察替代评论长文，商店保留两个徽章，社交图标以文本入口近似。
- 手机/桌面版式、媒体裁切和细小控件几何为可复用实现近似，非逐像素复制；原站没有独立BGM，也未发现全局深浅主题按钮。

减少动态、后台/离屏暂停、键盘与显式暂停为本地易用性约束，原站未提供同一分支；规范用于改进学习样本，不冒称原站合规。完整对应表见[对应范围](../demos/monument-valley-game/fidelity.md)。

## 复用入口

[Prompt](../prompts/monument-valley-game.md) · [案例条目](../entries/monument-valley-game.json) · [Demo](../demos/monument-valley-game/index.html) · [资产清单](../demos/monument-valley-game/assets-manifest.json)
