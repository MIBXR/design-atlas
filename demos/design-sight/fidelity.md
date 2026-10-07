# 21_21 DESIGN SIGHT：海报与四列档案：局部还原说明

原站：https://www.2121designsight.jp/

观察：2026-10-07，日本官方版本。`research/screenshots/design-sight-source.jpg`为实访来源；`previews/design-sight.jpg`为本地入口；不是整站镜像。

## 对应区域

| 原站观察 | 本地对应 | 保留 / 差异 |
|---|---|---|
| 白色固定header/蓝牌形机构Logo | header | 保留官方Logo、129px桌面高度；简化辅助导航 |
| 两张全幅展览海报 | .poster | 保留原16:9海报，不裁作卡片；改为手动切换并添加控制 |
| 蓝分类与浅灰4列档案 | .archive | 保留4类、横/竖各自比例；精选档案，部分简介改成本地说明 |
| 访问信息与机构footer | .visit / footer | 保留地址/时间与真实官网链接；简化社交、伙伴、地图入口 |

核心操作：`#poster-prev/#poster-next`、`[data-poster]`、`.poster`方向键、`#menu-toggle`、Escape、本地#visit锚点。原站自动轮播/复杂滚动联动未复制。手机实访原站是62pxheader、全幅海报和单列档案，本地保持该结构。

## 共通还原边界

官方素材只作个人本地设计学习，图像、作品、Logo与商标权利归原权利人。HTML/CSS/JS为独立编写，没有整页iframe、外部运行时资源、统计或交易脚本。可键盘使用、手机重排、遵从reduced-motion；尚未声称完整WCAG合规。源CSS仅研究存档。
