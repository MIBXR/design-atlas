# Umamusume 局部还原说明

原站：国际英文版 https://umamusume.com/ 。观察日期2026-10-07；桌面约2040×939、移动版390×844，浏览器中的深色扩展会影响部分纯CSS颜色，本地采用白底/荧绿的品牌素材关系。

| 原站观察 | 本地对应区域 | 边界 |
| --- | --- | --- |
| 完整赛道群像、左下平台徽章、右侧竖向提示 | `.hero`、`.download`、`.scroll-label` | 保留真实KV；简化社交按钮，省略WebStore/TGA推广浮窗 |
| 荧绿斜切标题与日期/分类新闻条目 | `.news` | 三条2026-10-06公告的简化文案，官方外链；不是实时新闻 |
| 居中预告框、播放入口 | `.about` | 本地原生dialog显示预告信息，主动打开真实YouTube预告；无下载BGM |
| 三组立绘+竖屏画面+斜切说明 | `.gameplay` | 保留对应官方图片；标题由可读HTML近似，不复制巨大路径化文字SVG |

本地新增Sections锚点菜单、键盘左右键与清晰当前态。手机使用原站竖版KV，轮播内容改为竖向可读安排，属于响应式教学改编。没有完整复制Characters/Media页、运营CMS、Cookie/分析脚本、下载器或支付流程。

可验证交互：`#menu-button`、`#trailer-open` / `#trailer-close`、`#next` / `#previous`、`[data-slide]`。轮播不自动前进；reduced-motion下取消非必要过渡。所有下载/新闻/角色CTA为真实官方外链。

图片和商标 © Cygames, Inc.。本地私用学习，未获得公开再发布许可。素材清单：`assets-manifest.json`。

## 动效补审 · 2026-10-07

实点Gameplay Next，Splide list为translateX(-2000px)，transition:transform 400ms cubic-bezier(.25,1,.5,1)；初始Previous disabled，中间两箭头可用。已替换瞬时换图为完整三面板滑轨，并补首尾禁用状态。源站人物集合滚动带和完整官网内容不在局部实现范围；教学菜单/PV说明框仍明确是本地新增。

验证说明：1440×1000桌面和390×844手机均实际操作。减少动态采用本页`?motion=reduce`应用级入口测试，系统prefers-reduced-motion当时为false，没有更改系统/浏览器设置。它覆盖同一降级逻辑，但不等同于OS偏好切换实测。完整观察与验证见 [十例审计](../../research/MOTION-AUDIT-GAMES-ART-JP.md#uma-musume)。
