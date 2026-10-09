# Design Atlas · Agent 数据

完整工作流与数据协议见 [AGENT.md](../AGENT.md)，维护标准见 [CONTRIBUTING.md](../CONTRIBUTING.md)。

- [catalog.json](catalog.json)：完整案例索引与设计巧思目录的路径、SHA256、字节数和版本。
- cases/<id>.json：原始条目、研究与Prompt原文、网页说明webNotes、完整源码/素材清单，以及反向关联patternIds。
- [patterns.json](patterns.json)：人工策展的完整原子记录、来源、约束、参数与组合关系，并提供巧思包路径/哈希。
- patterns/<id>.json：完整pattern与sourceCases；来源案例包含标题、完整包/演示路径及包SHA256。sourceFiles从来源案例清单核验，完整运行依赖按来源案例导出。
- webNotes由真实atlas.js生成，保存网页案例七节原始HTML；比较界面按同名章节逐行对齐，原始单例说明保持一致。

巧思sources的observed/adapted/inferred保留观察、迁移与公共资料推断的边界。先核验主索引patterns描述，再核验巧思bundleSha256与sourceCases；全部资料、索引和文件使用同一个固定会话SHA。在线发布只在主索引添加source.commit/baseUrl，完整案例/巧思包和巧思目录保持原始字节。

巧思contentVersion由排序后的巧思ID与包SHA256确定；总库contentVersion由排序后的案例ID/哈希加巧思contentVersion确定。案例只引用巧思ID，巧思引用案例哈希，没有哈希循环、时钟或Git SHA自引用。

生成文件使用UTF-8与LF；被引用的文件遵循.gitattributes。二进制只记录原仓库路径/字节数/SHA256，不嵌入JSON。源码来自原始Git字节，区别于部署中重写素材地址或增加UTF-8标记的展示文件。

修改内容后运行npm run build，再运行npm run check与npm run test:agent。构建扫描全部entries/及patterns/；检查去重、源观察漂移、组合ID、manifest和生成哈希。按独立机制维护巧思，终态维护不复制内容到skill仓库。
