# Beautiful Article · 长文编辑工作流

## 它解决什么问题

Beautiful Article 把已有的 URL、PDF、DOCX、Markdown、文本或截图材料，编辑成可阅读、审阅和分享的网页文章。它负责材料抽取、编辑规划、确认节点、分节生成与审阅；Reacticle 提供文章组件、主题和运行时。

本库收录的是 [garden-skills 固定提交中的技能](https://github.com/ConardLi/garden-skills/tree/2b9a89340b70f632d31c0f1c69fce94a7912423e/skills/beautiful-article)，版本声明为 0.1.0。默认目标是保留完整信息的长文；其他文章类型和信息保留比例由用户确认。

## 工作流

1. 确认目标是文章，收集材料、目标语言和初步文章类型；抽取为 Markdown，记录不确定项并检查完整性。
2. 规划简报、大纲、主题与素材；按文章类型提出信息保留比例，默认保留完整信息。
3. 逐项请用户确认文章类型、主题、版式宽度、配图模式和封面。
4. 创建文章工程，完成封面、首屏、第一节和代表性视觉块；独立审阅后，请用户确认首版和后续开发模式。
5. 用 Reacticle 语义组件逐节完成文章；自由图文层使用主题令牌并服务阅读，每节独立文件且经过审阅。
6. 从编辑、视觉和技术三个视角终审，按最小范围修复。
7. 请用户确认交付形式后，导出单文件 HTML 并附编辑说明；仅在用户选择时另行导出 PDF。

脚手架会创建 React、TypeScript 和 Vite 工程，并安装运行时的最新 reacticle 发布版。它包含占位的标题、正文与封面，仍需按源材料创作；本条目只归档脚手架与指导内容，没有替用户运行文章生成流程。

## 适合与不适合的场景

适合把已有材料整理成长文归档、研究报告、教程、解释文、审阅复盘或视觉文章，也适合需要统一主题、图解与局部交互的讲解。文章的信息保留与编辑取舍需要明确确认。

不适合后台、表单、拖拽工作台、完整仪表盘、产品原型或通用网页应用。没有材料或大纲时，应先补齐内容依据；不能只为增加视觉块而把文章改成应用或删掉关键内容。

## 关联条目

[Reacticle · 长文排版组件库](../materials.html#material/reacticle)实现 skill 的 11 套主题，11 篇样文就在 Reacticle 的样例里。可以在样文中比较相同组件体系如何形成不同排版语言，再阅读技能快照中的主题写作资料。

`theme-profiles/` 内共有 11 份主题 Markdown 和一份索引。它们是给 Agent 阅读的写作指导，不是 CSS 主题文件。技能 README 中另外链接了作者公开的成品长文，不能把这些长文与本库归档的 11 篇主题样文混为一组。

条目预览复用 Reacticle 的咖啡因半衰期样文实际画面。

## 原文快照位置

- [技能原文](../agent-skills/beautiful-article/SKILL.md)
- [原文 README](../agent-skills/beautiful-article/README.md)
- [原文中文 README](../agent-skills/beautiful-article/README.zh-CN.md)
- 快照目录：`agent-skills/beautiful-article/`，包含主题写作资料、参考文档、脚本与工程模板。

目录从提交 `2b9a89340b70f632d31c0f1c69fce94a7912423e` 原样复制，语言、指导内容和代码保持来源状态。原文中的仓库相对链接与外部链接可结合[上游固定提交](https://github.com/ConardLi/garden-skills/tree/2b9a89340b70f632d31c0f1c69fce94a7912423e)阅读。快照不表示已安装或执行技能；其脚手架动态安装版本的行为，也不代表本库固定提交的 Reacticle 样例构建过程。

单文件 HTML 的封装方式不自动保证字体离线可用；使用技能交付文章时，需要按实际资源核对离线范围。本库 Reacticle 素材的字体与运行依赖单独记录。

## 许可

garden-skills 使用 MIT 许可，根许可原文附在 [快照 LICENSE](../agent-skills/beautiful-article/LICENSE)。版权声明为 `Copyright (c) 2026`，分发技能、脚本和模板时保留其版权与许可文本。

Reacticle 的组件、主题和字体按该素材的许可记录使用。技能 README 指向的外部文章、配图或字体不因技能的 MIT 许可而获得再分发权限；本条目未下载这些外部效果图。
