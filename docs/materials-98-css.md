# 98.css：带有桌面记忆的 CSS 组件

[本地工作台](../material-demos/98-css/index.html) · [结构化资料](../materials/98-css.json) · [官方完整文档](https://jdan.github.io/98.css/)

## 来源与许可

本条目使用 [jdan/98.css](https://github.com/jdan/98.css) 的 [npm 0.1.21](https://registry.npmjs.org/98.css/0.1.21)，固定提交 `517d174b30392d39e068ef4eca457da66a189f8f`，核验日期 `2026-10-16`。CSS 保留官方原始字节，采用 Jordan Scales 的 MIT 许可。

随包的 Pixelated MS Sans Serif 与 Bold 字体来自 lou 的 [MS Sans Serif](https://fontstruct.com/fontstructions/show/1384746) 和 [MS Sans Serif Bold](https://fontstruct.com/fontstructions/show/1384862)，其随包许可为 CC BY-SA 3.0，区别于 CSS 的 MIT。本站保留原始字体、署名、许可和来源链接。再分发或修改字体时遵循其独立许可，不把整包统称为 MIT。

## 能力与演示范围

[官方文档](https://jdan.github.io/98.css/)明确以语义化 HTML 配合 CSS，不提供 JavaScript 行为。窗口边框、蓝色标题栏、凹陷面板、表单、表格和进度条是资源能力；本地标签切换、筛选、应用设置与模拟进度为原创代码。

| 用法 | 原库构成 | 本地组合与可操作状态 |
| --- | --- | --- |
| 设置窗口 | window / title-bar / status-bar、原生表单 | 外观和选项两页；应用配色、说明与留白；恢复默认 |
| 素材目录 | sunken-panel、table、highlighted | 名称筛选、选中摘要、无结果分支；示例名称不是实际库存 |
| 传输进度 | progress-indicator、segmented | 实心和分段切换、开始、暂停、10% 步进、重置与完成 |

官方浏览器观察确认标准复选框可选中。源码显示默认控件为 11px；本地适配 CSS 将控件提高到 14px、辅助文字至少 12px，并扩大按钮及标签点击区域。因此本页演示可借用的复古语言，不声称像素级复刻 Windows 98。

## 参数与接入

使用 `npm install 98.css@0.1.21`，将样式及相邻字体一并部署；本页无 CDN、框架或构建器依赖。每个独立目录包含 HTML、适配 CSS、原创 JavaScript、官方 CSS 与字体，Agent 构建递归产生完整文件清单及 SHA256。

窗口类和分段进度来自[固定版本样式](https://github.com/jdan/98.css/blob/517d174b30392d39e068ef4eca457da66a189f8f/style.css)。三套桌面颜色、留白开关、每 240ms 增加 2% 和手动每次 10% 都是本地演示参数。真实产品应连接真实任务结果，不能以模拟计时器证明下载或安装完成。

## 输入、动态与后备

标签支持左右、Home、End；表单和目录条目使用标准控件，指针与触摸点击触发相同操作。减少动态时进度由手动步进推进；页面隐藏或切换用法时暂停，返回后不自动续播。没有声音，窗口舞台保留固定配色，外层说明跟随 Atlas 主题。

`?fallback=1` 可查看主动关闭交互的静态首屏；无 JavaScript 时保留样式、原生设置首屏和来源说明，应用等操作不执行。CSS 缺失时仍可阅读语义化内容，但复古外观不成立。不同读屏器、真实触屏设备和长期业务场景需要目标项目验证。

适合怀旧作品、数字档案、游戏界面与主题展品；避免把“复古”当作小字、低对比度或难以操作的理由，也不将它当作有完整复杂状态和安全业务能力的现代框架。
