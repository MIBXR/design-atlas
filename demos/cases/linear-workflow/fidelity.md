# Linear：复现范围

## 对照结论与差异原因

源端章节顺序与手机隐藏复杂图示的规则在本地保留；本地两次发送改变 Todo／In progress、编辑和 Dracula 主题已有结果。消息／任务缩短和 CSS spring 拟合使整体未达 1:1；源/本地同状态成对画面对照未记录。

| 差异或删减 | 原因 |
| --- | --- |
| 板布局和卡高 spring 改为 CSS 拟合 | 原物理参数未逐一移植；选择替代的原因未记录。 |
| 已决定删减部分消息、任务、Changelog 和后段故事卡 | 原因未记录。 |
| 已决定删减完整产品与 agent 后端 | 本地保留固定任务示例与状态操作。 |

产品 UI、任务／消息状态、主题、Favorites、Run agent 演示、后段卡片及过渡由本库自行实现；摄影等素材沿用来源文件。

[案例条目](../../../entries/cases/linear-workflow.json) · [研究](../../../docs/cases/linear-workflow.md) · [Prompt](../../../prompts/cases/linear-workflow.md)

## 本地实现与对照

本地两次发送实测 Todo/In progress 数量变化、编辑及 Dracula 主题。

消息文本和任务数量缩短；后续板的布局/卡高 spring 用 CSS 拟合，原源码中的全部 spring 物理参数未逐一移植。AI 为固定演示，代码不会执行；Run agent 与 Favorites 并非可登录的完整 Linear。未复制 Changelog 和后段用户故事卡与完整产品后端。

## 复刻未使用的原站素材

- `source/assets/hero-atmosphere.webp`
