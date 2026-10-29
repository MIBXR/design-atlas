# Web Atlas 维护

新增内容、目录或内容类型前，先阅读 [CONTRIBUTING.md 的收录边界与三类组织规范](CONTRIBUTING.md#三类组织规范)，确定其类别与文件归属。字段和新增流程以该文档为准。

内容源为 `entries/`、`demos/`、`docs/`。修改这些源文件后运行 `npm run build`，再运行 `npm run check`；`prompts/`、`agent/`、`data/`、`previews/` 中截图以外的生成文件及 README 计数块由工具生成，不手改。第三方素材与原文快照保持原字节。

修改站点页面、组件或交互前，阅读 [站点设计与交互约束](CONTRIBUTING.md#站点设计与交互约束)，查看现有页面与 `site/shared/` 的实际样式；按 [验收与交付](CONTRIBUTING.md#验收与交付) 对照原作、既有页面和干净副本。

提交前完成构建、检查与任务要求的浏览器验收。Git 只收录长期维护的源码、内容、文档和交付预览；在独立功能分支提交并通过 PR 合并。发布使用同一已验证源码提交，流程见 CONTRIBUTING。
