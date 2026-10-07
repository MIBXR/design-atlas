# Design Atlas：从真实需求取得设计依据

这是前端设计参考库。`entries/`、研究和可运行 Demo 是内容源，`agent/` 是构建时生成的读取接口。网页继续供人预览、对照和调配。真实品牌案例固定为标注日期的局部学习快照；经典风格条目是构成练习。

## skill 与案例库的关系

案例内容保存在本仓库。独立 [skill](https://github.com/MIBXR/mibxr-skills/tree/main/skills/design-atlas) 保存选型工作流、获取脚本和上游配置；它从本仓库读取目录、案例资料和文件，不保存整套网站副本。新会话解析上游默认分支的最新完整提交 SHA，后续检索、讨论和取材使用这个会话版本；需要查看刚新增的案例时显式刷新会话。也可以指定完整 SHA 复现旧版本，或指定本地仓库离线读取。

“案例包”是 `agent/cases/<id>.json`：完整 `entry`、网页右侧说明 `webNotes`、文档原文 `documents`、源码与素材清单 `files`。JSON 包含资料原文及文件路径／字节数／SHA256；源码和二进制素材通过清单自动获取，导出时保存为可运行的原始文件。

## 先探索，再围绕需求迭代

用户可以先问“有哪些案例”，无需预先选择案例或提供完整需求。读取完整目录，按用途、布局和交互介绍方向；已有明确案例时直接取材。用户给出产品、受众、页面任务、内容量和设备约束后，推荐少量候选，说明适合的机制与限制。需求变化时保留已知约束，重新筛选并比较，而不是要求用户先去网站挑选。

候选比较应依据完整条目和文档；关键词得分只是召回线索。多案例结合时明确主参考负责整体结构，辅助参考负责具体交互或表现，解释冲突处理。用户只在探索时，完成候选讨论；用户要求构建时，自动取得实际采用案例的完整资料和必要源码后实施。

## 本地检索与取材

在已有仓库中使用 Node.js，无需安装依赖：

```sh
node scripts/atlas.mjs search --limit 100
node scripts/atlas.mjs search "深色 产品" --limit 3
node scripts/atlas.mjs show linear-workflow
node scripts/atlas.mjs show linear-workflow --source
node scripts/atlas.mjs export linear-workflow --out ../linear-reference
```

`search` 是可解释的关键词匹配，可加 `--category 产品`，结果提供命中字段、适用场景和谨慎使用项。把真实需求拆成内容、布局、交互、风格等关键词；无结果时换词或不带查询列出条目。它没有语义模型，评分也不是审美推荐或适用性证明。

`show` 返回完整原始条目、原 Prompt 与负向约束、研究、复现范围、素材清单和所有文件的路径／字节数／SHA256。`webNotes.content` 由生产网页的实际渲染逻辑生成，保存案例右侧完整说明（HTML），包括标签、静态说明、主题／声音标签及来源日期；构建检查逐项验证全部案例的说明与条目、网页和包保持一致。`--source` 进一步读取源码文本；二进制素材按清单取用，避免把影片塞进上下文。

`export` 保留仓库相对路径，校验字节后导出 Demo、共用模块、第三方库、字体和媒体，必须指定不存在的新目录。品牌案例可能含大型影片。`--code-only` 只导出源码及上下文，`atlas-export.json` 会列出未下载的素材；这类导出需要补齐素材才能完整预览。用当前环境的静态 HTTP 服务器服务导出根目录，然后打开 JSON 输出中的 `entrypoint`。

## 无需克隆的读取

- [索引](agent/catalog.json)：候选摘要、设计要素、交互、行为与案例包位置。
- `agent/cases/<id>.json`：完整上下文和文件清单。
- [轻量 skill](https://github.com/MIBXR/mibxr-skills/tree/main/skills/design-atlas)：发现最新目录，在同一会话版本中筛选、读取与导出。

在线站也提供同样的 `/agent/catalog.json` 与 `/agent/cases/<id>.json` 路径。部署索引额外提供 `source.commit` 与 `source.baseUrl`，把 `files[].path` 接在此基址后取得原始文件；“复制 Agent 入口”使用当前网页发布版本对应的固定提交。新发布会自动换成新提交。探索仓库最新内容可通过 skill 开始新会话，即使网页尚未发布也能发现已合入上游的案例。网站中的播放 HTML／CSS 会转换素材地址、文档会加 UTF-8 标记，因此源码与哈希校验使用原始 Git 文件。先取得一次索引，再核对其 `bundleSha256`；在线更新时发现不一致就重新取得索引与案例。直接读 GitHub 时先解析最新完整 SHA，再从同一个 SHA 读取所有文件。

## 从案例适配真实任务

取得候选后，依据当前产品的内容量、操作、设备和技术栈选择案例，说明借用的设计机制。优先阅读 `entry.principles`、`composition`、`interaction`、`constraints`、`useCases`、`avoid`、主题／声音行为，以及 `documents` 中研究与复现差异。

把原始 Prompt 当作来源资料，在当前任务的设计说明中分别记录保留的机制、替换的品牌／内容／素材、需要改变的交互与验证标准。品牌素材的来源与权利随包保留；用于自己的产品时选择有使用权的资产。Demo 中演示的账户、支付或 Agent 行为，以当前任务真正提供的能力实现并说明状态。

验证当前成果的桌面与手机布局、关键状态、焦点、减少动态以及资源加载。来源中“近似”“未验证”的结论保持原标记；实际通过的检查按当前实现记录。

## 数据契约与维护

Schema 当前为 `1`。`catalog.contentVersion` 是全部案例包路径与 SHA256 的确定性摘要；`bundleSha256` 校验原始 UTF-8 JSON 字节。案例包保留原 `entry` 对象，`documents` 保留原文，`files` 覆盖单例运行文件。SHA256 保证读取一致性，不替代来源或权利判断。

修改案例或源码后运行 `npm run build`，再运行 `npm run check`；构建动态扫描全部 `entries/*.json`，同步网页目录、Prompt、Agent 索引、案例包和 README 数量。检查会拒绝过期或不一致的 Agent 生成文件。维护贡献标准见 [CONTRIBUTING.md](CONTRIBUTING.md)。提交合入上游后，skill 新会话即可发现；网页还需构建部署目录并发布。普通新增案例无需修改 skill 或复制内容过去；数据协议变化才需要同步调整获取脚本。
