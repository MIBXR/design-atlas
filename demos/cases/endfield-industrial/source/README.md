# 终末地制作输入与处理

固定采集日期为 2026-10-09。原配置及模块的固定 URL、JSON 表达式字节区间和 35 个角色键位于 [source-provenance.json](source-provenance.json)。

| 输入 | 位置或 URL |
| --- | --- |
| 简中 flat 文本 | `https://web.hycdn.cn/endfield/official-v4/_next/static/chunks/app/%5Blang%5D/(main)/layout-f37c8a443b871dbe.js` |
| 当前干员目录 | `https://web.hycdn.cn/endfield/official-v4/_next/static/chunks/8039-7b52e98a88c93d09.js`；模块 18039，角色键已记录于 provenance 的 mappings |
| 选中环原 DOM | `https://endfield.hypergryph.com/` 当日渲染 DOM，`rendered-source.json` 所记录的首个 `Operator_switchItem` 内 SVG |

在仓库根目录执行，输入为原 flat 文本 chunk：

```bash
node demos/cases/endfield-industrial/source/decode-profiles.mjs /path/to/layout-f37c8a443b871dbe.js /path/to/output/profiles.json
```

入口按 provenance 中的 UTF-8 字节区间读取 JSON.parse 的字符串字面量，只解码该字面量；按 35 个键读取 `operator.content.<key>.intro` 并 `split('\n')`，保留段落、空格和标点。输出只含制作所需的人物介绍数据，不覆盖 `../data.js`。

`extract-ring.js` 在上述原 DOM 的浏览器控制台执行，下载首个选中环的 SVG；处理仅删除 class 并把 currentColor 改为 #cccccc。原 DOM 的采集 URL／日期按本页固定输入记录，脚本不重新采集页面。当前渲染所用 RGB／alpha 影片与 Float32 点云是原始输入；合成、规范化及 shader 的运行实现分别在 `../transparent-video.js`、`../lore.js` 和 `../shaders.js`。
