# Web Atlas · Agent 数据

完整工作流见 [AGENT.md](../AGENT.md)，维护标准见 [CONTRIBUTING.md](../CONTRIBUTING.md)。

- [catalog.json](catalog.json)：案例摘要、包路径及巧思／素材目录路径。
- cases/<id>.json：完整 entry、documents 原文、webNotes HTML、files 路径与角色、patternIds 关联。
- [patterns.json](patterns.json)：巧思机制、来源、约束、参数、组合关系与包路径。
- patterns/<id>.json：完整 pattern 与 sourceCases；按来源案例路径和 sourceFiles 取得上下文。
- [materials.json](materials.json)：独立内容素材摘要和包路径。
- materials/<id>.json：完整 material、documents、files 与主要源码 sourceFiles；来源版本和许可随包保留。

所有资料使用同一个固定 Git 提交。目录按命令需要独立读取。发布索引的 source.commit/baseUrl 指向原始源码；网页播放文件可经过部署转换。

webNotes 由 atlas.js 的实际详情渲染器生成。来源 observed/adapted/inferred 保留观察、迁移与推断的边界；来源记录原文随资料保留。

运行 npm run build 同步资料，npm run check 检查本地引用。受影响页面通过浏览器验收。
