# 添加与更新案例

先观察原站，再实现代码。品牌案例以真实结构与素材为依据；经典风格练习以原作者实例和理论为依据。不要把同一个布局仅更换配色当成多种参考页。

1. 记录官网实际 URL、语言/年度版本、日期；保存首屏与关键滚动状态的截图，图片扩展名与真实格式一致。
2. 分析配色角色、字体尺度、网格留白、图像、形状、信息层级、动效及协调关系。区分可观测事实、作者解释和本库推断。
3. 选择有辨识度的区域复现，按钮、标签、音频和滚动反馈必须可操作。使用真实素材，保留正确比例。
4. 素材本地化，记录 URL、版权归属、用途、SHA256与处理方式；不能移入追踪像素或原站统计脚本。视频剪短或转码需公开记录。
5. `fidelity.md` 按区域比较已复现、近似和未实现内容。购买/预约/登录可明确链接原站，不伪装成本地服务。
6. 运行数据与资源检查，实测宽屏和390px手机、核心交互、媒体用户启用/关闭、无横向溢出，再保存预览和Git提交。

文件：`entries/<id>.json`、`research/<id>.md`、`demos/<id>/index.html`及配套文件、`previews/<id>.jpg`。手机截图位置记入验证记录。图像可用 JPG/PNG/WebP/AVIF，字体/音视频也需本地化，避免运行时外网依赖。

基础字段：`id, order, title, subtitle, category, tags, summary, accent, background, principles, productFocus, interaction, theme, constraints, useCases, avoid, tokens, sources, prompt, negativePrompt, demo, preview, research, exercise, composition`。分类为 `产品 / 游戏/IP / 艺术/文化 / 经典风格`。

`tokens` 包含 palette（hex数组）、type/layout/motion（字符串）。`composition` 包含 color/typography/layout/imagery/shape/hierarchy/motion/coherence 八项。`sources` 每项包含 title/url/type/note，type 是实例/理论/规范；至少有一个真实实例与一个理论或规范来源。

原站研究再增加：`implementation: "reference-study"`、`country`、`referenceUrl`、`fidelity`、`assetManifest`，可加 `referencePreview`、`edition`。地区用于具体参考机构或创作来源，跨国与版本差异注明；经典理论不强行归为某国的现代官网风格。

Prompt要写实际页面结构、元素尺度、资产来源、关键状态、响应式与减少动效处理，不只有风格形容词。不要照搬长段营销文案。`prefers-reduced-motion` 应保留全部可读内容；声音默认关闭或用户触发；保留浏览器原生滚动。

检查命令：`npm run build` → `npm run check` → 浏览器操作 → `node scripts/check.mjs --require-previews`。截图与资产成功存在不能替代实际交互验证。
