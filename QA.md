# 验证记录 · 第二版

验证日期：2026-10-07。28项中，20个品牌/文化局部复现进行了本轮浏览器检查；8个未改动的经典练习沿用首版验证。本轮截图来自本地 HTTP 页面，不是设计效果图。

## 本轮覆盖与证据

- 20个原站局部复现检查1440×1000桌面与390×844手机 CSS 视口。图片加载、横向溢出和主要控件均检查；截图保存在 `previews/<id>.jpg` 与 `previews/mobile/<id>.jpg`。Edge截屏会排除滚动条/边缘，原始图片尺寸可能小于CSS视口，未放大伪装。
- 产品六例：[revision-products-qa.json](previews/revision-products-qa.json)。游戏三例：[revision-games-qa.json](previews/revision-games-qa.json)。其余四游戏及Apple：[revision-expressive-qa.json](previews/revision-expressive-qa.json)。
- 日本艺术三例：[21_21](research/design-sight-qa.json)、[森美术馆](research/mori-art-museum-qa.json)、[Fuji Rock](research/fuji-rock-qa.json)。荷兰/美国/法国艺术：[Rijksmuseum](demos/rijksmuseum-art/qa.json)、[Met](demos/met-museum/qa.json)、[Philharmonie](demos/philharmonie-music/qa.json)。
- 公共库的独立操作检查见 [library-revision-qa.json](research/library-revision-qa.json)：当时25项，艺术+日本筛选、搜索、两项比较、原站对照、390px iframe与收藏JSON均通过；最终28项目录在Edge核对计数、分类、地区与艺术卡片，见 [library-final-qa.json](previews/library-final-qa.json)。
- `npm run check` 验证必填数据、真实案例/理论来源、八项元素映射、Prompt、本地HTML/CSS引用、JS语法、预览文件及素材清单的实际大小/SHA256。`npm run build` 生成目录与 [完整索引](research/CASE-INDEX.md)。

## 本轮实际交互

| 案例 | 操作与观察 |
| --- | --- |
| Apple | 原始5秒产品视频readyState4；滚动使hero缩放/淡出与浮动导航出现。亮点切换及定时播放推进，设计尺寸/配色更新官方摄影；摄影段scale1.8→1.1343，前标题淡出、后标题淡入。手机Glacier切换有效。 |
| Stripe | 产品菜单展开；Payments弹窗业务模式选Subscription后显示Recurring revenue enabled；URBN客户tab更新文案。 |
| Linear | 修复独立SVG命名空间破图；选择Agent tasks，运行本地示例后Issue变In Review。 |
| Notion | 修复SVG中依赖页面CSS变量的字形填色；官网视频静音播放并可暂停，Ask question显示固定回答与来源。 |
| ChatGPT | 主标题Work与下方tab联动实际界面；图片放大弹窗有效，手机菜单展开关闭有效。 |
| Claude | 官方Cowork视频静音循环；邮箱展开、固定测试数据提交显示本地反馈；年付切月付展示变$20，Team/Enterprise替换套餐区。价格仅是研究快照。 |
| Qoder CN | 纠正国际/国内版混用，改用官方CN标识和满幅绿色工作台；桌面/手机输入任务产生固定本地回执，Mobile形态显示官方手机图。 |
| Zelda | 世界章节切换、视频暂停；用户启用后官方BGM实际播放（99.443秒），测试后关闭。 |
| Persona 5 Royal | 龙司角色及校服/怪盗服切换使用真实官方人物/Persona，手机控件可操作。 |
| 原神 | 两角色切换更新视频/姓名；详情与日历原生dialog可关闭，Escape有效。 |
| 明日方舟 | 阿米娅/陈及精英阶段切换；移动ArrowRight改变人物并转移焦点；BGM实际195.651秒、语音8.203秒播放，下载按钮无遮挡。 |
| 赛马娘 | 下一页更新玩法标题与对应角色；官方预告入口弹窗可打开关闭。 |
| 碧蓝档案 | 官方背景视频按钮从暂停转静音播放，readyState4、时长7.033秒。 |
| 纪念碑谷 | 官方预告由主动点击后开始播放，readyState4、时长67.988秒；背景视频与预告声音有独立控制。 |
| 21_21 | 海报切换更新图片与对应展览链接；键盘、菜单/Escape与语言入口有效。 |
| 森美术馆 | 桌面240px、手机160px馆标按原站实测修正；菜单/语言、教学筛选1/3/4条结果有效。中屏200px为明确记录的可用性适配。 |
| Fuji Rock | 真实桌面/手机照片同步切换；特集按钮使容器实际横滚，山形菜单打开/关闭及Escape有效。 |
| Rijksmuseum | 官方巨字标、观展摄影、菜单与内容画廊；票务入口指向官网，本地不购票。 |
| Met | 官方Austin/Inter字体本地加载；导航与展览控件可用，桌面/手机无破图或横向溢出。 |
| Philharmonie | 展览时段/价格与音乐会节目单折叠、真实摄影图库切换；预约为官网链接。 |

