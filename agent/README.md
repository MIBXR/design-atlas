# Design Atlas · Agent 数据

完整工作流与数据协议见 [AGENT.md](../AGENT.md)。

- [catalog.json](catalog.json)：检索索引，保留原案例的设计、主题、声音和适用场景。
- `cases/<id>.json`：完整原始条目、研究与 Prompt 等原文，以及源码、原始素材和预览的文件清单。二进制素材以原仓库路径与 SHA256 引用，不嵌入 JSON。
- `webNotes`：生成时执行真正的 `atlas.js`，保存网页右侧完整七节说明的原始 HTML，包括标签、来源日期、负向约束和界面说明；与实际网页说明逐字节校验。
- `contentVersion` 由排序后的案例 ID 与 bundle SHA256 生成；没有时钟或 Git SHA 自引用。

生成文件使用 UTF-8 与 LF。被引用的源文件遵循 `.gitattributes`：普通文本固定 LF，素材与第三方 vendor 保留原字节。生成器计算实际文件字节，不转换源文档或素材。

这些文件由 `node scripts/build-agent.mjs` 自动生成。修改原始条目／文档／代码／素材后先运行 `npm run build`，再运行 `node scripts/check-agent.mjs` 与 `node scripts/check-detail-alignment.mjs` 检查生成内容同步及网页说明对齐。
