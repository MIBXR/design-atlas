# 碧蓝档案日本官网：首页的天空、都市与光

日期2026-10-07。[日本官方页面](https://bluearchive.jp/) 是本次观察版本。条目country为韩国，edition为日本版：开发来源与观察地区是两个不同维度。

## 直接观察

Edge桌面首屏约2040×939，整体是学园都市背景视频、中央青白Logo、右侧日文竖排标语。横向顶部导航有HOME、NEWS、CHARACTER、SYSTEM、FANKIT、FAQ、CONTACT；当前项有青色顶线。下载/充值区域在左下，帮助和两种漫画插画入口在右下。滚动末尾是法律/创作指南链接和NEXON Games/Yostar标识。

官方视频 `bg.555a8a72.mp4` 来自官网载入的 webusstatic.yo-star.com 资源。原站视频在DOM中为muted=true、paused=false；本地改为默认暂停。实际下载1,602,930字节，保留原文件，不声称它是BGM。

原CSS `app.47b744a6.css` 明确记录导航底色 `rgba(20,39,59,.8)`，核验该深蓝不是浏览器深色扩展产生。原站图片/字标源自同一官方资源域。390×844独立研究页实访显示桌面导航隐藏，主要入口缩小/重新叠放；本地改为可操作菜单和更大徽章，属于教学改编。

本次点击CHARACTER后官方异步样式 `view-character-vue.b3742afb.css` 加载失败，页面仍保留首页，console能确认此错误。因此未把人物页版式纳入“已观察事实”，也未凭空制作相似的人物页。

## 设计推断

主视觉中心留给蓝天和Logo，角落承载下载与漫画，降低用户在动态场景里寻找操作的成本。日文竖排标语与横向导航形成方向对比，又因白色与青色品牌光感而统一。都市/教室的日常场景传达学园生活，而漫画入口延续角色日常，这是基于画面关系的推断。

## 规范与局部映射

[W3C动效说明](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) 支持可关闭非必要动态。本地背景播放/暂停由真实video事件更新按钮；初始消音并暂停，减少动态模式取消CSS过渡，切换该偏好会停止背景。[WAI轮播教程](https://www.w3.org/WAI/tutorials/carousels/) 的清楚状态与用户控制要求迁移到本地三态资源观察器，未声称原站本来有这个组件。

本地忠实区域：深蓝导航、城市视频、Logo与标语位置、左右角落官方入口和页脚标识。教学新增：素材观察器与构图折叠说明。详情见 `demos/blue-archive/fidelity.md`；资源清单 `assets-manifest.json` 保存原URL、用途、字节与尺寸。

素材与商标权利属于官方相应权利方。本地私用学习不代表得到公开再发布许可。官方[创作指南](https://bluearchive.jp/fankit/guidelines) 需在其他使用情境自行查看适用规则。
