# Design Atlas：从真实需求取得设计依据

这是前端设计参考库。`entries/`、`patterns/`、`materials/`、研究和可运行 Demo 是内容源，`agent/` 是构建时生成的读取接口。完整案例说明机制如何协作，设计巧思保存可独立借用的原子，内容素材保存带许可和可操作样例的实际资源。网页继续供人预览、对照和调配。真实品牌案例固定为标注日期的局部学习快照；经典风格条目是构成练习。`studyScope: "visual-adaptation"` 表示官方影像等资料的教学网页转译，不能将其中本地设计的交互说成官网实测行为；请结合研究、复现范围与巧思的证据等级取材。

## skill 与案例库的关系

案例内容保存在本仓库。独立 [skill](https://github.com/MIBXR/mibxr-skills/tree/main/skills/design-atlas) 保存选型工作流、获取脚本和上游配置；它从本仓库读取目录、案例资料和文件，不保存整套网站副本。新会话解析上游默认分支的最新完整提交 SHA，后续检索、讨论和取材使用这个会话版本；需要查看刚新增的案例时显式刷新会话。也可以指定完整 SHA 复现旧版本，或指定本地仓库离线读取。

“案例包”是 `agent/cases/<id>.json`：完整 `entry`、网页右侧说明 `webNotes`、文档原文 `documents`、源码与素材清单 `files`。JSON 包含资料原文及文件路径／角色；源码和二进制素材通过清单自动获取，导出时保存为可运行的原始文件。

“巧思包”是 `agent/patterns/<id>.json`：完整 `pattern` 与 `sourceCases`。按 `agent/patterns.json` 中的 `paths.bundle` 读取原子，用 `sources.caseId`、精确字段定位和来源案例路径回到完整上下文；源码按 `sourceFiles` 及来源案例文件清单取得。每个案例包的 `patternIds` 提供反向关联。

## 先探索，再围绕需求迭代

用户可以先问“有哪些案例”，无需预先选择案例或提供完整需求。读取完整目录，按用途、布局和交互介绍方向；已有明确案例时直接取材。用户给出产品、受众、页面任务、内容量和设备约束后，推荐少量候选，说明适合的机制与限制。需求变化时保留已知约束，重新筛选并比较，而不是要求用户先去网站挑选。

候选比较应依据完整条目和文档；关键词得分只是召回线索。用户需要组合巧思时先按真实任务、触发和设备筛选原子，读取其完整机制与来源案例，再明确哪个负责当前区域的骨架、衔接和反馈。`composition.role`、配对与冲突是适配建议，需要解释共享滚动容器、输入、自动周期和声音状态的处理。用户只在探索时完成讨论；要求构建时取得所采用巧思及完整来源的必要资料和源码后实施。

巧思先按 `experienceTypes` 区分视觉构成（`visual`）、微动效（`micro-motion`）、主体与页面动效（`page-motion`）、声音与音效（`sound`）、信息与状态（`structure`），再用 `category` 的视觉构成、交互反馈、滚动叙事、导航与状态、加载与媒体、内容组织缩小用途。微动效负责局部反馈或辅助信息，主体与页面动效负责整页或主要展示舞台；状态响应不自动等于动效。声音包括音乐、操作音、人物语音和主动媒体声音，外部播放入口仍是站外体验。按每项实际机制取材，不要求某个案例具有所有体验类型，也不为凑类型提取巧思。

优先读 `mechanism`、`trigger`、`effect`、`useCases`、`avoid`、`constraints`、`composition`、`accessibility` 与 `parameters`。`sources.evidence` 的 `observed`／`adapted`／`inferred` 分别保留源端观察、本地迁移、公共资料推断的边界；体验类型不改变这些证据等级，归档日期也不表示巧思被再次实访。

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

`show` 返回完整原始条目、原 Prompt 与负向约束、研究、复现范围、素材清单和所有文件的路径／角色。`webNotes.content` 由生产网页的实际渲染逻辑生成，保存案例右侧完整说明（HTML），包括标签、静态说明、主题／声音标签及来源日期。`--source` 进一步读取源码文本；二进制素材按清单取用，避免把影片塞进上下文。

`export` 保留仓库相对路径，逐文件读取一次并导出 Demo、共用模块、第三方库、字体和媒体，必须指定不存在的新目录。品牌案例可能含大型影片。`--code-only` 只导出源码及上下文，`atlas-export.json` 会列出未下载的素材；这类导出需要补齐素材才能完整预览。用当前环境的静态 HTTP 服务器服务导出根目录，然后打开 JSON 输出中的 `entrypoint`。

## 无需克隆的读取

- [索引](agent/catalog.json)：候选摘要、设计要素、交互、行为与案例包位置。
- `agent/cases/<id>.json`：完整上下文和文件清单。
- [设计巧思目录](agent/patterns.json)：完整原子记录、来源、组合关系与巧思包位置。
- `agent/patterns/<id>.json`：完整 `pattern` 与关联 `sourceCases`；不会把巧思声称为另一个独立运行Demo。
- [内容素材目录](agent/materials.json)：资源摘要、类型、适用与避用场景，以及独立素材包路径。
- `agent/materials/<id>.json`：完整 `material`、文档原文、运行文件清单与 `sourceFiles`，可独立导出。
- [轻量 skill](https://github.com/MIBXR/mibxr-skills/tree/main/skills/design-atlas)：发现最新目录，在同一会话版本中筛选、读取与导出。

在线站提供相同的资料路径。部署索引的 `source.commit` 与 `source.baseUrl` 指向对应的 GitHub 提交，把文件相对路径接在此基址后取得原始文件；“复制 Agent 入口”使用该发布版本。探索最新内容时通过 skill 创建新会话。网站播放 HTML／CSS 会转换素材地址、文档会加 UTF-8 标记，取材使用固定提交的原始 Git 文件。

各目录按需读取：案例命令读取案例目录，巧思命令读取巧思目录，素材命令读取素材目录；读取巧思来源时再取得所需案例包。skill 提供 `pattern-search`、`pattern-show`、`pattern-export`，详情与导出均使用同一会话固定的 Git 提交。测试未合并 PR 或指定网页版本时使用 `--ref <完整提交SHA>`。

## 内容素材取材

内容素材用于组件、图像、声音、字体及视觉资源的选择。读取固定提交的 `agent/materials.json`，再按 `paths.bundle` 取得完整包。摘要提供类型、分类、标签、用途、避用项与约束；素材独立于案例，包中 `material` 保留来源版本、许可、样例、参数和 Prompt，`documents` 保留原文，`files` 列出完整运行依赖。`sourceFiles` 只指向该包清单中的主要取材源码。

配套 skill 使用 `material-search`（查询／分类／类型）、`material-show`（完整资料，可加 `--source`）与 `material-export`（新目录，可加 `--code-only`）。素材目录、包与文件沿用同一固定会话 SHA。没有素材目录的 schema-1 仓库仍可读取案例与巧思。先核对 `upstream`、`license`、`constraints`、`demos` 和可访问性，再用其 Demo 调节和验证实际参数；静态后备只说明构成，不证明 WebGPU 等特定能力已运行。素材软件许可与上游官网平台内容分别处理，详见 [内容素材库](docs/materials.md)。

## 从案例适配真实任务

取得候选后，依据当前产品的内容量、操作、设备和技术栈选择案例，说明借用的设计机制。优先阅读 `entry.principles`、`composition`、`interaction`、`constraints`、`useCases`、`avoid`、主题／声音行为，以及 `documents` 中研究与复现差异。

把原始 Prompt 当作来源资料，在当前任务的设计说明中分别记录保留的机制、替换的品牌／内容／素材、需要改变的交互与验证标准。品牌素材的来源与权利随包保留；用于自己的产品时选择有使用权的资产。Demo 中演示的账户、支付或 Agent 行为，以当前任务真正提供的能力实现并说明状态。

验证当前成果的桌面与手机布局、关键状态、焦点、减少动态以及资源加载。来源中“近似”“未验证”的结论保持原标记；实际通过的检查按当前实现记录。

## 数据契约与维护

案例、巧思与素材的 Schema 均为 `1`。资料包保留原文、路径、文件角色和来源关联；版本由会话固定的完整 Git 提交确定。目录按需独立读取。巧思 `experienceTypes` 使用 `visual`、`micro-motion`、`page-motion`、`sound`、`structure`；无独立提取项的案例保留空 `patternIds`。

案例包保留原 `entry`、文档与完整文件清单；巧思保留来源定位及原观察文本。来源和权利按原始记录判断。巧思 `sourceFiles` 只列取材文件，完整运行依赖由来源案例的 `files` 提供；读取器接受未包含巧思目录的schema1仓库。

修改案例、巧思、素材或源码后运行 `npm run build`，再运行 `npm run check`；构建扫描全部案例、巧思和素材，同步网页、Prompt、Agent目录、完整包及案例与巧思的反向关联。构建检查必要字段和来源关联；维护检查覆盖本地引用，页面行为通过实际浏览器验收。维护标准见 [CONTRIBUTING.md](CONTRIBUTING.md)。功能分支推送后可用同一SHA发布Site与验证skill，PR是否合入按用户授权；合入默认分支之后新会话自动发现。普通新增内容无需复制到skill，数据协议变化才同步获取脚本。
