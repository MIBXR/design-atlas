# three-html-render 运行文件与第三方许可

本目录自托管 `three@0.185.1` 与 `three-html-render@0.1.2` 的浏览器端 ESM。下列第三方文件保持来源原始字节；运行模块只改变文件名，通过入口 HTML 的 importmap 解析依赖，无需 CDN、框架或构建器。

| 本地文件 | 原始来源 | 版本／提交 | 许可 |
| --- | --- | --- | --- |
| `three-0.185.1.module.js` | npm `three` 的 `build/three.module.js` | `0.185.1`／`2431a09f46f34c560bc8e44b33be0e567723d5b9` | MIT，three.js authors |
| `three-0.185.1.core.js` | npm `three` 的 `build/three.core.js`，含 `HTMLTexture` | 同上 | MIT，three.js authors |
| `interaction-manager-0.185.1.js` | npm `three` 的 `examples/jsm/interaction/InteractionManager.js` | 同上 | MIT，three.js authors |
| `three-html-render-polyfill-0.1.2.mjs` | npm `three-html-render` 的 `dist/polyfill.mjs` | `0.1.2`／`63f085e3fe7be11f0679c0ac17edc2e18e743add` | MIT，repalash |
| `dependencies.txt` | npm `three-html-render` 的 `dist/dependencies.txt` | 同上；记录打包依赖 `ts-browser-helpers@0.12.0` | MIT，repalash；完整许可原文随文件保留 |
| `LICENSE-three.txt` | npm `three` 的 `LICENSE` | `0.185.1` | MIT，Copyright © 2010-2026 three.js authors |
| `LICENSE-three-html-render.txt` | npm `three-html-render` 的 `LICENSE` | `0.1.2` | MIT，Copyright (c) 2025 repalash |
| `LICENSE-HTML-Light-Demo.txt` | `jinruozai/HTML-Light-Demo` 的 `LICENSE` | `0a0bd3ba53194fff68db78654fc6857ab3faee29` | MIT，原文署名 Copyright (c) 2026 Gooooo |

包与固定源码：

- Three.js：[npm 发布包](https://registry.npmjs.org/three/-/three-0.185.1.tgz)、[固定源码提交](https://github.com/mrdoob/three.js/tree/2431a09f46f34c560bc8e44b33be0e567723d5b9)。
- three-html-render：[npm 发布包](https://registry.npmjs.org/three-html-render/-/three-html-render-0.1.2.tgz)、[固定源码提交](https://github.com/repalash/three-html-render/tree/63f085e3fe7be11f0679c0ac17edc2e18e743add)。
- HTML-Light-Demo：[固定参考提交](https://github.com/jinruozai/HTML-Light-Demo/tree/0a0bd3ba53194fff68db78654fc6857ab3faee29)、[许可原文](https://github.com/jinruozai/HTML-Light-Demo/blob/0a0bd3ba53194fff68db78654fc6857ab3faee29/LICENSE)。

本地页面实现、样式与光照代码改写自 jinruozai 的 HTML-Light-Demo：`index.html` 移植 `app/light/MorsPageSurface.tsx`，`demo.css` 移植 `app/globals.css`，`demo.js` 移植 `app/light/MorsLightCanvas.tsx`、`app/light/config.ts` 和 `app/light/three-html-compatibility.ts`。摆锤与 Verlet 约束、指针瞄准与拉拽、光束参数及兼容垫片遵循参考实现；改写代码保留其 MIT 许可。兼容垫片只包装 polyfill，不改变浏览器原生实现。

本地窄版接入使页面宽度跟随视口，以 `height: auto`、`min-height: 1180px` 容纳完整面板；polyfill 的 `pageStyles` 仅在 SVG 快照中为 html/body 设置 `overflow: visible`，保留高于视口的内容。这些配置位于本地 HTML/CSS/JavaScript，不修改上述 vendor 原始文件。

`../mors-logo.svg` 复制自该固定提交的 [`public/mors-logo.svg`](https://github.com/jinruozai/HTML-Light-Demo/blob/0a0bd3ba53194fff68db78654fc6857ab3faee29/public/mors-logo.svg)，保持原始字节。

MORS² 品牌、文案、标志与美术方向出自 [@kaolti](https://x.com/kaolti) 原作；页面实现与光照代码改写自 jinruozai 的 MIT 参考实现。本仓库用于个人非商业参考，软件与参考实现代码的许可、原作署名分别保留。

`HTMLTexture` 与 `InteractionManager` 来自 Three.js；three-html-render 提供 HTML-in-Canvas polyfill。固定版本组合为 `three@0.185.1`＋`three-html-render@0.1.2`，需配合上述兼容垫片使用。
