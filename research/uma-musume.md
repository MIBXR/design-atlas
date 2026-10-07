# 赛马娘：群像、斜切节奏与玩法轨道

单一来源：[Umamusume 国际英文官网](https://umamusume.com/)，采集日期 **2026-10-07**。本次归档不混入日本门户，也不维护官网后续变化。

## 真实旅程

正常首入见赛道群像、品牌与平台下载徽章；向下依次经过 News、About、Gameplay、Characters、Media 到 footer，再反向回到首屏。2040×938 的现场，各章是原生长页并非整屏滚轮锁定。未见独立声音门或深浅主题切换。

Gameplay 三态由真实角色立绘、两张游戏截图与文字板共同水平移动，源样式为 **400ms cubic-bezier(.25,1,.5,1)**；第 1 态禁用 Previous，第 3 态禁用 Next。没有确认角色区域持续滚动的 marquee，因此本地没有凭空补上。

About 缩略图点击后在站内出现原生有声视频：[top_about.mp4](https://umamusume.com/assets/videos/top_about.mp4)，现场播放为 unmuted。关闭会返回长页。音轨属于 PV，没有发现独立 BGM。

## 触发 → 响应 → 目的

| 触发 | 响应 | 目的 |
| --- | --- | --- |
| 正常上下滚动 | 群像后进入安静新闻，再进 PV 和复杂玩法 | 情绪与信息密度交替，而不把每章套一张卡片 |
| Gameplay Next/编号 | 400ms 整块横移，立绘/截图/文案对应 | 以真实玩法证据解释一个玩法主题 |
| 到轮播首尾 | 对应箭头禁用 | 明确内容数量，不制造无尽自动翻页 |
| 点击 About | 真实 PV 及原音轨在 modal 播放 | 由剪辑与音乐表现赛场节奏，用户决定进入 |
| 关闭 PV | 本地暂停、返回原浏览位置 | 结束音乐和影片，不让声音持续盖住阅读 |

## 风格与理论

奔跑方向与赛道纵深建立运动感；反复出现的斜切标题带、人物与游戏截图负责统一。白底新闻降低视觉负担，真实平台徽章提供熟悉操作。固定白/绿主题来自赛场情境，未强加暗色版本。

[W3C Carousels Tutorial](https://www.w3.org/WAI/tutorials/carousels/) 支持用户控制、键盘和当前状态，[Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 支持本地减少动态。它们用于本地适配，不代表源站通过完整认证。

## 本地范围

保存官方桌面/手机 KV、Gameplay、预告缩略图及原始 PV。本地新闻缩为少量静态条目，后半部 Characters/Media 内容未完整照搬；菜单、键盘和学习说明是补充。保留长页→站内 PV→有限三态 Gameplay 的关键机制。参数、Prompt、素材记录和终态预览见案例条目与 [fidelity](../demos/uma-musume/fidelity.md)。

### 同次采集的固定导航

原页异步注入公共导航。待其加载后确认固定蓝色纹理导航、真实 Logo：首屏桌面放大 2.8 倍，滚过 `min(innerWidth,2000)*0.07` 缩回基准，反向恢复，过渡 300ms cubic-bezier(.19,1,.22,1)；手机比例为 1.72。公开样式和 inject-components.js 与现场大小相互佐证。本地保留该阈值、比例和时序、马蹄菜单图、导航悬停箭头及 Play Now 下载层；下载层内容缩为三平台，手机菜单排版与 dialog 语义有适配。
