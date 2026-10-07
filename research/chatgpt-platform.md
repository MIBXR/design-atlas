# ChatGPT — 三合一巨字叙事

观察日期：2026-10-07。公开参考页：[https://chatgpt.com/zh-Hans-CN/overview/](https://chatgpt.com/zh-Hans-CN/overview/)。

## 直接观察与证据

Root通过CUA/IAB实访公开页自动转中文，保存chatgpt-platform-source.jpg。1280x720截图显示64px头部、完整ChatGPT字标、居中五行中文巨字（计算88.96px），最后编程紫到青渐变及彩色下线，黑环在下方；CTA在首屏下沿。子代理Edge与Node整页失败，但官方图片CDN下载和Root视觉证据成功，不把失败当作观察。

同日原站截图：[research/screenshots/chatgpt-platform-source.jpg](../research/screenshots/chatgpt-platform-source.jpg)。

## 第一方资料及交互规范

- [ChatGPT 中文公开介绍页](https://chatgpt.com/zh-Hans-CN/overview/)（实例）：Root CUA/IAB实访保存1280x720首屏，中文5行巨字、3动作、黑环与CTA。
- [ChatGPT 英文介绍内容](https://chatgpt.com/overview/)（实例）：第一方正文核验Chat/Work/Codex和能力架构；与中文页面属于同日公开版本。
- [OpenAI Design Guidelines](https://openai.com/brand/)（规范）：字标比例、留白及品牌归属；官网解释OpenAI Sans几何与人文语气。
- [WAI Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)（规范）：能力选择的aria-selected、方向键与键盘焦点参考。

OpenAI官方品牌指南要求标志比例和留白保持稳定，解释字体兼具几何精度与温暖感；本地原样使用官网字标及OpenAI Sans SC，不把该文解释成每个营销布局的直接出处。

## 分析推断

- 主标题本身承担功能选择，减少独立解释组件。
- 大留白与近黑文字形成主体，色彩仅强调当前能力。
- 三类能力用真实应用界面证明，而不是AI抽象符号。
- 胶囊按钮与低对比导航把重心留给产品叙事。

以上是对已观察页面的分析，除明确标注的来源内容外，不冒充官方作者意图。

## 复现映射

| 原站观察/机制 | 本地映射 | 差异/边界 |
|---|---|---|
| 中文巨字首屏 | 89px/5行 + 原始字标与SC字体 | 桌面依据1280截图，手机为合理响应式适配 |
| 三能力 | 点击主标题与tabs联动官方Chat/Work/Code图 | 图片本地保存，未嵌入真实账户 |
| 用途展开 | 四种用途列表+本地固定示例 | 模拟回复和复制，不调用AI |

## 约束与差异

- 明确公开营销页URL，不使用已登录账号界面。
- 以中文实访版本为基准，不复用旧版prompt输入框首页。
- 官方OpenAI Sans中文Unicode分片完整保留、本地下载。
- 品牌结标与字标使用官网原样SVG，不重新绘制。
- 所有回复为本地固定示例，不宣称AI实时回答。

首屏有实访截图依据；后续结构依据第一方正文与真实公开素材，未逐屏截图所有章节。菜单、放大和本地示例是可用的局部学习机制，不声明与服务端完全一致。价格、安全文章与完整故事画廊未全量复现。

## 本地材料

- [Demo](../demos/chatgpt-platform/index.html)
- [完整Prompt与设计约束](../entries/chatgpt-platform.json)
- [素材清单](../demos/chatgpt-platform/assets-manifest.json)
- [还原说明](../demos/chatgpt-platform/fidelity.md)

私人学习记录；品牌与媒体版权保留给品牌及原作者。
