# Recursive：从界面到招牌的五轴字体

[打开字体试排](../material-demos/recursive/index.html) · [结构化条目](../materials/recursive.json) · [官方样张](https://www.recursive.design/)

Recursive 把比例字体与等宽字体放在一个可变字体文件中，并能独立调整手写个性、字重、倾斜与草写字形。适合需要在界面、代码与展示标题之间保持亲缘关系的项目。这里使用真实的官方字体，三种布局与配色是 Design Atlas 的原创组合。

## 来源与参数

本条目固定 [arrowtype/recursive v1.085](https://github.com/arrowtype/recursive/releases/tag/v1.085)，对应提交 `5f4be025122d72d4710267e959128e8986ebe435`，核验日期为 `2026-10-16`。官方版本发布时间为 `2022-06-30`；归档固定版本，不随上游移动。

[固定版本 README 的 Variable Axes](https://github.com/arrowtype/recursive/blob/5f4be025122d72d4710267e959128e8986ebe435/README.md#variable-axes) 给出以下范围。本地使用同一范围；步长、字号、文案和组合为本地选择。

| 轴 | 范围 | 含义与适配 |
| --- | --- | --- |
| `MONO` | 0–1 | 0 为比例字宽，1 为等宽；改变它会改变横向布局。 |
| `CASL` | 0–1 | 由 Linear 到 Casual，调整笔画曲线、端点和个性；大标题优先选端点。 |
| `wght` | 300–1000 | 由 Light 到 ExtraBlack；重字重应配较大字号。 |
| `slnt` | −15–0 | 负值表示前倾；与草写字形分开控制。 |
| `CRSV` | 0、0.5、1 | 始终正体、随倾斜自动、始终草写；自动模式在 −14° 附近切换字形。 |

官方样张的 `#chooseInstance` 实际提供命名样式选择。浏览器选择 `Mono Casual ExtraBlack Italic` 后，页面显示 MONO 1、CASL 1、wght 1000、slnt −15、CRSV 1。这个观察确认官方预设的控件响应；它不等于对所有浏览器、语言或字形组合的验证。上游文档负责完整能力依据，本地样例负责三种具体使用场景。

## 三种试排

| 样例 | 选择理由 | 本地默认值 |
| --- | --- | --- |
| 界面标题 | 比例字宽与直立字形维持清晰层级；适合拉丁标题和产品介绍。 | MONO 0 / CASL 0 / wght 650 / slnt 0 / CRSV 0.5，48px |
| 等宽代码 | 固定字宽便于观察标点、数字和字母；适合终端与代码片段。 | MONO 1 / CASL 0 / wght 450 / slnt 0 / CRSV 0，19px |
| 个性海报 | Casual 的笔触、重字重和草写字形形成鲜明的短标题。 | MONO 0 / CASL 1 / wght 900 / slnt −15 / CRSV 1，72px |

可以替换试排内容，调五轴和字号，再复制当前 CSS。代码样例只展示字体，不是编辑器。切换预设和重置会恢复当前预设的文字与参数；后备开关保持用户选择。所有文本保留在 DOM 中，标签和滑块可用键盘，触摸滑动使用原生控件。

本地字号范围为 16–88px，辅助文字至少 12px；范围是演示选择，不表示所有字重、字号组合都具有同等阅读质量。字体为拉丁文字及相关符号设计，中文回退到系统字体，混排字重和行高需另行适配。部分数学希腊字母不代表完整希腊文支持。

## 自托管与许可

`@font-face` 从本地加载完整 WOFF2，`font-weight: 300 1000` 声明字重范围，五个轴通过 `font-variation-settings` 控制。完整字体为 718,680 字节，保留官方原字节；无需 CDN、框架或 JavaScript 字体库。实际文件和来源摘要见 [字体声明](../material-demos/recursive/vendor/NOTICE.md)。首次加载需要承担完整字体下载量，生产项目可以依据原许可评估子集化，但不要将本示例误当成已做性能优化的最小字体包。

字体使用 [SIL OFL 1.1](https://github.com/arrowtype/recursive/blob/5f4be025122d72d4710267e959128e8986ebe435/OFL.txt)，随文件保留版权和完整许可。字体不能单独出售，修改与分发须遵守 OFL；本地版式不代表原作者背书。完整字体的字符能力以原始文件和官方文档为准，本条目未逐字验收所有语言。

字体加载中使用系统后备，成功后显示明确状态；失败或浏览器不支持可变设置时继续显示文字。“模拟字体不可用”用于查看后备布局，不伪装成 Recursive 的静态版本。没有自动动画或声音，无持续后台任务，减少动态偏好下操作不变。

## 取材文件

人工来源是 `materials/recursive.json`、本说明与 `material-demos/recursive/`。网页和 Agent 包由构建生成。完整导出包含 WOFF2、原始许可、源码与文档；`--code-only` 会跳过字体和预览，使用前需按清单取得资产。

示例的 `README.md` 列出查询参数、主题继承和键盘行为。Agent 包提供文件路径与角色，从固定 Git 提交取得文件；浏览器验收字体加载、混排和布局。
