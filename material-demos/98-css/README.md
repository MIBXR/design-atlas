# 98.css 复古桌面组件工作台

使用真实 `98.css@0.1.21` 样式与随包字体。本地 HTML/CSS/JavaScript 组合三种用途，不是操作系统模拟器。通过静态 HTTP 服务打开 `index.html`，不需要 CDN、框架或构建器。

| `demo` 参数 | 真实样式 | 本地交互 |
| --- | --- | --- |
| `settings` | window / title-bar / status-bar / 表单 | 外观与选项标签，配色、说明与留白的应用和重置 |
| `catalog` | sunken-panel / table / highlighted | 名称筛选、键盘可选条目、空结果状态 |
| `progress` | progress-indicator / segmented | 模拟进度、暂停、重置、手动步进及分段切换 |

例如 `index.html?demo=progress`。`theme=light` / `theme=dark` 指定外层说明主题；同源嵌入跟随 Atlas 主题。窗口舞台固定青绿和灰色，保留该资源的视觉语言。`fallback=1` 主动禁用本地交互，以真实 CSS 展示静态首屏；无 JavaScript 时仍保留设置首屏和来源说明。CSS 缺失时保留语义化文本，不能声称复古样式已加载。

原库只有样式，不提供标签切换、筛选或传输。`demo.js` 负责这些行为，模拟进度不下载、不安装、不生成文件。页面隐藏或切换用法时暂停，返回后需主动继续；`prefers-reduced-motion: reduce` 下开始按钮改为单步前进。没有音频。

控件的原始 11px 字号通过 `demo.css` 提高至 14px，辅助说明不低于 12px；按钮扩大到至少 36px 高。窗口不使用缩放。标签支持左右、Home、End 键，表单和目录使用原生输入与按钮。字体保留原字节与独立的 CC BY-SA 3.0 署名，不与 MIT CSS 混为同一许可。详见 [vendor/NOTICE.md](vendor/NOTICE.md) 与[素材研究](../../docs/materials-98-css.md)。
