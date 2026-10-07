# Apple：真实摄影与滚动产品叙事

观察日期：2026-10-07；原站 https://www.apple.com/iphone-18-pro/ 。

初版耳机是风格练习，不能作为Apple页面还原。本次移除该原型，使用实访产品页的真实素材和布局。浏览器核验首屏、Highlights、Design；原站完整页包含很长的摄像、性能和共享功能叙事。

## 可观测事实

- 黑色全宽登场，44px全局导航和52px信息带。产品标题位于舞台下部，购买是小型蓝色胶囊。
- Highlights深灰底，标题约56px，摄影卡片大圆角，底部圆角分页控制。
- Design标题约96px；左侧七个胶囊细节按钮，对应右侧官方硬件视图。
- 滚动后玻璃质感局部导航固定在顶端内缩位置。摄像段的尺度和文案变化由滚动进度驱动。

## 机制解释

真实硬件持续占据视觉主位；尺度变化让同一物体从整体转向细节。大字与负空间分割长叙事；固定导航维持方向与行动可达。此解释是本地设计分析，不是Apple发布的意图声明。

## 理论与约束

Apple HIG Motion https://developer.apple.com/design/human-interface-guidelines/motion ：动效应具有明确用途，支持减少动效。这是应用规范向网页设计的迁移。

本地功能范围及不一致见 ../demos/apple-product/fidelity.md；逐项资产URL与SHA256见 assets-manifest.json。保留原站真实摄影；不复制原站全部脚本或把近似滚动曲线说成完整重建。


## 2026-10-07 动效复审补正

实访首屏、滚动、图库自动状态与camera currentTime；官方VideoScrub关键帧DOM、overview.built.css与main.built.js只读核验。

官方登场MP4；镜头系统以官方4.984秒WebM和220vh滚动舞台驱动video.currentTime(.01→1)，并局部淡出标题；五项亮点顺序/进度/末尾重播。首屏不再加入未观察的CSS缩放。

滚动镜头必须用官方camera-system视频，不能用JPEG scale伪称原站同款；原视频进度源为scroll-container.top - 100vh至bottom - 100vh，文案淡出阈值仍为近似。

本次原站操作、源码证据、observed/approximation/unavailable与本地实操详情见 [产品动效审计](MOTION-AUDIT-PRODUCTS.md)。旧观察的失联说明仅指早一轮，不覆盖本次成功实访；Claude和Qoder具体限制以上述复审为准。
