# Monument Valley 一代官网局部还原

原站 https://www.monumentvalleygame.com/mv1；观察2026-10-07，桌面及390×844移动版。保留宣传页面叙事，不是可玩游戏复制，也不是泛化等轴浮岛。

| 原站区域 | 本地对应 | 差异 |
| --- | --- | --- |
| 白色固定系列导航、全屏静音预告、几何字标 | `.game-nav` / `.hero` | 原始SVG与MP4；默认背景暂停，新增播放控制与返回库入口 |
| 深色下载带、手动有声预告 | `.download` / `.trailer` | 两个平台徽章；实际本地video播放和原声轨，非伪造BGM |
| 粉→蓝渐变、低透明月亮、对称月桂奖项 | `.awards` | 10项缩减为6项，新增展开按钮 |
| 奶油色媒体区 | `.press` | 原站媒体评价与Logo被替换为明确的本地教学观察，不复制长评价 |
| 深青底、竖屏游戏图、前后箭头与索引 | `.gallery` | 14张缩减为4张；方向键和aria状态完善；不自动轮换 |
| 粉色社区、press kit、ustwo页脚 | `.community` / `footer` | 真实图片与外链，增加私用学习说明 |

原CSS核验真实配色；研究浏览器的深色扩展影响截图中纯CSS导航/文字颜色，本地不照抄该扩展产生的变色。取消原站视差和复杂进入动画；系统字体近似原网站Humanist521 BT（未复制字体文件），几何主字标使用原SVG。手机改为可用圆形菜单，不保持原站某些微小控件。

QA控件：`#background-toggle`、`#trailer-start`、`#trailer-sound`、`#award-toggle`、`#gallery-next` / `#gallery-previous`、`[data-gallery]`、`#menu-toggle`。声音与播放状态来自真实video事件。背景静音，初始无音频；主动点击Play预告才开启预告声轨；状态显示实际播放/暂停及mute值。

所有官方文件由观察到的公开URL保存，本地未复制分析、登录或支付代码。图片/视频/Logo权利仍归ustwo games及相应权利方，仅作私人学习；见 `assets-manifest.json`。
