# 星槎 STELLAR：太空博物馆示范页与基线

归档日期：2026-10-27。来源为 [ConardLi/garden-skills 固定提交](https://github.com/ConardLi/garden-skills/tree/2b9a89340b70f632d31c0f1c69fce94a7912423e) `2b9a89340b70f632d31c0f1c69fce94a7912423e`。主页面复制 [demo1-with-skill.html](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo1-with-skill.html)，[本地入口](../demos/stellar-museum/index.html)；基线复制 [demo1.html](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/demo/web-design-demo/demo1.html)，[本地基线](../demos/stellar-museum/baseline.html)。

本案例属于“示范作品”。主页面原文使用 STELLARIA／星海博物馆，基线使用星槎博物馆／STELLAR VOYAGER；归档标题按任务命名，页内文字保持来源。博物馆、馆藏、地址、未来任务、预约与订阅均作为示范内容保留，不认定为现实机构资料或真实业务。

## 生成方式与提示词

[来源 README 第 419 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L419) 声明此组页面使用相同提示词，在有 skill 和无 skill 条件下生成。[第 425–431 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L425-L431) 的表格明确无 skill 与有 skill 两列，因此 `baseline.html` 是**未使用 web-design-engineer skill 时的生成结果**。第 427 行表格路径多出 `demo2/` 一层，实际页面位置以固定提交中的文件为准。没有足够证据说明具体生成模型、生成次数、随机参数或人工编辑过程。

[第 423 行](https://github.com/ConardLi/garden-skills/blob/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/web-design-engineer/README.zh-CN.md#L423) 的原始提示词为：

> 帮我做一个'太空探索博物馆'的线上展览首页——全屏 Hero、4 个核心展览介绍、一个至少 6 个节点的时间线、参观预约 CTA、页脚。整体风格要沉浸感强、有宇宙的深邃感。

条目的 `prompt` 照录该原文并注明出处。条目的负向约束为 Web Atlas 撰写的复现边界，不是来源原始负向提示词。来源 README 对两版品质的评价是作者观点，不作为本库已验证事实。

## 页面结构与设计机制

主页面为自然滚动长页：固定导航与全屏首部 → 馆长寄语 → 四展厅 → 八节点编年史 → 预约说明与票券 → 联系、订阅与巨幅字标页脚。

- **版式**：来源 `.container` 最大宽度 1400px，横向间距 `clamp(24px, 5vw, 80px)`；展厅用 `80px 1fr 1.1fr` 的编号／文字／场景三列，列隙 48px。章节标题、说明、编号和细横线负责节奏，960px 以下展厅转为单列。
- **字体层级**：Instrument Serif 负责展示字与斜体，Space Grotesk 负责段落和界面，JetBrains Mono 负责坐标、时间、编号与票券字段。主标题为 `clamp(60px, 11vw, 168px)`；中文沿原字体栈使用后备字形，不将拉丁字体描述为中文字库。
- **色彩**：`--ink: oklch(0.10 0.015 250)`、`--bone: oklch(0.94 0.012 80)`、`--ember: oklch(0.78 0.13 65)`、`--cosmic: oklch(0.66 0.085 220)` 分担背景、主要文字、强调和冷色标签。低亮度边框维持章节区分。
- **三维展示**：首部星球、月球和火星由球体几何与噪声着色器绘制；空间站由圆柱、盒体和球体组合；银河由 12000 个粒子及中心发光体组成。没有外部摄影、三维模型下载或声音依赖。所有场景使用 Three.js 0.160.0，本地完整保留其模块。
- **交互**：标题按 1.1 秒／0.12 秒交错上移；展厅 hover 改留白、颜色、缩放与箭头位移。导航在 `scrollY > 60` 时改变表面，锚点滚动扣除 60px。IntersectionObserver 以 120px 外边距控制场景渲染。UTC 为浏览器时间；不是空间站或轨道接口。
- **主题与声音**：固定深色，没有切换主题。源码没有音频、视频或声音播放流程。减少动态分支限制 CSS 动画并停止对象旋转与背景闪烁，但着色器时间、UTC 更新及平滑锚点仍保留；本地不另改设计。

这些数值来自固定提交源码，浏览器实际结果和对照证据见 [fidelity](../demos/stellar-museum/fidelity.md)。

## 与无 skill 基线逐项对照

| 维度 | 基线 `demo1.html` | 主页面 `demo1-with-skill.html` | 机制上的差别 |
| --- | --- | --- | --- |
| 结构 | 首部行动按钮与数字统计、四张网格展厅卡、左右交替时间线、预约表单、页脚 | 首部宣言、馆长寄语、四个横向展厅、单侧编年史、票券式 CTA、页脚订阅 | 主页面增加编辑式序列与馆长寄语，把展厅从卡片网格转为编号长行；基线保留可填写预约表单 |
| 字体 | Orbitron 标识与科技展示字、Noto Serif SC 中文、JetBrains Mono 元数据 | Instrument Serif 展示与斜体、Space Grotesk 界面、JetBrains Mono 元数据 | 三类字体职责更清楚地贯穿标题、段落和档案标签；不将此判断扩展为普遍优劣 |
| 色彩 | 青、紫、粉渐变与较多发光，硬编码 hex token | 深色 oklch 表面、暖白与小面积琥珀／冷蓝 | 主页面用较少的强调角色组织层级，基线以霓虹和光晕强化太空氛围 |
| 动效 | Canvas 闪烁与流星、CSS 星球轨道、滚动显现、卡片指针光斑；预约成功反馈 2400ms 后重置 | Three.js 星球／空间站／银河、标题上移、展厅 hover、导航表面、UTC 更新 | 从平面装饰和卡片反馈转向程序化场景与编辑行反馈；不代表三维具备真实观测数据 |
| 信息层级 | 大标题与 CTA／统计优先，四卡并置；年份左右交错 | 宣言与场景优先；编号、数据标签、年份和票券字段沿稳定对齐线阅读 | 主页面把阅读路径分为宣言、展品、编年史和访问；基线更集中于落地页行动入口 |

两版文本内容、年代、馆藏和机构设定并不相同，因此这是同题页面机制对照，不是对同一真实机构信息的等值改版。主页面的预约与导览按钮为 `href="#"`；基线表单成功与主页面订阅成功均只有前端状态，不与服务端连接。

## 模块与状态矩阵

下表定位为固定提交主源码；本地保持相同选择器。浏览器实测与仅有源码依据的部分分别记录，未测时序不以截图代替。

| 模块／状态 | 原站定位 | 起始条件与触发 | 源码定义的响应 | 本地对应 | 证据与判定 |
| --- | --- | --- | --- | --- | --- |
| 首部入场 | `.hero-title .row span` | 首次加载 | 两行上移 1.1s，第二行延迟 0.12s | `index.html` 同选择器 | 首屏对照外观一致；1.1s／0.12s 时序仍仅据源码，比较截图停用 CSS 动画 |
| 首部三维构图 | `#hero-planet`、`reposeHero()` | 加载／容器尺寸变化 | 按五档宽高比调整位置与尺度，维持文字空间 | 同 canvas 与函数 | 1440／390px 的六个 canvas 尺寸源／本地完全一致，首屏视觉一致；未逐档量测星球位置和旋转时序 |
| 背景星空与 UTC | `#stars`、`.hero-coords .live` | 首次加载／每帧／每秒 | 正弦闪烁、UTC 字符串更新 | 同选择器 | 同随机种子与固定时钟下首屏一致；闪烁与每秒更新频率仅据源码，功能走查恢复正常时钟 |
| 导航状态与锚点 | `#nav`、`a[href^="#"]` | 下滚超过 60px／返回／点击锚点 | 表面与边线变化；目标减 60px 平滑滚动 | 同选择器 | 源／本地均实测 `nav → nav scrolled → nav`；锚点目标到视口顶部距离均为 60px |
| 馆长寄语 | `#about .intro-grid` | 滚动到章节 | 标签／大段展示字／次级说明按网格呈现 | 同选择器 | 1440／390px 章节顶部与高度源／本地完全一致 |
| 四展厅静态与 hover | `#exhibits .exhibit` | 进入章节／指针进入与离开 | 三列行，padding 48→56px、图像 scale 1.02、箭头位移 8px；离开恢复 | 四个同结构行 | 两侧均有四行且章节几何一致；代表行实测 padding `48→56→48px`、标题色琥珀强调后恢复；缩放／箭头数值仅据源码 |
| 三维可见性 | `canvas.planet-canvas`、IntersectionObserver | 进入／离开视口外 120px 范围 | 只渲染被标记 visible 的场景 | 同观察器与循环 | 六个 canvas 已加载且尺寸一致；离屏节流与 GPU 帧推进未量测，仍为源码依据 |
| 八节点编年史 | `#timeline .milestone` | 自然滚动 | 年份、轨道线、节点、标题、数据沿固定列阅读 | 八个同结构节点 | 两侧实测八个节点，1440／390px 章节顶部与高度一致；未逐节点测量全部文字细节 |
| 预约票券 | `#reserve`、`.reserve-actions`、`.ticket` | 滚动到章节／点击 CTA | 票券为静态示范；按钮保留占位 href | 同结构与链接 | 1440／390px 预约章节几何一致；占位与无后端依据源码，不称为业务通过 |
| 页脚与订阅 | `#archive`、`.newsletter` | 有效邮箱提交 | 阻止默认操作，按钮变为“已订阅” | 同内联处理 | 源／本地提交后均实测“已订阅”；未验证完整键盘焦点与辅助技术 |
| 响应式 | 960／880／760／520px 媒体条件 | 缩小视口 | 展厅、票券、页脚逐级单列；导航链接隐藏但预约保留 | 同媒体查询 | 1440×1000／390×844 源／本地逐节几何与主标题字体相同，无横向溢出；其他宽度未逐档测试 |
| 减少动态 | CSS 与两个 `matchMedia` | 初始偏好为 reduce | 限制 CSS 动画；停止旋转与星空闪烁，仍更新 shader 时间和 UTC | 同逻辑 | 390px 两侧均实测偏好启用、六个 canvas、标题动画时长 `1e-06s`；对象旋转、shader 与闪烁细节仅据源码 |
| 基线完整浏览与表单 | `baseline.html` 的 `.reveal`、`[data-card]`、`.booking-form` | 滚动／mousemove／填写提交 | 首次滚动显现；指针光斑；成功反馈后 2400ms 重置 | 原基线逻辑 | 1440／390px 已截图；提交显示成功，2600ms 后实测按钮恢复“确认登舱 →”且输入清空；显现／指针光斑时序未单独量测 |

## 浏览器实测结果

主负责人使用默认图形后端的无头 Edge `155.0.4283.62`，DPR 1、`zh-CN`、系统浅色偏好，在 1440×1000 与 390×844 CSS 视口对照同一静态服务器中的来源页面和本地页面。两者均按页面自身固定深色呈现。证据保存在本任务交付目录的 `geometry-results.json`、`runtime-results.json`、`ui-results.json` 及 `shots/`，不纳入案例运行源码。

| 实测项目 | 1440×1000 | 390×844 |
| --- | --- | --- |
| 源／本地主标题 computed font | 均为 `158.4px / 158.4px "Instrument Serif", "Songti SC", serif` | 均为 `60px / 60px "Instrument Serif", "Songti SC", serif` |
| 文档宽度／高度 | 两侧均 1440／8847px | 两侧均 390／10422px |
| 首部星空与星球 canvas | 两侧均 1440×1000 | 两侧均 390×844 |
| 四个展厅 canvas | 两侧均各 564×352 | 两侧均各 340×212 |
| 馆长寄语、展厅、编年史、预约章节 | 章节顶部与高度逐项相等 | 章节顶部与高度逐项相等 |
| 案例列表与本案例详情 | “示范作品 / 2 个条目”、分类计数 02；详情 iframe 标题正确，无横向溢出 | 筛选结果与详情 iframe 正确，无横向溢出 |

首屏并排图 `shots/compare-stellar-1440.png` 左为来源、右为本地，视觉核对一致。比较采用相同随机种子、固定浏览器时钟并推进 2000ms，截图时使用 `animations: disabled`；没有改写来源或本地源码。该控制用于排除随机星点、UTC 与动画取帧时刻差异，不证明入场时长、旋转或 shader 帧序列完全一致。功能走查恢复正常时钟。普通独立 Demo、基线、案例列表和详情均保存桌面／手机截图，两份 JPEG 预览来自实际浏览器。

导航回程、锚点、代表展厅 hover、订阅与基线表单结果见上表。最终浏览器轮次的控制台错误、404 和页面异常均为 0。截图与几何结果证明本次环境下的外观和已执行状态；GPU 性能、离屏节流和未执行分支不因此视为通过。

## 资源与复刻边界

两份 HTML 以固定提交 Git blob 为规范来源；本地只替换 Google 字体样式 URL、字体预连接 URL 和主页面 Three.js importmap URL。Google Fonts 返回的字体 CSS 保留家族、字重、样式、`font-display` 和 `unicode-range`，仅将每个字体 `src` 替换为本地 WOFF2。所有字体文件和第三方许可保留下载原字节。完整 URL／本地路径／用途／字节大小见 [素材清单](../demos/stellar-museum/assets-manifest.json)，逐项替换见 [fidelity](../demos/stellar-museum/fidelity.md)。

HTML／CSS／JavaScript 来源仓库采用 MIT，原始许可随 Demo 保留。Three.js 采用 MIT；Instrument Serif、Space Grotesk、JetBrains Mono、Orbitron、Noto Serif SC 均附各自 SIL OFL 1.1。没有把来源仓库许可概括为任何真实品牌或第三方媒体的授权。

本轮不提取巧思，`patternIds` 为空。候选机制交由任务报告汇总，完整案例继续保留所有来源机制。

未验证内容：冷／热缓存交接、慢网络及失败恢复、真实触摸与辅助技术、完整键盘焦点、非 1440／390px 断点、逐帧动画与旋转／shader 时序、离屏渲染节流和 GPU 性能。生成模型和参数、示范文案所述机构与未来事件不作真实性验证。
