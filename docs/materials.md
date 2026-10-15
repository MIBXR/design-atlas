# 内容素材库

内容素材库收录可以直接预览、操作和取材的前端资源。每项保留来源版本、许可范围、使用限制、可运行样例和源码入口。完整设计案例负责页面整体，巧思负责独立机制，素材负责实际可用的组件、图像、声音、字体或视觉资源；取材时按当前页面任务组合。

[浏览内容素材库](../materials.html) · [调节四种 Shaders 效果](../material-demos/shaders/index.html) · [结构化条目](../materials/shaders.json)

## 资源与代表用法

组件素材按设计语言与实际用途选择；字体等资源提供相应的试用方式。表中的演示是使用真实上游资源制作的本地原创组合，不表示覆盖上游全部能力或复刻官方应用。

| 素材 | 可借用的特点 | 在库内体验 | 版本与边界 |
| --- | --- | --- | --- |
| [Material Web](materials-material-web.md) | Google Material 3 的角色色、操作层级与组件状态 | 操作按钮、表单、偏好设置、确认对话框 | 固定 `@material/web 2.5.0`；官方仓库标注维护模式，具体支持范围以该版本为准 |
| [Wired Elements](materials-wired-elements.md) | 手绘轮廓与轻量原型感 | 任务清单、偏好面板、概念卡片 | 固定稳定版 `2.1.2`；手绘视觉来自真实组件，业务状态由本地演示提供 |
| [98.css](materials-98-css.md) | 复古桌面窗口、凹凸边框与系统控件 | 设置窗、目录筛选、模拟打包进度 | 固定 `0.1.21`；CSS 不提供业务逻辑，演示提高字号并补充键盘交互；附带字体另有许可 |
| [Recursive](materials-recursive.md) | 比例／等宽、理性／手写之间的五轴变化 | 界面标题、等宽内容与海报试排 | 固定 `1.085` 原始 WOFF2；中文使用系统字体回退，不冒充 Recursive 字形 |
| [Shaders](#shaders-的来源与范围) | 可组合的 GPU 图层与参数 | 渐变、玻璃、涟漪与溶解 | 固定 `4.0.4`；需要 WebGPU，静态后备不代表真实效果运行 |

每项的详情与独立文档说明上游版本、参数依据、使用方式和许可；完整运行文件及原始字节校验由生成的 Agent 素材包提供。组件库的上游样式只在独立 Demo 内加载，不影响参考库导航、卡片、主题与收藏。

## Shaders 的来源与范围

本条目归档 [shader-effects-inc/shaders](https://github.com/shader-effects-inc/shaders) 的 `4.0.4` JavaScript 运行时，核验日期为 `2026-10-13`。官方 [npm 版本元数据](https://registry.npmjs.org/shaders/4.0.4) 的 `gitHead` 对应完整提交 `81fd4ece5d493ca6c424a2af41f0e2c361ec8258`。本地直接加载随包分发的模块，不需要框架或打包工具。

上游 [JavaScript 接口与组件说明](https://github.com/shader-effects-inc/shaders/tree/81fd4ece5d493ca6c424a2af41f0e2c361ec8258) 提供 `createShader`，按 `components` 数组组合和处理图层。四个演示使用真实上游组件；配色、参考图、参数控件与触发按钮是本库的原创演示选择。它们用于学习独立效果，不表示复刻了官网的编辑器或预设。

| 演示 | 可操作内容 | 适合的任务 | 参数依据 |
| --- | --- | --- | --- |
| 流动渐变 `MeshGradient` | 速度、色块数、旋转、平滑度及色彩 | 有稳定文字层的产品首部背景 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/MeshGradient/index.ts) |
| 条纹玻璃 `FlutedGlass` | 密度、折射、角度与高光 | 展示卡片、视觉舞台的局部质感 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/FlutedGlass/index.ts) |
| 指针涟漪 `CursorRipples` | 指针或触摸反馈的强度、衰减、半径与色散 | 局部装饰画布与输入反馈 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/CursorRipples/index.ts) |
| 噪声溶解 `NoiseDissolve` | 手动进度、噪声尺度、边缘软度与正反向转场 | 图片、内容切换中的遮罩层 | [固定提交源码](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/packages/core/src/shaders/NoiseDissolve/index.ts) |

参数依据保存在结构化条目的 `demos[].parameters` 中。上游源码的 `ui.min/max` 是编辑控件建议范围；本地 MeshGradient 速度采用 `0–2`（上游 UI 为 `0–10`），FlutedGlass 角度采用 `0–180`（上游 UI 为 `0–360`），其余范围沿用源码 UI 建议。演示的步长与默认值是本地选择。MeshGradient 显式设置 `stops: null`，使两色控件生效；页面实际默认值和组件组合以 [demo.js](../material-demos/shaders/demo.js) 为准。修改用于自己的页面时先核对当前素材包，再依据内容对比度、输入设备和舞台尺寸调整。玻璃与涟漪需要底图才能判断形变，演示使用本地原创 SVG，不取用官网的付费作品。

## 运行与适配

通过 HTTP/HTTPS 打开演示，浏览器需提供 WebGPU。舞台一次运行一种效果，控制区切换、参数、重置和暂停均使用标准 DOM 控件。选择效果或调节参数时，可以直接查看底图、颜色和运动的变化。

演示区同时保留静态参考与明确的运行状态。WebGPU 不可用时，静态示意帮助理解构成，但不能用来判断真实着色器的视觉精度、性能或硬件兼容性。正式页面的主要内容和操作保留在 DOM；减少动态、暂停或页面隐藏时停止持续动画，按真实设备验证返回后的状态。装饰效果不得成为阅读和完成操作的条件。

## 许可与来源边界

上游仓库和 npm 软件包的引擎、组件及框架绑定采用 [MIT 许可](https://github.com/shader-effects-inc/shaders/blob/81fd4ece5d493ca6c424a2af41f0e2c361ec8258/LICENSE)。本地模块旁保留原许可、版权和第三方声明。复制 Demo 或运行时到其他项目时，一并保留这些文件。

作者在仓库说明与 [shaders.com 许可](https://shaders.com/license) 第 2／3 节区分 MIT 软件与预设、合集、区块等平台内容。本库只分发软件与原创演示。归档版本不代表上游此后没有变更；使用其他版本时重新核对参数、接口与许可。

## 维护与 Agent 取材

人工内容源为 `materials/<id>.json`、关联文档、`material-demos/<id>/` 和预览。新增素材至少提供来源 URL 与核验日期、许可范围、适用和避用场景、制作约束，以及能实际查看或操作的样例；有软件版本或完整 Git 提交时一并记录。字体、声音和图片条目依据其体验形式提供试排、播放或构图示例，不以外链列表代替演示。

`npm run build` 同步网页 `materials.js`、独立目录 `agent/materials.json` 与完整包 `agent/materials/<id>.json`。素材包包含完整条目、文档原文和全部运行文件清单，不依赖来源案例。主目录的 `materials` 描述保存子目录路径、字节数、SHA256、数量和版本。读取流程与固定会话 SHA 见 [Agent 工作流](../AGENT.md#内容素材取材)。

`npm run check` 校验生成内容、实际依赖、演示入口、源码定位及哈希；`npm run test:materials` 验证原文与版本传播的关键路径。文件一致性检查不证明 GPU 已运行。发布验收需分别记录支持 WebGPU 的浏览器中四种效果和控件的实际响应，以及不支持时的静态状态。
