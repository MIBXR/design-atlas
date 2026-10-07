# Monument Valley 一代官网局部还原

原站 https://www.monumentvalleygame.com/mv1；观察2026-10-07，桌面及390×844移动版。保留宣传页面叙事，不是可玩游戏复制，也不是泛化等轴浮岛。

| 原站区域 | 本地对应 | 差异 |
| --- | --- | --- |
| 白色固定系列导航、全屏静音预告、几何字标 | `.game-nav` / `.hero` | 原始SVG与MP4；普通模式静音背景播放，减少动态初始暂停，新增播放控制与返回库入口 |
| 深色下载带、手动有声预告 | `.download` / `.trailer` | 两个平台徽章；实际本地video播放和原声轨，非伪造BGM |
| 粉→蓝渐变、低透明月亮、对称月桂奖项 | `.awards` | 10项缩减为6项，新增展开按钮 |
| 奶油色媒体区 | `.press` | 原站媒体评价与Logo被替换为明确的本地教学观察，不复制长评价 |
| 深青底、竖屏游戏图、前后箭头与索引 | `.gallery` | 14张缩减为4张；方向键和aria状态完善；不自动轮换 |
| 粉色社区、press kit、ustwo页脚 | `.community` / `footer` | 真实图片与外链，增加私用学习说明 |

原CSS核验真实配色；早期截图的导航/文字颜色与官网CSS有差异，本地按官网CSS核对；本轮未改变浏览器主题设置。取消原站视差和复杂进入动画；系统字体近似原网站Humanist521 BT（未复制字体文件），几何主字标使用原SVG。手机改为可用圆形菜单，不保持原站某些微小控件。

QA控件：`#background-toggle`、`#trailer-start`、`#trailer-sound`、`#award-toggle`、`#gallery-next` / `#gallery-previous`、`[data-gallery]`、`#menu-toggle`。声音与播放状态来自真实video事件。背景静音，初始无音频；主动点击Play预告才开启预告声轨；状态显示实际播放/暂停及mute值。

所有官方文件由观察到的公开URL保存，本地未复制分析、登录或支付代码。图片/视频/Logo权利仍归ustwo games及相应权利方，仅作私人学习；见 `assets-manifest.json`。

## 动效补审 · 2026-10-07

实点官方Next，slick-track显示translate3d(-5400px,0,0)、transition:transform500ms；背景与预告均为实际67.988秒MP4。已将瞬时替换单图改为四幅横向轨道，恢复普通模式静音背景播放且可停，补后台/离屏暂停。14图缩为4图；原站部分视差和进入动画仍未覆盖，系统字体近似，不复制Humanist521字体。

验证说明：1440×1000桌面和390×844手机均实际操作。减少动态采用本页`?motion=reduce`应用级入口测试，系统prefers-reduced-motion当时为false，没有更改系统/浏览器设置。它覆盖同一降级逻辑，但不等同于OS偏好切换实测。完整观察与验证见 [十例审计](../../research/MOTION-AUDIT-GAMES-ART-JP.md#monument-valley-game)。
