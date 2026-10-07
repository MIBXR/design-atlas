# Fuji Rock：现场照片与节日导览：局部还原说明

原站：https://www.fujirockfestival.com/

观察：2026-10-07，日本官方版本。`research/screenshots/fuji-rock-source.jpg`为实访来源；`previews/fuji-rock.jpg`为本地入口；不是整站镜像。

## 对应区域

| 原站观察 | 本地对应 | 保留 / 差异 |
|---|---|---|
| 68px橙栏/窄高白字Logo/山形MENU/右蓝票据 | header / #menu-toggle / .ticket | 使用官方PNG标识，固定位置与圆角；票据仍外链并注明活动已结束 |
| 满首屏真实照片与20个dots | .photo-hero | 本地3张，实际桌面/手机配对源图；恢复3600ms间隔/800ms淡化，增暂停、左右按钮和键盘 |
| 米灰大圆角多列菜单 | #mega-menu | 4列层级、原图标、语言带；部分栏目/社交缩减 |
| 圆角实用导航/横Featured/日期新闻 | .pickup / .featured / .news | 对应官方图标、4图特集、4新闻；选取局部，未复制赞助商滚动 |

核心操作：`#photo-prev/#photo-next`、`[data-photo]`、`.photo-hero`方向键，`#menu-toggle/#menu-close`、`#language-toggle`、Escape，`#feature-next/#feature-prev`和横滚列表。原站20张照片与赞助商/全部内容未复刻。Edge一度源站loader伴随common.js错误；打开/关闭MENU后正常显示，主任务IAB独立实访显示正常，干净截图已保存。本地无此加载脚本。

**2026版快照学习：活动已结束。** 官方Aftermovie是主动点击的YouTube外链，未下载独立BGM，不声称官网音乐已本地化。

## 共通还原边界

官方素材只作个人本地设计学习，图像、作品、Logo与商标权利归原权利人。HTML/CSS/JS为独立编写，没有整页iframe、外部运行时资源、统计或交易脚本。可键盘使用、手机重排、遵从reduced-motion；尚未声称完整WCAG合规。源CSS仅研究存档。

## 动效补审 · 2026-10-07

实点第二dot，源站slide style transition opacity800ms cubic-bezier(.25,1,.5,1)；菜单实开显示多列层级。top-2026.js确认为fade、speed800、autoplay、interval3600；common.js在601ms后隐藏菜单并让wrapper fade-out。已补同速三图自动淡化、手动暂停与600ms菜单/背景退场，后台/离屏停轮播。原站20图缩3图，Featured实际源站600ms循环/自动滑轨与滚动时导航上滑回显仍未全覆盖。

验证说明：1440×1000桌面和390×844手机均实际操作。减少动态采用本页`?motion=reduce`应用级入口测试，系统prefers-reduced-motion当时为false，没有更改系统/浏览器设置。它覆盖同一降级逻辑，但不等同于OS偏好切换实测。完整观察与验证见 [十例审计](../../research/MOTION-AUDIT-GAMES-ART-JP.md#fuji-rock)。
