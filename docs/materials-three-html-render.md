# three-html-render：HTML-in-Canvas polyfill

[本地工作台](../material-demos/three-html-render/index.html) · [结构化资料](../materials/three-html-render.json) · [固定版本源码](https://github.com/repalash/three-html-render/tree/63f085e3fe7be11f0679c0ac17edc2e18e743add)

## 来源与许可

本条目使用 repalash 的 [three-html-render npm 0.1.2](https://registry.npmjs.org/three-html-render/0.1.2)，固定提交 `63f085e3fe7be11f0679c0ac17edc2e18e743add`，核验日期 `2026-10-27`。本地版本组合为 `three@0.185.1` 与 `three-html-render@0.1.2`；Three.js 的 [固定提交](https://github.com/mrdoob/three.js/tree/2431a09f46f34c560bc8e44b33be0e567723d5b9)为 `2431a09f46f34c560bc8e44b33be0e567723d5b9`。polyfill、Three.js 核心及 InteractionManager addon 保留原始文件字节，各自采用 MIT 许可。

页面实现、样式与光照代码改写自 jinruozai 的 [HTML-Light-Demo 固定提交](https://github.com/jinruozai/HTML-Light-Demo/tree/0a0bd3ba53194fff68db78654fc6857ab3faee29)，采用 MIT 许可。原生移植依据为 `MorsPageSurface.tsx`、`globals.css`、`MorsLightCanvas.tsx`、`config.ts` 和 `three-html-compatibility.ts`；[mors-logo.svg](../material-demos/three-html-render/mors-logo.svg) 保持参考仓库原始字节。

MORS² 品牌、文案、标志与美术方向出自 [@kaolti](https://x.com/kaolti) 原作，本仓库用于个人非商业参考。软件与参考实现代码的 MIT 许可、原作署名分别保留，原始许可和逐文件来源见 [vendor/NOTICE.md](../material-demos/three-html-render/vendor/NOTICE.md)。

## 能力与演示范围

[HTML-in-Canvas](https://github.com/WICG/html-in-canvas) 是 WICG 的浏览器标准提案，原生支持仍处于实验阶段。本条目收录的是提供兼容能力的 three-html-render 库，不是标准本身。`HTMLTexture` 和 `InteractionManager` 从 three r185 起由 Three.js 提供；本样例使用这些接口，three-html-render 补齐浏览器 API。

| 用法 | 库与 Three.js 构成 | 本地组合与可操作状态 |
| --- | --- | --- |
| 吊灯照亮网页 | HTML-in-Canvas polyfill、HTMLTexture、SpotLight | 将完整 MORS² 页面放入参考光照场景；左键或单指拉灯，松手自由摆动；右键拖动调光束角度、右键单击切颜色、双击复位 |
| 基础平面 | HTML-in-Canvas polyfill、HTMLTexture、Three.js InteractionManager | 同一 MORS² 页面贴在 3D 平面上，指针移动产生最大 8° 倾斜；保留概念切换、面板、悬停和键盘焦点 |

页面保留原标志、英文文案与 Space、Meta、Field、Rule、Latent 五个概念按钮及其说明。灯光面板保留光束角度、亮度、五色预设、自定义颜色、开关和复位，使用真实 DOM 控件承担键盘与触屏操作。画面内的排版、字号、色彩和装饰按参考保留。

## 参数与接入

使用 `npm install three@0.185.1 three-html-render@0.1.2`。独立演示通过 importmap 指向本地 `vendor/`，不依赖 React、CDN 或运行时构建。通过静态 HTTP/HTTPS 服务访问，不能用直接打开 `file:` 文件代替浏览器运行验证。

默认入口为 `index.html?demo=lamp`，基础平面为 `index.html?demo=plane`。吊灯初始 `angle: 34`、`brightness: 1450`、`color: #ffb36b` 与五色色板来自参考项目 `config.ts`，场景与摆锤数值按 `MorsLightCanvas.tsx` 移植。平面最大倾斜 8° 是本地演示参数。

本素材处于 `0.1.x`。npm 0.1.2 不提供 README 所述的 `html-texture`／`interaction-manager` 子路径，不能按这些路径导入；本地从 Three.js 核心和 addon 使用对应能力。

本版本组合需要 `texElementImage2D` 兼容垫片：Three.js 根据函数的参数数量选择上传重载，polyfill 的函数签名会触发不适用的短重载。改写自参考实现的垫片仅在 polyfill 启用且签名符合条件时包装为六参数函数，原生实现保持原样。升级任一依赖后需重新核验，不能将此组合的结果推及其他版本。

接入还通过 polyfill 的 `pageStyles` 仅向 SVG 快照注入 `html,body{overflow:visible!important}`，使高于视口的窄版灯光面板完整光栅化；不修改 vendor 原始文件。

## 输入、动态与后备

桌面 CSS 视口不小于 768px 时保留原作 1440×810 页面与参考 fit 取景。小于 768px 时采用原 mobile 上下排列，让页面宽度跟随视口，并以 `height: auto`、`min-height: 1180px` 容纳完整内容；窗口 resize 同步更新 HTMLTexture 尺寸与相机取景。画面内文字按原作设计保留。

正常模式下吊灯保留参考的 Verlet 摆锤与约束、指针瞄准与拉拽、松手动量、右键调节和双击复位，静止后停止渲染。`prefers-reduced-motion: reduce` 时灯固定在初始角度，平面不倾斜；面板照常即时生效，没有过渡动画。

在本地 HTTP 下，无头 Edge `155.0.4283.62` 已实测运行真实 WebGL，实际使用 SVG foreignObject polyfill 路径。浏览器有原生 `texElementImage2D` 时走原生路径，原生路径未验证。

1440px 同条件对照中，原作与本地的源页面均为 1440×810，投影矩形均为 `(155.4016, 144.3815, 1129.1948, 628.1824)`；标题计算字号 77px、字重 670、行高 72.38px、字体栈及控制板边界相同。初始画面观察未见明显的构图、黑位、材质或光照差异，保留参考场景的暗部表现。摆动画面的光斑边缘有轻微偏移；取帧时间差为可能原因，属于推断，未独立验证。

390px 下源页面实测为 390×1240，五个概念均可真实点击切换。Tab 依次聚焦 Space、Meta、Field、Rule、Latent、power、beam，`focus-visible` 落在文档内真实 DOM 控件；ArrowRight 将光束角度从 34 调至 35。右键单击切换下一颜色，右拖 100px 将角度从 34 调至 48。

摆动后的绘制计数停在 10150，等待 1.2 秒仍为 10150，确认停止渲染。减少动态时灯固定，绘制计数间隔 1 秒保持 `10 → 10`；plane 指针移动前后的矩阵相同，正常模式矩阵会改变。CDP 单触点模拟可拖灯，无 pointercancel，拖动时 `scrollY` 保持 0；浅蓝色板可触摸选中。

WebGL 不可用或初始化失败时，显示同一 MORS² HTML 页面与 CSS 静态光照，并标明“当前环境无法运行 WebGL 光照，显示的是静态示意。”禁用 WebGL 的独立 Edge 进程已验证 390px 后备：可用区域宽 375px、无横向溢出，polyfill host 清除、源页面回到 scene，原面板开关可从开启切换为关闭。

原生渲染路径、读屏器、真实触屏设备、其他浏览器和长期性能／电量表现未验证，不沿用上游 README 的可访问性结论。

适合氛围型首屏、作品集、发布页和 3D 展台中的可交互面板；避免用于信息密集页、长阅读页，以及对性能或电量敏感的移动端主流程。