## 公共库、实验室与素材服务

收藏保存在站点 `localStorage` 的 `atlas-favorites`，实测导入重复/无效ID只留下一个有效收藏，刷新仍为01；导出按钮也把JSON显示在文本框，便于直接复制。本轮QA结束后已恢复测试浏览器原始空收藏。未测试的浏览器下载事件不作为成功依据。

详情可展开原站/本地对照、打开研究和素材清单，手机iframe仍可切换海报。国家/地区筛选与类别、文本查询组合。公共库的原有Prompt复制、两项比较和键盘入口沿用并再次操作核对。

元素实验室保留首版已测的方案、案例色板、混搭、三色输入、字体、布局、留白、形状、图形、层级、质感、动效、笔记与配置/Prompt复制；本轮把新案例纳入相同数据入口，并按可读性选择文字色。纯色对比度不等同于整页可访问性认证。

服务端实测：MP4 `Range: bytes=0-99`返回206/100字节及正确Content-Range，超范围返回416，HEAD返回完整文件长度且无正文；`.git/config`被403阻止。服务只绑定127.0.0.1，运行时素材不依赖CDN。

## 八种经典练习的首版验证

以下页面本轮未改动；[qa-metrics.json](previews/qa-metrics.json)是首版历史记录，其中六个旧品牌示例已被替换，不能作为它们当前实现的验证。

| 练习 | 首版实际结果 |
| --- | --- |
| 手绘 | 勾选改变完成计数；贴纸显隐有效。 |
| 等轴3D | 展开楼层时建筑/花园分离，结构说明更新。 |
| 线条 | 进度0/100对应完全隐藏/绘制，数值同步。 |
| 形变 | 三态切换、2400ms参数、暂停/恢复有效。 |
| 瑞士 | 工作坊筛选留下两项；收藏状态变化。 |
| 包豪斯 | 预设/旋转改变构成；SVG源码包含当前角度并可复制。 |
| 80年代复古 | Web Audio初始化与C4演奏执行，关闭后静音。 |
| 像素 | 目的地、日志保存有效；越界移动被阻止。 |

## 验证边界

复现的是选定区域与关键机制，服务端、完整WebGL/3D、全站商业流程未克隆；原站/本地逐区差异见各例fidelity.md。巴黎原站截图受Dark Reader影响，配色取第一方CSS且图注说明；本地预览按官方色彩。其余来源也可能受视口、地区版与抓取日期影响。

验证包括浏览器实际操作、资源完整性与语法；未做完整跨浏览器、性能基准或WCAG认证。减少动态CSS与静态后备已检查，但未修改操作系统偏好模拟全部环境。音频验证了播放状态、时间推进与停止，没有做听感/音质评估。图标、字体、作品与音视频的原始权利和使用范围见资产清单。
