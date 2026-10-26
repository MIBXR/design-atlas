# three-html-render：HTML-in-Canvas polyfill

[本地工作台](../material-demos/three-html-render/index.html) · [结构化资料](../materials/three-html-render.json) · [固定版本源码](https://github.com/repalash/three-html-render/tree/63f085e3fe7be11f0679c0ac17edc2e18e743add)

## 来源与许可

本条目使用 repalash 的 [three-html-render npm 0.1.2](https://registry.npmjs.org/three-html-render/0.1.2)，固定提交 `63f085e3fe7be11f0679c0ac17edc2e18e743add`，核验日期 `2026-10-27`。本地版本组合为 `three@0.185.1` 与 `three-html-render@0.1.2`；Three.js 的 [固定提交](https://github.com/mrdoob/three.js/tree/2431a09f46f34c560bc8e44b33be0e567723d5b9)为 `2431a09f46f34c560bc8e44b33be0e567723d5b9`。polyfill、Three.js 核心及 InteractionManager addon 保留原始文件字节，各自采用 MIT 许可。

吊灯的摆锤与 Verlet 约束、指针瞄准与拉拽、光束参数和兼容垫片改写自 jinruozai 的 [HTML-Light-Demo 固定提交](https://github.com/jinruozai/HTML-Light-Demo/tree/0a0bd3ba53194fff68db78654fc6857ab3faee29)，采用 MIT 许可。创意与美术方向出自 [@kaolti](https://x.com/kaolti)；本样例使用原创中文“夜间阅读室”页面，不使用原作品牌、文案或美术素材。原始许可和逐文件来源保存在 [vendor/NOTICE.md](../material-demos/three-html-render/vendor/NOTICE.md)。

## 能力与演示范围

[HTML-in-Canvas](https://github.com/WICG/html-in-canvas) 是 WICG 的浏览器标准提案，原生支持仍处于实验阶段。本条目收录的是提供兼容能力的 three-html-render 库，不是标准本身。`HTMLTexture` 和 `InteractionManager` 从 three r185 起由 Three.js 提供；本样例使用这些接口，three-html-render 补齐浏览器 API。

| 用法 | 库与 Three.js 构成 | 本地组合与可操作状态 |
| --- | --- | --- |
| 吊灯照亮网页 | HTML-in-Canvas polyfill、HTMLTexture、SpotLight | 将真实 HTML 放入灯光场景；左键或单指拉灯，松手自由摆动；右键拖动调光束角度、右键单击切颜色、双击复位 |
| 基础平面 | HTML-in-Canvas polyfill、HTMLTexture、Three.js InteractionManager | 同一 HTML 贴在 3D 平面上，指针移动产生最大 8° 倾斜；三个主题按钮切换说明，贴图显示悬停和焦点状态 |

夜间阅读室的标题、说明、三个主题按钮与灯光面板均为本地原创。面板使用普通 DOM 控件提供角度、亮度、色板、灯光开关和复位，同时承担键盘与触屏操作。

## 参数与接入

使用 `npm install three@0.185.1 three-html-render@0.1.2`。独立演示通过 importmap 指向本地 `vendor/`，不依赖 React、CDN 或运行时构建。通过静态 HTTP/HTTPS 服务访问，不能用直接打开 `file:` 文件代替浏览器运行验证。

默认入口为 `index.html?demo=lamp`，基础平面为 `index.html?demo=plane`。吊灯初始 `angle: 34`、`brightness: 1450`、`color: #ffb36b` 与五色色板来自参考项目 `config.ts`。平面最大倾斜 8° 是本地演示参数。

本素材处于 `0.1.x`。npm 0.1.2 不提供 README 所述的 `html-texture`／`interaction-manager` 子路径，不能按这些路径导入；本地从 Three.js 核心和 addon 使用对应能力。

本版本组合需要 `texElementImage2D` 兼容垫片：Three.js 根据函数的参数数量选择上传重载，polyfill 的函数签名会触发不适用的短重载。改写自参考实现的垫片仅在 polyfill 启用且签名符合条件时包装为六参数函数，原生实现保持原样。升级任一依赖后需重新核验，不能将此组合的结果推及其他版本。

## 输入、动态与后备

HTML 页面的宽度随视口变化，390px 及以下重排为单列；窗口 resize 同步更新 HTMLTexture 尺寸与相机取景。普通文字与控件最终字号至少 12px，功能图标使用内联 SVG。

正常模式下吊灯使用 Verlet 摆锤与约束，静止后停止渲染。实测真实拖拽松手后约 0、0.5、1.5 秒的灯位置不同，1.5 秒仍在摆动；最终绘制计数停在 5045，再等待 1.2 秒仍为 5045，确认停止渲染。

`prefers-reduced-motion: reduce` 时灯固定在初始角度，平面不倾斜；面板照常生效，只做即时变化，没有过渡动画。本地模拟中，固定灯的绘制计数间隔 1 秒保持 `5 → 5`，计算 `transitionDuration` 为 `0s`。面板与右键操作仍即时有效：右键单击切换下一颜色，右拖 100px 将角度 34 调至 48，双击恢复 34 与初始色。

浏览器有原生 `texElementImage2D` 时走原生路径；没有原生支持时由 polyfill 使用 SVG foreignObject 光栅化。在 localhost HTTP 下，无头 Edge `155.0.4283.62` 已实测运行 WebGL，`window.__HTML_IN_CANVAS_POLYFILL__` 为 `true`，实际使用 SVG foreignObject polyfill 路径。原生路径未验证。

同一环境中，`lamp` 与 `plane` 的主题按钮均可用鼠标点击并更新说明；`plane` 的按钮悬停和 Tab `focus-visible` 已截图确认显示在贴图中。Tab 可聚焦真实 DOM 主题按钮及面板 input，ArrowRight 可将角度从 34 调至 35。DOM 保留并连接文档，polyfill 将同一元素移入 body 内的透明 host，不是隐藏副本；本地 CSS 以 `transform-style: flat` 适配透明 host 的层叠命中，不修改 vendor。

390 CSS px 下页面为单列，源 HTML 最小计算字号为 13px，未观察到横向溢出。CDP 单指触摸模拟可从正文拖灯，拖动时 `scrollY` 保持 0；滚动页面后可触摸选中浅蓝色板。该结果只覆盖本地无头 Edge 的已执行状态，不代表全部浏览器或真实设备通过。

WebGL 不可用或初始化失败时，显示同一张 HTML 页面，以 CSS 径向渐变模拟静态光照，并标明“当前环境无法运行 WebGL 光照，显示的是静态示意。”独立 Edge 进程通过 `--disable-webgl --disable-webgl2` 启动后，1440px 与 390px 均已截图验证：canvas 隐藏、polyfill host 清除、同一源 HTML 移回 `#scene`，主题点击仍更新内容。

原生渲染路径、读屏器、真实触屏设备、其他浏览器和长期性能／电量表现未验证，不沿用上游 README 的可访问性结论。

适合氛围型首屏、作品集、发布页和 3D 展台中的可交互面板；避免用于信息密集页、长阅读页，以及对性能或电量敏感的移动端主流程。
