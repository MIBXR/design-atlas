# ChatGPT · 动态还原说明

参考：[中文公开介绍页](https://chatgpt.com/zh-Hans-CN/overview/)，2026-10-07，`reference-study`。

这次补回四个连续流程：悬停切换和各自独立图层进出；工作模式的周边附件、图表与星标；滚动带入及分层视差；同一中央窗口右下交接后露出左侧模式栏，并随自然滚动切换聊天/工作/Codex。

依据为真实公开浏览器操作、原站关键帧、图层CSS变量和DOM阶段标记。详见 [调研映射](../../research/chatgpt-platform.md) 和 [几何证据](../../research/chatgpt-motion-evidence.json)。品牌字标、字体、三界面、20件补充图形及用途图均来自官网公开素材，未重画。

本地进入720ms、退出500ms，周边素材独立控制；快速悬停最多保留一组离场图层。滚动使用被动监听与requestAnimationFrame；不劫持滚轮。左模式栏使用aria-expanded/controls，具键盘导航，暂未显现时inert。手机和减少动态效果采用顺序布局；页脚暂停装饰动效与自动切换。

原站JS直接下载失败，未取得完整React源代码。图层坐标、CSS时长及阶段来自观察；自动周期、交错、进出方向、交叉淡化和连续滚动插值为近似。正文缩写，登录、注册、定价不连接服务端。不能把局部动态学习说成整站像素或功能克隆。

官方资产来源、字节数与SHA256见 [assets-manifest.json](assets-manifest.json)。版权归OpenAI和原作者，私人学习用途。
