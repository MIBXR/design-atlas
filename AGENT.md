# Design Atlas：从真实需求取得设计依据

这是前端设计参考库。`entries/`、研究和可运行 Demo 是内容源，`agent/` 是构建时生成的读取接口。网页继续供人预览、对照和调配。真实品牌案例固定为标注日期的局部学习快照；经典风格条目是构成练习。

## 先检索，再读取完整案例

在已有仓库中使用 Node.js，无需安装依赖：

```sh
node scripts/atlas.mjs search "深色 产品" --limit 3
node scripts/atlas.mjs show linear-workflow
node scripts/atlas.mjs show linear-workflow --source
node scripts/atlas.mjs export linear-workflow --out ../linear-reference
```

`search` 是可解释的关键词匹配，可加 `--category 产品`，结果提供命中字段、适用场景和谨慎使用项。把真实需求拆成内容、布局、交互、风格等关键词；无结果时换词或不带查询列出条目。它没有语义模型，评分也不是审美推荐或适用性证明。

`show` 返回完整原始条目、原 Prompt 与负向约束、研究、复现范围、素材清单和所有文件的路径／字节数／SHA256。`webNotes.content` 由生产网页的实际渲染逻辑生成，保存案例右侧完整说明（HTML），包括标签、静态说明、主题／声音标签及来源日期；构建检查逐项验证 29 个案例的说明与条目、网页和包保持一致。`--source` 进一步读取源码文本；二进制素材按清单取用，避免把影片塞进上下文。

`export` 保留仓库相对路径，校验字节后导出 Demo、共用模块、第三方库、字体和媒体，必须指定不存在的新目录。品牌案例可能含大型影片。`--code-only` 只导出源码及上下文，`atlas-export.json` 会列出未下载的素材；这类导出需要补齐素材才能完整预览。用当前环境的静态 HTTP 服务器服务导出根目录，然后打开 JSON 输出中的 `entrypoint`。

## 无需克隆的读取

- [索引](agent/catalog.json)：候选摘要、设计要素、交互、行为与案例包位置。
- `agent/cases/<id>.json`：完整上下文和文件清单。
- [轻量 skill](https://github.com/MIBXR/mibxr-skills/tree/main/skills/design-atlas)：按固定提交远程读取与导出，内容仍在本仓库。

在线站也提供同样的 `/agent/catalog.json` 与 `/agent/cases/<id>.json` 路径。先取得一次索引，再核对其 `bundleSha256`；在线更新时发现不一致就重新取得索引与案例，不能混用两个版本。要求可重现时，使用 GitHub Raw 的完整提交 SHA 读取所有文件。

## 从案例适配真实任务

取得候选后，依据当前产品的内容量、操作、设备和技术栈选择案例，说明借用的设计机制。优先阅读 `entry.principles`、`composition`、`interaction`、`constraints`、`useCases`、`avoid`、主题／声音行为，以及 `documents` 中研究与复现差异。

把原始 Prompt 当作来源资料，在当前任务的设计说明中分别记录保留的机制、替换的品牌／内容／素材、需要改变的交互与验证标准。品牌素材的来源与权利随包保留；用于自己的产品时选择有使用权的资产。Demo 中演示的账户、支付或 Agent 行为，以当前任务真正提供的能力实现并说明状态。

验证当前成果的桌面与手机布局、关键状态、焦点、减少动态以及资源加载。来源中“近似”“未验证”的结论保持原标记；实际通过的检查按当前实现记录。

## 数据契约与维护

Schema 当前为 `1`。`catalog.contentVersion` 是全部案例包路径与 SHA256 的确定性摘要；`bundleSha256` 校验原始 UTF-8 JSON 字节。案例包保留原 `entry` 对象，`documents` 保留原文，`files` 覆盖单例运行文件。SHA256 保证读取一致性，不替代来源或权利判断。

修改案例或源码后运行 `npm run build`，再运行 `npm run check`；索引、Prompt 和案例包都由同一份内容生成。维护贡献标准见 [CONTRIBUTING.md](CONTRIBUTING.md)。skill 仓库只保存调用工作流、获取脚本和上游提交锁，新增案例时不复制网站到 skill 仓库；需要升级可重现的数据版本时更新锁并验证实际读取。
