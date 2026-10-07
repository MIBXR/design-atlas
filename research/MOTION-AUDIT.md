# 网页动效审计索引 · 2026-10-07

范围为21个真实品牌／文化案例。8个未改动的经典构成练习沿用已有研究与验证。这次检查触发、状态、方向、时序、滚动连贯性和媒体控制，不以静态截图或代码含动画关键词代替真实浏览器操作。

原站会更新，来源均指观察日期的具体版本。**观察值、公开源码核验、本地近似、未实现或不可访问**分别记入专项记录；不声明21页与原站完全等价。

## 逐项映射

| 案例 | 本轮保留／补回的机制 | 实施边界 |
|---|---|---|
| [Apple](../index.html#style/apple-product) | 镜头段真实视频逐帧scrub；标题随滚动淡出；亮点图库进度、暂停和末尾重播 | 亮点图库仍为静帧；专用五段视频未全移植；[详细差异](../demos/apple-product/fidelity.md) |
| [Stripe](../index.html#style/stripe-platform) | 原SingleWave WebGL波带、响应式shader与暂停；Products悬停；客户标识流；付款终端与checkout同步换场景 | 金融矩阵为局部DOM；渲染loader和Worker路径为本地适配；[详细差异](../demos/stripe-platform/fidelity.md) |
| [Linear](../index.html#style/linear-workflow) | 真实任务板、Insights与项目总览分别切换；Working局部扫光 | 完整Intake消息自动流程未移植；[详细差异](../demos/linear-workflow/fidelity.md) |
| [Notion](../index.html#style/notion-editorial) | 真实6词/2500ms；300ms宽度变换；官方视频；两列bento与整行 | 插画、后续客户墙为局部范围；[详细差异](../demos/notion-editorial/fidelity.md) |
| [ChatGPT](../index.html#style/chatgpt-platform) | 悬停模式；7/7/6独立素材进出；滚动视差与窗口交接；左栏滚动及键盘 | 连续插值、交错及自动周期为本地近似；[详细差异](../demos/chatgpt-platform/fidelity.md) |
| [Claude](../index.html#style/claude-platform) | 保留官方媒体，真实play/pause状态与本地表单 | 本次官网跳转登录与安全验证，未复验源hover/scroll；[详细差异](../demos/claude-platform/fidelity.md) |
| [Qoder](../index.html#style/qoder-platform) | 公开脚本核验五平台400ms/20s；原路径与焦点时间；本地滑轨 | 现场演示按钮受自动审批限制；曲线几何局部近似；[详细差异](../demos/qoder-platform/fidelity.md) |
| [Google Material](../index.html#style/google-material) | 官网9秒视频、主题、全局暂停、圆角反馈、导航目录 | 目录为本地dialog；涟漪近似，完整Angular路由未复制；[详细差异](../demos/google-material/fidelity.md) |
| [塞尔达](../index.html#style/zelda-world) | 同屏章节与原视频切换、单一播放区域、键盘与用户启用BGM | 仅当前世界舞台，不含完整官网其他栏目；[详细差异](../demos/zelda-world/fidelity.md) |
| [P5R](../index.html#style/persona-kinetic) | 官方角色素材与500ms水平角色轨 | 角色信息与轮播按局部页面版本复建；[详细差异](../demos/persona-kinetic/fidelity.md) |
| [原神](../index.html#style/genshin-world) | 角色透明图层切换与垂直章节 | 根据观察做局部状态，未接入游戏服务；[详细差异](../demos/genshin-world/fidelity.md) |
| [明日方舟](../index.html#style/arknights-world) | 官方角色和工业分区；本地导航与状态反馈 | 细节依专属fidelity；不把所有元素做成统一飞入；[详细差异](../demos/arknights-world/fidelity.md) |
| [赛马娘](../index.html#style/uma-musume) | 400ms角色移动、有界前后按钮与触屏 | 固定版本角色范围；[详细差异](../demos/uma-musume/fidelity.md) |
| [碧蓝档案](../index.html#style/blue-archive) | 四角色学院资料卡、真实图像与1000ms水平滑轨 | 公开学院页面为补充参考，未全量角色资料；[详细差异](../demos/blue-archive/fidelity.md) |
| [纪念碑谷](../index.html#style/monument-valley-game) | 真实建筑图像和500ms横向截图轨 | 不发明滚动飞入或真实3D游戏引擎；[详细差异](../demos/monument-valley-game/fidelity.md) |
| [21_21](../index.html#style/design-sight) | 两张海报、6秒循环与1000ms交叉淡化 | 后续展览详情链接官方；[详细差异](../demos/design-sight/fidelity.md) |
| [森美术馆](../index.html#style/mori-art-museum) | 作品优先与机构编辑排版，保留克制浏览 | 未观察到hero自动轮播，不自行添加；[详细差异](../demos/mori-art-museum/fidelity.md) |
| [Fuji Rock](../index.html#style/fuji-rock) | 年度照片3.6秒循环、800ms淡化与600ms菜单离场 | 不复现售票后台和完整活动服务；[详细差异](../demos/fuji-rock/fidelity.md) |
| [Rijksmuseum](../index.html#style/rijksmuseum-art) | 全幅摄影与全屏菜单500ms线性淡入 | 不添加未观察到的hero循环；[详细差异](../demos/rijksmuseum-art/fidelity.md) |
| [The Met](../index.html#style/met-museum) | 30.49秒官方季节视频、暂停保留当前帧、展览原生横架 | 本地横架按钮为额外可达性辅助；[详细差异](../demos/met-museum/fidelity.md) |
| [巴黎爱乐厅](../index.html#style/philharmonie-music) | 顺序展览摄影；侧栏折叠；500ms三人音乐会滑轨与暂停 | 音乐会自动周期6秒为近似，相关卡片比原独立详情小；[详细差异](../demos/philharmonie-music/fidelity.md) |

## 可查询的证据

- [产品六站专项](MOTION-AUDIT-PRODUCTS.md) · [运行检查](MOTION-QA-PRODUCTS.json)
- [游戏与日本艺术专项](MOTION-AUDIT-GAMES-ART-JP.md)
- [ChatGPT原站图层／阶段](chatgpt-motion-evidence.json) · [手机运行检查](chatgpt-platform-mobile-qa.json)
- [Material观察与理论](google-material.md) · [桌面／手机／状态检查](google-material-qa.json)
- [西方博物馆与音乐展复核](MOTION-QA-WESTERN-ARTS.json)

## 观察限制

Claude本次公开官网跳转登录并遇安全验证，没有操作账户或绕过验证。Qoder公开演示的按钮／AX动作被自动审批拒绝，理由是可能触及账户或私有项目；改为读取匿名公开HTML/CSS/JS与干净IAB首页的公开图形属性，未重复被拒绝的动作。两者的源现场操作限制保留。

减少动态效果的样式与控制逻辑已检查；浏览器测试接口未提供可信的系统偏好模拟，不把代码检查称为真实reduce全流程操作。已支持媒体暂停、自然滚动与可见键盘焦点；未声明可访问性认证。

## 库内断点

库内新增真实1440×1000桌面iframe，缩放显示但保持1440px布局宽度。ChatGPT默认进入此模式，保留滚动舞台及左侧模式栏。手机预览与适应面板可切换；独立打开可体验原始尺寸。见[集成操作记录](library-motion-preview-qa.json)。
