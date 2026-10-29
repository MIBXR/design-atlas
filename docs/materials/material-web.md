# Google Material Web：Material 3 官方组件

[操作四种样例](../../demos/materials/material-web/index.html) · [结构化条目](../../entries/materials/material-web.json) · [官方仓库](https://github.com/material-components/material-web)

Google 的 `@material/web` 将 Material 3 设计语言实现为 Web Components，使用 Lit。这里选取的是官方 Material Web 软件，不是 MUI、Angular Material，也不是完整设计规范的复刻。四个业务组合、中文内容、配色控件与原创 SVG 属于 Web Atlas；按钮、文本框、开关、滑块和对话框使用真实官方实现。

## 来源与当前边界

核验日期为 `2026-10-16`。[官方 npm 元数据](https://registry.npmjs.org/@material/web/2.5.0) 对应 `2.5.0`，`gitHead` 为 `b4de401eb665ec63474f39319a4ba8f2145974cc`；核验时 npm `latest` 同为该版本。本地运行包按此版本固定，不代表未来最新版。

[官方 README](https://github.com/material-components/material-web) 仍标注维护模式并等待新维护者，指向 [维护公告](https://github.com/material-components/material-web/discussions/5642)。选择用于长期产品时，应评估团队自己的维护能力。本条目不宣称包含完整 Material 3 Expressive，也不根据设计规范的新版本推断软件已经实现。

[固定版本支持说明](https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/docs/support.md) 列出 Chrome/Edge 120+、Firefox 119+、Safari 16.4+ 的上游目标。这里的浏览器验收限定于当前 Chromium；上游声明不能替代 Safari、Firefox、辅助技术和真实手机的项目验收。

## 四个可借用的组合

| 组合 | 实际操作与结果 | 参数来源与本地选择 |
| --- | --- | --- |
| 操作层级 | 加入计划后禁用主要操作；查看安排输出独立内容；重置恢复。 | [按钮文档](https://material-web.dev/components/button/) 定义填充、描边、文字等层级及 `disabled`；角色和卡片内容为本地组合。 |
| 表单验证 | 空值或错误邮箱显示说明并聚焦首个错误；有效输入只报告格式检查通过；清空恢复。 | [文本框文档](https://material-web.dev/components/text-field/) 提供 `required`、`type`、`maxlength`、`checkValidity()`、`error`、`errorText`。名称24字符限制与中文消息为本地选择。 |
| 偏好设置 | 开关显隐完成标记，滑块改变目标卡数量；键盘与触摸输入走相同状态更新。 | [开关](https://material-web.dev/components/switch/) 的 `selected` 和 `change`；[滑块](https://material-web.dev/components/slider/) 的 `input`、`min/max/step/value`、`ticks/labeled`。数量1–8、默认4为本地用途。 |
| 确认对话框 | 归档、取消、Escape、恢复；关闭后焦点回到归档触发按钮。 | [对话框文档](https://material-web.dev/components/dialog/) 的 `show()`、`close(value)`、`returnValue`、`closed`、`quick`。归档状态只存在当前页面。 |

浏览器实际打开 [官方按钮 Stories](https://material-web.dev/components/button/stories/)，观察五种按钮、图标与链接变体并操作按钮；这是源端观察。其他 API 与主题规则以官方文档和固定版本源码为依据，本地四组功能单独实测，不把本地组合写成官网完整样例复刻。

## 参数与接入

浏览器通过 `import './vendor/material-web.js'` 注册选用的组件。运行模块包含全部依赖与组件样式，无 CDN 或远程字体。以静态 HTTP/HTTPS 服务器提供素材导出目录，再打开 `demos/materials/material-web/index.html`。`?sample=actions`、`form`、`preferences`、`dialog` 可定位样例。

[Material Theming](https://material-web.dev/theming/material-theming/) 以 CSS 自定义属性区分系统颜色角色和组件 tokens。本地两套配色覆盖 primary/on-primary、container/on-container、surface/on-surface、outline、error 等成对角色；它们是学习用配色，不是从用户图片自动生成的动态主题。主题可跟随 Atlas、系统或手动选浅/深。按钮形状使用各组件的 `container-shape`；`4–28px` 范围、`2px` 步长和 `20px` 默认值是本地教学选择，不是规范强制值。

表单示例阻止提交，仅在浏览器内调用校验接口，不存储或发送内容。复用时把成功分支接入自己的真实数据处理，并保留服务端校验；示例成功提示不能作为真实账户创建或资料保存的证据。

## 可读性、动效与失败状态

组件自带 Shadow DOM。页面通过官方字号 token 保持正文、标签和支持文本的尺度，并对滑块 `.label` 取消缩放过渡，避免值标签进入过程中小于12px。这项 Shadow DOM 适配属于本地代码，升级版本时需复核内部选择器。功能图标使用实际 SVG，没有加载 Material Symbols 字体或用文本字符替代图标。

界面没有自动循环、音频或后台计时器。系统或手动减少动态时，关闭 Shadow DOM 的局部 CSS 过渡、禁用 ripple，并设置 `dialog.quick`；页面隐藏时结束当前短动画，回到页面不自动触发新动作。确认弹窗使用上游对话框焦点约束；关闭后等待触发按钮的 Lit 渲染完成再恢复焦点。

组件加载成功前显示静态结构说明，实际控件区域保持隐藏；模块加载失败时明确显示「静态后备 · 真实组件未运行」。未定义的对话框也保持隐藏。静态结构可解释层级，但不代表 Web Components、表单或对话框已执行。

## 许可证与可重建依赖

Material Web 采用 [Apache-2.0](https://github.com/material-components/material-web/blob/b4de401eb665ec63474f39319a4ba8f2145974cc/LICENSE)。随包 Lit、lit-element、lit-html、@lit/reactive-element 采用 BSD-3-Clause；tslib 采用0BSD并保留其版权声明。Google 商标与官网内容不由软件许可自动授权，本地没有复制品牌图片或远程字体。

`vendor/material-web.js` 由 esbuild 0.25.12 合并并压缩选用的官方模块，CSS-in-JS 随包，保留行内许可；未修改官方组件源码。`vendor/components.mjs`、`package.json`、`package-lock.json` 提供重建输入，[依赖说明](../../demos/materials/material-web/vendor/README.md) 给出在仓库外重建的命令。`vendor/provenance.json` 保存 npm integrity、bundle摘要以及全部许可文件字节数/SHA256。导出时应保留完整 vendor 目录；Agent 资料由统一构建生成完整文件路径与角色。

## 验证范围

本地 Chromium 在1440×900与390×844 CSS视口下验证四种样例。已实测主要操作禁用/恢复、空值和无效邮箱错误、有效邮箱通过、开关变化、滑块键盘方向键与Home/End、确认归档/恢复、Escape关闭和焦点返回、明暗/配色/圆角控件，以及减少动态模式。对可见文本及开放Shadow DOM核对计算字号与变换后的尺寸；稳定界面最小为12px，滑块标签的缩放过渡由本地适配取消。

阻断本地运行模块后，页面显示明确静态后备；恢复模块后可正常加载。桌面与窄屏页面没有横向溢出。当前浏览器工具不支持触摸事件注入，真实触摸、Safari、Firefox、屏幕阅读器及真实后台切换行为仍需目标设备验收。固定版本源码中的可访问性实现与上游浏览器支持表，只作为适配依据。
