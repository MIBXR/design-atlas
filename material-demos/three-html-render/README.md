# three-html-render：HTML 贴图实验

这个独立 HTML/CSS/JavaScript 示例使用 `three@0.185.1` 与 `three-html-render@0.1.2`。Three.js 提供 `HTMLTexture` 和 `InteractionManager`，three-html-render 提供 HTML-in-Canvas 浏览器 API polyfill。运行文件通过 importmap 自托管在 `vendor/`，不依赖 React、CDN 或构建器。固定版本、来源与原始许可证见 [vendor/NOTICE.md](vendor/NOTICE.md)。

使用静态 HTTP 服务打开 `index.html`；直接双击 `file:` 页面不能作为运行验证。

## 样例与入口

| 查询参数 `demo` | 内容 | 交互与参数 |
| --- | --- | --- |
| `lamp`（默认） | 吊灯照亮原创夜间阅读室 | 左键或单指拖拽拉灯，松手自由摆动；右键拖动调光束角度，右键单击切颜色，双击复位；DOM 面板提供角度、亮度、色板、开关和复位 |
| `plane` | 同一 HTML 页面贴在 3D 平面上 | 指针移动使平面最大倾斜 8°；Three.js InteractionManager 处理按钮交互；主题按钮切换说明，贴图显示悬停与焦点 |

入口示例：`index.html?demo=lamp`、`index.html?demo=plane`。夜间阅读室的中文内容、三个主题与页面美术为本地原创；内容随窗口宽度重排，390px 及以下为单列，HTMLTexture 尺寸与相机取景同步更新。

## 运行行为

吊灯使用 Verlet 摆锤与约束，静止后停止渲染。初始光束角度 `34`、亮度 `1450`、颜色 `#ffb36b`；色板为 `#ffb36b`、`#ffd9a3`、`#8fdcff`、`#c79cff`、`#ff5f7f`。参数来自参考实现的 `config.ts`，面板使用真实 DOM 控件，提供键盘和触屏入口。

`prefers-reduced-motion: reduce` 时灯固定在初始角度，平面不倾斜；面板参数即时生效，没有过渡动画。WebGL 不可用或初始化失败时，保留同一 HTML 页面与 CSS 径向渐变静态灯光，并显示明确的后备说明。

浏览器原生支持 `texElementImage2D` 时使用原生路径，否则通过 polyfill 的 SVG foreignObject 光栅化。在 localhost HTTP 下，无头 Edge `155.0.4283.62` 已实测运行 WebGL，`window.__HTML_IN_CANVAS_POLYFILL__` 为 `true`，实际使用 SVG foreignObject polyfill；原生路径未验证。

同一环境中，两个样例的主题按钮可用鼠标点击并更新说明；`plane` 的悬停和 Tab `focus-visible` 已截图显示在贴图内。Tab 可聚焦真实 DOM 主题按钮及面板 input，ArrowRight 可将角度从 34 调至 35。polyfill 将同一 DOM 元素移至 body 的透明 host，元素仍连接文档；本地 CSS 使用 `transform-style: flat` 适配命中测试，不修改 vendor。390 CSS px 下为单列，源 HTML 最小计算字号 13px，未观察到横向溢出。

真实拖拽松手后约 0、0.5、1.5 秒可见灯位置变化，1.5 秒仍在摆动；最终绘制计数保持不变，确认静止后停止渲染。reduce 模拟下灯固定，间隔 1 秒绘制计数不增，计算过渡时长为 `0s`；面板与右键操作即时生效。右键单击换色、右拖调角度、双击复位已验证。CDP 单指模拟可从正文拖灯，滚动后可触摸选中色板。

独立 Edge 进程以 `--disable-webgl --disable-webgl2` 启动，1440px 与 390px 均已验证静态后备说明、隐藏 canvas、清除 polyfill host，并将同一源 HTML 移回 `#scene`，主题点击仍有效。原生路径、读屏器、真实触屏设备、其他浏览器与长期性能／电量表现未验证。

## 版本与兼容垫片

three-html-render 0.1.2 的 npm 分发不提供 README 所述的 `html-texture`／`interaction-manager` 子路径。本样例使用 three r185 起提供的 HTMLTexture 和 Three addon InteractionManager。

本版本组合需要 `texElementImage2D` 兼容垫片：Three.js 依据函数参数数量选择短重载，polyfill 的函数签名会导致不匹配。垫片仅在 polyfill 启用且签名符合条件时包装为六参数函数，保持原生实现不变。依赖处于 `0.1.x`，升级需要重新核验。

## 文件与署名

- `index.html`：真实 HTML 内容、主题按钮与 DOM 灯光面板。
- `demo.css`：响应式布局、控件、焦点和静态光照后备。
- `demo.js`：Three.js 场景、HTMLTexture、InteractionManager、摆锤和参数交互。
- `vendor/three-0.185.1.module.js`、`three-0.185.1.core.js`：原始 Three.js 核心 ESM。
- `vendor/interaction-manager-0.185.1.js`：原始 Three.js InteractionManager addon。
- `vendor/three-html-render-polyfill-0.1.2.mjs`：原始 three-html-render polyfill ESM。
- `vendor/NOTICE.md`、`dependencies.txt` 与 `LICENSE-*.txt`：逐文件来源、随包依赖声明与独立 MIT 许可。

three-html-render 作者 repalash，MIT；Three.js 核心与 InteractionManager addon 为 MIT。摆锤与 Verlet 约束、指针瞄准与拉拽、光束参数和兼容垫片改写自 jinruozai 的 [HTML-Light-Demo](https://github.com/jinruozai/HTML-Light-Demo/tree/0a0bd3ba53194fff68db78654fc6857ab3faee29)，MIT。创意与美术方向出自 [@kaolti](https://x.com/kaolti)；本样例不使用原作品牌、文案与美术素材。
