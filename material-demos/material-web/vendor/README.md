# Material Web 本地运行依赖

`material-web.js` 是 Google 官方 `@material/web@2.5.0` 的选用组件及其运行依赖，经 esbuild `0.25.12` 合并、压缩后的 ESM。组件的 CSS-in-JS 随模块打包；运行时没有 CDN、远程字体或外部资源请求。不需要安装 Node 依赖即可通过 HTTP/HTTPS 预览。

## 来源与转换

官方 [npm 版本](https://registry.npmjs.org/@material/web/2.5.0) 的 `gitHead` 为 `b4de401eb665ec63474f39319a4ba8f2145974cc`。入口 `components.mjs` 只导入填充、色调填充、描边、文字按钮、描边文本框、开关、滑块、对话框。合并使用浏览器生产入口，移除未使用代码，保留行内许可注释；没有修改上游组件行为源码。网站配色、Shadow DOM 减少动态处理和交互逻辑位于外层 `demo.css`、`demo.js`。

`provenance.json` 保存上游 npm 完整性值、转换命令、运行模块 SHA256，以及随包许可的原始字节数和 SHA256。Agent 构建另外对完整素材清单计算校验值。

| 实际进入运行包的依赖 | 固定版本 | 许可 |
| --- | --- | --- |
| @material/web | 2.5.0 | Apache-2.0 |
| lit | 3.3.3 | BSD-3-Clause |
| lit-element | 4.2.2 | BSD-3-Clause |
| lit-html | 3.3.3 | BSD-3-Clause |
| @lit/reactive-element | 2.1.2 | BSD-3-Clause |
| tslib | 2.8.1 | 0BSD |

原许可证保存在本目录的 `LICENSE-*.txt` 中；tslib 同时保留版权声明。锁文件包含 npm 解析得到的依赖和构建工具，其中 `@lit/context`、类型声明与 esbuild 的平台安装包不进入浏览器运行包。

## 重建

将本目录的 `package.json`、`package-lock.json` 和 `components.mjs` 复制到仓库外的临时目录，在该目录运行：

```sh
npm ci --ignore-scripts --no-audit --no-fund
./node_modules/.bin/esbuild components.mjs --bundle --format=esm --target=es2022 --minify --legal-comments=inline --outfile=material-web.js
```

对比新模块与 `provenance.json` 的摘要，再替换交付模块。不要将 `node_modules` 放入素材目录，否则素材生成器会把它当作导出依赖。更换版本时重新核验官方 API、许可证、浏览器支持与交互，更新该记录并重新生成 Agent 资料。
