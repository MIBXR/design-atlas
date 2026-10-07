# Apple · 滚动产品舞台 · 复用 Prompt

由 [结构化案例](../entries/apple-product.json) 自动生成。参考观察与具体边界见 [调研](../research/apple-product.md)。

## 正向 Prompt

以【观察日期】的 https://www.apple.com/iphone-18-pro/ 为依据制作局部产品页。使用官方摄影、Apple标识、登场MP4及camera-system WebM，按原比例本地保存并记录来源与权利。黑色全宽首屏保留44px导航、52px信息带、左下产品名称和右下蓝色购买胶囊；下滚显示玻璃质感章节导航，Explore可展开并支持Escape关闭。Highlights使用深灰底、56px左标题和约38px圆角摄影舞台，按Camera/Battery/Colors/A20 Pro/Siri AI排列五张静帧，进入视口时控制从下方出现，提供手动选择、进度、暂停和最后重播；每项5秒、控制入场.65秒是本地近似。Design用最大96px标题、左侧细节胶囊与右侧官方静帧，尺寸和颜色选择必须更新图像与文字状态。镜头段用220vh滚动容器和sticky视窗，p=clamp((viewportHeight-stage.top)/stage.height)，把暂停的视频seek到(.01+.99p)×duration；标题在p=.48至.73淡出，这一阈值标为近似。保留自然滚动，不为首屏摄影增加未经观察的缩放。手机重排控件，颜色选择提供名称与aria-pressed；prefers-reduced-motion使用poster、静态标题和手动图库。购买链接回官网。说明静帧图库、完整3D、专用亮点视频及其他章节的未覆盖范围。迁移到【目标硬件】时重新记录其镜头与滚动关系。

## 负向约束

不要用原创硬件SVG替代真实产品；不要用通用两栏hero和三张卡片概括苹果整页；不要宣称完整像素复刻；不要隐藏复现范围；不要滚轮劫持或自动有声播放。

## 制作约束

- 官方摄影和视频保持比例；滚动镜头使用视频换帧。
- 图库五静帧、每项5秒与标题淡出阈值为近似；专用亮点视频和完整3D未移植。
- 颜色选择同时提供名称与aria-pressed。
- 自然滚动；减少动态时使用poster、静态标题和手动图库。
- 价格、供应与购买以官网为准。

## 检查方法

保持黑色产品舞台，使用另一款真实产品摄影练习镜头与文案的滚动交接；先记录原站进度再调整曲线。

[查看 Demo](../demos/apple-product/index.html) · [返回参考库](../index.html#style/apple-product)
