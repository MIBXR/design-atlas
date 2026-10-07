# 纪念碑谷一代真实官网：放映与展览的连续节奏

研究日期2026-10-07。选择 [Monument Valley一代官方 /mv1 页面](https://www.monumentvalleygame.com/mv1)，不混合系列续作。官方根域本次Edge初次访问连接关闭，已被搜索结果确认的具体一代页面成功加载。

## 已观察的事实

桌面是固定系列导航、全屏预告背景和居中几何字标，下方顺序：下载徽章、手动预告、奖项、社交带、媒体评价、游戏截图画廊、社区和press kit/ustwo页脚。画廊是14项，保留竖屏游戏比例，有前后按钮和索引。移动版390×844以作品影像作为首屏，系列菜单布局改变。

官网两个video使用同一 `mv-trailer-a0b9cbc1.mp4`：背景视频muted=true、paused=false；前景预告muted=false、paused=true，长度约1分7秒。本地保存6,694,081字节的公开官方文件。它是预告视频及其原有声轨，不是独立BGM素材。

浏览器深色扩展会改变纯CSS显示颜色，因此另以原站 `style.css` 核验：导航原色 `#fefefe`，奖项一代渐变 `#e76399→#627db3`，媒体区 `#fcf2d2`，社区 `#e28ec0`，页脚 `#48418c`。本地采用这些真实声明，并在源截图说明该显示环境限制。

[开发者作品页](https://ustwogames.co.uk/our-games/monument-valley/) 介绍公主Ida、隐藏路径、不可思议建筑和视觉幻象，支持本条产品重点。[官方联系页](https://ustwogames.co.uk/contact-us/) 给出伦敦工作室地址，作为国家英国的来源。

## 推断与协调逻辑

居中几何细线字标与建筑画面共享“构造”的主题，小号导航不抢画面。连续宽色带把观众从看影像带到看事实、看细节；奖项月桂负责信任，图像负责玩法和艺术辨识。这是基于观察的分析，不是官方公开设计宣言。

## 局部实现与规范

本地保留视频/字标首屏、下载、手动有声预告、粉蓝奖项、奶油区、竖图画廊、社区和页脚。奖项缩减到6项、画廊4图；奶油区改为明确的教学观察，避免复制媒体长评价。与“等轴经典风”条目是不同目标：这里重建真实宣传官网区域，不制作自行想象的游戏浮岛。

[WAI轮播教程](https://www.w3.org/WAI/tutorials/carousels/) 指导按钮、键盘和当前状态。本地画廊不自动播放。[W3C交互动效说明](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 的AAA条款支持关闭非必要互动运动，本地取消官网视差，默认背景停止/静音，所有音频由用户主动Play预告开始。

详见 `demos/monument-valley-game/fidelity.md`、`assets-manifest.json`。官方图片、Logo与视频仍属ustwo games及相应权利方，私人学习不意味着可公开再发布。

## 2026-10-07 动效补审更新

实点官方Next，slick-track显示translate3d(-5400px,0,0)、transition:transform500ms；背景与预告均为实际67.988秒MP4。已将瞬时替换单图改为四幅横向轨道，恢复普通模式静音背景播放且可停，补后台/离屏暂停。14图缩为4图；原站部分视差和进入动画仍未覆盖，系统字体近似，不复制Humanist521字体。

本轮记录优先于初版的静态/手动实现描述。原站触发、脚本证据、实际手机/键盘验证与诚实限制见 [十例动效审计](MOTION-AUDIT-GAMES-ART-JP.md#monument-valley-game)。
