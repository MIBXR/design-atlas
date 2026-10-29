# Shaders 开源效果实验

这个独立 HTML/CSS/JavaScript 示例运行真实的 `shaders@4.0.4` JavaScript 组件。官方 npm 运行包自托管在 `vendor/shaders-4.0.4.js`，没有 CDN、网络图片、框架或构建器的运行依赖；`reference.svg` 是本地原创输入图形。版本、源码提交和原始许可证见 [vendor/NOTICE.md](vendor/NOTICE.md)。

使用静态 HTTP 服务打开 `index.html`。WebGPU 需要浏览器支持及可用设备；本地开发使用 `localhost`，公开页面使用 HTTPS。直接双击 `file:` 页面不能作为运行验证。

## 效果与入口

| 查询参数 `effect` | 真实组件 | 交互与参数 |
| --- | --- | --- |
| `mesh-gradient` | `MeshGradient` | 流动速度、颜色点数、旋涡方向、混合柔度、颜色 A/B；`stops: null` 使两个颜色控件直接控制配色 |
| `fluted-glass` | `FlutedGlass` | 玻璃条数、折射强度、条纹方向、高光强度；以 `ImageTexture` 输入原创图形 |
| `cursor-ripples` | `CursorRipples` | 指针移动与触摸拖动；可调波纹强度、衰减速度、影响半径和边缘色散 |
| `noise-dissolve` | `NoiseDissolve` | 拖动溶解进度，0 为完整输入图形、1 为消失；可调噪声密度和边缘柔度 |

入口示例：`index.html?effect=fluted-glass`。查询参数 `theme=light`／`theme=dark` 可指定控件主题。未指定时，同源嵌入继承父页面的 `data-atlas-theme` 并监听其变化；独立页面读取 Web Atlas 已保存的主题或系统偏好。演示舞台保持深色背景。

## 运行行为

页面一次只创建当前效果的实例；切换与重置先销毁原实例，快速切换按序初始化。参数使用 `shader.update('effect', props)` 更新；暂停时参数修改请求静止画面更新。每次创建传入 `disableTelemetry: true`。

“暂停演示”／“开始演示”控制当前实例，页面进入后台暂停，返回时遵循用户的播放选择。`prefers-reduced-motion: reduce` 默认暂停；用户可主动开始。指针波纹只在舞台内使用触摸拖动，舞台外保留正常页面滚动。所有参数可用键盘操作，效果标签支持方向键及 Home/End。

只有官方 `onReady` 回调确认首个合成帧后才显示“WebGPU 实时渲染”。浏览器缺少 WebGPU、无法取得设备或初始化失败时，显示明确标记的静态参考和原因；静态图不代表 GPU 效果或性能已验证。复制示例提供当前参数组成的 `shaders/js` 代码；安装命令固定为 `npm install shaders@4.0.4`。

## 文件

- `index.html`：语义化界面与实验入口。
- `demo.css`：桌面／手机布局、主题与静态参考样式；文本至少 12px。
- `demo.js`：四个真实组件组合、参数、实例生命周期与复制操作。
- `reference.svg`：原创滤镜输入图形。
- `vendor/shaders-4.0.4.js`：原始官方单文件 ESM。
- `vendor/NOTICE.md` 与 `vendor/LICENSE-*.txt`：来源、固定版本与原始许可证。

完整的组件、参数和框架用法继续查看[上游仓库](https://github.com/shader-effects-inc/shaders)与[官方文档](https://shaders.com/docs)。
