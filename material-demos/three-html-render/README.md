# three-html-render：HTML 贴图实验

这个独立 HTML/CSS/JavaScript 示例使用 `three@0.185.1` 与 `three-html-render@0.1.2`。Three.js 提供 `HTMLTexture` 和 `InteractionManager`，three-html-render 提供 HTML-in-Canvas 浏览器 API polyfill。运行文件通过 importmap 自托管在 `vendor/`，不依赖 React、CDN 或构建器。固定版本、来源与原始许可证见 [vendor/NOTICE.md](vendor/NOTICE.md)。

使用静态 HTTP 服务打开 `index.html`；直接双击 `file:` 页面不能作为运行验证。

## 样例与入口

| 查询参数 `demo` | 内容 | 交互与参数 |
| --- | --- | --- |
| `lamp`（默认） | 吊灯照亮 MORS² 页面 | 左键或单指拖拽拉灯，松手自由摆动；右键拖动调光束角度，右键单击切颜色，双击复位；保留原 DOM 灯光面板 |
| `plane` | 同一 MORS² 页面贴在 3D 平面上 | 指针移动使平面最大倾斜 8°；Three.js InteractionManager 处理按钮交互；保留五个概念切换、灯光面板、悬停与焦点 |

入口示例：`index.html?demo=lamp`、`index.html?demo=plane`。页面以原生 HTML/CSS/JavaScript 移植参考的 `MorsPageSurface.tsx` 与 `globals.css`，保留 MORS² 标志、英文文案、Space／Meta／Field／Rule／Latent 五个概念和原面板。

桌面 CSS 视口不小于 768px 时使用原作 1440×810 页面并按参考 fit 取景；小于 768px 时采用原 mobile 上下排列、页面宽度跟随视口，以 `height: auto`、`min-height: 1180px` 容纳完整内容。HTMLTexture 尺寸与相机取景随窗口更新，画面内的字号与美术按原作保留。

## 运行行为

吊灯场景、光照、Verlet 摆锤与约束数值按 `MorsLightCanvas.tsx` 移植，保留瞄准、拉拽、松手动量和静止后停止渲染。初始光束角度 `34`、亮度 `1450`、颜色 `#ffb36b`；色板为 `#ffb36b`、`#ffd9a3`、`#8fdcff`、`#c79cff`、`#ff5f7f`。参数来自参考实现的 `config.ts`，原面板保留真实 DOM 控件、自定义颜色、开关和复位，提供键盘与触屏入口。

`prefers-reduced-motion: reduce` 时灯固定在初始角度，平面不倾斜；面板参数即时生效，没有过渡动画。WebGL 不可用或初始化失败时，保留同一 HTML 页面与 CSS 径向渐变静态灯光，并显示明确的后备说明。

本地 HTTP、无头 Edge `155.0.4283.62` 已实测运行真实 WebGL，使用 SVG foreignObject polyfill。1440px 对照中源页面、投影、标题样式和控制板边界相同；初始画面未观察到明显构图、黑位、材质或光照差异。摆动帧的光斑边缘略有偏移，可能与取帧时间差有关，此原因尚未独立验证。

390px 源页面为 390×1240，五个概念点击成功；Tab 可遍历五个概念、power、beam，焦点落在真实 DOM 控件，方向键可将角度 34 调至 35。右键换色与右拖调角度、CDP 单触点拖灯与色板选择已验证。正常摆动结束后绘制计数稳定，减少动态时灯固定且 plane 指针移动前后矩阵不变。禁用 WebGL 的独立进程已验证同一 MORS² 后备、375px 可用宽度无横向溢出、源 DOM 恢复及原面板开关。

浏览器原生支持 `texElementImage2D` 时使用原生路径；原生路径、读屏器、真实触屏设备、其他浏览器与长期性能／电量表现未验证。详细观察与边界见[素材资料](../../docs/materials-three-html-render.md)。

## 版本与兼容垫片

three-html-render 0.1.2 的 npm 分发不提供 README 所述的 `html-texture`／`interaction-manager` 子路径。本样例使用 three r185 起提供的 HTMLTexture 和 Three addon InteractionManager。

本版本组合需要 `texElementImage2D` 兼容垫片：Three.js 依据函数参数数量选择短重载，polyfill 的函数签名会导致不匹配。垫片仅在 polyfill 启用且签名符合条件时包装为六参数函数，保持原生实现不变。依赖处于 `0.1.x`，升级需要重新核验。

polyfill 的 `pageStyles` 仅向 SVG 快照注入 `html,body{overflow:visible!important}`，避免高于视口的窄版控制板被快照裁切。该接入配置不修改 vendor 原始文件。

## 文件与署名

- `index.html`：MorsPageSurface 的原生 HTML 移植，含五个概念按钮与原灯光面板。
- `demo.css`：globals.css 的页面样式移植、约定的窄屏适配与静态光照后备。
- `demo.js`：MorsLightCanvas 的原生 JavaScript 移植、HTMLTexture、InteractionManager 和平面演示。
- `mors-logo.svg`：参考仓库 `public/mors-logo.svg` 原始字节。
- `vendor/three-0.185.1.module.js`、`three-0.185.1.core.js`：原始 Three.js 核心 ESM。
- `vendor/interaction-manager-0.185.1.js`：原始 Three.js InteractionManager addon。
- `vendor/three-html-render-polyfill-0.1.2.mjs`：原始 three-html-render polyfill ESM。
- `vendor/NOTICE.md`、`dependencies.txt` 与 `LICENSE-*.txt`：逐文件来源、随包依赖声明与独立 MIT 许可。

three-html-render 作者 repalash，MIT；Three.js 核心与 InteractionManager addon 为 MIT。页面实现、样式与光照代码改写自 jinruozai 的 [HTML-Light-Demo](https://github.com/jinruozai/HTML-Light-Demo/tree/0a0bd3ba53194fff68db78654fc6857ab3faee29)，MIT。MORS² 品牌、文案、标志与美术方向出自 [@kaolti](https://x.com/kaolti) 原作；本仓库用于个人非商业参考。软件与参考实现代码的许可、原作署名分别保留。
