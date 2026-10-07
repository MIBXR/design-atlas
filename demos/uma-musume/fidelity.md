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
