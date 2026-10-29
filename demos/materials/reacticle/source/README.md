# Reacticle 样文制作源码

上游为 [ConardLi/reacticle](https://github.com/ConardLi/reacticle/tree/dcfc4baf386bbc220cd1aa6274bed3b741108465)，固定提交 `dcfc4baf386bbc220cd1aa6274bed3b741108465`，版本 0.2.6；本条目采集日期为 2026-10-27。

- `src/`：原始公共组件、主题及 CSS。
- `apps/site/src/reports/`：11 篇样文的原始 TSX。
- `apps/site/src/data/gallery.tsx`：原始文章／主题绑定。
- `apps/site/src/pages/Gallery.tsx`：原始画廊容器依据。
- `apps/site/src/site.css`：原站样式。
- `package.json`、`package-lock.json`、`.npmrc`、`tsconfig*.json`、`vite.config.ts`：原始依赖与编译配置。
- `build-samples.mjs`：本库独立样文入口，逐篇构建，沿用 gx-reader 容器和 Prism.manual。

第三方源码与配置保留原字节。归档范围为这 11 篇样文的制作输入；文档站其他页面不在此目录。原 package.json 声明 MIT，许可索引见 [LICENSES.md](../LICENSES.md)。

使用 Node.js 与 npm，在 Git Bash 中从仓库根目录执行：

```bash
task_output="$(pwd)/work/reacticle-rebuilt"
cd demos/materials/reacticle/source
npm ci
node build-samples.mjs "$task_output"
```

依赖版本由原 lockfile 固定。构建入口通过 Vite alias 使用归档 `src/index.ts`，各篇只导入对应报告；正文、主题和原 site.css 沿用上游。字体使用条目内 `../fonts/` 的本地文件，KaTeX 字体由 Vite 从锁定依赖打包。产物位于 `work/reacticle-rebuilt/<样文 id>/index.html`，可通过现有 HTTP 静态服务打开；`_inputs/` 是生成的最小入口。现有 11 篇运行 bundle 保持原文件。
