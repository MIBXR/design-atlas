# Wired Elements 手绘组件工作台

使用真实 `wired-elements@2.1.2` 官方完整 ESM，搭配本地原创 HTML/CSS/JavaScript 场景。运行只需静态 HTTP 服务，无 CDN、网络字体、框架或安装步骤。入口是 `index.html`。

| `demo` 参数 | 实际组件 | 本地交互 |
| --- | --- | --- |
| `checklist` | wired-card / checkbox / progress / button | 三项任务同步计数与手绘进度，可重置 |
| `preferences` | wired-card / toggle / checkbox / button | 调整偏好后应用到本页摘要，不保存或修改系统设置 |
| `card` | wired-card / slider | 层级 1–5 与填色实时变化 |

例如 `index.html?demo=card`。`theme=light` / `theme=dark` 指定说明面板主题；同源嵌入继承 Atlas 主题。纸面舞台固定浅色，避免改变手绘资源的辨识度。`fallback=1` 主动跳过运行时并显示标注的静态说明；模块失败时使用同一后备。静态说明不能证明组件已运行。

组件在 Custom Elements、Shadow DOM 与 JavaScript 可用的浏览器运行。任务使用组件内部原生复选框，开关与滑块补上内部可访问名称；标签支持左右、Home、End 键。无循环动画或声音，减少动态不影响功能。导出包应保留整个目录及 vendor 许可。

`vendor/wired-elements-2.1.2.js` 保留 npm 包原字节。`demo.js` 是本地联动与主题代码；`demo.css` 保证文本至少 12px，不以缩小视口解决布局。来源、版本及许可证见 [vendor/NOTICE.md](vendor/NOTICE.md)，范围见 [素材研究](../../docs/materials-wired-elements.md)。
