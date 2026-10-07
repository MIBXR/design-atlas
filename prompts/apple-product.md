# Apple · 滚动产品舞台 · 复用 Prompt

由 [结构化案例](../entries/apple-product.json) 自动生成。参考观察与具体边界见 [调研](../research/apple-product.md)。

## 正向 Prompt

为个人学习制作 Apple iPhone 18 Pro 官方产品页的局部复现。先在 https://www.apple.com/iphone-18-pro/ 实际查看首屏、Highlights、Design 与 Cameras 的滚动状态，保存观察日期与截图。使用来源可追溯的官方产品图、Apple标识与登场视频，不自行画手机。首屏采用黑色全宽舞台、44px导航与52px信息带，产品名称放左下，蓝色胶囊行动入口放右下。滚动后显示居中的玻璃质感章节导航，Explore 可展开与关闭。亮点区域是深灰底、56px左标题、圆角约38px的摄影图库，提供四个明确状态及手动自动播放开关。Design 用最大96px的两行标题，后续左侧竖向胶囊功能钮与真实摄影更新；配色需有名称与选中状态。镜头段用sticky固定舞台，滚动改变照片scale和前后两段文案opacity，保留浏览器原生滚动。小屏保持控件可达；prefers-reduced-motion 下静态呈现。购买入口链接原站，学习说明明确区分官方媒体、近似滚动曲线及未移植的3D/交易/完整章节。每个资产记录官方URL、文件哈希和本地路径。

动效补正：参照2026-10-07实访和VideoScrub DOM，镜头使用官方WebM，220vh舞台内sticky，进度为clamp((viewportHeight-stage.top)/stage.height)，seek到(.01+.99×progress)×duration；视频保持paused、仅滚动换帧，减弱动画时停在poster。去掉没有原站证据的首屏CSS缩放。亮点顺序Camera/Battery/Colors/A20 Pro/Siri AI，进入视口时控件自下方出现，支持五静帧、进度、暂停和末尾重播；每项5秒及文字渐隐标成approximation，不能称完整专用媒体轮播。

## 负向约束

不要用原创硬件SVG替代真实产品；不要用通用两栏hero和三张卡片概括苹果整页；不要宣称完整像素复刻；不要隐藏复现范围；不要滚轮劫持或自动有声播放。

## 制作约束

- 真实图片保持原始比例与正确裁切，避免把抽象图形当作硬件。
- 要区分官方媒体本身的动画和本地实现的滚动曲线。
- 全站完整3D、原站全部章节及交易流程未移植，复现范围逐项公开。
- 颜色不能独自承担状态，同时提供配色名称和aria-pressed。
- 减少动效时显示静态摄影并取消滚动过渡；所有正文仍可阅读。
- 滚动镜头必须用官方camera-system视频，不能用JPEG scale伪称原站同款；原视频进度源为scroll-container.top - 100vh至bottom - 100vh，文案淡出阈值仍为近似。

## 检查方法

保持黑色产品舞台，使用另一款真实产品摄影练习镜头与文案的滚动交接；先记录原站进度再调整曲线。

[查看 Demo](../demos/apple-product/index.html) · [返回参考库](../index.html#style/apple-product)
