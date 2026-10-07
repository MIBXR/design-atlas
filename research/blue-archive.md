# 碧蓝档案：城市映像、人物档案与原始声线

单一来源：[Blue Archive 日本官网](https://bluearchive.jp/)，采集日期 **2026-10-07**。该次可见 CHARACTER 导航进入 [角色子页](https://bluearchive.jp/character)，记录同次旅程，不引入其他版本。

## 真实旅程

首页首入为蓝白城市视频、青白 Logo、右侧竖排标语、顶部深蓝导航，以及左右下角的下载/漫画入口。实际首页向下就是 footer，现场 2040×935 最大滚动约 571px；没有本地此前添加的资源卡和教学笔记章节。反向回到首屏，再由 CHARACTER 导航打开角色页。

本地以文档导航替代源 Vue SPA 路由，并未添加无证据的跨页淡化。角色页学院标记、透明资料卡和完整立绘分层。阿比多斯四学生选择后，整块轨道以 **1000ms** 水平移动。现场点击 Hoshino，姓名、CV、生日/学年/身高与原立绘同步。点击 Shiroko VOICE 后，官方 WAV 实际播放，另三名各有自己的 WAV；这些是角色台词，不是背景音乐。

## 触发 → 响应 → 目的

| 触发 | 响应 | 目的 |
| --- | --- | --- |
| 首页正常上下滚动 | KV 与 footer 之间浏览 | 空间中心让给世界观，实用入口放边缘 |
| CHARACTER 导航 | 原站进入独立人物页 | 将人物查询和首页品牌氛围分开 |
| 人物选择 | 1000ms 资料卡和立绘整轨横移 | 整个人物档案共同到场，保持查询连续性 |
| VOICE 麦克风 | 对应学生的官方台词 | 声优与台词补充人物身份，声音来源清楚 |
| 换人/后台 | 本地停止原台词 | 防止旧人物声线在新档案叠加 |

## 风格与理论

天空、玻璃高光和青白 Logo 统一成轻盈的学园世界；深蓝透明导航为白字提供稳定底色，竖排标语补充文化气质，角落漫画图像保留自己的插画轮廓。人物页用透明资料卡与完整立绘延续同一世界。此快照未见深浅主题开关，本地固定浅色，不把背景夜色等场景误解成主题切换。

[W3C Carousels Tutorial](https://www.w3.org/WAI/tutorials/carousels/) 支持本地键盘和当前态，[Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 支持减少动态。角色公开样式：[view-character-vue](https://webusstatic.yo-star.com/bluearchive_jp_web/css/view-character-vue.b3742afb.css)，其整轨结构与现场 1000ms 位移相互佐证。

## 本地范围

本地首页仅 KV→footer；CHARACTER 进入独立 `character.html`，HOME 返回首页。源公开导航调用 `$router.push`，外壳直接渲染 `router-view` 与 footer，现场路由切换后未见额外入场动画。四学生完整资料和 WAV 本地保存，其他学院、NEWS/SYSTEM/完整 PV 链接官网。删除未有来源依据的资源卡、构图笔记和装饰六边形。缓动、手机重排、键盘/手势、暂停与减少动态属于适配；未发现独立 BGM。参数、Prompt 和素材记录见条目与 [fidelity](../demos/blue-archive/fidelity.md)。
