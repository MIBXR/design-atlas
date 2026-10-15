# Recursive 五轴字体试排

本示例使用 ArrowType 的原始 `Recursive_VF_1.085.woff2`，通过本地 `@font-face` 加载。界面标题、等宽代码和个性海报是 Design Atlas 的原创排版组合，不是原作者预设或官网复刻。

使用静态 HTTP 服务打开 `index.html`；无框架、CDN、外部图片或运行时库依赖。完整导出需保留 `vendor/` 中的字体、许可和来源说明；`--code-only` 导出不含字体资产，不能据此验证真实字形。

## 入口与操作

| `preset` | 用途 | 本地默认值 |
| --- | --- | --- |
| `interface` | 拉丁界面标题 | MONO 0、CASL 0、wght 650、slnt 0、CRSV 0.5；48px |
| `code` | 等宽代码、数据 | MONO 1、CASL 0、wght 450、slnt 0、CRSV 0；19px |
| `poster` | 个性海报、短标题 | MONO 0、CASL 1、wght 900、slnt −15、CRSV 1；72px |

例如 `index.html?preset=poster`。五轴范围直接依据固定版本 README；CRSV 只提供作者建议的 0、0.5、1。字号 16–88px 和预设组合是本地演示选择。试排内容通过 `textContent` 输出，支持多行；长行折行用于窄屏阅读，不表示代码编辑器支持。

标签支持方向键、Home/End，原生滑块支持键盘及触摸；可编辑文字、重置当前预设并复制当前 CSS。复制不可用时选中代码供手动复制。“模拟字体不可用”主动切换系统字体，明确标记后备，轴值仍可用于生成代码但不改变系统字形。

## 适配与边界

`theme=light`／`theme=dark` 可指定控件主题；同源嵌入继承父页面 `data-atlas-theme`，独立打开使用 Design Atlas 已保存的主题或系统偏好。代码与海报舞台保留各自的语义配色。

字体通过 `font-display: swap` 保留加载期间的阅读；完成 `document.fonts.load` 后才显示字体已加载，失败或不支持轴设置时使用系统后备。本示例没有连续动画、声音、轮询或绘制循环，因此无需暂停按钮，减少动态和后台均不主动改变内容。

上游主要覆盖拉丁文字（含越南语）及符号，另有部分数学希腊字母；不宣称完整中文、希腊文或其他文字覆盖。中文使用系统字体，不会响应 Recursive 的自定义轴，混排应重新核对行高和字重。MONO 改变字宽；其余轴在固定 MONO 时保持字体设计的横向度量，但实际页面仍需核对字距、折行和后备字形。

原始字体、固定提交、SHA256 和许可见 [vendor/NOTICE.md](vendor/NOTICE.md)；本地 HTML/CSS/JS 使用网站仓库许可，字体保持独立 OFL 许可。
