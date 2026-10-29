# Wired Elements：有手绘语言的可操作组件

[本地工作台](../../demos/materials/wired-elements/index.html) · [结构化资料](../../entries/materials/wired-elements.json) · [作者完整示例](https://wiredjs.com/showcase)

## 来源与版本

本条目使用 [rough-stuff/wired-elements](https://github.com/rough-stuff/wired-elements) 的官方 [npm 2.1.2](https://registry.npmjs.org/wired-elements/2.1.2) 分发，固定源码提交 `04756df72181e08b4255f8b6dfefea130398e24b`，核验日期 `2026-10-16`。查询时 npm `latest` 指向 `3.0.0-rc.6`；本条目选取最新非预发布版本 2.1.2，不代表 3.x 的接口或兼容性。

组件用 SVG 随机线条形成手绘边界，适合明确表达“可讨论、可修改”的工作坊、学习工具与概念原型。它不是完整的生产设计系统，也不自动提供业务校验、持久化、表单提交或所有辅助技术适配。

## 三种可借用组合

| 场景 | 组件与参数依据 | 本地职责 |
| --- | --- | --- |
| 任务清单 | [checkbox 的 checked / change](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-checkbox/README.md)、[progress 的 value / max](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-progress/README.md) | 三项任务和 1/3 默认进度为本地示例；勾选实时同步并可重置 |
| 偏好面板 | [toggle 的 checked](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-toggle/README.md) | 将模式和摘要选项应用到当前预览，不保存设置 |
| 概念卡片 | [card 的 elevation 1–5 / fill](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-card/README.md)、[slider 的 value / min / max](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-slider/README.md) | 默认层级 3、纸面与填色为本地选择，变化时重绘边界 |

三者都使用真实库组件；场景布局、文案、主题与状态联动是 Web Atlas 原创组合。

## 接入与适配

项目安装固定版本 `npm install wired-elements@2.1.2` 后导入包。这里直接自托管官方 `lib/wired-elements-esm.js`，其中已包含组件和 Lit 运行时，不依赖 CDN。通过 HTTP/HTTPS 服务目录，保留其相对文件路径和许可；Agent 构建提供完整文件路径与角色。

说明面板继承 Atlas 主题，手绘舞台固定浅纸面。所有文本至少 12px，不缩小整个 Demo。标签支持方向键；组件内部复选框提供原生键盘操作，滑块和开关补齐内部名称。无自动动画或声音；减少动态仍可改变参数。模块无法加载时显示明确的静态说明，`..?fallback=1` 可查看该分支。静态后备不是手绘组件渲染证据。

## 许可与边界

Wired Elements 采用 [MIT](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/LICENSE)。原始单文件 bundle 内含的 Lit Element 2.3.1 与 lit-html 1.2.1 为 BSD 3-Clause；[wired-lib 源码](https://github.com/rough-stuff/wired-elements/blob/04756df72181e08b4255f8b6dfefea130398e24b/packages/wired-lib/src/wired-lib.ts) 将 RoughJS 的 MIT 渲染代码构建在内。四份声明随 `vendor/` 保存。RoughJS 在上游清单声明为 `^4.3.1`，该分发未暴露精确构建解析版本；这里使用官方 bundle 原字节，不声称重建了上游依赖树。原始上游文件不改写，本站的组合不冒充原作者模板。

浏览器范围、读屏器、不同移动设备与宿主框架的表单绑定仍需在目标项目验证。随机线条会随组件重绘而变化，不用于要求跨次截图完全一致的视觉基准。
