# Qoder：中国站局部还原范围

参考：[Qoder中国站](https://qoder.cn/)，2026-10-07。

| 区域 | 本地保留 | 近似／未覆盖 |
|---|---|---|
| 首屏 | CN官方字标、66px导航、36px左标题/右说明、满幅#80c777工作台 | 产品窗口为本地DOM与示例数据；没有国际版促销/Qwen标签 |
| Hero路径 | 两路径flow/breathe及3.8秒焦点时序来自公开样式 | SVG曲线与焦点位置为局部近似 |
| 五平台 | 400ms横向切换、20秒自动、进入暂停、点控与手机滑动 | 官方图像与简化产品DOM；未复制完整无限peek carousel |
| 模式/协作 | 编码/通用、任务回执与协作展开 | 本地模拟；源模式动作未现场核验 |

五平台与协作区仅局部研究，不等同CN站完整后续布局。Instrument Sans未取得，回退Arial/Microsoft YaHei。四项FeatureSection的150ms纵向/10秒机制未移植。手机收束侧栏、tab自身横滚；减少动态直接换态并停止自动。完整Agent SDK、QoderWake、企业条款和在线执行未覆盖。

[设计与交互依据](../../research/qoder-platform.md) · [资产来源](assets-manifest.json)。品牌与媒体权利归原作者。
