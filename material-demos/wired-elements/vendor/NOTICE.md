# Wired Elements 运行时来源

官方 [wired-elements 2.1.2 tarball](https://registry.npmjs.org/wired-elements/-/wired-elements-2.1.2.tgz)，[源码提交](https://github.com/rough-stuff/wired-elements/tree/04756df72181e08b4255f8b6dfefea130398e24b)。

`wired-elements-2.1.2.js` 直接来自包内 `lib/wired-elements-esm.js`，未改写。该完整 bundle 不需要运行时外部 import；包含 Wired 组件及 Lit。文件内版本标记确认 lit-element 2.3.1、lit-html 1.2.1，两份 BSD-3-Clause 许可分别取自对应官方 npm 包；Wired MIT 许可来自同一 2.1.2 包。

Copyright Wired Elements: Preet Shihn；Lit / lit-html: The Polymer Project Authors。实际版权文本以随附 LICENSE 为准。

wired-lib 源码将 RoughJS 渲染代码构建在内，上游开发依赖声明为 ^4.3.1；官方单文件未暴露其精确解析版本，不能据此声称完成了上游依赖树重建。LICENSE-roughjs.txt 原文取自官方 roughjs 4.3.1 npm 包，版权为 2019 Preet Shihn（MIT）。运行仍只需此固定 bundle。

核验日期：2026-10-16。

| 文件 | 字节 | SHA256 |
| --- | ---: | --- |
| `LICENSE-lit-element.txt` | 1520 | `1a5ae5ab221af81b68f4f4c156c0d2e044851272c5e2e6c07d685946557878ea` |
| `LICENSE-lit-html.txt` | 1520 | `1a5ae5ab221af81b68f4f4c156c0d2e044851272c5e2e6c07d685946557878ea` |
| `LICENSE-wired-elements.txt` | 1068 | `dca9a392272606ac748ac0976a2a1133f14eef841c27beaa51a844d53c56a09d` |
| `wired-elements-2.1.2.js` | 117062 | `0b7fdd90265bf7c9b38e0fcddc3a86f06fbbe81866806042cb0d3204bf3877ed` |
| `LICENSE-roughjs.txt` | 1068 | `dca9a392272606ac748ac0976a2a1133f14eef841c27beaa51a844d53c56a09d` |
