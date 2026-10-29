# Shaders 运行包与第三方许可

`shaders-4.0.4.js` 为 npm `shaders@4.0.4` 的 `dist/js/bundle.js` 原始文件，仅改变文件名。它是官方单文件 ESM 构建，所有运行依赖已打包，无需 CDN。

- 来源：[npm 发布包](https://registry.npmjs.org/shaders/-/shaders-4.0.4.tgz)
- 对应源码提交：[`81fd4ece5d493ca6c424a2af41f0e2c361ec8258`](https://github.com/shader-effects-inc/shaders/tree/81fd4ece5d493ca6c424a2af41f0e2c361ec8258)
- npm 包完整性：`sha512-NB+/RiK0oydteeeKdPqsLpR3iSoDTvt8bsdgw2wPb697QVCY/yadZV8gitCyCQx5t/kb4nJicIR+cbG9Q6JFfQ==`
- 原始运行包大小：2,584,407 bytes
- 运行包 SHA-256：`e00b8c9954c819910f1c8660c5035ca24f79814e752689f819f05c610299625e`
- 许可原文：[LICENSE-shaders.txt](LICENSE-shaders.txt)，Copyright (c) 2026 Shader Effects Inc.

包内组件、引擎与框架绑定采用 MIT 许可。官网预设、合集、页面区块和平台服务由[独立协议](https://shaders.com/license)管理；本目录的四个组合由 Web Atlas 使用开源组件自行编写，未使用官网预设或页面区块。

官方构建包含的运行依赖按该提交的 [`pnpm-lock.yaml`](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/pnpm-lock.yaml) 标注，原始许可随本目录分发：

| 依赖 | 版本 | 许可原文 |
| --- | --- | --- |
| colorjs.io | 0.5.2 | [MIT](LICENSE-colorjs.io.txt) |
| typegpu | 0.12.3 | [MIT](LICENSE-typegpu.txt) |
| tinyest | 0.3.2 | [MIT](LICENSE-tinyest.txt) |
| typed-binary | 4.3.3 | [MIT](LICENSE-typed-binary.txt) |
| tsover-runtime | 0.0.7 | [Apache-2.0](LICENSE-tsover-runtime.txt) |

原始许可证保持上游字节。本地 `reference.svg` 为 Web Atlas 原创几何图形，不包含第三方照片、字体或品牌标志。
