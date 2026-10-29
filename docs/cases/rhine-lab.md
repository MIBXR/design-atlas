# 莱茵生命：官方影像的网页转译

采集／复核日期2026-10-09。主源为 [官方特别映像《莱茵生命：访问》](https://www.bilibili.com/video/BV1rr4y1b7sz/)，明日方舟官方UID161775300于2022-04-26发布。辅助源为 [2023四周年官方专题](https://ak.hypergryph.com/special/4th-anniversary/index.html) 的孤星活动章节。作品日期与访问日期分别记录。

本案例为 **官方影像的网页转译／教学改编**，`studyScope: visual-adaptation`。本轮未确认可直接逐点击对照的官方莱茵品牌网站，不把二创站当官方。画面／片内运动归observed；网页章选、热点、显隐、阅读和响应式归adapted，不把影片身份提示做成真实认证。

## 方法与精确观察

浏览器实际观看，并按47个时间位置采集1920×1080解码帧，核验播放器已观测的公开视频轨道：HEVC Main、25fps、318.8秒、25,735,789字节。完整原轨道和比较截图存仓库外；本库保存四必要片段、四原帧及节点裁切。原hash、来源路径与媒体变换见 [素材清单](../../demos/cases/rhine-lab/assets-manifest.json)，带签名／查询参数的临时地址不进仓库。直接检索曾412；视觉以实际播放和解码帧为依据。以下是选段边界，不把采样解释为全部镜头切点的逐帧测量。

| 原作区间 | observed构成与运动 | 保存 |
| --- | --- | --- |
| 19.20–23.40秒 | 巨大黑白弧环收束为细环，橙色小节点／中心圆盘／处理文字 | 4.20秒片段，22秒帧 |
| 27.00–39.20秒 | 多排平行米白透明立体档案覆盖视野；单件X-001抬出并靠近镜头；35–38秒四角标定、细斜射线／机密文字 | 12.20秒片段，35秒帧 |
| 39.20–51.52秒 | 大小双环有厚度、透明灰色渐变／反射／橙色内缘；背景网格随镜头旋转形成参照 | 12.32秒片段，48秒帧 |
| 59.60–73.40秒 | 十机构字标形成中心／外围；不同表面／倾斜／尺寸，环形符号嵌入字母；细射线／BSN附近橙色空心构件 | 13.80秒片段，68秒帧 |

68秒机构画面不是五块等宽卡片，可逐项核对：

| 代码 | 可见英文全称 | 位置关系 |
| --- | --- | --- |
| CMPT CTRL | COMPONENTS CONTROL SECTION | 中心双行黑底白字 |
| DEF | DEFENSE SECTION | 左上外围 |
| HRI | HUMAN RESOURCES INVESTIGATION SECTION | 左侧外围 |
| BSN | BUSINESS SECTION | 左中外围，原橙色焦点附近 |
| ENG | ENGINEERING SECTION | 左下倾斜黑色表面 |
| STRU | STRUCTURAL SECTION | 右上斜置黑白分带 |
| SCIEN | SCIENTIFIC INVESTIGATION SECTION | 右侧较长字标 |
| ORIG | ORIGINIUM ART SECTION | 右中横向字标 |
| NRG | ENERGY SECTION | 右下外围 |
| ECO | ECOLOGICAL SECTION | 右下深色模块 |

仅记录可见代码／全称／构图，不据尺寸推断权级，不臆造中文官方译名。真实连字与材质由媒体像素保留，未确认字体名称或取得3D工程。

四周年孤星活动网页另可见机械空间背景、两预告入口、LONE TRAIL／孤星标题、公告和多色横线。它只用于宣传网页／影像比较，不证明莱茵档案存在对应网页点击，本地背景仅用于来源卡。本次莱茵主要是米白透明阵列、黑白机构连字、灰色光学与橙色内缘／节点；[终末地](endfield-industrial.md) 的白底亮黄记录模块和 [原版方舟](arknights-world.md) 的黑灰青档案各有真实网页结构，不用统一标签抹去差异。

## 巧思与限制

- [样本阵列的抽出选择](../../entries/patterns/specimen-pullout-selection.json)：adapted；保留真实阵列／焦点板，网页单一状态同步观察阅读，显隐是新增机制。
- [机构缩写的中心矩阵](../../entries/patterns/department-code-matrix.json)：observed构成；十组特殊连字／尺度／表面／中心关系保留，热点／节点迁移另归adapted。
- [单一信号色集中强调](../../entries/patterns/restrained-signal-color.json)：复用已有机制；橙色焦点来自影像，本地同时有文字／程序状态，不按品牌再建重复巧思。

## 外部代码参考：RhineLabUI

[LBEILC 的原仓库](https://github.com/LBEILC/RhineLabUI) 与 [用户 fork](https://github.com/MIBXR/RhineLabUI) 提供第三方代码复刻。2026-10-11 两者均指向 [`12cc5e4013acb9408f753ff71de6b8492299b7c8`](https://github.com/MIBXR/RhineLabUI/tree/12cc5e4013acb9408f753ff71de6b8492299b7c8)。TypeScript、Three.js 与 Vite 实现 DOM／SVG 开场、循环档案阵列、玻璃及正文解密、模型旋转／拆解／重组；检索、收藏属于开发者扩展，不归为官方影片的网页交互。

本案例只提供链接和简要说明，不集成其 Three.js 工程、GLB、字体或音频。已阅读并按 Git blob 核验 README、依赖、许可与关键源码；未安装运行，视觉精度、移动端表现、帧率和功耗均未实测。作者也说明其折射、景深与局部细节存在复现差异。

[MIT 许可](https://github.com/MIBXR/RhineLabUI/blob/12cc5e4013acb9408f753ff71de6b8492299b7c8/LICENSE) 为作者有权授权的原创代码保留 Copyright (c) 2026 LBEILC；游戏名称、标志、原作视觉／音频、第三方字体与依赖不因此获得统一授权。可独立研究 [DOM 正文遮挡条](https://github.com/MIBXR/RhineLabUI/blob/12cc5e4013acb9408f753ff71de6b8492299b7c8/src/document-decryption.ts)、[开场时间轴](https://github.com/MIBXR/RhineLabUI/blob/12cc5e4013acb9408f753ff71de6b8492299b7c8/src/boot-motion.ts) 与 [可中断面板过渡](https://github.com/MIBXR/RhineLabUI/blob/12cc5e4013acb9408f753ff71de6b8492299b7c8/src/ui-transitions.ts)，本地 Demo 没有移植这些模块。
