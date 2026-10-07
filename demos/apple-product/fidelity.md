# Apple 产品页对照

原站：https://www.apple.com/iphone-18-pro/ ，观察日期 2026-10-07。

| 区域 | 原站观察 | 本地实现与边界 |
|---|---|---|
| 登场 | 全黑、全幅真实产品视频，名称左下、蓝色购买右下 | 使用官方同一MP4/末帧与相似布局；信息带改为学习说明，文案部分中文释义 |
| 导航 | 滚动后玻璃质感悬浮胶囊，Explore展开章节 | 本地固定导航与展开关闭，章节数量缩为3 |
| Highlights | 深灰背景、56px标题、圆角摄影舞台、分页与播放 | 五张官方摄影、原顺序、进度/暂停/重播；未迁移各亮点专用视频，5秒时序近似 |
| Design | 96px章节标题、左侧胶囊控件、右侧3D产品舞台 | 同区官方静帧选择器；没有完整3D旋转引擎 |
| Cameras | 镜头放大与回退、章节连续交接 | 官方4.984秒WebM、220vh舞台与源scroll关键帧映射；文字fade阈值为本地近似 |

原站证据：../../research/screenshots/apple-hero-source.jpg 与 apple-design-source.jpg。本地文本不作为产品参数来源；价格、供应、购买在原站完成。Apple没有默认背景音乐，本案例不添加任意配乐。减少动效时暂停登场/图库，镜头用poster与静态标题。


## 2026-10-07 动效复审（当前实现）

官方登场MP4；镜头系统以官方4.984秒WebM和220vh滚动舞台驱动video.currentTime(.01→1)，并局部淡出标题；五项亮点顺序/进度/末尾重播。首屏不再加入未观察的CSS缩放。

证据：实访首屏、滚动、图库自动状态与camera currentTime；官方VideoScrub关键帧DOM、overview.built.css与main.built.js只读核验。

边界：滚动镜头必须用官方camera-system视频，不能用JPEG scale伪称原站同款；原视频进度源为scroll-container.top - 100vh至bottom - 100vh，文案淡出阈值仍为近似。

详情和实操记录见 [产品动效审计](../../research/MOTION-AUDIT-PRODUCTS.md)。本地增加 darkreader-lock meta 保护官方配色，这是本地适配，不作为原站观察。
